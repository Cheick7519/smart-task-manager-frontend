import React, { useState } from "react";
import axios from "../../api/api";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW"); // Valeur par défaut
  const [status, setStatus] = useState("TODO");    // Valeur par défaut
  const [assignedToId, setAssignedToId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construction de l'objet à envoyer à l'API
      const newTask = {
        title,
        description,
        priority,
        status,
        assignedToId: assignedToId ? Number(assignedToId) : null
      };

      await axios.post("/api/tasks", newTask);

      // Réinitialisation du formulaire
      setTitle("");
      setDescription("");
      setPriority("LOW");
      setStatus("TODO");
      setAssignedToId("");

      alert("Tâche créée !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de la tâche");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Titre de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>
      <div className="mb-2">
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
      <div className="mb-2">
        <input
          type="number"
          className="form-control"
          placeholder="ID de l'utilisateur assigné"
          value={assignedToId}
          onChange={(e) => setAssignedToId(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Ajouter
      </button>
    </form>
  );
}
