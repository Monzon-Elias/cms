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
  private subscription: Subscription;

  constructor(private documentService: DocumentsService) { }

  documents: Document[] = [];
  documentsList: Document[];

  ngOnInit() {
    this.subscription = this.documentService.documentChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documentsList = documentsList;
      }
    );

    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
    this.documents = this.documentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
