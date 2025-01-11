"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, getCurrentUser } from "@aws-amplify/auth";
import Link from "next/link";




function Login({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form onSubmit={async (event) => {
      event.preventDefault();
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
    }}>
      <div>
        <label htmlFor="inputLang" className="block mb-2">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-2">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button className="btn bg-black text-white p-2 mt-2 rounded-xl" type="submit">
        Login
      </button>

      <Link href="/register" className="btn bg-black text-white p-2 mt-2 rounded-xl">Register</Link>
    </form>

  );

}

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

  return <Login onSignedIn={async () => {
    const currUser = await getCurrentUser()
    console.log(currUser);
    setUser(currUser);
  }} />;
}
