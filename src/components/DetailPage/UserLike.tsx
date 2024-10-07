import styled from "@emotion/styled";
import React, { useCallback, useContext, useState } from "react";
import { PlayInfoContext } from "../../pages/DetailPage";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLike } from "../../redux/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Toggle from "../Common/Toggle";

const UserLike = React.memo(():JSX.Element => {
	const user = useSelector((state: RootState) => state.user);
	const info = useContext(PlayInfoContext);
	const [isLike, setIsLike] = useState<boolean>(
		!!user.likes.filter((like) => like.id === info.localId).length
	);
	const dispatch = useDispatch();

	const handleLikeToggle = useCallback(async () => {
    const updatedLikes = isLike
      ? user.likes.filter((like) => like.id !== info.localId)
      : [...user.likes, {id: info.localId, title: info.title}];

			dispatch(setLike(updatedLikes));
		
    if (user.user) {
      await setDoc(doc(db, "users", user.user.uid), {
        ...user,
        likes: updatedLikes,
      });
    }

    setIsLike((prev) => !prev);
  }, [isLike, info.localId, user, dispatch]);

	return(
		<>
			{user.isAuthenticated ? 
			<ToggleDiv onClick={handleLikeToggle}>
				<Toggle type="like" like={isLike} />
				<Span>즐겨찾기</Span>
			</ToggleDiv>
			: null}
		</>
	)
})

export default UserLike;

const ToggleDiv = styled.div`
  display: flex;
	flex-direction: row;
  align-items: center;
`

const Span = styled.span`
  margin-left: 5px;
	font-size: 16px;
`