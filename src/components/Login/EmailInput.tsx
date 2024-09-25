import React, { useCallback, useState } from "react";
import Input from "../Common/Input";
import RegExp from "../../constants/Reg";

interface EmailInputProps {
	email: string;
	setEmail: (email: string) => void;
}

const EmailInput = React.memo(({ email, setEmail }: EmailInputProps): JSX.Element => {
	const [emailErrorText, setEmailErrorText] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
	
	const validateEmail = useCallback((value: string): boolean => {
		if (value === "") return true;
		return !RegExp.ID.test(value);
	}, [])

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailErrorText(validateEmail(e.target.value) ? "아이디는 이메일 형식입니다." : "");
    if (!isTouched) setIsTouched(true);
  };

  return (
    <Input
      type="text"
      placeholder="아이디"
      value={email}
      onChange={handleEmailChange}
      errorMessage={emailErrorText}
      isTouched={isTouched}
    />
    
  );
})

export default EmailInput;