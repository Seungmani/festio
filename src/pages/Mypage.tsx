import styled from '@emotion/styled';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Color from '../constants/Color';
import UserLike from '../components/DetailPage/UserLike';
import Calendar from '../components/Mypage/Calendar';

const MyPage = () :JSX.Element => {
	const user = useSelector((state: RootState) => state.user);

	const navigate = useNavigate();
	
  useEffect(() => {
    if (!user.isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate('/login', { replace: true });
    }
  }, [user.isAuthenticated, navigate]);

	const likes = useMemo(() => [...user.likes].sort((a, b) => {
		const dateA = new Date(a.period.split('~')[0].trim());
		const dateB = new Date(b.period.split('~')[0].trim());
		return dateB.getTime() - dateA.getTime();
	}), []); // 의존성 제거를 통해 잘 못 눌렀을 경우 값이 사라지지 않게 유지
	console.log(user, 'likes', likes)
	return (
		<Container>
			<LikeList>
			<List head={true}>
				<Period head={true}>기간</Period> 
				<Title head={true}>제목</Title>
				<Like head={true}>선호</Like>
			</List>
			{likes.map(({period, title, id: localId}) => 
				<List head={false} key={title}>
					<Period head={false}>{period}</Period> 
					<Title head={false}>{title}</Title>
					<UserLike userData={{period, title, localId}}/>
				</List>
			)}
			</LikeList>

			<Calendar/>
		</Container>
	)
}

export default MyPage;

const Container = styled.div`
	display: flex;

  max-width: 1280px;
	margin: 0 auto;
	padding: 20px 0;
`

const LikeList = styled.div`
	width: 500px;
	min-height: 400px;
`

const List = styled.div<{head: boolean}>`
	display: flex;
	width: 100%;
	height: 30px;
	line-height: 30px;

	font-size: ${(props) => props.head ? "24px" : "16px"};
	color: ${(props) => props.head ? Color.WHITE : Color.BLACK};
  border-bottom: 1px solid #ddd;
`

const Period = styled.p<{head: boolean}>`
	width: 225px;
	text-align: center;

  background-color: ${(props) => props.head ? Color.GREY : Color.WHITE};
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	border-right: 1px solid ${Color.WHITE};
`

const Title = styled.p<{head: boolean}>`
	width: 200px;

  background-color: ${(props) => props.head ? Color.GREY : Color.WHITE};
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	border-right: 1px solid ${Color.WHITE};

	text-align: center;
	overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`

const Like = styled.p<{head: boolean}>`
	width: 75px;
	text-align: center;

  background-color: ${(props) => props.head ? Color.GREY : Color.WHITE};
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
`