import React, { useState } from 'react';
import { login, register } from '../services/api';

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = isRegister ? await register(form) : await login(form);
      if (!isRegister) onLogin(data.token);
      else setIsRegister(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Fehler');
    }
  };

  return (
    <div>
      <h1>{isRegister ? 'Registrieren' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Benutzername"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {isRegister && (
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        )}
        <button type="submit">{isRegister ? 'Registrieren' : 'Einloggen'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Zum Login' : 'Registrieren'}
      </button>
    </div>
  );
}

export default Login;