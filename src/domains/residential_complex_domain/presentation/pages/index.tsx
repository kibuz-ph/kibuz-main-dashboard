import { TITLE_MODULE } from "@/shared/application/constants/appData";
import ContainerAreas from '../components/ContainerAreas'
import InfoResidential from "../components/InfoResidential";
import { Button } from "@/components/ui/button";
import { useResidentialComplexes } from "../../application/hooks/useResidentialComplexes";

const CommonAreasPage = () => {
    const { data, isLoading, isError } = useResidentialComplexes();

      if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar</p>;
  
    console.log('data', data)
    return (
        <div>
            <div className="flex justify-between items-center £mb-6">
                <h2 className="font-semibold text-2xl">{TITLE_MODULE.RESIDENTIAL_COMPLEXES}</h2>
                <Button type="submit" className="rounded-sm cursor-pointer">
                    <i className="ri-pencil-line"></i>
                    Editar
                </Button>
            </div>
            <InfoResidential />
            <ContainerAreas />
        </div>
    );
};

// #e6e6e6

export default CommonAreasPage;