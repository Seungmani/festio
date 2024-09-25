import React from "react";
import styled from "@emotion/styled";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Color from "../../constants/Color";

interface InputProps {
  type: "text" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  showToggle?: boolean;
  toggleShow?: () => void;
  isTouched: boolean;
}

const Input = React.memo(({
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
    <InputDiv>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        errorMessage={errorMessage || ""}
        isTouched={isTouched}
      />
      {showToggle && (
        <ShowBox onClick={toggleShow}>
          {type === "password" ? <LuEyeOff size="20" /> : <LuEye size="20" />}
        </ShowBox>
      )}
    </InputDiv>
  );
});

export default Input;

// 스타일 정의
const InputDiv = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{ errorMessage: string; isTouched: boolean }>`
  width: 256px;
  height: 35px;
  padding-left: 10px;
  font-size: 16px;
  border: 1px solid
    ${(props) =>
      props.isTouched
        ? props.errorMessage
          ? `${Color.RED}`
          : `${Color.MAIN}`
        : `${Color.BLACK}`};
  border-radius: 5px;
`;

const ShowBox = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;