export const petKeys = {
    all: ["pets"] as const,
    lists: () => [...petKeys.all, "list"] as const,
    detail: (id: string) => [...petKeys.all, "detail", id] as const,
};
