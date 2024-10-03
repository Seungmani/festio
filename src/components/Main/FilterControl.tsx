import styled from "@emotion/styled";
import React from "react";

interface FilterControlsProps {
	user: {
		isAuthenticated: boolean;
	};
	sortOption: string;
	onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onClick: () => void;
}

const FilterControls = React.memo(({ user, sortOption, onSortChange, onClick }: FilterControlsProps) => (
	<BtnDiv>
		<div>
		{ user.isAuthenticated ? 
			<>
				<input type="checkbox" name="likes" onClick={onClick}/>
				<label htmlFor="likes">즐겨찾기만 보기</label>
			</>	: null
		}
		</div>
		<div>
			<label htmlFor="sort">정렬 기준: </label>
			<select name="sort" onChange={onSortChange} value={sortOption}>
				<option value="default">기본</option>
				<option value="recent">최신순</option>
				<option value="title">제목순</option>
			</select>
		</div>
	</BtnDiv>
));

export default FilterControls;


const BtnDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
