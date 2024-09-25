import styled from '@emotion/styled';
import RegisterForm from '../components/Register/RegisterForm';
import Button from '../components/Common/Button';
import GreyContainer from '../components/Common/GreyContainer';

const Register = () :JSX.Element => {
	return (
		<GreyContainer width="540px" height='780px'>
			<>
				<H1>회원가입</H1>
				<RegisterForm />
				<Button width="383px" height="54px" text={"회원 가입"} />
			</>
		</GreyContainer>
	)
}

export default Register;

const H1 = styled.h1`
	font-size: 36px;
	text-align: center;
`