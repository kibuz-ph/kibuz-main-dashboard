export interface CommonArea {
    id: string;
    name: string;
    icon: string;
    description: string;
    residentialComplexId?: string;
    residential_complex_id?: string;
}

export interface CommonAreasResponse {
    items: CommonArea[];
}

export interface CreateCommonAreaForm {
    name: string;
    icon: string;
    description: string;
}

export interface CreateCommonAreaBody {
    items?: string | Array<{
        name?: string;
        items?: string;
        icon: string;
        description: string;
    }>;
    name?: string;
    icon?: string;
    description?: string;
}

export type CreateCommonAreaResponse =
    | CommonArea
    | {
          message?: string;
          success?: boolean;
          data?: CommonArea;
      };

export interface CommonAreasProps {
    area: CommonArea
}
