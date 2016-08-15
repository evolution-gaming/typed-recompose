/// <reference path="typings/modules/react/index.d.ts" />

declare module "recompose" {
    import { ComponentClass, StatelessComponent, ValidationMap } from 'react';

    export interface HigherOrderComponent {
        // stolen from react-redux
        // export interface InferableComponentDecorator {
        //     <P, TComponentConstruct extends (ComponentClass<P>|StatelessComponent<P>)>(component: TComponentConstruct): TComponentConstruct;
        // }
        <P, TComponentConstruct extends (ComponentClass<P>|StatelessComponent<P>)>(component: TComponentConstruct): TComponentConstruct;
    }

    export function withContext<ContextProps, ComponentOwnProps>(
        childContextTypes: ValidationMap<ContextProps>,
        getChildContext: (props: ComponentOwnProps) => any): HigherOrderComponent;
}
