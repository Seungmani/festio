import styled from "@emotion/styled";
import React, { useEffect, useCallback, useRef, useState } from "react";
import Toggle from "../Common/Toggle";

const Description = React.memo(({description}: {description: string}) => {
	const textRef = useRef<HTMLParagraphElement | null>(null);
	const [isShowAll, setIsShowAll] = useState<boolean>(false);
	const [isTextHide, setIsTextHide] = useState<boolean>(false);
	
	useEffect(() => {
		if (textRef.current) {
			const height = textRef.current.scrollHeight;
			if (height > 195) {
				setIsTextHide(true);
				setIsShowAll(false);
			} else {
				setIsShowAll(true);
			}
		}
	}, []); 

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
			<div>
				<Text isShowAll={isShowAll} ref={textRef}>{decodeHTMLEntities(description)}
				</Text>
				{
				isTextHide &&
				<ToggleDiv onClick={() => setIsShowAll((prev) => !prev)}>
					<Toggle type="more" more={isShowAll}/>
				</ToggleDiv>
				}
			</div>
		</FlexDiv>
	)
});

export default Description;

const FlexDiv = styled.div`
	display: flex;
`

const TextInfo = styled.p`
	width: 50px;
	font-size: 16px;
`

const Text = styled.p<{isShowAll: boolean}>`
	width: 750px;
	height: ${(props) => props.isShowAll ? "auto" : " 195px"};
	margin-right: 5px;

	font-size: 16px;
	overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
	white-space: pre-wrap;
`

const ToggleDiv = styled.div`
	float: right;
`