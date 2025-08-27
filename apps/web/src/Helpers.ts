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