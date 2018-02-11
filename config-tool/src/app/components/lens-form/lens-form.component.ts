import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-lens-form',
  templateUrl: './lens-form.component.html',
  styleUrls: ['./lens-form.component.scss']
})
export class LensFormComponent {
  @Input() lensGroup: FormGroup;
  @Input() indent: number;
  @Output() remove = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) {
  }

  createCheckpoint() {
    (<FormArray>this.lensGroup.get('checkpoints')).push(this._formBuilder.group({
      name: '',
      async: false,
      db: false
    }))
  }

  createLensItem() {
    (<FormArray>this.lensGroup.get('lens')).push(this._formBuilder.group({
      class: '',
      path: '',
      type: 'class',
      checkpoints: this._formBuilder.array([]),
      lens: this._formBuilder.array([])
    }))
  }

  removeLens() {
    this.remove.emit();
  }

  removeCheckpoint(i: number) {
    (<FormArray>this.lensGroup.get('checkpoints')).removeAt(i);
  }

  removeFromLenses(i: number) {
    (<FormArray>this.lensGroup.get('lens')).removeAt(i);
  }
}
