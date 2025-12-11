import React, { useState } from "react";
import axios from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      setSuccess("Inscription réussie ! Redirection...");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirection après 1 sec
      setTimeout(() => navigate("/login"), 1000);

    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        {/* Bandeau du haut */}
        <h2 className="text-center mb-4 fw-bold text-primary">
          📝 Créer un compte SmartTaskManager
        </h2>

        <div className="col-md-6">
          <div className="card shadow-sm border-0">

            <div className="card-header bg-primary text-white text-center fs-5">
              Inscription
            </div>

            <div className="card-body">

              {/* Messages */}
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleRegister}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Nom d'utilisateur</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-2">
                  S'inscrire
                </button>

                <p className="text-center mt-3">
                  Déjà un compte ?{" "}
                  <span
                    className="text-primary fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Se connecter
                  </span>
                </p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
