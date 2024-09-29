import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";

const Main = () :JSX.Element => {
	const user = useSelector((state: RootState) => state.user);
	console.log(user);
	return (
		<div>
			Main
			<Link to={"/login"}>로그인</Link>
			<Link to={"/register"}>회원 가입</Link>
		</div>
	)
}

export default Main;