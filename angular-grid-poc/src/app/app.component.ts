import { AfterViewInit, Component, ViewChild ,ElementRef} from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { EMPLOYEES } from './data/employee-data';
import { Employee, EmployeeFilterObject } from './model/employee';
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
  filterObject = new EmployeeFilterObject();  
  employeeList: Employee[] = EMPLOYEES;

  dataSource = new MatTableDataSource<Employee>(EMPLOYEES);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('selectGender') selectGender: MatSelect;
  @ViewChild('selectName') selectName: MatSelect;
  @ViewChild('empTableSort') empTableSort = new MatSort();

  constructor() {

    this.filteredFirstName$ = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.firstNameDropDownList.slice())),
    );
  }
  pageChangeEvent(event: Event) { }
  ngOnInit(): void {
    this.setGenderDropdownList();
    this.setFirstNameDropdownList();
    this.dataSource.data = EMPLOYEES;
    this.setTableProperties();
    this.dataSource.filterPredicate = this.customFilterPredicate();

  }

  ngAfterViewInit(): void {   
    this.setTableProperties();
  }

  setTableProperties() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.empTableSort;
    const sortState: Sort = { active: 'id', direction: 'asc' };
    this.empTableSort.active = sortState.active;
    this.empTableSort.direction = sortState.direction;
    this.empTableSort.sortChange.emit(sortState);
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
    MultiSelectUtil.selectAllAndDeselectAll(this.selectGender, option);
    if (this.selected.length === 0) {
      this.filterObject.columnValues.gender=[]
      this.dataSource.data = this.employeeList;      
      return;
    }
   
    this.filterObject.columnValues.gender = this.selected;
    this.dataSource.filter = JSON.stringify(this.filterObject)
   // this.dataSource.data = this.employeeList.filter(x => this.selected.map(y => y).includes(x.gender));
  }


  onNameSelect(option: MatOption<string>): void {
    MultiSelectUtil.selectAllAndDeselectAll(this.selectName, option);
    if (this.selectedName.length === 0) {      
      this.filterObject.columnValues.first_name = []
      this.dataSource.data = this.employeeList;
      return;
    }   
   
   this.filterObject.columnValues.first_name = this.selectedName;
   this.dataSource.filter = JSON.stringify(this.filterObject)
    
  }


  customGlobalFilterPredicate() {
    const globalFilterPredicate = (data: Employee, filter: string): boolean => {
      if(this.filterObject.globalSearch){
       return this.filterObject.globalSearch.indexOf(JSON.stringify(filter)) !==-1
      }
      return true;
    }

    return globalFilterPredicate;
  }
  
  customFilterPredicate() {
    const columnFilterPredicate = (data: Employee, filter: string): boolean => { 
     if( this.filterObject.columnValues.gender.length   === 0  && this.filterObject.columnValues.first_name.length ===0 ){
      return true;
     }       
     const filterObj : EmployeeFilterObject = JSON.parse(filter);     
     if(this.filterObject.columnValues.gender.includes('All') && this.filterObject.columnValues.first_name.includes('All') 
     )  
     {
      return true;
     }         
     if(this.filterObject.columnValues.gender.length > 0 && this.filterObject.columnValues.first_name.length > 0 ){
      return this.filterObject.columnValues.first_name.includes(data.first_name) &&  this.filterObject.columnValues.gender.includes(data.gender) 
     }
     if(this.filterObject.columnValues.gender.length > 0  ){
      return  this.filterObject.columnValues.gender.includes(data.gender) 
     }
     if(this.filterObject.columnValues.first_name.length > 0  ){
      return  this.filterObject.columnValues.first_name.includes(data.first_name) 
     }

     if(this.filterObject.columnValues.gender.length  === 0  ){
      return  true;;
     }
     if(this.filterObject.columnValues.first_name.length === 0  ){
      return  true;;
     }
     return true;         
    }
    return columnFilterPredicate;
  }

  onNameRemoved(name: string ) {

  }


  ///////TESTING
  separatorKeysCodes: number[] = [13 , 188];
  fruitCtrl = new FormControl('');
  filteredFirstName$: Observable<string[]>;
  fruits: string[] = ['Lemon'];

  names: string[] = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

 

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.names.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(name: string): void {
 

    const index = this.names.indexOf(name);

    if (index >= 0) {
      this.names.splice(index, 1);
    }
    this.filterNamesWhenSelectedAndDeslected();
  }

  selectedAuto(event: MatAutocompleteSelectedEvent): void {
    this.names.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.firstNameDropDownList.filter(name => name.toLowerCase().includes(filterValue));
  }

  displayFn = (): string => '';

  optionClicked = (event: Event, data: string): void => {
    event.stopPropagation();
    this.toggleSelection(data);
  };

  onChangeCheckBox(ob: MatCheckboxChange,data: string){    
    if(data === 'All' &&  ob.checked) {
      this.firstNameDropDownList.forEach(element => {
        if(!this.isNamePresent(element)){
          this.names.push(element); 
        }
      });
    }   
    else if(data === 'All' &&  !ob.checked) {
      this.firstNameDropDownList.forEach(element => {
        this.remove(element);
      });
    }  
    else if(data !== 'All' && this.isNamePresent('All')) {
      this.remove('All');      
      this.remove(data);      
    }         
    else if(!this.isNamePresent(data)){       
      this.names.push(data);
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
      
    }
    else if (this.isNamePresent(data) && !ob.checked ){
      this.remove(data);
    }  

    this.filterNamesWhenSelectedAndDeslected();
  }

  filterNamesWhenSelectedAndDeslected(){
    this.filterObject.columnValues.first_name = this.names;
    this.dataSource.filter = JSON.stringify(this.filterObject)
  }
 

  isNamePresent(selectedName : string ) : boolean {
   return this.names.filter(name => name.toLowerCase().indexOf(selectedName.toLowerCase()) !==-1).length>0;
  }

 toggleSelection = (data: string): void => {

​
};

  

  //TESTING END

  
}

//https://stackblitz.com/edit/angular-dy9j4m?file=src%2Fapp%2Ftable-pagination-example.ts
//https://github.com/AzizStark/angular-custom-material-paginator/blob/master/src/app/app.module.ts
//https://stackblitz.com/edit/angular-8holwx-6v1nmy?file=src%2Fapp%2Ftable-pagination-example.ts  