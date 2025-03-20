"use client";
import clsx from "clsx";

type Size = "4" | "8" | "12" | "16" | "20" | "24" | "32" | "40" | "80";

type Props = {
  size: Size;
  className?: string;
  isResponsive?: boolean;
};

const commonStyles = clsx("block w-px h-px");

export function Spacer({ size, className, isResponsive }: Props) {
  const SIZE_MAP: Record<Size, string> = {
    4: clsx("mt-1"),
    8: clsx("mt-2"),
    12: clsx("mt-3"),
    16: clsx("mt-4"),
    20: clsx("mt-5"),
    24: clsx("mt-6"),
    32: clsx("mt-8"),
    40: clsx({ "mt-10": !isResponsive }, { "mt-6 lg:mt-10": isResponsive }),
    80: clsx("mt-40"),
  };

  const styles = clsx(commonStyles, SIZE_MAP[size], className);

  return <span className={styles} aria-hidden />;
}
