import styled from '@emotion/styled';
import Color from '../constants/Color';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from 'react';

const Login = () :JSX.Element => {
	const [show, setShow] = useState<boolean>(false);


	return (
		<FullDiv>
			<Container>
				<title><h1>Festio</h1></title>
				<form>
					<div>
						<InputDiv>
							<Input type="text" placeholder="아이디" />
						</InputDiv>

						<InputDiv>
							<Input type={show ? "text" : "password"} placeholder="비밀번호" />
							<ShowBox onClick={() => setShow(!show)}>
								{show ? <LuEye size="20" /> : <LuEyeOff size="20" />}
							</ShowBox>
						</InputDiv>
					</div>
          <Button type="submit">로그인</Button>
					<div>
						<a href="#">비밀번호 찾기</a> / 
          	<a href="/register"> 회원가입</a>
					</div>
				</form>
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

const ShowBox = styled.span`
	width: 20px;
	height: 20px;
	margin-right: 10px;

	position: absolute;
	right: 0px;
	top: 50%;

	transform: translateY(-50%);
`

const Button = styled.button`
	width: 252px;
	height: 54px;
	line-height: 54px;

	margin: 20px 0;

	border-radius: 30px;
	border: none;

	font-size: 32px;
	text-align: center;
	color: black;
	background-color: ${Color.Main};
`