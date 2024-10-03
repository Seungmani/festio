import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MyPage = () :JSX.Element => {
	const user = useSelector((state: RootState) => state.user)
	console.log(user)
	return (
		<div>
		</div>
	)
}

export default MyPage;