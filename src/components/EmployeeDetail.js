import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateEmployee } from '../utils/validation';
import { getEmployeeById, updateEmployee } from '../services/employeeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    nombre: '',
    apellidos: '',
    puesto: '',
    fechaNacimiento: '',
    skills: []
  });
  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const employeeToEdit = getEmployeeById(parseInt(id));
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setEmployee(prevEmployee => ({
        ...prevEmployee,
        skills: [...prevEmployee.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateEmployee(employee);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    updateEmployee(employee);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1 className="my-4">Editar Empleado</h1>
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
        <div className="mb-3">
          <label className="form-label">Skills:</label>
          <div className="input-group">
            <input type="text" className="form-control" value={newSkill} onChange={e => setNewSkill(e.target.value)} />
            <button type="button" className="btn btn-secondary" onClick={handleAddSkill} disabled={!newSkill.trim()}>
            <FontAwesomeIcon icon={faPlusCircle} /> Skill
            </button>
          </div>
          <ul className="list-group mt-2">
            {employee.skills.map((skill, index) => (
              <li key={index} className="list-group-item">{skill}</li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EmployeeDetail;
