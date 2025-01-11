"use client";
import { useState } from "react";
import {
  ITranslateDbObject,
  ITranslateRequest,
  ITranslateResponse,
} from "@sff/shared-types";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

const URL = "https://api.121103.xyz";

const translatePublicText = async ({
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

    const result = await fetch(`${URL}/public`, {
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

const translateUsersText = async ({
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

    const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    console.log("authToken", authToken);
    const result = await fetch(`${URL}/user`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const rtnValue = (await result.json()) as ITranslateResponse;
    return rtnValue;
  } catch (e: any) {
    console.error(e);
    throw e;
  }
};

const getUsersTranslations = async () => {
  try {
    const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    console.log("authToken", authToken);
    const result = await fetch(`${URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const rtnValue = (await result.json()) as Array<ITranslateDbObject>;
    return rtnValue;
  } catch (e: any) {
    console.error(e);
    throw e;
  }
};

const deleteUserTranslation = async (item: {
  username: string;
  requestId: string;
}) => {
  try {
    const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    const result = await fetch(`${URL}/user`, {
      method: "DELETE",
      body: JSON.stringify(item),
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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
          let result = null;

          try {
            const user = await getCurrentUser();
            if (user) {
              result = await translateUsersText({
                inputLang,
                outputLang,
                inputText,
              });
            } else {
              throw new Error("User not signed in");
            }
          } catch (e) {
            result = await translatePublicText({
              inputLang,
              outputLang,
              inputText,
            });
          }
          setOutputText(result);
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
          <textarea
            id="inputLang"
            value={inputLang}
            onChange={(event) => setInputLang(event.target.value)}
            className="w-full h-8 p-1 rounded border"
            placeholder="Enter en, es, fr, etc."
          />
        </div>

        <div>
          <label htmlFor="outputLang" className="block mb-2">Output Language Code</label>
          <textarea
            id="outputLang"
            value={outputLang}
            onChange={(event) => setOutputLang(event.target.value)}
            className="w-full h-8 p-1 rounded border"
            placeholder="Enter en, es, fr, etc."
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
          const rtnValue = await getUsersTranslations();
          setTranslations(rtnValue)
        }}>
        See History
      </button>

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
                const rtnValue = await deleteUserTranslation({
                  requestId: item.requestId,
                  username: item.username,
                });
                setTranslations(rtnValue)
              }}>
              X
            </button>
          </div>
        ))}

      </div>
    </main>
  );
}
