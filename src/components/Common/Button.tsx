import styled from "@emotion/styled";
import Color from "../../constants/Color";

interface ButtonProps {
	text: string;
	width: string;
	height: string;
}

const Button = ({text, width, height}: ButtonProps): JSX.Element => {
	return (
		<StyledButton width={width} height={height} type="submit">{text}</StyledButton>
	)
}

export default Button;

const StyledButton = styled.button<{ width: string; height: string }>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	line-height: ${(props) => props.height};

	margin: 20px 10px 0px 10px;

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