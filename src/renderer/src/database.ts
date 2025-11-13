// src/renderer/src/database.ts
import Dexie, { IndexableType, Table } from 'dexie'

export interface Configuration {
  id: number
  display_id: number
}

export interface User {
  id: number
  description: string
  hashed_fast_pass: string
}

export interface Component {
  id: number
  online_id: number
  component_id: number
  related_component_id: number
  order: number
}

export class sindriDB extends Dexie {
  users!: Table<User>
  configurations!: Table<Configuration>
  components!: Table<Component>

  constructor() {
    super('sindriDB')
    this.version(1).stores({
      users: 'id',
      configurations: 'id',
      components: 'id'
    })
  }
}

export const db = new sindriDB()

// CSV parsing and type-aware conversion
import { toNumber } from './utils/number'

type FieldType = 'string' | 'number' | 'boolean'

type TableSchema = Record<string, FieldType>

type DatabaseSchema = Record<string, TableSchema>

const schema: DatabaseSchema = {
  configurations: {
    id: 'number',
    display_id: 'number'
  },
  users: {
    id: 'number',
    description: 'string',
    hashed_fast_pass: 'string'
  },
  components: {
    id: 'number',
    online_id: 'number',
    component_id: 'number',
    related_component_id: 'number',
    order: 'number'
  }
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === delimiter && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

function detectDelimiter(sampleLine: string): string {
  const commaCount = (sampleLine.match(/,/g) || []).length
  const semicolonCount = (sampleLine.match(/;/g) || []).length
  return semicolonCount > commaCount ? ';' : ','
}

function toBoolean(val: string): boolean {
  if (val == null) return false
  const s = String(val).trim().toLowerCase()
  if (!s) return false
  return s === '1' || s === 'true' || s === 't' || s === 'yes' || s === 'y'
}

function convertField(tableName: string, key: string, value: unknown): unknown {
  const tableSchema = schema[tableName] || {}
  const fieldType = tableSchema[key] || 'string'
  if (fieldType === 'number') {
    return toNumber(value)
  } else if (fieldType === 'boolean') {
    return toBoolean(String(value))
  } else if (fieldType === 'string') {
    return String(value)
  }
  return value
}

function convertRecord<T extends Record<string, unknown>>(tableName: string, record: T): T {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return record
  const out: Record<string, unknown> = {}
  for (const key in record) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue
    const v = (record as Record<string, unknown>)[key]
    out[key] = convertField(tableName, key, v)
  }
  return out as T
}

export function parseCSV(tableName: string, csvText: string): Record<string, unknown>[] {
  const normalized = csvText.replace(/\r\n?/g, '\n').trim()
  const lines = normalized.split('\n').filter(l => l.length > 0)
  if (!lines.length) return []

  const delimiter = detectDelimiter(lines[0])
  const headers = parseCsvLine(lines[0], delimiter).map(h => h.trim())

  const data: Record<string, unknown>[] = []
  const tableSchema = schema[tableName] || {}
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i], delimiter)
    const entry: Record<string, unknown> = {}
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j]
      if (!(key in tableSchema)) continue
      const raw = values[j] != null ? String(values[j]).trim() : ''
      entry[key] = convertField(tableName, key, raw)
    }
    data.push(entry)
  }
  return data
}

export function parseApi(tableName: string, lines: []): Record<string, unknown>[] {
  if (!lines.length) return []

  const data: Record<string, unknown>[] = []
  const tableSchema = schema[tableName] || {}

  for (let i = 0; i < lines.length; i++) {
    const values = lines[i] as Record<string, unknown>
    const entry: Record<string, unknown> = {}

    for (const key of Object.keys(values)) {
      if (!(key in tableSchema)) continue
      const raw = values[key]
      entry[key] = convertField(tableName, key, raw)
    }

    data.push(entry)
  }
  return data

}

export async function putRecord(tableName: string, data: Record<string, unknown>) {
  const entry = convertRecord(tableName, data)
  return db.table(tableName).put(entry)
}

export async function updateRecord(tableName: string, key: IDBValidKey, changes: Record<string, unknown>) {
  const parsed = convertRecord(tableName, changes)
  return db.table(tableName).update(key, parsed)
}

export async function deleteRecord(tableName: string, key: IndexableType) {
  return db.table(tableName).delete(key)
}

export async function resetDatabase(): Promise<void> {
  // Elimina completamente la BD y la vuelve a crear según el esquema definido arriba.
  await db.close()
  await db.delete()
  await db.open()
}
