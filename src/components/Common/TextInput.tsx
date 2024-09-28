import React, { useState } from 'react'
import Error from './Error'
import Input from './Input'
import useColor from '../../hooks/useColor'
import styled from '@emotion/styled'

interface TextInputProps {
  text: string;
  setText: (text: string) => void
  validate: (value: string) => boolean;
  errorMessage: string;
  placeholder: string;
}

const TextInput = React.memo(({ text, setText, validate, errorMessage, placeholder }: TextInputProps): JSX.Element => {
  const [errorText, setErrorText] = useState<string>('')
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const color = useColor(isTouched, errorText)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setErrorText(validate(e.target.value) ? "" : errorMessage);
    if (!isTouched) setIsTouched(true)
  }

  return (
    <>
      <InputDiv>
        <Input 
          type="text" 
          placeholder={placeholder}
          value={text} 
          onChange={handleEmailChange} 
          color={color}      
        />
      </InputDiv>
      <Error errorMessage={errorText} />
    </>
  )
})

export default TextInput

const InputDiv = styled.div`
  position: relative;
`
