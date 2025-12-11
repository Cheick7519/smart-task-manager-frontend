import React from "react";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import UserList from "../components/Users/UserList";
import UserForm from "../components/Users/UserForm";

export default function Dashboard() {
  return (
    <div className="d-flex">

      {/* ===== Sidebar ===== */}
      <div
        className="bg-dark text-white p-4"
        style={{
          width: "250px",
          minHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <h3 className="mb-4 fw-bold">SmartTask</h3>

        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <span className="nav-link text-white">📌 Tableau de bord</span>
          </li>
          <li className="nav-item mb-3">
            <span className="nav-link text-white">📝 Tâches</span>
          </li>
          <li className="nav-item mb-3">
            <span className="nav-link text-white">👥 Utilisateurs</span>
          </li>
        </ul>

        <button className="btn btn-outline-light mt-5 w-100">
          Déconnexion
        </button>
      </div>

      {/* ===== Contenu principal ===== */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: "250px",
          padding: "30px",
          width: "100%",
        }}
      >
        {/* Top bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Tableau de bord</h2>
          <span className="text-muted">Bienvenue 👋</span>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-bold">Tâches</h5>
                <p className="text-muted mb-0">Créer et gérer vos tâches</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-bold">Utilisateurs</h5>
                <p className="text-muted mb-0">Ajouter et gérer les comptes</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-bold">Statistiques</h5>
                <p className="text-muted mb-0">Vue d’ensemble du système</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Sections ===== */}
        <div className="row">
          {/* Tâches */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white fw-bold">
                Gestion des tâches
              </div>
              <div className="card-body">
                <TaskForm />
                <hr />
                <TaskList />
              </div>
            </div>
          </div>

          {/* Utilisateurs */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-success text-white fw-bold">
                Gestion des utilisateurs
              </div>
              <div className="card-body">
                <UserForm />
                <hr />
                <UserList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
