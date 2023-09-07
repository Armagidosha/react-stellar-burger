import { useState } from 'react';

export const useInput = (event) => {

  const [inputs, setValues] = useState(event);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...inputs, [name]: value});
  };
  return {inputs, handleChange};
}