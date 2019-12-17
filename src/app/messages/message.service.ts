import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private messages: Message[]=[];
  messageListChanged = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  //este bicho sustituye código que está alfinal de varios métodos
  sortAndSend() {
    this.messages.sort((a, b) => (a.sender > b.sender) ? 1 : ((b.sender > a.sender) ? -1 : 0));
    this.messageListChanged.next(this.messages.slice());
}

  getMessages(): any {
    this.http
    .get<{ message: string, messages: Message[] }>('http://localhost:3000/messages/')
    .subscribe(
       (messageData) => {
          this.messages = messageData.messages;
          this.sortAndSend();
       }, 
       (err: any) => {console.log(err);
       });
  }

  getMessage(id: string): Message {
    for(const message of this.messages) {
      if(message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    if(!message) {
    return;
    }

    //make sure id of the new document is empty
    message.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    //add to database, messageM due to duplication in the same line
    this.http.post<{ messageM: string, message: Message}>('http://localhost:3000/messages/'
    ,message
    ,{headers: headers})
      .subscribe(
        (responseData) => {
          //add new document to documents
          this.messages.push(responseData.message);
          this.sortAndSend();
        });
  }


}
