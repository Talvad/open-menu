"use client";

import { Menu } from "@base-ui/react/menu";
import Link from "next/link";
import type { ComponentProps } from "react";

const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

type WithClassName<T> = Omit<T, "className"> & { className?: string };

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

// Wrapped (not aliased) so Object.assign below doesn't mutate Base UI's Menu.Root.
function DropdownRoot(props: ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />;
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export type DropdownTriggerProps = WithClassName<
  ComponentProps<typeof Menu.Trigger>
>;

function DropdownTrigger({ className, ...props }: DropdownTriggerProps) {
  return (
    <Menu.Trigger
      {...props}
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition",
        "hover:bg-gray-50 data-[popup-open]:bg-gray-100",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo-500",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:data-[popup-open]:bg-gray-800",
        className,
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Menu (Portal + Positioner + Popup in one)                                  */
/* -------------------------------------------------------------------------- */

export type DropdownMenuProps = WithClassName<
  ComponentProps<typeof Menu.Popup>
> &
  Pick<ComponentProps<typeof Menu.Positioner>, "side" | "align" | "sideOffset">;

function DropdownMenu({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  ...props
}: DropdownMenuProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50 outline-none"
      >
        <Menu.Popup
          {...props}
          className={cn(
            "min-w-48 origin-[var(--transform-origin)] rounded-lg border border-gray-200 bg-white py-1 shadow-lg outline-none",
            "transition-[opacity,transform] duration-150",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            "dark:border-gray-700 dark:bg-gray-900",
            className,
          )}
        />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

/* -------------------------------------------------------------------------- */
/* Item                                                                       */
/* -------------------------------------------------------------------------- */

export interface DropdownItemProps extends WithClassName<
  ComponentProps<typeof Menu.Item>
> {
  /** Renders a Next.js <Link> (or a plain <a> for absolute URLs). */
  href?: string;
  /** Destructive styling (delete, sign out, ...). */
  danger?: boolean;
}

function DropdownItem({
  className,
  href,
  danger = false,
  render,
  ...props
}: DropdownItemProps) {
  const linkRender = href ? (
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" />
    ) : (
      <Link href={href} />
    )
  ) : (
    render
  );

  return (
    <Menu.Item
      {...props}
      render={linkRender}
      className={cn(
        "flex w-full cursor-pointer select-none items-center gap-2 px-3 py-2 text-left text-sm outline-none transition-colors",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        danger
          ? "text-red-600 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-500/10"
          : "text-gray-700 data-[highlighted]:bg-gray-100 dark:text-gray-200 dark:data-[highlighted]:bg-gray-800",
        className,
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Group, Label, Separator                                                    */
/* -------------------------------------------------------------------------- */

function DropdownGroup(props: ComponentProps<typeof Menu.Group>) {
  return <Menu.Group {...props} />;
}

function DropdownLabel({
  className,
  ...props
}: WithClassName<ComponentProps<typeof Menu.GroupLabel>>) {
  return (
    <Menu.GroupLabel
      {...props}
      className={cn(
        "px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500",
        className,
      )}
    />
  );
}

function DropdownSeparator({
  className,
  ...props
}: WithClassName<ComponentProps<typeof Menu.Separator>>) {
  return (
    <Menu.Separator
      {...props}
      className={cn("my-1 h-px bg-gray-200 dark:bg-gray-700", className)}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

// Named exports: use these when importing into a Server Component
// (dot access like <Dropdown.Item> only works inside Client Components).
export {
  DropdownRoot,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownGroup,
  DropdownLabel,
  DropdownSeparator,
};
