declare module "recompose" {
    import * as React from 'react';
    export interface HigherOrderComponent {
        // stolen from react-redux
        // export interface InferableComponentDecorator {
        //     <P, TComponentConstruct extends (ComponentClass<P>|StatelessComponent<P>)>(component: TComponentConstruct): TComponentConstruct;
        // }
        <P, TComponentConstruct extends (React.ComponentClass<P>|React.StatelessComponent<P>)>(component: TComponentConstruct): TComponentConstruct;
    }

    export function withContext<ContextProps, ComponentOwnProps>(
        childContextTypes: React.ValidationMap<ContextProps>,
        getChildContext: (props: ComponentOwnProps) => any): HigherOrderComponent;
}
