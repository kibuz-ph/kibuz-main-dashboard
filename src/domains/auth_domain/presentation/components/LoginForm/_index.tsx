import { Controller, useForm } from "react-hook-form";

const LoginForm = () => {

    const defaultValues = {
        email: 'juan@email.com',
        password: '123456789'
    };

    const {
        control,
        // formState: { errors },
        // handleSubmit,
        // reset
    } = useForm({ defaultValues })

    return (
        <form className="w-full flex flex-col">
            <div className="w-full mb-8">
                <Controller
                    name="password"
                    control={control}
                    rules={
                        {
                            required: {
                                value: true,
                                message: 'La contraseña es reuqrida'
                            },
                            minLength: {
                                value: 8,
                                message: 'Mínimo 8 caracteres',
                            },
                        }
                    }
                    // render={({ field, fieldState }) => (
                    render={({ field }) => (
                        <>
                            <span className="p-float-label">
                                <input id={field.name} {...field} />
                                <label htmlFor={field.name}>{}</label>
                            </span>
                        </>
                    )}
                />
            </div>

        </form>
    );
};

export default LoginForm;