import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null
  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please Wait! we are updating your clip.'
  @Output() update = new EventEmitter()

  clipID = new FormControl('')

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  editForm = new FormGroup({
    title: this.title
  })

  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ) { }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy() {
    this.modal.unregister('editClip')
  }

  ngOnChanges() {
    if (!this.activeClip) {
      return
    }

    this.inSubmission = false
    this.showAlert = false
    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  async submit() {
    if (!this.activeClip) {
      return
    }
    this.alertColor = 'blue'
    this.inSubmission = true
    this.showAlert = true
    this.alertMsg = 'Please Wait! we are updating your clip.'

    try {
      await this.clipService.updateClip(
        this.clipID.value, this.title.value
      )
    } catch (e) {
      this.alertColor = 'red'
      this.inSubmission = false
      this.alertMsg = 'Something Went Wrong! try again later'
      return
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)

    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success!'
  }


}
