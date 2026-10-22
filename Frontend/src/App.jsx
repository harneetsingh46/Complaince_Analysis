import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./common/Layout";
import Hero from "./pages/Hero";
import Signup from "./pages/auth/Signup"
import Dashboard from "./pages/Dashboard";
import Organization from "./pages/Organization";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import Signin from "./pages/auth/Signin";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Signout from "./pages/auth/Signout";
import PublicRoutes from "./utils/PublicRoutes";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <PublicRoutes />,
          children: [
            {
              path: "/",
              element: <Hero/>
            },
            {
              path: "/signin",
              element: <Signin />
            },
            {
              path: "/signup",
              element: <Signup />
            },
          ]
        },

        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />
            },
            {
              path: "/organization",
              element: <Organization />
            },
            {
              path: "/products",
              element: <Products />
            },
            {
              path: "/reports",
              element: <Reports />
            },
            {
              path: "/sign-out",
              element: <Signout />
            }
          ]
        }
      ]
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
