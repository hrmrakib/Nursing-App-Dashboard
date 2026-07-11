// lib/toast.ts
"use client";

import toast, {
  Toast,
  Renderable,
  ValueFunction,
  ValueOrFunction,
} from "react-hot-toast";

interface StyledOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  icon?: Renderable;
  style?: React.CSSProperties;
  iconTheme?: { primary: string; secondary: string };
}

export const showToast = {
  /** toast.success('Successfully toasted!') */
  success: (message: string, options?: StyledOptions) =>
    toast.success(message, options),

  /** toast.error("This didn't work.") */
  error: (message: string, options?: StyledOptions) =>
    toast.error(message, options),

  /** Plain toast, optionally with a custom icon or long duration */
  info: (message: string, options?: StyledOptions) => toast(message, options),

  /** toast.promise(...) wrapper */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: Renderable;
      success: ValueOrFunction<Renderable, T>;
      error: ValueOrFunction<Renderable, unknown>;
    },
    options?: StyledOptions,
  ) => toast.promise(promise, messages, options),

  /** A long-form message with an extended duration */
  big: (message: string, durationMs = 6000) =>
    toast(message, { duration: durationMs }),

  /** toast('Good Job!', { icon: '👏' }) */
  withIcon: (message: string, icon: Renderable) => toast(message, { icon }),

  /** Fully custom styled toast (dark theme, radius, etc.) */
  styled: (message: string, style: React.CSSProperties, icon?: Renderable) =>
    toast(message, { icon, style }),

  /** A toast with a dismiss button and bold text, controlled via t.id */
  interactive: (renderContent: ValueFunction<Renderable, Toast>) =>
    toast((t) => renderContent(t)),

  /** Fully custom JSX toast, e.g. a card-style notification */
  custom: (
    renderContent: ValueFunction<Renderable, Toast>,
    options?: StyledOptions,
  ) => toast.custom((t) => renderContent(t), options),

  dismiss: (id?: string) => toast.dismiss(id),
  remove: (id?: string) => toast.remove(id),
};
