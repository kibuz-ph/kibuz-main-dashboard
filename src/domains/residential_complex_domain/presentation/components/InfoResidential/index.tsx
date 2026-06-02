import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { useAppSelector } from "@/shared/application/store/hooks";

const InfoResidential = () => {
    const complex = useAppSelector(selectActiveComplex);

    if (!complex) {
        return (
            <div className="mb-6 rounded-xl border border-app-background-2 bg-white p-6">
                <p className="text-sm text-slate-500">Cargando informacion de la unidad residencial...</p>
            </div>
        );
    }

    const summaryText = [
        complex.address,
        [complex.city, complex.state].filter(Boolean).join(", "),
        complex.country,
    ]
        .filter(Boolean)
        .join(" • ");

    return (
        <div className="p-6 bg-white rounded-xl border border-app-background-2 mb-6">
            <div className="flex justify-start items-center gap-6 mb-6">
                <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                    {complex.logo ? (
                        <img
                            src={complex.logo}
                            alt={complex.name}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <span className="px-6 text-center text-sm font-semibold text-slate-500">
                            {complex.name}
                        </span>
                    )}
                </div>
                <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Unidad residencial</p>
                    <h3 className="text-2xl font-semibold text-brand-title">{complex.name}</h3>
                    <p className="text-sm leading-6 text-slate-600">
                        {summaryText || "La informacion principal de esta unidad residencial se carga desde el API."}
                    </p>
                </div>
            </div>

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
                    <p className="text-gray-500">Telefono</p>
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
                    <p className="text-gray-500">Pais</p>
                    <p className="font-semibold">{complex.country}</p>
                </div>

                <div>
                    <p className="text-gray-500">Slug</p>
                    <p className="font-semibold">{complex.slug}</p>
                </div>

                <div className="col-span-2">
                    <p className="text-gray-500">Direccion</p>
                    <p className="font-semibold">{complex.address}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoResidential;
