import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFinance, updateFinance, generateReport } from '../services/api';

function Finance() {
  const [finance, setFinance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFinance();
  }, []);

  const fetchFinance = async () => {
    try {
      const { data } = await getFinance();
      setFinance(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (data) => {
    try {
      await updateFinance(data);
      fetchFinance();
    } catch (error) {
      console.error(error);
    }
  };

  // Neue Funktion: Bericht generieren
  const handleGenerateReport = async () => {
    try {
      const { data } = await generateReport();
      console.log(data); // Platzhalter für zukünftige Berichtsanzeige
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Finanzen</h1>
      <button onClick={handleGenerateReport}>Bericht generieren</button>
      {/* Weitere Finanzkomponenten können hier ergänzt werden */}
    </div>
  );
}

export default Finance;Überprüfe