import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  documents: Document[];

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.subscription = this.documentService.documentListChanged.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
    this.documentService.getDocuments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
