import {
  Wifi,
  Wind,
  UtensilsCrossed,
  Car,
  Sunset,
  Eye,
  WashingMachine,
  Tv,
  type LucideIcon,
} from 'lucide-react';

export const amenityIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  air_conditioning: Wind,
  kitchen: UtensilsCrossed,
  parking: Car,
  terrace: Sunset,
  balcony: Sunset,
  sea_view: Eye,
  washing_machine: WashingMachine,
  tv: Tv,
};
