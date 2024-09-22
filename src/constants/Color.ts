type ColorType = {
	Main: string;
	background: string;
	white: string;  
}

const Color: Readonly<ColorType> = Object.freeze({
	Main: "#77DD77",
	background: "#D9D9D9",
	white: "#ffffff"
});

export default Color;