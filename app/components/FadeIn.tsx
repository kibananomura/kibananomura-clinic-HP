"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-triggered fade + rise animation.
 * Honors prefers-reduced-motion by rendering content statically.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // 余白をマイナスにすると、Instagram・Facebookのアプリ内ブラウザで画面内でも表示されないことがあった（2026-11-14）
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
