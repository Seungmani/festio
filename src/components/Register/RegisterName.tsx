import React, { useState } from "react";
import styled from "@emotion/styled";
import Input from "../Common/Input";

interface NameInputProps {
	name: string;
	setName: (email: string) => void;
}

const RegisterName = React.memo(({ name, setName }: NameInputProps): JSX.Element => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
	

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!isTouched) setIsTouched(true);
  };

  return (
		<>
			<H2>이름</H2>
			<Input
      type="text"
      placeholder="비밀번호"
      value={name}
      onChange={handleNameChange}
      errorMessage={!name ? "이름을 입력해주세요." : ""}
      showToggle={true}
      isTouched={isTouched}
    />
		</>
  );
})

export default RegisterName;

const H2 = styled.h2`
  margin-bottom: 5px;
  font-size: 20px;
`