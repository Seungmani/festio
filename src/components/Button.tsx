import styled from "@emotion/styled";
import Color from "../constants/Color";

interface ButtonProps {
	text: string
}

const Button = ({text}: ButtonProps): JSX.Element => {
	return (
		<StyledButton type="submit">{text}</StyledButton>
	)
}

export default Button;

const StyledButton = styled.button`
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