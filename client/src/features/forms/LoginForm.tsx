import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik, Form, FormikHelpers } from "formik";

interface Values {
  mailUsername: string;
  password: string;
}

export default function LoginForm() {
  return (
    <div>
      <Formik
        initialValues={{
          mailUsername: "",
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
            <label htmlFor="firstName">Adresse mail ou Pseudo</label>
            <Input
              id="mailUsername"
              name="mailUsername"
              placeholder="john@acme.com / Jdoe23"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Mot de passe</label>
            <Input
              id="password"
              name="password"
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
