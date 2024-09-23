import kakao from '../../assets/SnsImages/kakao.png'
import google from '../../assets/SnsImages/google.png'
import naver from '../../assets/SnsImages/naver.png'
import styled from '@emotion/styled'
import Color from '../../constants/Color'

import SnsLink from './SnsLink'

const SnsLoginDiv = ():JSX.Element => {
	return (
		<SNS>
			<SnsLink text={"카카오"} src={kakao} color={Color.kakao}/>
			<SnsLink text={"구글"} src={google} color={Color.black}/>
			<SnsLink text={"네이버"} src={naver} color={Color.naver}/>
		</SNS>
	)
}

export default SnsLoginDiv;

const SNS = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 20px
`