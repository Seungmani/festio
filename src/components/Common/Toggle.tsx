import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface ToggleProps {
  type: string;
  show: boolean;
}

const Toggle = React.memo(({type, show}: ToggleProps): JSX.Element => {

  return (
    <>
      {type === "password" && !show ? <LuEyeOff size="20" /> : <LuEye size="20" />}
    </>
  )

});

export default Toggle;

