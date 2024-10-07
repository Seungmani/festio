import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { setSearchTerm, setSortOption } from "../redux/filterSlice";

import FilterControls from "../components/Main/FilterControl";
import Pagination from "../components/Main/Pagination";
import Search from "../components/Main/Search";
import Poster from "../components/Main/Poster";
import Loading from "../components/Common/Loading";
import { fetchData } from "../utils/fetchData";

const ITEMS_PER_PAGE = 5;

const Main = () :JSX.Element => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { search, searchOption, sortOption, isShowLike } = useSelector((state: RootState) => state.filter); 
	const [isPending, startTransition] = useTransition();

	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.user);
	const { data: apiData, loading } = useSelector((state: RootState) => state.apiData);

	// useEffect(() => {
	// 	if (apiData.length === 0) dispatch(fetchData());
	// }, [dispatch, apiData]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
		dispatch(setSearchTerm(searchValue));
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [dispatch]);

	const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSortOption(e.target.value));
  }, [dispatch]);


	const filteredAndSortedData = useMemo(() => {
    let filteredData = apiData;

    if (search) {
      filteredData = apiData.filter(item => {
        if (searchOption === "공연이름") return item.title.includes(search);
        if (searchOption === "작가") return item.author.includes(search);
        if (searchOption === "장르") return item.genre.includes(search);
        if (searchOption === "날짜") {
          const result = new Date(search);
          const [first, last] = item.period.split("~");
          return new Date(first) <= result && result <= new Date(last);
        }
        return false;
      });
    }

    if (isShowLike) {
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
  }, [apiData, search, searchOption, isShowLike, sortOption]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredAndSortedData]);

  const totalPages = useMemo(() => Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE), [filteredAndSortedData]);


	return (
		<Container>
			<Search handleSearch={handleSearch} searchOption={searchOption}/>
			<FilterControls 
				user={user} 
				onSortChange={handleSortChange} 
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
	height: 370px;
	padding: none;
	margin: 30px auto;

	display: flex;
	flex-direction: rows;
	justify-content: space-evenly;
	align-items: center;
	list-style-type: none;

	gap: 10px;
	overflow-x: scroll;
`