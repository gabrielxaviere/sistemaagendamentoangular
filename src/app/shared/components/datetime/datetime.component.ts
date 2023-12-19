import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss']
})
export class DatetimeComponent {
  datetimeForm: FormGroup;
  hours: number[];
  minutes: number[];
  minDate: Date;
  maxDate: Date;
  @Input() disabledDates: Date[] = [];

  @Output() datetimeSelected = new EventEmitter<Date>();

  constructor(private fb: FormBuilder) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 2);

    this.hours = this.generateRange(8, 18);
    this.minutes = this.generateRange(0, 50, 10);

    this.datetimeForm = this.fb.group({
      date: [null, Validators.required],
      hour: [8, Validators.required],
      minute: [0, Validators.required],
    });

    console.log(this.minDate)
  }

  clearMinute(){
    this.datetimeForm.get('minute').reset();
  }

  dateFilter = (date: Date | null): boolean => {
    const day = date.getDay();

    return day !== 0 && day !== 6;
  }

  generateRange(start: number, end: number, step: number = 1): number[] {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  onDateTimeSelected(): void {
    console.log("adasdasd");
    const selectedDate = this.datetimeForm.get('date').value;
    const selectedHour = this.datetimeForm.get('hour').value;
    const selectedMinute = this.datetimeForm.get('minute').value;

    if (selectedDate && selectedHour !== null && selectedMinute !== null) {
      const selectedDatetime = new Date(selectedDate);
      selectedDatetime.setHours(selectedHour);
      selectedDatetime.setMinutes(selectedMinute);

      this.datetimeSelected.emit(selectedDatetime);
    }
  }

  isDateTimeDisabled(date: Date, hour: number, minute: number): boolean {
    if (!Array.isArray(this.disabledDates)) {
      return false; // Permite o campo se nenhuma data corresponder
    }

    const isNullOrInvalidDate = (d: Date) => d == null || !(d instanceof Date) || isNaN(d.getTime());

    return this.disabledDates.some(disabledDate => {
      try {

        const combinedDateTime = new Date(date);
        combinedDateTime.setHours(hour);
        combinedDateTime.setMinutes(minute);

        const parsedDate = new Date(disabledDate);

        var a = parsedDate.getTime() === combinedDateTime.getTime();

        if (a == true) {
          console.log("Data correta" + parsedDate)
          console.log("Data correta" + combinedDateTime)
          return true;
        } else {
          return false;
        }

      } catch (error) {
        // Emitir um evento ou lançar uma exceção para lidar com o erro
        console.error(`Erro ao processar data desabilitada: ${error}`);
        return false;
      }
    });
  }
}
