import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

export class MessageEditComponent implements OnInit {
  currentSender = new Contact(
    "58c767386f1d58ebc37af1e9",
    "1",
    "Rex Barzee",
    "barzeer@byui.edu",
    "208-496-3768",
    "../assets/images/barzeer.jpg",
    null
  );
  
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
    let newMessage = new Message('', id, subject, msgText, this.currentSender);
    console.log(newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
