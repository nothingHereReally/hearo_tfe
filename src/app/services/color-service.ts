import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public readonly pc1_100_rgb: Signal<string>= signal('rgba(13, 48, 39, 1.0)');
  public readonly pc1_200_rgb: Signal<string>= signal('rgba(25, 88, 72, 1.0)');
  public readonly pc1_300_rgb: Signal<string>= signal('rgba(39, 139, 112, 1.0)');
  public readonly pc1_400_rgb: Signal<string>= signal('rgba(46, 166, 132, 1.0)');
  public readonly pc1_500_rgb: Signal<string>= signal('rgba(53, 191, 155, 1.0)');
  public readonly pc1_600_rgb: Signal<string>= signal('rgba(96, 210, 180, 1.0)');
  public readonly pc1_700_rgb: Signal<string>= signal('rgba(138, 222, 199, 1.0)');
  public readonly pc1_800_rgb: Signal<string>= signal('rgba(194, 237, 227, 1.0)');
  public readonly pc1_900_rgb: Signal<string>= signal('rgba(244, 252, 249, 1.0)');


  public readonly pc2_100_rgb: Signal<string>= signal('rgba(17, 52, 31, 1.0)');
  public readonly pc2_200_rgb: Signal<string>= signal('rgba(28, 85, 52, 1.0)');
  public readonly pc2_300_rgb: Signal<string>= signal('rgba(42, 128, 78, 1.0)');
  public readonly pc2_400_rgb: Signal<string>= signal('rgba(58, 174, 107, 1.0)');
  public readonly pc2_500_rgb: Signal<string>= signal('rgba(87, 199, 133, 1.0)');
  public readonly pc2_600_rgb: Signal<string>= signal('rgba(129, 213, 163, 1.0)');
  public readonly pc2_700_rgb: Signal<string>= signal('rgba(162, 225, 186, 1.0)');
  public readonly pc2_800_rgb: Signal<string>= signal('rgba(190, 232, 208, 1.0)');
  public readonly pc2_900_rgb: Signal<string>= signal('rgba(244, 251, 247, 1.0)');


  public readonly pc3_100_rgb: Signal<string>= signal('rgba(54, 49, 6, 1.0)');
  public readonly pc3_200_rgb: Signal<string>= signal('rgba(96, 91, 11, 1.0)');
  public readonly pc3_300_rgb: Signal<string>= signal('rgba(153, 138, 16, 1.0)');
  public readonly pc3_400_rgb: Signal<string>= signal('rgba(198, 179, 21, 1.0)');
  public readonly pc3_500_rgb: Signal<string>= signal('rgba(233, 211, 38, 1.0)');
  public readonly pc3_600_rgb: Signal<string>= signal('rgba(237, 221, 83, 1.0)');
  public readonly pc3_700_rgb: Signal<string>= signal('rgba(241, 230, 131, 1.0)');
  public readonly pc3_800_rgb: Signal<string>= signal('rgba(247, 239, 177, 1.0)');
  public readonly pc3_900_rgb: Signal<string>= signal('rgba(253, 252, 241, 1.0)');
}
