// import { db } from '../firebase';
// import { collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
// import { useParams } from 'react-router';
import Toggle from '../components/Common/Toggle';
import Color from '../constants/Color';


const DetailPage = React.memo(() :JSX.Element => {
	// const { localId } = useParams();
	const [isLike, setIsLike] = useState<boolean>(false); // userDB에서 받아오기
	const info = {
    "title": "기울기 기울이기",
    "description": "  \n\n\n《기울기 기울이기》(The Art of Tilting)는 서울문화재단 서울장애예술창작센터 입주작가 6팀의 예술 세계를 조명하는 기획전입니다. \n 김은정, 김진주, 라움콘, 박유석, 윤하균, 허겸의 근작과 신작 30여 점으로 구성되며, 작년에 이어 올해도 서울문화재단과 예술의전당이 함께 주관하고, 효성이 후원합니다.\n \n\n우리가 살고 있는 세계는 몇 개의 기울기로 이루어져 있을까요? 《기울기 기울이기》는 우주에 존재하는 셀 수 없는 빛, 각기 다른 기울기에 관한 이야기입니다. 전시에서 소개하는 여섯 가지 기울기는 자신만의 밝기와 끊임없는 움직임을 가지고 2024년이라는 시점에 같은 지점을 통과합니다. 그렇게 지금 이곳에 함께 있지만, 이들은 결코 장애라는 말로 단순히 규정되거나 뭉뚱그려질 수 없는 고유한 빛을 내고 있습니다. 우리는 그 기울기의 스펙트럼에 귀를 기울여 봅니다. 모든 존재들의 고유한 기울기, 때로는 완만하게 때로는 가파르게, 누군가는 곧게 누군가는 둥글게 움직이며 서로 만나고 관계하는 기울기들 앞에서, 우리는 기울기라는 공통의 감각을 경험하게 됩니다.\n\n여섯 작가는 자신만의 기울기에 귀를 기울이고, 그것을 통해 세상을 바라보고, 다른 이들의 기울기와 만나고, 자신의 기울기에 다른 기울기를 더합니다. 이처럼 주어진 기울기를 기울이는 행위는 변화를 만들어 냅니다. 차이 혹은 불편이라는 조건은 관찰과 감각, 신체를 뛰어넘는 외부 세계에 관한 관심으로 변이합니다. 그 결과 우리는 세계를 낯선 방식으로, 고정되지 않는 감각으로 경험할 수 있게 됩니다. 나의 기울기를 알아차리는 순간, 역설적으로 세상은 더 이상 기울어진 것이 아니게 될 것입니다. 자, 우리는 각자 어떤 기울기를 갖고 있을까요? 그리고 그것을 어떻게 기울이게 될까요?",
    "imageUrl": "https://www.sac.or.kr/site/main/file/image/uu/8c095216b6644682ac63ed451d8d33fe",
    "link": "https://www.sac.or.kr/site/main/show/show_view?SN=65541",
    "genre": "전시",
    "localId": "10026390",
    "call": "02-423-6675",
    "age": "전체관람",
    "period": "2024-09-26~2024-10-15",
    "time": "10:00 ~ 19:00 (※ 매주 월요일 휴관)",
    "author": "",
    "actor": "",
    "contact": "02-423-6675",
    "charge": "",
    "numberPages": "",
    "duration": "",
    "subDescription": "",
    "spatial": "",
    "site": ""
	}

	// const fetchUserData = useCallback(async (localId: string) => {
		// db에서 읽기
		// const apiDataRef = collection(db, 'apiData', localId);
		// const apiDataSnapshot = await getDoc(apiDataRef);

	//}, [localId]);

	return (
		<>
			<Container>
				<ImageDiv>
          <img src={info.imageUrl} alt={info.title} width={"170px"} height={'250px'} />
        </ImageDiv>
        <InfoDiv>
					<UpperDiv>
						<Title>{info.title}</Title>
						<ToggleDiv onClick={() => setIsLike(!isLike)}>
							<Toggle type="like" like={isLike} />
							<Span>즐겨찾기</Span>
						</ToggleDiv>
					</UpperDiv>
          <TextDiv><Info>설명 : </Info><Text>{info.description}</Text></TextDiv>
          <TextDiv><Info>장르 : </Info><Text>{info.genre}</Text></TextDiv>
          <TextDiv><Info>연령 : </Info><Text>{info.age}</Text></TextDiv>
          <TextDiv><Info>기간 : </Info><Text>{info.period}</Text></TextDiv>
          <TextDiv><Info>시간 : </Info><Text>{info.time}</Text></TextDiv>
          <TextDiv><Info>링크 : </Info><Text>{info.link}</Text></TextDiv>
        </InfoDiv>
			</Container>
		</>
	)
});

export default DetailPage;

const Container = styled.div`
	width: 1280px;
	margin: 30px auto;
	padding: 0;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const Span = styled.span`
  margin-left: 10px;
	font-size: 16px;
`

const ImageDiv = styled.div`
  width: 300px;
  height: 300px;
  margin-right: 20px;
`

const InfoDiv = styled.div`
  width: 720px;
	height: 256px;
`

const UpperDiv = styled.div`
  width: 100%;

  display: flex;
	flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h1`
	font-size: 24px;
	font-weight: 400;
`

const ToggleDiv = styled.div`
`

const TextDiv = styled.div`
	display: flex;
	flex-direction: row;
`

const Info = styled.p`
	width: 50px;
	font-size: 16px;
`

const	Text = styled.p`
	width: 650px;
	font-size: 16px;
`