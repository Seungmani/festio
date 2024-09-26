import styled from "@emotion/styled";

interface SnsLinkProps {
	src: string;
  text: string;
	color: string;
	onClick: () => Promise<void>;
}

const SnsLink = ({src, text, color, onClick}: SnsLinkProps): JSX.Element => {
	return (
		<LinkDiv onClick={text === "구글" ? onClick : () => {}}>
			<ImgDiv color={color}>
				<SnsImage src={src} alt={text} />
			</ImgDiv>
			<Text>{text}</Text>
		</LinkDiv>
	)
}

export default SnsLink;

const LinkDiv = styled.div`
	display: flex;
	flex-direction: column;
	cursor: pointer;
`

const ImgDiv = styled.div<{ color: string }>`
	position: relative;

	width: 50px;
	height: 50px;
	border: 1px solid ${(props) => props.color};
	background-color: ${(props) => props.color};
	border-radius: 50%;
`

const Text = styled.p`
	text-align: center;
	font-size: 14px;
`

const SnsImage = styled(`img`)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	width: 30px;
	height: 30px;
`