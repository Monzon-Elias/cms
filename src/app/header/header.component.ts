import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cms-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {collapsed = true;

    @Output() selectedFeatureEvent = new EventEmitter<string>();
    
constructor() {}

onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
}
}