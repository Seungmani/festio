import React, { useCallback } from "react";
import styled from '@emotion/styled';
import Color from "../../constants/Color";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { clearUser } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import { setIsShowLike } from "../../redux/filterSlice";
import { RootState } from "../../redux/store";

const Header = React.memo(():JSX.Element => {
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
		<HeaderDiv>
			<H1 linkColor={Color.MAIN}>
				<StyledLink to={"/"}>festio</StyledLink>
			</H1>
			{user.isAuthenticated ?
				<StyledLink to={"/"} onClick={handleLogout} replace>로그아웃</StyledLink> : 
				<div>
					<StyledLink to={"/login"}>로그인</StyledLink>
					<StyledLink to={"/register"}>회원가입</StyledLink>
				</div>
			}
		</HeaderDiv>
	)
});

export default Header;

const HeaderDiv = styled.div`
	max-width: 1280px;
	width: 100%;
	height: 50px;
	margin: 30px auto;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	border-bottom: 1px solid ${Color.BLACK};
`

const H1 = styled.h1<{ linkColor?: string }>`
  font-size: 36px;
	color: ${Color.MAIN};
	a {
    color: ${({ linkColor }) => linkColor || Color.BLACK};
  }
`

const StyledLink = styled(Link)<{ color?: string }>`
	color: ${({ color }) => color || Color.BLACK};
	text-decoration: none;
	margin-right: 15px;
`
