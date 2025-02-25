import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

// - Styling für Fortschrittsbalken
const Bar = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const Fill = styled(motion.div)`
  width: ${props => props.percentage}%;
  background-color: #007bff;
  height: 100%;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Icon = styled.span`
  font-size: 20px;
  color: ${props => props.completed ? '#28a745' : '#dc3545'};
  cursor: pointer;
`;

function ProgressBar({ steps }) {
  const completed = steps.filter(step => step.completed).length;
  const percentage = (completed / steps.length) * 100 || 0;

  return (
    <div>
      <h2>Fortschrittsbalken</h2>
      <Bar>
        <Fill
          percentage={percentage}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          data-tooltip-id="progress-tooltip"
          data-tooltip-content={`${completed} von ${steps.length} Schritten abgeschlossen (${percentage.toFixed(2)}%)`}
        />
      </Bar>
      <Tooltip id="progress-tooltip" />
      <p>{completed} von {steps.length} Schritten abgeschlossen ({percentage.toFixed(2)}%)</p>
      <StepIndicator>
        {steps.map((step, index) => (
          <Icon
            key={index}
            completed={step.completed}
            data-tooltip-id={`step-tooltip-${index}`}
            data-tooltip-content={`${step.name}: ${step.completed ? 'Abgeschlossen' : 'Offen'}`}
          >
            {step.completed ? '✓' : '✗'}
            <Tooltip id={`step-tooltip-${index}`} />
          </Icon>
        ))}
      </StepIndicator>
    </div>
  );
}

export default ProgressBar;