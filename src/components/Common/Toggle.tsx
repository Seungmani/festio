import React from "react";
import { LuEye, LuEyeOff, LuSparkles } from "react-icons/lu";
import Color from "../../constants/Color";
interface ToggleProps {
  type: string;
  show?: boolean;
  like?: boolean;
}

const Toggle = React.memo(({type, show, like}: ToggleProps) => {
  if (type === "password") return (
    !show ? <LuEyeOff size="20" /> : <LuEye size="20" />
  )

  if (type === "like") return (
    !like ? <LuSparkles style={{ color: `${Color.BLACK}` }} size={20}/> : <LuSparkles style={{ color: `${Color.KAKAO}`, fill: `${Color.KAKAO}` }} size={20} />
  )
});

export default Toggle;

