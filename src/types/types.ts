export type User = {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export type IDataGridProps = {
    data: any[],
    columnConfig: {
      columnName: string,
      attribute: string
    }[]
  }
  