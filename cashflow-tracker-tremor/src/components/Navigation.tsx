import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/expenses', icon: Receipt, label: 'Ausgaben' },
    { to: '/finances', icon: Wallet, label: 'Finanzen' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block border-b-2 border-zinc-800 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-14">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Drawer */}
        {isOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-x-0 bottom-0 z-40 max-h-[80vh] rounded-t-3xl border-t-2 border-zinc-800 bg-zinc-950 p-6 shadow-xl">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white">Navigation</h2>
                <p className="text-sm text-zinc-400">Wähle eine Seite</p>
              </div>

              <nav className="flex flex-col gap-3">
                {navItems.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-base">{label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </>
        )}
      </div>
    </>
  );
}
