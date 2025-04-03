import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('week');

  const performanceData = [
    { name: 'Mon', tasks: 8, completed: 7, productivity: 85 },
    { name: 'Tue', tasks: 10, completed: 9, productivity: 90 },
    { name: 'Wed', tasks: 12, completed: 10, productivity: 83 },
    { name: 'Thu', tasks: 9, completed: 8, productivity: 89 },
    { name: 'Fri', tasks: 11, completed: 10, productivity: 91 },
  ];

  const skillProgress = [
    { skill: 'Time Management', progress: 85 },
    { skill: 'Task Completion', progress: 90 },
    { skill: 'Communication', progress: 75 },
    { skill: 'Problem Solving', progress: 88 },
    { skill: 'Team Collaboration', progress: 82 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reports</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="day">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Overview
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tasks" name="Total Tasks" fill="#8884d8" />
                    <Bar dataKey="completed" name="Completed Tasks" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skill Progress
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Skill</TableCell>
                      <TableCell align="right">Progress</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skillProgress.map((skill) => (
                      <TableRow key={skill.skill}>
                        <TableCell component="th" scope="row">
                          {skill.skill}
                        </TableCell>
                        <TableCell align="right">{skill.progress}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Summary Statistics
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Metric</TableCell>
                      <TableCell align="right">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Tasks</TableCell>
                      <TableCell align="right">50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Completion Rate</TableCell>
                      <TableCell align="right">92%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average Productivity</TableCell>
                      <TableCell align="right">87.6%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>On-Time Delivery</TableCell>
                      <TableCell align="right">95%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports; 