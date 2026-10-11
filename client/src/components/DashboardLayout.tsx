import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { useBuildingWorkspace } from "@/contexts/BuildingWorkspaceContext";
import { useMotionPreferences } from "@/contexts/MotionContext";
import { BellRing, Building2, CircleDollarSign, Download, DoorOpen, KeyRound, Landmark, LayoutDashboard, LoaderCircle, LogOut, PanelLeft, ReceiptIndianRupee, RefreshCw, Settings2, UsersRound, WalletCards } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/overview" },
  { icon: Building2, label: "Buildings", path: "/buildings" },
  { icon: DoorOpen, label: "Rooms", path: "/rooms" },
  { icon: DoorOpen, label: "Vacancies", path: "/vacancies" },
  { icon: UsersRound, label: "Tenants", path: "/tenants" },
  { icon: CircleDollarSign, label: "Billing", path: "/billing" },
  { icon: WalletCards, label: "Collections", path: "/collections" },
  { icon: BellRing, label: "Notifications", path: "/notifications" },
  { icon: ReceiptIndianRupee, label: "Expenses", path: "/expenses" },
  { icon: CircleDollarSign, label: "Profit", path: "/profit" },
  { icon: BellRing, label: "Reminders", path: "/reminders" },
  { icon: Download, label: "Export & Filters", path: "/exports" },
  { icon: Landmark, label: "Payment receiving", path: "/payment-settings" },
  { icon: KeyRound, label: "Login & recovery", path: "/account-security" },
  { icon: Settings2, label: "Settings", path: "/settings" },
];

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 280;
const MIN_WIDTH = 200;
const MAX_WIDTH = 480;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return <DashboardLayoutSkeleton />
  }

  if (!user) return null;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const visibleMenuItems = menuItems;
  const isMobile = useIsMobile();
  const { buildingsQuery, building, buildingId, setBuildingId, isRefreshing, invalidateWorkspace } = useBuildingWorkspace();
  const { displayDensity } = useMotionPreferences();

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r-0"
          disableTransition={isResizing}
        >
          <SidebarHeader className="h-16 justify-center">
            <div className="flex items-center gap-3 px-2 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-8 w-8 flex items-center justify-center hover:bg-accent rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
                aria-label="Toggle navigation"
              >
                <PanelLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              {!isCollapsed ? (
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold tracking-tight truncate text-primary">
                    Golden Prime
                  </span>
                </div>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0">
            <SidebarMenu className="px-2 py-3">
              {visibleMenuItems.map(item => {
                const isActive = location === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      tooltip={item.label}
                      className={`h-11 rounded-xl transition-all font-medium`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${isActive ? "text-primary" : ""}`}
                      />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-accent/50 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9 border shrink-0">
                    <AvatarFallback className="text-xs font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium truncate leading-none">
                      {user?.name || "-"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1.5">
                      {user?.email || "-"}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset>
        <div className="sticky top-0 z-30 flex min-h-14 flex-wrap items-center justify-between gap-3 border-b bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-2"><SidebarTrigger className={`h-9 w-9 rounded-lg bg-background ${isMobile ? "inline-flex" : "hidden"}`} /><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Active workspace</p><p className="truncate text-sm font-semibold text-foreground">{building?.name ?? "Choose a building"}</p></div></div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-medium" title="Real-time live synchronization active">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Sync</span>
            </span>
            {isRefreshing ? <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground" role="status" aria-live="polite" aria-label="Refreshing workspace"><LoaderCircle className="h-3.5 w-3.5 motion-safe:animate-spin" aria-hidden="true" /><span className="hidden sm:inline">Refreshing workspace…</span></span> : null}
            <button type="button" onClick={() => void invalidateWorkspace()} title="Instant workspace synchronization" className="h-10 w-10 flex items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition" aria-label="Sync workspace"><RefreshCw className="h-3.5 w-3.5" /></button>
            <select value={buildingId ?? ""} onChange={event => setBuildingId(Number(event.target.value))} disabled={buildingsQuery.isLoading || !buildingsQuery.data?.length} className="h-10 max-w-[12rem] rounded-xl border border-border bg-card px-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" aria-label="Active building workspace">{buildingsQuery.data?.length ? buildingsQuery.data.map(item => <option key={item.id} value={item.id}>{item.name}</option>) : <option value="">No buildings</option>}</select>
            <Button variant="outline" className="h-10 rounded-xl" onClick={() => setLocation("/buildings")}>Manage</Button>
          </div>
        </div>
        <main className={`manager-density-${displayDensity} flex-1 p-4 pb-20 sm:pb-6 sm:p-6 lg:p-8`} data-display-density={displayDensity}>{children}</main>
        {isMobile ? (
          <nav aria-label="Mobile Navigation" className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-background/95 px-2 py-1.5 backdrop-blur supports-[backdrop-filter]:backdrop-blur sm:hidden">
            <button
              type="button"
              onClick={() => setLocation("/overview")}
              className={`flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 text-[11px] font-medium transition-colors ${
                location === "/overview" || location === "/" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 mb-0.5" />
              <span>Overview</span>
            </button>
            <button
              type="button"
              onClick={() => setLocation("/rooms")}
              className={`flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 text-[11px] font-medium transition-colors ${
                location === "/rooms" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <DoorOpen className="h-4 w-4 mb-0.5" />
              <span>Rooms</span>
            </button>
            <button
              type="button"
              onClick={() => setLocation("/tenants")}
              className={`flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 text-[11px] font-medium transition-colors ${
                location === "/tenants" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <UsersRound className="h-4 w-4 mb-0.5" />
              <span>Tenants</span>
            </button>
            <button
              type="button"
              onClick={() => setLocation("/collections")}
              className={`flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 text-[11px] font-medium transition-colors ${
                location === "/collections" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <WalletCards className="h-4 w-4 mb-0.5" />
              <span>Collections</span>
            </button>
            <button
              type="button"
              onClick={toggleSidebar}
              className="flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-xl py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <PanelLeft className="h-4 w-4 mb-0.5" />
              <span>Menu</span>
            </button>
          </nav>
        ) : null}
      </SidebarInset>
    </>
  );
}
