'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Reveal3DProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Scroll-triggered 3D entrance: rotates from slight tilt into flat view
export default function Reveal3D({ children, delay = 0, className }: Reveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <div ref={ref} className={className} style={{ perspective: '1200px' }}>
      <motion.div
        initial={{ opacity: 0, rotateX: 14, y: 40, scale: 0.97 }}
        animate={isInView ? { opacity: 1, rotateX: 0, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.85, delay, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ transformOrigin: 'top center' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
