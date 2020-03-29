import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { IEmpresa } from '../interfaces/iempresa';
import { CreateOrUpdatePage } from '../create-or-update/create-or-update.page';
import { TareasService } from '../services/tareas.service';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage {

  empresa:IEmpresa;
  actualizado = false;

  constructor(private modalController:ModalController, navParams: NavParams,private tareasService: TareasService) {
    this.empresa = Object.assign(navParams.data);
  }

  dismiss() {
    this.modalController.dismiss({
      'actualizado': this.actualizado
    });
  }

  async presentEditModal(){
    const modal = await this.modalController.create({
      component: CreateOrUpdatePage,
      componentProps: this.empresa
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();

    if (data) {
      this.update(data);
      this.empresa = data;
      this.actualizado = true;
    }
  }


  update(empresa:IEmpresa){
    this.tareasService.updateEmpresa(empresa)
    .subscribe(resul => resul); 

  }

}
