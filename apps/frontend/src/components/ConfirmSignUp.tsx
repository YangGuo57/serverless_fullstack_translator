import { IRegisterConfirmation, ISignUpState } from "@/lib";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "@/hooks";

export const ConfirmSignUp = ({
  onStepChange,
}: {
  onStepChange: (step: ISignUpState) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterConfirmation>();

  const { confirmRegister } = useUser();

  const onSubmit: SubmitHandler<IRegisterConfirmation> = async (
    data,
    event,
  ) => {
    event && event.preventDefault();
    confirmRegister(data).then(nextStep => {
      if (nextStep) {
        onStepChange(nextStep);
      }
    })
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
        <label htmlFor="verificationCode" className="block mb-2">Verification Code:</label>
        <input
          id="verificationCode"
          type="string"
          {...register("verificationCode", { required: true })}
          className="w-full h-8 p-1 rounded border"
        />
        {errors.verificationCode && <span>This field is required</span>}
      </div>

      <button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="submit">
        {"Confirm"}
      </button>
    </form >
  )
}