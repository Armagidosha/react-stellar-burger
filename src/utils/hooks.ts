import { useState, useCallback } from 'react';
import type { AppDispatch, RootState } from "..";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { UserData } from '../types/types';

export const useInput = (event: UserData) => {
  const [inputs, setValues] = useState(event);

  const handleChange = useCallback((event) => {
    const {value, name} = event.target;
    setValues({...inputs, [name]: value});
  }, [inputs]);
  return {inputs, handleChange};
}

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { useAppDispatch as useDispatch, useAppSelector as useSelector }