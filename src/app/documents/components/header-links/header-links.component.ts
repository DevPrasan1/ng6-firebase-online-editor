import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-links',
  templateUrl: './header-links.component.html',
  styleUrls: ['./header-links.component.scss']
})
export class HeaderLinksComponent implements OnInit {
@Output() logout = new EventEmitter<void>();
  constructor() { }
  signout(){
    this.logout.emit();
  }
  ngOnInit() {
  }

}
