const GU_DIGITS = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];

/** Convert Latin digits to Gujarati numerals, e.g. 28 → ૨૮ */
export function toGu(value: number | string, pad = 0): string {
  return String(value)
    .padStart(pad, '0')
    .replace(/[0-9]/g, (d) => GU_DIGITS[Number(d)]);
}

/** "04:00 PM" → { clock: '04:00', meridiem: 'PM', periodGu: 'સાંજે' } */
export function splitTime(time: string) {
  const [clock, meridiem = ''] = time.split(' ');
  const h24 = (Number(clock.split(':')[0]) % 12) + (meridiem === 'PM' ? 12 : 0);
  const periodGu = h24 < 12 ? 'સવારે' : h24 < 16 ? 'બપોરે' : h24 < 19 ? 'સાંજે' : 'રાત્રે';
  return { clock, meridiem, periodGu };
}
