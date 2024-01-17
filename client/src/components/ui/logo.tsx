interface LogoProps {
  size: number;
  className?: string;
}

export default function Logo({ size, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 248 254"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} stroke-current hover:scale-110 transition-all ease-in-out`}
    >
      <path
        d="M72.3093 9C74.1427 84.3333 67.6093 234.8 26.8093 234C-24.1907 233 42.7723 44.7895 121.272 20C225.772 -13 218.434 216 131.272 224C44.1104 232 111.5 116.5 238.5 244.5"
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>

    //ANCIEN LOGO
    // <svg
    //   width={size}
    //   height={size}
    //   viewBox="0 0 237 273"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={`${className} stroke-current`}
    // >
    //   <path
    //     d="M74.037 10C75.8704 85.3333 69.337 235.8 28.537 235C-22.463 234 44.5001 45.7895 123 21C227.5 -12 220.162 230 133 238C45.8381 246 78.5 160 226.5 262.5"
    //     strokeWidth="20"
    //     strokeLinecap="round"
    //   />
    // </svg>
  );
}
