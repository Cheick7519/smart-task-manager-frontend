import { useState } from 'react';
import api from '../../api/api';

export default function UserForm({ onUserCreated }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [message, setMessage] = useState(null); // succès ou erreur

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/addUser', {
        username,
        email,
        password,
        roles: [role]
      });

      setMessage({ type: 'success', text: 'Utilisateur créé avec succès !' });

      // Réinitialisation du formulaire
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('USER');

      // Notification au parent pour recharger la liste
      if (onUserCreated) onUserCreated();
    } catch (err) {
      console.error('Erreur création utilisateur :', err);
      setMessage({ type: 'error', text: 'Erreur lors de la création de l’utilisateur' });
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Créer un utilisateur</h2>

      {message && (
        <div
          style={{
            color: message.type === 'success' ? 'green' : 'red',
            marginBottom: '10px'
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        <div>
          <label>Nom d'utilisateur :</label><br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email :</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe :</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Rôle :</label><br />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: '10px', padding: '5px 10px' }}>
          Créer
        </button>
      </form>
    </div>
  );
}
