import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  fetchApiDataStart,
  fetchApiDataSuccess,
  fetchApiDataFailure,
	ApiDataProps,
} from '../redux/apiDataSlice';
import { AppDispatch } from '../redux/store';

export const fetchData = () => async (dispatch: AppDispatch) => {
  dispatch(fetchApiDataStart());

  try {
    const apiDataRef = collection(db, 'apiData');
    const apiDataSnapshot = await getDocs(apiDataRef);
    const apiData = apiDataSnapshot.docs.map((doc) => ({
			age: doc.data().age,
			call: doc.data().call,
			description: doc.data().description,
			genre: doc.data().genre,
			imageUrl: doc.data().imageUrl,
			link: doc.data().link,
			localId: doc.data().localId,
			period: doc.data().period,
			time: doc.data().time,
			title: doc.data().title,
			author: doc.data().author,
			actor: doc.data().actor,
			contact: doc.data().contact,
			charge: doc.data().charge,
			numberPages: doc.data().numberPages,
			duration: doc.data().duration,
			subDescription: doc.data().subDescription,
			spatial: doc.data().spatial,
			site: doc.data().site,
      ...doc.data(),
    })) as ApiDataProps[];
    dispatch(fetchApiDataSuccess(apiData));
  } catch (error) {
    dispatch(fetchApiDataFailure((error as Error).message));
  }
};
