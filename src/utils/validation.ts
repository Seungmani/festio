import Validate from "../constants/Validate";

export const validateEmail = (value: string): boolean => Validate.ID.test(value);

export const validatePassword = (value: string): boolean => {
	if (!Validate.PASSWORD.test(value)) return false;
	return Validate.PASSWORD.test(value) && value.length >= 7;
}