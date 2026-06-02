import { TITLE_MODULE } from '@/shared/application/constants/appData';
import ResidentialManager from './preview'
const TowersPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl text-brand-title">{TITLE_MODULE.TOWERS}</h2>
                {/* <HeaderButton text="Agregar" icon="ri-add-line" /> */}
            </div>
            <ResidentialManager />
        </div>
    );
};

export default TowersPage;