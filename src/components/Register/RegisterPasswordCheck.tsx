import React from "react";
import styled from "@emotion/styled";
import PasswordInput from "../Login/PasswordInput";

interface PasswordInputProps {
	password: string;
	setCheckPassword: (password: string) => void;
	passwordCheck?: boolean;
  checkPassword?: () => void;
}

const RegisterPasswordCheck = React.memo(({ password, setCheckPassword }: PasswordInputProps): JSX.Element => {

  return (
    <>
      <H2>비밀번호</H2>
      <PasswordInput password={password} setPassword={setCheckPassword} />
    </>
  );
})

export default RegisterPasswordCheck;

const H2 = styled.h2`
  margin-bottom: 5px;
  font-size: 20px;
`