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
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';

const initialGoals = [
  {
    id: 1,
    title: 'Complete Project Milestone',
    description: 'Deliver the first phase of the project',
    category: 'Work',
    priority: 'High',
    deadline: '2024-03-31',
    progress: 75,
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Learn New Framework',
    description: 'Master React and its ecosystem',
    category: 'Development',
    priority: 'Medium',
    deadline: '2024-06-30',
    progress: 40,
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Team Skill Development',
    description: 'Conduct weekly training sessions',
    category: 'Team',
    priority: 'Medium',
    deadline: '2024-12-31',
    progress: 25,
    status: 'In Progress',
  },
];

const Goals = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    deadline: '',
    progress: 0,
    status: 'Not Started',
  });

  const handleOpenDialog = (goal = null) => {
    if (goal) {
      setSelectedGoal(goal);
      setFormData(goal);
    } else {
      setSelectedGoal(null);
      setFormData({
        title: '',
        description: '',
        category: 'Work',
        priority: 'Medium',
        deadline: '',
        progress: 0,
        status: 'Not Started',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGoal(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedGoal) {
      setGoals(prev => prev.map(goal =>
        goal.id === selectedGoal.id
          ? { ...formData, id: goal.id }
          : goal
      ));
    } else {
      const newGoal = {
        ...formData,
        id: Math.max(...goals.map(g => g.id)) + 1,
      };
      setGoals(prev => [...prev, newGoal]);
    }
    handleCloseDialog();
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const handleProgressUpdate = (goalId, newProgress) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedProgress = Math.min(100, Math.max(0, newProgress));
        const status = updatedProgress === 100 ? 'Completed' : 'In Progress';
        return { ...goal, progress: updatedProgress, status };
      }
      return goal;
    }));
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return 'error';
    if (progress < 70) return 'warning';
    return 'success';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: '#f44336',
      Medium: '#ff9800',
      Low: '#4caf50',
    };
    return colors[priority] || '#757575';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Goals
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Goal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} md={6} lg={4} key={goal.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
                    {goal.title}
                  </Typography>
                  <Box>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleOpenDialog(goal)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => handleDeleteGoal(goal.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Typography color="textSecondary" sx={{ mb: 2 }}>
                  {goal.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Tooltip title="Priority">
                    <FlagIcon sx={{ color: getPriorityColor(goal.priority) }} />
                  </Tooltip>
                  <Typography variant="body2">
                    {goal.category} • Due: {goal.deadline}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2">
                    Progress: {goal.progress}%
                  </Typography>
                  {goal.progress === 100 && (
                    <Tooltip title="Completed">
                      <CheckCircleIcon color="success" />
                    </Tooltip>
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
                      color={getProgressColor(goal.progress)}
                    />
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleProgressUpdate(goal.id, goal.progress - 10)}
                      disabled={goal.progress <= 0}
                    >
                      -
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleProgressUpdate(goal.id, goal.progress + 10)}
                      disabled={goal.progress >= 100}
                    >
                      +
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedGoal ? 'Edit Goal' : 'Add New Goal'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="title"
              label="Goal Title"
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
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
              >
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
                <MenuItem value="Team">Team</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
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
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="deadline"
              label="Deadline"
              type="date"
              fullWidth
              value={formData.deadline}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="progress"
              label="Progress"
              type="number"
              fullWidth
              value={formData.progress}
              onChange={handleInputChange}
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedGoal ? 'Save Changes' : 'Add Goal'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Goals; 