
/**
 * Overwrite one or more property in the interface.
 */
export type Modify<T, R> = Omit<T, keyof R> & R;
