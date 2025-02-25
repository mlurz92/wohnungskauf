import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
import { getAppointments, addAppointment, updateAppointment } from '../services/api';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await addAppointment(data);
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateAppointment(data);
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Termine</h1>
      <Calendar appointments={appointments} onAdd={handleAdd} onUpdate={handleUpdate} />
    </div>
  );
}

export default Appointments;