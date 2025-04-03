import React, { useState, useMemo } from 'react';
import './DataTable.css';

/**
 * A reusable DataTable component with sorting and action buttons
 * 
 * @param {Object} props Component props
 * @param {Array} props.columns Array of column definitions with {id, label, sortable}
 * @param {Array} props.data Array of data objects
 * @param {Object} props.actions Object with action buttons {edit, delete, view}
 * @param {string} props.title Table title
 * @param {function} props.onRowClick Function to call when a row is clicked
 */
const DataTable = ({ 
  columns, 
  data = [], 
  actions = {}, 
  title = '', 
  onRowClick = null,
  emptyMessage = 'No data available' 
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  // Handle sorting
  const handleSort = (columnId) => {
    let direction = 'asc';
    
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key: columnId, direction });
  };

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIndicator = (columnId) => {
    if (sortConfig.key !== columnId) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  if (!data.length) {
    return (
      <div className="dashboard-item">
        <h2>{title}</h2>
        <div className="data-table-empty">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-item">
      {title && <h2>{title}</h2>}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th 
                  key={column.id}
                  onClick={column.sortable ? () => handleSort(column.id) : undefined}
                  className={column.sortable ? 'sortable' : ''}
                >
                  {column.label}
                  {column.sortable && getSortIndicator(column.id)}
                </th>
              ))}
              {(actions.edit || actions.delete || actions.view) && (
                <th className="actions-column">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr 
                key={row.id || index} 
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? 'clickable' : ''}
              >
                {columns.map(column => (
                  <td key={`${row.id || index}-${column.id}`}>
                    {row[column.id]}
                  </td>
                ))}
                {(actions.edit || actions.delete || actions.view) && (
                  <td className="actions-cell">
                    {actions.view && (
                      <button 
                        className="btn btn-secondary action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.view(row);
                        }}
                      >
                        View
                      </button>
                    )}
                    {actions.edit && (
                      <button 
                        className="btn btn-primary action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.edit(row);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    {actions.delete && (
                      <button 
                        className="btn btn-danger action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.delete(row);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable; 