import styled from "@emotion/styled";
import { LuEye, LuEyeOff } from "react-icons/lu";
import ErrorMessage from "../ErrorMessage";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  showToggle?: boolean;
  toggleShow?: () => void;
}

const LoginInput = ({
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
		<ErrorMessage errorMessage={errorMessage}/>
		</>
  );
};

export default LoginInput;

const InputDiv = styled.div`

	position: relative;
`

const Input = styled.input`
	width: 256px;
	height: 35px;
	padding-left: 10px;

	font-size: 16px;
	border: 1px solid #000;
  border-radius: 5px;
`

const ShowBox = styled.div`
	width: 20px;
	height: 20px;

	position: absolute;
	right: 10px;
	top: 50%;

	transform: translateY(-50%);
`