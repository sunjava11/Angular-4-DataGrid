import { IDataGrid } from "../IDataGrid";
import { VoucherModel } from "../Model/voucher.model";
import { DataGridColumn } from "../DataGrid";
import { Component } from "@angular/core";

@Component({
    templateUrl: './DataGridSample.html'
})


export class DataGridSampleComponent implements IDataGrid {
    private ColumnNames: DataGridColumn[] = [];
    private VouchersList: VoucherModel[] = [];
    IAllGridItems: any;
    ISelectedItem: any;


    constructor() {
        this.ColumnNames.push(new DataGridColumn("VoucherId", "Voucher Id"));
        this.ColumnNames.push(new DataGridColumn("AccountCode", "Account Code"));


        for (var i = 1; i <= 25; i++) {
            let vModel2: VoucherModel = new VoucherModel();
            vModel2.VoucherId = "ID" + i;
            vModel2.AccountCode = "000" + i;
            this.VouchersList.push(vModel2);
        }
    }


    GetAllItems(items: any): void {
        this.IAllGridItems = items;
    }

    GetSelectedItem(selectedItem: any): void {
        this.ISelectedItem = selectedItem;
        console.log(selectedItem);
    }

    EditItemClick(selectedItem: any): void {
        (<VoucherModel>selectedItem).AccountCode = "111000";
        console.log((<VoucherModel>selectedItem).AccountCode);
    }
}
