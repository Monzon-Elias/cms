import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

export class MessageEditComponent implements OnInit {
  currentSender = '1';
  
  @ViewChild('subject', {static: true}) subject: ElementRef;
  @ViewChild('msgText' , {static: true}) msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }
  
  ngOnInit() {
  }

  onSendMessage() {
    const id = '1';
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    let newMessage = new Message(id, subject, msgText, this.currentSender);
    console.log(newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
