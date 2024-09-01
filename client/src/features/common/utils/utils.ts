type ReadableItem = {
  read:number
}



  
  export const isLargeScreen = () => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    return mediaQuery.matches;
  }

  export function countUnreadItems(items:ReadableItem[]):number {
    let unreadCount = 0;
    
    for (const item of items) {
      if (!item.read) {
        unreadCount++;
      }
    }
    
    return unreadCount;
  }

  export function extractErrorCode(errorMessage:string):number|null {
    const regex = /status code (\d+)/;
    const match = errorMessage.match(regex); 
    if (match && match.length > 1) {
      return parseInt(match[1]); 
    }
    return null;
  }

  export const hasEmptyKey = (obj:any): boolean => {
    for (const key in obj) {
      if (!key||key==='') {
        return true;
      }
    }
    return false;
  };

  export const numberWithCommas = (number: number) => {
    const str = String(number);
    let formatted = '';
    if (str.length < 4)
      return str;
  
    for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
      formatted = str[i] + formatted;
      if (count % 3 === 2 && i !== 0) {
        formatted = ',' + formatted;
      }
    }
  
    return formatted;
  };


  export function daysFromToday(dateString: string): number {
    // Parse the input date string to a Date object
    const inputDate = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(inputDate.getTime())) {
      throw new Error('Invalid date format');
    }
  
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the difference in time (in milliseconds)
    const timeDifference = currentDate.getTime() - inputDate.getTime();
  
    // Convert the time difference from milliseconds to days
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return dayDifference;
  }
  
  