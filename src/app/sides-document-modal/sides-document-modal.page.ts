import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CardDocument } from '../interfaces/own/cardDocument.interface';
import { BehaviorSideDocument } from '../interfaces/own/behaviorSideDocument.interface';
import { SideDocument } from '../interfaces/own/sideDocument.interface';

@Component({
  selector: 'app-sides-document-modal',
  templateUrl: './sides-document-modal.page.html',
  styleUrls: ['./sides-document-modal.page.scss'],
})
export class SidesDocumentModalPage implements OnInit {

  public cardDocument: CardDocument;
  public sides: SideDocument[];
  public behavior: BehaviorSideDocument;


  constructor(private navParams: NavParams) {
    this.cardDocument = this.navParams.get('cardDocument');
    this.behavior = this.navParams.get('behavior');
    this.sides = this.cardDocument.sides;
  }

  ngOnInit() {
  }

  public handleTapButtonCamera(): void {
    this.behavior.handleTapButtonCamera(this.cardDocument);
  }

}
