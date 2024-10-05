import styled from '@emotion/styled';

import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ApiDataProps } from '../redux/apiDataSlice';
import { setLike } from '../redux/userSlice';
import { RootState } from '../redux/store';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Toggle from '../components/Common/Toggle';
import Loading from '../components/Common/Loading';

const DetailPage = React.memo(() :JSX.Element => {
	const { localId } = useParams();
	const user = useSelector((state: RootState) => state.user);
	const [info, setInfo] = useState<ApiDataProps| null>(null)
	const [isLike, setIsLike] = useState<boolean>(user.likes.includes(localId || ""));
	const dispatch = useDispatch();

  const fetchApiData = useCallback(async () => {
    if (!localId) return;
    const apiDataSnapshot = await getDoc(doc(db, "apiData", localId));
    setInfo(apiDataSnapshot.data() as ApiDataProps); // 타입 명시
  }, [localId]);

  useEffect(() => {
    fetchApiData(); 
  }, [fetchApiData]);

  const handleLikeToggle = useCallback(async () => {
    const updatedLikes = isLike
      ? user.likes.filter((like) => like !== localId)
      : [...user.likes, localId];

    dispatch(setLike(updatedLikes));

    if (user.user) {
      await setDoc(doc(db, "users", user.user.uid), {
        ...user,
        likes: updatedLikes,
      });
    }

    setIsLike((prev) => !prev);
  }, [isLike, localId, user, dispatch]);


	const decodeHTMLEntities = useCallback((html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.innerHTML; 
	}, []);

	if (!info) {
    return <Loading/>;
  }

	return (
		<>
			<Container>
				<ImageDiv>
          <img src={info.imageUrl} alt={info.title} width={"170px"} height={'250px'} />
        </ImageDiv>
        <InfoDiv>
					<UpperDiv>
						<Title>{info.title}</Title>
						{user.isAuthenticated ? 
						<ToggleDiv onClick={handleLikeToggle}>
							<Toggle type="like" like={isLike} />
							<Span>즐겨찾기</Span>
						</ToggleDiv>
						: null}
					</UpperDiv>
          <TextDiv><Info>설명 : </Info><Text>{decodeHTMLEntities(info.description)}</Text></TextDiv>
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
	height: 32px;
	margin-bottom: 10px;

  display: flex;
	flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Span = styled.span`
  margin-left: 5px;
	font-size: 16px;
`

const Title = styled.h1`
	font-size: 24px;
	font-weight: 600;
`

const ToggleDiv = styled.div`
  display: flex;
	flex-direction: row;
  align-items: center;
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