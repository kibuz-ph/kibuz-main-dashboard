export const COMMON_AREA_ICON_OPTIONS = [
    { value: "icon-swimming", label: "Piscina", iconClass: "ri-water-flash-line" },
    { value: "icon-gym", label: "Gimnasio", iconClass: "ri-run-line" },
    { value: "icon-bbq", label: "Zona BBQ", iconClass: "ri-fire-line" },
    { value: "icon-social-room", label: "Salon social", iconClass: "ri-community-line" },
    { value: "icon-kids-park", label: "Parque infantil", iconClass: "ri-gamepad-line" },
    { value: "icon-pets", label: "Zona de mascotas", iconClass: "ri-bear-smile-line" },
    { value: "icon-sports-court", label: "Cancha deportiva", iconClass: "ri-football-line" },
    { value: "icon-coworking", label: "Coworking", iconClass: "ri-briefcase-4-line" },
] as const;

export const resolveCommonAreaIconClass = (icon: string) => {
    const mapped = COMMON_AREA_ICON_OPTIONS.find((option) => option.value === icon);
    if (mapped) return mapped.iconClass;

    const normalized = icon.toLowerCase();

    if (normalized.includes("swim") || normalized.includes("pool") || normalized.includes("pisc")) {
        return "ri-water-flash-line";
    }
    if (normalized.includes("gym") || normalized.includes("fit")) {
        return "ri-run-line";
    }
    if (normalized.includes("bbq") || normalized.includes("grill")) {
        return "ri-fire-line";
    }
    if (normalized.includes("pet") || normalized.includes("paw") || normalized.includes("mascot")) {
        return "ri-bear-smile-line";
    }
    if (normalized.includes("child") || normalized.includes("park") || normalized.includes("play")) {
        return "ri-gamepad-line";
    }
    if (normalized.includes("cowork") || normalized.includes("office")) {
        return "ri-briefcase-4-line";
    }
    if (normalized.includes("sport") || normalized.includes("court") || normalized.includes("ball")) {
        return "ri-football-line";
    }
    return "ri-home-smile-2-line";
};
