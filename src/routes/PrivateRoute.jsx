import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    // Petit délai simulant une vérification du token (ex: decode, expiration, etc.)
    const verifyToken = () => {
      if (!token) {
        setValidToken(false);
      } else {
        setValidToken(true);
      }
      setChecking(false);
    };

    verifyToken();
  }, [token]);

  // Loader minimaliste pendant la vérification
  if (checking) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  // Pas de token → redirection login
  if (!validToken) {
    return <Navigate to="/login" />;
  }

  return children;
}
