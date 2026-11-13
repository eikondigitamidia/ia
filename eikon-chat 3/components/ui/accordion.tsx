"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  const id = React.useId();
  return (
    <div className={cn("rounded-xl border border-border bg-card shadow-e1 transition-shadow duration-base", open && "shadow-e2")}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left text-base font-bold tracking-[-.01em] dark:font-semibold"
        >
          {title}
          <ChevronDown aria-hidden className={cn("size-4 text-muted-foreground transition-transform duration-base ease-out", open && "rotate-180")} />
        </button>
      </h3>
      <div id={id} hidden={!open} className="px-6 pb-6">{children}</div>
    </div>
  );
}
