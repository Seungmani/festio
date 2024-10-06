import styled from "@emotion/styled";
import Color from "../../constants/Color";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchOption } from "../../redux/filterSlice";

interface SearchProps {
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchOption: string;
}

const Search = React.memo(({handleSearch, searchOption}: SearchProps):JSX.Element => {
	const [placeholder, setPlaceholder] = useState<string>(`${searchOption}를 검색하세요`);
	const dispatch = useDispatch();
	
	const handleOnChange =(e: React.ChangeEvent) => {
		dispatch(setSearchOption(e.target.value));
		if (e.target.value === "날짜") setPlaceholder(`2015-10-10 형식으로 검색해 주세요.`);
		if (e.target.value === "공연이름") setPlaceholder(`공연이름을 검색하세요.`);
		else setPlaceholder(`${e.target.value}를 검색하세요`);
	}

  return(
	<SearchDiv>
		<SearchOptionSelect onChange={handleOnChange} value={searchOption}>
			<option value="공연이름">공연이름</option>
			<option value="작가">작가</option>
			<option value="장르">장르</option>
			<option value="날짜">날짜</option>
		</SearchOptionSelect>
		<SearchInput type="text" placeholder={placeholder} onChange={handleSearch}/>
	</SearchDiv>
	)
});

export default Search;


const SearchDiv = styled.div`
	max-width: 676px;
  width: 100%;
  height: 40px;
	margin: 0 auto;

	display: flex;
	flex-direction: row;
	align-items: center;

	border: 1px solid ${Color.BLACK};
	border-radius: 20px;

	:focus {
		outline: none;
		border-color: ${Color.MAIN};
	}
`

const SearchOptionSelect = styled.select`
	width: 80px;
  height: 30px;
	margin: 0 10px;
	border: none;
`

const SearchInput = styled.input`
	box-sizing: border-box;

  width: 560px;
	height: 30px;
	padding: 0 10px;

	border: none;
	border-left: 1px solid ${Color.BLACK};

	::placeholder {
		text-align: center;
	}
`