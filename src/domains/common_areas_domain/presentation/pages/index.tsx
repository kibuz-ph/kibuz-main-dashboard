import { TITLE_MODULE } from "@/shared/application/constants/appData";
import ContainerAreas from '../components/ContainerAreas'
import InfoResidential from "../components/InfoResidential";
import { Button } from "@/components/ui/button";

const CommonAreasPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl">{TITLE_MODULE.RESIDENTIAL_COMPLEXES}</h2>
                <Button type="submit" className="rounded-sm bg-brand-primary cursor-pointer">
                    <i className="ri-pencil-line"></i>
                    Editar
                </Button>
            </div>
            <InfoResidential />
            <ContainerAreas />
        </div>
    );
};

export default CommonAreasPage;