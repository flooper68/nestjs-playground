import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IEvent } from '../interfaces';

/**
 * Filter values depending on their instance type (comparison is made
 * using native `instanceof`).
 *
 * @param types List of types implementing `IEvent`.
 *
 * @return A stream only emitting the filtered instances.
 */
export function ofType<TOutput extends IEvent = never>(type: string) {
  return (source: Observable<IEvent>): Observable<TOutput> =>
    source.pipe(
      filter((event) => event.type === type),
    ) as unknown as Observable<TOutput>;
}
