export const residentialComplexKeys = {
    all: ["residential-complexes"] as const,
    lists: () => [...residentialComplexKeys.all, "list"] as const,
    detail: (id: string) => [...residentialComplexKeys.all, "detail", id] as const,
};