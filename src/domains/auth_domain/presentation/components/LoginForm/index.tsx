import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import type { Login } from "@/domains/auth_domain/application/constants/types";
// import { requestAuthLogin } from "@/domains/auth_domain/application/redux/slices/authSlice";
import { loginSchema, type LoginSchema } from "@/domains/auth_domain/application/validators/loginSchema";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/domains/auth_domain/application/hooks/useLogin";

const LoginForm = () => {
    const { mutate: login, isPending } = useLogin();

    const defaultValues = {
        email: 'admin@kibuz.com',
        password: 'Kibuz2025*'
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues
    })

    const onSubmit: SubmitHandler<Login> = (data: LoginSchema) => {
        login(data)
    }

    const isLoading = isPending;
    
    return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex flex-col gap-6 max-w-sm mx-auto"}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center mb-8">
          <h1 className="text-3xl font-bold text-kibuz-primary">Iniciar sesión</h1>
          <p className="text-base text-muted-foreground">
            Ingresa tu correo y contraseña
          </p>
        </div>

        {/* EMAIL */}
        <Field data-invalid={!!errors.email}>
          <FieldLabel className="text-base" htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            className="py-5"
            type="email"
            placeholder="correo@empresa.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </Field>

        {/* PASSWORD */}
        <Field data-invalid={!!errors.password}>
          <div className="flex items-center">
            <FieldLabel className="text-base" htmlFor="password">Contraseña</FieldLabel>
          </div>

          <Input
            id="password"
            className="py-5"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </Field>

        {/* BUTTON */}
        <Field>
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full text-base py-5 rounded-ms bg-kibuz-primary hover:bg-kibuz-secondary cursor-pointer"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </Field>

        <FieldSeparator>O continúa con</FieldSeparator>

        {/* GITHUB */}
        <Field>
          <Button variant="outline" type="button" className="w-full py-5 rounded-ms">
            Ingresar con Gmail
          </Button>

          <FieldDescription className="text-center">
            ¿No tienes cuenta?{" "}
            <a href="#" className="underline underline-offset-4">
              Regístrate
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
    );
};

export default LoginForm;
