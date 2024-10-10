import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import styled from "@emotion/styled";
import ReviewAdd from "./ReviewAdd";
import ReviewItem from "./ReviewItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ReviewProps {
	type: string;
	id: string;
}

interface ReviewInfoProps {
  title: string;
	date: string;
	comment: string;
	localId: string;
}

const Review = React.memo(({ type, id }: ReviewProps):JSX.Element => {
  const [reviews, setReviews] = useState<ReviewInfoProps[]>([]);
  const user = useSelector((state: RootState) => state.user);

	const timeToString = useCallback((timestamp) => {
		const date = timestamp.toDate();
		return date.toLocaleString();
	}, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const getData:ReviewInfoProps[] = [];
      try {
        const reviewsDb = collection(db, "reviews");
        const reviewQuery = query(reviewsDb, where(type, "==", id));
        const querySnapshot = await getDocs(reviewQuery);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            getData.push({
              date: timeToString(doc.data().updatedAt),
              comment: doc.data().comment,
              title: doc.data().title,
              localId: doc.data().localId,
            });
          });
        }
      } catch (error) {
        console.log("Error getting reviews: ", error);
      }

      setReviews(getData);
    };

    fetchReviews();
  }, [type, id, timeToString]); 

	return (
		<Container>
			<RowDiv>
				<h1>리뷰</h1>
				{(type === "localId" && user.user?.uid !== undefined) ? <ReviewAdd localId={id}/> : null}
    	</RowDiv>
			<ReviewList>
        {reviews.length > 0 ? reviews.map((review, index) => (
          <ReviewItem key={index}
						title={type === "localId" ? user.user.uid : review.title}
						date={review.date}
						comment={review.comment}
					/>
        )) : <p>등록된 리뷰가 없습니다.</p>}
      </ReviewList>
		</Container>
	)
})

export default Review;

const Container = styled.div`
	width: 600px;
`

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const ReviewList = styled.ul`
`