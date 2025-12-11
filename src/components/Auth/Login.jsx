import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Ajoute ceci
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // <-- Hook pour naviguer

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data.token);
      alert('Connexion réussie !');
      // Redirection vers le dashboard après login
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Erreur login : ' + JSON.stringify(err.response.data));
      } else {
        alert('Erreur login : ' + err.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
