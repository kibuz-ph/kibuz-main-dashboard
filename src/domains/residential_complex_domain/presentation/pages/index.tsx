import { TITLE_MODULE } from "@/shared/application/constants/appData";
import InfoResidential from "../components/InfoResidential";
import CommonAreasPage from "@/domains/common_areas_domain/presentation/pages";

const ResidentialComplexPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl text-brand-title">{TITLE_MODULE.RESIDENTIAL_COMPLEXES}</h2>
            </div>
            <InfoResidential />
            <CommonAreasPage />
        </div>
    );
};

export default ResidentialComplexPage;
