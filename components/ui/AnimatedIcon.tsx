'use client';

import { motion, type TargetAndTransition } from 'framer-motion';
import {
  Wifi, Wind, UtensilsCrossed, Car, Sunset, Eye, WashingMachine, Tv,
  Waves, Footprints, Castle,
  Microwave, Coffee, Shirt, Zap, BedDouble, Package, Heart, Map, Sparkles,
  type LucideIcon,
} from 'lucide-react';

// Icon registry — resolved internally so Server Components can pass a plain string
const iconRegistry: Record<string, LucideIcon> = {
  // Amenities — physical features
  wifi:             Wifi,
  air_conditioning: Wind,
  kitchen:          UtensilsCrossed,
  parking:          Car,
  terrace:          Sunset,
  balcony:          Sunset,
  sea_view:         Eye,
  washing_machine:  WashingMachine,
  tv:               Tv,
  // Amenities — appliances & equipment
  microwave:        Microwave,
  coffee:           Coffee,
  iron:             Shirt,
  hair_dryer:       Zap,
  linen:            BedDouble,
  wardrobe:         Package,
  cleaning_kit:     Sparkles,
  // Amenities — services
  personal_welcome: Heart,
  local_tips:       Map,
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
  microwave:        { scale: 1.15, rotate: 5   },
  coffee:           { scale: 1.2,  y: -2       },
  iron:             { scale: 1.15, rotate: -5  },
  hair_dryer:       { scale: 1.2,  rotate: 15  },
  linen:            { scale: 1.15, y: -2       },
  wardrobe:         { scale: 1.15, rotate: 5   },
  cleaning_kit:     { scale: 1.2,  rotate: 10  },
  personal_welcome: { scale: 1.25, opacity: 0.8 },
  local_tips:       { scale: 1.15, y: -3       },
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
