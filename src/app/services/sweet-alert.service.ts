declare var Swal: any;

export class SweetAlertService {

  constructor() { }

  public dialogAlertWait(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Esperé',
      text: 'Guardando información',
    });
    Swal.showLoading();
  }

  public dialogAlertSuccess(title: string){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      title,
      text: 'Se guardo correctamente',
    });
  }

  public dialogAlertError(title: string){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'error',
      title,
      text: 'Error al guardar',
    });
  }

  public dialogAlertQuestion(text: string){
    return Swal.fire({
      icon: 'question',
      title: '¿Esta Seguro?',
      text: `Esta seguro que desea borrar a ${text}`,
      showConfirmButton: true,
      showCancelButton: true
    });
  }
}
