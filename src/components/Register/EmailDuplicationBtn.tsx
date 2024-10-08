import React, { useCallback } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import styled from "@emotion/styled";
import Color from "../../constants/Color";

interface EmailDuplicationBtnProps {
	email: string;
	duplicate: boolean;
	setDuplicate: (value: boolean) => void;
}

const EmailDuplicationBtn = React.memo(({email, duplicate, setDuplicate}: EmailDuplicationBtnProps): JSX.Element => {

	const checkEmailExists = useCallback(async (email:string) => {
		try {
			const usersCollectionRef = collection(db, "users");
			const emailQuery = query(usersCollectionRef, where("email", "==", email));
			const querySnapshot = await getDocs(emailQuery);
			if (!querySnapshot.empty) {
				alert("이미 사용중인 아이디 입니다.")
				return setDuplicate(true);
			} else {
				alert("사용가능한 아이디 입니다.")
				return setDuplicate(false);
			}
		} catch (error) {
			console.error("아이디 중복 확인 실패:", error);
			return setDuplicate(true);
		}
	}, []);

	return (
		<Button type="button" duplicate={duplicate} onClick={() => checkEmailExists(email) }>{
			duplicate ? "중복 확인" : "사용 가능"
		}</Button>
	)
})

export default EmailDuplicationBtn;

const Button = styled.button<{duplicate: boolean}>`
	padding: 3px 5px;

	color: ${Color.BLACK};
	background-color: ${(props) => !props.duplicate ? Color.MAIN : Color.GREY};
  border: 1px solid	${(props) => !props.duplicate ? Color.MAIN : Color.BLACK};
	border-radius:20px;

	font-size: 12px;
`