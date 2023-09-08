import { useState, useCallback } from 'react';

export const useInput = (event) => {

  const [inputs, setValues] = useState(event);

  const handleChange = useCallback((event) => {
    const {value, name} = event.target;
    setValues({...inputs, [name]: value});
  }, [inputs]);
  return {inputs, handleChange};
}