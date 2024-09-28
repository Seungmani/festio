interface ErrorTextProps {
	EMAIL_FORM_ERROR: string
	PASSWORD_FORM_ERROR: string
	CHECK_PASSWORD_ERROR: string
	NAME_NOT_INPUT: string
	PHONE_NOT_INPUT: string
}

const ErrorText: Readonly<ErrorTextProps> =  Object.freeze({
	EMAIL_FORM_ERROR: '아이디는 이메일 형식입니다.',
	PASSWORD_FORM_ERROR: '숫자, 영어, 특수 문자를 포함한 8글자 이상으로 적어주세요.',
	CHECK_PASSWORD_ERROR: '비밀 번호가 다릅니다.',
	NAME_NOT_INPUT: '이름을 입력해 주세요',
	PHONE_NOT_INPUT: '번호를 입력해 주세요'
});

export default ErrorText;