import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router';
import Toggle from '../components/Common/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { setLike } from '../redux/userSlice';
import { RootState } from '../redux/store';


const DetailPage = React.memo(() :JSX.Element => {
	const { localId } = useParams()
	const user = useSelector((state: RootState) => state.user);
	const [info, setInfo] = useState({});
	const [isLike, setIsLike] = useState<boolean>(user.likes.includes(localId)); // userDB에서 받아오기
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUserData = async (localId: string) => {
			const apiDataSnapshot = await getDoc(doc(db, "apiData", localId));
			setInfo(apiDataSnapshot.data())
		};

		fetchUserData(localId);
	}, [])

	const handleLikeToggle = async () => {
		if (isLike) dispatch(setLike(user.likes.filter((like) => like !== localId)));
		else {
			if (!user.likes.includes(localId)) dispatch(setLike([...user.likes, localId]));
		}

		await setDoc(doc(db, "users", user.user.uid), {
			...user,
			likes: [...user.likes, localId],
		});
		
		setIsLike(!isLike);
	};

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