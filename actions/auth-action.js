"use server";

import { signIn, signOut } from "@/auth";

export const githubAuth = async () => {
  await signIn("github");
};

export const googleAuth = async () => {
  await signIn("google");
};

export const signoutAction = async () => {
  await signOut();
};
