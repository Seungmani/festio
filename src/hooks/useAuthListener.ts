import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setUser, clearUser, setLike } from '../redux/userSlice';
import { auth, db } from '../firebase';

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          phone: userDoc.data().phone,
        }));

        dispatch(setLike(userDoc.data().likes));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;
