// src/utils/number.ts
export function toNumber(value: unknown): number {
  if (typeof value === 'number') {
    return isFinite(value) ? value : 0
  }

  if (typeof value === 'string') {
    let s = value.trim()
    if (!s) return 0

    // Si contiene separadores, detecta el decimal como el último símbolo (.,)
    if (s.includes(',') || s.includes('.')) {
      const lastComma = s.lastIndexOf(',')
      const lastDot = s.lastIndexOf('.')
      const lastSep = Math.max(lastComma, lastDot)

      if (lastSep !== -1) {
        const decSep = s[lastSep]
        const thousandsSep = decSep === ',' ? '.' : ','

        // Quita separadores de miles y normaliza el decimal a punto
        s = s.replace(new RegExp('\\' + thousandsSep, 'g'), '')
        if (decSep === ',') s = s.replace(',', '.')
      }
    }

    const n = parseFloat(s)
    return isNaN(n) ? 0 : n
  }

  // Fallback para null/undefined/otros tipos
  const n = Number((value as any) ?? 0)
  return isNaN(n) ? 0 : n
}

function _roundByDecimal(n, decimals = 2): number {
  const multiplier = Math.pow(10, decimals)
  return Math.round((toNumber(n) + Number.EPSILON) * multiplier) / multiplier
}

export function round2(n): number {
  return _roundByDecimal(n, 2)
}
