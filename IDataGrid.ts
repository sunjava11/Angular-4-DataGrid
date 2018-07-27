export interface IDataGrid {

    IAllGridItems: any;
    ISelectedItem: any;

    GetAllItems(items: any): void;
    GetSelectedItem(selectedItem: any): void;
    EditItemClick(selectedItem: any): void;
}
