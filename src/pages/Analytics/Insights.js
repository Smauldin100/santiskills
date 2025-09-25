import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';

const Insights = () => {
  const insights = [
    {
      type: 'positive',
      icon: <TrendingUpIcon color="success" />,
      title: 'Productivity Improvement',
      description:
        'Your productivity has increased by 15% compared to last week',
      metrics: ['Tasks completed: +20%', 'Response time: -25%'],
    },
    {
      type: 'warning',
      icon: <WarningIcon color="warning" />,
      title: 'Focus Areas',
      description: 'Consider improving your time management in the afternoon',
      metrics: ['Afternoon productivity: -10%', 'Task completion rate: 85%'],
    },
    {
      type: 'success',
      icon: <CheckCircleIcon color="success" />,
      title: 'Achievement',
      description: "You've maintained a 90% task completion rate for 3 weeks",
      metrics: ['Weekly completion: 90%', 'Streak: 21 days'],
    },
    {
      type: 'info',
      icon: <LightbulbIcon color="info" />,
      title: 'Recommendation',
      description: 'Try breaking down larger tasks into smaller subtasks',
      metrics: ['Large task completion: 75%', 'Small task completion: 95%'],
    },
  ];

  const recommendations = [
    'Schedule regular breaks to maintain productivity',
    'Focus on one task at a time to improve efficiency',
    'Use the Pomodoro technique for better time management',
    'Review and update your goals weekly',
    'Take advantage of your peak productivity hours',
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Insights & Recommendations
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Data-driven insights to help you improve your performance
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Insights
              </Typography>
              <List>
                {insights.map((insight, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>{insight.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Typography variant="subtitle1">
                              {insight.title}
                            </Typography>
                            <Chip
                              label={insight.type}
                              size="small"
                              color={insight.type}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {insight.description}
                            </Typography>
                            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                              {insight.metrics.map((metric, idx) => (
                                <Chip
                                  key={idx}
                                  label={metric}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < insights.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personalized Recommendations
              </Typography>
              <List>
                {recommendations.map((recommendation, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <LightbulbIcon color="info" />
                      </ListItemIcon>
                      <ListItemText primary={recommendation} />
                    </ListItem>
                    {index < recommendations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Insights;
