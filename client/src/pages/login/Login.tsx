import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import LoginForm from "@/features/forms/LoginForm";

export default function Login() {
  return (
    <div className="p-10 flex flex-col gap-10 justify-center items-center w-full">
      <div className="flex">
        <Logo size={40} />
      </div>
      <Card className="w-full md:w-1/3">
        <CardHeader className="w-full items-center">
          <CardTitle>S'incrire</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
