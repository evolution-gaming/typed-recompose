declare module 'recompose' {
    import { ComponentLifecycle, ComponentClass, StatelessComponent, ValidationMap } from 'react';

    interface ComponentDecorator<TOriginalProps, TOwnProps> {
        (component: ComponentClass<TOriginalProps> | StatelessComponent<TOriginalProps>)
            : ComponentClass<TOwnProps>;
    }

    /**
     * Decorator that infers the type from the original component
     *
     * Can't use the above decorator because it would default the type to {}
     */
    export interface InferableComponentDecorator {
        <P, TComponentConstruct extends (ComponentClass<P> | StatelessComponent<P>)>
        (component: TComponentConstruct): TComponentConstruct;
    }

    export function withContext<ContextProps, ComponentOwnProps>(
        childContextTypes: ValidationMap<ContextProps>,
        getChildContext: (props: ComponentOwnProps) => any
    ): InferableComponentDecorator;

    export function mapProps<TNeededProps, TMappedProps, TChildProps>(
        propsMapper: (props: TNeededProps) => TMappedProps
    ): ComponentDecorator<TChildProps, TNeededProps>;

    export function withProps<TOriginalProps, TOwnProps>(
        createProps: (props: TOriginalProps) => TOriginalProps & TOwnProps | TOwnProps
    ): ComponentDecorator<TOriginalProps, TOriginalProps & TOwnProps>;

    export function pure<P, TComponentConstruct extends (ComponentClass<P> | StatelessComponent<P>)>
        (component: TComponentConstruct): TComponentConstruct;

    export function onlyUpdateForKeys(propKeys: Array<string>): InferableComponentDecorator;

    export function onlyUpdateForPropTypes(): InferableComponentDecorator;

    export function setPropTypes<TOwnProps>(
        propTypes: ValidationMap<TOwnProps>
    ): ComponentDecorator<{}, TOwnProps>;

    export function getContext<TOriginalProps, TContextProps>(
        contextTypes: ValidationMap<TContextProps>
    ): ComponentDecorator<TOriginalProps, TOriginalProps & TContextProps>;

    export function componentFromProp<TOriginalProps>(propName: string)
        : ComponentClass<TOriginalProps>;

    export function defaultProps(props: {}): InferableComponentDecorator;

    export function withState<TOriginalProps, TOwnProps>(
        stateName: string,
        stateUpdaterName: string,
        initialState: (props: Object) => any | any
    ): ComponentDecorator<TOriginalProps, TOwnProps>;

    type HandlerCreators = { [handlerName: string]: (props: Object) => Function }
    export function withHandlers<TOriginalProps, TNextProps>(
        handlerCreators: HandlerCreators
    ): ComponentDecorator<TOriginalProps, TNextProps>;

    export function lifecycle<P, S>(spec: ComponentLifecycle<P, S>): InferableComponentDecorator;

    export function compose<TOriginalProps, TNextProps>(
        ...functions: Array<Function>
    ): ComponentDecorator<TOriginalProps, TNextProps>;

    /**
     * Higher-order component version of shouldComponentUpdate(). The test
     * function accepts both the current props and the next props.
     */
    export function shouldUpdate<TProps>(
        test: (props: TProps, nextProps: TProps) => boolean
    ): ComponentDecorator<TProps, TProps>;

    export function renameProp<TOldProps, TNewProps>(
        oldName: string,
        newName: string
    ): ComponentDecorator<TOldProps, TNewProps>;

    export function renameProps<TOldProps, TNewProps>(
        nameMap: { [key: string]: string }
    ): ComponentDecorator<TOldProps, TNewProps>;
}
