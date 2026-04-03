"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: "default" | "light" | "dark" | "icon-only";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: { width: 40, height: 40 },
  md: { width: 50, height: 50 },
  lg: { width: 60, height: 60 },
  xl: { width: 80, height: 80 },
};

// Brand colors from logo
const BRAND_COLORS = {
  green: "#11A560",      // Palm tree green
  lime: "#B3CE4D",       // Accent lime/yellow-green
  sun: "#F5A623",        // Sun orange/yellow
  black: "#1A1A1A",      // Sierra text
  red: "#D32F2F",        // TOURS AND SAFARIS red
  darkGreen: "#0E8A50",  // Darker green for hover
};

export default function Logo({
  className,
  showTagline = true,
  variant = "default",
  size = "md",
}: LogoProps) {
  const { width, height } = sizes[size];

  const logoSrc = "/images/general/logos/sierra-tours-and-safaris-logo.png";

  if (variant === "icon-only") {
    return (
      <Link href="/" className={cn("block", className)}>
        <div
          className="relative rounded-full flex items-center justify-center overflow-hidden border-2 border-[#11A560]"
          style={{ width, height }}
        >
          <Image
            src={logoSrc}
            alt="Sierra Tours & Safaris"
            width={width}
            height={height}
            className="object-contain p-1"
            priority
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 hover:opacity-90 transition-opacity", className)}
    >
      {/* Logo Icon */}
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border-2",
          variant === "light" ? "bg-white border-white" : "bg-white border-[#11A560]"
        )}
        style={{ width, height }}
      >
        <Image
          src={logoSrc}
          alt="Sierra Tours & Safaris"
          width={width}
          height={height}
          className="object-contain p-1"
          priority
        />
      </div>

      {/* Logo Text - One Line */}
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-bold tracking-tight",
            variant === "light" ? "text-white" : "text-[#1A1A1A]",
            size === "sm" && "text-lg",
            size === "md" && "text-xl",
            size === "lg" && "text-2xl",
            size === "xl" && "text-3xl"
          )}
        >
          Sierra
        </span>
        {showTagline && (
          <span
            className={cn(
              "font-bold tracking-wide",
              variant === "light" ? "text-[#F5A623]" : "text-[#D32F2F]",
              size === "sm" && "text-lg",
              size === "md" && "text-xl",
              size === "lg" && "text-2xl",
              size === "xl" && "text-3xl"
            )}
          >
            Tours & Safaris
          </span>
        )}
      </div>
    </Link>
  );
}

// Export brand colors for use in other components
export { BRAND_COLORS };

// Trust Badge Component
export function TrustBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/general/logos/trustpilot-logo.png"
        alt="Trustpilot"
        width={80}
        height={20}
        className="h-5 w-auto"
      />
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-4 h-4 text-[#F5A623] fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">Excellent</span>
    </div>
  );
}
