import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import Timeline from '../components/Timeline';
import TaskList from '../components/TaskList';
import Checklist from '../components/Checklist';
import { getProgress, updateProgress, generateReport } from '../services/api';

function Dashboard({ onLogout }) {
  const [progress, setProgress] = useState({ steps: [], badges: [] }); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const { data } = await getProgress();
      setProgress({ steps: data.steps, badges: data.badges });
    } catch (error) {
      console.error(error);
    }
  };

  const handleStepSelect = (index) => {
    const newSteps = [...progress.steps];
    newSteps[index].completed = !newSteps[index].completed;
    
    // - Badge für abgeschlossenen Schritt hinzufügen
    let newBadges = [...progress.badges];
    if (newSteps[index].completed && !newBadges.some(b => b.stepIndex === index)) {
      newBadges.push({ stepIndex: index, name: 'Schritt abgeschlossen' });
    } else if (!newSteps[index].completed) {
      newBadges = newBadges.filter(b => b.stepIndex !== index);
    }

    updateProgress({ steps: newSteps, badges: newBadges }).then(() => fetchProgress());
  };

  const handleTaskUpdate = (stepIndex, taskIndex, status) => {
    const newSteps = [...progress.steps];
    newSteps[stepIndex].tasks[taskIndex].status = status;
    
    // - Badge für erledigte Aufgaben hinzufügen
    let newBadges = [...progress.badges];
    const allTasksCompleted = newSteps[stepIndex].tasks.every(task => task.status === 'completed');
    if (allTasksCompleted && !newBadges.some(b => b.stepIndex === stepIndex && b.name === 'Alle Aufgaben erledigt')) {
      newBadges.push({ stepIndex, name: 'Alle Aufgaben erledigt' });
    }

    updateProgress({ steps: newSteps, badges: newBadges }).then(() => fetchProgress());
  };

  const addStep = () => {
    const name = prompt('Schrittname:');
    if (name) {
      const newSteps = [...progress.steps, { name, completed: false, tasks: [] }];
      updateProgress({ steps: newSteps, badges: progress.badges }).then(() => fetchProgress());
    }
  };

  const addTask = (stepIndex) => {
    const description = prompt('Aufgabenbeschreibung:');
    if (description) {
      const newSteps = [...progress.steps];
      newSteps[stepIndex].tasks.push({ description, status: 'open' });
      updateProgress({ steps: newSteps, badges: progress.badges }).then(() => fetchProgress());
    }
  };

  const handleGenerateReport = async () => {
    try {
      const { data } = await generateReport();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={onLogout}>Ausloggen</button>
      <button onClick={() => navigate('/finance')}>Finanzen</button>
      <button onClick={() => navigate('/documents')}>Dokumente</button>
      <button onClick={() => navigate('/contacts')}>Kontakte</button>
      <button onClick={() => navigate('/properties')}>Objekte</button>
      <button onClick={() => navigate('/appointments')}>Termine</button>
      <button onClick={handleGenerateReport}>Bericht generieren</button>
      <ProgressBar steps={progress.steps} />
      <Timeline steps={progress.steps} badges={progress.badges} onSelect={handleStepSelect} />
      <button onClick={addStep}>Schritt hinzufügen</button>
      {progress.steps.map((step, index) => (
        <div key={index}>
          <h3>{step.name}</h3>
          <TaskList
            tasks={step.tasks}
            onUpdate={(taskIdx, status) => handleTaskUpdate(index, taskIdx, status)}
          />
          <button onClick={() => addTask(index)}>Aufgabe hinzufügen</button>
        </div>
      ))}
      <Checklist steps={progress.steps} />
    </div>
  );
}

export default Dashboard;