import { useUser } from "@/hooks/useUser";
import { ILoginFormData } from "@/lib";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const LoginForm = ({ onSignedIn }: { onSignedIn?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const { login, busy } = useUser();

  const onSubmit: SubmitHandler<ILoginFormData> = async (
    data,
    event,
  ) => {
    event && event.preventDefault();
    login(data).then(() => {
      onSignedIn && onSignedIn();
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email" className="block mb-2">Email:</Label>
        <Input disabled={busy} id="email"
          {...register("email", { required: true })}
          className="w-full h-8 p-1 rounded border"
        />
        {errors.email && <span>This field is required</span>}
      </div>

      <div>
        <Label htmlFor="password" className="block mb-2">Password</Label>
        <Input
          id="password"
          type="password"
          disabled={busy}
          {...register("password", { required: true })}
          className="w-full h-8 p-1 rounded border"
        />
        {errors.password && <span>This field is required</span>}
      </div>

      <Button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="submit">
        {busy ? "logging..." : "Login"}
      </Button>
    </form >
  )
}