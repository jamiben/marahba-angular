import { FormGroup } from "@angular/forms";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";

export class GlobalGenericValitator {

  constructor(

    private validatorMessages: { [key: string]: {[key: string]: string} }
  ){}

  public createErrorMessage(container: FormGroup): { [key: string]: string } {
    const errorMessages = {};

    for(const controlName in container.controls ) {
      if(container.controls.hasOwnProperty(controlName)) {

        const selectedcontrol = container.controls[controlName];

        if(this.validatorMessages[controlName]){
          errorMessages[controlName] = " ";

          if((selectedcontrol.dirty || selectedcontrol.touched) && selectedcontrol.errors){
            Object.keys(selectedcontrol.errors).map((errorMessagesKey: string) => {

              if(this.validatorMessages[controlName][errorMessagesKey]){
                errorMessages[controlName] += this.validatorMessages[controlName][errorMessagesKey] + ' '
              }

            })
          }
        }
      }
    }

  return errorMessages;
  }
}
