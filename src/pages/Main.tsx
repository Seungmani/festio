import { useEffect, useState, useTransition } from "react";
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../redux/store";

import { ApiDataProps, fetchApiDataSuccess } from "../redux/apiDataSlice";
import { useGetEventDataQuery } from "../redux/api";
import FilterControls from "../components/Main/FilterControl";

import Pagination from "../components/Main/Pagination";
import Search from "../components/Main/Search";
import Poster from "../components/Main/Poster";
import Loading from "../components/Common/Loading";

const ITEMS_PER_PAGE = 5;

const Main = () :JSX.Element => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchOption, setSearchOption] = useState<string>("공연이름");
	const [isShowOnlyLiked, setIsShowOnlyLiked] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const [sortOption, setSortOption] = useState<string>("default");
	const [data, setData] = useState<ApiDataProps[]>([]);

	const user = useSelector((state: RootState) => state.user);
	const { data: apiData, isLoading} = useGetEventDataQuery({
		apiKey: import.meta.env.VITE_DATA_API,
	});
	
	const dispatch = useDispatch();

	/** db에서 뽑기 -> firebase db 용량 초과....
	 * import { useEffect, useState } from "react";
	* const { data: apiData, loading} = useSelector((state: RootState) => state.apiData);

		useEffect(() => {
			if (apiData.length === 0) dispatch(fetchApiData()); // 컴포넌트 마운트 시 데이터 가져오기
			else setData(apiData)
		}, [dispatch]);
	*/

  useEffect(() => {
    setData(apiData || []);
		dispatch(fetchApiDataSuccess(apiData));
  }, [apiData]);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOption(e.target.value);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;
		startTransition(() => {
			const filteredData = apiData?.filter(item => {
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

	const getSortedItems = (data: ApiDataProps[], sortOption: string, isLiked: boolean) => {
		if (isLiked) data = data.filter((item) => user.likes.includes(item.localId));
	
		return [...data].sort((a, b) => {
			if (sortOption === "recent") {
				const dateA = new Date(a.period.split('~')[0].trim());
				const dateB = new Date(b.period.split('~')[0].trim());
				return dateB.getTime() - dateA.getTime();
			}
			if (sortOption === "title") {
				return a.title.localeCompare(b.title);
			}
			return 0;
		});
	}

	const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
	const currentItems = getSortedItems(data, sortOption, isShowOnlyLiked).slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

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
				{isLoading ? <Loading/> : 
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
