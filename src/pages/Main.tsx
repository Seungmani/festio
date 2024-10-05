import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../redux/store";

import FilterControls from "../components/Main/FilterControl";

import Pagination from "../components/Main/Pagination";
import Search from "../components/Main/Search";
import Poster from "../components/Main/Poster";
import Loading from "../components/Common/Loading";
import { fetchApiData } from "../redux/apiDataActions";

const ITEMS_PER_PAGE = 5;

const Main = () :JSX.Element => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchOption, setSearchOption] = useState<string>("공연이름");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isShowOnlyLiked, setIsShowOnlyLiked] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const [sortOption, setSortOption] = useState<string>("default");

	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const { data: apiData, loading } = useSelector((state: RootState) => state.apiData);

	useEffect(() => {
		if (apiData.length === 0) {dispatch(fetchApiData());
		console.log("useEffect - Main", apiData);
		}
	}, [dispatch, apiData]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    startTransition(() => {
      setCurrentPage(1);
    });
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  }, []);

	const filteredAndSortedData = useMemo(() => {
		console.log("apiData", apiData);
    let filteredData = apiData;

    if (searchTerm) {
      filteredData = apiData.filter(item => {
        if (searchOption === "공연이름") return item.title.includes(searchTerm);
        if (searchOption === "작가") return item.author.includes(searchTerm);
        if (searchOption === "장르") return item.genre.includes(searchTerm);
        if (searchOption === "날짜") {
          const result = new Date(searchTerm);
          const [first, last] = item.period.split("~");
          return new Date(first) <= result && result <= new Date(last);
        }
        return false;
      });
    }

    if (isShowOnlyLiked) {
      filteredData = filteredData.filter(item => user.likes.includes(item.localId));
    }

  if (sortOption === "recent") {
    return [...filteredData].sort((a, b) => {
      const dateA = new Date(a.period.split('~')[0].trim());
      const dateB = new Date(b.period.split('~')[0].trim());
      return dateB.getTime() - dateA.getTime();
    });
  }

  if (sortOption === "title") {
    return [...filteredData].sort((a, b) => a.title.localeCompare(b.title));
  }

  return filteredData;
  }, [apiData, searchTerm, searchOption, isShowOnlyLiked, sortOption]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredAndSortedData]);

  const totalPages = useMemo(() => Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE), [filteredAndSortedData]);


	return (
		<Container>
			<Search handleSearch={handleSearch} setSearchOption={setSearchOption}/> {/* 검색 값 넘기기  */}
			<FilterControls 
				user={user} 
				sortOption={sortOption} 
				onSortChange={handleSortChange} 
				onClick={() => setIsShowOnlyLiked(!isShowOnlyLiked)}
			/>
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
			<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
		</Container>
	)
}

export default Main;

const Container = styled.div`
  max-width: 1280px;
	margin: 0 auto;
	padding: 20px 0;
`

const Items = styled.ul`
	max-width: 1280px;
	height: 350px;
	padding: none;
	margin: 30px auto;

	display: flex;
	flex-direction: rows;
	justify-content: space-evenly;
	list-style-type: none;
	flex-wrap: wrap;

	gap: 10px;
`