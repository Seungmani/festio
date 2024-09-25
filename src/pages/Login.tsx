import styled from '@emotion/styled';
import Color from '../constants/Color';
import { Link } from 'react-router-dom';

import LoginForm from '../components/Login/LoginForm';
import SnsLoginDiv from '../components/Login/SnsLoginDiv';
import GreyContainer from '../components/Common/GreyContainer';


const Login = () :JSX.Element => {

	return (
		<GreyContainer width="450px" height='450px'>
			<DIV>
				<Logo>Festio</Logo>
				<LoginForm />
				<FlexRow>
					<StyledLink to="#"><P>비밀번호 찾기</P></StyledLink>
					<P> / </P>
					<StyledLink to="/register"><P>회원가입</P></StyledLink>
				</FlexRow>
				<SnsLoginDiv />
			</DIV>
		</GreyContainer>
	)
}

export default Login;

const Logo = styled.h1`
  margin-top: 30px;
	font-size: 32px;
  color: ${Color.Main};
	text-align: center;
`
const DIV = styled.div`
	width: 300px;
	margin: 0 auto;
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