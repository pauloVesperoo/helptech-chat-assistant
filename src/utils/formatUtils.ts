
/**
 * Format a date string to a more readable format
 * @param dateStr Date string in ISO format or any valid date format
 * @returns Formatted date string in DD/MM/YYYY format, or empty string if invalid
 */
export const formatDate = (dateStr: string | Date): string => {
  if (!dateStr) return '';
  
  try {
    const date = new Date(dateStr);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a time string to a more readable format
 * @param timeStr Time string in HH:MM format
 * @returns Formatted time string, or the original if already formatted
 */
export const formatTime = (timeStr: string): string => {
  if (!timeStr) return '';
  
  // If already in HH:MM format, return as is
  if (/^\d{1,2}:\d{2}$/.test(timeStr)) {
    return timeStr;
  }
  
  try {
    // Try to parse as date if it's a date object string
    const date = new Date(timeStr);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
  } catch (error) {
    console.error('Error formatting time:', error);
  }
  
  return timeStr;
};
