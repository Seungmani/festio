import styled from "@emotion/styled";
import React from "react";
import Color from "../../constants/Color";

interface ErrorMessageProps {
	errorMessage: string;
}

const Error = React.memo(({errorMessage}: ErrorMessageProps): JSX.Element => {
	return (
		<ErrorDiv>
			<ErrorText errorMessage={errorMessage}>{errorMessage}</ErrorText>
		</ErrorDiv>
	)
})

export default Error;

const ErrorDiv = styled.div`
	width: 256px;
	height: 20px;
	display: flex;
	flex-direction: column;
`

const ErrorText = styled.p<{errorMessage: string}>`
  font-size: 12px;
  color: ${(props) => props.errorMessage !== "" ? Color.RED : Color.WHITE};
	white-space: pre-wrap;
	margin: 0
`