export const validateEmployee = (employee) => {
    const errors = {};
    
    if (!employee.nombre) {
      errors.nombre = 'Nombre es obligatorio';
    } else if (!/^[a-zA-Z\s]*$/.test(employee.nombre)) {
      errors.nombre = 'Nombre solo puede contener letras y espacios';
    }
  
    if (!employee.apellidos) {
      errors.apellidos = 'Apellidos son obligatorios';
    } else if (!/^[a-zA-Z\s]*$/.test(employee.apellidos)) {
      errors.apellidos = 'Apellidos solo pueden contener letras y espacios';
    }
  
    if (!employee.puesto) {
      errors.puesto = 'Puesto es obligatorio';
    } else if (!/^[a-zA-Z\s]*$/.test(employee.puesto)) {
      errors.puesto = 'Puesto solo puede contener letras y espacios';
    }
  
    if (!employee.fechaNacimiento) {
      errors.fechaNacimiento = 'Fecha de Nacimiento es obligatorio';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(employee.fechaNacimiento)) {
      errors.fechaNacimiento = 'Fecha de Nacimiento debe estar en el formato YYYY-MM-DD';
    }
  
    if (employee.skills.length === 0) {
      errors.skills = 'Debe tener al menos una skill';
    }
  
    return errors;
  };
  