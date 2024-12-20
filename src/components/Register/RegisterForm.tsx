import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLike } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import TextInput from "../Common/TextInput";
import PasswordInput from "../Common/PasswordInput";
import Button from "../Common/Button";
import EmailDuplicationBtn from "./EmailDuplicationBtn";
import useFormState from "../../hooks/useFormState";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const initialRegisterState = {
  email: { value: '', errorText: '', isValid: false },
  password: { value: '', errorText: '', isValid: false },
  passwordCheck: { value: '', errorText: '', isValid: false },
  name: { value: '', errorText: '', isValid: false },
  phone: { value: '', errorText: '', isValid: false },
};

const RegisterForm = React.memo((): JSX.Element => {
	const { formState, handleInputChange } = useFormState(initialRegisterState);
	const [isEmailDuplicate, setIsEmailDuplicate] = useState<boolean>(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const disabled = formState.email.isValid &&
		!isEmailDuplicate &&
		formState.password.isValid &&
    formState.passwordCheck.isValid &&
    formState.name.isValid &&
    formState.phone.isValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
				auth, formState.email.value, formState.password.value
			);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: formState.email.value,
        phone: formState.phone.value,
        name: formState.name.value,
				likes: [],
        createdAt: new Date(),
      });

			dispatch(setLike([]));

      alert("회원가입이 완료되었습니다!");
			navigate('/login', { replace: true });
    } catch (error) {
			console.error(error.message)
      alert("회원가입에 실패했습니다: " + error.message);
    }
  };

  return (
		<Form onSubmit={handleSubmit}>
			<FlexRow>
				<InputTitle>아이디</InputTitle>
				<EmailDuplicationBtn email={formState.email.value} duplicate={isEmailDuplicate} setDuplicate={setIsEmailDuplicate} />
			</FlexRow>
			<TextInput 
				text={formState.email.value}
				name="email"
				setText={handleInputChange}
				errorText={formState.email.errorText}
				placeholder="아이디"  
			/>
			<InputTitle>비밀번호</InputTitle>
			<PasswordInput 
				password={formState.password.value} 
				name="password"
				setPassword={handleInputChange}
				errorText={formState.password.errorText}
				placeholder="비밀번호"  
			/>
			<InputTitle>비밀번호 확인</InputTitle>
			<PasswordInput 
				password={formState.passwordCheck.value} 
				name="passwordCheck"
				setPassword={handleInputChange}
				errorText={formState.passwordCheck.errorText}
				placeholder="비밀번호 확인"  
			/>
			<InputTitle>이름</InputTitle>
			<TextInput 
				text={formState.name.value}
				name="name"
				setText={handleInputChange}
				errorText={formState.name.errorText}
				placeholder="이름" 
			/>
			<InputTitle>번호</InputTitle>
			<TextInput 
				text={formState.phone.value}
				name="phone"
				setText={handleInputChange}
				errorText={formState.phone.errorText}
				placeholder="번호" 
			/>
			<Button width="232px" height="44px" text={"회원 가입"} disabled={!disabled}/>
		</Form>
  );
});

export default RegisterForm;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;

	margin-top: 20px;
`

const InputTitle = styled.p`
  margin: 0;
  margin-bottom: 5px;
  font-size: 16px;
`

const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
