import Link from "next/link";
import { Fragment } from "react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Trilha">
      <ol className="flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={it.label}>
              <li>
                {last ? (
                  <span aria-current="page" className="font-semibold text-foreground dark:font-medium">{it.label}</span>
                ) : it.href ? (
                  <Link href={it.href} className="hover:text-foreground">{it.label}</Link>
                ) : (
                  it.label
                )}
              </li>
              {!last && <li aria-hidden className="text-n-400">/</li>}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
