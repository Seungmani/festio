import styled from '@emotion/styled';
import Color from '../constants/Color';
import { Link } from 'react-router-dom';

import LoginForm from '../components/Login/LoginForm';
import SnsLoginDiv from '../components/Login/SnsLoginDiv';


const Login = () :JSX.Element => {

	return (
		<FullDiv>
			<Container>
				<Logo>Festio</Logo>
				<LoginForm />
				<FlexRow>
					<StyledLink to="#"><P>비밀번호 찾기</P></StyledLink>
					<P> / </P>
        	<StyledLink to="/register"><P>회원가입</P></StyledLink>
				</FlexRow>
				<SnsLoginDiv />
			</Container>
		</FullDiv>
	)
}

export default Login;

const FullDiv = styled.div`
  width: 100%;
	height: 100%;
	background-color: ${Color.background};

	overflow: hidden;
`

const Container = styled.div`
	width: 450px;
	height: 450px;

	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;

	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	
	background-color: ${Color.white};
	border-radius: 15px;
`
const Logo = styled.h1`
  margin-top: 30px;
	font-size: 32px;
  color: ${Color.Main};
	text-align: center;
`

const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const StyledLink = styled(Link)`
	margin: 10px 0;

	text-decoration: none;
	color: ${Color.black};
	white-space: pre-wrap;

	:hover {
		color: blue;
	}
`

const P = styled.p`
	white-space: pre-wrap;
	font-size: 12px;
`