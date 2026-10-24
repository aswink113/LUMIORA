"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { useAnimate, type Transition } from "framer-motion";

const TAGS = ["h1", "h2", "h3", "p", "div"] as const;

export interface ZoomTextTunnelProps {
  texts?: string[];
  font?: React.CSSProperties;
  color?: string;
  gradient?: string;
  tag?: (typeof TAGS)[number];
  maxScale?: number;
  hold?: number;
  stayDuration?: number;
  loop?: boolean;
  transition?: Transition;
  style?: React.CSSProperties;
  className?: string;
  onPassageChange?: (index: number, text: string) => void;
  onComplete?: () => void;
}

function OriginkitBase_ZoomTextTunnel(props: ZoomTextTunnelProps) {
  const {
    texts = ["LUMIORA", "WHERE INNOVATION BIGINS"],
    font = {
      fontFamily: "'Maggle', 'Outfit', 'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
      fontSize: "clamp(2rem, 6.5vw, 110px)",
      lineHeight: "1em",
      letterSpacing: "-0.02em",
      textAlign: "center",
    },
    color,
    gradient = "linear-gradient(135deg, #5E5BFF 0%, #7B68FF 50%, #A855F7 100%)",
    tag = "h2",
    maxScale = 8, // Optimized for 60fps GPU acceleration without texture thrashing
    hold = 2000,
    stayDuration = 2000,
    loop = false,
    transition = {
      type: "tween",
      duration: 1.1,
      ease: [0.25, 1, 0.5, 1],
    },
    style,
    className,
    onPassageChange,
    onComplete,
  } = props;

  const [scope, animate] = useAnimate();
  const slot0Ref = useRef<HTMLSpanElement>(null);
  const slot1Ref = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsRef = useRef<any[]>([]);

  const safeTexts = useMemo(() => {
    const cleaned = Array.isArray(texts)
      ? texts.filter((t) => typeof t === "string" && t.length > 0)
      : [];
    return cleaned.length > 0 ? cleaned : ["LUMIORA", "WHERE INNOVATION BIGINS"];
  }, [texts]);

  const textsKey = useMemo(() => safeTexts.join(":::"), [safeTexts]);

  const safeTextsRef = useRef(safeTexts);
  safeTextsRef.current = safeTexts;

  const transitionRef = useRef(transition);
  transitionRef.current = transition;

  const holdMsRef = useRef(Number(hold) || 800);
  holdMsRef.current = Number(hold) || 800;

  const stayDurationRef = useRef(Number(stayDuration) || 2000);
  stayDurationRef.current = Number(stayDuration) || 2000;

  const maxScaleRef = useRef(Number(maxScale) || 8);
  maxScaleRef.current = Number(maxScale) || 8;

  const loopRef = useRef(Boolean(loop));
  loopRef.current = Boolean(loop);

  const onPassageChangeRef = useRef(onPassageChange);
  onPassageChangeRef.current = onPassageChange;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const longest = useMemo(
    () => safeTexts.reduce((a, b) => (b.length > a.length ? b : a), safeTexts[0]),
    [safeTexts]
  );

  useEffect(() => {
    const slots = [slot0Ref.current, slot1Ref.current];
    const sel = [".slot-0", ".slot-1"];
    const currentTexts = safeTextsRef.current;

    if (currentTexts.length <= 1) {
      if (slots[0]) slots[0].textContent = currentTexts[0];
      animate(sel[0], { scale: 1, opacity: 1 }, { duration: 0 });
      animate(sel[1], { scale: 0.05, opacity: 0 }, { duration: 0 });
      if (!loopRef.current) {
        setTimeout(() => {
          onCompleteRef.current?.();
        }, stayDurationRef.current);
      }
      return;
    }

    let cancelled = false;
    let active = 0;
    let idx = 0;

    if (slots[0]) slots[0].textContent = currentTexts[0];
    animate(sel[0], { scale: 1, opacity: 1 }, { duration: 0 });
    animate(sel[1], { scale: 0.05, opacity: 0 }, { duration: 0 });
    onPassageChangeRef.current?.(0, currentTexts[0]);

    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timeoutRef.current = setTimeout(res, ms);
      });

    const settle = (c: any) => {
      if (!c) return Promise.resolve();
      if (c.finished && typeof c.finished.then === "function") return c.finished;
      if (typeof c.then === "function") return c;
      return Promise.resolve();
    };

    const run = async () => {
      while (!cancelled) {
        // Hold on current text (LUMIORA)
        await wait(holdMsRef.current);
        if (cancelled) return;

        const inc = 1 - active;
        const textsList = safeTextsRef.current;
        const nextIdx = (idx + 1) % textsList.length;
        if (slots[inc]) slots[inc].textContent = textsList[nextIdx];

        await settle(animate(sel[inc], { scale: 0.05, opacity: 0 }, { duration: 0 }));
        if (cancelled) return;

        const currentTransition = transitionRef.current;
        const currentMaxScale = maxScaleRef.current;

        // High-performance GPU accelerated zoom tunnel animation
        const enter = animate(sel[inc], { scale: 1, opacity: 1 }, currentTransition);
        const exit = animate(sel[active], { scale: currentMaxScale, opacity: 0 }, currentTransition);
        controlsRef.current = [enter, exit];

        await settle(exit);
        if (cancelled) return;

        await settle(animate(sel[active], { scale: 0.05, opacity: 0 }, { duration: 0 }));
        active = inc;
        idx = nextIdx;
        onPassageChangeRef.current?.(idx, textsList[idx]);

        // If not looping and reached the target slogan:
        if (!loopRef.current && idx === textsList.length - 1) {
          await wait(stayDurationRef.current);
          if (cancelled) return;

          onCompleteRef.current?.();
          break;
        }
      }
    };

    run();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      controlsRef.current.forEach((c) => c && c.stop && c.stop());
    };
  }, [textsKey, animate]);

  const fontStyles = font;
  const safeTag = (TAGS as readonly string[]).includes(tag) ? tag : "h2";
  const Tag = safeTag as any;

  const srOnly: React.CSSProperties = {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    border: 0,
  };

  const isGradient = Boolean(gradient || (color && color.includes("gradient")));
  const gradientValue = gradient || (color && color.includes("gradient") ? color : "linear-gradient(135deg, #5E5BFF 0%, #7B68FF 50%, #A855F7 100%)");

  const slotStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "pre",
    transformOrigin: "center center",
    willChange: "transform, opacity",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    padding: "0 1rem",
    ...(isGradient
      ? {
          background: gradientValue,
          backgroundSize: "250% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          animation: "textShimmerSweep 5.5s ease-in-out infinite",
        }
      : {
          color: color || "#111111",
        }),
    ...fontStyles,
  };

  return (
    <div
      ref={scope}
      aria-label={safeTexts.join(", ")}
      className={className}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        minWidth: 1,
        minHeight: 1,
        width: "100%",
        height: "100%",
        transform: "translateZ(0)",
        ...style,
      }}
    >
      <Tag style={srOnly}>{safeTexts.join(", ")}</Tag>

      <span
        aria-hidden="true"
        style={{
          visibility: "hidden",
          whiteSpace: "pre",
          padding: "0 1rem",
          ...fontStyles,
        }}
      >
        {longest}
      </span>

      <span ref={slot0Ref} className="slot-0" aria-hidden="true" style={slotStyle} />
      <span ref={slot1Ref} className="slot-1" aria-hidden="true" style={slotStyle} />
    </div>
  );
}

const __originkitPresetProps = {
  font: {
    variant: "Bold",
    fontSize: "clamp(2rem, 6.5vw, 110px)",
    textAlign: "center" as const,
    fontFamily: "'Maggle', 'Outfit', 'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    lineHeight: "1em",
    letterSpacing: "-0.02em",
  },
  texts: ["LUMIORA", "WHERE INNOVATION BIGINS"],
  gradient: "linear-gradient(135deg, #5E5BFF 0%, #7B68FF 50%, #A855F7 100%)",
};

export function ZoomTextTunnel(props: ZoomTextTunnelProps) {
  return (
    <OriginkitBase_ZoomTextTunnel
      {...(__originkitPresetProps as Record<string, unknown>)}
      {...props}
      font={{
        ...__originkitPresetProps.font,
        ...props.font,
      }}
    />
  );
}

export default ZoomTextTunnel;
