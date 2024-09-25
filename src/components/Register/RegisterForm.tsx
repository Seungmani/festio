import styled from "@emotion/styled";
import RegisterEmail from "./RegisterEmail";
import RegisterPassword from "./RegisterPassword";
import RegisterPasswordCheck from "./RegisterPasswordCheck";
import RegisterName from "./RegisterName";
import { useCallback, useState } from "react";

const RegisterForm = (): JSX.Element => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [password2, setPassword2] = useState<string>("");
	const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
	const [name, setName] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);
		console.log("name:", name);
	}

	const checkPassword = useCallback((): void => {
		setPasswordCheck(password === password2);
	}, [password2, password])

	return (
		<Form onSubmit={handleSubmit}>
			<RegisterEmail email={email} setEmail={setEmail}/>
			<RegisterPassword password={password} setPassword={setPassword}/>
			<RegisterPasswordCheck password={password2} setPassword={setPassword2} passwordCheck={passwordCheck} checkPassword={checkPassword}/>
			<RegisterName name={name} setName={setName}/>
		</Form>
	)
};

export default RegisterForm;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`