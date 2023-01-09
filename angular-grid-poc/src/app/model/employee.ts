export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string
}

export class EmployeeFilter {
  id: number[];
  first_name: string[];
  last_name: string[];
  email: String[];
  gender: string[];
  ip_address: string[]

  constructor() {
    this.id = [];
    this.first_name = [];
    this.last_name = [];
    this.email = [];
    this.gender = [];
    this.ip_address = []
  }
}
export class EmployeeFilterObject {
  globalSearch : string;
  columnValues : EmployeeFilter
  
  constructor() {
    this.globalSearch = '';
    this.columnValues = new EmployeeFilter();   
  }
}