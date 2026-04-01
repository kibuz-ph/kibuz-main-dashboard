import { COMMON_AREAS } from "@/domains/common_areas_domain/application/jsonData";
import CardArea from "../CardArea";
import HeaderButton from "@/shared/presentation/components/HeaderButton";

const ContainerAreas = () => {
    return (
        <div className="p-8 border border-app-background-2 rounded-xl">
            <div className="flex justify-between items-center mb-8">
                <h4 className="font-semibold text-lg">Zonas comunes</h4>
                <HeaderButton text="Agregar zona" icon="ri-add-line" />
            </div>
            <div className="grid grid-cols-3 2xl:grid-cols-5 gap-8">
                {COMMON_AREAS.map(item => {
                    return <CardArea key={item.id} area={item} />
                })}
            </div>
        </div>
    );
};

export default ContainerAreas;