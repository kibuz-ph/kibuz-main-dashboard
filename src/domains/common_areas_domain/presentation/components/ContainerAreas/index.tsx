import { COMMON_AREAS } from "@/domains/common_areas_domain/application/jsonData";
import CardArea from "../CardArea";
import { Button } from "@/components/ui/button";

const ContainerAreas = () => {
    return (
        <div className="p-8 border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <i className="ri-map-pin-4-line mb-1"></i>
                    <h4 className="font-semibold text-lg">Zonas comunes</h4>
                </div>
                <Button type="submit" className="rounded-sm bg-brand-primary cursor-pointer">
                    <i className="ri-add-line"></i>
                    Agregar zona
                </Button>
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