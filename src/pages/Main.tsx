import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../redux/store";
import { clearUser } from "../redux/userSlice";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Color from "../constants/Color";
import Pagination from "../components/Main/Pagination";

const Main = () :JSX.Element => {
	const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(user);
		console.log("auth", auth.currentUser)
	}, [user]);

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
    try {
      await signOut(auth); // Firebase에서 로그아웃
      dispatch(clearUser()); // Redux에서 사용자 정보 초기화
    } catch (error) {
      console.error("로그아웃 실패: ", error);
			alert("로그아웃 실패: ", error);
    }
  };

	return (
		<Container>
			<Header>
				<H1 linkColor={Color.MAIN}>
					<StyledLink to={"/"}>festio</StyledLink>
				</H1>
				{user.isAuthenticated ?
					<StyledLink to={"/"} onClick={handleLogout} replace>로그아웃</StyledLink> : 
					<div>
						<StyledLink to={"/login"}>로그인</StyledLink>
						<StyledLink to={"/register"}>회원가입</StyledLink>
					</div>
				}
			</Header>
			<SearchDiv>
				<select>
					<option value="title">공연 제목</option>
					<option value="author">작가</option>
					<option value="genre">장르</option>
					<option value="date">시간</option>
				</select>
				<SearchInput type="text" placeholder="왼쪽에서 선택한 option마다 다르게"/>
			</SearchDiv>
			<BtnDiv>
				<div>
					<input type="checkbox" name="likes"/>
					<label htmlFor="likes">즐겨찾기만 보기</label>
				</div>
				<div>
				<label htmlFor="sort">정렬 기준 : </label>
					<select name="sort">
						<option value="recent">최근 순</option>
						<option value="title">제목 순</option>
						<option value="search">조회수 순</option>
					</select>
				</div>
			</BtnDiv>
			<Items>
				<Item>
					<Img src="" alt="사진"/>
					<p>제목</p>
					<p>조회수</p>
					<p>작가</p>
					<p>연령</p>
					<p>기간</p>
					<p>시간</p>
				</Item>
				<Item>
					<Img src="" alt="사진"/>
					<p>제목</p>
					<p>조회수</p>
					<p>작가</p>
					<p>연령</p>
					<p>기간</p>
					<p>시간</p>
				</Item>
				<Item>
					<Img src="" alt="사진"/>
					<p>제목</p>
					<p>조회수</p>
					<p>작가</p>
					<p>연령</p>
					<p>기간</p>
					<p>시간</p>
				</Item>
				<Item>
					<Img src="" alt="사진"/>
					<p>제목</p>
					<p>조회수</p>
					<p>작가</p>
					<p>연령</p>
					<p>기간</p>
					<p>시간</p>
				</Item>
				<Item>
					<Img src="" alt="사진"/>
					<p>제목</p>
					<p>조회수</p>
					<p>작가</p>
					<p>연령</p>
					<p>기간</p>
					<p>시간</p>
				</Item>
			</Items>
			<Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
		</Container>
	)
}

export default Main;

const Container = styled.div`
  max-width: 1280px;
	margin: 0 auto;
	padding-top: 30px;
`

const Header = styled.div`
	width: 100%;
	height: 50px;
	margin-bottom: 30px;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	border-bottom: 1px solid ${Color.BLACK};
`

const H1 = styled.h1<{ linkColor?: string }>`
	color: ${Color.MAIN};
	a {
    color: ${({ linkColor }) => linkColor || Color.BLACK};
  }
`

const StyledLink = styled(Link)<{ color?: string }>`
	color: ${({ color }) => color || Color.BLACK};
	text-decoration: none;
	margin-right: 15px;
`

const SearchDiv = styled.div`
	max-width: 676px;
  width: 100%;
  height: 35px;
	margin: 0 auto;
`

const SearchInput = styled.input`
	box-sizing: border-box;

  width: 100%;
	height: 35px;
	padding: 0 20px;
	
	border: 1px solid ${Color.BLACK};
	border-radius: 20px;


	:focus {
		outline: none;
		border-color: ${Color.MAIN};
	}

	::placeholder {
		text-align: center;
	}
`

const BtnDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const Items = styled.ul`
	max-width: 1280px;
	padding: none;
	margin: 0 auto;
	margin-top: 60px;

	display: flex;
	flex-direction: rows;
	justify-content: space-evenly;
	list-style-type: none;
	flex-wrap: wrap;

	gap: 10px;
	border: 1px solid #000;
`

const Item = styled.li`
	width: 240px;
	height: 320px;
	list-style-type: none;
	border: 1px solid #000;
`

const Img = styled("img")`
	width: 180px;
	height: 210px;

`