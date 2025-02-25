import React from 'react';
import styled from 'styled-components';

const ChecklistContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

function Checklist({ steps }) {
  return (
    <ChecklistContainer>
      <h2>Checklisten</h2>
      {steps.map((step, index) => (
        <div key={index}>
          <h3>{step.name}</h3>
          <ul>
            {step.tasks.map((task, i) => (
              <li key={i}>{task.description} - {task.status}</li>
            ))}
          </ul>
        </div>
      ))}
    </ChecklistContainer>
  );
}

export default Checklist;