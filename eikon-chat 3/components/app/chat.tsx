import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

export function Bubble({ de, texto, hora }: { de: "eu" | "lead"; texto: string; hora: string }) {
  const eu = de === "eu";
  return (
    <div className={cn("flex max-w-[78%] flex-col gap-1 animate-fade-up", eu ? "items-end self-end" : "items-start self-start")}>
      <div
        className={cn(
          "whitespace-pre-line px-3.5 py-2.5 text-sm leading-[21px] [text-wrap:pretty]",
          eu
            ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground shadow-brand"
            : "rounded-2xl rounded-bl-md border border-border bg-card text-foreground shadow-e1 dark:border-[#1F2737] dark:bg-muted"
        )}
      >
        {texto}
      </div>
      <span className="px-1.5 font-mono text-[10.5px] text-muted-foreground">{hora}</span>
    </div>
  );
}

export function ConversationItem({ handle, hora, ultima, naoLidas, ativo, onClick }: { handle: string; hora: string; ultima: string; naoLidas: number; ativo?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={ativo ? "true" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors duration-fast ease-out",
        ativo ? "border-accent-ring bg-accent dark:border-[#22304C] dark:bg-[#131B2C]" : "border-transparent hover:bg-muted dark:hover:bg-[#111725]"
      )}
    >
      <Avatar name={handle} />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-2">
          <strong className="truncate text-sm font-bold dark:font-semibold">{handle}</strong>
          <span className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">{hora}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className={cn("min-w-0 flex-1 truncate text-[13px]", naoLidas ? "font-medium text-foreground" : "text-muted-foreground")}>{ultima}</span>
          {naoLidas > 0 && (
            <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1.5 font-mono text-[10.5px] font-medium text-primary-foreground">
              <span className="sr-only">Não lidas: </span>{naoLidas}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}
