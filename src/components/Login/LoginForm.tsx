import React from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setLike } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import styled from '@emotion/styled';

import TextInput from "../Common/TextInput";
import PasswordInput from "../Common/PasswordInput";
import Button from "../Common/Button";
import useFormState from "../../hooks/useFormState";

import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const initialLoginState = {
  email: { value: '', errorText: '', isValid: false },
  password: { value: '', errorText: '', isValid: false },
};

const LoginForm = React.memo((): JSX.Element => {
	const { formState, handleInputChange } = useFormState(initialLoginState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

		try {
			await setPersistence(auth, browserSessionPersistence);

      const userCredential = await signInWithEmailAndPassword(auth, formState.email.value, formState.password.value);
      const user = userCredential.user;
			const userDoc = await getDoc(doc(db, "users", user.uid));

      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        phone: userDoc.data().phone,
      }));

			dispatch(setLike(userDoc.data().likes));
			
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