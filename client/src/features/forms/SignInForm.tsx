import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik, Form, FormikHelpers } from "formik";

interface Values {
  firstName: string;
  lastName: string;
  pseudo: string;
  email: string;
  password: string;
}

export default function SignInForm() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          pseudo: "",
          email: "",
          password: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName">Prénom</label>
            <Input id="firstName" name="firstName" placeholder="John" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Nom</label>
            <Input id="lastName" name="lastName" placeholder="Doe" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Pseudo</label>
            <Input id="pseudo" name="pseudo" placeholder="Jdoe23" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Adresse mail</label>
            <Input
              id="email"
              name="email"
              placeholder="john@acme.com"
              type="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Mot de passe</label>
            <Input
              id="password"
              name="paswword"
              placeholder="*********"
              type="password"
            />
          </div>

          <Button variant="secondary" type="submit" className="md:self-end">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
