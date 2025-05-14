
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (error) {
    return dateString;
  }
}

export function formatTime(timeString: string): string {
  try {
    if (timeString.includes(':')) {
      return timeString;
    }
    const hour = parseInt(timeString);
    if (!isNaN(hour)) {
      return `${hour}:00`;
    }
    return timeString;
  } catch {
    return timeString;
  }
}
