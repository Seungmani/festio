import { Link } from "react-router-dom";
import styled from '@emotion/styled';

const Main = () :JSX.Element => {
	return (
		<div>
			Main
			<Link to={"/login"}>로그인</Link>
			<Link to={"/register"}>회원 가입</Link>
		</div>
	)
}

export default Main;