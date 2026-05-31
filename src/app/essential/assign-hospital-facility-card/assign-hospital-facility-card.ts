import { Component, inject, input, OnInit, signal, output, WritableSignal, ModelSignal, model } from '@angular/core';
import { AssignHospitalFacility } from '../../api-service/assign-hospital-facility';
import { HospitalFacility } from '../../model/hospital-facility';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { firstValueFrom } from 'rxjs';
import { RowHospitalHead } from '../../model/hospital-head';

@Component({
  selector: 'app-assign-hospital-facility-card',
  imports: [
    Input,
    Button
  ],
  templateUrl: './assign-hospital-facility-card.html',
  styleUrl: './assign-hospital-facility-card.css',
})
export class AssignHospitalFacilityCard implements OnInit {
  private assignHospitalService: AssignHospitalFacility= inject(AssignHospitalFacility);

  public hospitalHeadId= input.required<number>();
  public outCancel= output<void>();
  public outAssign= output<RowHospitalHead>();

  protected facilities: WritableSignal<HospitalFacility[]>= signal([]);
  protected selectedFacilityId: WritableSignal<number | null>= signal(null);
  protected searchText: ModelSignal<string>= model<string>('');
  protected pageCurrentWhat: WritableSignal<number>= signal(0);
  protected pageTotalWhat: WritableSignal<number>= signal(0);
  private pageSize: number= 0;

  public async ngOnInit() {
    await this.loadFacilities(true);
  }

  private async loadFacilities(isInit: boolean= false) {
    const response= await this.assignHospitalService.getHospitalFacilities(isInit);
    if (response) {
      this.facilities.set(response.results);

      if (response.results.length > 0 && (isInit || this.pageCurrentWhat()=== 1)) {
        this.pageSize= response.results.length;
      }

      if (isInit) {
        this.pageCurrentWhat.set(response.results.length > 0 ? 1 : 0);
      }

      if (this.pageSize > 0) {
        this.pageTotalWhat.set(Math.ceil(response.count / this.pageSize));
      } else {
        this.pageTotalWhat.set(0);
      }
    }
  }

  protected async search() {
    const response= await this.assignHospitalService.searchHospitalFacilities(this.searchText());
    if (response) {
      this.facilities.set(response.results);
      if (response.results.length > 0) {
        this.pageSize= response.results.length; // Update page size based on search result page
        this.pageCurrentWhat.set(1);
        this.pageTotalWhat.set(Math.ceil(response.count / this.pageSize));
      } else {
        this.pageCurrentWhat.set(0);
        this.pageTotalWhat.set(0);
      }
    }
    this.selectedFacilityId.set(null);
  }

  protected async prev() {
    if (this.pageCurrentWhat() > 1) {
      await this.assignHospitalService.goPrevHospitalFacilities();
      await this.loadFacilities();
      this.pageCurrentWhat.update(v=> v - 1);
      this.selectedFacilityId.set(null);
    }
  }

  protected async next() {
    if (this.pageCurrentWhat() < this.pageTotalWhat()) {
      await this.assignHospitalService.goNextHospitalFacilities();
      await this.loadFacilities();
      this.pageCurrentWhat.update(v=> v + 1);
      this.selectedFacilityId.set(null);
    }
  }

  protected selectFacility(id: number) {
    this.selectedFacilityId.set(id);
  }

  protected cancel() {
    this.outCancel.emit();
  }

  protected async assign() {
    if (this.selectedFacilityId()) {
      try{
        const updatedHH: RowHospitalHead=await firstValueFrom(
          this.assignHospitalService
              .assignHospitalFacility2hospitalHead(
                this.selectedFacilityId()!,
                this.hospitalHeadId()
              )
        );
        this.outAssign.emit(updatedHH);
      }catch(err){}
    }
  }
}
