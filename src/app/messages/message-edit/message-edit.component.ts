import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  
  @ViewChild('subject', {static: false}) subject: ElementRef;
  @ViewChild('message' , {static: false}) msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor() { }
  
  ngOnInit() {
  }

  onSendMessage() {

  }

}
