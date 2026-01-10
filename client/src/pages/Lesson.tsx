import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  Volume2,
  Zap,
  BookOpen,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Background3D from '@/components/Background3D';
import { 
  isLoggedIn, 
  getProgress, 
  completeLesson, 
  playSound,
  type UserProgress 
} from '@/lib/storage';
import { getLesson, getLanguage, type Exercise } from '@/lib/languages';

type LessonPhase = 'vocabulary' | 'exercises' | 'complete';

export default function Lesson() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [phase, setPhase] = useState<LessonPhase>('vocabulary');
  const [vocabIndex, setVocabIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [fillAnswer, setFillAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  const lesson = getLesson(params.id || '');
  const language = lesson ? getLanguage(lesson.languageCode) : null;

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation('/login');
      return;
    }
    setProgress(getProgress());
  }, [setLocation]);

  if (!lesson || !language || !progress) {
    return null;
  }

  const vocabulary = lesson.content.vocabulary || [];
  const exercises = lesson.content.exercises || [];
  const currentVocab = vocabulary[vocabIndex];
  const currentExercise = exercises[exerciseIndex];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lesson.languageCode === 'en' ? 'en-US' : 
                       lesson.languageCode === 'fr' ? 'fr-FR' :
                       lesson.languageCode === 'es' ? 'es-ES' :
                       lesson.languageCode === 'de' ? 'de-DE' :
                       lesson.languageCode === 'it' ? 'it-IT' :
                       lesson.languageCode === 'ja' ? 'ja-JP' :
                       lesson.languageCode === 'zh' ? 'zh-CN' :
                       lesson.languageCode === 'ar' ? 'ar-SA' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextVocab = () => {
    if (vocabIndex < vocabulary.length - 1) {
      setVocabIndex(vocabIndex + 1);
    } else {
      setPhase('exercises');
    }
  };

  const checkAnswer = () => {
    const answer = currentExercise.type === 'fill-blank' ? fillAnswer.trim().toLowerCase() : selectedAnswer;
    const correct = Array.isArray(currentExercise.correctAnswer)
      ? currentExercise.correctAnswer.includes(answer)
      : currentExercise.correctAnswer.toLowerCase() === answer.toLowerCase();
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      playSound('correct');
      setEarnedXP(prev => prev + currentExercise.xpReward);
    } else {
      playSound('wrong');
    }
  };

  const handleNextExercise = () => {
    setShowResult(false);
    setSelectedAnswer('');
    setFillAnswer('');
    
    if (exerciseIndex < exercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      const finalXP = earnedXP + lesson.xpReward;
      setTotalXP(finalXP);
      completeLesson(lesson.id, lesson.languageCode, finalXP);
      playSound('complete');
      setPhase('complete');
    }
  };

  const overallProgress = phase === 'vocabulary' 
    ? ((vocabIndex + 1) / (vocabulary.length + exercises.length)) * 100
    : phase === 'exercises'
      ? ((vocabulary.length + exerciseIndex + 1) / (vocabulary.length + exercises.length)) * 100
      : 100;

  return (
    <div className="min-h-screen bg-background">
      <Background3D />
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <Link href={`/language/${lesson.languageCode}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Exit
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold" data-testid="earned-xp">+{earnedXP} XP</span>
            </div>
          </div>

          <Progress value={overallProgress} className="h-3 mb-8" />

          <AnimatePresence mode="wait">
            {phase === 'vocabulary' && currentVocab && (
              <motion.div
                key={`vocab-${vocabIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Vocabulary</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {vocabIndex + 1} / {vocabulary.length}
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h2 className="font-display text-4xl font-bold mb-4">
                    {currentVocab.word}
                  </h2>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 mb-4"
                    onClick={() => speak(currentVocab.word)}
                    data-testid="button-pronounce"
                  >
                    <Volume2 className="w-5 h-5" />
                    Listen
                  </Button>

                  <p className="text-lg text-muted-foreground mb-2">
                    {currentVocab.pronunciation}
                  </p>
                  
                  <div className="p-4 rounded-xl bg-muted/50 mb-4">
                    <p className="text-xl font-medium">{currentVocab.translation}</p>
                  </div>

                  <p className="text-muted-foreground italic">
                    "{currentVocab.example}"
                  </p>
                </div>

                <Button
                  className="w-full btn-3d gradient-primary text-white h-14 text-lg"
                  onClick={handleNextVocab}
                  data-testid="button-next-vocab"
                >
                  {vocabIndex < vocabulary.length - 1 ? 'Next Word' : 'Start Exercises'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {phase === 'exercises' && currentExercise && (
              <motion.div
                key={`exercise-${exerciseIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium text-secondary">Exercise</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {exerciseIndex + 1} / {exercises.length}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold mb-6 text-center">
                  {currentExercise.question}
                </h2>

                {currentExercise.type === 'multiple-choice' && (
                  <div className="space-y-3 mb-6">
                    {currentExercise.options?.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => !showResult && setSelectedAnswer(option)}
                        disabled={showResult}
                        className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                          showResult
                            ? option === currentExercise.correctAnswer
                              ? 'bg-green-100 border-2 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : selectedAnswer === option
                                ? 'bg-red-100 border-2 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-wrong'
                                : 'bg-muted opacity-50'
                            : selectedAnswer === option
                              ? 'bg-primary/10 border-2 border-primary'
                              : 'bg-muted hover:bg-muted/80'
                        }`}
                        data-testid={`option-${i}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {currentExercise.type === 'fill-blank' && (
                  <div className="mb-6">
                    <Input
                      value={fillAnswer}
                      onChange={(e) => setFillAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      disabled={showResult}
                      className={`h-14 text-lg text-center ${
                        showResult
                          ? isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : ''
                      }`}
                      data-testid="input-answer"
                    />
                    {showResult && !isCorrect && (
                      <p className="text-center mt-2 text-muted-foreground">
                        Correct answer: <strong>{currentExercise.correctAnswer}</strong>
                      </p>
                    )}
                  </div>
                )}

                {currentExercise.type === 'true-false' && (
                  <div className="flex gap-4 mb-6">
                    {['true', 'false'].map((option) => (
                      <button
                        key={option}
                        onClick={() => !showResult && setSelectedAnswer(option)}
                        disabled={showResult}
                        className={`flex-1 p-4 rounded-xl font-medium transition-all ${
                          showResult
                            ? option === currentExercise.correctAnswer
                              ? 'bg-green-100 border-2 border-green-500 text-green-700'
                              : selectedAnswer === option
                                ? 'bg-red-100 border-2 border-red-500 text-red-700 animate-wrong'
                                : 'bg-muted opacity-50'
                            : selectedAnswer === option
                              ? 'bg-primary/10 border-2 border-primary'
                              : 'bg-muted hover:bg-muted/80'
                        }`}
                        data-testid={`option-${option}`}
                      >
                        {option === 'true' ? 'True' : 'False'}
                      </button>
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
                        isCorrect
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="font-bold text-green-700 dark:text-green-400">
                              Correct! +{currentExercise.xpReward} XP
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-red-600" />
                          <div>
                            <p className="font-bold text-red-700 dark:text-red-400">
                              Not quite right
                            </p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {!showResult ? (
                  <Button
                    className="w-full btn-3d gradient-primary text-white h-14 text-lg"
                    onClick={checkAnswer}
                    disabled={!selectedAnswer && !fillAnswer}
                    data-testid="button-check"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    className="w-full btn-3d gradient-secondary text-white h-14 text-lg"
                    onClick={handleNextExercise}
                    data-testid="button-continue"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </motion.div>
            )}

            {phase === 'complete' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-24 h-24 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="font-display text-3xl font-bold mb-2">
                  Lesson Complete!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Great job finishing "{lesson.title}"
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-xl gradient-xp mb-6"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Zap className="w-8 h-8 text-yellow-700" />
                    <span className="font-display text-4xl font-bold text-yellow-800">
                      +{totalXP} XP
                    </span>
                  </div>
                </motion.div>

                <div className="flex gap-4">
                  <Link href={`/language/${lesson.languageCode}`} className="flex-1">
                    <Button variant="outline" className="w-full h-12">
                      Back to Lessons
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="flex-1">
                    <Button className="w-full h-12 btn-3d gradient-primary text-white">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
