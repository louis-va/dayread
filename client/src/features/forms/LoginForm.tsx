"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {setUserName} from "@/localStorageUtils/getUserNameLS";

const FormSchema = z.object({
  mail: z
    .string()
    .min(2, {
      message: "Votre adresse mail doit contenir au moins 2 caractères",
    })
    .email({ message: "Votre adresse mail n'est pas valide" }),
  password: z.string().min(3, {
    message: "Votre mot de passe doit contenir au moins 3 caractères",
  }),
});

export default function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const payload = JSON.stringify({
        email: data.mail,
        password: data.password,
      });

      const options = {
        method: "POST",
        credentials: "include" as RequestCredentials,
        headers: headers,
        body: payload,
      };

      const response = await fetch(
        "http://localhost:8000/auth/signin",
        options
      );

      if (response.status === 200) {
        const body = await response.json();
        // Extraction du "username" de la réponse
        const usernameFromResponse = body.username;

        // Stockage du "username" dans le localStorage
        setUserName(usernameFromResponse);

        // Redirection vers la page d'accueil
        navigate("/");

      }


      if (!response.ok)
        throw new Error("An error occured during signup");

      const body = await response.json();
      console.log("body:", body);
    } catch (error: any) {
      throw new Error(error.message || "An error occured during signup");
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 space-y-6">
        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse mail</FormLabel>
              <FormControl>
                <Input placeholder="jdoe@gmail.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" type="submit" className="w-full">
          Se connecter
        </Button>
      </form>
    </Form>
  );
}
