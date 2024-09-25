import React, { useState } from "react";
import styled from "@emotion/styled";
import Input from "../Common/Input";
import Error from "../Common/Error";

interface PhoneInputProps {
	phone: string;
	setPhone: (email: string) => void;
}

const RegisterPhone = React.memo(({ phone, setPhone }: PhoneInputProps): JSX.Element => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(String(e.target.value));
    if (!isTouched) setIsTouched(true);
  };

  return (
		<>
			<H2>번호</H2>
			<Input
      type="text"
      placeholder="번호"
      value={phone}
      onChange={handleNameChange}
      errorMessage={phone!=="" && !phone ? "-없이 입력해주세요" : ""}
      isTouched={isTouched}
    />
    <Error errorMessage={phone!=="" && !phone ? "-없이 입력해주세요" : ""} />
		</>
  );
})

export default RegisterPhone;

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 5px;
  font-size: 20px;
`