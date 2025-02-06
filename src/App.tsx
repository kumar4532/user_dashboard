import { Navigate, Route, Routes } from "react-router-dom"
import GoogleAuthBtn from "./components/GoogleAuthBtn"
import DashboardApp from "./page/DashboardApp";
import useAuth from "./zustand/useAuth";

function App() {
  const { authUser } = useAuth();

  return (
    <>
      <div>
        <Routes>
          <Route 
            path="/" 
            element={
              authUser ? <Navigate to="/dashboard" /> : <Navigate to="/sign-in" />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              authUser ? <DashboardApp /> : <Navigate to="/sign-in" />
            } 
          />
          <Route path="/sign-in" element={authUser ? <Navigate to="/dashboard" /> : <GoogleAuthBtn />} />
        </Routes>
      </div>
    </>
  )
}

export default App
