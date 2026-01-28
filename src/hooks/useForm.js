import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // Manejador genérico: usa el 'name' del input para actualizar el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const reset = () => setValues(initialState);

  return { values, handleChange, reset };
};