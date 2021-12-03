// A subject can act as a proxy between the source observable and many observers
// making it possible for multiple observers to share the same observable execution.

import { of, Subject, take, tap } from "rxjs";

// This is a simple observable which return a single value just like an Angular HTTP service call
let serviceA$ = of('A').pipe(tap(o => console.log('calling serviceA')), take(1));

// using a Subject allows multiple observers to subscribe to a single service call (multi-cast)
//
// Results:
//
// calling serviceA
// subscriber1 A
// subscriber2 A

const subject = new Subject();
subject.subscribe(o => console.log(`subscriber1`, o))
subject.subscribe(o => console.log(`subscriber2`, o))
serviceA$.subscribe(subject);

