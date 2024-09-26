import React, { useCallback } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface EmailDuplicationBtnProps {
	email: string;
}

const EmailDuplicationBtn = React.memo(({email}: EmailDuplicationBtnProps): JSX.Element => {

	const checkEmailExists = useCallback(async (email:string) => {
		try {
			// 'users' 컬렉션 참조
			const usersCollectionRef = collection(db, "users");
					
			// 이메일로 필터링하는 쿼리 생성
			const emailQuery = query(usersCollectionRef, where("email", "==", email));

			// 쿼리 실행
			const querySnapshot = await getDocs(emailQuery);

			// 문서가 존재하는지 확인
			if (!querySnapshot.empty) {
				alert("이미 사용중인 아이디 입니다.")
				return true;
			} else {
				alert("사용가능한 아이디 입니다.")
				return false;
			}
		} catch (error) {
			console.error("아이디 중복 확인 실패:", error);
			return false;
		}
	}, []);

	return (
		<button type="button" onClick={() =>checkEmailExists(email) }>중복 확인</button>
	)
})

export default EmailDuplicationBtn;