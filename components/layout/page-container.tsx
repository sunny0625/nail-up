import type { ReactNode } from "react";

/**
 * Container widths, one per `--container-*` design token in app/globals.css.
 * Full literal class names keep Tailwind's source scan able to generate them.
 */
const widthClasses = {
  narrow: "max-w-narrow", // reading column
  content: "max-w-content", // standard page content
  wide: "max-w-wide", // editorial wide / hero
} as const;

export type PageContainerWidth = keyof typeof widthClasses;

type PageContainerProps = Readonly<{
  /** Which container-width token to apply. Defaults to `content`. */
  width?: PageContainerWidth;
  children: ReactNode;
}>;

/**
 * Centres page content at a container-width token, with horizontal gutters from
 * the spacing tokens (smaller below the 768px breakpoint, larger from `md` up).
 * Every width and spacing value comes from a design token, never a literal.
 */
export function PageContainer({ width = "content", children }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full px-md md:px-lg ${widthClasses[width]}`}>
      {children}
    </div>
  );
}
