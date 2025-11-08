// src/components/PortfolioEditor.tsx
import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  desc: string;
  tech: string;
  link: string;
}

interface Portfolio {
  template: string;
  projects: Project[];
  skills: string[];
  experience: string;
}

interface PortfolioEditorProps {
  portfolio: Portfolio;
  onUpdate: (portfolio: Portfolio) => void;
}

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ portfolio, onUpdate }) => {
  const [projects, setProjects] = useState<Project[]>(portfolio.projects || []);
  const [skills, setSkills] = useState<string[]>(portfolio.skills || []);
  const [experience, setExperience] = useState<string>(portfolio.experience || '');

  const addProject = () => setProjects([...projects, { title: '', desc: '', tech: '', link: '' }]);

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
    onUpdate({ ...portfolio, projects: updated, skills, experience });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-4 bg-gray-100 min-h-screen">
      <Paper elevation={3} className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Your Portfolio</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Projects</h3>
          {projects.map((proj, i) => (
            <motion.div key={i} className="mb-4 p-4 bg-white rounded shadow" initial={{ y: 20 }} animate={{ y: 0 }}>
              <TextField label="Title" value={proj.title} onChange={(e) => updateProject(i, 'title', e.target.value)} fullWidth className="mb-2" />
              <TextField label="Description" value={proj.desc} onChange={(e) => updateProject(i, 'desc', e.target.value)} fullWidth multiline className="mb-2" />
              <TextField label="Technologies" value={proj.tech} onChange={(e) => updateProject(i, 'tech', e.target.value)} fullWidth className="mb-2" />
              <TextField label="Demo Link" value={proj.link} onChange={(e) => updateProject(i, 'link', e.target.value)} fullWidth />
            </motion.div>
          ))}
          <Button onClick={addProject} variant="contained" color="primary" className="hover:bg-green-600 transition-colors">Add Project</Button>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Skills</h3>
          <TextField
            label="Skills (comma-separated)"
            value={skills.join(', ')}
            onChange={(e) => {
              const newSkills = e.target.value.split(',').map(skill => skill.trim());
              setSkills(newSkills);
              onUpdate({ ...portfolio, skills: newSkills, projects, experience });
            }}
            fullWidth
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Experience</h3>
          <TextField
            label="Experience"
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              onUpdate({ ...portfolio, experience: e.target.value, projects, skills });
            }}
            fullWidth
            multiline
          />
        </div>
      </Paper>
    </motion.div>
  );
};

export default PortfolioEditor;
