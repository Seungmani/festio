import { Routes, Route } from "react-router-dom";
import React from 'react';
import { Suspense } from 'react';
const Error = React.lazy(() => import('../pages/Error'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Main = React.lazy(() => import('../pages/Main'));
const ConcertInfo = React.lazy(() => import('../pages/ConcertInfo'));
const Mypage = React.lazy(() => import('../pages/Mypage'));
const UserProper = React.lazy(() => import('../pages/UserProper'));

const Router = (): JSX.Element => {
	return (
		<Suspense fallback={"Loading..."}>
			<Routes>
				<Route path="*" element={<Error />} />
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/concert-info" element={<ConcertInfo />} />
				<Route path="/my-page" element={<Mypage />} />
				<Route path="/user-proper" element={<UserProper />} />
			</Routes>
		</Suspense>
	)
}

export default Router;