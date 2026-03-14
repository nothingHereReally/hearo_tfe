import { HttpHeaders } from '@angular/common/http';


export const httpRequestHeadersSendReceiveJson: HttpHeaders= new HttpHeaders({
  "Content-Type": "application/json",
  "Accept": "application/json",
})
export const httpRequestHeadersReceiveJson: HttpHeaders= new HttpHeaders({
   "Accept": "application/json"
});
