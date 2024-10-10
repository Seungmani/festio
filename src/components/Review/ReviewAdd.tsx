import React, { useState } from "react";
import ReviewModal from "./ReviewModal";


const ReviewAdd = React.memo(({localId}: {localId: string}):JSX.Element => {
	const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

	return (
		<div>
			<button onClick={handleOpenModal}>후기 작성하기</button>
			{isModalOpen && <ReviewModal localId={localId} onClose={handleCloseModal} />}
		</div>
	)
});

export default ReviewAdd;