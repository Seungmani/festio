import { Routes, Route, useLocation  } from "react-router-dom";
import React from 'react';
import { Suspense } from 'react';
import useAuthListener from "../hooks/useAuthListener";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Error = React.lazy(() => import('../pages/Error'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Main = React.lazy(() => import('../pages/Main'));
const DetailPage = React.lazy(() => import('../pages/DetailPage'));
const MyPage = React.lazy(() => import('../pages/MyPage'));
const UserProper = React.lazy(() => import('../pages/UserProper'));

const Router = (): JSX.Element => {
	useAuthListener()
	const location = useLocation();
	const user = useSelector((state: RootState) => state.user);
  // 현재 경로를 확인하여 헤더를 렌더링할지 결정
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

	return (
		<Suspense fallback={"Loading..."}>
			{!isAuthPage && <Header user={user.isAuthenticated}/>}
			<Routes>
				<Route path="*" element={<Error />} />
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/DetailPage/:localId" element={<DetailPage />} />
				<Route path="/my-page" element={<MyPage />} />
				<Route path="/user-proper" element={<UserProper />} />
			</Routes>
		</Suspense>
	)
}

export default Router;