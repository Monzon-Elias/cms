import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private contacts: Contact[]=[];
  contactListChanged = new Subject<Contact[]>();

  constructor(private http: HttpClient) {}

  //este bicho sustituye código que está alfinal de varios métodos
  sortAndSend() {
    this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.contactListChanged.next(this.contacts.slice());
}

  getContacts() {
    this.http
    .get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts/')
    .subscribe(
       (contactData) => {
          this.contacts = contactData.contacts;
          this.sortAndSend();
       }, 
       (err: any) => {console.log(err);
       });
  }

  getContact(id: string): Contact {
    for(const contact of this.contacts) {
      if(contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  addContact(contact: Contact) {
    if(!contact) {
    return;
    }

    //make sure id of the new document is empty
    contact.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    //add to database
    this.http.post<{ message: string, contact: Contact}>('http://localhost:3000/contacts/'
    ,contact
    ,{headers: headers})
      .subscribe(
        (responseData) => {
          //add new document to documents
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if(pos < 0 ){ //original document not in list
      return;
    }
    //set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/contacts/' + originalContact.id
    , newContact
    , {headers: headers})
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        });
  }

  deleteContact(contact: Contact) {

    if(!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if(pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos,1);
          this.sortAndSend();
        });
  }

}

