import { HttpHeaders } from '@angular/common/http';


export const httpHeadersSendReceiveJson: HttpHeaders= new HttpHeaders({
  "Content-Type": "application/json",
  "Accept": "application/json",
})
export const httpHeadersReceiveJson: HttpHeaders= new HttpHeaders({
   "Accept": "application/json"
});
