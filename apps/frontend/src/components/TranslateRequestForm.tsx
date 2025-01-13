import { useTranslate } from "@/hooks";
import { ITranslateRequest } from "@sff/shared-types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const TranslateRequestForm = () => {

  const {
    translate,
    isTranslating,
  } = useTranslate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITranslateRequest>();

  const onSubmit: SubmitHandler<ITranslateRequest> = (data, event) => {
    event && event.preventDefault();
    translate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="sourceText" className="block mb-2">Input text:</label>
        <textarea
          id="sourceText"
          {...register("sourceText", { required: true })}
          className="w-full h-32 p-2 rounded border"
        />
        {errors.sourceText && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="sourceLang" className="block mb-2">Input Language Code</label>
        <input
          id="sourceLang"
          type="text"
          {...register("sourceLang", { required: true })}
          className="w-full h-8 p-1 rounded border"
          placeholder="Enter en, es, fr, etc."
        />
        {errors.sourceLang && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="targetLang" className="block mb-2">Output Language Code</label>
        <input
          id="targetLang"
          type="text"
          {...register("targetLang", { required: true })}
          className="w-full h-8 p-1 rounded border"
          placeholder="Enter en, es, fr, etc."
        />
        {errors.targetLang && <span>This field is required</span>}
      </div>

      <button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="submit">
        {isTranslating ? "Translating..." : "Translate"}
      </button>
    </form >
  )
}