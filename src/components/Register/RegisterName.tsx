import React, { useState } from "react";
import styled from "@emotion/styled";
import Input from "../Common/Input";
import Error from "../Common/Error";

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
      placeholder="이름"
      value={name}
      onChange={handleNameChange}
      errorMessage={name!=="" && !name ? "이름을 입력해주세요." : ""}
      isTouched={isTouched}
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