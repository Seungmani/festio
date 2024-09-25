import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import Button from "../Button";
import React, { useCallback, useState } from "react";
import styled from '@emotion/styled';

const LoginForm = React.memo((): JSX.Element => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
		// 로그인 api 연동
		console.log("Email:", email);
		console.log("Password:", password);
  }

	const handleEmailChange = useCallback((e: string) => {
    setEmail(e);
  }, []);

  const handlePasswordChange = useCallback((e: string) => {
    setPassword(e);
  }, []);

	return (
		<Form onSubmit={handleSubmit}>
			<EmailInput email={email} setEmail={handleEmailChange} />
			<PasswordInput password={password} setPassword={handlePasswordChange} />
			<Button text="로그인" width="232px" height="44px"/>
		</Form>
	)
})

export default LoginForm;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	margin-top: 20px;
`