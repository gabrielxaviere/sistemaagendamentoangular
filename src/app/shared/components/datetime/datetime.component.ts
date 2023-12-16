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
  @Input() disabledDates: Date[] = [];

  @Output() datetimeSelected = new EventEmitter<Date>();

  constructor(private fb: FormBuilder) {
    this.hours = this.generateRange(8, 18);
    this.minutes = this.generateRange(0, 50, 10);

    this.datetimeForm = this.fb.group({
      date: [null, Validators.required],
      hour: [8, Validators.required],
      minute: [0, Validators.required],
    });
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
    if (Array.isArray(this.disabledDates)) {
      return this.disabledDates.some(disabledDate => {
        try {
          if (disabledDate == null) {
            return false; // Pula para a próxima iteração se a data for nula ou indefinida
          }
  
          // Verifica se disabledDate é uma instância válida de Date
          const parsedDate = new Date(disabledDate);
  
          if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
            return false; // Pula para a próxima iteração se a data não for válida
          }
  
          // Ajusta a hora e os minutos conforme necessário
          parsedDate.setHours(hour);
          parsedDate.setMinutes(minute);
  
          // Compara as datas
          return parsedDate.getTime() === date.getTime();
        } catch (error) {
          console.error(`Erro ao processar data desabilitada: ${error}`);
          return false; // Pula para a próxima iteração se ocorrer um erro
        }
      });
    }
  
    return false; // Permite o campo se nenhuma data corresponder
  }
  
  
  
}
