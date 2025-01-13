import { ILoginFormData } from "@/lib";
import { signIn } from "aws-amplify/auth";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const LoginForm = ({ onSignedIn }: { onSignedIn: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const onSubmit: SubmitHandler<ILoginFormData> = async (
    {
      email,
      password,
    }, event) => {
    event && event.preventDefault();
    try {
      await signIn(
        {
          username: email,
          password,
          options: {
            userAttributes: {
              email,
            }
          }
        }
      );
      onSignedIn();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="block mb-2">Email:</label>
        <input
          id="email"
          {...register("email", { required: true })}
          className="w-full h-8 p-1 rounded border"
        />
        {errors.email && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="password" className="block mb-2">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          className="w-full h-8 p-1 rounded border"
        />
        {errors.password && <span>This field is required</span>}
      </div>

      <button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="submit">
        {"Login"}
      </button>
    </form >
  )
}