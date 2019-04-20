import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.page.html',
  styleUrls: ['./my-offers.page.scss'],
})
export class MyOffersPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  constructor() { }

  ngOnInit() {
    this.segment.value = 'applied';
  }

  /**
   * @description Tiene como objetivo manejar los cambios de los segmentos o secciones de "mis ofertas aplicadas"
   *              y "mis ofertas confirmadas"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-18
   * @param event
   * @returns void
   */
  public handleSegmentChanges(event): void {
    const segmentValue = event.detail.value;
  }

  /**
   * @description Tiene como objetivo manejar el refresh cuando se desliza la pantalla hacia arriba
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-18
   * @param event
   * @returns void
   */
  public handleSlideDownRefresh(event): void {
    setTimeout( () => {
      event.target.complete();
    }, 3000);
  }

}
