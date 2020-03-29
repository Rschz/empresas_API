import { Component } from '@angular/core';
import { TareasService } from "../services/tareas.service";
import { IEmpresa } from "../interfaces/iempresa";
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { EmpresaPage } from '../empresa/empresa.page';
import { CreateOrUpdatePage } from '../create-or-update/create-or-update.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  valorBusc:string;
  empresas:IEmpresa[];
  empresasAll:IEmpresa[];
  notFound = true;
  constructor(
    private tareasService: TareasService,
    private modalController: ModalController,
    private alertController: AlertController,
    private platform:Platform
  ) {
    this.getAll();
  }

  async presentModal(empresa:IEmpresa) {
    const modal = await this.modalController.create({
      component: EmpresaPage,
      componentProps: empresa
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();

    if (data.actualizado) {
      this.getAll();
      this.valorBusc = "";
    }

  }

  async presentModalAdd() {

    const modal = await this.modalController.create({
      component: CreateOrUpdatePage
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();

    this.add(data);
    
  }

  async presentAlertMultipleButtons(id:string) {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      subHeader: 'Eliminar...',
      message: '¿Seguro que desea eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          }
        }, {
          text: 'Ok',
          handler: () => {
              this.tareasService.deleteEmpresa(id).subscribe(() => 
                {
                  document.getElementById(`item${id}`).remove();
                  this.getAll();
                });
            
          }
        }
      ]
    });

   await alert.present();
  }

  getAll(){
    this.tareasService.getAll()
    .subscribe(empresas => {
      this.empresasAll = empresas;
    });
  }

  getEmpresa(id:string){
    this.tareasService.getEmpresa(id)
    .subscribe(empresa => {
      console.log(empresa);
    });
  }

  add(empresa:IEmpresa){
    this.tareasService.addEmpresa(empresa)
    .subscribe(() => this.getAll());
  }

  delete(id:string){
     this.presentAlertMultipleButtons(id);
  }



  empresasFilter(){
    if (this.valorBusc) {
      const resul = Object.assign([], this.empresasAll).filter(
        item => item.empresaID == this.valorBusc || item.nombre.toLowerCase().indexOf(this.valorBusc.toLowerCase()) > -1
      );
  
      resul.length > 0 ? this.notFound = false : this.notFound = true; 
      
      this.empresas = resul;
      
    }else{
      this.empresas=[];
      this.notFound = true;
    }

  }

}
