"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
  type RefObject,
  type SyntheticEvent,
} from "react";

const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

type FocusTarget = "first" | "last" | "menu";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean, focus?: FocusTarget) => void;
  close: (returnFocus?: boolean) => void;
  triggerId: string;
  menuId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  focusTarget: MutableRefObject<FocusTarget>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(
      "Dropdown.* components must be rendered inside <Dropdown>.",
    );
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

export interface DropdownProps {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function DropdownRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: DropdownProps) {
  const uid = useId();
  const isControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = isControlled ? openProp : innerOpen;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const focusTarget = useRef<FocusTarget>("menu");

  const setOpen = useCallback(
    (next: boolean, focus: FocusTarget = "menu") => {
      focusTarget.current = focus;
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(
    (returnFocus = true) => {
      setOpen(false);
      if (returnFocus) triggerRef.current?.focus();
    },
    [setOpen],
  );

  // Close on outside click / touch
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open, close]);

  return (
    <DropdownContext.Provider
      value={{
        open,
        setOpen,
        close,
        triggerId: `${uid}-trigger`,
        menuId: `${uid}-menu`,
        triggerRef,
        menuRef,
        focusTarget,
      }}
    >
      <div
        ref={rootRef}
        className={cn("relative inline-block text-left", className)}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export type DropdownTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

function DropdownTrigger({
  children,
  className,
  onClick,
  onKeyDown,
  ...rest
}: DropdownTriggerProps) {
  const { open, setOpen, close, triggerId, menuId, triggerRef } = useDropdown();

  return (
    <button
      {...rest}
      ref={triggerRef}
      id={triggerId}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? menuId : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        open ? close() : setOpen(true, "menu");
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true, "first");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setOpen(true, "last");
        }
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition",
        "hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Menu                                                                       */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end";
  side?: "bottom" | "top";
}

function DropdownMenu(props: DropdownMenuProps) {
  const { open } = useDropdown();
  // Mount the content only while open so focus logic runs on each open.
  return open ? <DropdownMenuContent {...props} /> : null;
}

function DropdownMenuContent({
  children,
  className,
  align = "start",
  side = "bottom",
  onKeyDown,
  ...rest
}: DropdownMenuProps) {
  const { close, triggerId, menuId, menuRef, focusTarget } = useDropdown();
  const typeahead = useRef({
    buffer: "",
    timer: 0 as unknown as ReturnType<typeof setTimeout>,
  });

  const getItems = () =>
    Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      ) ?? [],
    );

  // Initial focus
  useEffect(() => {
    const items = getItems();
    const target = focusTarget.current;
    if (target === "first") items[0]?.focus();
    else if (target === "last") items[items.length - 1]?.focus();
    else menuRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearTimeout(typeahead.current.timer), []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    const items = getItems();
    const idx = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        items[(idx + 1) % items.length]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        items[
          idx === -1
            ? items.length - 1
            : (idx - 1 + items.length) % items.length
        ]?.focus();
        break;
      case "Home":
        e.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const t = typeahead.current;
          clearTimeout(t.timer);
          t.buffer += e.key.toLowerCase();
          t.timer = setTimeout(() => (t.buffer = ""), 500);
          for (let n = 1; n <= items.length; n++) {
            const el = items[(idx + n + items.length) % items.length];
            if (el.textContent?.trim().toLowerCase().startsWith(t.buffer)) {
              el.focus();
              break;
            }
          }
        }
    }
  };

  return (
    <div
      {...rest}
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-labelledby={triggerId}
      aria-orientation="vertical"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={cn(
        "absolute z-50 min-w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg outline-none",
        "dark:border-gray-700 dark:bg-gray-900",
        align === "end" ? "right-0" : "left-0",
        side === "top" ? "bottom-full mb-1" : "top-full mt-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Item                                                                       */
/* -------------------------------------------------------------------------- */

export interface DropdownItemProps {
  children: ReactNode;
  className?: string;
  /** Renders a Next.js <Link> (or a plain <a> for absolute URLs). */
  href?: string;
  onSelect?: () => void;
  disabled?: boolean;
  /** Destructive styling (delete, sign out, ...). */
  danger?: boolean;
  /** Keep the menu open after selecting. Default: true (closes). */
  closeOnSelect?: boolean;
}

function DropdownItem({
  children,
  className,
  href,
  onSelect,
  disabled = false,
  danger = false,
  closeOnSelect = true,
}: DropdownItemProps) {
  const { close, menuRef } = useDropdown();

  const common = {
    role: "menuitem" as const,
    tabIndex: -1,
    "aria-disabled": disabled || undefined,
    className: cn(
      "flex w-full items-center gap-2 px-3 py-2 text-left text-sm outline-none transition-colors",
      disabled
        ? "cursor-not-allowed opacity-40"
        : danger
          ? "cursor-pointer text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:bg-red-500/10"
          : "cursor-pointer text-gray-700 focus:bg-gray-100 dark:text-gray-200 dark:focus:bg-gray-800",
      className,
    ),
    onClick: () => {
      if (disabled) return;
      onSelect?.();
      if (closeOnSelect) close(!href);
    },
    onMouseEnter: (e: SyntheticEvent<HTMLElement>) => {
      if (!disabled) e.currentTarget.focus();
    },
    onMouseLeave: () => menuRef.current?.focus(),
  };

  if (href && !disabled) {
    return /^https?:\/\//.test(href) ? (
      <a {...common} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link {...common} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button {...common} type="button" disabled={disabled}>
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Separator & Label                                                          */
/* -------------------------------------------------------------------------- */

function DropdownSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cn("my-1 h-px bg-gray-200 dark:bg-gray-700", className)}
    />
  );
}

function DropdownLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="presentation"
      className={cn(
        "px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Export                                                                     */
/* -------------------------------------------------------------------------- */

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
  Separator: DropdownSeparator,
  Label: DropdownLabel,
});

export default Dropdown;
