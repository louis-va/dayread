import Avatars from "@/features/Avatars";
import { Button } from "@/components/ui/button";
import Typography from "@/features/Typography";

interface ListfllwrsSubsProps {
    variant: 'followers' | 'subscribers';
    userName: string;
    userPseudo: string;
}

const ListFllwrsSubs = ({ variant, userName, userPseudo }: ListfllwrsSubsProps) => {
    const handleButtonClick = () => {
        //  la logique pour gérer le clic du bouton en fonction de la variante
        if (variant === 'followers') {
            // Logique pour la variante followers
            console.log('Unfollow clicked for', userName);
        } else if (variant === 'subscribers') {
            // Logique pour la variante subscribers
            console.log('Unsubscribe clicked for', userName);
        }
    };

    return (
        <li className={'w-full flex justify-between items-center py-4 border-b border-border'}>
            <section className={'flex items-center gap-x-3'}>
                <Avatars value={'jtm@gmail.tamere'} style={'shape'} />
                <section className={'flex flex-col justify-center'}>
                    <Typography className={"text-sm"} as="p">
                        {variant === 'followers' ? `${userName}` : `${userName}`}
                    </Typography>
                    <Typography className={"text-xs"} as="p">
                        {userPseudo}
                    </Typography>
                </section>
            </section>
            <section>
                <Button variant={'outline'} onClick={handleButtonClick} size={'sm'}>
                    {variant === 'followers' ? 'Unfollow' : 'Unsubscribe'}
                </Button>
            </section>
        </li>
    );
}

export default ListFllwrsSubs;
