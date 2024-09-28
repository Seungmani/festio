import React from "react";
import styled from "@emotion/styled";

interface InputProps {
  type: "text" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: string;
}

const Input = React.memo(({
  type,
  placeholder,
  value,
  onChange,
  color
}: InputProps): JSX.Element => {

  return (
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        color={color}
      />
  );
});

export default Input;


const StyledInput = styled.input<{ color: string;}>`
  width: 256px;
  height: 35px;
  padding-left: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
`;