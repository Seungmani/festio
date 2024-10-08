interface ColorType {
	MAIN: string;
	GREY: string;
	WHITE: string;
	BLACK: string;
	NAVER: string;
	KAKAO: string;
	RED: string;
	BLUE: string;
}

const Color: Readonly<ColorType> = Object.freeze({
	MAIN: "#B1B1FF",
	GREY: "#D9D9D9",
	WHITE: "#ffffff",
	BLACK: "#000000",
	NAVER: "#03C75B",
	KAKAO:  "#FFE90A",
	RED: "red",
	BLUE: "#007bff",
});

export default Color;