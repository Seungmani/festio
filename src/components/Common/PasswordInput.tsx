import styled from "@emotion/styled";
import React, { useState } from "react";
import Error from "./Error";
import Input from "./Input";
import Toggle from "./Toggle";
import useColor from "../../hooks/useColor";

interface PasswordInputProps {
  password: string;
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errorText: string;
  placeholder: string;
}

const PasswordInput = React.memo(({ password, setPassword, name, placeholder, errorText }: PasswordInputProps): JSX.Element => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const color = useColor(isTouched, errorText);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e);
    if (!isTouched) setIsTouched(true);
  };

  return (
    <>
      <InputDiv>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={password}
          onChange={handlePasswordChange}
          name={name}
          color={color}
        />
        <ShowBox onClick={() => setShowPassword(!showPassword)}>
          <Toggle show={showPassword} type="password" />
        </ShowBox>
      </InputDiv>
      <Error errorMessage={errorText}/>
    </>
  );
})

export default PasswordInput;

const InputDiv = styled.div`
  position: relative;
`;

const ShowBox = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`
