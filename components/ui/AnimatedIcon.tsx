'use client';

import { m, useMotionValue, useSpring, type TargetAndTransition } from 'framer-motion';
import type { PointerEvent } from 'react';
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

  // Pointer-tracked 3D tilt — pure CSS transform (rotateX/rotateY), GPU-composited, no WebGL
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 });

  if (!Icon) return null;

  const hoverAnim: TargetAndTransition = hoverAnimations[iconKey] ?? { scale: 1.15 };

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -24);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <m.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={hoverAnim}
      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
      style={{ perspective: 300 }}
      className={className}
    >
      <m.div style={{ rotateX: springRotateX, rotateY: springRotateY }}>
        <Icon size={size} strokeWidth={1.5} />
      </m.div>
    </m.div>
  );
}
