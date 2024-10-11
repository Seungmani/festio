import { setDoc, serverTimestamp, getDoc, doc, updateDoc } from 'firebase/firestore'; // Firestore 모듈 가져오기
import { db } from '../../firebase';

import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Color from '../../constants/Color';
import Button from '../Common/Button';
import { PlayInfoContext } from '../../pages/DetailPage';

interface ReviewModalProps {
	localId: string;
  onClose: () => void;
}

const ReviewModal = React.memo(({ localId, 	onClose }: ReviewModalProps) => {
  const [reviewContent, setReviewContent] = useState<string>('');  // 리뷰 내용
  const [rating, setRating] = useState<number>(0);  
  const [isExist, setIsExist] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.user);
  const info = useContext(PlayInfoContext);
  const reviewId = user.user?.uid + localId;

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
          title: info.title,
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
    onClose();
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <h2>공연 후기 작성</h2>
        <CloseButton onClick={onClose}>닫기</CloseButton>

        <ReviewForm onSubmit={handleSubmit}>
          <TextArea
            value={reviewContent}
            onChange={handleReviewChange}
            maxLength={maxLength}
            placeholder="후기를 작성하세요"
          />
          <p>{reviewContent.length}/{maxLength}</p>

          <label>
            평점 (5점 만점) : 
            <input type="number" min="1" max="5" step="0.1" value={rating} onChange={handleRatingChange} />
          </label>
          <Button text="등록하기" width="180px" height='44px' disabled={false}/>
        </ReviewForm>
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
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${Color.GREY};
`;

const ModalContent = styled.div`
  position: relative;
  width: 400px;
  padding: 20px;

  background-color: ${Color.WHITE};
  border-radius: 20px;
  text-align: center;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  height: 150px;
  margin-top: 10px;
  resize: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 18px;

  width: 44px;
  height: 24px;

  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;