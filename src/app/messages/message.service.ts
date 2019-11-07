import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[];
  messagesChangeEvent = new EventEmitter<Message[]>();

  constructor() {this.messages = MOCKMESSAGES;}

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messagesChangeEvent.emit(this.messages.slice());
  }
}
