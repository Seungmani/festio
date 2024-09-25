import React from "react";
import styled from "@emotion/styled";
import PasswordInput from "../Login/PasswordInput";

interface PasswordInputProps {
	password: string;
	setPassword: (password: string) => void;
}

const RegisterPassword = React.memo(({ password, setPassword }: PasswordInputProps): JSX.Element => {

  return (
    <>
      <H2>비밀번호</H2>
      <PasswordInput password={password} setPassword={setPassword} />
    </>
  );
})

export default RegisterPassword;

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 5px;
  font-size: 20px;
`