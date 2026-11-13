import { ChevronLeft, Phone, Video, Camera, Heart, Signal, Wifi, BatteryFull } from "lucide-react";
import { cn } from "@/lib/utils";

/** Mock de iPhone para a prévia da campanha. Sempre escuro (como o Instagram em modo escuro). */
export function IPhone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[300px]", className)}>
      <div className="relative aspect-[9/19] rounded-[46px] border-[10px] border-[#1C1F26] bg-black p-0 shadow-e3 ring-1 ring-white/10">
        <span aria-hidden className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex h-full flex-col overflow-hidden rounded-[36px] bg-black text-white">
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold" aria-hidden>
            <span>12:13</span>
            <span className="flex items-center gap-1"><Signal className="size-3" /><Wifi className="size-3" /><BatteryFull className="size-3.5" /></span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function IgDmHeader({ conta }: { conta: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
      <ChevronLeft className="size-5" aria-hidden />
      <span className="size-7 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] p-[1.5px]" aria-hidden><span className="block size-full rounded-full border-2 border-black bg-[#2A2F3A]" /></span>
      <span className="flex-1 text-[13px] font-semibold">{conta}</span>
      <Phone className="size-4" aria-hidden /><Video className="ml-3 size-[18px]" aria-hidden />
    </div>
  );
}

export function IgDmBubble({ children, link }: { children: React.ReactNode; link?: string }) {
  return (
    <div className="flex items-end gap-2 self-start">
      <span aria-hidden className="size-6 shrink-0 rounded-full bg-[#2A2F3A]" />
      <div className="max-w-[200px] overflow-hidden rounded-[18px] bg-[#262626] text-[12.5px] leading-[18px]">
        <p className="whitespace-pre-line px-3 py-2">{children}</p>
        {link && <span className="block border-t border-white/10 px-3 py-2 text-center text-[12px] font-semibold text-[#4C9EFF]">{link}</span>}
      </div>
    </div>
  );
}

export function IgComposer() {
  return (
    <div className="mt-auto flex items-center gap-2 px-3 pb-4 pt-2" aria-hidden>
      <span className="grid size-8 place-items-center rounded-full bg-[#3797F0]"><Camera className="size-4" /></span>
      <span className="flex-1 rounded-full bg-[#262626] px-3 py-2 text-[12px] text-white/50">Mensagem...</span>
    </div>
  );
}

export function IgComment({ user, text }: { user: string; text: string }) {
  return (
    <div className="flex gap-2.5">
      <span aria-hidden className="size-8 shrink-0 rounded-full bg-[#3A3F4A]" />
      <div className="flex-1 text-[12px] leading-[17px]">
        <p><strong className="font-semibold">{user}</strong> <span className="text-white/50">Agora</span></p>
        <p>{text}</p>
        <p className="mt-0.5 text-white/50">Responder</p>
      </div>
      <Heart className="size-3.5 text-white/60" aria-hidden />
    </div>
  );
}
