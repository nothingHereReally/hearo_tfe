import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public readonly pc1_100_rgb: Signal<string>= signal('#0D3027');
  public readonly pc1_200_rgb: Signal<string>= signal('#195848');
  public readonly pc1_300_rgb: Signal<string>= signal('#278B70');
  public readonly pc1_400_rgb: Signal<string>= signal('#2EA684');
  public readonly pc1_500_rgb: Signal<string>= signal('#35BF9B');
  public readonly pc1_600_rgb: Signal<string>= signal('#60D2B4');
  public readonly pc1_700_rgb: Signal<string>= signal('#8ADEC7');
  public readonly pc1_800_rgb: Signal<string>= signal('#C2EDE3');
  public readonly pc1_900_rgb: Signal<string>= signal('#F4FCF9');

  public readonly pc2_100_rgb: Signal<string>= signal('#11341F');
  public readonly pc2_200_rgb: Signal<string>= signal('#1C5534');
  public readonly pc2_300_rgb: Signal<string>= signal('#2A804E');
  public readonly pc2_400_rgb: Signal<string>= signal('#3AAE6B');
  public readonly pc2_500_rgb: Signal<string>= signal('#57C785');
  public readonly pc2_600_rgb: Signal<string>= signal('#81D5A3');
  public readonly pc2_700_rgb: Signal<string>= signal('#A2E1BA');
  public readonly pc2_800_rgb: Signal<string>= signal('#BEE8D0');
  public readonly pc2_900_rgb: Signal<string>= signal('#F4FBF7');

  public readonly pc3_100_rgb: Signal<string>= signal('#363106');
  public readonly pc3_200_rgb: Signal<string>= signal('#605B0B');
  public readonly pc3_300_rgb: Signal<string>= signal('#998A10');
  public readonly pc3_400_rgb: Signal<string>= signal('#C6B315');
  public readonly pc3_500_rgb: Signal<string>= signal('#E9D326');
  public readonly pc3_600_rgb: Signal<string>= signal('#EDDD53');
  public readonly pc3_700_rgb: Signal<string>= signal('#F1E683');
  public readonly pc3_800_rgb: Signal<string>= signal('#F7EFB1');
  public readonly pc3_900_rgb: Signal<string>= signal('#FDFCF1');
}
