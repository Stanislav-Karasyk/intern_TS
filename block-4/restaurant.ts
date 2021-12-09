  interface IEmployee {
    name: string;
    surname: string;
    departmentId: number;
    position: string;
    salary: number;
    isFired: boolean;
  }

  interface IDepartment {
    id: number;
    title: string;
    employees: IEmployee[];
  }

  interface IPosition {
    id: number;
    title: string;
  }

  interface IRestaurant {
    departments: IDepartment[];
    positions: IPosition[];

    addDepartment(id: number, title: string): IDepartment;
    addPosition(id: number, title: string): IPosition;
    findDepartment(id: number): IDepartment;
    findPosition(id: number): string;
    addEmployee(name: string, surname: string, departmentId: number, positionId: number, salary: number, isFired: boolean): IEmployee;
    getSumSalary(departmentId: number): number;
    getMeanSalary(departmentId: number): number;
    getExtremumSalary(departmentId: number, positionId: number, extremum: 'min' | 'max') : number;
    getFiredEmployees(): number;
    getDepartmentsWithoutPosition(positionId: number): string[];
  }

  class Restaurant implements IRestaurant {
    departments: IDepartment[];
    positions: IPosition[];

    constructor(departments: IDepartment[], positions: IPosition[]) {
      this.departments = departments || [];
      this.positions = positions || [];
    }
  
    addDepartment(id: number, title: string): IDepartment {
      const department: IDepartment = { id, title, employees: [] };
      this.departments.push(department);
  
      return department;
    }
  
    addPosition(id: number, title: string): IPosition {
      const position: IPosition = { id, title };
      this.positions.push(position);
  
      return position;
    }
  
    findDepartment(id: number): IDepartment {
      return this.departments.find((department) => department.id === id);
    }
  
    findPosition(id: number): string {
      for (let position of this.positions) {
        if (position.id === id) {
          return position.title;
        }
      }
    }
  
    addEmployee(name: string, surname: string, departmentId: number, positionId: number, salary: number, isFired: boolean): IEmployee {
      const employee: IEmployee = {
        name,
        surname,
        departmentId,
        position: this.findPosition(positionId),
        salary,
        isFired,
      };
      const selectedDepartment = this.findDepartment(departmentId);

      selectedDepartment.employees.push(employee);

      return employee;
    }
  
    getSumSalary(departmentId: number): number {
      let res: number = 0;
      for (let department of this.departments) {
        if (department.id === departmentId) {
          for (let employee of department.employees) {
            if (!employee.isFired) {
              res += employee.salary;
            }
          }
        }
      }
      return res;
    }
  
    getMeanSalary(departmentId: number): number {
      let res: number = 0;
      let counter: number = 0;
      for (let department of this.departments) {
        if (department.id === departmentId) {
          for (let employee of department.employees) {
            if (!employee.isFired) {
              res += employee.salary;
              counter++;
            }
          }
        }
      }
      return Math.round(res / counter);
    }
  
    getExtremumSalary(departmentId: number, positionId: number, extremum: 'min' | 'max'): number {
      let res: number[] = [];
  
      for (let department of this.departments) {
        if (department.id === departmentId) {
          for (let employee of department.employees) {
            if (
              !employee.isFired &&
              employee.position === this.findPosition(positionId)
            ) {
              res.push(employee.salary);
            }
          }
        }
      }
  
      if (extremum === "min") {
        return Math.min(...res);
      }
  
      if (extremum === "max") {
        return Math.max(...res);
      }
    }
  
    getFiredEmployees(): number {
      let res: number = 0;
  
      for (let department of this.departments) {
        for (let employee of department.employees) {
          if (employee.isFired) {
            res++;
          }
        }
      }
  
      return res;
    }
  
    getDepartmentsWithoutPosition(positionId: number): string[] {
      let res: string[] = [];
  
      for (let department of this.departments) {
        let counter: number = 0;
  
        for (let employee of department.employees) {
          if (
            !employee.isFired &&
            employee.position === this.findPosition(positionId)
          ) {
            counter++;
          }
        }
        if (counter === 0) {
          res.push(department.title);
        }
      }
  
      return res;
    }
  }
