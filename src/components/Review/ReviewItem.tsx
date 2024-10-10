import styled from "@emotion/styled";
import React, { useContext } from "react";
import { PlayInfoContext } from "../../pages/DetailPage";

interface ReviewItemProps {
	title: string;
	date: string;
	comment: string;
}

const ReviewItem = React.memo(({title, date, comment}: ReviewItemProps):JSX.Element => {
	const info = useContext(PlayInfoContext);
	return (
		<Item>
			<strong>{title}</strong> ({date})
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

