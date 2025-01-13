"use client";
import { useEffect, useState } from "react";
import { signOut, getCurrentUser } from "@aws-amplify/auth";
import { LoginForm } from "@/components";


function Logout({ onSignedOut }: { onSignedOut: () => void }) {
  return (
    <div>
      <button className="btn bg-black text-white p-2 mt-2 rounded-xl"
        onClick={async () => {
          await signOut();
          onSignedOut();
        }}>
        Logout
      </button>
    </div>
  );
}

export default function User() {
  const [user, setUser] = useState<object | null | undefined>(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currUser = await getCurrentUser()
        console.log(currUser);
        setUser(currUser);
      } catch (error) {
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Logout
      onSignedOut={() => {
        setUser(null);
      }} />;
  }

  return <LoginForm onSignedIn={async () => {
    const currUser = await getCurrentUser()
    console.log(currUser);
    setUser(currUser);
  }} />;
}
