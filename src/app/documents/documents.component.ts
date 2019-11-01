import { Component, OnInit } from '@angular/core';
import { Document } from '../documents/document.model';
import { from } from 'rxjs';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent implements OnInit {

  selectedDocument: Document;
  
  constructor( private documentService: DocumentsService) { }

  ngOnInit() {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

}
