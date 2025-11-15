import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AutomotiveHomePage from "./components/AutomotiveHomePage";
import { AuthProvider, useAuth } from "./components/AuthContext";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import AdminLoginPage from "./components/admin/AdminLoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import CustomerProfile from "./components/customer/CustomerProfile";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return isAdmin ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AutomotiveHomePage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/profile" element={<ProtectedRoute><CustomerProfile/></ProtectedRoute>} />
          <Route path="/admin/login" element={<AdminLoginPage/>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;