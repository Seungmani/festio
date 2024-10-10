import React, { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import styled from "@emotion/styled";
import ReviewAdd from "./ReviewAdd";
import ReviewItem from "./ReviewItem";

interface ReviewProps {
	type: string;
	id: string;
}

interface ReviewInfoProps {
	date: string;
	comment: string;
	localId: string;
}

const Review = React.memo(({ type, id }: ReviewProps):JSX.Element => {
  const [reviews, setReviews] = useState<ReviewInfoProps[]>([]);

	const timeToString = (timestamp) => {
		const date = timestamp.toDate();
		return date.toLocaleString();
	}

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
              localId: doc.data().localId,
            });
          });
        } else {
          console.log("No reviews found");
        }
      } catch (error) {
        console.log("Error getting reviews: ", error);
      }

      setReviews(getData);
    };

    fetchReviews();
  }, [type, id]); 

	console.log("TTTt", reviews)

	return (
		<Container>
			<div>
				<h1>리뷰</h1>
				{type === "localId" && <ReviewAdd localId={id}/>}
    	</div>
			<ReviewList>
        {reviews.map((review, index) => (
          <ReviewItem key={index}
						title={review.localId}
						date={review.date}
						comment={review.comment}
					/>
        ))}
      </ReviewList>
		</Container>
	)
})

export default Review;

const Container = styled.div`
	width: 600px;
`

const ReviewList = styled.ul`
`