import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  ngOnInit() {
    //TODO: call getContacts() method from contactService
    
  }
onSelected(contact: Contact) {
  this.selectedContactEvent.emit(contact);
}
}
