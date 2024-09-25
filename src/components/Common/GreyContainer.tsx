import styled from "@emotion/styled"
import Color from "../../constants/Color"
import React from "react"

interface SizeProps {
	width: string;
  height: string;
	children: JSX.Element;
}

const GreyContainer = React.memo(({width, height, children}: SizeProps): JSX.Element => {
	return (
		<FullDiv>
			<Container width={width} height={height}>
				{children}
			</Container>
		</FullDiv>
	)
})

export default GreyContainer;

const FullDiv = styled.div`
  width: 100%;
	height: 100%;
	background-color: ${Color.background};

	overflow: hidden;
`
const Container = styled.div<{ width: string; height: string }>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};

	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;

	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	
	background-color: ${Color.white};
	border-radius: 15px;
`