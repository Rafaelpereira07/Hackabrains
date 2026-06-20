import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import HomePage from "./pages/HomePage"
import PatientPage from "./pages/Paciente"
import PatientDashboard from "./pages/PacienteDashboard"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/paciente/:id" element={<PatientPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/paciente/dashboard" element={<PatientDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
