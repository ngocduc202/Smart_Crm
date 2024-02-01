import React from "react";
import { useNavigate } from "react-router-dom";

export function RedirectToLogin() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/login')
  }, [])
  return null
}