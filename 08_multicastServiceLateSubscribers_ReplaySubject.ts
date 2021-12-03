// A subject can act as a proxy between the source observable and many observers
// making it possible for multiple observers to share the same observable execution.

import { of, ReplaySubject, take, tap } from "rxjs";

// This is a simple observable which return a single value just like an Angular HTTP service call
let serviceA$ = of('A').pipe(tap(o => console.log('calling serviceA')), take(1));

// using a ReplaySubject allows multiple observers to subscribe to a single service call (multi-cast)
// but also supports 'late subcribers' where the subscription occurs after the service call has been completed 
//
// Results:
//
// calling serviceA
// subscriber1 A
// subscriber2 A
const subject = new ReplaySubject();
serviceA$.subscribe(subject);

// observers subscribe after service call is complete
subject.subscribe(o => console.log(`subscriber1`, o))
subject.subscribe(o => console.log(`subscriber2`, o))

