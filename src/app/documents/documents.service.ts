import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() :Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for(const document of this.documents) {
      if(document.id === id) {
        return document;
      }
    }
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      if (parseInt(document.id) > maxId) {
        maxId = parseInt(document.id);
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if(newDocument === undefined || newDocument === null) {
    return;
    }
    this.maxDocumentId++;
    newDocument.id = stringify(this.maxDocumentId);
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument === undefined || newDocument === undefined || originalDocument === null || newDocument === null) {
      return
    }
    let pos = this.documents.indexOf(originalDocument)
    if(pos < 0) {
      return
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if(document === null || document === undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);
  }


}
