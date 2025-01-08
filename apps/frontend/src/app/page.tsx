"use client";
import { useState } from "react";
import {
  ITranslateDbObject,
  ITranslateRequest,
  ITranslateResponse,
} from "@sff/shared-types";

const URL = "https://api.121103.xyz/";

const translateText = async ({
  inputLang,
  inputText,
  outputLang,
}: {
  inputLang: string;
  inputText: string;
  outputLang: string;
}) => {
  try {
    const request: ITranslateRequest = {
      sourceLang: inputLang,
      targetLang: outputLang,
      sourceText: inputText,
    };

    const result = await fetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify(request),
    });

    const rtnValue = (await result.json()) as ITranslateResponse;
    return rtnValue;
  } catch (e: any) {
    console.error(e);
    throw e;
  }
};

const getTranslations = async () => {
  try {
    const result = await fetch(URL, {
      method: "GET",
    });

    const rtnValue = (await result.json()) as Array<ITranslateDbObject>;
    return rtnValue;
  } catch (e: any) {
    console.error(e);
    throw e;
  }
};

export default function Home() {
  const [inputLang, setInputLang] = useState<string>("");
  const [outputLang, setOutputLang] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<ITranslateResponse | null>(null);
  const [translations, setTranslations] = useState<Array<ITranslateDbObject>>(
    []
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await translateText({
            inputLang,
            outputLang,
            inputText,
          });
          console.log(result);
          setOutputText(result);
        }}
      >
        <div>
          <label htmlFor="inputText" className="block mb-2">Input text:</label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

        <div>
          <label htmlFor="inputLang" className="block mb-2">Input Language Code</label>
          <textarea
            id="inputLang"
            value={inputLang}
            onChange={(event) => setInputLang(event.target.value)}
            className="w-full p-2 rounded border"
            placeholder="Enter text"
          />
        </div>

        <div>
          <label htmlFor="outputLang" className="block mb-2">Output Language Code</label>
          <textarea
            id="outputLang"
            value={outputLang}
            onChange={(event) => setOutputLang(event.target.value)}
            className="w-full p-2 rounded border"
            placeholder="Enter text"
          />
        </div>

        <button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="submit">
          Translate
        </button>
      </form>

      <div>
        <p>Result:</p>
        <pre style={{ whiteSpace: "pre-wrap" }} className="w-full">
          {JSON.stringify(outputText?.targetText, null, 2)}
        </pre>
      </div>

      <button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="button"
        onClick={async () => {
          const rtnValue = await getTranslations();
          setTranslations(rtnValue)
        }}>
        See History
      </button>

      <div>
        <p>Result:</p>
        <pre>
          {translations.map((item) => (
            <div key={item.requestId}>
              <p>
                {item.sourceLang}/{item.sourceText}
              </p>
              <p>
                {item.targetLang}/{item.targetText}
              </p>
            </div>
          ))}
        </pre>
      </div>
    </main>
  );
}
