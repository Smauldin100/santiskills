import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const performanceData = [
  { month: 'Jan', productivity: 65, efficiency: 70, quality: 80 },
  { month: 'Feb', productivity: 78, efficiency: 75, quality: 82 },
  { month: 'Mar', productivity: 82, efficiency: 85, quality: 85 },
  { month: 'Apr', productivity: 75, efficiency: 80, quality: 78 },
  { month: 'May', productivity: 85, efficiency: 88, quality: 90 },
  { month: 'Jun', productivity: 90, efficiency: 92, quality: 88 },
];

const skillsData = [
  { name: 'React', progress: 90 },
  { name: 'Node.js', progress: 85 },
  { name: 'Python', progress: 75 },
  { name: 'SQL', progress: 80 },
  { name: 'DevOps', progress: 70 },
];

const Performance = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Performance Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Overall Performance Score
              </Typography>
              <Typography variant="h3" sx={{ color: 'primary.main' }}>
                85%
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                +5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tasks Completed
              </Typography>
              <Typography variant="h3" sx={{ color: 'success.main' }}>
                127
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Response Time
              </Typography>
              <Typography variant="h3" sx={{ color: 'info.main' }}>
                2.4h
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                -0.5h improvement
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Trends Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Trends
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="productivity"
                      stroke="#2193b0"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#6dd5ed"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="quality"
                      stroke="#51cf66"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills Progress */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skills Progress
              </Typography>
              <Box sx={{ mt: 2 }}>
                {skillsData.map((skill) => (
                  <Box key={skill.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">{skill.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {skill.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Time Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Time Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="productivity"
                      stackId="1"
                      stroke="#2193b0"
                      fill="#2193b0"
                    />
                    <Area
                      type="monotone"
                      dataKey="efficiency"
                      stackId="1"
                      stroke="#6dd5ed"
                      fill="#6dd5ed"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Performance; 