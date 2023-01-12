export interface iEmployee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string
}

export class Employee implements iEmployee {
  private _id: number;
  private _first_name: string;
  private _last_name: string;
  private _email: string;
  private _gender: string;
  private _ip_address: string;

  constructor(employee : iEmployee){
    this._id = employee.id;
    this._first_name = employee.first_name;
    this._last_name = employee.last_name;
    this._email= employee.email;
    this._gender = employee.gender;
    this._ip_address = employee.ip_address;   
  }
  get id() :number {return this._id}
  set id(id:number) { this._id = id}
  
  get first_name() :string {return this._first_name}
  set first_name(first_name:string) { this._first_name = first_name}

  get last_name() :string {return this._last_name}
  set last_name(last_name:string) { this._last_name = last_name}

  get email() :string {return this._email}
  set email(email:string) { this._email = email}

  get gender() :string {return this._gender}
  set gender(gender:string) { this._gender = gender}

  get ip_address() :string {return this._ip_address}
  set ip_address(ip_address:string) { this._ip_address = ip_address}

  public toString() : string {
    return `${this.id.toString()} ${this.first_name} ${this.last_name} ${this.gender} ${this.email}`.toLowerCase();
  }
  
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