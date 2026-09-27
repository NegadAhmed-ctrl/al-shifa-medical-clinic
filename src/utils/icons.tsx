import {
  Stethoscope,
  Smile,
  Sparkles,
  Baby,
  HeartPulse,
  Bone,
  FlaskConical,
  MessageCircleQuestion,
  type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Smile,
  Sparkles,
  Baby,
  HeartPulse,
  Bone,
  FlaskConical,
  MessageCircleQuestion,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Stethoscope
}
