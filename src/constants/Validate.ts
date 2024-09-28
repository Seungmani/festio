interface ValidateType {
	ID: RegExp;
	PASSWORD: RegExp;
}

const Validate: Readonly<ValidateType> = Object.freeze({
	ID: /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-za-z0-9-]+/,
	PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
});

export default Validate;