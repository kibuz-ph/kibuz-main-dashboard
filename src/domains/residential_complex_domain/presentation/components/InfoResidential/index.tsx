import { RESIDENTIAL_COMPLEXES } from "@/domains/common_areas_domain/application/jsonResidential";

const InfoResidential = () => {
    const complex = RESIDENTIAL_COMPLEXES[0];
    return (
        <div className="p-6 bg-white rounded-xl border mb-6">
            {/* Logo */}
            <div className="flex justify-start items-center gap-6 mb-6">
                <img
                    src={complex.logo}
                    alt={complex.name}
                    className="h-50 w-50 object-contain"
                />
                <p>Deja que la naturaleza guie tus días en nuestro proyecto FaroVerde, ubicado en el sector de Calasanz, una de las zonas del occidente de la ciudad más buscadas en la actualidad, gracias a la combinación de un ambiente campestre, que permite vivir en un lugar tranquilo y fresco, pero sin sacrificar la cercanía con todos los servicios de la ciudad como lo son universidades, hospitales, colegios y zonas comerciales. FaroVerde es un proyecto con un diseño versátil, de generosos espacios pensados en diferentes estilos de vida y familias.</p>
            </div>

            {/* Información */}
            <div className="grid grid-cols-3 2xl:grid-cols-4 gap-4 text-sm">
            
            <div>
                <p className="text-gray-500">Nombre</p>
                <p className="font-semibold">{complex.name}</p>
            </div>

            <div>
                <p className="text-gray-500">NIT</p>
                <p className="font-semibold">{complex.nit}</p>
            </div>

            <div>
                <p className="text-gray-500">Teléfono</p>
                <p className="font-semibold">{complex.phone}</p>
            </div>

            <div>
                <p className="text-gray-500">Ciudad</p>
                <p className="font-semibold">{complex.city}</p>
            </div>

            <div>
                <p className="text-gray-500">Departamento</p>
                <p className="font-semibold">{complex.state}</p>
            </div>

            <div>
                <p className="text-gray-500">País</p>
                <p className="font-semibold">{complex.country}</p>
            </div>

            <div className="col-span-2">
                <p className="text-gray-500">Dirección</p>
                <p className="font-semibold">{complex.address}</p>
            </div>

            </div>
        </div>
    );
};

export default InfoResidential;