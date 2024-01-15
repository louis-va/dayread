import {ReactNode} from "react";
import Avvvatars from 'avvvatars-react';
import {Button} from "@/components/ui/button";
import {PlusIcon} from '@radix-ui/react-icons';

interface AvatarsProps {
    children?: ReactNode;
    value: string;
    displayValue?: string;
    style?: 'character' | 'shape';
    size?: number;
    shadow?: boolean;
    radius?: number;
    border?: boolean;
    borderSize?: number;
    borderColor?: string;
    icon?: boolean;
    multiAvatars?: boolean;
}

const Avatars = ({children, icon, multiAvatars, ...props}: AvatarsProps) => {
    if (!icon && !multiAvatars) {
        return (
            <section>
                <Avvvatars {...props}>
                    {children}
                </Avvvatars>
            </section>
        );
    }

    return (
        <>
            {multiAvatars && (
                <section className={'flex flex-row items-center relative'}>
                    <Avvvatars {...props} border={true} borderColor={'#27272a'}>
                        {children}
                    </Avvvatars>
                    <section className="absolute top-0 left-5">
                        <Avvvatars {...props} border={true} borderColor={'#27272a'}>
                            {children}
                        </Avvvatars>
                    </section>
                </section>

            )}
            {icon && (
                <section className="relative">
                    <Avvvatars {...props}>
                        {children}
                    </Avvvatars>
                    <Button className="absolute z-20 top-4 left-5 w-6 h-6 rounded-full border-2 border-border"
                            size="icon">
                        <PlusIcon className="text-[7px] stroke-2"/>
                    </Button>
                </section>
            )}
        </>
    );
}

export default Avatars;