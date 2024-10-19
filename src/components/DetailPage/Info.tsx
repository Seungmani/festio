import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { PlayInfoContext } from "../../pages/DetailPage";
import UserLike from "./UserLike";
import Description from "./Description";
import EctText from "./EctText";
import Review from "../Review/Review";
import Color from "../../constants/Color";

const Info = React.memo(():JSX.Element => {
	const [tab, setTab] = useState<string>("desc")
	const info = useContext(PlayInfoContext);

	return (
		<InfoDiv>
			<UpperDiv>
				<Title>{info.title}</Title>
				<UserLike userData={null} text="즐겨찾기"/>
			</UpperDiv>
			<ButtonDIv>
        <Button active={tab === "desc"} onClick={() => setTab("desc")}>설명</Button>
        <Button active={tab === "review"}  onClick={() => setTab("review")}>리뷰</Button>
      </ButtonDIv>
			{tab === "desc" && 
			<>
				<Description description={info.description}/>
				<EctText />
			</>
			}
			{tab === "review" && <Review type="localId" id={info.localId}/>}
		</InfoDiv>
	)
})

export default Info;

const InfoDiv = styled.div`
	position: relative;
  width: 980px;
	padding-left: 150px;
`

const UpperDiv = styled.div`
  width: 800px;
	height: 32px;
	margin-bottom: 10px;
	padding-bottom: 10px;

  display: flex;
	flex-direction: row;
  align-items: center;
  justify-content: space-between;

	border-bottom: 1px solid ${Color.GREY};
`

const Title = styled.h1`
	font-size: 24px;
	font-weight: 600;
`

const ButtonDIv = styled.div`
	position: absolute;
	top: 30px;
	left: 48px;

	display: flex;
	flex-direction: column;
`

const Button = styled.button<{active: boolean}>`
  width: 100px;
  height: 30px;

  background-color: ${(props) => props.active ? Color.MAIN : Color.GREY};
	color: ${(props) => props.active ? Color.WHITE : Color.BLACK};

	border: none;
	border-top-left-radius: 10px;
	cursor: pointer;
`