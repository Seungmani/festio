import { setDoc, serverTimestamp, getDoc, doc, updateDoc } from 'firebase/firestore'; // Firestore 모듈 가져오기
import { db } from '../../firebase';

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ReviewModalProps {
	localId: string;
  onClose: () => void;
}

const ReviewModal = React.memo(({ localId, 	onClose }: ReviewModalProps) => {
  const [reviewContent, setReviewContent] = useState<string>('');  // 리뷰 내용
  const [rating, setRating] = useState<number>(0);  
  const [isExist, setIsExist] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.user);
  const reviewId = user.user?.uid +"_"+ localId;

  useEffect(() => {
    const checkReviewExists = async (reviewId: string) => {
      const docRef = doc(db, "reviews", reviewId);  // 'reviews' 컬렉션에서 해당 reviewId를 찾음
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        setIsExist(true);
        setRating(docSnap.data().rating);
        setReviewContent(docSnap.data().content);
        return true;
      }
    };

    checkReviewExists(reviewId);
  })
  console.log(reviewId, isExist);
  const maxLength = 100;

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setReviewContent(e.target.value);
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
		try {
      if (isExist) {
        await updateDoc(doc(db, 'reviews', reviewId), {
          content: reviewContent,
          rating: rating,
          updatedAt: serverTimestamp(),
        });
      } else {
        await setDoc(doc(db, 'reviews', reviewId), {
          uid: user.user?.uid,
          localId: localId,
          comment: reviewContent,
          rating: rating,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      window.location.reload();
		} catch (e) {
			console.error("리뷰 추가 중 에러 발생: ", e);
		}
    onClose(); // 모달 닫기
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <h2>공연 후기 작성</h2>
        <ReviewForm onSubmit={handleSubmit}>
          <TextArea
            value={reviewContent}
            onChange={handleReviewChange}
            maxLength={maxLength}
            placeholder="후기를 작성하세요"
          />
          <p>{reviewContent.length}/{maxLength}</p>

          <label>
            평점 (5점 만점):
            <input type="number" min="1" max="5" value={rating} onChange={handleRatingChange} />
          </label>

          <SubmitButton type="submit">등록하기</SubmitButton>
        </ReviewForm>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
});

export default ReviewModal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  height: 100px;
  resize: none;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
`;
