"use client";
import Title from "@/components/ui/Title";
import Input from "@/components/form/Input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { loginSchema } from "@/schema/loginSchema";
import { toast } from "react-toastify";
import { useState } from "react";
import { signIn } from "next-auth/react";

const inputs = [
    {
        name: "email",
        type: "email",
        placeholder: "Your Email Address",
    },
    {
        name: "password",
        type: "password",
        placeholder: "Your Password",
    },
];

const Login = () => {
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const onSubmit = async (values, actions) => {
        try {
            setIsLoading(true);
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
            if (res.status === 200) {
                toast.success("Logined successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                push(callbackUrl);
            }
        } catch (err) {
            const message = err?.error ? err?.error : "Something went wrong";
            toast.error(message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        setIsLoading(false);
    };

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        onSubmit,
        validationSchema: loginSchema,
    });

    return (
        <div className="container m-auto py-20 sm:h-screen">
            <div className="flex flex-col mx-auto max-w-[400px] sm:max-w-[500px] shadow-2xl p-5">
                <Title addClass={"text-[40px] text-center"}>Login</Title>
                <form className="flex flex-col gap-y-4 mt-[35px] items-start mb-4" onSubmit={handleSubmit}>
                    {inputs.map((input, index) => (
                        <Input
                            key={index}
                            {...input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[input.name]}
                            errorMessage={errors[input.name]}
                            touched={touched[input.name]}
                        />
                    ))}
                    <button className="btn-primary-2 !rounded-none" type="submit" disabled={isLoading}>
                        {isLoading ? "Please Wait..." : "Login"}
                    </button>
                    <Link href={"/register"} className="underline text-sm cursor-pointer text-gray-600">
                        Do you not have a account?
                    </Link>
                </form>
                <div className="flex gap-4 w-full !text-[16px]">
                    <button
                        className="btn-secondary w-full !rounded-none !text-white"
                        type="button"
                        onClick={() => signIn("github", { callbackUrl })}
                    >
                        <i className="fa-brands fa-github mr-2"></i>GITHUB
                    </button>
                    <button
                        className="btn-primary-2 !bg-red-600 !rounded-none w-full !text-white"
                        type="button"
                        onClick={() => signIn("google", { callbackUrl })}
                    >
                        <i className="fa-brands fa-google mr-2"></i>SIGN IN WITH GOOGLE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
