import { QueryList } from "@angular/core";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatTableDataSource } from "@angular/material/table";
import { Employee } from "../model/employee";

export class MultiSelectUtil {
    static selectAllAndDeselectAll(matSelect: MatSelect,option: MatOption<string>) {
        this.checkSelectAllCheckBox(matSelect,option);
        this.selectDeselectOptionsOnSelection(matSelect);
    }

    static checkSelectAllCheckBox(matSelect: MatSelect,option: MatOption<string>) {
        if (option.value === 'All' && option.selected) {
            this.selectAllOption(matSelect,option.selected);
        }
        if (option.value === 'All' && !option.selected) {
           this.selectAllOption(matSelect,option.selected);
        }
      }

    static selectAllOption(matSelect: MatSelect,option: boolean): void {
        if (option) {
          matSelect.options.forEach((item: MatOption) => item.select());
        } else {
         matSelect.options.forEach((item: MatOption) => { item.deselect() });
        }
      }

    static checkSelectAllCheckBoxWithMatOption(option: MatOption<string>) :boolean{
        if (option.value === 'All' && option.selected) {
          return true;
        }
        if (option.value === 'All' && !option.selected) {
         return false;
        }
        return false;
      }

      
    
      static selectDeselectOptionsOnSelection( matSelect: MatSelect): void {
        const anyOptionDeselected = matSelect.options.some(x => x.selected === false);
        const allOptionSelected = matSelect.options.filter(x => x.selected === false && x.value !== 'All');
        if (anyOptionDeselected) {
            matSelect.options.forEach((item: MatOption) => {
            if (item.value === 'All') {
              item.deselect();
            }
            if (allOptionSelected.length === 0) {
              item.select();
            }
          });
        }
      }

      static checkFilterContainsValue (filter : string [], value : string ) : boolean{
        return filter.includes(value) || filter.length === 0;
      }
     
}
