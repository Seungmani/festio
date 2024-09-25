import styled from "@emotion/styled";
import { LuEye, LuEyeOff } from "react-icons/lu";
import ErrorMessage from "./ErrorMessage";
import Color from "../../constants/Color";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  isTouched: boolean;
  showToggle?: boolean;
  toggleShow?: () => void;
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
  isTouched,
  showToggle,
  toggleShow,
}: InputProps): JSX.Element => {
  
  return (
		<>
		<InputDiv>
      <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} errorMessage={errorMessage || ""} isTouched={isTouched}/>
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

export default Input;

const InputDiv = styled.div`
	position: relative;
`

const StyledInput = styled.input<{errorMessage : string, isTouched: boolean}>`
	width: 256px;
	height: 35px;
	padding-left: 10px;

	font-size: 16px;
	border: 1px solid ${( props ) => props.isTouched ? props.errorMessage ? `${Color.black}`: `${Color.Main}` : `${Color.black}`};
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