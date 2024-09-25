import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import RegExp from "../../constants/Reg";
import Input from "../Common/Input";
import Error from "../Common/Error";

interface PasswordInputProps {
	password: string;
	passwordConfirm: string;
  setPasswordConfirm: (password: string) => void;
}
const RegisterPasswordCheck = React.memo(({ password, passwordConfirm, setPasswordConfirm }: PasswordInputProps): JSX.Element => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordErrorText, setShowPasswordText] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  
  useEffect(() => {
    if (passwordConfirm !== password) {
      setShowPasswordText("비밀번호가 일치하지 않습니다.");
    } else {
      setShowPasswordText("");
    }
  }, [passwordConfirm, password]);

  const validatePassword = useCallback((value: string): boolean => {
		if (value === "") return false;
		return !RegExp.PASSWORD.test(value);
	}, []);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    setShowPasswordText(validatePassword(e.target.value) ? "영어, 숫자, 특수 문자를 포함한 8글자 이상을 입력하세요." : "");
    if (!isTouched) setIsTouched(true);
  };

  return (
    <>
      <H2>비밀번호 확인</H2>
      <Input 
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호"
        value={passwordConfirm}
        onChange={handlePasswordChange}
        errorMessage={passwordErrorText}
        showToggle={true}
        toggleShow={() => setShowPassword(!showPassword)}
        isTouched={isTouched} />
      <Error errorMessage={passwordErrorText} />
    </>
  );
})

export default RegisterPasswordCheck;

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 5px;
  font-size: 20px;
`