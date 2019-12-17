import { Component, OnInit} from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  document: Document;
  nativeWindow: any;
  id: string;
  subscription: Subscription;

  constructor(
    private documentsService: DocumentsService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentsService.getDocument(this.id);
        });
  }

  // onEditDocument() {
  //   this.router.navigate(['edit'], {relativeTo: this.route});
  // }

  onView() {
    if(this.document.url) {this.nativeWindow.open(this.document.url)}
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document)
    this.router.navigateByUrl('/documents', {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
