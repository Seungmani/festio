import React, { useState } from 'react'
import Error from './Error'
import Input from './Input'
import useColor from '../../hooks/useColor'
import styled from '@emotion/styled'

interface TextInputProps {
  text: string;
  setText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errorText: string;
  placeholder: string;
}

const TextInput = React.memo(({ text, errorText, setText, name, placeholder }: TextInputProps): JSX.Element => {
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const color = useColor(isTouched, errorText)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e)
    if (!isTouched) setIsTouched(true)
  }

  return (
    <>
      <InputDiv>
        <Input 
          type="text" 
          placeholder={placeholder}
          value={text}
          name={name}
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
