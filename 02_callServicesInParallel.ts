import { of, merge } from 'rxjs'
import { delay, take } from 'rxjs/operators'

callServicesInParallel();

function callServicesInParallel() {
    // These are simple observables which return a single value just like an Angular HTTP service call
    let serviceA$ = of('A').pipe(take(1));
    let serviceB$ = of('B').pipe(take(1), delay(1000)); // make the 2nd call return slower than the others
    let serviceC$ = of('C').pipe(take(1));

    // merge subscribes to each observable immediately
    // subscribe is called for each result in the order in which they complete
    //
    // Results:
    //
    // A
    // C
    // B <-- 1 second later
    
    merge(serviceA$, serviceB$, serviceC$)
        .subscribe(r => console.log(r));
}