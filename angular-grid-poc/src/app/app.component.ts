import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { zip } from 'rxjs';
import { EMPLOYEES } from './data/employee-data';
import { Employee } from './model/employee';
import { Project } from './project';
import { StylePaginatorDirective } from './style-paginator.directive';

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
  title = 'angular-grid-poc';
  genderDropDownList: string[];
  selected: string[] = [];
  dataSource = new MatTableDataSource<Employee>(EMPLOYEES);
  employeeList: Employee[] = EMPLOYEES;
  ALL: string = 'All'
  myFormControl = new FormControl();
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'gender', 'email'];

  @ViewChild(StylePaginatorDirective, { static: true })  paginator: StylePaginatorDirective;
  allSelected = false;
  @ViewChild('mySel') skillSel: MatSelect;
  @ViewChild('matAll') matAll: MatOption;

  pageLength = 100;
  pageSize = 10;
  projects: Project[] = [];
  form: FormGroup;

  constructor() {
    this.projects = [
      new Project("Project 1"),
      new Project("Project 2")
    ]

    // Setup form
    this.form = new FormGroup({
      project: new FormControl(this.projects)
    });
  }
  pageChangeEvent(event :Event) {}
  ngOnInit(): void {
    this.setGenderDropdownList();
    this.dataSource.data = EMPLOYEES;
   
  }

  ngAfterViewInit(): void {
    this.dataSource.data = EMPLOYEES;
    this.dataSource.paginator = this.paginator.matPag;
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
      (gender, i, arr) => arr.findIndex(x => x === gender) === i);
    this.genderDropDownList.unshift('All');
  }


  onGenderSelect(option: MatOption<string>): void {
    this.checkSelectAllCheckBox(option);
    this.selectDeselectOptionsOnSelection();
    if (this.selected.length === 0) {
      this.dataSource.data = this.employeeList;
      return;
    }
    const filteredData = this.employeeList;
    this.dataSource.data = this.employeeList.filter(x => this.selected.map(y => y).includes(x.gender));
  }

  private checkSelectAllCheckBox(option: MatOption<string>) {
    if (option.value === 'All' && option.selected) {
      this.selectAllOption(option.selected);
    }
    if (option.value === 'All' && !option.selected) {
      this.selectAllOption(option.selected);
    }
  }

  selectDeselectOptionsOnSelection(): void {
    const anyOptionDeselected = this.skillSel.options.some(x => x.selected === false);
    const allOptionSelected = this.skillSel.options.filter(x => x.selected === false && x.value !== 'All');
    if (anyOptionDeselected) {
      this.skillSel.options.forEach((item: MatOption) => {
        if (item.value === 'All') {
          item.deselect();
        }
        if (allOptionSelected.length === 0) {
          item.select();
        }
      });
    }
  }

  selectAllOption(option: boolean): void {
    if (option) {
      this.skillSel.options.forEach((item: MatOption) => item.select());
    } else {
      this.skillSel.options.forEach((item: MatOption) => { item.deselect() });
    }
  }

}

//https://stackblitz.com/edit/angular-dy9j4m?file=src%2Fapp%2Ftable-pagination-example.ts
//https://github.com/AzizStark/angular-custom-material-paginator/blob/master/src/app/app.module.ts
//https://stackblitz.com/edit/angular-8holwx-6v1nmy?file=src%2Fapp%2Ftable-pagination-example.ts  