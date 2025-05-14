
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    if (!dateString) return '-';
    
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    
    if (!isValid(date)) {
      return '-';
    }
    
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (error) {
    console.error("Error formatting date:", error);
    return '-';
  }
}

export function formatTime(timeString: string): string {
  try {
    if (!timeString) return '-';
    
    // Handle HH:MM:SS format
    if (timeString.includes(':')) {
      // Simple validation for time format
      const parts = timeString.split(':');
      if (parts.length >= 2) {
        const hour = parseInt(parts[0]);
        const minute = parseInt(parts[1]);
        
        if (isNaN(hour) || hour < 0 || hour > 23 || 
            isNaN(minute) || minute < 0 || minute > 59) {
          return '-';
        }
        
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      }
      return timeString;
    }
    
    // Handle numeric hour only
    const hour = parseInt(timeString);
    if (!isNaN(hour) && hour >= 0 && hour <= 23) {
      return `${hour.toString().padStart(2, '0')}:00`;
    }
    
    return '-';
  } catch (error) {
    console.error("Error formatting time:", error);
    return '-';
  }
}
