import kakao from '../../assets/SnsImages/kakao.png'
import google from '../../assets/SnsImages/google.png'
import naver from '../../assets/SnsImages/naver.png'
import styled from '@emotion/styled'
import Color from '../../constants/Color'

import SnsLink from './SnsLink'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'

const SnsLoginDiv = ():JSX.Element => {
	
	const handleGoogleSign = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((data) => {
      console.log(data);
    }).catch((err) => console.log(err));
  }

	return (
		<SNS>
			<SnsLink text={"카카오"} src={kakao} color={Color.KAKAO} onClick={handleGoogleSign}/>
			<SnsLink text={"구글"} src={google} color={Color.BLACK} onClick={handleGoogleSign}/>
			<SnsLink text={"네이버"} src={naver} color={Color.NAVER} onClick={handleGoogleSign}/>
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