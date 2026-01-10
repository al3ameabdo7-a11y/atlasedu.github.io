import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Lock,
  Star,
  Zap,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Background3D from '@/components/Background3D';
import { isLoggedIn, getProgress, initializeLanguage, type UserProgress } from '@/lib/storage';
import { getLanguage, getLessonsForLanguage, type Lesson } from '@/lib/languages';

const lessonTypeIcons = {
  vocabulary: BookOpen,
  grammar: FileText,
  conversation: MessageSquare,
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function LanguageDetail() {
  const params = useParams<{ code: string }>();
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  const language = getLanguage(params.code || '');
  const lessons = getLessonsForLanguage(params.code || '');

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation('/login');
      return;
    }
    if (params.code) {
      initializeLanguage(params.code);
    }
    setProgress(getProgress());
  }, [setLocation, params.code]);

  if (!language || !progress) {
    return null;
  }

  const langProgress = progress.languageProgress[params.code || ''];
  const completedCount = lessons.filter(l => 
    progress.completedLessons.includes(l.id)
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Background3D />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/languages">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              All Languages
            </Button>
          </Link>

          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <span className="text-6xl">{language.flag}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-3xl font-bold">{language.name}</h1>
                  {langProgress && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <Star className="w-4 h-4" />
                      Level {langProgress.level}
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{language.description}</p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>{completedCount}</strong> / {lessons.length} lessons
                    </span>
                  </div>
                  {langProgress && (
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm">
                        <strong>{langProgress.xpEarned}</strong> XP earned
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">
                  {Math.round((completedCount / Math.max(lessons.length, 1)) * 100)}%
                </span>
              </div>
              <Progress 
                value={(completedCount / Math.max(lessons.length, 1)) * 100} 
                className="h-3" 
              />
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold mb-6">Lessons</h2>

          <div className="space-y-4">
            {lessons.map((lesson, i) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              const isLocked = i > 0 && !progress.completedLessons.includes(lessons[i - 1].id);
              const Icon = lessonTypeIcons[lesson.type];

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={isLocked ? '#' : `/lesson/${lesson.id}`}>
                    <div 
                      className={`glass-card rounded-2xl p-6 ${
                        isLocked 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'cursor-pointer group'
                      }`}
                      data-testid={`lesson-${lesson.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          isCompleted 
                            ? 'gradient-primary' 
                            : isLocked 
                              ? 'bg-muted' 
                              : 'bg-secondary/20'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-7 h-7 text-white" />
                          ) : isLocked ? (
                            <Lock className="w-6 h-6 text-muted-foreground" />
                          ) : (
                            <Icon className="w-6 h-6 text-secondary" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className={`font-display text-lg font-bold ${
                              !isLocked && 'group-hover:text-primary transition-colors'
                            }`}>
                              {lesson.title}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              difficultyColors[lesson.difficulty]
                            }`}>
                              {lesson.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {lesson.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground capitalize">
                              {lesson.type}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-600">
                              <Zap className="w-4 h-4" />
                              +{lesson.xpReward} XP
                            </span>
                          </div>
                        </div>

                        {!isLocked && (
                          <ArrowRight className={`w-5 h-5 ${
                            isCompleted 
                              ? 'text-primary' 
                              : 'text-muted-foreground group-hover:text-primary transition-colors'
                          }`} />
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {lessons.length === 0 && (
            <div className="glass-card rounded-2xl p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-display text-xl font-bold mb-2">
                Lessons Coming Soon!
              </h3>
              <p className="text-muted-foreground">
                We're working on adding more content for {language.name}.
                Check back soon!
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
