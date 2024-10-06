import styled from "@emotion/styled";
import React, { useContext } from "react";
import { PlayInfoContext } from "../../pages/DetailPage";

const Img = React.memo(():JSX.Element => {
	const info = useContext(PlayInfoContext);
	return (
		<ImageDiv>
			<img src={info.imageUrl} alt={info.title} width="300px" height="400px" />
		</ImageDiv>
	)
})

export default Img;

const ImageDiv = styled.div`
  width: 400px;
  height: 500px;

	display: flex;
	justify-content: center;
`

