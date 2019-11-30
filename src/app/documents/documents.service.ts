import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
//import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {

  documents: Document[]=[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChanged = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) { 
    //this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
    
  }

  getDocuments() {
    this.http
    .get<Document[]>('https://cms-elias.firebaseio.com/documents.json')
    .subscribe(
       (documents:Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents = this.documents.sort((a, b) => {
            if(a < b) return -1; else if(a > b) return 1; else return 0;
          });
          this.documentListChanged.next(this.documents.slice());
       }, err => {console.log(`An error occurred ${err}`)});
  }

  storeDocuments() {
    const documents = this.documents;

    return this.http
    .put('https://cms-elias.firebaseio.com/documents.json', documents)
    .subscribe(
      response => {
        console.log(response);
        this.documentListChanged.next(this.documents.slice());
      },
      err => {
        console.log(`An error occurred: ${err}`);
      }
    );
  }

  getDocument(id: string): Document {
    for(const document of this.documents) {
      if(document.id === id) {
        return document;
      }
    }
    return null;
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
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument === undefined || newDocument === undefined || originalDocument === null || newDocument === null) {
      return;
    }
    let pos = this.documents.indexOf(originalDocument);

    if(pos < 0) return;
    
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if(document === null || document === undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);

    if(pos < 0) return;
    
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }


}
