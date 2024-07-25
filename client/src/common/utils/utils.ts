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

  export const numberWithCommas = (number: number):string => {
    const str = String(number);
    let formatted = '';
  
    for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
      formatted = str[i] + formatted;
      if (count % 3 === 2 && i !== 0) {
        formatted = ',' + formatted;
      }
    }
  
    return formatted;
  };
  