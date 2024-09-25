import styled from '@emotion/styled';
import RegisterForm from '../components/Register/RegisterForm';
import GreyContainer from '../components/Common/GreyContainer';

const Register = () :JSX.Element => {
	return (
		<GreyContainer width="400px" height='100vh'>
			<>
				<H1>회원 가입</H1>
				<RegisterForm />
			</>
		</GreyContainer>
	)
}

export default Register;

const H1 = styled.h1`
  margin: 0;
	margin-top: 30px;
	font-size: 36px;
	text-align: center;
`