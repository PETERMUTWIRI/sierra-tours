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

export default function Logo({
  className,
  showTagline = true,
  variant = "default",
  size = "md",
}: LogoProps) {
  const { width, height } = sizes[size];

  // Use the main logo image
  const logoSrc = "/images/general/logos/sierra-tours-and-safaris-logo.png";

  if (variant === "icon-only") {
    return (
      <Link href="/" className={cn("block", className)}>
        <div
          className="relative bg-orange-500 rounded-full flex items-center justify-center overflow-hidden"
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
          "relative rounded-full flex items-center justify-center overflow-hidden flex-shrink-0",
          variant === "light" ? "bg-white" : "bg-orange-500"
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

      {/* Logo Text */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-bold leading-tight",
            variant === "light" ? "text-white" : "text-gray-900",
            size === "sm" && "text-lg",
            size === "md" && "text-xl",
            size === "lg" && "text-2xl",
            size === "xl" && "text-3xl"
          )}
        >
          Sierra Tours
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-sm font-medium",
              variant === "light" ? "text-white/80" : "text-orange-500",
              size === "sm" && "text-xs",
              size === "lg" && "text-base",
              size === "xl" && "text-lg"
            )}
          >
            & Safaris
          </span>
        )}
      </div>
    </Link>
  );
}

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
            className="w-4 h-4 text-green-500 fill-current"
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
