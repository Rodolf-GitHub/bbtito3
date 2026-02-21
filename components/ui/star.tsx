import { Star } from "lucide-react";
import React from "react";

export function StarIcon({ size = 24, color = "#ff2d95", className = "" }) {
  return <Star size={size} color={color} className={className} />;
}
