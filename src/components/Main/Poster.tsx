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
			<P>제목: {title}</P>
			<P>작가: {author}</P>
			<P>장르: {genre}</P>
			<P>연령: {age}</P>
			<P>기간: {period}</P>
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
	font-size: 12px;
	margin-left: 20px;
	color: ${Color.BLACK};
	pointer-events: none;
`