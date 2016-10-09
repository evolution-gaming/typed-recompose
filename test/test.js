"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var test = require('blue-tape');
var recompose = require('recompose');
var StatelessCmp = function (props) {
    return React.createElement("div", null, props.bar);
};
var Cmp = (function (_super) {
    __extends(Cmp, _super);
    function Cmp() {
        _super.apply(this, arguments);
    }
    Cmp.prototype.render = function () {
        return React.createElement("div", null, this.props.nProp);
    };
    return Cmp;
}(React.Component));
test('withContext', function (t) {
    var withContext = recompose.withContext;
    t.equal(typeof withContext, 'function', 'withContext is a function');
    var withContextFactory = withContext({ fooFn: React.PropTypes.object }, function () { return ({ fooFn: function () { } }); });
    var StatelessCmpContainsContext = withContextFactory(StatelessCmp);
    // <StatelessCmpContainsContext />
    // TS2324: Property 'bar' is missing in type ...
    React.createElement(StatelessCmpContainsContext, {bar: ''});
    var CmpContainsContext = withContextFactory(Cmp);
    // <CmpContainsContext />
    // Property 'nProp' is missing in type ...
    // Property 'sProp' is missing in type ...
    React.createElement(CmpContainsContext, {nProp: 0, sProp: ''});
    return t.end();
});
test('mapProps', function (t) {
    var mapProps = recompose.mapProps;
    t.equal(typeof mapProps, 'function', 'mapProps is a function');
    var FullName = (function (_super) {
        __extends(FullName, _super);
        function FullName() {
            _super.apply(this, arguments);
        }
        FullName.prototype.render = function () {
            return React.createElement("div", null, this.props.fullName);
        };
        return FullName;
    }(React.Component));
    var propMapper = mapProps(function (props) { return ({
        fullName: props.firstName + ' ' + props.lastName
    }); });
    var FirstAndLastName = propMapper(FullName);
    // <FirstAndLastName />
    // {firstName|lastName} is missing in type ...
    React.createElement(FirstAndLastName, {firstName: 'Ian', lastName: 'Ker-Seymer'});
    return t.end();
});
test('withProps', function (t) {
    t.equal(typeof recompose.withProps, 'function', 'withProps is a function');
    var withPropsFactory = recompose.withProps(function (props) { return ({
        sAdditionalProp: 'foo'
    }); });
    var CmpWithAdditionalProp = withPropsFactory(Cmp);
    // <CmpWithAdditionalProp sProp="" nProp={0} />
    // TS2324: Property 'sAdditionalProp' is missing in type ...
    React.createElement(CmpWithAdditionalProp, {sProp: '', nProp: 0, sAdditionalProp: ''});
    return t.end();
});
test('pure', function (t) {
    t.equal(typeof recompose.pure, 'function', 'pure is a function');
    var PureStatelessCmp = recompose.pure(StatelessCmp);
    var PureCmp = recompose.pure(Cmp);
    // <PureStatelessCmp />;
    // TS2324: Property 'bar' is missing in type ...
    React.createElement(PureCmp, {sProp: 'Hello again!', nProp: 0});
    // <PureCmp />;
    // Property 'nProp' is missing in type ...
    // Property 'sProp' is missing in type ...
    React.createElement(PureStatelessCmp, {bar: 'Hi there!'});
    return t.end();
});
test('setPropTypes', function (t) {
    t.equal(typeof recompose.withProps, 'function', 'withProps is a function');
    var setPropTypesFactory = recompose.setPropTypes({
        theOnlyProperty: React.PropTypes.string
    });
    var CmpWithTheOnlyProperty = setPropTypesFactory(Cmp);
    // <CmpWithTheOnlyProperty />
    // Property 'theOnlyProperty' is missing in type
    React.createElement(CmpWithTheOnlyProperty, {theOnlyProperty: ''});
    return t.end();
});
test('getContext', function (t) {
    t.equal(typeof recompose.getContext, 'function', 'getContext is a function');
    var getContextFactory = recompose.getContext({
        propFromContext: React.PropTypes.string
    });
    var CmpWithContext = getContextFactory(Cmp);
    //  <CmpWithContext />
    //  Property 'nProp' is missing in type ...
    //  Property 'sProp' is missing in type ...
    //  Property 'propFromContext' is missing in type ...
    React.createElement(CmpWithContext, {sProp: '', nProp: 0, propFromContext: ''});
    return t.end();
});
test('componentFromProp', function (t) {
    var Div = React.createElement("div", null);
    t.equal(typeof recompose.componentFromProp, 'function', 'componentFromProp is a function');
    var Button = recompose.componentFromProp('component');
    React.createElement(Button, {component: 'a'});
    React.createElement(Button, {component: Div});
    return t.end();
});
test('lifecyle', function (t) {
    t.equal(typeof recompose.lifecycle, 'function', 'lifecycle is a function');
    var TestCmp = function (props) { return React.createElement("div", null, "Hello world"); };
    var lifecycleSpec = {
        commponentWillReceiveProps: function (nextProps, nextState) { return console.log('componentWillReceiveProps'); },
        shouldComponentUpdate: function (nextProps, nextState) { return true; }
    };
    var CmpWithLifecyle = recompose.lifecycle(lifecycleSpec)(TestCmp);
    React.createElement(CmpWithLifecyle, {test: true});
    t.end();
});
test('withState', function (t) {
    t.equal(typeof recompose.withState, 'function', 'withState is a function');
    function expandableFactory(component) {
        return recompose.withState('isExpanded', 'setExpanded', function () { return false; })(component);
    }
    var ExpandableCmp = expandableFactory(Cmp);
    // <ExpandableCmp />;
    // Property 'nProp' is missing in type ...
    // Property 'sProp' is missing in type ...
    React.createElement(ExpandableCmp, {sProp: 'Ola!', nProp: 0});
    var ExpandableSFC = expandableFactory(StatelessCmp);
    // <ExpandableSFC />
    // Property 'bar' is missing in type ...
    React.createElement(ExpandableSFC, {bar: 'Ola!'});
    t.end();
});
test('shouldUpdate', function (t) {
    t.equal(typeof recompose.withState, 'function', 'shouldUpdate is a function');
    var StaleOrFresh = function (props) { return React.createElement("div", null, props.stale ? 'Stale!' : 'Fresh!'); };
    var UpdateWhenStale = recompose.shouldUpdate(function (props) { return props.stale; })(StaleOrFresh);
    React.createElement(UpdateWhenStale, {stale: true});
    t.end();
});
test('renameProp', function (t) {
    t.equal(typeof recompose.renameProp, 'function', 'renameProp is a function');
    var CmpWithBar = function (props) { return React.createElement("div", null, 
        " ", 
        props.bar, 
        " "); };
    var FooToBar = recompose
        .renameProp('foo', 'bar')(CmpWithBar);
    // in this case we can't do much
    // So if wee need precise types then we have to specify it explicitly
    React.createElement(FooToBar, {foo: 'some value'});
    t.end();
});
test('renameProps', function (t) {
    t.equal(typeof recompose.renameProps, 'function', 'renameProps is a function');
    var CmpWithNewProps = function (props) { return React.createElement("div", null, 
        " ", 
        props.newBar, 
        " ", 
        props.newFoo, 
        " "); };
    var OldToNewProps = recompose
        .renameProp('foo', 'bar')(CmpWithNewProps);
    // in this case we can't do much
    // So if wee need precise types then we have to specify it explicitly
    React.createElement(OldToNewProps, {foo: 'some foo', bar: 'some bar'});
    t.end();
});
