import { IRegisterFormData, ISignUpState } from "@/lib";
import { signUp } from "aws-amplify/auth";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const RegistrationForm = ({
  onStepChange,
}: {
  onStepChange: (step: ISignUpState) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();

  const onSubmit: SubmitHandler<IRegisterFormData> = async (
    {
      email,
      password,
      password2,
    }, event) => {
    event && event.preventDefault();

    try {
      if (password !== password2) {
        throw new Error("Passwords do not match!");
      }

      const { nextStep } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });
      onStepChange(nextStep);

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

      <div>
        <label htmlFor="password2" className="block mb-2">Retype Password</label>
        <input
          id="password2"
          type="password"
          {...register("password2", { required: true })}
          className="w-full h-8 p-1 rounded border"
        />
        {errors.password2 && <span>This field is required</span>}
      </div>

      <button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="submit">
        {"Register"}
      </button>
    </form >
  )
}