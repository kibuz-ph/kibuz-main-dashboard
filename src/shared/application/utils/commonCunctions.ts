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

export const getApiErrorMessage = (error: unknown, fallback: string) => {
    if (error && typeof error === "object" && "message" in error) {
        const message = (error as { message?: unknown }).message;
        if (typeof message === "string" && message.length > 0) return message;
        if (Array.isArray(message) && typeof message[0] === "string") return message[0];
    }
    return fallback;
};
