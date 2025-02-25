import React, { useState } from 'react';
import styled from 'styled-components';

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ContactItem = styled.li`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

function ContactList({ contacts, onAdd, onUpdate }) {
  const [form, setForm] = useState({ name: '', role: '', phone: '', email: '', tasks: [], documents: [], history: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: '', role: '', phone: '', email: '', tasks: [], documents: [], history: [] });
  };

  return (
    <div>
      <h2>Kontakte</h2>
      <ContactForm onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Rolle"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          placeholder="Telefon"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Hinzufügen</button>
      </ContactForm>
      <ul>
        {contacts.map((contact) => (
          <ContactItem key={contact.id}>
            {contact.name} ({contact.role})
            {/* Historie aktualisieren */}
            <button onClick={() => onUpdate({ ...contact, history: [...contact.history, { date: new Date().toISOString(), action: 'Kontakt aktualisiert' }] })}>
              Historie aktualisieren
            </button>
          </ContactItem>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;