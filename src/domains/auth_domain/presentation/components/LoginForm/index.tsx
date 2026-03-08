import { useNavigate, useLocation } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import type { Login } from "@/domains/auth_domain/application/constants/types";
import { useAppDispatch } from "@/shared/application/store/hooks";
import { requestAuthLogin } from "@/domains/auth_domain/application/slices/authSlice";
import { loginSchema, type LoginSchema } from "@/domains/auth_domain/application/validators/loginSchema";

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const from = location.state?.from?.pathname || "/";

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

    const onSubmit: SubmitHandler<Login> = async (data: LoginSchema) => {
        try {
            const res = await dispatch(requestAuthLogin(data)).unwrap();

            if (res.token) {
                localStorage.setItem("token", res.token);
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-8">
                <span className="p-float-label">
                    <input {...register("email")} />
                    {/* <label htmlFor={}></label> */}
                    {errors.email && (
                        <span>{errors.email.message}</span>
                    )}
                </span>
                <span className="p-float-label">
                    <input {...register("password")} />
                    {/* <label htmlFor={}></label> */}
                    {errors.password && (
                        <span>{errors.password.message}</span>
                    )}
                </span>
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default LoginForm;