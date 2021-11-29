import { concat, of } from 'rxjs'
import { take } from 'rxjs/operators'

callServicesSequentially();

function callServicesSequentially() {
    // These are simple observables which return a single value just like an Angular HTTP service call
    let serviceA$ = of('A').pipe(take(1));
    let serviceB$ = of('B').pipe(take(1));
    let serviceC$ = of('C').pipe(take(1));

    // concat subscribes to the first observable and waits for it to complete before subscribing to the next one
    // subscribe is called for each result in the order in which they were passed to concat
    //
    // Results:
    //
    // A
    // B
    // C
    
    concat(serviceA$, serviceB$, serviceC$)
        .subscribe(r => console.log(r));
}