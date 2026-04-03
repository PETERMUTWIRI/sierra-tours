"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface SectionBackgroundProps {
  children: ReactNode;
  backgroundImage: string;
  overlayColor?: "white" | "gray" | "green" | "dark";
  overlayOpacity?: number;
  className?: string;
  priority?: boolean;
}

const overlayStyles = {
  white: "bg-white",
  gray: "bg-gray-50",
  green: "bg-[#11A560]",
  dark: "bg-gray-900",
};

export default function SectionBackground({
  children,
  backgroundImage,
  overlayColor = "white",
  overlayOpacity = 0.92,
  className = "",
  priority = false,
}: SectionBackgroundProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Image Container */}
      <div className="absolute inset-0">
        {/* Use img for very small pattern images, Next/Image for photos */}
        {backgroundImage.includes("pattern") || backgroundImage.includes("texture") ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            quality={75}
          />
        )}
        {/* Color Overlay */}
        <div
          className={`absolute inset-0 ${overlayStyles[overlayColor]}`}
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

// Simpler version for sections that don't need complex overlay logic
interface SimpleBackgroundProps {
  children: ReactNode;
  image: string;
  overlayClass?: string;
  className?: string;
}

export function SimpleBackground({
  children,
  image,
  overlayClass = "bg-white/95",
  className = "",
}: SimpleBackgroundProps) {
  return (
    <section className={`relative ${className}`}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
          quality={70}
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
