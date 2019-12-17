import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  id: string;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  subscription: Subscription;
  
  constructor(
    private documentsService: DocumentsService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          
          if(!this.id) {
            this.editMode = false;
            return;
          }
          
          this.originalDocument = this.documentsService.getDocument(this.id);

          if(!this.originalDocument) {
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        });
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const newDocument = new Document(
      '', 
      '', 
      values.name, 
      values.description, 
      values.url, 
      null);

    if(this.editMode) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
      } else {
        this.documentsService.addDocument(newDocument)
      }
      this.router.navigate(['/documents'], { relativeTo: this.route });
      this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
