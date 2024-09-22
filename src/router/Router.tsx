import { Routes, Route } from "react-router-dom";
// import React from 'react';
// import { Suspense } from 'react';
// const Error = React.lazy(() => import('../pages/Error'));
import Login from "../pages/Login";
import Register from "../pages/Register";
import Main from "../pages/Main";
import ConcertInfo from "../pages/ConcertInfo";
import Mypage from "../pages/Mypage";
import UserProper from "../pages/UserProper";
import Error from "../pages/Error";

const Router = (): JSX.Element => {
	return (
		<Routes>
			<Route path="*" element={<Error />} />
			<Route path="/" element={<Main />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/concert-info" element={<ConcertInfo />} />
			<Route path="/my-page" element={<Mypage />} />
			<Route path="/user-proper" element={<UserProper />} />
		</Routes>
	)
}

export default Router;