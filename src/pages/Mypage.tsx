import styled from '@emotion/styled';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Color from '../constants/Color';
import UserLike from '../components/DetailPage/UserLike';
import Review from '../components/Review/Review';

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


	return (
		<Container>
			<LikeList>
				<List>
					<h1>좋아요 보관함</h1>
				</List>
				{likes.map(({period, title, id: localId}, index) => 
					<List key={title}>
						<Circle><Number>{index + 1}</Number></Circle>
						<Title to={`/DetailPage/${localId}`}>{title}</Title>
						<Period>({period})</Period> 
						<UserLike userData={{period, title, localId}}/>
					</List>
				)}
			</LikeList>
			<Review type="uid" id={user.user.uid}/>
		</Container>
	)
}

export default MyPage;

const Container = styled.div`
	display: flex;
	justify-content: space-between;

  max-width: 1280px;
	margin: 0 auto;
	padding: 20px 0;
`

const LikeList = styled.div`
	width: 600px;
`

const List = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 10px;

	width: 100%;
	height: 50px;

	color: ${Color.BLACK};
`

const Circle = styled.div`
	position: relative;

	width: 32px;
	height: 32px;
	line-height: 32px;

	border-radius: 32px;

	text-align: center;
	background-color: ${Color.GREY};
`

const Number = styled.p`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	font-size: 24px;
	color: ${Color.WHITE};
`

const Title = styled(Link)`
  color: ${Color.BLACK};
	text-decoration: none;

	max-width: 300px;
	font-size: 24px;
	overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`

const Period = styled.p`
	width: 190px;
	font-size: 16px;
`