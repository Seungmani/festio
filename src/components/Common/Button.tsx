import styled from "@emotion/styled";
import Color from "../../constants/Color";
import React from "react";

interface ButtonProps {
	text: string;
	width: string;
	height: string;
	disabled: boolean;
}

const Button = React.memo(({text, width, height, disabled, }: ButtonProps): JSX.Element => {
	return (
		<StyledButton disabled={disabled} width={width} height={height} type="submit">{text}</StyledButton>
	)
})

export default Button;

const StyledButton = styled.button<{ width: string; height: string; disabled: boolean}>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	line-height: ${(props) => props.height};

	margin: 10px auto;

	border-radius: 30px;
	border: none;

	font-size: 24px;
	text-align: center;
	color: ${Color.WHITE};
	background-color: ${(props) => props.disabled ? Color.GREY : Color.MAIN};

	:hover {
		color: ${Color.BLACK};
		cursor: pointer;
	}
`