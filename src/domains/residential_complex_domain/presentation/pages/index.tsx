import { TITLE_MODULE } from "@/shared/application/constants/appData";
import ContainerAreas from '../components/ContainerAreas'
import InfoResidential from "../components/InfoResidential";
import HeaderButton from "@/shared/presentation/components/HeaderButton";
// import { useResidentialComplexes } from "../../application/hooks/useResidentialComplexes";
// import UsersDashboard from "./users-dashboard";

const CommonAreasPage = () => {
    // const { data, isLoading, isError } = useResidentialComplexes();

//       if (isLoading) return <p>Cargando...</p>;
//   if (isError) return <p>Error al cargar</p>;
  
    // console.log('data', data)
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl text-brand-text">{TITLE_MODULE.RESIDENTIAL_COMPLEXES}</h2>
                <HeaderButton text="Editar" icon="ri-pencil-line" />
            </div>
            <InfoResidential />
            <ContainerAreas />
            {/* <UsersDashboard /> */}
        </div>
    );
};

// #e6e6e6

export default CommonAreasPage;