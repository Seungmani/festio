import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

interface ReviewItemProps {
	title?: string;
	date: string;
	comment: string;
	rating: string;
	localId: string;
}

const ReviewItem = React.memo(({title, date, comment, rating, localId}: ReviewItemProps):JSX.Element => {
	return (
		<Item>
			<Link to={`/DetailPage/${localId}`}>{title}</Link> ({date})
			<p>{rating}</p>
			<p>{comment}</p>
		</Item>
	)
});

export default ReviewItem;

const Item = styled.li`
	width: 100%;
  padding: 10px;
  margin-bottom: 10px;

  border-bottom: 1px solid #ddd;
`

