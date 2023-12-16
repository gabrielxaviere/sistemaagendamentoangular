import { SubscriptionLike } from "rxjs";

/**
 * Subscription sink that holds Observable subscriptions
 * until you call unsubscribe on it in ngOnDestroy.
 */
export class SubSink {
  protected _subs: SubscriptionLike[] = [];

  constructor() {}

  add(...subscriptions: SubscriptionLike[]) {
    this._subs = this._subs.concat(subscriptions);
  }
 
  set sink(subscription: SubscriptionLike) {
    this._subs.push(subscription);
  }

  unsubscribe() {
    this._subs.forEach((sub) => sub && sub.unsubscribe());
    this._subs = [];
  }
}
