import styled from '@emotion/styled';
import Color from '../constants/Color';
import { Link, useNavigate } from 'react-router-dom';

import LoginForm from '../components/Login/LoginForm';
import SnsLoginDiv from '../components/Login/SnsLoginDiv';
import GreyContainer from '../components/Common/GreyContainer';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from 'react';


const Login = () :JSX.Element => {
	const user = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	
  useEffect(() => {
    if (user.isAuthenticated) {
      alert("이미 로그인 했습니다.");
      navigate('/', { replace: true });
    }
  }, []);

	return (
		<GreyContainer width="450px" height='450px'>
			<DIV>
				<Logo>Festio</Logo>
				<LoginForm />
				<FlexRow>
					<StyledLink to="#"><Text>비밀번호 찾기</Text></StyledLink>
					<Text> / </Text>
					<StyledLink to="/register"><Text>회원가입</Text></StyledLink>
				</FlexRow>
				<SnsLoginDiv />
			</DIV>
		</GreyContainer>
	)
}

export default Login;

const DIV = styled.div`
	width: 300px;
	margin: 0 auto;
`

const Logo = styled.h1`
  margin-top: 30px;
	font-size: 32px;
  color: ${Color.MAIN};
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
	color: ${Color.BLACK};
	white-space: pre-wrap;

	:hover {
		color: blue;
	}
`

const Text = styled.p`
	white-space: pre-wrap;
	font-size: 12px;
`