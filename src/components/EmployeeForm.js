import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveEmployee } from '../services/employeeService';
import { validateEmployee } from '../utils/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    nombre: '',
    apellidos: '',
    puesto: '',
    fechaNacimiento: '',
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSkillChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput && !employee.skills.includes(skillInput)) {
      setEmployee({ ...employee, skills: [...employee.skills, skillInput] });
      setSkillInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateEmployee(employee);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    saveEmployee(employee);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Agregar Empleado</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            id="nombre"
            name="nombre"
            value={employee.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
            id="apellidos"
            name="apellidos"
            value={employee.apellidos}
            onChange={handleChange}
          />
          {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="puesto">Puesto</label>
          <input
            type="text"
            className={`form-control ${errors.puesto ? 'is-invalid' : ''}`}
            id="puesto"
            name="puesto"
            value={employee.puesto}
            onChange={handleChange}
          />
          {errors.puesto && <div className="invalid-feedback">{errors.puesto}</div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={employee.fechaNacimiento}
            onChange={handleChange}
          />
          {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento}</div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="skills">Skills</label>
          <div className="input-group">
            <input
              type="text"
              className={`form-control ${errors.skills ? 'is-invalid' : ''}`}
              id="skills"
              value={skillInput}
              onChange={handleSkillChange}
            />
            <button type="button" className="btn btn-secondary" onClick={handleAddSkill}>
              <FontAwesomeIcon icon={faPlusCircle} /> Skill
            </button>
          </div>
          {errors.skills && <div className="invalid-feedback d-block">{errors.skills}</div>}
          <ul className="list-group mt-2">
            {employee.skills.map((skill, index) => (
              <li key={index} className="list-group-item">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Guardar</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
