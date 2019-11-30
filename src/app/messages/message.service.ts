import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
//import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messages: Message[]=[];
  messagesChangeEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {//this.messages = MOCKMESSAGES; 
  this.initMessages();
}

  initMessages(): any {
    this.http
    .get<Message[]>('https://cms-elias.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) => {
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      this.messages = this.messages.sort((a, b) => {
        if(a < b) return -1; else if(a > b) return 1; else return 0;
      });
      this.messagesChangeEvent.next(this.messages.slice());
    }, err => {console.log(`An error occurred ${err}`)}
    );
  }

  storeMessages() {
    const messages = this.messages;

    return this.http
    .put('https://cms-elias.firebaseio.com/messages.json', messages)
    .subscribe(
      response => {
        console.log(response);
        this.messagesChangeEvent.next(this.messages.slice());
      },
      err => {
        console.log(`An error occurred: ${err}`);
      }
    );
  }

  getMessage(id: string): Message {
    for(const message of this.messages) {
      if(message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    let currentId = 0;

    this.messages.forEach(message => {
      currentId = +message.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addMessage(newMessage: Message) {
    if(newMessage === undefined || newMessage === null) {
      return;
    }
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages();
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if(originalMessage === undefined || newMessage === undefined || originalMessage === null || newMessage === null) {
      return;
    }
    let pos = this.messages.indexOf(originalMessage);
    
    if(pos < 0) return;

    newMessage.id = originalMessage.id;
    this.messages[pos] = newMessage;
    this.storeMessages();
  }

  deleteMessage(message: Message) {
    if(message === null || message === undefined) {
      return;
    }
    const pos = this.messages.indexOf(message);

    if(pos < 0) return;
    
    this.messages.splice(pos, 1);
    this.storeMessages();
  }

}
