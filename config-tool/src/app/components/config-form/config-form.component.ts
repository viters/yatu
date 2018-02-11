import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

const dialog = require('electron').remote.dialog;
const fs = require('fs');

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent implements OnInit {
  @Input() config: object;

  configForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.configForm = this._formBuilder.group({
      testCases: this._formBuilder.array([])
    });
  }

  createTestCase() {
    (<FormArray>this.configForm.get('testCases')).push(this._buildTestCaseFormGroup());
  }

  createLensForTestCase(testCase: FormGroup) {
    (<FormArray>testCase.get('lens')).push(this._buildLensFormGroup());
  }

  removeTestCase(i: number) {
    (<FormArray>this.configForm.get('testCases')).removeAt(i);
  }

  removeFromLenses(testCase: FormGroup, i: number) {
    (<FormArray>testCase.get('lens')).removeAt(i);
  }

  save() {
    try {
      dialog.showSaveDialog({
        defaultPath: 'tests',
        filters: [{
          name: 'json',
          extensions: ['json']
        }]
      }, (filename) => {
        fs.writeFile(filename, JSON.stringify(this.configForm.get('testCases').value), {encoding: 'utf-8'},(err) => {
          if (err) {
            dialog.showErrorBox('Error while saving file', err);
          } else {
            alert('JSON file has been saved!');
          }
        });
      });
    } catch (e) {
      //
    }
  }
  clear() {
    this.configForm.reset();
    (<FormArray>this.configForm.get('testCases')).controls = [];
  }

  private _buildTestCaseFormGroup() {
    return this._formBuilder.group({
      class: '',
      entry: this._formBuilder.group({
        name: '',
        args: '',
        async: false,
        db: false
      }),
      path: '',
      lens: this._formBuilder.array([])
    });
  }

  private _buildLensFormGroup() {
    return this._formBuilder.group({
      class: '',
      path: '',
      checkpoints: this._formBuilder.array([]),
      lens: this._formBuilder.array([])
    })
  }
}
