import { Table } from 'dexie'
import { toNumber } from '@renderer/utils/number'

// Para tablas SIN auto-incremento de id (tickets, ticket_complements, ticket_receipts)
export async function nextManualId<T extends { id: number }>(table: Table<T, number>): Promise<number> {
  const last = await table.orderBy('id').last()
  return (toNumber(last?.id) ?? 0) + 1
}
