import React from 'react';

type ColumnConfig = {
  columnName: string,
  attribute: string
}

type Props = {
  data: any[],
  columnConfig: ColumnConfig[]
}

// Function to access value by path (handles nested attributes)
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
}

const DataGrid: React.FC<Props> = ({ data, columnConfig }) => {
  return (
    <table>
      <thead>
        <tr>
          {columnConfig.map((config, index) => (
            <th key={index}>{config.columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columnConfig.map((config, colIndex) => (
              <td key={colIndex}>{getNestedValue(item, config.attribute)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataGrid;
