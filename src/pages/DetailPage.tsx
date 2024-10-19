import styled from '@emotion/styled';

import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ApiDataProps } from '../redux/apiDataSlice';

import React, { useCallback, useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/Common/Loading';
import Img from '../components/DetailPage/Img';
import Info from '../components/DetailPage/Info';

export const PlayInfoContext = createContext({
  "duration": "",
  "subDescription": "",
  "site": "",
  "charge": "",
  "time": "",
  "period": "",
  "spatial": "",
  "age": "",
  "actor": "",
  "imageUrl": "",
  "genre": "전시",
  "description": "",
  "contact": "",
  "call": "",
  "localId": "",
  "title": "",
  "link": "",
  "numberPages": "",
  "author": ""
});

const DetailPage = React.memo(() :JSX.Element => {
	const { localId } = useParams();
	const [info, setInfo] = useState<ApiDataProps| null>(null)

  const fetchApiData = useCallback(async () => {
    if (!localId) return;
    const apiDataSnapshot = await getDoc(doc(db, "apiData", localId));
    setInfo(apiDataSnapshot.data() as ApiDataProps);
  }, [localId]);

  useEffect(() => {
    fetchApiData(); 
  }, [fetchApiData]);

	if (!info) {
    return <Loading/>;
  }

	return (
    <Container>
      <PlayInfoContext.Provider value={info}>
        <ContextDiv>
          <Img/>
          <Info/>
        </ContextDiv>
      </PlayInfoContext.Provider>
    </Container>
	)
});

export default DetailPage;

const Container = styled.div`
	width: 1280px;
	margin: 30px auto;
	padding: 0;
`

const ContextDiv = styled.div`
	display: flex;
`