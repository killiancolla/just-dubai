import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className = "",
  external = false,
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 tracking-widest font-light transition-all";
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    primary: "bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#E8D08A]",
    outline: "border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A]",
    ghost: "text-[#888888] hover:text-[#C9A84C]",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>;
    }
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
