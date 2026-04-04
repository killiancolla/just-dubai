"use client";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Props {
  aed: number;
  className?: string;
}

export default function PriceDisplay({ aed, className }: Props) {
  const { format } = useCurrency();
  return <span className={className}>{format(aed)}</span>;
}
