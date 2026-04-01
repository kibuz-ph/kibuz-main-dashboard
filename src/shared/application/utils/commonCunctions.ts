export const withAlpha = (color?: string, alpha = 0.12) => {
    if (!color) return undefined;
    if (!color.startsWith("#")) return undefined;

    const hex = color.replace("#", "");
    const full = hex.length === 3
        ? hex.split("").map((c) => c + c).join("")
        : hex;

    if (full.length !== 6) return undefined;

    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};