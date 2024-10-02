import { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux/store";

import Pagination from "../components/Main/Pagination";
import Header from "../components/Header/Header";
import Search from "../components/Main/Search";
import Poster from "../components/Main/Poster";
import { fetchApiData } from "../redux/apiDataActions";

const Main = () :JSX.Element => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchResult, setSearchResult] = useState<string>("");
	const user = useSelector((state: RootState) => state.user);
	const { data, loading} = useSelector((state: RootState) => state.apiData);
	const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApiData()); // 컴포넌트 마운트 시 데이터 가져오기
  }, [dispatch]);

  const itemsPerPage = 5;
  const totalPage = Math.ceil(data.length / 5);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex); // searchResult에 맞는 결과도 보여주기

	return (
		<Container>
			<Header user={user.isAuthenticated}/>
			<Search setSearchResult={setSearchResult}/> {/* 검색 값 넘기기  */}
			<BtnDiv>
				<div>
					{ user.isAuthenticated ? 
					<>
						<input type="checkbox" name="likes"/>
						<label htmlFor="likes">즐겨찾기만 보기</label>
					</>	: null
				}
				</div>
				<div>
				<label htmlFor="sort">정렬 기준 : </label>
					<select name="sort">
						<option value="default">기본</option>
						<option value="recent">최신순</option>
						<option value="title">제목순</option>
					</select>
				</div>
			</BtnDiv>
			<Items>
				{loading ? <>Loading...</> : 
					currentItems.map((info) => 
					<Poster
						key={info.localId}
						title={info.title}
						age={info.age}
						genre={info.genre}
						period={info.period}
						duration={info.duration}
						imageUrl={info.imageUrl}
						author={info.author}
						localId={info.localId}
					/>)
				}
			</Items>
			<Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={setCurrentPage} />
		</Container>
	)
}

export default Main;

const Container = styled.div`
  max-width: 1280px;
	margin: 0 auto;
	padding-top: 30px;
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
	margin-top: 30px;

	display: flex;
	flex-direction: rows;
	justify-content: space-evenly;
	list-style-type: none;
	flex-wrap: wrap;

	gap: 10px;
`
