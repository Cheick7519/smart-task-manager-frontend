import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function UserList() {
  const [users, setUsers] = useState([]);

  // Charger les utilisateurs
  const loadUsers = async () => {
    try {
      const res = await api.get('/users/listUsers');
      setUsers(res.data);
    } catch (err) {
      console.error('Erreur chargement utilisateurs :', err);
      alert('Impossible de charger les utilisateurs');
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      // Supprimer localement sans recharger
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Erreur suppression utilisateur :', err);
      alert('Impossible de supprimer l’utilisateur');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (users.length === 0) {
    return <p>Aucun utilisateur pour le moment.</p>;
  }

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map((u) => (
          <li
            key={u.id}
            style={{
              marginBottom: '10px',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
            <div>
              <b>{u.username}</b> ({u.email})
            </div>
            <button
              onClick={() => deleteUser(u.id)}
              style={{
                marginTop: '5px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px'
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
