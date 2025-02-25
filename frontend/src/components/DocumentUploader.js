import React, { useState } from 'react';
import styled from 'styled-components';

const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DocumentItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const DocumentLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function DocumentUploader({ documents, onUpload, onUpdate }) {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('notes', notes);
    formData.append('tags', tags.split(',').map(tag => tag.trim()));
    onUpload(formData);
    setFile(null);
    setNotes('');
    setTags('');
  };

  return (
    <div>
      <h2>Dokumente</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <textarea
          placeholder="Notizen"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
        />
        <input
          placeholder="Tags (kommagetrennt)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" disabled={!file}>Hochladen</button>
      </form>
      <DocumentList>
        {documents.map((doc) => (
          <DocumentItem key={doc.id}>
            <DocumentLink href={`${import.meta.env.VITE_API_URL.replace('/api', '')}/${doc.path}`} target="_blank">
              {doc.filename}
            </DocumentLink>
            <textarea
              value={doc.notes || ''}
              onChange={(e) => onUpdate(doc.id, e.target.value, doc.tags)}
              rows="2"
              placeholder="Notizen hinzufügen"
            />
            <input
              value={doc.tags.join(', ')}
              onChange={(e) => onUpdate(doc.id, doc.notes, e.target.value.split(',').map(tag => tag.trim()))}
              placeholder="Tags (kommagetrennt)"
            />
          </DocumentItem>
        ))}
      </DocumentList>
    </div>
  );
}

export default DocumentUploader;