import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import Color from "../../constants/Color";

interface PosterProps {
	title: string;
	age: string;
	genre: string;
	period: string;
	duration: string;
	imageUrl: string;
	author: string;
	localId: string;
}

const Poster = React.memo(({
	title,
	age,
  genre,
  period,
  duration,
  imageUrl,
	author,
	localId,
}: PosterProps
): JSX.Element => {
	return(
		<Item to={`/DetailPage/${localId}`}>
			<Img src={imageUrl} alt="title"/>
			{title && <P>제목: {title}</P>}
			{author && <P>작가: {author}</P>}
			{genre && <P>장르: {genre}</P>}
			{age && <P>연령: {age}</P>}
			{period && <P>기간: {period}</P>}
			{duration && <P>시간: {duration}</P>}
		</Item>
	)
});

export default Poster;

const Item = styled(Link)`
	width: 220px;
	height: 350px;
	border: 1px solid #000;
	text-decoration: none;
`

const Img = styled("img")`
	width: 150px;
	height: 200px;
	margin: 10px 35px;
`

const P = styled("p")`
	pointer-events: none;

	margin-left: 20px;
	margin-bottom: 2px;

	font-size: 12px;
	color: ${Color.BLACK};
	overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`