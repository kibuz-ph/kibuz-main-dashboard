export interface ResidentialComplex {
    id: string;
    nit: number;
    name: string;
    slug: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
}

export interface ResidentialComplexesResponse {
    message: string;
    success: boolean;
    data: ResidentialComplex[];
}

export interface UpdateResidentialComplexBody {
    nit?: number;
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    primaryColor?: string;
    secondaryColor?: string;
}

export type UpdateResidentialComplexResponse =
    | ResidentialComplex
    | {
          message?: string;
          success?: boolean;
          data: ResidentialComplex;
      };
