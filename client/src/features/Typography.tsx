import {ReactNode, HTMLProps} from 'react';

interface TypographyProps extends HTMLProps<HTMLParagraphElement> {
    children: ReactNode;
}

const Typography = ({as: Element = 'p', children, ...rest}: TypographyProps) => {
    return <Element {...rest}>{children}</Element>;
};
export default Typography;
