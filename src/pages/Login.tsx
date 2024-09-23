import styled from '@emotion/styled';
import Color from '../constants/Color';
import kakao from '../assets/SnsImages/kakao.png'
import google from '../assets/SnsImages/google.png'
import naver from '../assets/SnsImages/naver.png'
import { Link } from 'react-router-dom';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from 'react';

const Login = () :JSX.Element => {
	const [show, setShow] = useState<boolean>(false);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);

	return (
		<FullDiv>
			<Container>
				<Logo>Festio</Logo>
				<form>
					<div>
						<InputDiv>
							<Input type="text" placeholder="아이디" />
							{emailError ? <ErrorText>아이디는 이메일 형식입니다..</ErrorText>: null}
						</InputDiv>

						<InputDiv>
							<Input type={show ? "text" : "password"} placeholder="비밀번호" />
							<ShowBox onClick={() => setShow(!show)}>
								{show ? <LuEye size="20" /> : <LuEyeOff size="20" />}
							</ShowBox>
							{passwordError ? <ErrorText>영어, 숫자, 특수 문자를 포함한 8글자 이상을 입력하세요.</ErrorText>: null}
						</InputDiv>
					</div>
          <Button type="submit">로그인</Button>
					<FlexRow>
						<StyledLink to="#"><P>비밀번호 찾기</P></StyledLink>
						<P> / </P>
          	<StyledLink to="/register"><P>회원가입</P></StyledLink>
					</FlexRow>
				</form>
				<SNS>
					<SNSDiv>
						<Kakao>
							<SnsImage src={kakao} alt="kakao" />
						</Kakao>
						<SNSText>카카오</SNSText>
					</SNSDiv>
					<SNSDiv>
						<Google>
							<SnsImage src={google} alt="kakao" />
						</Google>
						<SNSText>구글</SNSText>
					</SNSDiv>
					<SNSDiv>
						<Naver>
							<SnsImage src={naver} alt="kakao" />
						</Naver>
						<SNSText>네이버</SNSText>
					</SNSDiv>
				</SNS>
			</Container>
		</FullDiv>
	)
}

export default Login;

const Logo = styled.h1`
	font-size: 32px;
  color: ${Color.Main};
	text-align: center;
`

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
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	
	background-color: ${Color.white};
	border-radius: 15px;
`

const Input = styled.input`
	width: 256px;
	height: 30px;
	padding-left: 10px;
	font-size: 16px;
	border: none;
	border-bottom: 1px solid #000;
`

const InputDiv = styled.div`
	width: 256px;
	height: 30px;

	display: flex;
	flex-direction: row;
	position: relative;
  margin-bottom: 10px;
`

const ShowBox = styled.div`
	width: 20px;
	height: 20px;
	margin-right: 10px;

	position: absolute;
	right: 0px;
	top: 50%;

	transform: translateY(-50%);
`

const Button = styled.button`
	width: 232px;
	height: 44px;
	line-height: 44px;

	margin: 10px 10px 0px 10px;

	border-radius: 30px;
	border: none;

	font-size: 24px;
	text-align: center;
	color: ${Color.white};
	background-color: ${Color.Main};

	:hover {
		color: ${Color.black};
		cursor: pointer;
	}
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

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 5px;
	white-space: pre-wrap;
`

const SNS = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 20px
`

const SNSDiv = styled.div`
	display: flex;
	flex-direction: column;
`

const Kakao = styled.div`
	position: relative;

	width: 50px;
	height: 50px;
	border: 1px solid #FFE90A;
	background-color: #FFE90A;
	border-radius: 50%;
`

const SNSText = styled.p`
	text-align: center;
	font-size: 14px;
`

const Google = styled.div`
	position: relative;

  width: 50px;
  height: 50px;
  border: 1px solid ${Color.black};
	background-color: ${Color.black};
	border-radius: 50%;
`
const Naver = styled.div`
	position: relative;

  width: 50px;
  height: 50px;
  border: 1px solid #03C75B;
	background-color: #03C75B;
	border-radius: 50%;
`

const SnsImage = styled(`img`)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	width: 30px;
	height: 30px;
`