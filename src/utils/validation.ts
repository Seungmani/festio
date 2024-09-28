import ErrorText from "../constants/ErrorText";
import Validate from "../constants/Validate";

export const validateEmail = (value: string): [string, boolean] => {
	if (!Validate.ID.test(value)) return [ErrorText.EMAIL_FORM_ERROR, false];
	else return ["", true];
}

export const validatePassword = (value: string): [string, boolean] => {
	if (!Validate.PASSWORD.test(value)) return [ErrorText.PASSWORD_FORM_ERROR, false];
	return ["", true];
}

export const validateConfirmPassword = (password: string, confirmPassword: string | undefined): [string, boolean] => {
	if (password !== confirmPassword) return [ErrorText.CHECK_PASSWORD_ERROR, false];
  return ["", true];
}

export const validateName = (value: string): [string, boolean] => {
	if (value !== "") return ["", true];
	else return [ErrorText.NAME_NOT_INPUT, false];
};

export const validatePhoneNumber = (value: string): [string, boolean] => {
	if (value.length > 11) return [ErrorText.PHONE_LENGTH_ERROR, false];
	if (!/^01([016789]|[0-9]{3})([0-9]{4})([0-9]{4})$/.test(value)) return [ErrorText.PHONE_NOT_INPUT, false];
	return ["", true]
}