import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
//import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[]=[];
  maxContactId: number;

  constructor(private http: HttpClient) { 
    //this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http
    .get<Contact[]>('https://cms-elias.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      this.contacts = this.contacts.sort((a, b) => {
        if(a < b) return -1; else if(a > b) return 1; else return 0;
      });
      this.contactListChangedEvent.next(this.contacts.slice());
    }, err => {console.log(`An error occurred ${err}`)}
    );
  }

  storeContacts() {
    const contacts = this.contacts;

    return this.http
    .put('https://cms-elias.firebaseio.com/contacts.json', contacts)
    .subscribe(
      response => {
        console.log(response);
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      err => {
        console.log(`An error occurred: ${err}`);
      }
    );
  }

  getContact(id: string): Contact {
    for(const contact of this.contacts) {
      if(contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    let currentId = 0;

    this.contacts.forEach(contact => {
      currentId = +contact.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addContact(newContact: Contact) {
    if(newContact === undefined || newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(originalContact === undefined || newContact === undefined || originalContact === null || newContact === null) {
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    
    if(pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if(contact === null || contact === undefined) {
      return;
    }
    const pos = this.contacts.indexOf(contact);

    if(pos < 0) return;
    
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

}
