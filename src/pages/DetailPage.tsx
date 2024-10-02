import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router';

const DetailPage = React.memo(() :JSX.Element => {
	const { localId } = useParams();

	const fetchUserData = useCallback(async (localId: string) => {
		const apiDataRef = collection(db, 'apiData');
		const apiDataSnapshot = await getDocs(apiDataRef);
		console.log("user", apiDataSnapshot)
	}, [localId]);

	fetchUserData(localId)

	return (
		<div>
			ConcertInfo
		</div>
	)
});

export default DetailPage;