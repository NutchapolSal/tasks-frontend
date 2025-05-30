export type PartialPick<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>

export type If<B extends boolean, T, F = null> = B extends true
    ? T
    : B extends false
      ? F
      : T | F
