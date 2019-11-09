import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  contacts: Contact[] = [];
  contactList: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.contactService.contactChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contactList = contactList;
      }
    )
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
