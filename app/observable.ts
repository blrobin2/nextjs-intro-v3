type OnNextFunction<T> = (x: T) => void | Event;
type OnErrorFunction = (e: Error) => void;
type OnCompletedFunction = () => void;
type DisposeFunction = () => void;

type Observer<T> = {
  onNext: OnNextFunction<T>;
  onError: OnErrorFunction;
  onCompleted: OnCompletedFunction;
};

type ForEachDisposal = {
  dispose: () => void;
};

type ForEachFunction<T> = (observer: Observer<T>) => ForEachDisposal;

const defaultOnError =
  <T>(observer: Observer<T>) =>
  (e: Error): void => {
    observer.onError(e);
  };

const defaultOnCompleted =
  <T>(observer: Observer<T>) =>
  (): void => {
    observer.onCompleted();
  };

class Observable<T> {
  constructor(private _forEach: ForEachFunction<T>) {}

  static fromEvent<T>(
    dom: HTMLElement,
    eventName: keyof HTMLElementEventMap
  ): Observable<T> {
    return new Observable(function forEach(observer: Observer<T>) {
      const handler = (e: Event) => observer.onNext(e as T);

      dom.addEventListener(eventName, handler);

      return {
        dispose: () => {
          dom.removeEventListener(eventName, handler);
        },
      };
    });
  }

  forEach(
    onNext: OnNextFunction<T> | Observer<T>,
    onError?: OnErrorFunction,
    onCompleted?: OnCompletedFunction
  ): ForEachDisposal {
    if (typeof onNext === "function") {
      return this._forEach({
        onNext: onNext,
        onError: onError || function () {},
        onCompleted: onCompleted || function () {},
      });
    }

    // onNext is { onNext: () =>  , onError: () => ... }
    return this._forEach(onNext);
  }

  map<U>(projectionFunction: (x: T) => U): Observable<U> {
    const self = this;
    return new Observable<U>((observer: Observer<U>) => {
      return self.forEach(
        function onNext(x: T): void {
          observer.onNext(projectionFunction(x));
        },
        defaultOnError(observer),
        defaultOnCompleted(observer)
      );
    });
  }

  filter(predicateFunction: (x: T) => boolean): Observable<T> {
    const self = this;
    return new Observable<T>((observer: Observer<T>) => {
      return self.forEach(
        function onNext(x: T): void {
          if (predicateFunction(x)) {
            observer.onNext(x);
          }
        },
        defaultOnError(observer),
        defaultOnCompleted(observer)
      );
    });
  }

  take(num: number): Observable<T> {
    const self = this;
    return new Observable<T>((observer: Observer<T>) => {
      let counter = 0;
      const subscription = self.forEach(
        (val: T) => {
          observer.onNext(val);
          counter++;
          if (counter === num) {
            observer.onCompleted();
            subscription.dispose();
          }
        },
        defaultOnError(observer),
        defaultOnCompleted(observer)
      );

      return subscription;
    });
  }
}

const fakeButton = document.getElementById("fakeButton");
if (fakeButton !== null) {
  const domObser = Observable.fromEvent<MouseEvent>(fakeButton, "click")
    .filter((e) => e.pageX > 40)
    .map((e) => e.pageX + "px")
    .take(3);

  domObser.forEach((x) => console.log(x)).dispose();
}
