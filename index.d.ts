declare module "recompose" {
    import * as React from 'react';
    export type HigherOrderComponent<T> = (cmp: T) => T;

    export function withContext<ContextProps, ComponentOwnProps, Component>(
        childContextTypes: React.ValidationMap<ContextProps>,
        getChildContext: (props: ComponentOwnProps) => any): HigherOrderComponent<Component>;
}
