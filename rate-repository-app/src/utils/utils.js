export const parseThousands = value => {
  return value >= 1000
    ? `${Math.trunc(value / 100) / 10}k`
    : String(value)
}
