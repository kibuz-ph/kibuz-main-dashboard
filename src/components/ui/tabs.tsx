import * as React from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
    value: string;
    setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used within <Tabs />");
    }
    return context;
};

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
};

const Tabs = ({ value, defaultValue, onValueChange, className, children, ...props }: TabsProps) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const isControlled = value !== undefined;
    const resolvedValue = isControlled ? value : internalValue;

    const setValue = (nextValue: string) => {
        if (!isControlled) {
            setInternalValue(nextValue);
        }
        onValueChange?.(nextValue);
    };

    return (
        <TabsContext.Provider value={{ value: resolvedValue, setValue }}>
            <div className={cn("space-y-4", className)} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "inline-flex h-10 items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-600 mx-auto",
                className
            )}
            {...props}
        />
    )
);
TabsList.displayName = "TabsList";

type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
};

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, value, ...props }, ref) => {
        const { value: currentValue, setValue } = useTabsContext();
        const isActive = currentValue === value;

        return (
            <button
                ref={ref}
                type="button"
                data-state={isActive ? "active" : "inactive"}
                onClick={() => setValue(value)}
                className={cn(
                    "inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors cursor-pointer",
                    "data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm",
                    "data-[state=inactive]:text-slate-500 hover:text-slate-900",
                    className
                )}
                {...props}
            />
        );
    }
);
TabsTrigger.displayName = "TabsTrigger";

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
    value: string;
};

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, value, ...props }, ref) => {
        const { value: currentValue } = useTabsContext();
        if (currentValue !== value) return null;

        return <div ref={ref} className={cn("mt-2", className)} {...props} />;
    }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
