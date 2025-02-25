import React, { useEffect, useState } from 'react';
import PropertyTable from '../components/PropertyTable';
import { getProperties, addProperty, updateProperty } from '../services/api';

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data } = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await addProperty(data);
      fetchProperties();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateProperty(data);
      fetchProperties();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Objekte</h1>
      <PropertyTable properties={properties} onAdd={handleAdd} onUpdate={handleUpdate} />
    </div>
  );
}

export default Properties;