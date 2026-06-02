export const commonAreaKeys = {
    all: ["common-areas"] as const,
    lists: () => [...commonAreaKeys.all, "list"] as const,
    detail: (id: string) => [...commonAreaKeys.all, "detail", id] as const,
};
