import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import DataTable from '../components/common/DataTable';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data - replace with real data from your backend
const taskData = [
  {
    id: 1,
    title: 'Complete Project Proposal',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-03-15',
  },
  {
    id: 2,
    title: 'Review Code Changes',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '2024-03-14',
  },
  {
    id: 3,
    title: 'Update Documentation',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2024-03-13',
  },
  {
    id: 4,
    title: 'Client Meeting',
    status: 'Scheduled',
    priority: 'High',
    dueDate: '2024-03-16',
  },
  {
    id: 5,
    title: 'Bug Fixes',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2024-03-15',
  },
];

const performanceData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 78 },
  { name: 'Mar', value: 82 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 85 },
  { name: 'Jun', value: 90 },
];

const taskColumns = [
  { id: 'title', label: 'Task', sortable: true },
  {
    id: 'status',
    label: 'Status',
    sortable: true,
    type: 'status',
    getStatusColor: status => {
      const colors = {
        Completed: 'success',
        'In Progress': 'info',
        Pending: 'warning',
        Scheduled: 'secondary',
      };
      return colors[status] || 'default';
    },
  },
  { id: 'priority', label: 'Priority', sortable: true },
  { id: 'dueDate', label: 'Due Date', sortable: true },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddTask = () => {
    // Implement add task functionality
    console.log('Add task clicked');
  };

  const handleEditTask = task => {
    console.log('Edit task:', task);
  };

  const handleDeleteTask = task => {
    console.log('Delete task:', task);
  };

  const handleViewTask = task => {
    console.log('View task:', task);
  };

  const handleFetchApiData = async () => {
    setIsFetchingData(true);
    try {
      // Replace with your actual API endpoint
      const apiUrl = 'YOUR_API_ENDPOINT_HERE';

      // Access environment variables (you may need to configure your project
      // to expose these to the frontend, and consider using a backend proxy
      // for sensitive keys).
      const apiKey = process.env.REACT_APP_API_KEY; // Example: using REACT_APP prefix for Create React App
      const apiEncryptionKey = process.env.REACT_APP_API_ENCRYPTION_KEY;
      const apiRemark = process.env.REACT_APP_API_REMARK;
      const apiJurisdiction = process.env.REACT_APP_API_JURISDICTION;
      const apiBindingIp = process.env.REACT_APP_API_BINDING_IP;

      const response = await fetch(apiUrl, {
        method: 'GET', // Or the appropriate HTTP method (POST, etc.)
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers, including API keys if necessary
          // Example: 'X-API-Key': apiKey,
        },
        // Add body for POST/PUT requests
        // body: JSON.stringify({ /* data to send */ })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Data fetched successfully:', data);
      // Process the fetched data here
    } catch (error) {
      console.error('Error fetching API data:', error);
      // Handle errors (e.g., display an error message to the user)
    } finally {
      setIsFetchingData(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Box>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} disabled={isLoading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Tasks
              </Typography>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4">4</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">Performance Overview</Typography>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="value" fill="#2193b0" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddTask}
                  fullWidth
                >
                  Add New Task
                </Button>
                <Button
                  variant="contained"
                  onClick={handleFetchApiData}
                  disabled={isFetchingData}
                  fullWidth
                >
                  {isFetchingData ? 'Fetching...' : 'Fetch API Data'}
                </Button>
                <Button variant="outlined" fullWidth>
                  Generate Report
                </Button>
                <Button variant="outlined" fullWidth>
                  Schedule Meeting
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tasks Table */}
        <Grid item xs={12}>
          <DataTable
            title="Recent Tasks"
            columns={taskColumns}
            data={taskData}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onView={handleViewTask}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
