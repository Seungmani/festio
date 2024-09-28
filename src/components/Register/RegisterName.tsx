import React, { useState } from "react";
import styled from "@emotion/styled";
import Input from "../Common/Input";
import Error from "../Common/Error";
import useColor from "../../hooks/useColor";

interface NameInputProps {
	name: string;
	setName: (email: string) => void;
}

const RegisterName = React.memo(({ name, setName }: NameInputProps): JSX.Element => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [nameErrorText, setNameErrorText] =useState<string>("이름을 입력해 주세요");

  const color = useColor(isTouched, nameErrorText)

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameErrorText(e.target.value ? "" : "이름을 입력해 주세요");
    if (!isTouched) setIsTouched(true);
  };

  return (
		<>
			<H2>이름</H2>
			<Input
        type="text"
        placeholder="이름"
        value={name}
        onChange={handleNameChange}
        color={color}
      />
      <Error errorMessage={name!=="" && !name ? "이름을 입력해주세요." : ""} />
		</>
  );
})

export default RegisterName;

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 5px;
  font-size: 20px;
`