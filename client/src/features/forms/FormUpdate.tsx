import {Control, useForm, UseFormReturn} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import Typography from "@/features/Typography";
import Icon from "@/components/ui/icons";
import {useEffect} from "react";

const FormSchema = z.object({
    lastname: z.string().min(2, {
        message: "Votre nom doit contenir au moins 2 caractères",
    }),
    firstname: z.string().min(2, {
        message: "Votre prénom doit contenir au moins 2 caractères",
    }),
    bio: z.string().min(2).max(240, {
        message: "La biographie doit contenir entre 2 et 240 caractères",
    }),
});

const handleError = (error: any) => {
    throw new Error(
        error.message || "Une erreur s'est produite lors de la modification"
    );
};

const FormUpdate = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof FormSchema>>() as UseFormReturn<
        z.infer<typeof FormSchema>
    > & { control: Control };

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/user/{setUserName}"); // Remplacez {username} par le véritable nom d'utilisateur
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données de l'utilisateur");
            }

            const userData = await response.json();
            form.setValue("lastname", userData.lastname);
            form.setValue("firstname", userData.firstname);
            form.setValue("bio", userData.bio);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(); // Appel au chargement du composant pour récupérer les données existantes
    }, [fetchData]);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const payload = JSON.stringify({
                lastname: data.lastname,
                firstname: data.firstname,
                bio: data.bio,
            });

            const options = {
                method: "POST",
                credentials: "include" as RequestCredentials,
                headers: headers,
                body: payload,
            };

            const response = await fetch("http://localhost:8000/user/edit", options);

            if (response.status === 200) {
                navigate("/profil");
            }

            if (!response.ok) {
                throw new Error("Une erreur s'est produite lors de la modification");
            }

            const responseBody = await response.json();
            console.log("body:", responseBody);
        } catch (error) {
            handleError(error);
        }
    };
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-4/5 space-y-3 lg:space-y-6"
            >
                <Link to="/profil">
                    <Button variant="outline" size="sm" className="flex gap-3">
                        <Icon icon="retour" size={20}/>
                        <Typography as={"span"} className={"text-sm"}>
                            Retour
                        </Typography>
                    </Button>
                </Link>
                <Typography as={"h2"} className={"text-2xl"}>
                    Mise à jour des données
                </Typography>
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                                <Input placeholder="Prénom" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Biographie</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Parlez-nous un peu de vous..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button
                    variant="secondary"
                    type="submit"
                    className="w-full lg:w-1/2"
                    asChild={true}
                >
                    <Link to={"/profil"}>Valider modification</Link>
                </Button>
            </form>
        </Form>
    );
};

export default FormUpdate;
