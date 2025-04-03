import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const DataTable = ({
  columns,
  data,
  title,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  showFilters = true,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filters, setFilters] = useState({});
  const [showFilterRow, setShowFilterRow] = useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setPage(0);
  };

  const filteredData = data.filter(row => {
    return Object.entries(filters).every(([column, value]) => {
      if (!value) return true;
      const cellValue = row[column]?.toString().toLowerCase() || '';
      return cellValue.includes(value.toLowerCase());
    });
  });

  const sortedData = orderBy
    ? filteredData.sort((a, b) => {
        const aValue = a[orderBy] || '';
        const bValue = b[orderBy] || '';
        if (order === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return bValue < aValue ? -1 : 1;
        }
      })
    : filteredData;

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mb: 2 }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        {showFilters && (
          <Tooltip title="Toggle Filters">
            <IconButton onClick={() => setShowFilterRow(!showFilterRow)}>
              <FilterIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              {showActions && <TableCell align="right">Actions</TableCell>}
            </TableRow>
            {showFilterRow && (
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={`filter-${column.id}`}>
                    <TextField
                      size="small"
                      placeholder={`Filter ${column.label}`}
                      value={filters[column.id] || ''}
                      onChange={(e) => handleFilterChange(column.id, e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                ))}
                {showActions && <TableCell />}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow hover key={row.id || index}>
                {columns.map((column) => (
                  <TableCell 
                    key={`${row.id}-${column.id}`}
                    align={column.numeric ? 'right' : 'left'}
                  >
                    {column.render ? column.render(row[column.id], row) : (
                      column.type === 'status' ? (
                        <Chip 
                          label={row[column.id]} 
                          color={column.getStatusColor?.(row[column.id]) || 'default'}
                          size="small"
                        />
                      ) : row[column.id]
                    )}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      {onView && (
                        <Tooltip title="View">
                          <IconButton size="small" onClick={() => onView(row)}>
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onEdit && (
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => onEdit(row)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => onDelete(row)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  align="center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable; 