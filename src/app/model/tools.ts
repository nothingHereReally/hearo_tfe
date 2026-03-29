import { HttpHeaders } from '@angular/common/http';


export const httpRequestHeadersSendReceiveJson: HttpHeaders= new HttpHeaders({
  "Content-Type": "application/json",
  "Accept": "application/json",
})
export const httpRequestHeadersReceiveJson: HttpHeaders= new HttpHeaders({
   "Accept": "application/json"
});
export async function sleepAsync(ms: number, callback?: ()=>void): Promise<void>{
  return new Promise(resolve=> setTimeout(()=>{
    if(callback){
      callback();
    }
    resolve();
  }, ms));
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
