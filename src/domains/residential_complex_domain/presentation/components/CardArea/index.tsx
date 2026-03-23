import type { CommonAreasProps } from "@/domains/common_areas_domain/application/constants/types";

const CardArea = ({area}: CommonAreasProps) => {
    return (
        <div className="border border-gray-200 shadow-md bg-white rounded-lg overflow-hidden">
            <div className="flex flex-col">
                <div className="flex justify-center items-center h-30 bg-gray-300">
                    {/* {area.icon} */}
                    <i className="ri-home-smile-2-line text-[40px] text-gray-400"></i>
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-center gap-2">
                        <i className="ri-home-line mb-1"></i>
                        <h3 className="font-semibold m-0 p-0">{area.name}</h3>
                    </div>
                    <div className="flex items-start gap-2">
                        <i className="ri-separator"></i>
                        <p>{area.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardArea;