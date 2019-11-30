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

  subscription: Subscription;
  contacts: Contact[] = [];
  term: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  onKeyPress(value: string) {
    this.term = value;
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
