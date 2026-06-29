'use client';

import { motion, type TargetAndTransition } from 'framer-motion';
import {
  Wifi, Wind, UtensilsCrossed, Car, Sunset, Eye, WashingMachine, Tv,
  Waves, Footprints, Castle,
  type LucideIcon,
} from 'lucide-react';

// Icon registry — resolved internally so Server Components can pass a plain string
const iconRegistry: Record<string, LucideIcon> = {
  // Amenities
  wifi:             Wifi,
  air_conditioning: Wind,
  kitchen:          UtensilsCrossed,
  parking:          Car,
  terrace:          Sunset,
  balcony:          Sunset,
  sea_view:         Eye,
  washing_machine:  WashingMachine,
  tv:               Tv,
  // Experiences
  sea:      Waves,
  hikes:    Footprints,
  villages: Castle,
  food:     UtensilsCrossed,
};

// Per-key hover animation config
const hoverAnimations: Record<string, TargetAndTransition> = {
  wifi:             { scale: 1.25, opacity: 0.8 },
  air_conditioning: { rotate: 90,  scale: 1.1  },
  kitchen:          { scale: 1.2,  rotate: -8  },
  parking:          { scale: 1.15, y: -2       },
  terrace:          { scale: 1.2,  rotate: 12  },
  balcony:          { scale: 1.2,  rotate: 12  },
  sea_view:         { scale: 1.2,  y: -4       },
  washing_machine:  { rotate: 180, scale: 1.1  },
  tv:               { scale: 1.15, opacity: 0.8 },
  sea:              { y: -5,       scale: 1.15  },
  hikes:            { y: -4,       scale: 1.1   },
  villages:         { scale: 1.15, rotate: 5   },
  food:             { rotate: -12, scale: 1.1  },
};

interface AnimatedIconProps {
  iconKey: string;
  size?: number;
  className?: string;
}

export default function AnimatedIcon({ iconKey, size = 24, className }: AnimatedIconProps) {
  const Icon = iconRegistry[iconKey];
  if (!Icon) return null;

  const hoverAnim: TargetAndTransition = hoverAnimations[iconKey] ?? { scale: 1.15 };

  return (
    <motion.div
      whileHover={hoverAnim}
      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
      className={className}
    >
      <Icon size={size} strokeWidth={1.5} />
    </motion.div>
  );
}
