export const masteryColor = (m: number) => {
    // return Tailwind color tokens
    if (m >= 85) return "bg-emerald-500";
    if (m >= 70) return "bg-emerald-400";
    if (m >= 55) return "bg-amber-400";
    if (m >= 35) return "bg-orange-400";
    return "bg-rose-500";
};


export const strokeColor = (m: number) => {
    if (m >= 85) return "stroke-emerald-500";
    if (m >= 70) return "stroke-emerald-400";
    if (m >= 55) return "stroke-amber-400";
    if (m >= 35) return "stroke-orange-400";
    return "stroke-rose-500";
};

export function smoothQPath(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) return "";
  const [p0, ...rest] = points;
  let d = `M ${p0.x},${p0.y}`;
  for (let i = 1; i < points.length; i++) {
    const pPrev = points[i - 1];
    const p = points[i];
    const cx = (pPrev.x + p.x) / 2;
    const cy = (pPrev.y + p.y) / 2;
    d += ` Q ${pPrev.x},${pPrev.y} ${cx},${cy}`;
  }
  const last = points[points.length - 1];
  d += ` T ${last.x},${last.y}`;
  return d;
}

export function labelSide(x: number, width = 1000) {
  return x < width * 0.5 ? "right" : "left";
}

export function catmullRomPath(
  pts: Array<{ x: number; y: number }>,
  tension = 0.6,
): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0].x},${pts[0].y}`;
  const k = (1 - tension); // blend toward straighter lines as tension↑
  const p = pts.slice();

  // duplicate endpoints for stable tangents
  const p0 = p[0], pN = p[p.length - 1];
  p.unshift(p0);
  p.push(pN);

  let d = `M ${p[1].x},${p[1].y}`;
  for (let i = 1; i < p.length - 2; i++) {
    const p0 = p[i - 1], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2];

    // control points (Catmull–Rom to Bézier)
    const c1x = p1.x + ((p2.x - p0.x) * k) / 6;
    const c1y = p1.y + ((p2.y - p0.y) * k) / 6;
    const c2x = p2.x - ((p3.x - p1.x) * k) / 6;
    const c2y = p2.y - ((p3.y - p1.y) * k) / 6;

    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}