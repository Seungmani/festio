import styled from "@emotion/styled";
import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface ToggleProps {
  setShowPassword: boolean;
  setShowToggle: () => void;
}

const Toggle = React.memo(({setShowPassword, setShowToggle}: ToggleProps): JSX.Element => {
	return (
		<ShowBox onClick={setShowToggle}>
			{!setShowPassword ? <LuEyeOff size="20" /> : <LuEye size="20" />}
		</ShowBox>
	)
});

export default Toggle;

const ShowBox = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`