import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Poster = React.memo((): JSX.Element => {
	return(
		<Item to={""}>
			<Img src="" alt="사진"/>
			<p>제목</p>
			<p>조회수</p>
			<p>작가</p>
			<p>연령</p>
			<p>기간</p>
			<p>시간</p>
		</Item>
	)
});

export default Poster;

const Item = styled(Link)`
	width: 240px;
	height: 320px;
	border: 1px solid #000;
`

const Img = styled("img")`
	width: 180px;
	height: 210px;
`