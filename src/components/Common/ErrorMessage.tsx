import styled from "@emotion/styled";
import React from "react";

interface ErrorMessageProps {
	errorMessage: string;
}

const ErrorMessage = React.memo(({errorMessage}: ErrorMessageProps): JSX.Element => {
	return (
		<ErrorDiv>
			<ErrorText errorMessage={errorMessage || ""}>{errorMessage}</ErrorText>
		</ErrorDiv>
	)
})

export default ErrorMessage;

const ErrorDiv = styled.div`
	width: 256px;
	height: 20px;
	display: flex;
	flex-direction: column;
`

const ErrorText = styled.p<{errorMessage: string}>`
  font-size: 12px;
  color: ${(props) => props.errorMessage ? `red` : "white"};
	white-space: pre-wrap;
	margin: 0
`