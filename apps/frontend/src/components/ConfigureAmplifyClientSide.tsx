"use client";
import { Amplify } from "aws-amplify";


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_K1cEjKlHT",
      userPoolClientId: "6o88hkvnhp5q0nn8qlbp01sq3a",
    }
  }
}, {
  ssr: true,
});

export function ConfigureAmplify() {
  return null;
}