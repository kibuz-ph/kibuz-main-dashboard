import { Card, CardContent } from "@/components/ui/card";

export type StatCardItem = {
    label: string;
    value: string;
    sub?: string;
    icon?: string;
};

type StatsCardsProps = {
    items: StatCardItem[];
};

const StatsCards = ({ items }: StatsCardsProps) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {items.map((item) => (
                <Card key={item.label} className="border-slate-100 shadow-none bg-white rounded-xl">
                    <CardContent className="pt-5 pb-4 px-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{item.label}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1 leading-none">{item.value}</p>
                                {item.sub ? <p className="text-xs text-slate-400 mt-1.5">{item.sub}</p> : null}
                            </div>
                            {item.icon ? <span className="text-2xl mt-0.5">{item.icon}</span> : null}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StatsCards;
