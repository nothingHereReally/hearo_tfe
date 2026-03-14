import { HttpHeaders } from '@angular/common/http';


export const headersSendReceiveJson: HttpHeaders= new HttpHeaders({
  "Content-Type": "application/json",
  "Accept": "application/json",
})
export const headersReceiveJson: HttpHeaders= new HttpHeaders({
   "Accept": "application/json"
});
