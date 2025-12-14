import React, { useState } from "react";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import UserList from "../components/Users/UserList";
import UserForm from "../components/Users/UserForm";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="d-flex">
      {/* ===== SIDEBAR ===== */}
      <div
        className="bg-dark text-white p-4"
        style={{ width: "250px", minHeight: "100vh", position: "fixed" }}
      >
        <h3 className="mb-4 fw-bold">SmartTask</h3>

        <button
          className={`btn w-100 mb-2 text-start ${
            activeTab === "dashboard" ? "btn-light" : "btn-dark text-white"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Tableau de bord
        </button>

        <button
          className={`btn w-100 mb-2 text-start ${
            activeTab === "tasks" ? "btn-light" : "btn-dark text-white"
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          📝 Tâches
        </button>

        <button
          className={`btn w-100 mb-2 text-start ${
            activeTab === "users" ? "btn-light" : "btn-dark text-white"
          }`}
          onClick={() => setActiveTab("users")}
        >
          👥 Utilisateurs
        </button>

        <button className="btn btn-outline-light mt-5 w-100">
          Déconnexion
        </button>
      </div>

      {/* ===== CONTENU ===== */}
      <div style={{ marginLeft: "250px", padding: "30px", width: "100%" }}>
        {/* ===== DASHBOARD ===== */}
        {activeTab === "dashboard" && (
          <>
            <h2 className="fw-bold mb-4">📊 Tableau de bord</h2>

            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5>Tâches</h5>
                    <p className="text-muted">Créer, modifier et supprimer</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5>Utilisateurs</h5>
                    <p className="text-muted">Gestion des comptes</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== TÂCHES ===== */}
        {activeTab === "tasks" && (
          <>
            <h2 className="fw-bold mb-3">📝 Gestion des tâches</h2>
            <TaskForm />
            <hr />
            <TaskList />
          </>
        )}

        {/* ===== USERS ===== */}
        {activeTab === "users" && (
          <>
            <h2 className="fw-bold mb-3">👥 Gestion des utilisateurs</h2>
            <UserForm />
            <hr />
            <UserList />
          </>
        )}
      </div>
    </div>
  );
}
