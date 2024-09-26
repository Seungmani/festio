import styled from "@emotion/styled";
import RegisterEmail from "./RegisterEmail";
import RegisterPassword from "./RegisterPassword";
import RegisterPasswordCheck from "./RegisterPasswordCheck";
import RegisterName from "./RegisterName";
import RegisterPhone from "./RegisterPhone";
import Button from "../Common/Button";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";


const RegisterForm = React.memo((): JSX.Element => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
  
	useEffect(() => {
		setIsDisabled(
			email === "" || 
			password === "" || 
			passwordConfirm === "" || 
			name === "" || 
			phone === "" || 
			password !== passwordConfirm
		);
	}, [email, password, passwordConfirm, name, phone]);


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
			<RegisterEmail email={email} setEmail={setEmail}/>
			<RegisterPassword password={password} setPassword={setPassword}/>
			<RegisterPasswordCheck password={password} passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm}/>
			<RegisterName name={name} setName={setName}/>
			<RegisterPhone phone={phone} setPhone={setPhone}/>
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