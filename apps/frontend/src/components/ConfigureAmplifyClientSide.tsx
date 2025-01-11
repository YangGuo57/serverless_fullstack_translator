"use client";
import { Amplify } from "aws-amplify";


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_oPvZLC6Cq",
      userPoolClientId: "2r06q5vnbm5fcadj42kt7n70ct",
    }
  }
}, {
  ssr: true,
});

export function ConfigureAmplify() {
  return null;
}