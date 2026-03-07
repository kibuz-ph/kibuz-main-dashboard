import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../../infrastructure/api/authApi";

type Inputs = {
    email: string
    password: string
}

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const defaultValues = {
        email: 'admin@kibuz.com',
        password: 'Kibuz2025*'
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const response = await login(data);

        if (!response) return;

        navigate(from, { replace: true });
    }
    
    return (
        <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-8">
                <span className="p-float-label">
                    <input {...register("email")} />
                    {/* <label htmlFor={}></label> */}
                    {errors.email && <span>This field is required</span>}
                </span>
                <span className="p-float-label">
                    <input {...register("password")} />
                    {/* <label htmlFor={}></label> */}
                    {errors.password && <span>This field is required</span>}
                </span>
            </div>
            <input type="submit" />
        </form>
    );
};

export default LoginForm;