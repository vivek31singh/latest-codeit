"use client";
import React from "react";
import EmailInput from "@/components/reusable/EmailInput";
import PasswordInput from "@/components/reusable/PasswordInput";
import CustomButton from "@/components/reusable/CustomButton";
import RememberMeCheckbox from "@/components/reusable/RememberMeCheckbox";
import { useRouter } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/supabaseClient";
import { EmailAuthParams } from "@/lib/supabase/auth/EmailAuth";

interface UserData {
  email?: string;
  isEmailEntered?: boolean;
  emailError?: string;
  password?: string;
  isPasswordEntered?: boolean;
  passwordError?: string;
}

interface AuthFormProps {
  purpose: string
}

async function signUpNewUser({
  email,
  password,
  redirectTo,
}: EmailAuthParams) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
    return { data: data, error };
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
}

async function signInWithEmail({ email, password }: EmailAuthParams) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { data: data, error };
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
}


export default function AuthForm({ purpose }: AuthFormProps) {
  const router = useRouter();
  const [userData, setUserData] = React.useState<UserData>({
    email: "",
    isEmailEntered: false,
    emailError: "",
    password: "",
    isPasswordEntered: false,
    passwordError: "",
  });

  const [signupError, setSignupError] = React.useState<AuthError | null>(null);

  const [disableButton, setDisableButton] = React.useState(false);

  const handleEmail = React.useCallback((emailData: UserData) => {
    setUserData((prevUserData) => ({ ...prevUserData, ...emailData }));
  }, []);

  const handlePassword = React.useCallback((passwordData: UserData) => {
    setUserData((prevUserData) => ({ ...prevUserData, ...passwordData }));
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      userData.email &&
      userData.isEmailEntered &&
      !userData.emailError &&
      userData.password &&
      userData.isPasswordEntered &&
      !userData.passwordError
    ) {
      setDisableButton(true);

      switch (purpose) {
        case "Sign up":
          const { data: signupdata, error: signupError } = await signUpNewUser({
            email: userData.email,
            password: userData.password,
            redirectTo: "/",
          });

          console.log("data", signupdata)
          if (signupdata?.user && !signupError) {

            router.push("/confirm-mail");
            setDisableButton(false);
          } else {
            setDisableButton(false);
            setSignupError(signupError as AuthError);
          }
          break;

        case "Log in":
          const { data: loginData, error: loginError } = await signInWithEmail({
            email: userData.email,
            password: userData.password,
            redirectTo: "/",
          });

          console.log("data", loginData)
          if (loginData?.user && !loginError) {

            router.push("/");

            setDisableButton(false);
          } else {
            setDisableButton(false);
            setSignupError(loginError as AuthError);
          }
          break;

        default:
          break;
      }


    }
  };

  return (

    <form onSubmit={(e) => handleAuth(e)} className="space-y-6">
      {signupError && <p>{signupError.message}</p>}
      <EmailInput handleEmail={handleEmail} />

      <PasswordInput handlePassword={handlePassword} />

      <RememberMeCheckbox />

      <div>
        <CustomButton
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={disableButton}
        >
          {purpose}
        </CustomButton>
      </div>
    </form>
  );
}
