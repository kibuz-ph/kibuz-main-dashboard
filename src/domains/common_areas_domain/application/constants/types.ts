export interface CommonAreas {
    id: string;
    name: string;
    icon: string;
    description: string;
    residential_complex_id: string;
}

export interface CommonAreasProps {
    area: CommonAreas
}