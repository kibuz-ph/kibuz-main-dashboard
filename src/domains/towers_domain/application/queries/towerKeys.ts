export const towerKeys = {
    all: ["towers"] as const,
    lists: () => [...towerKeys.all, "list"] as const,
    detail: (id: string) => [...towerKeys.all, "detail", id] as const,
};
