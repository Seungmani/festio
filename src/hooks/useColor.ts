import { useState, useEffect } from "react";
import Color from "../constants/Color";

const useColor = (isTouched: boolean, text: string) => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
		if (isTouched) {
			if (text) setColor(Color.RED)
			else setColor(Color.MAIN)
		} else setColor(Color.BLACK)
  }, [isTouched, text]);

  return color;
};

export default useColor;