import React from "react";
import styled from '@emotion/styled';
import Color from "../../constants/Color";
import { Link } from "react-router-dom";
import AuthLink from "./AuthLink";


const Header = React.memo(():JSX.Element => {
	return (
		<HeaderDiv>
			<H1 linkColor={Color.MAIN}>
				<StyledLink to={"/"}>festio</StyledLink>
			</H1>
			<AuthLink/>
		</HeaderDiv>
	)
});

export default Header;

const HeaderDiv = styled.div`
	position: sticky;
	top: 0;

	max-width: 1280px;
	width: 100%;
	height: 50px;
	margin: 0 auto;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	z-index: 9999;

	border-bottom: 1px solid ${Color.GREY};
	background-color: ${Color.WHITE};
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
