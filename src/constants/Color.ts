interface ColorType {
	MAIN: string;
	GREY: string;
	WHITE: string;
	BLACK: string;
	NAVER: string;
	KAKAO: string;
	RED: string
}

const Color: Readonly<ColorType> = Object.freeze({
	MAIN: "#77DD77",
	GREY: "#D9D9D9",
	WHITE: "#ffffff",
	BLACK: "#000000",
	NAVER: "#03C75B",
	KAKAO:  "#FFE90A",
	RED: "red",
});

export default Color;