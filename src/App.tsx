import { createBrowserRouter, RouterProvider, useLocation, Outlet } from "react-router-dom";
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

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "category", element: <Category /> },
        { path: "mine", element: <Mine /> },
        { path: "detail/:id", element: <Detail /> },
        { path: "search", element: <SearchPage /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/admin/login", element: <AdminLogin /> },
    { path: "/admin/*", element: <AdminDashboard /> },
  ],
  { basename: import.meta.env.BASE_URL }
)

function AppRoutes() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default function App() {
  return <AppRoutes />;
}
