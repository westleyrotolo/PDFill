import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    CONFIRM_MODAL_TYPE,
    ConfirmOptions,
    ConfirmState,
    ModalGenericComponent
} from '../components/shared/modal-generic/modal-generic.component';



/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 * @link https://gist.github.com/jnizet/15c7a0ab4188c9ce6c79ca9840c71c4e#file-confirm-modal-and-service-ts-L1
 */

@Injectable()
export class ConfirmService {

    constructor(private modalService: NgbModal, private state: ConfirmState) { }

    private defaultModalSize: 'lg' | 'sm' = 'lg';
    /**
     * Opens a confirmation modal
     * @param options the options for the modal (title and message)
     * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
     * the user chooses not to confirm, or closes the modal
     */
    confirm(options: ConfirmOptions): Promise<any> {
        this.state.options = options;

        if (!options.size) {
            options.size = this.defaultModalSize;
        }

        this.createModal(options);

        return this.state.modal.result;
    }

    saveNotify(options: ConfirmOptions): Promise<any> {

        options.type = CONFIRM_MODAL_TYPE.continue;
        this.state.options = options;

        if (!options.size) {
            options.size = this.defaultModalSize;
        }

        this.createModal(options);
        return this.state.modal.result;
    }

    notify(options: ConfirmOptions, forceModal: boolean = true): Promise<any> {

        options.type = CONFIRM_MODAL_TYPE.notify;
        this.state.options = options;

        if (!options.size) {
            options.size = this.defaultModalSize;
        }

        if (!this.state.modal || forceModal) {
            this.createModal(options);
        }
        return this.state.modal.result;
    }

    private createModal(options: ConfirmOptions) {
        this.state.modal = this.modalService.open(ModalGenericComponent,
            { backdrop: 'static', size: (options.size ? options.size : this.defaultModalSize) });
    }
}