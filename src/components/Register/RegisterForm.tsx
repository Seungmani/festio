import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import Button from "../Common/Button";
import PasswordInput from "../Common/PasswordInput";
import TextInput from "../Common/TextInput";
import EmailDuplicationBtn from "./EmailDuplicationBtn";
import { 
	validateEmail, 
	validatePassword, 
	validateConfirmPassword, 
	validateName,
	validatePhoneNumber
} from "../../utils/validation";
import ErrorText from "../../constants/ErrorText";
import useHandleInputChange from "../../hooks/useHandleInputChange";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterForm = React.memo((): JSX.Element => {
	const [email, setEmail] = useState<string>("");
	const [isEmailDuplicate, setIsEmailDuplicate] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setIsDisabled(
			!validateEmail(email)[1] || 
			!isEmailDuplicate ||
			!validatePassword(password)[1] || 
			!validateConfirmPassword(passwordConfirm, password)[1] ||
			!validateName(name)[1] ||
			!validatePhoneNumber(phone)[1]
		);
	}, [email, password, passwordConfirm, name, phone, isEmailDuplicate]);

  const validatePasswordConfirm = useCallback((value: string): [string, boolean] => {
    if (password !== value) return [ErrorText.CHECK_PASSWORD_ERROR, false];
    return ["", true];
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        phone: phone,
        name: name,
        createdAt: new Date(),
      });

      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        phone: phone,
      }));

      alert("회원가입이 완료되었습니다!");
			navigate('/login', { replace: true });
    } catch (error) {
			console.error(error.message)
      alert("회원가입에 실패했습니다: " + error.message);
    }
  };

  return (
		<Form onSubmit={handleSubmit}>
			<>
				<FlexRow>
					<H2>아이디</H2>
					<EmailDuplicationBtn email={email} setDuplicate={setIsEmailDuplicate} />
				</FlexRow>
				<TextInput 
					text={email}
					setText={useHandleInputChange(setEmail)}
					validate={validateEmail}
					placeholder="아이디"  
				/>
			</>
			<>
      	<H2>비밀번호</H2>
				<PasswordInput 
					password={password} 
					setPassword={useHandleInputChange(setPassword)}
					validate={validatePassword}
					placeholder="비밀번호"  
				/>
			</>
			<>
      	<H2>비밀번호 확인</H2>
				<PasswordInput 
					password={passwordConfirm} 
					setPassword={useHandleInputChange(setPasswordConfirm)}
					validate={validatePasswordConfirm}
					placeholder="비밀번호 확인"  
				/>
			</>
			<>
      	<H2>이름</H2>
				<TextInput 
					text={name}
					setText={useHandleInputChange(setName)}
					validate={validateName}
					placeholder="이름" 
				/>
			</>
			<>
      	<H2>번호</H2>
				<TextInput 
					text={phone}
					setText={useHandleInputChange(setPhone)}
					validate={validatePhoneNumber}
					placeholder="번호" 
				/>
			</>
			<Button width="232px" height="44px" text={"회원 가입"} disabled={isDisabled}/>
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
