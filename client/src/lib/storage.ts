export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface UserProgress {
  xp: number;
  streak: number;
  lastActivity: string;
  completedLessons: string[];
  languageProgress: Record<string, {
    level: number;
    lessonsCompleted: number;
    xpEarned: number;
  }>;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  xpEarned: number;
  completedAt: string;
}

const STORAGE_KEYS = {
  USER: 'lingualearn_user',
  SESSION: 'lingualearn_session',
  PROGRESS: 'lingualearn_progress',
  LESSONS: 'lingualearn_lessons',
  SETTINGS: 'lingualearn_settings',
};

export function getUser(): User | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
}

export function setUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function removeUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(STORAGE_KEYS.SESSION);
}

export function login(email: string, password: string): User | null {
  const users = getAllUsers();
  const user = users.find(u => u.email === email);
  if (user) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ userId: user.id, loggedInAt: new Date().toISOString() }));
    return user;
  }
  return null;
}

export function register(username: string, email: string, password: string): User {
  const users = getAllUsers();
  if (users.find(u => u.email === email)) {
    throw new Error('Email already exists');
  }
  
  const user: User = {
    id: crypto.randomUUID(),
    username,
    email,
    createdAt: new Date().toISOString(),
  };
  
  users.push(user);
  localStorage.setItem('lingualearn_users', JSON.stringify(users));
  
  const initialProgress: UserProgress = {
    xp: 0,
    streak: 0,
    lastActivity: new Date().toISOString(),
    completedLessons: [],
    languageProgress: {},
  };
  setProgress(user.id, initialProgress);
  
  setUser(user);
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ userId: user.id, loggedInAt: new Date().toISOString() }));
  
  return user;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

function getAllUsers(): User[] {
  const data = localStorage.getItem('lingualearn_users');
  return data ? JSON.parse(data) : [];
}

export function getProgress(userId?: string): UserProgress {
  const user = getUser();
  const id = userId || user?.id;
  if (!id) {
    return {
      xp: 0,
      streak: 0,
      lastActivity: new Date().toISOString(),
      completedLessons: [],
      languageProgress: {},
    };
  }
  
  const data = localStorage.getItem(`${STORAGE_KEYS.PROGRESS}_${id}`);
  return data ? JSON.parse(data) : {
    xp: 0,
    streak: 0,
    lastActivity: new Date().toISOString(),
    completedLessons: [],
    languageProgress: {},
  };
}

export function setProgress(userId: string, progress: UserProgress): void {
  localStorage.setItem(`${STORAGE_KEYS.PROGRESS}_${userId}`, JSON.stringify(progress));
}

export function addXP(amount: number, languageCode?: string): UserProgress {
  const user = getUser();
  if (!user) throw new Error('Not logged in');
  
  const progress = getProgress(user.id);
  progress.xp += amount;
  progress.lastActivity = new Date().toISOString();
  
  if (languageCode && progress.languageProgress[languageCode]) {
    progress.languageProgress[languageCode].xpEarned += amount;
  }
  
  const today = new Date().toDateString();
  const lastActivity = new Date(progress.lastActivity).toDateString();
  if (today !== lastActivity) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastActivity === yesterday.toDateString()) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
  }
  
  setProgress(user.id, progress);
  return progress;
}

export function completeLesson(lessonId: string, languageCode: string, xpEarned: number): UserProgress {
  const user = getUser();
  if (!user) throw new Error('Not logged in');
  
  const progress = getProgress(user.id);
  
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }
  
  if (!progress.languageProgress[languageCode]) {
    progress.languageProgress[languageCode] = {
      level: 1,
      lessonsCompleted: 0,
      xpEarned: 0,
    };
  }
  
  progress.languageProgress[languageCode].lessonsCompleted += 1;
  progress.languageProgress[languageCode].xpEarned += xpEarned;
  progress.xp += xpEarned;
  progress.lastActivity = new Date().toISOString();
  
  if (progress.languageProgress[languageCode].lessonsCompleted % 5 === 0) {
    progress.languageProgress[languageCode].level += 1;
  }
  
  setProgress(user.id, progress);
  return progress;
}

export function initializeLanguage(languageCode: string): void {
  const user = getUser();
  if (!user) return;
  
  const progress = getProgress(user.id);
  if (!progress.languageProgress[languageCode]) {
    progress.languageProgress[languageCode] = {
      level: 1,
      lessonsCompleted: 0,
      xpEarned: 0,
    };
    setProgress(user.id, progress);
  }
}

export function playSound(type: 'correct' | 'wrong' | 'complete' | 'click' | 'xp'): void {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch (type) {
    case 'correct':
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
    case 'wrong':
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
      break;
    case 'complete':
      oscillator.frequency.setValueAtTime(392, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.15);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.3);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.45);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.6);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.6);
      break;
    case 'click':
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.05);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.05);
      break;
    case 'xp':
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
      break;
  }
}
