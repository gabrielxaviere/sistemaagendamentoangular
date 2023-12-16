import { Injectable, OnDestroy } from '@angular/core';
import { SubSink } from './sub-sink';

/**
 * A class that automatically unsubscribes all observables when the object gets destroyed
 */
@Injectable()
export class UnsubscribeOnDestroyAdapter implements OnDestroy {
 
  subs = new SubSink();
 
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
