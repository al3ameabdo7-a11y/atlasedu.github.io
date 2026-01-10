import { useRef, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function FallbackBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-primary/20 blur-3xl"
        style={{ top: '10%', left: '10%' }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-secondary/20 blur-3xl"
        style={{ top: '60%', right: '15%' }}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-accent/20 blur-2xl"
        style={{ bottom: '20%', left: '30%' }}
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-20 h-20 rounded-full gradient-xp opacity-30 blur-2xl"
        style={{ top: '40%', left: '60%' }}
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-36 h-36 rounded-full bg-primary/10 blur-3xl"
        style={{ top: '5%', right: '25%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function Background3D() {
  const [webglSupported, setWebglSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  return <FallbackBackground />;
}
