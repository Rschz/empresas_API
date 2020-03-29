import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { IEmpresa } from '../interfaces/iempresa';
import { TareasService } from "../services/tareas.service";

@Component({
  selector: 'app-create-or-update',
  templateUrl: './create-or-update.page.html',
  styleUrls: ['./create-or-update.page.scss'],
})
export class CreateOrUpdatePage {
  empresa:IEmpresa = {
    empresaID:0,
    nombre:"",
    correo:"",
    direccion:"",
    postal:""
  };

  constructor(private modalController:ModalController, private tareasService: TareasService, private navParams:NavParams) {
    this.empresa = Object.assign(navParams.data);
   }


  dismiss() {
    this.modalController.dismiss();
  }

  submitForm() {
    this.modalController.dismiss(this.empresa);
  }

}
