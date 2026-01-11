import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { Menu, X, Flame, Zap, User, LogOut, BookOpen, Gamepad2, Home, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isLoggedIn, logout, getUser, getProgress } from '@/lib/storage';

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const loggedIn = isLoggedIn();
  const user = getUser();
  const progress = loggedIn ? getProgress() : null;

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={loggedIn ? '/dashboard' : '/'} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-gradient" data-testid="logo-text">
              ATLAS EDU
            </span>
          </Link>

          {loggedIn && (
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard">
                <Button 
                  variant={location === '/dashboard' ? 'default' : 'ghost'} 
                  className="gap-2"
                  data-testid="nav-dashboard"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/languages">
                <Button 
                  variant={location === '/languages' ? 'default' : 'ghost'} 
                  className="gap-2"
                  data-testid="nav-languages"
                >
                  <BookOpen className="w-4 h-4" />
                  Languages
                </Button>
              </Link>
              <Link href="/games">
                <Button 
                  variant={location === '/games' ? 'default' : 'ghost'} 
                  className="gap-2"
                  data-testid="nav-games"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Games
                </Button>
              </Link>
            </div>
          )}

          <div className="hidden md:flex items-center gap-4">
            {loggedIn && progress ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <Flame className="w-5 h-5 text-orange-500 streak-fire" />
                  <span className="font-bold text-orange-600 dark:text-orange-400" data-testid="streak-count">
                    {progress.streak}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full gradient-xp">
                  <Zap className="w-5 h-5 text-yellow-700" />
                  <span className="font-bold text-yellow-800" data-testid="xp-count">
                    {progress.xp} XP
                  </span>
                </div>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium" data-testid="username">{user?.username}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogout}
                    data-testid="button-logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" data-testid="button-login">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button className="btn-3d gradient-primary text-white" data-testid="button-register">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            {loggedIn ? (
              <>
                <div className="flex items-center gap-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-bold text-orange-600">{progress?.streak}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full gradient-xp">
                    <Zap className="w-5 h-5 text-yellow-700" />
                    <span className="font-bold text-yellow-800">{progress?.xp} XP</span>
                  </div>
                </div>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Home className="w-4 h-4" /> Dashboard
                  </Button>
                </Link>
                <Link href="/languages" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <BookOpen className="w-4 h-4" /> Languages
                  </Button>
                </Link>
                <Link href="/games" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Gamepad2 className="w-4 h-4" /> Games
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Log In</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full btn-3d gradient-primary text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
