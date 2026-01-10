import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Zap, 
  Trophy, 
  BookOpen, 
  ArrowRight, 
  Calendar,
  TrendingUp,
  Target,
  Gamepad2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Background3D from '@/components/Background3D';
import { getUser, getProgress, isLoggedIn, type UserProgress } from '@/lib/storage';
import { languages, getLessonsForLanguage } from '@/lib/languages';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const weeklyData = [
  { day: 'Mon', xp: 45 },
  { day: 'Tue', xp: 60 },
  { day: 'Wed', xp: 35 },
  { day: 'Thu', xp: 80 },
  { day: 'Fri', xp: 55 },
  { day: 'Sat', xp: 90 },
  { day: 'Sun', xp: 70 },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const user = getUser();

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation('/login');
      return;
    }
    setProgress(getProgress());
  }, [setLocation]);

  if (!user || !progress) {
    return null;
  }

  const activeLanguages = Object.entries(progress.languageProgress);
  const totalLessonsCompleted = progress.completedLessons.length;
  const nextLevel = Math.floor(progress.xp / 100) + 1;
  const xpToNextLevel = progress.xp % 100;

  return (
    <div className="min-h-screen bg-background">
      <Background3D />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
            Welcome back, {user.username}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Keep up the great work! You're making amazing progress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl gradient-xp flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-800" />
              </div>
              <span className="text-sm text-muted-foreground">Total XP</span>
            </div>
            <p className="font-display text-3xl font-bold" data-testid="stat-total-xp">
              {progress.xp}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Level {nextLevel}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500 streak-fire" />
              </div>
              <span className="text-sm text-muted-foreground">Streak</span>
            </div>
            <p className="font-display text-3xl font-bold" data-testid="stat-streak">
              {progress.streak} days
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Keep it going!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">Lessons</span>
            </div>
            <p className="font-display text-3xl font-bold" data-testid="stat-lessons">
              {totalLessonsCompleted}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Completed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">Languages</span>
            </div>
            <p className="font-display text-3xl font-bold" data-testid="stat-languages">
              {activeLanguages.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Learning
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-bold">Weekly Progress</h2>
                <p className="text-sm text-muted-foreground">Your XP earned this week</p>
              </div>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(145 63% 42%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(145 63% 42%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 20% 88%)" />
                  <XAxis dataKey="day" stroke="hsl(150 10% 45%)" />
                  <YAxis stroke="hsl(150 10% 45%)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0 0% 100%)', 
                      border: '1px solid hsl(150 20% 88%)',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="hsl(145 63% 42%)" 
                    strokeWidth={3}
                    fill="url(#xpGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-bold">Level Progress</h2>
                <p className="text-sm text-muted-foreground">To level {nextLevel + 1}</p>
              </div>
              <Target className="w-5 h-5 text-primary" />
            </div>
            
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(150 15% 92%)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#levelGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(xpToNextLevel / 100) * 283} 283`}
                  />
                  <defs>
                    <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(145 63% 42%)" />
                      <stop offset="100%" stopColor="hsl(200 80% 55%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-3xl font-bold">{nextLevel}</span>
                  <span className="text-xs text-muted-foreground">LEVEL</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{xpToNextLevel}/100 XP</span>
              </div>
              <Progress value={xpToNextLevel} className="h-2" />
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Daily Goal</p>
                  <p className="text-xs text-muted-foreground">Complete 1 lesson today</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Continue Learning</h2>
            <Link href="/languages">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {activeLanguages.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeLanguages.map(([code, langProgress]) => {
                const lang = languages.find(l => l.code === code);
                if (!lang) return null;
                const lessons = getLessonsForLanguage(code);
                const completedCount = lessons.filter(l => 
                  progress.completedLessons.includes(l.id)
                ).length;

                return (
                  <Link key={code} href={`/language/${code}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card rounded-2xl p-6 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{lang.flag}</span>
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                            {lang.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Level {langProgress.level}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{completedCount}/{lessons.length}</span>
                        </div>
                        <Progress 
                          value={(completedCount / Math.max(lessons.length, 1)) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-display text-xl font-bold mb-2">Start Your First Language!</h3>
              <p className="text-muted-foreground mb-6">
                Choose a language to begin your learning journey.
              </p>
              <Link href="/languages">
                <Button className="btn-3d gradient-primary text-white">
                  Browse Languages
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Quick Actions</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/languages">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  New Lesson
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start learning something new
                </p>
              </motion.div>
            </Link>

            <Link href="/games">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center mb-4">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Play Games
                </h3>
                <p className="text-sm text-muted-foreground">
                  Practice with fun games
                </p>
              </motion.div>
            </Link>

            <Link href="/languages">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Practice
                </h3>
                <p className="text-sm text-muted-foreground">
                  Review completed lessons
                </p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
