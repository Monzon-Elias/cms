import { Component, OnInit } from '@angular/core';
import { Document } from '../documents/document.model';
import { from } from 'rxjs';
@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedDocument: Document;
  
  constructor() { }

  ngOnInit() {
  }

}
