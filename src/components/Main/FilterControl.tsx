import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setIsShowLike } from "../../redux/filterSlice";

interface FilterControlsProps {
	user: {
		isAuthenticated: boolean;
	};
	onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterControls = React.memo(({ user, onSortChange }: FilterControlsProps): JSX.Element => {
	const dispatch = useDispatch();
	const { sortOption, isShowLike } = useSelector((state: RootState) => state.filter); 

	const handleIsLikeToggle = useCallback(() => {
    dispatch(setIsShowLike(!isShowLike)); 
  }, [dispatch, isShowLike]);

	return (
		<BtnDiv>
			<div>
			{ user.isAuthenticated ? 
				<>
					<input type="checkbox" name="likes" onChange={handleIsLikeToggle} checked={isShowLike}/>
					<label htmlFor="likes">즐겨찾기만 보기</label>
				</>	: null
			}
			</div>
			<div>
				<label htmlFor="sort">정렬 : </label>
				<select name="sort" onChange={onSortChange} value={sortOption}>
					<option value="recent">최신순</option>
					<option value="old">오래된순</option>
					<option value="title">제목순</option>
				</select>
			</div>
		</BtnDiv>
	)
});

export default FilterControls;


const BtnDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
