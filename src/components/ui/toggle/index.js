import { cva } from "class-variance-authority";

export { default as Toggle } from "./Toggle.vue";

export const toggleVariants = cva(
  "inline-flex items-center justify-center gap-[var(--control-gap)] rounded-[var(--component-radius-button)] text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-[var(--control-icon-size)] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-[var(--control-height-md)] px-[var(--control-padding-x-md)] min-w-[var(--control-height-md)]",
        sm: "h-[var(--control-height-sm)] px-[var(--control-padding-x-sm)] min-w-[var(--control-height-sm)]",
        lg: "h-[var(--control-height-lg)] px-[var(--control-padding-x-lg)] min-w-[var(--control-height-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
