import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badge = cva("inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-semibold dark:font-medium", {
  variants: {
    tone: {
      success: "bg-success-bg text-success-fg",
      warning: "bg-warning-bg text-warning-fg",
      danger: "bg-danger-bg text-danger-fg",
      info: "bg-info-bg text-info-fg",
      neutral: "bg-muted text-subtle",
      outline: "border border-border bg-card text-subtle",
    },
  },
  defaultVariants: { tone: "neutral" },
});

const dot: Record<string, string> = {
  success: "bg-success", warning: "bg-warning", danger: "bg-danger", info: "bg-info", neutral: "bg-n-500", outline: "bg-n-500",
};

export function Badge({ tone = "neutral", dot: withDot = true, pulse, className, children }: VariantProps<typeof badge> & { dot?: boolean; pulse?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn(badge({ tone }), className)}>
      {withDot && (
        <span aria-hidden className={cn("relative size-1.5 rounded-full", dot[tone ?? "neutral"])}>
          {pulse && <span className={cn("absolute inset-0 rounded-full animate-ping2", dot[tone ?? "neutral"])} />}
        </span>
      )}
      {children}
    </span>
  );
}
