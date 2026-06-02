import { TITLE_MODULE } from "@/shared/application/constants/appData";

const DashboardPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl text-brand-title">{TITLE_MODULE.DASHBOARD}</h2>
            </div>
        </div>
    );
};

export default DashboardPage;