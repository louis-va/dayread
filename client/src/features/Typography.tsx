import React, {ReactNode, HTMLProps} from 'react';

interface TypographyProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

const Typography: React.FC<TypographyProps> = ({as: Element = 'div', children, ...rest}) => {
    return <Element {...rest}>{children}</Element>;
};
export default Typography;
