"use client";
import { useTranslate } from "@/hooks";
import { TranslateRequestForm } from "@/components";


export default function Home() {

  const {
    isLoading,
    translations,
    deleteTranslation,
    isDeleting,
  } = useTranslate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <TranslateRequestForm />

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
