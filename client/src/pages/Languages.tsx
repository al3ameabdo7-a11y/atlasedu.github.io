import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Background3D from '@/components/Background3D';
import { isLoggedIn, getProgress, initializeLanguage, type UserProgress } from '@/lib/storage';
import { languages, getLessonsForLanguage } from '@/lib/languages';

export default function Languages() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation('/login');
      return;
    }
    setProgress(getProgress());
  }, [setLocation]);

  const handleStartLanguage = (code: string) => {
    initializeLanguage(code);
    setLocation(`/language/${code}`);
  };

  if (!progress) return null;

  return (
    <div className="min-h-screen bg-background">
      <Background3D />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Choose Your Language
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start learning any of our 8 supported languages. Each comes with 
            vocabulary, grammar, exercises, and games!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {languages.map((lang, i) => {
            const langProgress = progress.languageProgress[lang.code];
            const lessons = getLessonsForLanguage(lang.code);
            const completedCount = lessons.filter(l => 
              progress.completedLessons.includes(l.id)
            ).length;
            const isStarted = !!langProgress;

            return (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => handleStartLanguage(lang.code)}
                data-testid={`card-language-${lang.code}`}
              >
                <div className={`h-2 bg-gradient-to-r ${lang.color}`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{lang.flag}</span>
                    {isStarted && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Star className="w-3 h-3" />
                        Level {langProgress.level}
                      </div>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {lang.name}
                  </h3>
                  <p className="text-muted-foreground mb-1">{lang.nativeName}</p>
                  <p className="text-sm text-muted-foreground mb-4">{lang.description}</p>

                  {isStarted ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{completedCount}/{lessons.length} lessons</span>
                      </div>
                      <Progress 
                        value={(completedCount / Math.max(lessons.length, 1)) * 100} 
                        className="h-2" 
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">XP Earned</span>
                        <span className="font-medium text-primary">{langProgress.xpEarned} XP</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{lessons.length} lessons available</span>
                    </div>
                  )}

                  <Button 
                    className={`w-full mt-4 ${isStarted ? 'gradient-primary' : 'gradient-secondary'} text-white btn-3d`}
                    data-testid={`button-start-${lang.code}`}
                  >
                    {isStarted ? 'Continue' : 'Start Learning'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-display text-xl font-bold mb-2">
              More Languages Coming Soon!
            </h3>
            <p className="text-muted-foreground">
              We're constantly adding new languages and content. 
              Your progress is saved locally, so you can pick up right where you left off.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
