import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Mine from "@/pages/Mine";
import Detail from "@/pages/Detail";
import Login from "@/pages/Login";
import SearchPage from "@/pages/Search";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ErrorBoundary from "@/components/ErrorBoundary";
import TabBar from "@/components/TabBar";
import ToastContainer from "@/components/Toast";

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#F5F5F5] max-w-[768px] mx-auto">
      <ToastContainer />
      <div key={location.pathname} className="animate-page-in">
        <Outlet />
      </div>
      <TabBar />
    </div>
  )
}

function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/mine" element={<Mine />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}