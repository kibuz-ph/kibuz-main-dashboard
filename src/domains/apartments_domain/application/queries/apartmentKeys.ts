export const apartmentKeys = {
    all: ["apartments"] as const,
    lists: () => [...apartmentKeys.all, "list"] as const,
    detail: (id: string) => [...apartmentKeys.all, "detail", id] as const,
};
