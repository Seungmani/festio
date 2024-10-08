import styled from "@emotion/styled";
import React, { useContext } from "react";
import { PlayInfoContext } from "../../pages/DetailPage";
import { Link } from "react-router-dom";
import Color from "../../constants/Color";

const EctText = React.memo(() => {
	const info = useContext(PlayInfoContext);
	
	return (
		<>
			<FlexDiv><TextInfo>장르 : </TextInfo><Text>{info.genre}</Text></FlexDiv>
			<FlexDiv><TextInfo>연령 : </TextInfo><Text>{info.age}</Text></FlexDiv>
			<FlexDiv><TextInfo>기간 : </TextInfo><Text>{info.period}</Text></FlexDiv>
			<FlexDiv><TextInfo>시간 : </TextInfo><Text>{info.time}</Text></FlexDiv>
			<FlexDiv><TextInfo>링크 : </TextInfo><LinkText to={info.link}>{info.link}</LinkText></FlexDiv>
			<FlexDiv><TextInfo>전화 : </TextInfo><LinkText to={info.call}>{info.call}</LinkText></FlexDiv>
		</>
	)
})

export default EctText

const FlexDiv = styled.div`
	display: flex;
	margin-bottom: 5px;
`
const TextInfo = styled.p`
	width: 50px;
	font-size: 16px;
`

const Text = styled.p`
  width: 750px;
  font-size: 16px;
`
const LinkText = styled(Link)`
  color: ${Color.BLACK};
	text-decoration: none;
`