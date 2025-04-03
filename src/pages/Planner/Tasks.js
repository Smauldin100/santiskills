import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../../components/common/DataTable';

const initialTasks = [
  {
    id: 1,
    title: 'Complete Project Proposal',
    description: 'Write and submit the project proposal document',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-03-15',
    category: 'Work',
  },
  {
    id: 2,
    title: 'Review Code Changes',
    description: 'Review pull requests and provide feedback',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '2024-03-14',
    category: 'Development',
  },
  {
    id: 3,
    title: 'Team Meeting',
    description: 'Weekly team sync meeting',
    status: 'Scheduled',
    priority: 'Medium',
    dueDate: '2024-03-16',
    category: 'Meetings',
  },
];

const taskColumns = [
  { id: 'title', label: 'Task', sortable: true },
  { id: 'description', label: 'Description', sortable: true },
  { id: 'status', label: 'Status', sortable: true, type: 'status',
    getStatusColor: (status) => {
      const colors = {
        'Completed': 'success',
        'In Progress': 'info',
        'Pending': 'warning',
        'Scheduled': 'secondary'
      };
      return colors[status] || 'default';
    }
  },
  { id: 'priority', label: 'Priority', sortable: true },
  { id: 'dueDate', label: 'Due Date', sortable: true },
  { id: 'category', label: 'Category', sortable: true },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
    category: 'Work',
  });

  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData(task);
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: '',
        category: 'Work',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTask(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? { ...formData, id: task.id } : task
      ));
    } else {
      const newTask = {
        ...formData,
        id: Math.max(...tasks.map(t => t.id)) + 1,
      };
      setTasks(prev => [...prev, newTask]);
    }
    handleCloseDialog();
  };

  const handleDeleteTask = (task) => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  const tasksByStatus = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    pending: tasks.filter(t => t.status === 'Pending').length,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Tasks Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Task
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Tasks
              </Typography>
              <Typography variant="h4">
                {tasksByStatus.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4" sx={{ color: 'success.main' }}>
                {tasksByStatus.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" sx={{ color: 'info.main' }}>
                {tasksByStatus.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" sx={{ color: 'warning.main' }}>
                {tasksByStatus.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <DataTable
        title="Tasks"
        columns={taskColumns}
        data={tasks}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteTask}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Scheduled">Scheduled</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              value={formData.dueDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
              >
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
                <MenuItem value="Meetings">Meetings</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks; 