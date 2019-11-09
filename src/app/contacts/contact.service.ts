import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() :Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for(const contact of this.contacts) {
      if(contact.id === id) {
        return contact;
      }
    }
  }

  getMaxId(): number {
    let maxId = 0;
    for(let contact of this.contacts) {
      if(parseInt(contact.id) > maxId) {
        maxId = parseInt(contact.id)
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if(newContact === undefined || newContact === null) {
      return
    }
    this.maxContactId++;
    newContact.id = stringify(this.maxContactId);
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(originalContact === undefined || newContact === undefined || originalContact === null || newContact === null) {
      return
    }
    let pos = this.contacts.indexOf(originalContact)
    if(pos < 0) {
      return
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if(contact === null || contact === undefined) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
  }
}
