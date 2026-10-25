// Text Morph — Originkit (Enhanced for Crystal-Clear Glass Effect)

"use client";

import React, { useId, useMemo } from "react";

function mapEaseToCSS(ease: any): string {
    if (Array.isArray(ease) && ease.length === 4) {
        return `cubic-bezier(${ease.join(",")})`;
    }
    switch (ease) {
        case "linear":
            return "linear";
        case "easeIn":
            return "ease-in";
        case "easeOut":
            return "ease-out";
        case "easeInOut":
            return "ease-in-out";
        case "circIn":
            return "cubic-bezier(0.6, 0.04, 0.98, 0.335)";
        case "circOut":
            return "cubic-bezier(0.075, 0.82, 0.165, 1)";
        case "circInOut":
            return "cubic-bezier(0.785, 0.135, 0.15, 0.86)";
        case "backIn":
            return "cubic-bezier(0.6, -0.28, 0.735, 0.045)";
        case "backOut":
            return "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        case "backInOut":
            return "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        default:
            return "ease-in-out";
    }
}

export default function TextMorph(props: any) {
    props = { ...COMPONENT_DEFAULTS, ...props };
    const { words, color, font, transition, tag, style, className, glass = true } = props;

    const morph = Math.max(0.1, transition?.duration ?? 1);
    const hold = Math.max(0, transition?.delay ?? 1);
    const easeCurve: string = transition?.ease ?? "easeInOut";
    const easeCSS = mapEaseToCSS(easeCurve);

    const Tag = (tag ?? "div") as any;

    const wordList = useMemo<string[]>(
        () =>
            (words as string)
                .split(/\r?\n|,/)
                .map((w) => w.trim())
                .filter(Boolean),
        [words]
    );

    const rawId = useId();
    const safeId = rawId.replace(/[:]/g, "");
    const animName = `tm-rot-${safeId}`;

    const count = Math.max(1, wordList.length);

    const slot = morph + hold;
    const cycle = slot * count;
    const pct = (s: number) => Math.min(100, (s / cycle) * 100).toFixed(4);
    const mIn = pct(morph);
    const mHold = pct(morph + hold);
    const mOut = pct(2 * morph + hold);

    const typeface = font ?? {};
    const textAlign: string = (typeface as any)?.textAlign ?? "left";
    const isLeft = textAlign === "left";
    const baseTranslate = isLeft ? "translate(0, -50%)" : "translate(-50%, -50%)";
    const leftPos = isLeft ? "0%" : "50%";

    // Keyframes: Pure crisp vector morph with no blur smudges or background artifacts
    const keyframes = `
@keyframes ${animName} {
  0% {
    opacity: 0;
    transform: ${baseTranslate} translateY(12px) scale(0.96);
  }
  ${mIn}% {
    opacity: 1;
    transform: ${baseTranslate} translateY(0px) scale(1);
  }
  ${mHold}% {
    opacity: 1;
    transform: ${baseTranslate} translateY(0px) scale(1);
  }
  ${mOut}%, 100% {
    opacity: 0;
    transform: ${baseTranslate} translateY(-12px) scale(1.02);
  }
}
`;

    const fontStyle = Object.fromEntries(
        Object.entries(typeface).filter(([k]) => k !== "textAlign")
    );

    const longest = wordList.reduce(
        (acc, w) => (w.length > acc.length ? w : acc),
        ""
    );

    // Glass text styling: crystalline translucent glass with crisp frosted specular rim, ZERO background haze
    const glassStyle: React.CSSProperties = glass
        ? {
            backgroundImage: "linear-gradient(135deg, #3730A3 0%, #4F46E5 25%, #5E5BFF 50%, #8A6DFF 75%, #A855F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.8)",
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }
        : {
            color: color || "#5E5BFF",
          };

    return (
        <Tag
            className={className}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "center",
                alignItems: "center",
                overflow: "visible",
                userSelect: "none",
                ...style,
            }}
        >
            <style>{keyframes}</style>

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: isLeft ? "flex-start" : "center",
                    alignItems: "center",
                    textAlign: textAlign as any,
                    overflow: "visible",
                    ...fontStyle,
                }}
            >
                <div
                    style={{
                        position: "relative",
                        display: "inline-flex",
                        justifyContent: isLeft ? "flex-start" : "center",
                        alignItems: "center",
                        lineHeight: 1.25,
                        minHeight: "1.25em",
                        overflow: "visible",
                        width: "max-content",
                        maxWidth: "100%",
                    }}
                >
                    <span
                        style={{
                            visibility: "hidden",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            padding: "0 2.5rem",
                        }}
                    >
                        {longest || " "}
                    </span>

                    {wordList.map((word, i) => (
                        <span
                            key={`${word}-${i}`}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: leftPos,
                                transform: baseTranslate,
                                opacity: 0,
                                whiteSpace: "nowrap",
                                animation: `${animName} ${cycle}s ${(slot * i).toFixed(3)}s infinite ${easeCSS}`,
                                willChange: "opacity, filter, transform",
                                ...glassStyle,
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>
        </Tag>
    );
}

const COMPONENT_DEFAULTS = {
    words: "TEXT\nMORPH",
    transition: {
        type: "tween",
        duration: 0.9,
        delay: 1.2,
        ease: "easeInOut",
    },
    color: "#5E5BFF",
    font: {
        fontFamily: "'Space Grotesk', 'Outfit', sans-serif",
        variant: "Bold",
        fontSize: 32,
        lineHeight: "1.2em",
        letterSpacing: "-0.01em",
        textAlign: "left",
    } as any,
    tag: "div",
    glass: true,
};

export { TextMorph };
