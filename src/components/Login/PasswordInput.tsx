import React, { useCallback, useState } from "react";
import InputField from "./InputField";

interface PasswordInputProps {
	password: string;
	setPassword: (password: string) => void;
}

const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const PasswordInput = React.memo(({ password, setPassword }: PasswordInputProps): JSX.Element => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	
	const validatePassword = useCallback((value: string): boolean => {
		console.log("validatePassword")
		if (value === "") return false;
		return !passwordReg.test(value);
	}, []);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  return (
    <InputField
      type={showPassword ? "text" : "password"}
      placeholder="비밀번호"
      value={password}
      onChange={handlePasswordChange}
      errorMessage={passwordError ? "영어, 숫자, 특수 문자를 포함한 8글자 이상을 입력하세요." : undefined}
      showToggle={true}
      toggleShow={() => setShowPassword(!showPassword)}
    />
  );
})

export default PasswordInput;