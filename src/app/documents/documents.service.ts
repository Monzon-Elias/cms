import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {

  private documents: Document[]=[];
  documentListChanged = new Subject<Document[]>();

  constructor(private http: HttpClient) {}

  //este bicho sustituye código que está alfinal de varios métodos
  sortAndSend() {
    this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.documentListChanged.next(this.documents.slice());
}

  getDocuments() {
    this.http
    .get<{ message: string, documents: Document[] }>('http://localhost:3000/documents/')
    .subscribe(
       (documentData) => {
          this.documents = documentData.documents;
          this.sortAndSend();
       }, 
       (err: any) => {console.log(err);
       });
  }

  getDocument(id: string): Document {
    for(const document of this.documents) {
      if(document.id === id) {
        return document;
      }
    }
    return null;
  }

  addDocument(document: Document) {
    if(!document) {
    return;
    }

    //make sure id of the new document is empty
    document.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    //add to database
    this.http.post<{ message: string, document: Document}>('http://localhost:3000/documents/'
    ,document
    ,{headers: headers})
      .subscribe(
        (responseData) => {
          //add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if(pos < 0 ){ //original document not in list
      return;
    }
    //set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //const strDocument = JSON.stringify(newDocument);

    this.http.put('http://localhost:3000/documents/' + originalDocument.id
    , newDocument
    , {headers: headers})
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        });
  }

  deleteDocument(document: Document) {

    if(!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if(pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos,1);
          this.sortAndSend();
        });
  }

}
