import { Routes, Route, useLocation  } from "react-router-dom";
import React from 'react';
import { Suspense } from 'react';
import Header from "../components/Header/Header";

const Error = React.lazy(() => import('../pages/Error'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Main = React.lazy(() => import('../pages/Main'));
const DetailPage = React.lazy(() => import('../pages/DetailPage'));
const MyPage = React.lazy(() => import('../pages/MyPage'));

const Router = (): JSX.Element => {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

	return (
		<Suspense fallback={<></>}>
			{!isAuthPage && <Header />}
			<Routes>
				<Route path="*" element={<Error />} />
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/DetailPage/:localId" element={<DetailPage />} />
				<Route path="/mypage" element={<MyPage />} />
			</Routes>
		</Suspense>
	)
}

export default Router;