import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Brain, 
  Zap, 
  Clock, 
  Volume2,
  Shuffle,
  Grid3X3,
  ArrowRight,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Background3D from '@/components/Background3D';
import { isLoggedIn, getProgress, addXP, playSound, type UserProgress } from '@/lib/storage';

const games = [
  {
    id: 'word-match',
    title: 'Word Match',
    description: 'Match words with their translations as fast as you can!',
    icon: Shuffle,
    color: 'from-green-500 to-emerald-600',
    xpReward: 15,
  },
  {
    id: 'memory-cards',
    title: 'Memory Cards',
    description: 'Flip cards and find matching pairs to train your memory.',
    icon: Grid3X3,
    color: 'from-blue-500 to-cyan-600',
    xpReward: 20,
  },
  {
    id: 'speed-quiz',
    title: 'Speed Quiz',
    description: 'Answer questions before time runs out!',
    icon: Clock,
    color: 'from-orange-500 to-red-600',
    xpReward: 25,
  },
  {
    id: 'listening-game',
    title: 'Listening Game',
    description: 'Listen and identify the correct word or phrase.',
    icon: Volume2,
    color: 'from-purple-500 to-pink-600',
    xpReward: 20,
  },
];

interface MemoryCard {
  id: number;
  word: string;
  translation: string;
  isFlipped: boolean;
  isMatched: boolean;
  type: 'word' | 'translation';
}

const samplePairs = [
  { word: 'Hello', translation: 'Bonjour' },
  { word: 'Goodbye', translation: 'Au revoir' },
  { word: 'Thank you', translation: 'Merci' },
  { word: 'Please', translation: "S'il vous plaît" },
  { word: 'Yes', translation: 'Oui' },
  { word: 'No', translation: 'Non' },
];

export default function Games() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<any>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation('/login');
      return;
    }
    setProgress(getProgress());
  }, [setLocation]);

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    
    if (gameId === 'memory-cards') {
      const cards: MemoryCard[] = [];
      samplePairs.slice(0, 4).forEach((pair, idx) => {
        cards.push({
          id: idx * 2,
          word: pair.word,
          translation: pair.translation,
          isFlipped: false,
          isMatched: false,
          type: 'word',
        });
        cards.push({
          id: idx * 2 + 1,
          word: pair.word,
          translation: pair.translation,
          isFlipped: false,
          isMatched: false,
          type: 'translation',
        });
      });
      setGameState({
        cards: cards.sort(() => Math.random() - 0.5),
        flippedCards: [],
        moves: 0,
        matches: 0,
        isComplete: false,
      });
    } else if (gameId === 'speed-quiz') {
      setGameState({
        questions: samplePairs.map((pair, idx) => ({
          id: idx,
          question: `What is "${pair.word}" in French?`,
          answer: pair.translation,
          options: [pair.translation, ...samplePairs.filter(p => p !== pair).slice(0, 3).map(p => p.translation)].sort(() => Math.random() - 0.5),
        })),
        currentQuestion: 0,
        score: 0,
        timeLeft: 30,
        isComplete: false,
      });
    } else if (gameId === 'word-match') {
      const pairs = samplePairs.slice(0, 4);
      setGameState({
        leftColumn: pairs.map((p, i) => ({ id: i, text: p.word, matched: false })),
        rightColumn: pairs.map((p, i) => ({ id: i, text: p.translation, matched: false })).sort(() => Math.random() - 0.5),
        selectedLeft: null,
        selectedRight: null,
        matches: 0,
        isComplete: false,
      });
    } else if (gameId === 'listening-game') {
      setGameState({
        words: samplePairs.map((p, i) => ({ ...p, id: i })),
        currentWord: 0,
        score: 0,
        isComplete: false,
      });
    }
  };

  const handleMemoryCardClick = (cardId: number) => {
    if (!gameState || gameState.flippedCards.length >= 2) return;
    
    const card = gameState.cards.find((c: MemoryCard) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = gameState.cards.map((c: MemoryCard) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    
    const newFlipped = [...gameState.flippedCards, card];
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const isMatch = first.word === second.word && first.type !== second.type;
      
      setTimeout(() => {
        if (isMatch) {
          playSound('correct');
          const matchedCards = newCards.map((c: MemoryCard) =>
            c.word === first.word ? { ...c, isMatched: true, isFlipped: true } : c
          );
          const newMatches = gameState.matches + 1;
          const isComplete = newMatches === 4;
          
          if (isComplete) {
            playSound('complete');
            addXP(20);
            setProgress(getProgress());
          }
          
          setGameState({
            ...gameState,
            cards: matchedCards,
            flippedCards: [],
            moves: gameState.moves + 1,
            matches: newMatches,
            isComplete,
          });
        } else {
          playSound('wrong');
          const resetCards = newCards.map((c: MemoryCard) =>
            c.isMatched ? c : { ...c, isFlipped: false }
          );
          setGameState({
            ...gameState,
            cards: resetCards,
            flippedCards: [],
            moves: gameState.moves + 1,
          });
        }
      }, 1000);
    }
    
    setGameState({
      ...gameState,
      cards: newCards,
      flippedCards: newFlipped,
    });
  };

  const handleSpeedQuizAnswer = (answer: string) => {
    if (!gameState || gameState.isComplete) return;
    
    const correct = answer === gameState.questions[gameState.currentQuestion].answer;
    if (correct) {
      playSound('correct');
    } else {
      playSound('wrong');
    }
    
    const newScore = correct ? gameState.score + 1 : gameState.score;
    const nextQuestion = gameState.currentQuestion + 1;
    const isComplete = nextQuestion >= gameState.questions.length;
    
    if (isComplete) {
      playSound('complete');
      addXP(25);
      setProgress(getProgress());
    }
    
    setGameState({
      ...gameState,
      currentQuestion: nextQuestion,
      score: newScore,
      isComplete,
    });
  };

  const handleWordMatch = (side: 'left' | 'right', id: number) => {
    if (!gameState) return;
    
    if (side === 'left') {
      setGameState({ ...gameState, selectedLeft: id });
    } else {
      setGameState({ ...gameState, selectedRight: id });
    }
    
    const leftId = side === 'left' ? id : gameState.selectedLeft;
    const rightId = side === 'right' ? id : gameState.selectedRight;
    
    if (leftId !== null && rightId !== null) {
      const leftItem = gameState.leftColumn.find((i: any) => i.id === leftId);
      const rightItem = gameState.rightColumn.find((i: any) => i.id === rightId);
      
      if (leftItem && rightItem) {
        const pair = samplePairs.find(p => p.word === leftItem.text);
        const isMatch = pair?.translation === rightItem.text;
        
        if (isMatch) {
          playSound('correct');
          const newLeft = gameState.leftColumn.map((i: any) =>
            i.id === leftId ? { ...i, matched: true } : i
          );
          const newRight = gameState.rightColumn.map((i: any) =>
            i.id === rightId ? { ...i, matched: true } : i
          );
          const newMatches = gameState.matches + 1;
          const isComplete = newMatches === 4;
          
          if (isComplete) {
            playSound('complete');
            addXP(15);
            setProgress(getProgress());
          }
          
          setGameState({
            ...gameState,
            leftColumn: newLeft,
            rightColumn: newRight,
            selectedLeft: null,
            selectedRight: null,
            matches: newMatches,
            isComplete,
          });
        } else {
          playSound('wrong');
          setGameState({
            ...gameState,
            selectedLeft: null,
            selectedRight: null,
          });
        }
      }
    }
  };

  const exitGame = () => {
    setActiveGame(null);
    setGameState(null);
  };

  if (!progress) return null;

  return (
    <div className="min-h-screen bg-background">
      <Background3D />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeGame ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
                Educational Games
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Practice your language skills with fun, interactive games. 
                Earn XP while you play!
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => startGame(game.id)}
                  className="glass-card rounded-2xl p-6 cursor-pointer group"
                  data-testid={`game-${game.id}`}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <game.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {game.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">+{game.xpReward} XP</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 glass-card rounded-2xl p-8 text-center"
            >
              <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-display text-xl font-bold mb-2">
                Games help you learn faster!
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Studies show that gamified learning improves retention by up to 40%. 
                Play regularly to reinforce what you've learned in lessons.
              </p>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" onClick={exitGame} className="gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Exit Game
              </Button>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-bold">{progress.xp} XP</span>
              </div>
            </div>

            {activeGame === 'memory-cards' && gameState && (
              <div className="max-w-lg mx-auto">
                <h2 className="font-display text-2xl font-bold text-center mb-6">
                  Memory Cards
                </h2>
                
                {!gameState.isComplete ? (
                  <>
                    <p className="text-center text-muted-foreground mb-4">
                      Moves: {gameState.moves} | Matches: {gameState.matches}/4
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      {gameState.cards.map((card: MemoryCard) => (
                        <motion.button
                          key={card.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMemoryCardClick(card.id)}
                          className={`aspect-square rounded-xl font-medium text-sm p-2 transition-all ${
                            card.isFlipped || card.isMatched
                              ? card.isMatched
                                ? 'bg-green-100 text-green-700 border-2 border-green-500'
                                : 'bg-primary/10 text-primary border-2 border-primary'
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                          data-testid={`memory-card-${card.id}`}
                        >
                          {card.isFlipped || card.isMatched
                            ? card.type === 'word'
                              ? card.word
                              : card.translation
                            : '?'}
                        </motion.button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Congratulations!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Completed in {gameState.moves} moves
                    </p>
                    <div className="p-4 rounded-xl gradient-xp inline-block mb-6">
                      <span className="font-bold text-yellow-800">+20 XP</span>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={exitGame} className="flex-1">
                        Exit
                      </Button>
                      <Button 
                        className="flex-1 gradient-primary text-white"
                        onClick={() => startGame('memory-cards')}
                      >
                        Play Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeGame === 'speed-quiz' && gameState && (
              <div className="max-w-lg mx-auto">
                <h2 className="font-display text-2xl font-bold text-center mb-6">
                  Speed Quiz
                </h2>
                
                {!gameState.isComplete ? (
                  <>
                    <p className="text-center text-muted-foreground mb-4">
                      Question {gameState.currentQuestion + 1}/{gameState.questions.length}
                    </p>
                    <div className="glass-card rounded-2xl p-6 mb-4">
                      <h3 className="font-display text-xl font-bold text-center mb-6">
                        {gameState.questions[gameState.currentQuestion].question}
                      </h3>
                      <div className="space-y-3">
                        {gameState.questions[gameState.currentQuestion].options.map((option: string, i: number) => (
                          <Button
                            key={i}
                            variant="outline"
                            className="w-full h-12 text-left justify-start"
                            onClick={() => handleSpeedQuizAnswer(option)}
                            data-testid={`quiz-option-${i}`}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Quiz Complete!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Score: {gameState.score}/{gameState.questions.length}
                    </p>
                    <div className="p-4 rounded-xl gradient-xp inline-block mb-6">
                      <span className="font-bold text-yellow-800">+25 XP</span>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={exitGame} className="flex-1">
                        Exit
                      </Button>
                      <Button 
                        className="flex-1 gradient-primary text-white"
                        onClick={() => startGame('speed-quiz')}
                      >
                        Play Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeGame === 'word-match' && gameState && (
              <div className="max-w-lg mx-auto">
                <h2 className="font-display text-2xl font-bold text-center mb-6">
                  Word Match
                </h2>
                
                {!gameState.isComplete ? (
                  <>
                    <p className="text-center text-muted-foreground mb-4">
                      Match the words with their translations
                    </p>
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-3">
                        {gameState.leftColumn.map((item: any) => (
                          <button
                            key={item.id}
                            onClick={() => !item.matched && handleWordMatch('left', item.id)}
                            className={`w-full p-4 rounded-xl font-medium transition-all ${
                              item.matched
                                ? 'bg-green-100 text-green-700 border-2 border-green-500'
                                : gameState.selectedLeft === item.id
                                  ? 'bg-primary/10 border-2 border-primary'
                                  : 'bg-muted hover:bg-muted/80'
                            }`}
                            data-testid={`match-left-${item.id}`}
                          >
                            {item.text}
                          </button>
                        ))}
                      </div>
                      <div className="flex-1 space-y-3">
                        {gameState.rightColumn.map((item: any) => (
                          <button
                            key={item.id}
                            onClick={() => !item.matched && handleWordMatch('right', item.id)}
                            className={`w-full p-4 rounded-xl font-medium transition-all ${
                              item.matched
                                ? 'bg-green-100 text-green-700 border-2 border-green-500'
                                : gameState.selectedRight === item.id
                                  ? 'bg-primary/10 border-2 border-primary'
                                  : 'bg-muted hover:bg-muted/80'
                            }`}
                            data-testid={`match-right-${item.id}`}
                          >
                            {item.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h3 className="font-display text-2xl font-bold mb-2">
                      All Matched!
                    </h3>
                    <div className="p-4 rounded-xl gradient-xp inline-block mb-6">
                      <span className="font-bold text-yellow-800">+15 XP</span>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={exitGame} className="flex-1">
                        Exit
                      </Button>
                      <Button 
                        className="flex-1 gradient-primary text-white"
                        onClick={() => startGame('word-match')}
                      >
                        Play Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeGame === 'listening-game' && gameState && (
              <div className="max-w-lg mx-auto">
                <h2 className="font-display text-2xl font-bold text-center mb-6">
                  Listening Game
                </h2>
                
                {!gameState.isComplete ? (
                  <>
                    <p className="text-center text-muted-foreground mb-4">
                      Listen and select the correct translation
                    </p>
                    <div className="glass-card rounded-2xl p-6 text-center mb-6">
                      <Button
                        size="lg"
                        className="gradient-primary text-white"
                        onClick={() => {
                          const word = gameState.words[gameState.currentWord].word;
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance(word);
                            utterance.lang = 'en-US';
                            speechSynthesis.speak(utterance);
                          }
                        }}
                        data-testid="button-listen"
                      >
                        <Volume2 className="w-6 h-6 mr-2" />
                        Play Sound
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {gameState.words.slice(0, 4).map((word: any, i: number) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="w-full h-12"
                          onClick={() => {
                            const correct = word.id === gameState.words[gameState.currentWord].id;
                            if (correct) {
                              playSound('correct');
                              const next = gameState.currentWord + 1;
                              if (next >= gameState.words.length) {
                                playSound('complete');
                                addXP(20);
                                setProgress(getProgress());
                                setGameState({ ...gameState, isComplete: true, score: gameState.score + 1 });
                              } else {
                                setGameState({ ...gameState, currentWord: next, score: gameState.score + 1 });
                              }
                            } else {
                              playSound('wrong');
                            }
                          }}
                          data-testid={`listen-option-${i}`}
                        >
                          {word.translation}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Great Listening!
                    </h3>
                    <div className="p-4 rounded-xl gradient-xp inline-block mb-6">
                      <span className="font-bold text-yellow-800">+20 XP</span>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={exitGame} className="flex-1">
                        Exit
                      </Button>
                      <Button 
                        className="flex-1 gradient-primary text-white"
                        onClick={() => startGame('listening-game')}
                      >
                        Play Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
