import { Input, Component, OnInit, EventEmitter, Output } from "@angular/core";


@Component({
    selector: 'DataGrid',
    templateUrl:'./DataGrid.html'
})

export class DataGrid implements OnInit {
    
    private totalPages: number = 0;
    private currentPage: number = 1;
    private allrecords: any[] = [];
    private searchedRecordsCount: number = 0;
    private search: string="";

    @Input()
    columnNames: DataGridColumn[];

    @Input()
    itemsSource: any[];

    @Input()
    DisplaySelectColumn: boolean;

    @Input()
    DisplayEditColumn: boolean;

    @Input()
    DisplayDeleteColumn: boolean;

    @Output()
    AllItems: EventEmitter<any> = new EventEmitter();

    @Output()
    SelectedItem: EventEmitter<any> = new EventEmitter();

    @Output()
    SelectedEditItem: EventEmitter<any> = new EventEmitter();


    pageSize: number=5;

    ngOnInit(): void {
        this.allrecords = this.itemsSource;
        this.UpdateTotalPages();        
        this.setCurrentPage();
    }

    private SelectRow(row: any) {
        console.log("selected row:");
        console.log(row);
        this.SelectedItem.emit(row);
    }


    private SelectRow_Edit(row: any) {        
        this.SelectedEditItem.emit(row);
    }

    private DeleteRow(rowIndex: number) {
        if (confirm("Do you really want to Delete this?")) {
            this.allrecords.splice(rowIndex, 1);
            this.setCurrentPage();
        }
    }

    private setCurrentPage(): void {
        

        let startIndex = (this.pageSize) * (this.currentPage - 1);
        let endIndex = startIndex + this.pageSize;


        let stripedResult = this.allrecords.slice(startIndex, endIndex);
        this.itemsSource = stripedResult;


        this.AllItems.emit(this.allrecords);
    }

    private pageSize_Change(val: number): void {
        this.currentPage = 1;
        this.pageSize = val;
        this.UpdateTotalPages();
        this.setCurrentPage();        
    }

    private txtSearchDataGrid_Change(): void {

        if (this.search.length>0) {
            this.currentPage = 1;            
            this.itemsSource = this.allrecords.filter(item =>
                Object.keys(item).some(k => item[k].includes(this.search.toLowerCase())));            
            this.searchedRecordsCount = this.itemsSource.length;
        }
        else {
            this.currentPage = 1;
            this.searchedRecordsCount = 0;
            this.setCurrentPage();
        }
        
    }

    private Previous_Click(): void {
        if (this.currentPage != 0) {
            this.currentPage--;
            this.setCurrentPage();
        }

    }

    private Next_Click(): void {
        if (this.currentPage != this.totalPages) {
            this.currentPage++;
            this.setCurrentPage();
        }
    }

    private UpdateTotalPages() {
        let totalRecords: number = this.allrecords.length;
        console.log("total rcrd: " + totalRecords);

        console.log("page size: " + this.pageSize);

        this.totalPages = Math.ceil(totalRecords / this.pageSize);
    }
}


export class DataGridColumn {
    
    constructor(private ColumnName: string, private Header: string) {

    }
}
