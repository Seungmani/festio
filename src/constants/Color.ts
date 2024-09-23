type ColorType = {
	Main: string;
	background: string;
	white: string;
	black: string;
}

const Color: Readonly<ColorType> = Object.freeze({
	Main: "#77DD77",
	background: "#D9D9D9",
	white: "#ffffff",
	black: "#000000"
});

export default Color;