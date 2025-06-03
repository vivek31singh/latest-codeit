"use client";

import { AuthSchema } from "@/lib/zod/schemas/AuthSchema";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";

type PasswordDataType = {
  password?: string;
  isPasswordEntered?: boolean;
  passwordError?: string;
};

interface PasswordInputProps {
  handlePassword: (password: PasswordDataType) => void;
}

export default function PasswordInput({ handlePassword }: PasswordInputProps) {
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  React.useEffect(() => {
    if (AuthSchema.safeParse({ password: password ?? "" }).success) {
      setPasswordError("");
      handlePassword({ password, isPasswordEntered: true, passwordError: "" });
    } else {
      const error = AuthSchema.safeParse({ password: password ?? "" }).error
        ?.issues[0].message.replace("String", "Email");
      setPasswordError(error ?? "");
      handlePassword({ password, isPasswordEntered: false, passwordError: error ?? "" });
    }
  }, [password, handlePassword]);

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Password
      </label>
      <div className="mt-2 relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          autoComplete="current-password"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 pr-10"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-800"
          tabIndex={-1}
        >
          {showPassword ? (
            // Hide Icon (eye-off)
            <Eye size={18}/>
          ) : (
            // Show Icon (eye)
            <EyeClosed size={18}/>
          )}
        </button>
        {passwordError && password && (
          <p className="text-red-500 text-sm/6 font-medium mt-2 justify-self-end">
            {passwordError}
          </p>
        )}
      </div>
    </div>
  );
}
