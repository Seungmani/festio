import React, {useState } from "react";
import styled from "@emotion/styled";
import Input from "../Common/Input";
import Error from "../Common/Error";
import useColor from "../../hooks/useColor";
import PasswordToggle from "../Common/Toggle";

interface PasswordInputProps {
	password: string;
	passwordConfirm: string;
  setPasswordConfirm: (password: string) => void;
}

const RegisterPasswordCheck = React.memo(({ password, passwordConfirm, setPasswordConfirm }: PasswordInputProps): JSX.Element => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordErrorText, setShowPasswordText] = useState<string>("비밀번호가 일치하지 않습니다.");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const color = useColor(isTouched, passwordErrorText);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    setShowPasswordText(passwordConfirm !== password ? "비밀번호가 일치하지 않습니다." : "");
    if (!isTouched) setIsTouched(true);
  };

  return (
    <>
      <H2>비밀번호 확인</H2>
      <InputDiv>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          color={color}
        />
        <PasswordToggle setShowPassword={true} setShowToggle={() => setShowPassword(!showPassword)}/>
      </InputDiv>
      <Error errorMessage={passwordErrorText}/>
    </>
  );
})

export default RegisterPasswordCheck;
const InputDiv = styled.div`
  position: relative;
`;


const H2 = styled.h2`
  margin: 0;
  margin-bottom: 5px;
  font-size: 20px;
`