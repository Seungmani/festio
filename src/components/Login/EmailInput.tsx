import React, { useCallback, useState } from "react";
import LoginInput from "./LoginInput";

interface EmailInputProps {
	email: string;
	setEmail: (email: string) => void;
}

const emailReg = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-za-z0-9-]+/;

const EmailInput = React.memo(({ email, setEmail }: EmailInputProps): JSX.Element => {
	const [emailError, setEmailError] = useState<boolean>(false);
	
	const validateEmail = useCallback((value: string): boolean => {
		if (value === "") return false;
		return !emailReg.test(value);
	}, [])

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  return (
    <LoginInput
      type="text"
      placeholder="아이디"
      value={email}
      onChange={handleEmailChange}
      errorMessage={emailError ? "아이디는 이메일 형식입니다." : undefined}
    />
  );
})

export default EmailInput;