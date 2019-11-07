import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  constructor(private documentService: DocumentsService) { }

  documents: Document[] = [];

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
    this.documents = this.documentService.getDocuments();
  }
}
