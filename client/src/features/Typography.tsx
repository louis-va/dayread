import React, {ReactNode, HTMLProps} from 'react';

interface TypographyProps extends HTMLProps<HTMLParagraphElement> {
    children: ReactNode;
}

const Typography: React.FC<TypographyProps> = ({as: Element = 'p', children, ...rest}) => {
    return <Element {...rest}>{children}</Element>;
};
export default Typography;
