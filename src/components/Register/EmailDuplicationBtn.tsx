import React, { useCallback } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface EmailDuplicationBtnProps {
	email: string;
	setDuplicate: (value: boolean) => void;
}

const EmailDuplicationBtn = React.memo(({email, setDuplicate}: EmailDuplicationBtnProps): JSX.Element => {

	const checkEmailExists = useCallback(async (email:string) => {
		try {
			const usersCollectionRef = collection(db, "users");
			const emailQuery = query(usersCollectionRef, where("email", "==", email));
			const querySnapshot = await getDocs(emailQuery);
			if (!querySnapshot.empty) {
				alert("이미 사용중인 아이디 입니다.")
				return setDuplicate(false);
			} else {
				alert("사용가능한 아이디 입니다.")
				return setDuplicate(true);
			}
		} catch (error) {
			console.error("아이디 중복 확인 실패:", error);
			return setDuplicate(true);
		}
	}, []);

	return (
		<button type="button" onClick={() => checkEmailExists(email) }>중복 확인</button>
	)
})

export default EmailDuplicationBtn;