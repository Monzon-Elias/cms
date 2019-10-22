import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'Elios',
      'What kind of description do you like?',
      'http://jodete.com',
      null
    ),
    new Document(
      '2',
      'Jhon',
      'This will be a long description...',
      'http://jodeteotravez.com',
      null
    ),
    new Document(
      '3',
      'Pepe',
      'Una descripción de cajetilla!',
      'http://jodetemas.com',
      null
    )
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
