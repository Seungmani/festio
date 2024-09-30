import styled from "@emotion/styled";
import Spinner from "../../assets/Spinner.gif"

const Loading = () : JSX.Element => {
	return (
		<IMG src={Spinner} alt="로딩" width="50%" />
	)
}

export default Loading;

const IMG = styled(`img`)`
  position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	width: 30px;
	height: 30px;
`

// 마지막에 개발