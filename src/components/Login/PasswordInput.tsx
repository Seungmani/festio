import React, { useCallback, useState } from "react";
import RegExp from "../../constants/Reg";
import Error from "../Common/Error";
import Input from "../Common/Input";

interface PasswordInputProps {
	password: string;
	setPassword: (password: string) => void;
}

const PasswordInput = React.memo(({ password, setPassword }: PasswordInputProps): JSX.Element => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordErrorText, setShowPasswordText] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
	
	const validatePassword = useCallback((value: string): boolean => {
		if (value === "") return false;
		return !RegExp.PASSWORD.test(value);
	}, []);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setShowPasswordText(validatePassword(e.target.value) ? "영어, 숫자, 특수 문자를 포함한 8글자 이상을 입력하세요." : "");
    if (!isTouched) setIsTouched(true);
  };

  return (
    <>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
        errorMessage={passwordErrorText}
        showToggle={true}
        toggleShow={() => setShowPassword(!showPassword)}
        isTouched={isTouched}
      />
      <Error errorMessage={passwordErrorText}/>
    </>
  );
})

export default PasswordInput;