export type Tower = {
    id: string;
    name: string;
    description: string;
    residentialComplexId: string;
};

export type TowersResponse = {
    items: Tower[];
};
