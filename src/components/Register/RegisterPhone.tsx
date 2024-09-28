import React, { useState } from "react";
import styled from "@emotion/styled";
import Input from "../Common/Input";
import Error from "../Common/Error";
import useColor from "../../hooks/useColor";

interface PhoneInputProps {
	phone: string;
	setPhone: (email: string) => void;
}

const RegisterPhone = React.memo(({ phone, setPhone }: PhoneInputProps): JSX.Element => {
  const [phoneErrorText, setPhoneErrorText] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const color = useColor(isTouched, phoneErrorText);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(String(e.target.value));
    setPhoneErrorText(phone === ""? "번호를 입력해주세요" : "");
    if (!isTouched) setIsTouched(true);
  };

  return (
		<>
			<H2>번호</H2>
      <InputDiv>
			<Input
        type="text"
        placeholder="번호"
        value={phone}
        onChange={handleNameChange}
        color={color}
      />
      </InputDiv>
    <Error errorMessage={phoneErrorText} />
		</>
  );
})

export default RegisterPhone;

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 5px;
  font-size: 20px;
`
const InputDiv = styled.div`
  position: relative;
`;
