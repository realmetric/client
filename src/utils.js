export const existy = (x) => x != null

export function quantize5minPerDay(period = {}) {
  let res = {}
  if (period === null) return res
  let total = 0
  const data = [...Array(1440)].reduce((r, _, i) => (r[i] = (period[i] || null), r), {})
  Object.keys(data).forEach((el, i) => {
    total += +data[el]
    if (++i % 5 === 0) {
      res[i - 5] = total || null
      total = 0
    }
  })
  return res
}
