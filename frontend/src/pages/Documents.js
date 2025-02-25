import React, { useEffect, useState } from 'react';
import DocumentUploader from '../components/DocumentUploader';
import { uploadDocument, getDocuments, updateDocument } from '../services/api';

function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data } = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (formData) => {
    try {
      await uploadDocument(formData);
      fetchDocuments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, notes) => {
    try {
      await updateDocument({ id, notes });
      fetchDocuments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dokumente</h1>
      <DocumentUploader documents={documents} onUpload={handleUpload} onUpdate={handleUpdate} />
    </div>
  );
}

export default Documents;