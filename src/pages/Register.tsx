import styled from '@emotion/styled';
import RegisterForm from '../components/Register/RegisterForm';
import GreyContainer from '../components/Common/GreyContainer';
import Color from '../constants/Color';

const Register = () :JSX.Element => {
	return (
		<GreyContainer width="400px" height='600px'>
			<>
				<H1>회원 가입</H1>
				<RegisterForm />
			</>
		</GreyContainer>
	)
}

export default Register;

const H1 = styled.h1`
	margin-top: 30px;

	color: ${Color.MAIN};
	font-size: 32px;
	text-align: center;
`