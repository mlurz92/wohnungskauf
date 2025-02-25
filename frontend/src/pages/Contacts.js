import React, { useEffect, useState } from 'react';
import ContactList from '../components/ContactList';
import { getContacts, addContact, updateContact } from '../services/api';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data } = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await addContact(data);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateContact(data);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Kontakte</h1>
      <ContactList contacts={contacts} onAdd={handleAdd} onUpdate={handleUpdate} />
    </div>
  );
}

export default Contacts;