import styled from "@emotion/styled";
import React, { useContext } from "react";
import { PlayInfoContext } from "../../pages/DetailPage";
import UserLike from "./UserLike";
import Description from "./Description";
import EctText from "./EctText";

const Info = React.memo(():JSX.Element => {
	const info = useContext(PlayInfoContext);

	return (
		<InfoDiv>
			<UpperDiv>
				<Title>{info.title}</Title>
				<UserLike userData={null} text="즐겨찾기"/>
			</UpperDiv>
			<Description description={info.description}/>
			<EctText />
		</InfoDiv>
	)
})

export default Info;

const InfoDiv = styled.div`
  width: 980px;
`

const UpperDiv = styled.div`
  width: 100%;
	height: 32px;
	margin-bottom: 10px;

  display: flex;
	flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h1`
	font-size: 24px;
	font-weight: 600;
`