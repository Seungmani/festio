import styled from "@emotion/styled";
import RegisterEmail from "./RegisterEmail";
import RegisterPassword from "./RegisterPassword";
import RegisterPasswordCheck from "./RegisterPasswordCheck";
import RegisterName from "./RegisterName";
import RegisterPhone from "./RegisterPhone";
import React, { useState } from "react";
import Button from "../Common/Button";

const RegisterForm = React.memo((): JSX.Element => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);
		console.log("passwordConfirm:", passwordConfirm);
		console.log("name:", name);
		console.log("phone:", phone);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<RegisterEmail email={email} setEmail={setEmail}/>
			<RegisterPassword password={password} setPassword={setPassword}/>
			<RegisterPasswordCheck password={password} passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm}/>
			<RegisterName name={name} setName={setName}/>
			<RegisterPhone phone={phone} setPhone={setPhone}/>
			<Button width="232px" height="44px" text={"회원 가입"} />
		</Form>
	)
});

export default RegisterForm;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;

	margin-top: 20px;
`