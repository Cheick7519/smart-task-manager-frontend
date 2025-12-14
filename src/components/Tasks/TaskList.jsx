import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Charger toutes les tâches
  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks/listTasks", {
        params: {
          page: 0,
          size: 10
        }
      });
      console.log(res.data);
      setTasks(res.data.content); // 👈 IMPORTANT
    } catch (err) {
      console.error('Erreur chargement tâches :', err);
      alert('Impossible de charger les tâches');
    }
  };

  // Supprimer une tâche par ID
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/deleteTask/${id}`);
      // Supprimer localement sans recharger toute la liste
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Erreur suppression tâche :', err);
      alert('Impossible de supprimer la tâche');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (tasks.length === 0) {
    return <p>Aucune tâche pour le moment.</p>;
  }

  return (
    <div>
      <h2>Liste des tâches</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <div>
              <b>{t.title}</b> — {t.description || 'Pas de description'}
            </div>
            <div>
              <small>Priority: {t.priority} | Status: {t.status}</small>
            </div>
            <button onClick={() => deleteTask(t.id)} style={{ marginTop: '5px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
