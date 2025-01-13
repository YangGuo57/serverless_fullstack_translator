"use client";
import { useState } from "react";
import { useTranslate } from "@/hooks";


export default function Home() {
  const [inputLang, setInputLang] = useState<string>("");
  const [outputLang, setOutputLang] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  const {
    isLoading,
    translations,
    translate,
    isTranslating,
    deleteTranslation,
    isDeleting,
  } = useTranslate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          let result = await translate({
            sourceLang: inputLang,
            targetLang: outputLang,
            sourceText: inputText,
          });
        }
        }
      >
        <div>
          <label htmlFor="inputText" className="block mb-2">Input text:</label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-32 p-2 rounded border"
          />
        </div>

        <div>
          <label htmlFor="inputLang" className="block mb-2">Input Language Code</label>
          <input
            id="inputLang"
            type="text"
            value={inputLang}
            onChange={(event) => setInputLang(event.target.value)}
            className="w-full h-8 p-1 rounded border"
            placeholder="Enter en, es, fr, etc."
          />
        </div>

        <div>
          <label htmlFor="outputLang" className="block mb-2">Output Language Code</label>
          <input
            id="outputLang"
            type="text"
            value={outputLang}
            onChange={(event) => setOutputLang(event.target.value)}
            className="w-full h-8 p-1 rounded border"
            placeholder="Enter en, es, fr, etc."
          />
        </div>

        <button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="submit">
          {isTranslating ? "Translating..." : "Translate"}
        </button>
      </form>

      <div className="flex flex-col space-y-2">
        {translations.map((item) => (
          <div className="flex flex-row justify-between space-x-2 bg-yellow-500" key={item.requestId}>
            <p>
              {item.sourceLang}/{item.sourceText}
            </p>
            <p>
              {item.targetLang}/{item.targetText}
            </p>

            <button className="btn bg-red-500  w-6 h-6 hover:bg-red-200 rounded-full" type="button"
              onClick={async () => {
                deleteTranslation(item);
              }}>
              {isDeleting ? "..." : "X"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
