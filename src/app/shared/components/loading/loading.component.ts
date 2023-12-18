import { Component, Output, EventEmitter, Input, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loading: boolean = false;

  init() {
    this.loading = true;
  }

  stop() {
    this.loading = false;
  }
}
