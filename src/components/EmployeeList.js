import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { getEmployees } from '../services/employeeService';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';



function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); 

  useEffect(() => {
    const storedEmployees = getEmployees();
    setEmployees(storedEmployees);
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Empleados</h2>
      <Link to="/add" className="btn btn-success mb-3"> <FontAwesomeIcon icon={faPlusCircle} /> Empleado</Link>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Puesto</th>
              <th>Fecha de Nacimiento</th>
              <th>Skills</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.nombre}</td>
                <td>{employee.apellidos}</td>
                <td>{employee.puesto}</td>
                <td>{employee.fechaNacimiento}</td>
                <td>{employee.skills.join(', ')}</td>
                <td>
                  <Link to={`/edit/${employee.id}`} className="btn btn-warning btn-sm me-2">
                    <FontAwesomeIcon icon={faEdit} /> 
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)} />
      </Pagination>
    </div>
  );
}

export default EmployeeList;
