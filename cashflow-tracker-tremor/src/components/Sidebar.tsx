import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/expenses', icon: Receipt, label: 'Ausgaben' },
    { to: '/finances', icon: Wallet, label: 'Finanzen' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r-2 border-zinc-800 bg-zinc-950 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo Section mit Toggle */}
        <div className="flex items-center justify-between p-4 border-b-2 border-zinc-800">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                  <span className="text-xl font-bold text-white">₿</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Cashflow
                  </h1>
                  <p className="text-xs text-zinc-400">Version 2.0</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(true)}
                className="p-2 hover:bg-zinc-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(false)}
              className="p-2 hover:bg-zinc-800 mx-auto"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="flex flex-col gap-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                  isActive
                    ? 'text-blue-400'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
