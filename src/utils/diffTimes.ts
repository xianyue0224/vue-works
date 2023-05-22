import dayjs from 'dayjs';

/**
 * 返回两个日期对象相差的毫秒。
 * @param date1 Date
 * @param date2 Date
 * @returns 两个日期对象相差的毫秒
 */
export function diffTimes(date1: Date, date2: Date) {
  const d1 = dayjs(date1);
  const d2 = dayjs(date2);
  const ms = d2.diff(d1);
  return ms;
}
