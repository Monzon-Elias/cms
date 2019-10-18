import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = 'Jhon';

  @ViewChild('subject', {static: false}) subject: ElementRef;
  @ViewChild('message' , {static: false}) msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }
  
  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    let newMessage = new Message('1', subject, msgText, this.currentSender);
    console.log(newMessage);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    let newMessage = new Message('1', '', '', this.currentSender);

    this.addMessageEvent.emit(newMessage);
  }

}
