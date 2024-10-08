import styled from "@emotion/styled";
import React, { useCallback, useContext, useState } from "react";
import { PlayInfoContext } from "../../pages/DetailPage";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLike } from "../../redux/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Toggle from "../Common/Toggle";

interface UserLikeProps {
	localId?: string;
	title?: string;
	period?: string;
}

const UserLike = React.memo(({ userData = null, text }: { userData: UserLikeProps | null, text ?:string }):JSX.Element => {
	const user = useSelector((state: RootState) => state.user);
	const contextData = useContext(PlayInfoContext);
  const info = userData || contextData;
	const [isLike, setIsLike] = useState<boolean>(
		user.likes.some((like) => like.id === info.localId)
	);
	const dispatch = useDispatch();

	const handleLikeToggle = useCallback(async () => {
    const updatedLikes = isLike
      ? user.likes.filter((like) => like.id !== info.localId)
      : [...user.likes, 
				...(info.localId && info.title && info.period 
        ? [{ id: info.localId, title: info.title, period: info.period }] 
        : [])
			];


			
			dispatch(setLike(updatedLikes));
		
    if (user.user) {
      await setDoc(doc(db, "users", user.user.uid), {
        ...user,
        likes: updatedLikes,
      });
    }

		if (isLike) alert(`${info.title}가 즐겨찾기 목록에서 제거되었습니다.`);
		else alert(`${info.title}가 즐겨찾기 목록에 추가되었습니다.`);

    setIsLike((prev) => !prev);
  }, [isLike, info.localId, user, dispatch]);

	return(
		<>
			{user.isAuthenticated ? 
			<ToggleDiv onClick={handleLikeToggle}>
				<Span>{text}</Span>
				<Toggle type="like" like={isLike} />
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
  margin-right: 5px;
	font-size: 16px;
`