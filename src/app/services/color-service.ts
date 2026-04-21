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


  public readonly sc_100_rgb: Signal<string>= signal('#212121');
  public readonly sc_200_rgb: Signal<string>= signal('#2C2C2C');
  public readonly sc_300_rgb: Signal<string>= signal('#454545');
  public readonly sc_400_rgb: Signal<string>= signal('#5E5E5E');
  public readonly sc_500_rgb: Signal<string>= signal('#7B7B7B');
  public readonly sc_600_rgb: Signal<string>= signal('#989898');
  public readonly sc_700_rgb: Signal<string>= signal('#C6C6C6');
  public readonly sc_800_rgb: Signal<string>= signal('#DFDFDF');
  public readonly sc_900_rgb: Signal<string>= signal('#FAFAFA');


  public readonly tc1_100_rgb: Signal<string>= signal('#123410');
  public readonly tc1_200_rgb: Signal<string>= signal('#26671D');
  public readonly tc1_300_rgb: Signal<string>= signal('#37972C');
  public readonly tc1_400_rgb: Signal<string>= signal('#44BD35');
  public readonly tc1_500_rgb: Signal<string>= signal('#60CF51');
  public readonly tc1_600_rgb: Signal<string>= signal('#82D979');
  public readonly tc1_700_rgb: Signal<string>= signal('#A2E398');
  public readonly tc1_800_rgb: Signal<string>= signal('#C9EFC4');
  public readonly tc1_900_rgb: Signal<string>= signal('#EDF9EC');

  public readonly tc2_100_rgb: Signal<string>= signal('#002242');
  public readonly tc2_200_rgb: Signal<string>= signal('#004385');
  public readonly tc2_300_rgb: Signal<string>= signal('#0163C2');
  public readonly tc2_400_rgb: Signal<string>= signal('#0173E5');
  public readonly tc2_500_rgb: Signal<string>= signal('#178BFE');
  public readonly tc2_600_rgb: Signal<string>= signal('#49A5FE');
  public readonly tc2_700_rgb: Signal<string>= signal('#87C3FE');
  public readonly tc2_800_rgb: Signal<string>= signal('#BADDFE');
  public readonly tc2_900_rgb: Signal<string>= signal('#E9F4FF');

  public readonly tc3_100_rgb: Signal<string>= signal('#3F0C04');
  public readonly tc3_200_rgb: Signal<string>= signal('#761509');
  public readonly tc3_300_rgb: Signal<string>= signal('#A11E0C');
  public readonly tc3_400_rgb: Signal<string>= signal('#D7290E');
  public readonly tc3_500_rgb: Signal<string>= signal('#EE2F15');
  public readonly tc3_600_rgb: Signal<string>= signal('#F36652');
  public readonly tc3_700_rgb: Signal<string>= signal('#F69B8F');
  public readonly tc3_800_rgb: Signal<string>= signal('#FAC6BF');
  public readonly tc3_900_rgb: Signal<string>= signal('#FEEEEC');
}
