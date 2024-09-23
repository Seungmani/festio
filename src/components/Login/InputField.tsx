import styled from "@emotion/styled";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  showToggle?: boolean;
  toggleShow?: () => void;
}

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
  showToggle,
  toggleShow
}: InputProps): JSX.Element => {
  return (
		<>
		<InputDiv>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {showToggle && (
        <ShowBox onClick={toggleShow}>
          {type === "password" ? <LuEyeOff size="20" /> : <LuEye size="20" />}
        </ShowBox>
      )}
    </InputDiv>
		<ErrorDiv>
			{errorMessage && <ErrorText>{errorMessage}</ErrorText>}
		</ErrorDiv>
		</>
  );
};

export default InputField;

const InputDiv = styled.div`
	width: 256px;
	height: 30px;

	display: flex;
	flex-direction: column;
	position: relative;
`

const Input = styled.input`
	width: 256px;
	height: 30px;
	padding-left: 10px;

	font-size: 16px;
	border: none;
	border-bottom: 1px solid #000;
`
const ErrorDiv = styled.div`
	width: 256px;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	position: relative;
`

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
	white-space: pre-wrap;
	padding-left: 10px;
	margin-top: 0px;
`
const ShowBox = styled.div`
	width: 20px;
	height: 20px;

	position: absolute;
	right: 0px;
	top: 50%;

	transform: translateY(-50%);
`