// src/components/TemplateLibrary.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

interface Template {
  id: number;
  name: string;
  preview: string;
  isPremium: boolean;
}

interface TemplateLibraryProps {
  templates: Template[];
  onSelect: (template: Template) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ templates, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-r from-blue-500 to-green-500 min-h-screen">
    {templates.map(template => (
      <motion.div key={template.id} whileHover={{ scale: 1.05, rotate: 2 }} transition={{ duration: 0.3 }}>
        <Card className="shadow-lg rounded-lg">
          <CardMedia component="img" height="140" image={template.preview} alt={template.name} />
          <CardContent>
            <Typography variant="h5" className="font-bold text-gray-800">{template.name}</Typography>
            {template.isPremium && <Typography variant="body2" color="secondary">Premium</Typography>}
            <Button onClick={() => onSelect(template)} variant="contained" color="primary" className="mt-2 hover:bg-blue-700 transition-colors">Select Template</Button>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);

export default TemplateLibrary;
