
export function relTime(iso: string, now = Date.now()): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = t - now; // negative => past
  const abs = Math.abs(diff);

  const m = 60_000;
  const h = 60 * m;
  const d = 24 * h;
  const w = 7 * d;
  const mo = 30 * d;
  const y = 365 * d;

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  if (abs < m)  return rtf.format(Math.round(diff / 1000), "second");
  if (abs < h)  return rtf.format(Math.round(diff / m),     "minute");
  if (abs < d)  return rtf.format(Math.round(diff / h),     "hour");
  if (abs < w)  return rtf.format(Math.round(diff / d),     "day");
  if (abs < mo) return rtf.format(Math.round(diff / w),     "week");
  if (abs < y)  return rtf.format(Math.round(diff / mo),    "month");
  return rtf.format(Math.round(diff / y), "year");
}
