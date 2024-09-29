import { useState, useCallback } from 'react';
import { 
  validateEmail,
  validatePassword, 
	validatePasswordCheck, 
	validateName,
	validatePhoneNumber
} from '../utils/validation';

interface FormField {
  value: string;
  errorText: string;
  isValid: boolean;
}

interface FormState {
  [key: string]: FormField;
}

const useFormState = (initialState: FormState) => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    let [errorText, isValid]: [string, boolean] = ["", false];

    switch (name) {
      case "email":
        [errorText, isValid] = validateEmail(value);
        break;
      case "password":
        [errorText, isValid] = validatePassword(value);
        break;
      case "passwordCheck":
        [errorText, isValid] = validatePasswordCheck(formState.password.value, value);
        break;
      case "name":
        [errorText, isValid] = validateName(value);
        break;
      case "phone":
        [errorText, isValid] = validatePhoneNumber(value);
        break;
      default:
        break;
    }

    setFormState((prev) => ({
      ...prev,
      [name]: {
        value,
        errorText,
        isValid,
      },
    }));
  }, [formState]);

  return { formState, handleInputChange };
};

export default useFormState;