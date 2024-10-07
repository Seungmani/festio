import React, {useCallback} from "react";
import styled from '@emotion/styled';
import Color from "../../constants/Color";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { clearUser } from "../../redux/userSlice";

import { setIsShowLike } from "../../redux/filterSlice";
import { RootState } from "../../redux/store";

const AuthLink = React.memo(():JSX.Element => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);

	const handleLogout = useCallback(async (e: React.MouseEvent) => {
		e.preventDefault();
    try {
      await signOut(auth);
      dispatch(clearUser());
			dispatch(setIsShowLike(false));
    } catch (error) {
      console.error("로그아웃 실패: ", error);
			alert("로그아웃 실패: ", error);
    }
  }, [dispatch]);

	return (
    <>
			{user.isAuthenticated ?
				<div>
			  	<StyledLink to={"/mypage"}>마이페이지</StyledLink> 
					<StyledLink to={"/"} onClick={handleLogout} replace>로그아웃</StyledLink> 
				</div>
				: 
				<div>
					<StyledLink to={"/login"}>로그인</StyledLink>
					<StyledLink to={"/register"}>회원가입</StyledLink>
				</div>
			}
		</>
  )
});

export default AuthLink;

const StyledLink = styled(Link)<{ color?: string }>`
	color: ${({ color }) => color || Color.BLACK};
	text-decoration: none;
	margin-right: 15px;
`
