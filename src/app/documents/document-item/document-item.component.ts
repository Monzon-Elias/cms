import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  id: string;
  @Input() document: Document;

  constructor() { }

  ngOnInit() {
  }

}
