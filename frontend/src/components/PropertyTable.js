import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Th = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
`;

const Td = styled.td`
  padding: 10px;
  text-align: center;
`;

const PropertyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

function PropertyTable({ properties, onAdd, onUpdate }) {
  const [form, setForm] = useState({
    name: '', area: '', rooms: '', price: '', criteria: [{ name: 'Lage', score: 0 }], pros: [], cons: [], photos: [], virtualTour: '', location: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, area: Number(form.area), rooms: Number(form.rooms), price: Number(form.price) });
    setForm({ name: '', area: '', rooms: '', price: '', criteria: [{ name: 'Lage', score: 0 }], pros: [], cons: [], photos: [], virtualTour: '', location: '' });
  };

  return (
    <div>
      <h2>Objektvergleich</h2>
      <PropertyForm onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Fläche (m²)"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
        />
        <input
          type="number"
          placeholder="Zimmer"
          value={form.rooms}
          onChange={(e) => setForm({ ...form, rooms: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preis (€)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Fotos (URLs, kommagetrennt)"
          value={form.photos.join(', ')}
          onChange={(e) => setForm({ ...form, photos: e.target.value.split(',').map(photo => photo.trim()) })}
        />
        <input
          placeholder="Virtuelle Tour (URL)"
          value={form.virtualTour}
          onChange={(e) => setForm({ ...form, virtualTour: e.target.value })}
        />
        <input
          placeholder="Standort"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button type="submit">Hinzufügen</button>
      </PropertyForm>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Fläche</Th>
            <Th>Zimmer</Th>
            <Th>Preis</Th>
            <Th>Score</Th>
            <Th>Standort</Th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.id}>
              <Td>{prop.name}</Td>
              <Td>{prop.area}</Td>
              <Td>{prop.rooms}</Td>
              <Td>{prop.price}</Td>
              <Td>{prop.criteria.reduce((sum, c) => sum + c.score, 0)}</Td>
              <Td>{prop.location}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PropertyTable;