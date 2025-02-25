import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AppointmentItem = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

function Calendar({ appointments, onAdd, onUpdate }) {
  const [form, setForm] = useState({ title: '', date: '', notes: '', photos: [], reminder: false, category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, date: new Date(form.date).toISOString() });
    setForm({ title: '', date: '', notes: '', photos: [], reminder: false, category: '' });
  };

  return (
    <div>
      <h2>Kalender</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Titel"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <textarea
          placeholder="Notizen"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows="3"
        />
        <input
          placeholder="Kategorie"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={form.reminder}
            onChange={(e) => setForm({ ...form, reminder: e.target.checked })}
          /> Erinnerung
        </label>
        <button type="submit">Hinzufügen</button>
      </form>
      <CalendarContainer>
        {appointments.map((appt) => (
          <AppointmentItem key={appt.id}>
            <strong>{appt.title}</strong> - {new Date(appt.date).toLocaleString()} ({appt.category})
            <p>{appt.notes}</p>
          </AppointmentItem>
        ))}
      </CalendarContainer>
    </div>
  );
}

export default Calendar;