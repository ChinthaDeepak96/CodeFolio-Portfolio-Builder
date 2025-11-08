// src/components/ContactForm.tsx
import React from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => (
  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} className="p-4 bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex items-center justify-center">
    <Paper elevation={3} className="p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Contact Me</h2>
      <form>
        <TextField label="Name" fullWidth className="mb-4" />
        <TextField label="Email" fullWidth className="mb-4" />
        <TextField label="Message" fullWidth multiline rows={4} className="mb-4" />
        <Button type="submit" variant="contained" color="secondary" fullWidth className="hover:bg-purple-600 transition-colors">Send Message</Button>
      </form>
    </Paper>
  </motion.div>
);

export default ContactForm;
