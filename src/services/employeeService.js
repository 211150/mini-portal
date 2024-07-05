export const getEmployees = () => {
    return JSON.parse(localStorage.getItem('employees')) || [];
  };
  
  export const saveEmployee = (employee) => {
    const employees = getEmployees();
    employee.id = employees.length + 1;
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
  };
  
  export const updateEmployee = (updatedEmployee) => {
    const employees = getEmployees();
    const updatedEmployees = employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp));
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };
  
  export const getEmployeeById = (id) => {
    const employees = getEmployees();
    return employees.find(emp => emp.id === id);
  };
  