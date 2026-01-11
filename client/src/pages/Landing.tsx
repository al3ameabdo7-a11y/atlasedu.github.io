import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  Users, 
  Zap, 
  Globe, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Brain,
  Headphones,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Background3D from '@/components/Background3D';
import { languages } from '@/lib/languages';

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Lessons',
    description: 'Master vocabulary, grammar, conversations, and pronunciation with structured lessons.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Gamepad2,
    title: '10+ Fun Games',
    description: 'Word puzzles, memory cards, speed quizzes, listening challenges, and much more!',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Trophy,
    title: 'Earn XP & Rewards',
    description: 'Track your progress, earn XP points, and maintain daily learning streaks.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Users,
    title: '100% Free Forever',
    description: 'No subscriptions, no paywalls, no ads. Quality education for everyone.',
    color: 'from-purple-500 to-pink-600',
  },
];

const lessonTypes = [
  { icon: BookOpen, title: 'Vocabulary', desc: '500+ words per language' },
  { icon: Brain, title: 'Grammar', desc: 'Essential rules & patterns' },
  { icon: MessageCircle, title: 'Conversations', desc: 'Real-world dialogues' },
  { icon: Headphones, title: 'Pronunciation', desc: 'Audio & speech practice' },
];

const benefits = [
  'No credit card required',
  'Works offline',
  'Progress saved locally',
  '8 languages available',
  'Gamified learning',
  'Instant feedback',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Background3D />
      <Navbar />

      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">100% Free Forever</span>
              </div>
              
              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Learn Languages
                <span className="block text-gradient">The Smart Way</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Master new languages with <strong>ATLAS EDU</strong>—gamified lessons, interactive exercises, 
                and educational games. No subscription needed—completely free and works offline!
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/register">
                  <Button 
                    size="lg" 
                    className="btn-3d gradient-primary text-white text-lg px-8 py-6 h-auto"
                    data-testid="button-get-started"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 h-auto"
                    data-testid="button-login-hero"
                  >
                    I Have an Account
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                {benefits.map((benefit) => (
                  <div 
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {benefit}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {languages.slice(0, 6).map((lang, i) => (
                  <motion.div
                    key={lang.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`glass-card rounded-2xl p-6 ${i % 2 === 0 ? 'mt-4' : ''}`}
                  >
                    <span className="text-4xl mb-3 block">{lang.flag}</span>
                    <h3 className="font-display text-lg font-bold">{lang.name}</h3>
                    <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full gradient-primary opacity-20 blur-3xl" />
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full gradient-secondary opacity-20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              Why Choose ATLAS EDU?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master a new language, without spending a dime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              Complete Learning Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From beginner to intermediate, we cover all aspects of language learning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {lessonTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              Choose Your Language
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start learning any of our 8 supported languages today!
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{lang.flag}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                      {lang.name}
                    </h3>
                    <p className="text-muted-foreground">{lang.nativeName}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{lang.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Globe className="w-16 h-16 mx-auto mb-6 text-primary animate-float" />
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners mastering new languages every day. 
              No signup fees, no hidden costs—just pure learning!
            </p>
            <Link href="/register">
              <Button 
                size="lg" 
                className="btn-3d gradient-primary text-white text-xl px-12 py-7 h-auto"
                data-testid="button-start-cta"
              >
                <Zap className="mr-2 w-6 h-6" />
                Start Learning Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-gradient">ATLAS EDU</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Free language learning for everyone. No backend required.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
