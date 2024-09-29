import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import styled from '@emotion/styled';

import TextInput from "../Common/TextInput";
import PasswordInput from "../Common/PasswordInput";
import Button from "../Common/Button";
import { validateEmail, validatePassword } from "../../utils/validation";

import { auth, db } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginForm = React.memo((): JSX.Element => {
	const [formState, setFormState] = useState({
		email: { value: '', errorText: '', isValid: false },
		password: { value: '', errorText: '', isValid: false },
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const {name, value} = e.target;
		let [errorText, error]: [string, boolean] = ["", false];
		switch(name) {
			case "email": [errorText, error] = validateEmail(value)
				break;
			case "password": [errorText, error] = validatePassword(value);
				break;
		}
		setFormState((prev) => ({
			...prev,
			[name]: {
				value,
				errorText,
				isValid: error,
			},
		}));
	};

	const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);

		try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
			onAuthStateChanged(auth, (user) => {
				console.log("User3:", user)
			})
			const userDoc = await getDoc(doc(db, "users", user.uid));

      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        phone: userDoc.data().phone,
      }));

      alert("로그인 성공!");
			navigate('/', { replace: true });
    } catch (error) {
			if (error.code === "auth/invalid-credential") alert("아이디 및 비밀번호가 틀립니다.");
    }
  }

	return (
		<Form onSubmit={handleSubmit}>
			<TextInput 
				text={formState.email.value}
				name="email"
				setText={handleInputChange}
				errorText={formState.email.errorText}
				placeholder="아이디"  
			/>
			<PasswordInput 
				password={formState.password.value} 
				name="password"
				setPassword={handleInputChange}
				errorText={formState.password.errorText}
				placeholder="비밀번호"  
			/>
			<Button text="로그인" width="232px" height="44px" disabled={false}/>
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