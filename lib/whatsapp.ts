// WhatsApp Booking Integration
// Generates click-to-chat URLs with pre-filled package information

const WHATSAPP_NUMBER = "254725162916";

interface PackageInfo {
  name: string;
  price?: number;
  currency?: string;
  priceFrom?: boolean;
  duration?: string;
  location?: string;
  groupSize?: string | null;
}

function encodeMessage(text: string): string {
  return encodeURIComponent(text);
}

/**
 * Generate a WhatsApp booking link for a specific package
 */
export function getPackageBookingLink(pkg: PackageInfo): string {
  const priceText = pkg.price
    ? `${pkg.priceFrom ? "Starting from " : ""}${pkg.currency || "USD"} ${pkg.price.toLocaleString()} per person`
    : "Price on request";

  const lines = [
    `Hello Sierra Tours & Safaris,`,
    ``,
    `I am interested in booking the following package:`,
    ``,
    `*Package:* ${pkg.name}`,
    `*Price:* ${priceText}`,
  ];

  if (pkg.duration) lines.push(`*Duration:* ${pkg.duration}`);
  if (pkg.location) lines.push(`*Location:* ${pkg.location}`);
  if (pkg.groupSize) lines.push(`*Group Size:* ${pkg.groupSize}`);

  lines.push(
    ``,
    `Please provide me with more details and availability.`,
    ``,
    `Thank you!`
  );

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage(message)}`;
}

/**
 * Generate a generic WhatsApp enquiry link
 */
export function getGenericBookingLink(message?: string): string {
  const defaultMessage =
    message ||
    `Hello Sierra Tours & Safaris,\n\nI am interested in booking a safari package with you. Please provide me with more information about your available packages and pricing.\n\nThank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage(defaultMessage)}`;
}

/**
 * Generate a category-specific WhatsApp enquiry link
 */
export function getCategoryBookingLink(categoryName: string): string {
  const message = `Hello Sierra Tours & Safaris,\n\nI am interested in your ${categoryName} packages. Please provide me with more details about available options, pricing, and availability.\n\nThank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage(message)}`;
}
