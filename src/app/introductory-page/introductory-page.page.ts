import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introductory-page',
  templateUrl: './introductory-page.page.html',
  styleUrls: ['./introductory-page.page.scss'],
})
export class IntroductoryPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public handleTapIGetIt(): void {
    this.router.navigate(['/home']);
  }

}
