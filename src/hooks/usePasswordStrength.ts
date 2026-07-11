import { useState, useEffect } from "react";
import { checkPasswordStrength } from "@/lib/validations";
import type { PasswordStrengthInfo } from "@/types/auth";

export const usePasswordStrength = (password: string) => {
  const [strength, setStrength] = useState<PasswordStrengthInfo>({
    score: 0,
    feedback: "Weak",
    isMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    setStrength(checkPasswordStrength(password));
  }, [password]);

  return strength;
};
