import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { GetNavigation } from "./GetNavigation";
import { useAuth } from "../context/AuthContext";

function Layout() {

  const { isAuthenticated } = useAuth();
  
  const NAVIGATION = GetNavigation(isAuthenticated);

  const location = useLocation();

  const navigate = useNavigate();

  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        title: "Complaince Analysis",
        logo: <></>
      }}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Layout;
