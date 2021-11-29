import { of, forkJoin } from 'rxjs'
import { delay, take } from 'rxjs/operators'

callServicesInParallelAndWaitForAllToComplete();

function callServicesInParallelAndWaitForAllToComplete() {
    // These are simple observables which return a single value just like an Angular HTTP service call
    let serviceA$ = of('A').pipe(take(1));
    let serviceB$ = of('B').pipe(take(1), delay(1000)); // make the 2nd call return slower than the others
    let serviceC$ = of('C').pipe(take(1));

    // forkjoin subscribes to all of the observables immediately but wait for all the results before calling the subscribe function
    // subscribe is only called once with the results passed in as an array in the same order as the observables were passed to forkJoin
    //
    // Results:
    //
    // ['A', 'B', 'C'] <-- with a 1 second delay waiting for B
    
    forkJoin(serviceA$, serviceB$, serviceC$)
        .subscribe(r => console.log(r));
}