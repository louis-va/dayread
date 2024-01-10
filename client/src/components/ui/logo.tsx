interface LogoProps {
  size: number;
  className?: string;
}

export default function Logo({ size, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 237 273"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} stroke-current`}
    >
      <path
        d="M74.037 10C75.8704 85.3333 69.337 235.8 28.537 235C-22.463 234 44.5001 45.7895 123 21C227.5 -12 220.162 230 133 238C45.8381 246 78.5 160 226.5 262.5"
        stroke-width="20"
        stroke-linecap="round"
      />
    </svg>
  );
}
