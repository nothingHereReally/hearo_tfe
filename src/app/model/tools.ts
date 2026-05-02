import { HttpHeaders } from '@angular/common/http';


export const httpRequestHeadersSendReceiveJson: HttpHeaders= new HttpHeaders({
  "Content-Type": "application/json",
  "Accept": "application/json",
})
export const httpRequestHeadersReceiveJson: HttpHeaders= new HttpHeaders({
   "Accept": "application/json"
});
export const dateTimeFormatOption: Intl.DateTimeFormatOptions = {
    weekday: 'long',            /* Full day name, e.g. "Monday" */
    year: 'numeric',            /* Year as numeric */
    month: 'long',              /* Full month name, e.g. "July" */
    day: 'numeric',             /* Day of the month */
    hour: 'numeric',            /* Hour (12-hour format is default in some locales) */
    minute: 'numeric',          /* Minute */
    hour12: true,               /* AM/PM */
    timeZone: 'Asia/Singapore', /* for UTC+8 philippine time */
};




export async function sleepAsync(ms: number, callback?: ()=>void): Promise<void>{
  return new Promise(resolve=> setTimeout(()=>{
    if(callback){
      callback();
    }
    resolve();
  }, ms));
}




export function sumArray(arr: Array<number>): number{
  return arr.reduce((a, b)=> a+b, 0);
}




export function isEmailFormat(email: string): boolean{
  const emailRegex: RegExp= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!email) return false;

  return emailRegex.test(email);
}




export function hasSpace(wordStr: string): boolean{
  const hasSpaceRegExp: RegExp= /\s/;
  if(!wordStr) return false;

  return hasSpaceRegExp.test(wordStr);
}




export function allAreSpace(wordStr: string): boolean{
  const hasSpaceRegExp: RegExp= /^\s+$/;
  if(!wordStr) return false;

  return hasSpaceRegExp.test(wordStr);
}
