export const vehicleKeys = {
    all: ["vehicles"] as const,
    lists: () => [...vehicleKeys.all, "list"] as const,
    detail: (id: string) => [...vehicleKeys.all, "detail", id] as const,
};
