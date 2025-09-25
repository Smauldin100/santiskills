import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const userProfile = {
  name: 'John Doe',
  title: 'Senior Software Engineer',
  email: 'john.doe@example.com',
  location: 'San Francisco, CA',
  bio: 'Passionate software engineer with expertise in React and Node.js. Focused on building scalable and user-friendly applications.',
  skills: [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'AWS', level: 70 },
  ],
  achievements: [
    {
      title: 'Best Performance Award',
      date: '2024-02',
      description: 'Recognized for outstanding contribution to the project',
    },
    {
      title: 'Technical Excellence',
      date: '2023-12',
      description: 'Awarded for innovative solutions in system architecture',
    },
  ],
  recentActivity: [
    {
      type: 'Task',
      title: 'Completed Project Milestone',
      date: '2024-03-15',
      description: 'Successfully delivered the first phase of the project',
    },
    {
      type: 'Learning',
      title: 'Completed Advanced React Course',
      date: '2024-03-10',
      description: 'Finished advanced React patterns and best practices course',
    },
  ],
};

const Profile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [profileData, setProfileData] = useState(userProfile);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{ width: 100, height: 100, mr: 3 }}
                  src="/path-to-avatar.jpg"
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h4" component="h1" sx={{ mr: 2 }}>
                      {profileData.name}
                    </Typography>
                    <IconButton onClick={handleOpenDialog}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    {profileData.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {profileData.email} • {profileData.location}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1">{profileData.bio}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <SchoolIcon sx={{ mr: 1 }} />
                Skills
              </Typography>
              <Box sx={{ mt: 2 }}>
                {profileData.skills.map((skill, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">{skill.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <StarIcon sx={{ mr: 1 }} />
                Achievements
              </Typography>
              <List>
                {profileData.achievements.map((achievement, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <StarIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={achievement.title}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {achievement.date}
                          </Typography>
                          <br />
                          {achievement.description}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <TimelineIcon sx={{ mr: 1 }} />
                Recent Activity
              </Typography>
              <List>
                {profileData.recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor:
                              activity.type === 'Task'
                                ? 'success.main'
                                : 'info.main',
                          }}
                        >
                          {activity.type === 'Task' ? (
                            <WorkIcon />
                          ) : (
                            <SchoolIcon />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textSecondary"
                            >
                              {activity.date}
                            </Typography>
                            <br />
                            {activity.description}
                          </>
                        }
                      />
                    </ListItem>
                    {index < profileData.recentActivity.length - 1 && (
                      <Divider />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              value={profileData.name}
              onChange={handleInputChange}
            />
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={profileData.title}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={profileData.email}
              onChange={handleInputChange}
            />
            <TextField
              name="location"
              label="Location"
              fullWidth
              value={profileData.location}
              onChange={handleInputChange}
            />
            <TextField
              name="bio"
              label="Bio"
              fullWidth
              multiline
              rows={4}
              value={profileData.bio}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
