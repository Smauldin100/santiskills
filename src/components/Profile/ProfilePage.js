import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  Language,
  School,
  Work,
  EmojiEvents,
} from '@mui/icons-material';
import { personalInfo } from '../../data/personalData';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderCard = styled(Card)`
  margin-bottom: 20px;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  color: white;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const LargeAvatar = styled(Avatar)`
  width: 150px !important;
  height: 150px !important;
  margin-bottom: 15px;
  border: 4px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 20px !important;
  color: #1a73e8;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SkillChip = styled(Chip)`
  margin: 5px;
`;

const ProfilePage = () => {
  return (
    <ProfileContainer>
      <HeaderCard>
        <CardContent>
          <AvatarWrapper>
            <LargeAvatar>{personalInfo.name.charAt(0)}</LargeAvatar>
            <Typography variant="h4" gutterBottom>
              {personalInfo.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {personalInfo.status}
            </Typography>
          </AvatarWrapper>
          <Typography variant="body1" paragraph style={{ textAlign: 'center' }}>
            {personalInfo.summary}
          </Typography>
        </CardContent>
      </HeaderCard>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <SectionTitle variant="h6">
                <LocationOn /> Contact & Languages
              </SectionTitle>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={personalInfo.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={personalInfo.location}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Language />
                  </ListItemIcon>
                  <ListItemText
                    primary="Languages"
                    secondary={personalInfo.languages.join(', ')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <SectionTitle variant="h6">
                <EmojiEvents /> Personal Goals
              </SectionTitle>
              <List>
                {personalInfo.personalGoals.map((goal, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={goal} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <SectionTitle variant="h6">
                <Work /> Technical Skills
              </SectionTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {personalInfo.technicalSkills.map((skill, i) => (
                  <SkillChip key={i} label={skill} color="primary" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <SectionTitle variant="h6">
                <School /> App Projects
              </SectionTitle>
              {personalInfo.appProjects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {proj.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Goal: {proj.goal}
                  </Typography>
                  <ul style={{ margin: '8px 0 0 16px' }}>
                    {proj.features.map((f, j) => (
                      <li key={j}>
                        <Typography variant="body2">{f}</Typography>
                      </li>
                    ))}
                  </ul>
                  <Typography variant="body2" color="textSecondary">
                    Technologies: {proj.technologies.join(', ')}
                  </Typography>
                  {i < personalInfo.appProjects.length - 1 && (
                    <Divider style={{ margin: '16px 0' }} />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <SectionTitle variant="h6">💰 Income Goals</SectionTitle>
              <Typography variant="body2">
                Current Income: {personalInfo.income.current}
              </Typography>
              <Typography variant="body2">
                Target Launch: {personalInfo.income.goal.targetLaunch}
              </Typography>
              <Typography variant="body2">Monetization Plan:</Typography>
              <ul style={{ margin: '8px 0 0 16px' }}>
                {personalInfo.income.goal.monetization.map((m, i) => (
                  <li key={i}>
                    <Typography variant="body2">{m}</Typography>
                  </li>
                ))}
              </ul>
              <Typography variant="body2">
                Projected First-Year Income:{' '}
                {personalInfo.income.goal.projectedFirstYear}
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <SectionTitle variant="h6">🎮 Gaming & Hardware</SectionTitle>
              <Typography variant="body2">
                Rig: {personalInfo.gaming.rig}
              </Typography>
              <Typography variant="body2">
                Controller: {personalInfo.gaming.controller}
              </Typography>
              <Typography variant="body2">
                Primary Game: {personalInfo.gaming.primaryGame}
              </Typography>
              <Typography variant="body2">
                Streaming: {personalInfo.gaming.streaming}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default ProfilePage;
