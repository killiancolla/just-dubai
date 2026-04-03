export default function Badge({ children, variant = "gold" }: { children: React.ReactNode; variant?: "gold" | "muted" }) {
  const variants = {
    gold: "border border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10",
    muted: "border border-[#222222] text-[#888888]",
  };
  return (
    <span className={`inline-block px-3 py-1 text-xs tracking-widest ${variants[variant]}`}>
      {children}
    </span>
  );
}
