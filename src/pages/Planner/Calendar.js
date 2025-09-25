import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
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
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 11, 0),
    category: 'Meeting',
  },
  {
    id: 2,
    title: 'Project Review',
    start: new Date(2024, 2, 16, 14, 0),
    end: new Date(2024, 2, 16, 15, 30),
    category: 'Work',
  },
  {
    id: 3,
    title: 'Code Sprint',
    start: new Date(2024, 2, 17, 9, 0),
    end: new Date(2024, 2, 17, 17, 0),
    category: 'Development',
  },
];

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    category: 'Meeting',
  });

  const handleOpenDialog = (event = null) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        title: event.title,
        start: event.start,
        end: event.end,
        category: event.category,
      });
    } else {
      setSelectedEvent(null);
      setFormData({
        title: '',
        start: new Date(),
        end: new Date(),
        category: 'Meeting',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedEvent) {
      setEvents(prev =>
        prev.map(event =>
          event.id === selectedEvent.id ? { ...formData, id: event.id } : event
        )
      );
    } else {
      const newEvent = {
        ...formData,
        id: Math.max(...events.map(e => e.id)) + 1,
      };
      setEvents(prev => [...prev, newEvent]);
    }
    handleCloseDialog();
  };

  const handleSelectSlot = ({ start, end }) => {
    setFormData(prev => ({
      ...prev,
      start,
      end,
    }));
    handleOpenDialog();
  };

  const handleSelectEvent = event => {
    handleOpenDialog(event);
  };

  const eventStyleGetter = event => {
    const categoryColors = {
      Meeting: '#3174ad',
      Work: '#4caf50',
      Development: '#ff9800',
      Personal: '#e91e63',
    };

    return {
      style: {
        backgroundColor: categoryColors[event.category] || '#3174ad',
      },
    };
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
        <Typography variant="h4" component="h1">
          Calendar
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Event
        </Button>
      </Box>

      <Paper sx={{ height: 'calc(100vh - 200px)', p: 2 }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day', 'agenda']}
        />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Add New Event'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="title"
              label="Event Title"
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              name="start"
              label="Start Time"
              type="datetime-local"
              fullWidth
              value={format(formData.start, "yyyy-MM-dd'T'HH:mm")}
              onChange={e =>
                handleDateChange('start', new Date(e.target.value))
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="end"
              label="End Time"
              type="datetime-local"
              fullWidth
              value={format(formData.end, "yyyy-MM-dd'T'HH:mm")}
              onChange={e => handleDateChange('end', new Date(e.target.value))}
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
                <MenuItem value="Meeting">Meeting</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedEvent ? 'Save Changes' : 'Add Event'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
