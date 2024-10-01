import React, { useCallback } from "react";
import styled from '@emotion/styled';
import Color from "../../constants/Color";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { clearUser } from "../../redux/userSlice";
import { Link } from "react-router-dom";

interface HeaderProps {
	user: boolean;
}

const Header = React.memo(({user}: HeaderProps):JSX.Element => {
	const dispatch = useDispatch();
	
	const handleLogout = useCallback(async (e: React.MouseEvent) => {
		e.preventDefault();
    try {
      await signOut(auth); // Firebase에서 로그아웃
      dispatch(clearUser()); // Redux에서 사용자 정보 초기화
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
			{user ?
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
	width: 100%;
	height: 50px;
	margin-bottom: 30px;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	border-bottom: 1px solid ${Color.BLACK};
`

const H1 = styled.h1<{ linkColor?: string }>`
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
