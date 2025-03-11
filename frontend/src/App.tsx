import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import { BACKEND_URL } from './config/routes';
console.log(BACKEND_URL)

function App() {

  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
