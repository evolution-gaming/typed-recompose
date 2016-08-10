declare module "recompose" {
    import * as React from 'react';
    type HocToHoc<T> = (cmp: T) => T;
    export function withContext<P, T>(
        childContextTypes: React.ValidationMap<P>,
        getChildContext: (props: P) => any
    ): HocToHoc<T>;

    export function withContext(): void;
}
