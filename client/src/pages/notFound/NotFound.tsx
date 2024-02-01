import Typography from "@/features/Typography";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import Logo from "@/components/ui/logo";

const NotFound = () => {
    return (
        <main className="w-full h-dvh p-6 md:px-8">

            <section className="h-full w-full flex flex-col justify-center items-center gap-y-8">
                <Logo size={40}/>
                <Typography as={'h1'} className={'text-primary text-6xl md:text-7xl'}>
                    404 Erreur
                </Typography>
                <Typography as={'h3'} className={'border-b-2 border-border pb-4 text-muted text-3xl text-center md:text-4xl'}>
                    la page que vous voulez afficher n'existe pas ..
                </Typography>
                <Button variant={'outline'} asChild={true}>
                    <Link to={'/'}>
                        Retour
                    </Link>
                </Button>
            </section>
        </main>
    )
}

export default NotFound;