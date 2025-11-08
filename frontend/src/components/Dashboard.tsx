// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import TemplateLibrary from './TemplateLibrary';
import PortfolioEditor from './PortfolioEditor';
import ContactForm from './ContactForm';

const Dashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<any>({});
  const [templates, setTemplates] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'templates' | 'edit' | 'preview' | 'contact'>('templates');

  useEffect(() => {
    axios.get('http://localhost:5000/templates').then(res => setTemplates(res.data));
    setPortfolio({ template: '', projects: [], skills: [], experience: '' });
  }, []);

  const selectTemplate = (template: any) => {
    setPortfolio({ ...portfolio, template: template.name });
    setCurrentView('edit');
  };

  const updatePortfolio = (updatedPortfolio: any) => {
    setPortfolio(updatedPortfolio);
  };

  const renderView = () => {
    switch (currentView) {
      case 'templates':
        return <TemplateLibrary templates={templates} onSelect={selectTemplate} />;
      case 'edit':
        return <PortfolioEditor portfolio={portfolio} onUpdate={updatePortfolio} />;
      case 'preview':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-gray-100 min-h-screen">
            <Paper elevation={3} className="p-6">
              <Typography variant="h4" className="mb-4 text-blue-600">Portfolio Preview</Typography>
              <Typography variant="h6">Template: {portfolio.template}</Typography>
              <Typography variant="h6">Projects: {portfolio.projects?.length || 0}</Typography>
              <Typography variant="h6">Skills: {portfolio.skills?.join(', ') || 'None'}</Typography>
              <Typography variant="h6">Experience: {portfolio.experience || 'None'}</Typography>
            </Paper>
          </motion.div>
        );
      case 'contact':
        return <ContactForm />;
      default:
        return <TemplateLibrary templates={templates} onSelect={selectTemplate} />;
    }
  };

  return (
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="p-4">
        <Typography variant="h3" className="text-center text-white mb-6 font-bold">CodeFolio Dashboard</Typography>
        <div className="flex justify-center space-x-4 mb-6">
          <Button variant="contained" color="primary" onClick={() => setCurrentView('templates')} className="hover:bg-blue-700">Templates</Button>
          <Button variant="contained" color="secondary" onClick={() => setCurrentView('edit')} className="hover:bg-green-700">Edit Portfolio</Button>
          <Button variant="outlined" onClick={() => setCurrentView('preview')} className="hover:bg-gray-300">Preview</Button>
          <Button variant="outlined" onClick={() => setCurrentView('contact')} className="hover:bg-purple-300">Contact Form</Button>
        </div>
        {renderView()}
      </div>
    </motion.div>
  );
};

export default Dashboard;
