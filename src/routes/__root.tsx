import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Menu } from "#/components/menu/menu";

function RootLayout() {
  return (
    <main className="flex flex-col h-screen bg-background font-roboto-condensed text-foreground overflow-hidden">
      <Menu />
      <div className="flex flex-1 min-h-0">
        <Outlet />
      </div>
    </main>
  );
}

export const Route = createRootRoute({ component: RootLayout });
