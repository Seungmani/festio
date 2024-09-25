import React from "react";
import EmailInput from "../Login/EmailInput";
import styled from "@emotion/styled";

interface EmailInputProps {
	email: string;
	setEmail: (email: string) => void;
}

const RegisterEmail = React.memo(({ email, setEmail }: EmailInputProps): JSX.Element => {
  return (
		<>
			<FlexRow>
				<H2>아이디</H2>
				<button>중복 검사</button>
			</FlexRow>
    	<EmailInput email={email} setEmail={setEmail}/>
		</>
  );
})

export default RegisterEmail;

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 5px;
  font-size: 20px;
`

const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
