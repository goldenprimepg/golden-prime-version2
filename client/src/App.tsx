import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { PwaLifecycle } from "@/components/PwaLifecycle";
import { Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BuildingWorkspaceProvider } from "./contexts/BuildingWorkspaceContext";
import { DeletionSafetyProvider } from "./components/DeletionSafety";
import { MotionProvider } from "./contexts/MotionContext";
import Billing from "@/pages/Billing";
import AccountSecurity from "@/pages/AccountSecurity";
import Buildings from "@/pages/Buildings";
import Collections from "@/pages/Collections";
import Dashboard from "@/pages/Dashboard";
import Expenses from "@/pages/Expenses";
import Exports from "@/pages/Exports";
import Login from "@/pages/Login";
import Notifications from "@/pages/Notifications";
import NotFound from "@/pages/NotFound";
import OfflineSnapshot from "@/pages/OfflineSnapshot";
import OwnerOverview from "@/pages/OwnerOverview";
import Reminders from "@/pages/Reminders";
import Rooms from "@/pages/Rooms";
import Vacancies from "@/pages/Vacancies";
import Profit from "@/pages/Profit";
import PaymentSettings from "@/pages/PaymentSettings";
import Settings from "@/pages/Settings";
import TenantPortal from "@/pages/TenantPortal";
import Tenants from "@/pages/Tenants";

function RouteLoading() {
  return <div className="grid min-h-[12rem] place-items-center" aria-label="Loading page"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
}

function BuildingWorkspaceEntry() {
  const { user } = useAuth();
  return user?.role === "admin" || user?.role === "manager" ? <Redirect to="/buildings" /> : <Dashboard />;
}

function WorkspaceRoutes() {
  const [location] = useLocation();
  return <div key={location} className="app-page-transition"><Switch>
    <Route path="/" component={BuildingWorkspaceEntry} />
    <Route path="/buildings" component={Buildings} />
    <Route path="/overview" component={Dashboard} />
    <Route path="/rooms" component={Rooms} />
    <Route path="/tenants" component={Tenants} />
    <Route path="/billing" component={Billing} />
    <Route path="/collections" component={Collections} />
    <Route path="/vacancies" component={Vacancies} />
    <Route path="/profit" component={Profit} />
    <Route path="/payment-settings" component={PaymentSettings} />
    <Route path="/account-security" component={AccountSecurity} />
    <Route path="/notifications" component={Notifications} />
    <Route path="/expenses" component={Expenses} />
    <Route path="/reminders" component={Reminders} />
    <Route path="/exports" component={Exports} />
    <Route path="/settings" component={Settings} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></div>;
}

function AppShell() {
  const { user, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  if (!user) return <Redirect to="/login" />;
  if (user.role === "tenant") return <TenantPortal />;
  if (user.role === "admin") return <OwnerOverview />;
  return <BuildingWorkspaceProvider><DashboardLayout><WorkspaceRoutes /></DashboardLayout></BuildingWorkspaceProvider>;
}

function Router() {
  return <Switch><Route path="/offline" component={OfflineSnapshot} /><Route path="/login" component={Login} /><Route path="/tenant" component={AppShell} /><Route component={AppShell} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><MotionProvider><TooltipProvider><Toaster /><PwaLifecycle /><DeletionSafetyProvider><Suspense fallback={<RouteLoading />}><Router /></Suspense></DeletionSafetyProvider></TooltipProvider></MotionProvider></ThemeProvider></ErrorBoundary>;
}
