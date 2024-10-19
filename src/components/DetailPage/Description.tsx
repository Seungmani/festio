import styled from "@emotion/styled";
import React, { useCallback } from "react";

const Description = React.memo(({description}: {description: string}) => {

	const decodeHTMLEntities = useCallback((html: string) => {		
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html').body.innerHTML;
    const sentences = doc.split((/(\.+)/)).map(sentence => sentence.trim());

    return sentences.reduce((acc, sentence) => {
      if (sentence.includes(".") && sentence.indexOf(".") === sentence.lastIndexOf(".")) return acc + sentence + "\n";
      return acc + sentence;
    }, "");
	}, []);

	return (
		<FlexDiv>
			<TextInfo>설명 : </TextInfo>
			<Text>{decodeHTMLEntities(description)}</Text>
		</FlexDiv>
	)
});

export default Description;

const FlexDiv = styled.div`
	display: flex;
	margin-bottom: 10px;
`

const TextInfo = styled.p`
	width: 50px;
	font-size: 16px;
`

const Text = styled.p`
	width: 750px;
	height: 195px;
	margin-right: 5px;

	font-size: 16px;
	overflow-y: scroll;
  text-overflow: ellipsis;
  word-break: break-all;
	white-space: pre-wrap;
`