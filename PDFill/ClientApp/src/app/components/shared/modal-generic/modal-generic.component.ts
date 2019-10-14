
import {Component, OnInit, Injectable} from '@angular/core';
import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DeviceDetectorService} from 'ngx-device-detector';


export enum CONFIRM_MODAL_TYPE {
  confirm,
  notify,
  continue
}

/**
 * Options passed when opening a confirmation modal
 */
export interface ConfirmOptions {
  /**
   * The title of the confirmation modal
   */
  title?: string,

  /**
   * The message in the confirmation modal
   */
  message: string,

  /**
   * The size of the confirmation modal
   */
  size?: 'sm' | 'lg'

  /**
   * The type of the confirmation modal
   */
  type?: CONFIRM_MODAL_TYPE
}

/**
 * An internal service allowing to access, from the confirm modal component, the options and the modal reference.
 * It also allows registering the TemplateRef containing the confirm modal component.
 *
 * It must be declared in the providers of the NgModule, but is not supposed to be used in application code
 */
@Injectable()
export class ConfirmState {
  /**
   * The last options passed ConfirmService.confirm()
   */
  options: ConfirmOptions;

  /**
   * The last opened confirmation modal
   */
  modal: NgbModalRef;

  constructor() {}
}

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.css']
})
/**
 * The component displayed in the confirmation modal opened by the ConfirmService.
 */
export class ModalGenericComponent implements OnInit {

  CONFIRM_MODAL_TYPE: typeof CONFIRM_MODAL_TYPE = CONFIRM_MODAL_TYPE;
  options: ConfirmOptions;
  isMobile = false;

  constructor(
    private state: ConfirmState,
    private activeModal: NgbActiveModal,
    private deviceService: DeviceDetectorService
  ) {
    this.options = state.options;

    /*
    * Default values
    * */
    if (!this.options.type) {
      this.options.type = CONFIRM_MODAL_TYPE.confirm
    }
  }

  yes() {
    this.activeModal.close(true);

  }

  no() {
    this.activeModal.close(false);
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

}
