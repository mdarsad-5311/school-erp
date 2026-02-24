import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../../lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
    [k in string]: {
        label?: React.ReactNode;
        icon?: React.ComponentType;
    } & (
        | { color?: string; theme?: never }
        | { color?: never; theme: Record<keyof typeof THEMES, string> }
    );
};

type ChartContextProps = {
    config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
    const context = React.useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}

const ChartContainer = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        config: ChartConfig;
        children: React.ComponentProps<
            typeof RechartsPrimitive.ResponsiveContainer
        >["children"];
    }
>(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                ref={ref}
                data-chart={chartId}
                className={cn(
                    "flex aspect-video justify-center text-xs",
                    className
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter(
        ([_, cfg]) => cfg.color || cfg.theme
    );

    if (!colorConfig.length) return null;

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
                                .map(([key, cfg]) => {
                                    const color =
                                        cfg.theme?.[theme as keyof typeof cfg.theme] || cfg.color;
                                    return color ? `  --color-${key}: ${color};` : null;
                                })
                                .join("\n")}
}
`
                    )
                    .join("\n"),
            }}
        />
    );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
        hideLabel?: boolean;
        hideIndicator?: boolean;
        indicator?: "line" | "dot" | "dashed";
        nameKey?: string;
        labelKey?: string;
    }
>(
    (
        {
            active,
            payload,
            className,
            indicator = "dot",
            hideLabel = false,
            hideIndicator = false,
            label,
            labelFormatter,
            labelClassName,
            formatter,
            nameKey,
            labelKey,
        },
        ref
    ) => {
        const { config } = useChart();

        if (!active || !payload?.length) return null;

        return (
            <div
                ref={ref}
                className={cn(
                    "grid min-w-[8rem] gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
                    className
                )}
            >
                {payload.map((item, index) => {
                    const key = `${nameKey || item.name || item.dataKey || "value"}`;
                    const itemConfig = getPayloadConfigFromPayload(config, item, key);
                    const indicatorColor =
                        item.payload?.fill || item.color;

                    return (
                        <div
                            key={`${item.dataKey}-${index}`}
                            className="flex items-center gap-2"
                        >
                            {!hideIndicator && (
                                <div
                                    className="h-2.5 w-2.5 rounded-sm"
                                    style={{ backgroundColor: indicatorColor }}
                                />
                            )}
                            <span className="text-muted-foreground">
                                {itemConfig?.label || item.name}
                            </span>
                            <span className="ml-auto font-mono">
                                {item.value?.toLocaleString()}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
        hideIcon?: boolean;
        nameKey?: string;
    }
>(({ className, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!payload?.length) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "flex justify-center gap-4",
                verticalAlign === "top" ? "pb-3" : "pt-3",
                className
            )}
        >
            {payload.map((item, index) => {
                const key = `${nameKey || item.dataKey || "value"}`;
                const itemConfig = getPayloadConfigFromPayload(config, item, key);

                return (
                    <div key={`${item.value}-${index}`} className="flex items-center gap-1.5">
                        <div
                            className="h-2 w-2 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        {itemConfig?.label}
                    </div>
                );
            })}
        </div>
    );
});
ChartLegendContent.displayName = "ChartLegend";

function getPayloadConfigFromPayload(
    config: ChartConfig,
    payload: unknown,
    key: string
) {
    if (typeof payload !== "object" || payload === null) return undefined;
    return key in config ? config[key] : undefined;
}

export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
};
