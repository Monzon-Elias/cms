import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(
      '1',
      'Cosa seria',
      'esto y lo otro',
      'Elios'
    ),
    new Message(
      '2',
      'El tema aquel',
      'No sabés lo que pasó!',
      'Lucho'
    )
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
