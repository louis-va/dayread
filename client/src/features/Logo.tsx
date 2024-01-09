import Typography from "@/features/Typography";

interface LogoProps {
    size: "sm" | "l" | "xl";
}

const Logo = ({size}: LogoProps) => {
    let sizeClasses;
    switch (size) {
        case "sm":
            sizeClasses = 'text-[2rem]'
            break;
        case "l":
            sizeClasses = 'text-[4rem]'
            break;
        case "xl":
            sizeClasses = 'text-[6rem]'
            break;
    }

    return (
        <>
            <Typography as={'p'} className={`${sizeClasses} font-bold text-white`}>D<span className={'text-primary'}>.</span></Typography>
        </>
    )
}

export default Logo;