
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    if (!dateString) return '';
    
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (error) {
    return dateString || '';
  }
}

export function formatTime(timeString: string): string {
  try {
    if (!timeString) return '';
    
    // If it already has the HH:MM format, return it
    if (timeString.includes(':')) {
      return timeString;
    }
    
    // If it's a number (like "14" for 2PM), convert to "14:00"
    const hour = parseInt(timeString);
    if (!isNaN(hour) && hour >= 0 && hour <= 23) {
      return `${hour.toString().padStart(2, '0')}:00`;
    }
    
    return timeString;
  } catch {
    return timeString || '';
  }
}
