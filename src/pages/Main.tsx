import { useState } from "react";
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";

import Pagination from "../components/Main/Pagination";
import Header from "../components/Header/Header";
import Search from "../components/Main/Search";
import Poster from "../components/Main/Poster";

const Main = () :JSX.Element => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchResult, setSearchResult] = useState<string>("");
	const user = useSelector((state: RootState) => state.user);


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
						<option value="recent">최신순</option>
						<option value="title">제목 순</option>
						<option value="search">조회수 순</option>
					</select>
				</div>
			</BtnDiv>
			<Items>
				<Poster />
			</Items>
			<Pagination currentPage={currentPage} totalPages={data?.totalCount || 5} onPageChange={setCurrentPage} />
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
	margin-top: 60px;

	display: flex;
	flex-direction: rows;
	justify-content: space-evenly;
	list-style-type: none;
	flex-wrap: wrap;

	gap: 10px;
	border: 1px solid #000;
`
