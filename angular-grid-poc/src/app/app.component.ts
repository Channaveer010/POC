import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { zip } from 'rxjs';
import { EMPLOYEES } from './data/employee-data';
import { Employee } from './model/employee';
import { MultiSelectUtil } from './utils/multi-select-util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  cols = [
    { field: 'id', header: 'ID' },
    { field: 'first_name', header: 'FIRST NAME' },
    { field: 'last_name', header: 'LAST NAME' },
    { field: 'gender', header: 'GENDER' },
    { field: 'email', header: 'EMAIL' }
  ];
  //Start
  ALL: string = 'All';
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'gender', 'email'];

  genderDropDownList: string[];
  selected: string[] = [];     
  firstNameDropDownList: string[];
  selectedName: string[] = [];

  employeeList: Employee[] = EMPLOYEES;
  dataSource = new MatTableDataSource<Employee>(EMPLOYEES);
  @ViewChild(MatPaginator, { static: true })  paginator: MatPaginator;
  @ViewChild('selectGender') selectGender: MatSelect;
  @ViewChild('selectName') selectName: MatSelect;
  @ViewChild('empTableSort') empTableSort = new MatSort();

  constructor() {
 
  }
  pageChangeEvent(event :Event) {}
  ngOnInit(): void {
    this.setGenderDropdownList();
    this.setFirstNameDropdownList();
    this.dataSource.data = EMPLOYEES;
   
  }

  ngAfterViewInit(): void {
    this.dataSource.data = EMPLOYEES;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.empTableSort;
  }

  getDisplayColumns(): string[] {
    const cols = this.cols.map(col => col.field);
    return cols;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setGenderDropdownList(): void {
    this.genderDropDownList = this.employeeList.map(emp => emp.gender).filter(
      (gender, i, arr) => arr.findIndex(x => x === gender) === i).sort();
    this.genderDropDownList.unshift('All');
  }

  setFirstNameDropdownList(): void {
    this.firstNameDropDownList = this.employeeList.map(emp => emp.first_name).filter(
      (name, i, arr) => arr.findIndex(x => x === name) === i).sort();
    this.firstNameDropDownList.unshift('All');
  }


  onGenderSelect(option: MatOption<string>): void {
   MultiSelectUtil.selectAllAndDeselectAll(this.selectGender,option);
    if (this.selected.length === 0) {
      this.dataSource.data = this.employeeList;
      return;
    }  
   
    this.dataSource.data = this.employeeList.filter(x => this.selected.map(y => y).includes(x.gender));
  }  


  onNameSelect(option: MatOption<string>): void {
    
    MultiSelectUtil.selectAllAndDeselectAll(this.selectName,option);
    if (this.selectedName.length === 0) {
      this.dataSource.data = this.employeeList;
      return;
    }
    console.log(this.selectedName)
    console.log(this.firstNameDropDownList.length)
    console.log(this.employeeList.filter(x => this.selectedName.indexOf(x.first_name) > 0 ))
    this.dataSource.data = this.employeeList.filter(x => this.selectedName.indexOf(x.first_name) > 0 );
  }
}

//https://stackblitz.com/edit/angular-dy9j4m?file=src%2Fapp%2Ftable-pagination-example.ts
//https://github.com/AzizStark/angular-custom-material-paginator/blob/master/src/app/app.module.ts
//https://stackblitz.com/edit/angular-8holwx-6v1nmy?file=src%2Fapp%2Ftable-pagination-example.ts  