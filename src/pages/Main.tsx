import { useEffect, useState, useTransition  } from "react";
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux/store";

import Pagination from "../components/Main/Pagination";
import Header from "../components/Header/Header";
import Search from "../components/Main/Search";
import Poster from "../components/Main/Poster";
import { fetchApiData } from "../redux/apiDataActions";
import Loading from "../components/Common/Loading";
import { ApiDataProps } from "../redux/apiDataSlice";

const Main = () :JSX.Element => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchResult, setSearchResult] = useState<string>("");
	const [searchOption, setSearchOption] = useState<string>("공연이름");
	const [isPending, startTransition] = useTransition();
	const [sortOption, setSortOption] = useState<string>("default");
	const [data, setData] = useState<ApiDataProps[]>([]);
	const user = useSelector((state: RootState) => state.user);
	const { data: apiData, loading } = useSelector((state: RootState) => state.apiData);
	const dispatch = useDispatch();

  useEffect(() => {
    if (apiData.length === 0) dispatch(fetchApiData());
    setData(apiData);
  }, [dispatch, apiData]);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOption(e.target.value);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;
		setSearchResult(searchValue);
		startTransition(() => {
			const filteredData = data.filter(item => {
				if (searchOption === "공연이름") return item.title.includes(searchValue);
				if (searchOption === "작가") return item.author.includes(searchValue);
				if (searchOption === "장르") return item.genre.includes(searchValue);
				if (searchOption === "날짜") {
					const result = new Date(searchValue);
					const [first, last] = item.period.split("~");
					return new Date(first) <= result && result <= new Date(last);
				}
			}
			);
      setData(searchValue ? filteredData : apiData);
		});
	};

  const itemsPerPage = 5;
  const totalPage = Math.ceil(data.length / 5);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

	const sortedData = [...data].sort((a, b) => {
		if (sortOption === "recent") {
			const startDateA = new Date(a.period.split('~')[0].trim());
			const startDateB = new Date(b.period.split('~')[0].trim());
			return startDateB.getTime() - startDateA.getTime();
		} else if (sortOption === "title") {
			return a.title.localeCompare(b.title);
		}
		return 0;
	});
  const currentItems = sortedData.slice(startIndex, endIndex); 
	console.log(data, sortedData, currentItems)

	return (
		<Container>
			<Header user={user.isAuthenticated}/>
			<Search handleSearch={handleSearch} setSearchOption={setSearchOption}/> {/* 검색 값 넘기기  */}
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
					<select name="sort" onChange={handleSortChange} value={sortOption}>
						<option value="default">기본</option>
						<option value="recent">최신순</option>
						<option value="title">제목순</option>
					</select>
				</div>
			</BtnDiv>
			<Items>
				{loading ? <Loading/> : 
				(currentItems && currentItems.length > 0 ? 
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
						/>
					) : <div>검색 결과가 없습니다.</div>
				)
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
	height: 350px;
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
