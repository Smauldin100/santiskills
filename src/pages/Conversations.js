import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  IconButton,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const conversations = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how is the project going?',
    time: '2:30 PM',
    unread: 2,
    avatar: '/path-to-avatar-1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'Can you review the latest changes?',
    time: '1:45 PM',
    unread: 0,
    avatar: '/path-to-avatar-2.jpg',
  },
  {
    id: 3,
    name: 'Team Channel',
    lastMessage: 'Meeting notes from today\'s sync',
    time: '12:00 PM',
    unread: 5,
    avatar: '/path-to-avatar-3.jpg',
  },
];

const messages = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'Hey, how is the project going?',
    time: '2:30 PM',
    isOwn: false,
  },
  {
    id: 2,
    sender: 'You',
    message: 'Great! Just finished implementing the new feature.',
    time: '2:31 PM',
    isOwn: true,
  },
  {
    id: 3,
    sender: 'John Doe',
    message: 'That\'s awesome! Can you share the details?',
    time: '2:32 PM',
    isOwn: false,
  },
];

const Conversations = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageList, setMessageList] = useState(messages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messageList.length + 1,
        sender: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessageList(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 64px)' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Conversations List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search conversations..."
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Box>

              <List>
                {conversations.map((conversation, index) => (
                  <React.Fragment key={conversation.id}>
                    <ListItem
                      button
                      selected={selectedConversation.id === conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <ListItemAvatar>
                        <Avatar src={conversation.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">
                              {conversation.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {conversation.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {conversation.lastMessage}
                            </Typography>
                            {conversation.unread > 0 && (
                              <Typography
                                variant="caption"
                                sx={{
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: 20,
                                  height: 20,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {conversation.unread}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < conversations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Chat Area */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, overflow: 'auto' }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">
                  {selectedConversation.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {selectedConversation.lastMessage}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {messageList.map((message, index) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: message.isOwn ? 'primary.main' : 'grey.100',
                        color: message.isOwn ? 'white' : 'text.primary',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body1">
                        {message.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          color: message.isOwn ? 'white' : 'text.secondary',
                        }}
                      >
                        {message.time}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </CardContent>

            <Divider />

            <CardContent>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <IconButton>
                  <EmojiEmotionsIcon />
                </IconButton>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Conversations; 