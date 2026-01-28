import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // Manejador genérico: usa el 'name' del input para actualizar el estado
  const handleChange = (e) => {
    // Desestructuramos el evento para obtener name y value
    const { name, value } = e.target;
    // Actualizamos el estado manteniendo los demás valores intactos
    setValues({
      ...values,
      [name]: value
    });
  };
  // Función para resetear el formulario a su estado inicial
  const reset = () => setValues(initialState);

  return { values, handleChange, reset };
};