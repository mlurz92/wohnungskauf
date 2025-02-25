import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StatusSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function TaskList({ tasks, onUpdate }) {
  return (
    <div>
      <h2>Aufgaben</h2>
      <List>
        {tasks.map((task, index) => (
          <TaskItem key={index}>
            <span>{task.description}</span>
            <StatusSelect
              value={task.status}
              onChange={(e) => onUpdate(index, e.target.value)}
            >
              <option value="open">Offen</option>
              <option value="in_progress">In Bearbeitung</option>
              <option value="completed">Abgeschlossen</option>
            </StatusSelect>
          </TaskItem>
        ))}
      </List>
    </div>
  );
}

export default TaskList;