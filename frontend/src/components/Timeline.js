import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

// - Styling für Timeline
const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Event = styled(motion.div)`
  padding: 15px;
  background-color: ${props => props.completed ? '#d4edda' : props.inProgress ? '#fff3cd' : '#f8d7da'};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${props => props.completed ? '#c3e6cb' : '#f5c6cb'};
  }
`;

const NextStep = styled.div`
  margin-top: 20px;
  font-weight: bold;
  color: #007bff;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const Badge = styled.span`
  display: inline-block;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border-radius: 10px;
  font-size: 0.8em;
`;

function Timeline({ steps, badges, onSelect }) {
  const [filter, setFilter] = useState('all'); // Filterzustand

  const nextStepIndex = steps.findIndex(step => !step.completed);
  const nextStep = nextStepIndex !== -1 ? steps[nextStepIndex] : null;

  const filteredSteps = steps.filter(step => {
    if (filter === 'all') return true;
    if (filter === 'completed') return step.completed;
    if (filter === 'in_progress') return step.tasks.some(task => task.status === 'in_progress');
    if (filter === 'open') return !step.completed && !step.tasks.some(task => task.status === 'in_progress');
    return true;
  });

  return (
    <div>
      <h2>Prozessübersicht</h2>
      <FilterContainer>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Alle</option>
          <option value="completed">Abgeschlossen</option>
          <option value="in_progress">In Bearbeitung</option>
          <option value="open">Offen</option>
        </select>
      </FilterContainer>
      <TimelineContainer>
        {filteredSteps.map((step, index) => {
          const isInProgress = step.tasks.some(task => task.status === 'in_progress');
          const stepBadges = badges.filter(badge => badge.stepIndex === index);
          return (
            <Event
              key={index}
              completed={step.completed}
              inProgress={isInProgress}
              onClick={() => onSelect(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              data-tooltip-id={`event-tooltip-${index}`}
              data-tooltip-content={`Schritt: ${step.name}\nStatus: ${step.completed ? 'Abgeschlossen' : isInProgress ? 'In Bearbeitung' : 'Offen'}`}
            >
              {step.name} - {step.completed ? 'Abgeschlossen' : isInProgress ? 'In Bearbeitung' : 'Offen'}
              {stepBadges.map((badge, badgeIndex) => (
                <Badge key={badgeIndex}>{badge.name}</Badge>
              ))}
              <Tooltip id={`event-tooltip-${index}`} />
            </Event>
          );
        })}
      </TimelineContainer>
      {nextStep && (
        <NextStep>
          Nächster Schritt: {nextStep.name}
        </NextStep>
      )}
    </div>
  );
}

export default Timeline;