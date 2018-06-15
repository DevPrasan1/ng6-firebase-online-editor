import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() currentUser;
  @Output() logout = new EventEmitter<void>();
  constructor() {}
  signout() {
    this.logout.emit();
  }
  ngOnInit() {}
}
