(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function r0(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Tu={exports:{}},ka={},Au={exports:{}},mt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $p;function bv(){if($p)return mt;$p=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),d=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.iterator;function y(z){return z===null||typeof z!="object"?null:(z=_&&z[_]||z["@@iterator"],typeof z=="function"?z:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,T={};function S(z,le,Ue){this.props=z,this.context=le,this.refs=T,this.updater=Ue||M}S.prototype.isReactComponent={},S.prototype.setState=function(z,le){if(typeof z!="object"&&typeof z!="function"&&z!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,z,le,"setState")},S.prototype.forceUpdate=function(z){this.updater.enqueueForceUpdate(this,z,"forceUpdate")};function x(){}x.prototype=S.prototype;function I(z,le,Ue){this.props=z,this.context=le,this.refs=T,this.updater=Ue||M}var C=I.prototype=new x;C.constructor=I,b(C,S.prototype),C.isPureReactComponent=!0;var w=Array.isArray,D=Object.prototype.hasOwnProperty,P={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function B(z,le,Ue){var re,pe={},Me=null,_e=null;if(le!=null)for(re in le.ref!==void 0&&(_e=le.ref),le.key!==void 0&&(Me=""+le.key),le)D.call(le,re)&&!U.hasOwnProperty(re)&&(pe[re]=le[re]);var Te=arguments.length-2;if(Te===1)pe.children=Ue;else if(1<Te){for(var qe=Array(Te),Ge=0;Ge<Te;Ge++)qe[Ge]=arguments[Ge+2];pe.children=qe}if(z&&z.defaultProps)for(re in Te=z.defaultProps,Te)pe[re]===void 0&&(pe[re]=Te[re]);return{$$typeof:s,type:z,key:Me,ref:_e,props:pe,_owner:P.current}}function L(z,le){return{$$typeof:s,type:z.type,key:le,ref:z.ref,props:z.props,_owner:z._owner}}function N(z){return typeof z=="object"&&z!==null&&z.$$typeof===s}function j(z){var le={"=":"=0",":":"=2"};return"$"+z.replace(/[=:]/g,function(Ue){return le[Ue]})}var ee=/\/+/g;function J(z,le){return typeof z=="object"&&z!==null&&z.key!=null?j(""+z.key):le.toString(36)}function ce(z,le,Ue,re,pe){var Me=typeof z;(Me==="undefined"||Me==="boolean")&&(z=null);var _e=!1;if(z===null)_e=!0;else switch(Me){case"string":case"number":_e=!0;break;case"object":switch(z.$$typeof){case s:case e:_e=!0}}if(_e)return _e=z,pe=pe(_e),z=re===""?"."+J(_e,0):re,w(pe)?(Ue="",z!=null&&(Ue=z.replace(ee,"$&/")+"/"),ce(pe,le,Ue,"",function(Ge){return Ge})):pe!=null&&(N(pe)&&(pe=L(pe,Ue+(!pe.key||_e&&_e.key===pe.key?"":(""+pe.key).replace(ee,"$&/")+"/")+z)),le.push(pe)),1;if(_e=0,re=re===""?".":re+":",w(z))for(var Te=0;Te<z.length;Te++){Me=z[Te];var qe=re+J(Me,Te);_e+=ce(Me,le,Ue,qe,pe)}else if(qe=y(z),typeof qe=="function")for(z=qe.call(z),Te=0;!(Me=z.next()).done;)Me=Me.value,qe=re+J(Me,Te++),_e+=ce(Me,le,Ue,qe,pe);else if(Me==="object")throw le=String(z),Error("Objects are not valid as a React child (found: "+(le==="[object Object]"?"object with keys {"+Object.keys(z).join(", ")+"}":le)+"). If you meant to render a collection of children, use an array instead.");return _e}function Y(z,le,Ue){if(z==null)return z;var re=[],pe=0;return ce(z,re,"","",function(Me){return le.call(Ue,Me,pe++)}),re}function G(z){if(z._status===-1){var le=z._result;le=le(),le.then(function(Ue){(z._status===0||z._status===-1)&&(z._status=1,z._result=Ue)},function(Ue){(z._status===0||z._status===-1)&&(z._status=2,z._result=Ue)}),z._status===-1&&(z._status=0,z._result=le)}if(z._status===1)return z._result.default;throw z._result}var Z={current:null},O={transition:null},oe={ReactCurrentDispatcher:Z,ReactCurrentBatchConfig:O,ReactCurrentOwner:P};function de(){throw Error("act(...) is not supported in production builds of React.")}return mt.Children={map:Y,forEach:function(z,le,Ue){Y(z,function(){le.apply(this,arguments)},Ue)},count:function(z){var le=0;return Y(z,function(){le++}),le},toArray:function(z){return Y(z,function(le){return le})||[]},only:function(z){if(!N(z))throw Error("React.Children.only expected to receive a single React element child.");return z}},mt.Component=S,mt.Fragment=t,mt.Profiler=o,mt.PureComponent=I,mt.StrictMode=r,mt.Suspense=f,mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oe,mt.act=de,mt.cloneElement=function(z,le,Ue){if(z==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+z+".");var re=b({},z.props),pe=z.key,Me=z.ref,_e=z._owner;if(le!=null){if(le.ref!==void 0&&(Me=le.ref,_e=P.current),le.key!==void 0&&(pe=""+le.key),z.type&&z.type.defaultProps)var Te=z.type.defaultProps;for(qe in le)D.call(le,qe)&&!U.hasOwnProperty(qe)&&(re[qe]=le[qe]===void 0&&Te!==void 0?Te[qe]:le[qe])}var qe=arguments.length-2;if(qe===1)re.children=Ue;else if(1<qe){Te=Array(qe);for(var Ge=0;Ge<qe;Ge++)Te[Ge]=arguments[Ge+2];re.children=Te}return{$$typeof:s,type:z.type,key:pe,ref:Me,props:re,_owner:_e}},mt.createContext=function(z){return z={$$typeof:d,_currentValue:z,_currentValue2:z,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},z.Provider={$$typeof:l,_context:z},z.Consumer=z},mt.createElement=B,mt.createFactory=function(z){var le=B.bind(null,z);return le.type=z,le},mt.createRef=function(){return{current:null}},mt.forwardRef=function(z){return{$$typeof:h,render:z}},mt.isValidElement=N,mt.lazy=function(z){return{$$typeof:v,_payload:{_status:-1,_result:z},_init:G}},mt.memo=function(z,le){return{$$typeof:m,type:z,compare:le===void 0?null:le}},mt.startTransition=function(z){var le=O.transition;O.transition={};try{z()}finally{O.transition=le}},mt.unstable_act=de,mt.useCallback=function(z,le){return Z.current.useCallback(z,le)},mt.useContext=function(z){return Z.current.useContext(z)},mt.useDebugValue=function(){},mt.useDeferredValue=function(z){return Z.current.useDeferredValue(z)},mt.useEffect=function(z,le){return Z.current.useEffect(z,le)},mt.useId=function(){return Z.current.useId()},mt.useImperativeHandle=function(z,le,Ue){return Z.current.useImperativeHandle(z,le,Ue)},mt.useInsertionEffect=function(z,le){return Z.current.useInsertionEffect(z,le)},mt.useLayoutEffect=function(z,le){return Z.current.useLayoutEffect(z,le)},mt.useMemo=function(z,le){return Z.current.useMemo(z,le)},mt.useReducer=function(z,le,Ue){return Z.current.useReducer(z,le,Ue)},mt.useRef=function(z){return Z.current.useRef(z)},mt.useState=function(z){return Z.current.useState(z)},mt.useSyncExternalStore=function(z,le,Ue){return Z.current.useSyncExternalStore(z,le,Ue)},mt.useTransition=function(){return Z.current.useTransition()},mt.version="18.3.1",mt}var qp;function nh(){return qp||(qp=1,Au.exports=bv()),Au.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yp;function wv(){if(Yp)return ka;Yp=1;var s=nh(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(h,f,m){var v,_={},y=null,M=null;m!==void 0&&(y=""+m),f.key!==void 0&&(y=""+f.key),f.ref!==void 0&&(M=f.ref);for(v in f)r.call(f,v)&&!l.hasOwnProperty(v)&&(_[v]=f[v]);if(h&&h.defaultProps)for(v in f=h.defaultProps,f)_[v]===void 0&&(_[v]=f[v]);return{$$typeof:e,type:h,key:y,ref:M,props:_,_owner:o.current}}return ka.Fragment=t,ka.jsx=d,ka.jsxs=d,ka}var Kp;function Ev(){return Kp||(Kp=1,Tu.exports=wv()),Tu.exports}var c=Ev(),we=nh();const Tv=r0(we);var cl={},Cu={exports:{}},Ln={},Nu={exports:{}},Ru={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jp;function Av(){return Jp||(Jp=1,(function(s){function e(O,oe){var de=O.length;O.push(oe);e:for(;0<de;){var z=de-1>>>1,le=O[z];if(0<o(le,oe))O[z]=oe,O[de]=le,de=z;else break e}}function t(O){return O.length===0?null:O[0]}function r(O){if(O.length===0)return null;var oe=O[0],de=O.pop();if(de!==oe){O[0]=de;e:for(var z=0,le=O.length,Ue=le>>>1;z<Ue;){var re=2*(z+1)-1,pe=O[re],Me=re+1,_e=O[Me];if(0>o(pe,de))Me<le&&0>o(_e,pe)?(O[z]=_e,O[Me]=de,z=Me):(O[z]=pe,O[re]=de,z=re);else if(Me<le&&0>o(_e,de))O[z]=_e,O[Me]=de,z=Me;else break e}}return oe}function o(O,oe){var de=O.sortIndex-oe.sortIndex;return de!==0?de:O.id-oe.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var d=Date,h=d.now();s.unstable_now=function(){return d.now()-h}}var f=[],m=[],v=1,_=null,y=3,M=!1,b=!1,T=!1,S=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function C(O){for(var oe=t(m);oe!==null;){if(oe.callback===null)r(m);else if(oe.startTime<=O)r(m),oe.sortIndex=oe.expirationTime,e(f,oe);else break;oe=t(m)}}function w(O){if(T=!1,C(O),!b)if(t(f)!==null)b=!0,G(D);else{var oe=t(m);oe!==null&&Z(w,oe.startTime-O)}}function D(O,oe){b=!1,T&&(T=!1,x(B),B=-1),M=!0;var de=y;try{for(C(oe),_=t(f);_!==null&&(!(_.expirationTime>oe)||O&&!j());){var z=_.callback;if(typeof z=="function"){_.callback=null,y=_.priorityLevel;var le=z(_.expirationTime<=oe);oe=s.unstable_now(),typeof le=="function"?_.callback=le:_===t(f)&&r(f),C(oe)}else r(f);_=t(f)}if(_!==null)var Ue=!0;else{var re=t(m);re!==null&&Z(w,re.startTime-oe),Ue=!1}return Ue}finally{_=null,y=de,M=!1}}var P=!1,U=null,B=-1,L=5,N=-1;function j(){return!(s.unstable_now()-N<L)}function ee(){if(U!==null){var O=s.unstable_now();N=O;var oe=!0;try{oe=U(!0,O)}finally{oe?J():(P=!1,U=null)}}else P=!1}var J;if(typeof I=="function")J=function(){I(ee)};else if(typeof MessageChannel<"u"){var ce=new MessageChannel,Y=ce.port2;ce.port1.onmessage=ee,J=function(){Y.postMessage(null)}}else J=function(){S(ee,0)};function G(O){U=O,P||(P=!0,J())}function Z(O,oe){B=S(function(){O(s.unstable_now())},oe)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(O){O.callback=null},s.unstable_continueExecution=function(){b||M||(b=!0,G(D))},s.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<O?Math.floor(1e3/O):5},s.unstable_getCurrentPriorityLevel=function(){return y},s.unstable_getFirstCallbackNode=function(){return t(f)},s.unstable_next=function(O){switch(y){case 1:case 2:case 3:var oe=3;break;default:oe=y}var de=y;y=oe;try{return O()}finally{y=de}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(O,oe){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var de=y;y=O;try{return oe()}finally{y=de}},s.unstable_scheduleCallback=function(O,oe,de){var z=s.unstable_now();switch(typeof de=="object"&&de!==null?(de=de.delay,de=typeof de=="number"&&0<de?z+de:z):de=z,O){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=de+le,O={id:v++,callback:oe,priorityLevel:O,startTime:de,expirationTime:le,sortIndex:-1},de>z?(O.sortIndex=de,e(m,O),t(f)===null&&O===t(m)&&(T?(x(B),B=-1):T=!0,Z(w,de-z))):(O.sortIndex=le,e(f,O),b||M||(b=!0,G(D))),O},s.unstable_shouldYield=j,s.unstable_wrapCallback=function(O){var oe=y;return function(){var de=y;y=oe;try{return O.apply(this,arguments)}finally{y=de}}}})(Ru)),Ru}var Zp;function Cv(){return Zp||(Zp=1,Nu.exports=Av()),Nu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qp;function Nv(){if(Qp)return Ln;Qp=1;var s=nh(),e=Cv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,o={};function l(n,i){d(n,i),d(n+"Capture",i)}function d(n,i){for(o[n]=i,n=0;n<i.length;n++)r.add(i[n])}var h=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,v={},_={};function y(n){return f.call(_,n)?!0:f.call(v,n)?!1:m.test(n)?_[n]=!0:(v[n]=!0,!1)}function M(n,i,a,u){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return u?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function b(n,i,a,u){if(i===null||typeof i>"u"||M(n,i,a,u))return!0;if(u)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function T(n,i,a,u,p,g,E){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=u,this.attributeNamespace=p,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=g,this.removeEmptyString=E}var S={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){S[n]=new T(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];S[i]=new T(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){S[n]=new T(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){S[n]=new T(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){S[n]=new T(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){S[n]=new T(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){S[n]=new T(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){S[n]=new T(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){S[n]=new T(n,5,!1,n.toLowerCase(),null,!1,!1)});var x=/[\-:]([a-z])/g;function I(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(x,I);S[i]=new T(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(x,I);S[i]=new T(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(x,I);S[i]=new T(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){S[n]=new T(n,1,!1,n.toLowerCase(),null,!1,!1)}),S.xlinkHref=new T("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){S[n]=new T(n,1,!1,n.toLowerCase(),null,!0,!0)});function C(n,i,a,u){var p=S.hasOwnProperty(i)?S[i]:null;(p!==null?p.type!==0:u||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(b(i,a,p,u)&&(a=null),u||p===null?y(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):p.mustUseProperty?n[p.propertyName]=a===null?p.type===3?!1:"":a:(i=p.attributeName,u=p.attributeNamespace,a===null?n.removeAttribute(i):(p=p.type,a=p===3||p===4&&a===!0?"":""+a,u?n.setAttributeNS(u,i,a):n.setAttribute(i,a))))}var w=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,D=Symbol.for("react.element"),P=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),B=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),N=Symbol.for("react.provider"),j=Symbol.for("react.context"),ee=Symbol.for("react.forward_ref"),J=Symbol.for("react.suspense"),ce=Symbol.for("react.suspense_list"),Y=Symbol.for("react.memo"),G=Symbol.for("react.lazy"),Z=Symbol.for("react.offscreen"),O=Symbol.iterator;function oe(n){return n===null||typeof n!="object"?null:(n=O&&n[O]||n["@@iterator"],typeof n=="function"?n:null)}var de=Object.assign,z;function le(n){if(z===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);z=i&&i[1]||""}return`
`+z+n}var Ue=!1;function re(n,i){if(!n||Ue)return"";Ue=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(ae){var u=ae}Reflect.construct(n,[],i)}else{try{i.call()}catch(ae){u=ae}n.call(i.prototype)}else{try{throw Error()}catch(ae){u=ae}n()}}catch(ae){if(ae&&u&&typeof ae.stack=="string"){for(var p=ae.stack.split(`
`),g=u.stack.split(`
`),E=p.length-1,F=g.length-1;1<=E&&0<=F&&p[E]!==g[F];)F--;for(;1<=E&&0<=F;E--,F--)if(p[E]!==g[F]){if(E!==1||F!==1)do if(E--,F--,0>F||p[E]!==g[F]){var V=`
`+p[E].replace(" at new "," at ");return n.displayName&&V.includes("<anonymous>")&&(V=V.replace("<anonymous>",n.displayName)),V}while(1<=E&&0<=F);break}}}finally{Ue=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?le(n):""}function pe(n){switch(n.tag){case 5:return le(n.type);case 16:return le("Lazy");case 13:return le("Suspense");case 19:return le("SuspenseList");case 0:case 2:case 15:return n=re(n.type,!1),n;case 11:return n=re(n.type.render,!1),n;case 1:return n=re(n.type,!0),n;default:return""}}function Me(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case U:return"Fragment";case P:return"Portal";case L:return"Profiler";case B:return"StrictMode";case J:return"Suspense";case ce:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case j:return(n.displayName||"Context")+".Consumer";case N:return(n._context.displayName||"Context")+".Provider";case ee:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Y:return i=n.displayName||null,i!==null?i:Me(n.type)||"Memo";case G:i=n._payload,n=n._init;try{return Me(n(i))}catch{}}return null}function _e(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Me(i);case 8:return i===B?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Te(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function qe(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ge(n){var i=qe(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),u=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var p=a.get,g=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return p.call(this)},set:function(E){u=""+E,g.call(this,E)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return u},setValue:function(E){u=""+E},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Dt(n){n._valueTracker||(n._valueTracker=Ge(n))}function Lt(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),u="";return n&&(u=qe(n)?n.checked?"true":"false":n.value),n=u,n!==a?(i.setValue(n),!0):!1}function dt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function H(n,i){var a=i.checked;return de({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Sn(n,i){var a=i.defaultValue==null?"":i.defaultValue,u=i.checked!=null?i.checked:i.defaultChecked;a=Te(i.value!=null?i.value:a),n._wrapperState={initialChecked:u,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function gt(n,i){i=i.checked,i!=null&&C(n,"checked",i,!1)}function ft(n,i){gt(n,i);var a=Te(i.value),u=i.type;if(a!=null)u==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Ct(n,i.type,a):i.hasOwnProperty("defaultValue")&&Ct(n,i.type,Te(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Ye(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var u=i.type;if(!(u!=="submit"&&u!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function Ct(n,i,a){(i!=="number"||dt(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var We=Array.isArray;function k(n,i,a,u){if(n=n.options,i){i={};for(var p=0;p<a.length;p++)i["$"+a[p]]=!0;for(a=0;a<n.length;a++)p=i.hasOwnProperty("$"+n[a].value),n[a].selected!==p&&(n[a].selected=p),p&&u&&(n[a].defaultSelected=!0)}else{for(a=""+Te(a),i=null,p=0;p<n.length;p++){if(n[p].value===a){n[p].selected=!0,u&&(n[p].defaultSelected=!0);return}i!==null||n[p].disabled||(i=n[p])}i!==null&&(i.selected=!0)}}function A(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return de({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ie(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(We(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:Te(a)}}function me(n,i){var a=Te(i.value),u=Te(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),u!=null&&(n.defaultValue=""+u)}function ge(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function he(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Xe(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?he(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ae,ke=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,u,p){MSApp.execUnsafeLocalFunction(function(){return n(i,a,u,p)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Ae=Ae||document.createElement("div"),Ae.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Ae.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function ht(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var be={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Oe=["Webkit","ms","Moz","O"];Object.keys(be).forEach(function(n){Oe.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),be[i]=be[n]})});function et(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||be.hasOwnProperty(n)&&be[n]?(""+i).trim():i+"px"}function nt(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var u=a.indexOf("--")===0,p=et(a,i[a],u);a==="float"&&(a="cssFloat"),u?n.setProperty(a,p):n[a]=p}}var ze=de({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function pt(n,i){if(i){if(ze[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function st(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var At=null;function $(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Ce=null,ue=null,fe=null;function De(n){if(n=Sa(n)){if(typeof Ce!="function")throw Error(t(280));var i=n.stateNode;i&&(i=wo(i),Ce(n.stateNode,n.type,i))}}function Pe(n){ue?fe?fe.push(n):fe=[n]:ue=n}function at(){if(ue){var n=ue,i=fe;if(fe=ue=null,De(n),i)for(n=0;n<i.length;n++)De(i[n])}}function Ut(n,i){return n(i)}function Yt(){}var Mt=!1;function An(n,i,a){if(Mt)return n(i,a);Mt=!0;try{return Ut(n,i,a)}finally{Mt=!1,(ue!==null||fe!==null)&&(Yt(),at())}}function Mn(n,i){var a=n.stateNode;if(a===null)return null;var u=wo(a);if(u===null)return null;a=u[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var rs=!1;if(h)try{var qi={};Object.defineProperty(qi,"passive",{get:function(){rs=!0}}),window.addEventListener("test",qi,qi),window.removeEventListener("test",qi,qi)}catch{rs=!1}function Ei(n,i,a,u,p,g,E,F,V){var ae=Array.prototype.slice.call(arguments,3);try{i.apply(a,ae)}catch(ve){this.onError(ve)}}var Ti=!1,Ar=null,Cr=!1,Yi=null,to={onError:function(n){Ti=!0,Ar=n}};function ss(n,i,a,u,p,g,E,F,V){Ti=!1,Ar=null,Ei.apply(to,arguments)}function no(n,i,a,u,p,g,E,F,V){if(ss.apply(this,arguments),Ti){if(Ti){var ae=Ar;Ti=!1,Ar=null}else throw Error(t(198));Cr||(Cr=!0,Yi=ae)}}function pi(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function io(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function ro(n){if(pi(n)!==n)throw Error(t(188))}function Yl(n){var i=n.alternate;if(!i){if(i=pi(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,u=i;;){var p=a.return;if(p===null)break;var g=p.alternate;if(g===null){if(u=p.return,u!==null){a=u;continue}break}if(p.child===g.child){for(g=p.child;g;){if(g===a)return ro(p),n;if(g===u)return ro(p),i;g=g.sibling}throw Error(t(188))}if(a.return!==u.return)a=p,u=g;else{for(var E=!1,F=p.child;F;){if(F===a){E=!0,a=p,u=g;break}if(F===u){E=!0,u=p,a=g;break}F=F.sibling}if(!E){for(F=g.child;F;){if(F===a){E=!0,a=g,u=p;break}if(F===u){E=!0,u=g,a=p;break}F=F.sibling}if(!E)throw Error(t(189))}}if(a.alternate!==u)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function so(n){return n=Yl(n),n!==null?ao(n):null}function ao(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=ao(n);if(i!==null)return i;n=n.sibling}return null}var oo=e.unstable_scheduleCallback,R=e.unstable_cancelCallback,q=e.unstable_shouldYield,se=e.unstable_requestPaint,te=e.unstable_now,K=e.unstable_getCurrentPriorityLevel,Se=e.unstable_ImmediatePriority,Ne=e.unstable_UserBlockingPriority,Le=e.unstable_NormalPriority,Be=e.unstable_LowPriority,it=e.unstable_IdlePriority,tt=null,Ve=null;function _t(n){if(Ve&&typeof Ve.onCommitFiberRoot=="function")try{Ve.onCommitFiberRoot(tt,n,void 0,(n.current.flags&128)===128)}catch{}}var lt=Math.clz32?Math.clz32:St,Ht=Math.log,Ot=Math.LN2;function St(n){return n>>>=0,n===0?32:31-(Ht(n)/Ot|0)|0}var Ke=64,Gt=4194304;function vt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function un(n,i){var a=n.pendingLanes;if(a===0)return 0;var u=0,p=n.suspendedLanes,g=n.pingedLanes,E=a&268435455;if(E!==0){var F=E&~p;F!==0?u=vt(F):(g&=E,g!==0&&(u=vt(g)))}else E=a&~p,E!==0?u=vt(E):g!==0&&(u=vt(g));if(u===0)return 0;if(i!==0&&i!==u&&(i&p)===0&&(p=u&-u,g=i&-i,p>=g||p===16&&(g&4194240)!==0))return i;if((u&4)!==0&&(u|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=u;0<i;)a=31-lt(i),p=1<<a,u|=n[a],i&=~p;return u}function Ki(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bn(n,i){for(var a=n.suspendedLanes,u=n.pingedLanes,p=n.expirationTimes,g=n.pendingLanes;0<g;){var E=31-lt(g),F=1<<E,V=p[E];V===-1?((F&a)===0||(F&u)!==0)&&(p[E]=Ki(F,i)):V<=i&&(n.expiredLanes|=F),g&=~F}}function Ai(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Pt(){var n=Ke;return Ke<<=1,(Ke&4194240)===0&&(Ke=64),n}function dn(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function en(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-lt(i),n[i]=a}function on(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<a;){var p=31-lt(a),g=1<<p;i[p]=0,u[p]=-1,n[p]=-1,a&=~g}}function tn(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var u=31-lt(a),p=1<<u;p&i|n[u]&i&&(n[u]|=i),a&=~p}}var bt=0;function mi(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Eh,Kl,Th,Ah,Ch,Jl=!1,lo=[],Ji=null,Zi=null,Qi=null,sa=new Map,aa=new Map,er=[],Wx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Nh(n,i){switch(n){case"focusin":case"focusout":Ji=null;break;case"dragenter":case"dragleave":Zi=null;break;case"mouseover":case"mouseout":Qi=null;break;case"pointerover":case"pointerout":sa.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":aa.delete(i.pointerId)}}function oa(n,i,a,u,p,g){return n===null||n.nativeEvent!==g?(n={blockedOn:i,domEventName:a,eventSystemFlags:u,nativeEvent:g,targetContainers:[p]},i!==null&&(i=Sa(i),i!==null&&Kl(i)),n):(n.eventSystemFlags|=u,i=n.targetContainers,p!==null&&i.indexOf(p)===-1&&i.push(p),n)}function Xx(n,i,a,u,p){switch(i){case"focusin":return Ji=oa(Ji,n,i,a,u,p),!0;case"dragenter":return Zi=oa(Zi,n,i,a,u,p),!0;case"mouseover":return Qi=oa(Qi,n,i,a,u,p),!0;case"pointerover":var g=p.pointerId;return sa.set(g,oa(sa.get(g)||null,n,i,a,u,p)),!0;case"gotpointercapture":return g=p.pointerId,aa.set(g,oa(aa.get(g)||null,n,i,a,u,p)),!0}return!1}function Rh(n){var i=Nr(n.target);if(i!==null){var a=pi(i);if(a!==null){if(i=a.tag,i===13){if(i=io(a),i!==null){n.blockedOn=i,Ch(n.priority,function(){Th(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function co(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=Ql(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var u=new a.constructor(a.type,a);At=u,a.target.dispatchEvent(u),At=null}else return i=Sa(a),i!==null&&Kl(i),n.blockedOn=a,!1;i.shift()}return!0}function Ph(n,i,a){co(n)&&a.delete(i)}function $x(){Jl=!1,Ji!==null&&co(Ji)&&(Ji=null),Zi!==null&&co(Zi)&&(Zi=null),Qi!==null&&co(Qi)&&(Qi=null),sa.forEach(Ph),aa.forEach(Ph)}function la(n,i){n.blockedOn===i&&(n.blockedOn=null,Jl||(Jl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,$x)))}function ca(n){function i(p){return la(p,n)}if(0<lo.length){la(lo[0],n);for(var a=1;a<lo.length;a++){var u=lo[a];u.blockedOn===n&&(u.blockedOn=null)}}for(Ji!==null&&la(Ji,n),Zi!==null&&la(Zi,n),Qi!==null&&la(Qi,n),sa.forEach(i),aa.forEach(i),a=0;a<er.length;a++)u=er[a],u.blockedOn===n&&(u.blockedOn=null);for(;0<er.length&&(a=er[0],a.blockedOn===null);)Rh(a),a.blockedOn===null&&er.shift()}var as=w.ReactCurrentBatchConfig,uo=!0;function qx(n,i,a,u){var p=bt,g=as.transition;as.transition=null;try{bt=1,Zl(n,i,a,u)}finally{bt=p,as.transition=g}}function Yx(n,i,a,u){var p=bt,g=as.transition;as.transition=null;try{bt=4,Zl(n,i,a,u)}finally{bt=p,as.transition=g}}function Zl(n,i,a,u){if(uo){var p=Ql(n,i,a,u);if(p===null)xc(n,i,u,ho,a),Nh(n,u);else if(Xx(p,n,i,a,u))u.stopPropagation();else if(Nh(n,u),i&4&&-1<Wx.indexOf(n)){for(;p!==null;){var g=Sa(p);if(g!==null&&Eh(g),g=Ql(n,i,a,u),g===null&&xc(n,i,u,ho,a),g===p)break;p=g}p!==null&&u.stopPropagation()}else xc(n,i,u,null,a)}}var ho=null;function Ql(n,i,a,u){if(ho=null,n=$(u),n=Nr(n),n!==null)if(i=pi(n),i===null)n=null;else if(a=i.tag,a===13){if(n=io(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return ho=n,null}function Dh(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(K()){case Se:return 1;case Ne:return 4;case Le:case Be:return 16;case it:return 536870912;default:return 16}default:return 16}}var tr=null,ec=null,fo=null;function Lh(){if(fo)return fo;var n,i=ec,a=i.length,u,p="value"in tr?tr.value:tr.textContent,g=p.length;for(n=0;n<a&&i[n]===p[n];n++);var E=a-n;for(u=1;u<=E&&i[a-u]===p[g-u];u++);return fo=p.slice(n,1<u?1-u:void 0)}function po(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function mo(){return!0}function Ih(){return!1}function zn(n){function i(a,u,p,g,E){this._reactName=a,this._targetInst=p,this.type=u,this.nativeEvent=g,this.target=E,this.currentTarget=null;for(var F in n)n.hasOwnProperty(F)&&(a=n[F],this[F]=a?a(g):g[F]);return this.isDefaultPrevented=(g.defaultPrevented!=null?g.defaultPrevented:g.returnValue===!1)?mo:Ih,this.isPropagationStopped=Ih,this}return de(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=mo)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=mo)},persist:function(){},isPersistent:mo}),i}var os={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},tc=zn(os),ua=de({},os,{view:0,detail:0}),Kx=zn(ua),nc,ic,da,xo=de({},ua,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==da&&(da&&n.type==="mousemove"?(nc=n.screenX-da.screenX,ic=n.screenY-da.screenY):ic=nc=0,da=n),nc)},movementY:function(n){return"movementY"in n?n.movementY:ic}}),Uh=zn(xo),Jx=de({},xo,{dataTransfer:0}),Zx=zn(Jx),Qx=de({},ua,{relatedTarget:0}),rc=zn(Qx),eg=de({},os,{animationName:0,elapsedTime:0,pseudoElement:0}),tg=zn(eg),ng=de({},os,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),ig=zn(ng),rg=de({},os,{data:0}),kh=zn(rg),sg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ag={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},og={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lg(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=og[n])?!!i[n]:!1}function sc(){return lg}var cg=de({},ua,{key:function(n){if(n.key){var i=sg[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=po(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?ag[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sc,charCode:function(n){return n.type==="keypress"?po(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?po(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),ug=zn(cg),dg=de({},xo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Fh=zn(dg),hg=de({},ua,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sc}),fg=zn(hg),pg=de({},os,{propertyName:0,elapsedTime:0,pseudoElement:0}),mg=zn(pg),xg=de({},xo,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),gg=zn(xg),vg=[9,13,27,32],ac=h&&"CompositionEvent"in window,ha=null;h&&"documentMode"in document&&(ha=document.documentMode);var _g=h&&"TextEvent"in window&&!ha,Oh=h&&(!ac||ha&&8<ha&&11>=ha),zh=" ",Bh=!1;function jh(n,i){switch(n){case"keyup":return vg.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Vh(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var ls=!1;function yg(n,i){switch(n){case"compositionend":return Vh(i);case"keypress":return i.which!==32?null:(Bh=!0,zh);case"textInput":return n=i.data,n===zh&&Bh?null:n;default:return null}}function Sg(n,i){if(ls)return n==="compositionend"||!ac&&jh(n,i)?(n=Lh(),fo=ec=tr=null,ls=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Oh&&i.locale!=="ko"?null:i.data;default:return null}}var Mg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hh(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!Mg[n.type]:i==="textarea"}function Gh(n,i,a,u){Pe(u),i=So(i,"onChange"),0<i.length&&(a=new tc("onChange","change",null,a,u),n.push({event:a,listeners:i}))}var fa=null,pa=null;function bg(n){cf(n,0)}function go(n){var i=fs(n);if(Lt(i))return n}function wg(n,i){if(n==="change")return i}var Wh=!1;if(h){var oc;if(h){var lc="oninput"in document;if(!lc){var Xh=document.createElement("div");Xh.setAttribute("oninput","return;"),lc=typeof Xh.oninput=="function"}oc=lc}else oc=!1;Wh=oc&&(!document.documentMode||9<document.documentMode)}function $h(){fa&&(fa.detachEvent("onpropertychange",qh),pa=fa=null)}function qh(n){if(n.propertyName==="value"&&go(pa)){var i=[];Gh(i,pa,n,$(n)),An(bg,i)}}function Eg(n,i,a){n==="focusin"?($h(),fa=i,pa=a,fa.attachEvent("onpropertychange",qh)):n==="focusout"&&$h()}function Tg(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return go(pa)}function Ag(n,i){if(n==="click")return go(i)}function Cg(n,i){if(n==="input"||n==="change")return go(i)}function Ng(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var ni=typeof Object.is=="function"?Object.is:Ng;function ma(n,i){if(ni(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),u=Object.keys(i);if(a.length!==u.length)return!1;for(u=0;u<a.length;u++){var p=a[u];if(!f.call(i,p)||!ni(n[p],i[p]))return!1}return!0}function Yh(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Kh(n,i){var a=Yh(n);n=0;for(var u;a;){if(a.nodeType===3){if(u=n+a.textContent.length,n<=i&&u>=i)return{node:a,offset:i-n};n=u}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Yh(a)}}function Jh(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Jh(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Zh(){for(var n=window,i=dt();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=dt(n.document)}return i}function cc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function Rg(n){var i=Zh(),a=n.focusedElem,u=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Jh(a.ownerDocument.documentElement,a)){if(u!==null&&cc(a)){if(i=u.start,n=u.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var p=a.textContent.length,g=Math.min(u.start,p);u=u.end===void 0?g:Math.min(u.end,p),!n.extend&&g>u&&(p=u,u=g,g=p),p=Kh(a,g);var E=Kh(a,u);p&&E&&(n.rangeCount!==1||n.anchorNode!==p.node||n.anchorOffset!==p.offset||n.focusNode!==E.node||n.focusOffset!==E.offset)&&(i=i.createRange(),i.setStart(p.node,p.offset),n.removeAllRanges(),g>u?(n.addRange(i),n.extend(E.node,E.offset)):(i.setEnd(E.node,E.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Pg=h&&"documentMode"in document&&11>=document.documentMode,cs=null,uc=null,xa=null,dc=!1;function Qh(n,i,a){var u=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;dc||cs==null||cs!==dt(u)||(u=cs,"selectionStart"in u&&cc(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),xa&&ma(xa,u)||(xa=u,u=So(uc,"onSelect"),0<u.length&&(i=new tc("onSelect","select",null,i,a),n.push({event:i,listeners:u}),i.target=cs)))}function vo(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var us={animationend:vo("Animation","AnimationEnd"),animationiteration:vo("Animation","AnimationIteration"),animationstart:vo("Animation","AnimationStart"),transitionend:vo("Transition","TransitionEnd")},hc={},ef={};h&&(ef=document.createElement("div").style,"AnimationEvent"in window||(delete us.animationend.animation,delete us.animationiteration.animation,delete us.animationstart.animation),"TransitionEvent"in window||delete us.transitionend.transition);function _o(n){if(hc[n])return hc[n];if(!us[n])return n;var i=us[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in ef)return hc[n]=i[a];return n}var tf=_o("animationend"),nf=_o("animationiteration"),rf=_o("animationstart"),sf=_o("transitionend"),af=new Map,of="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nr(n,i){af.set(n,i),l(i,[n])}for(var fc=0;fc<of.length;fc++){var pc=of[fc],Dg=pc.toLowerCase(),Lg=pc[0].toUpperCase()+pc.slice(1);nr(Dg,"on"+Lg)}nr(tf,"onAnimationEnd"),nr(nf,"onAnimationIteration"),nr(rf,"onAnimationStart"),nr("dblclick","onDoubleClick"),nr("focusin","onFocus"),nr("focusout","onBlur"),nr(sf,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ga="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ig=new Set("cancel close invalid load scroll toggle".split(" ").concat(ga));function lf(n,i,a){var u=n.type||"unknown-event";n.currentTarget=a,no(u,i,void 0,n),n.currentTarget=null}function cf(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var u=n[a],p=u.event;u=u.listeners;e:{var g=void 0;if(i)for(var E=u.length-1;0<=E;E--){var F=u[E],V=F.instance,ae=F.currentTarget;if(F=F.listener,V!==g&&p.isPropagationStopped())break e;lf(p,F,ae),g=V}else for(E=0;E<u.length;E++){if(F=u[E],V=F.instance,ae=F.currentTarget,F=F.listener,V!==g&&p.isPropagationStopped())break e;lf(p,F,ae),g=V}}}if(Cr)throw n=Yi,Cr=!1,Yi=null,n}function kt(n,i){var a=i[Mc];a===void 0&&(a=i[Mc]=new Set);var u=n+"__bubble";a.has(u)||(uf(i,n,2,!1),a.add(u))}function mc(n,i,a){var u=0;i&&(u|=4),uf(a,n,u,i)}var yo="_reactListening"+Math.random().toString(36).slice(2);function va(n){if(!n[yo]){n[yo]=!0,r.forEach(function(a){a!=="selectionchange"&&(Ig.has(a)||mc(a,!1,n),mc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[yo]||(i[yo]=!0,mc("selectionchange",!1,i))}}function uf(n,i,a,u){switch(Dh(i)){case 1:var p=qx;break;case 4:p=Yx;break;default:p=Zl}a=p.bind(null,i,a,n),p=void 0,!rs||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(p=!0),u?p!==void 0?n.addEventListener(i,a,{capture:!0,passive:p}):n.addEventListener(i,a,!0):p!==void 0?n.addEventListener(i,a,{passive:p}):n.addEventListener(i,a,!1)}function xc(n,i,a,u,p){var g=u;if((i&1)===0&&(i&2)===0&&u!==null)e:for(;;){if(u===null)return;var E=u.tag;if(E===3||E===4){var F=u.stateNode.containerInfo;if(F===p||F.nodeType===8&&F.parentNode===p)break;if(E===4)for(E=u.return;E!==null;){var V=E.tag;if((V===3||V===4)&&(V=E.stateNode.containerInfo,V===p||V.nodeType===8&&V.parentNode===p))return;E=E.return}for(;F!==null;){if(E=Nr(F),E===null)return;if(V=E.tag,V===5||V===6){u=g=E;continue e}F=F.parentNode}}u=u.return}An(function(){var ae=g,ve=$(a),ye=[];e:{var xe=af.get(n);if(xe!==void 0){var Ie=tc,je=n;switch(n){case"keypress":if(po(a)===0)break e;case"keydown":case"keyup":Ie=ug;break;case"focusin":je="focus",Ie=rc;break;case"focusout":je="blur",Ie=rc;break;case"beforeblur":case"afterblur":Ie=rc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ie=Uh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ie=Zx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ie=fg;break;case tf:case nf:case rf:Ie=tg;break;case sf:Ie=mg;break;case"scroll":Ie=Kx;break;case"wheel":Ie=gg;break;case"copy":case"cut":case"paste":Ie=ig;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ie=Fh}var He=(i&4)!==0,Xt=!He&&n==="scroll",Q=He?xe!==null?xe+"Capture":null:xe;He=[];for(var W=ae,ne;W!==null;){ne=W;var Ee=ne.stateNode;if(ne.tag===5&&Ee!==null&&(ne=Ee,Q!==null&&(Ee=Mn(W,Q),Ee!=null&&He.push(_a(W,Ee,ne)))),Xt)break;W=W.return}0<He.length&&(xe=new Ie(xe,je,null,a,ve),ye.push({event:xe,listeners:He}))}}if((i&7)===0){e:{if(xe=n==="mouseover"||n==="pointerover",Ie=n==="mouseout"||n==="pointerout",xe&&a!==At&&(je=a.relatedTarget||a.fromElement)&&(Nr(je)||je[Ci]))break e;if((Ie||xe)&&(xe=ve.window===ve?ve:(xe=ve.ownerDocument)?xe.defaultView||xe.parentWindow:window,Ie?(je=a.relatedTarget||a.toElement,Ie=ae,je=je?Nr(je):null,je!==null&&(Xt=pi(je),je!==Xt||je.tag!==5&&je.tag!==6)&&(je=null)):(Ie=null,je=ae),Ie!==je)){if(He=Uh,Ee="onMouseLeave",Q="onMouseEnter",W="mouse",(n==="pointerout"||n==="pointerover")&&(He=Fh,Ee="onPointerLeave",Q="onPointerEnter",W="pointer"),Xt=Ie==null?xe:fs(Ie),ne=je==null?xe:fs(je),xe=new He(Ee,W+"leave",Ie,a,ve),xe.target=Xt,xe.relatedTarget=ne,Ee=null,Nr(ve)===ae&&(He=new He(Q,W+"enter",je,a,ve),He.target=ne,He.relatedTarget=Xt,Ee=He),Xt=Ee,Ie&&je)t:{for(He=Ie,Q=je,W=0,ne=He;ne;ne=ds(ne))W++;for(ne=0,Ee=Q;Ee;Ee=ds(Ee))ne++;for(;0<W-ne;)He=ds(He),W--;for(;0<ne-W;)Q=ds(Q),ne--;for(;W--;){if(He===Q||Q!==null&&He===Q.alternate)break t;He=ds(He),Q=ds(Q)}He=null}else He=null;Ie!==null&&df(ye,xe,Ie,He,!1),je!==null&&Xt!==null&&df(ye,Xt,je,He,!0)}}e:{if(xe=ae?fs(ae):window,Ie=xe.nodeName&&xe.nodeName.toLowerCase(),Ie==="select"||Ie==="input"&&xe.type==="file")var $e=wg;else if(Hh(xe))if(Wh)$e=Cg;else{$e=Tg;var Je=Eg}else(Ie=xe.nodeName)&&Ie.toLowerCase()==="input"&&(xe.type==="checkbox"||xe.type==="radio")&&($e=Ag);if($e&&($e=$e(n,ae))){Gh(ye,$e,a,ve);break e}Je&&Je(n,xe,ae),n==="focusout"&&(Je=xe._wrapperState)&&Je.controlled&&xe.type==="number"&&Ct(xe,"number",xe.value)}switch(Je=ae?fs(ae):window,n){case"focusin":(Hh(Je)||Je.contentEditable==="true")&&(cs=Je,uc=ae,xa=null);break;case"focusout":xa=uc=cs=null;break;case"mousedown":dc=!0;break;case"contextmenu":case"mouseup":case"dragend":dc=!1,Qh(ye,a,ve);break;case"selectionchange":if(Pg)break;case"keydown":case"keyup":Qh(ye,a,ve)}var Ze;if(ac)e:{switch(n){case"compositionstart":var rt="onCompositionStart";break e;case"compositionend":rt="onCompositionEnd";break e;case"compositionupdate":rt="onCompositionUpdate";break e}rt=void 0}else ls?jh(n,a)&&(rt="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(rt="onCompositionStart");rt&&(Oh&&a.locale!=="ko"&&(ls||rt!=="onCompositionStart"?rt==="onCompositionEnd"&&ls&&(Ze=Lh()):(tr=ve,ec="value"in tr?tr.value:tr.textContent,ls=!0)),Je=So(ae,rt),0<Je.length&&(rt=new kh(rt,n,null,a,ve),ye.push({event:rt,listeners:Je}),Ze?rt.data=Ze:(Ze=Vh(a),Ze!==null&&(rt.data=Ze)))),(Ze=_g?yg(n,a):Sg(n,a))&&(ae=So(ae,"onBeforeInput"),0<ae.length&&(ve=new kh("onBeforeInput","beforeinput",null,a,ve),ye.push({event:ve,listeners:ae}),ve.data=Ze))}cf(ye,i)})}function _a(n,i,a){return{instance:n,listener:i,currentTarget:a}}function So(n,i){for(var a=i+"Capture",u=[];n!==null;){var p=n,g=p.stateNode;p.tag===5&&g!==null&&(p=g,g=Mn(n,a),g!=null&&u.unshift(_a(n,g,p)),g=Mn(n,i),g!=null&&u.push(_a(n,g,p))),n=n.return}return u}function ds(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function df(n,i,a,u,p){for(var g=i._reactName,E=[];a!==null&&a!==u;){var F=a,V=F.alternate,ae=F.stateNode;if(V!==null&&V===u)break;F.tag===5&&ae!==null&&(F=ae,p?(V=Mn(a,g),V!=null&&E.unshift(_a(a,V,F))):p||(V=Mn(a,g),V!=null&&E.push(_a(a,V,F)))),a=a.return}E.length!==0&&n.push({event:i,listeners:E})}var Ug=/\r\n?/g,kg=/\u0000|\uFFFD/g;function hf(n){return(typeof n=="string"?n:""+n).replace(Ug,`
`).replace(kg,"")}function Mo(n,i,a){if(i=hf(i),hf(n)!==i&&a)throw Error(t(425))}function bo(){}var gc=null,vc=null;function _c(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var yc=typeof setTimeout=="function"?setTimeout:void 0,Fg=typeof clearTimeout=="function"?clearTimeout:void 0,ff=typeof Promise=="function"?Promise:void 0,Og=typeof queueMicrotask=="function"?queueMicrotask:typeof ff<"u"?function(n){return ff.resolve(null).then(n).catch(zg)}:yc;function zg(n){setTimeout(function(){throw n})}function Sc(n,i){var a=i,u=0;do{var p=a.nextSibling;if(n.removeChild(a),p&&p.nodeType===8)if(a=p.data,a==="/$"){if(u===0){n.removeChild(p),ca(i);return}u--}else a!=="$"&&a!=="$?"&&a!=="$!"||u++;a=p}while(a);ca(i)}function ir(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function pf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var hs=Math.random().toString(36).slice(2),xi="__reactFiber$"+hs,ya="__reactProps$"+hs,Ci="__reactContainer$"+hs,Mc="__reactEvents$"+hs,Bg="__reactListeners$"+hs,jg="__reactHandles$"+hs;function Nr(n){var i=n[xi];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Ci]||a[xi]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=pf(n);n!==null;){if(a=n[xi])return a;n=pf(n)}return i}n=a,a=n.parentNode}return null}function Sa(n){return n=n[xi]||n[Ci],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function fs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function wo(n){return n[ya]||null}var bc=[],ps=-1;function rr(n){return{current:n}}function Ft(n){0>ps||(n.current=bc[ps],bc[ps]=null,ps--)}function It(n,i){ps++,bc[ps]=n.current,n.current=i}var sr={},hn=rr(sr),Cn=rr(!1),Rr=sr;function ms(n,i){var a=n.type.contextTypes;if(!a)return sr;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===i)return u.__reactInternalMemoizedMaskedChildContext;var p={},g;for(g in a)p[g]=i[g];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=p),p}function Nn(n){return n=n.childContextTypes,n!=null}function Eo(){Ft(Cn),Ft(hn)}function mf(n,i,a){if(hn.current!==sr)throw Error(t(168));It(hn,i),It(Cn,a)}function xf(n,i,a){var u=n.stateNode;if(i=i.childContextTypes,typeof u.getChildContext!="function")return a;u=u.getChildContext();for(var p in u)if(!(p in i))throw Error(t(108,_e(n)||"Unknown",p));return de({},a,u)}function To(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||sr,Rr=hn.current,It(hn,n),It(Cn,Cn.current),!0}function gf(n,i,a){var u=n.stateNode;if(!u)throw Error(t(169));a?(n=xf(n,i,Rr),u.__reactInternalMemoizedMergedChildContext=n,Ft(Cn),Ft(hn),It(hn,n)):Ft(Cn),It(Cn,a)}var Ni=null,Ao=!1,wc=!1;function vf(n){Ni===null?Ni=[n]:Ni.push(n)}function Vg(n){Ao=!0,vf(n)}function ar(){if(!wc&&Ni!==null){wc=!0;var n=0,i=bt;try{var a=Ni;for(bt=1;n<a.length;n++){var u=a[n];do u=u(!0);while(u!==null)}Ni=null,Ao=!1}catch(p){throw Ni!==null&&(Ni=Ni.slice(n+1)),oo(Se,ar),p}finally{bt=i,wc=!1}}return null}var xs=[],gs=0,Co=null,No=0,$n=[],qn=0,Pr=null,Ri=1,Pi="";function Dr(n,i){xs[gs++]=No,xs[gs++]=Co,Co=n,No=i}function _f(n,i,a){$n[qn++]=Ri,$n[qn++]=Pi,$n[qn++]=Pr,Pr=n;var u=Ri;n=Pi;var p=32-lt(u)-1;u&=~(1<<p),a+=1;var g=32-lt(i)+p;if(30<g){var E=p-p%5;g=(u&(1<<E)-1).toString(32),u>>=E,p-=E,Ri=1<<32-lt(i)+p|a<<p|u,Pi=g+n}else Ri=1<<g|a<<p|u,Pi=n}function Ec(n){n.return!==null&&(Dr(n,1),_f(n,1,0))}function Tc(n){for(;n===Co;)Co=xs[--gs],xs[gs]=null,No=xs[--gs],xs[gs]=null;for(;n===Pr;)Pr=$n[--qn],$n[qn]=null,Pi=$n[--qn],$n[qn]=null,Ri=$n[--qn],$n[qn]=null}var Bn=null,jn=null,zt=!1,ii=null;function yf(n,i){var a=Zn(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function Sf(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Bn=n,jn=ir(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Bn=n,jn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Pr!==null?{id:Ri,overflow:Pi}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=Zn(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Bn=n,jn=null,!0):!1;default:return!1}}function Ac(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Cc(n){if(zt){var i=jn;if(i){var a=i;if(!Sf(n,i)){if(Ac(n))throw Error(t(418));i=ir(a.nextSibling);var u=Bn;i&&Sf(n,i)?yf(u,a):(n.flags=n.flags&-4097|2,zt=!1,Bn=n)}}else{if(Ac(n))throw Error(t(418));n.flags=n.flags&-4097|2,zt=!1,Bn=n}}}function Mf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Bn=n}function Ro(n){if(n!==Bn)return!1;if(!zt)return Mf(n),zt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!_c(n.type,n.memoizedProps)),i&&(i=jn)){if(Ac(n))throw bf(),Error(t(418));for(;i;)yf(n,i),i=ir(i.nextSibling)}if(Mf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){jn=ir(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}jn=null}}else jn=Bn?ir(n.stateNode.nextSibling):null;return!0}function bf(){for(var n=jn;n;)n=ir(n.nextSibling)}function vs(){jn=Bn=null,zt=!1}function Nc(n){ii===null?ii=[n]:ii.push(n)}var Hg=w.ReactCurrentBatchConfig;function Ma(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var u=a.stateNode}if(!u)throw Error(t(147,n));var p=u,g=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===g?i.ref:(i=function(E){var F=p.refs;E===null?delete F[g]:F[g]=E},i._stringRef=g,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Po(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function wf(n){var i=n._init;return i(n._payload)}function Ef(n){function i(Q,W){if(n){var ne=Q.deletions;ne===null?(Q.deletions=[W],Q.flags|=16):ne.push(W)}}function a(Q,W){if(!n)return null;for(;W!==null;)i(Q,W),W=W.sibling;return null}function u(Q,W){for(Q=new Map;W!==null;)W.key!==null?Q.set(W.key,W):Q.set(W.index,W),W=W.sibling;return Q}function p(Q,W){return Q=pr(Q,W),Q.index=0,Q.sibling=null,Q}function g(Q,W,ne){return Q.index=ne,n?(ne=Q.alternate,ne!==null?(ne=ne.index,ne<W?(Q.flags|=2,W):ne):(Q.flags|=2,W)):(Q.flags|=1048576,W)}function E(Q){return n&&Q.alternate===null&&(Q.flags|=2),Q}function F(Q,W,ne,Ee){return W===null||W.tag!==6?(W=yu(ne,Q.mode,Ee),W.return=Q,W):(W=p(W,ne),W.return=Q,W)}function V(Q,W,ne,Ee){var $e=ne.type;return $e===U?ve(Q,W,ne.props.children,Ee,ne.key):W!==null&&(W.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===G&&wf($e)===W.type)?(Ee=p(W,ne.props),Ee.ref=Ma(Q,W,ne),Ee.return=Q,Ee):(Ee=tl(ne.type,ne.key,ne.props,null,Q.mode,Ee),Ee.ref=Ma(Q,W,ne),Ee.return=Q,Ee)}function ae(Q,W,ne,Ee){return W===null||W.tag!==4||W.stateNode.containerInfo!==ne.containerInfo||W.stateNode.implementation!==ne.implementation?(W=Su(ne,Q.mode,Ee),W.return=Q,W):(W=p(W,ne.children||[]),W.return=Q,W)}function ve(Q,W,ne,Ee,$e){return W===null||W.tag!==7?(W=Br(ne,Q.mode,Ee,$e),W.return=Q,W):(W=p(W,ne),W.return=Q,W)}function ye(Q,W,ne){if(typeof W=="string"&&W!==""||typeof W=="number")return W=yu(""+W,Q.mode,ne),W.return=Q,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case D:return ne=tl(W.type,W.key,W.props,null,Q.mode,ne),ne.ref=Ma(Q,null,W),ne.return=Q,ne;case P:return W=Su(W,Q.mode,ne),W.return=Q,W;case G:var Ee=W._init;return ye(Q,Ee(W._payload),ne)}if(We(W)||oe(W))return W=Br(W,Q.mode,ne,null),W.return=Q,W;Po(Q,W)}return null}function xe(Q,W,ne,Ee){var $e=W!==null?W.key:null;if(typeof ne=="string"&&ne!==""||typeof ne=="number")return $e!==null?null:F(Q,W,""+ne,Ee);if(typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case D:return ne.key===$e?V(Q,W,ne,Ee):null;case P:return ne.key===$e?ae(Q,W,ne,Ee):null;case G:return $e=ne._init,xe(Q,W,$e(ne._payload),Ee)}if(We(ne)||oe(ne))return $e!==null?null:ve(Q,W,ne,Ee,null);Po(Q,ne)}return null}function Ie(Q,W,ne,Ee,$e){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number")return Q=Q.get(ne)||null,F(W,Q,""+Ee,$e);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case D:return Q=Q.get(Ee.key===null?ne:Ee.key)||null,V(W,Q,Ee,$e);case P:return Q=Q.get(Ee.key===null?ne:Ee.key)||null,ae(W,Q,Ee,$e);case G:var Je=Ee._init;return Ie(Q,W,ne,Je(Ee._payload),$e)}if(We(Ee)||oe(Ee))return Q=Q.get(ne)||null,ve(W,Q,Ee,$e,null);Po(W,Ee)}return null}function je(Q,W,ne,Ee){for(var $e=null,Je=null,Ze=W,rt=W=0,sn=null;Ze!==null&&rt<ne.length;rt++){Ze.index>rt?(sn=Ze,Ze=null):sn=Ze.sibling;var Et=xe(Q,Ze,ne[rt],Ee);if(Et===null){Ze===null&&(Ze=sn);break}n&&Ze&&Et.alternate===null&&i(Q,Ze),W=g(Et,W,rt),Je===null?$e=Et:Je.sibling=Et,Je=Et,Ze=sn}if(rt===ne.length)return a(Q,Ze),zt&&Dr(Q,rt),$e;if(Ze===null){for(;rt<ne.length;rt++)Ze=ye(Q,ne[rt],Ee),Ze!==null&&(W=g(Ze,W,rt),Je===null?$e=Ze:Je.sibling=Ze,Je=Ze);return zt&&Dr(Q,rt),$e}for(Ze=u(Q,Ze);rt<ne.length;rt++)sn=Ie(Ze,Q,rt,ne[rt],Ee),sn!==null&&(n&&sn.alternate!==null&&Ze.delete(sn.key===null?rt:sn.key),W=g(sn,W,rt),Je===null?$e=sn:Je.sibling=sn,Je=sn);return n&&Ze.forEach(function(mr){return i(Q,mr)}),zt&&Dr(Q,rt),$e}function He(Q,W,ne,Ee){var $e=oe(ne);if(typeof $e!="function")throw Error(t(150));if(ne=$e.call(ne),ne==null)throw Error(t(151));for(var Je=$e=null,Ze=W,rt=W=0,sn=null,Et=ne.next();Ze!==null&&!Et.done;rt++,Et=ne.next()){Ze.index>rt?(sn=Ze,Ze=null):sn=Ze.sibling;var mr=xe(Q,Ze,Et.value,Ee);if(mr===null){Ze===null&&(Ze=sn);break}n&&Ze&&mr.alternate===null&&i(Q,Ze),W=g(mr,W,rt),Je===null?$e=mr:Je.sibling=mr,Je=mr,Ze=sn}if(Et.done)return a(Q,Ze),zt&&Dr(Q,rt),$e;if(Ze===null){for(;!Et.done;rt++,Et=ne.next())Et=ye(Q,Et.value,Ee),Et!==null&&(W=g(Et,W,rt),Je===null?$e=Et:Je.sibling=Et,Je=Et);return zt&&Dr(Q,rt),$e}for(Ze=u(Q,Ze);!Et.done;rt++,Et=ne.next())Et=Ie(Ze,Q,rt,Et.value,Ee),Et!==null&&(n&&Et.alternate!==null&&Ze.delete(Et.key===null?rt:Et.key),W=g(Et,W,rt),Je===null?$e=Et:Je.sibling=Et,Je=Et);return n&&Ze.forEach(function(Mv){return i(Q,Mv)}),zt&&Dr(Q,rt),$e}function Xt(Q,W,ne,Ee){if(typeof ne=="object"&&ne!==null&&ne.type===U&&ne.key===null&&(ne=ne.props.children),typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case D:e:{for(var $e=ne.key,Je=W;Je!==null;){if(Je.key===$e){if($e=ne.type,$e===U){if(Je.tag===7){a(Q,Je.sibling),W=p(Je,ne.props.children),W.return=Q,Q=W;break e}}else if(Je.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===G&&wf($e)===Je.type){a(Q,Je.sibling),W=p(Je,ne.props),W.ref=Ma(Q,Je,ne),W.return=Q,Q=W;break e}a(Q,Je);break}else i(Q,Je);Je=Je.sibling}ne.type===U?(W=Br(ne.props.children,Q.mode,Ee,ne.key),W.return=Q,Q=W):(Ee=tl(ne.type,ne.key,ne.props,null,Q.mode,Ee),Ee.ref=Ma(Q,W,ne),Ee.return=Q,Q=Ee)}return E(Q);case P:e:{for(Je=ne.key;W!==null;){if(W.key===Je)if(W.tag===4&&W.stateNode.containerInfo===ne.containerInfo&&W.stateNode.implementation===ne.implementation){a(Q,W.sibling),W=p(W,ne.children||[]),W.return=Q,Q=W;break e}else{a(Q,W);break}else i(Q,W);W=W.sibling}W=Su(ne,Q.mode,Ee),W.return=Q,Q=W}return E(Q);case G:return Je=ne._init,Xt(Q,W,Je(ne._payload),Ee)}if(We(ne))return je(Q,W,ne,Ee);if(oe(ne))return He(Q,W,ne,Ee);Po(Q,ne)}return typeof ne=="string"&&ne!==""||typeof ne=="number"?(ne=""+ne,W!==null&&W.tag===6?(a(Q,W.sibling),W=p(W,ne),W.return=Q,Q=W):(a(Q,W),W=yu(ne,Q.mode,Ee),W.return=Q,Q=W),E(Q)):a(Q,W)}return Xt}var _s=Ef(!0),Tf=Ef(!1),Do=rr(null),Lo=null,ys=null,Rc=null;function Pc(){Rc=ys=Lo=null}function Dc(n){var i=Do.current;Ft(Do),n._currentValue=i}function Lc(n,i,a){for(;n!==null;){var u=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,u!==null&&(u.childLanes|=i)):u!==null&&(u.childLanes&i)!==i&&(u.childLanes|=i),n===a)break;n=n.return}}function Ss(n,i){Lo=n,Rc=ys=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(Rn=!0),n.firstContext=null)}function Yn(n){var i=n._currentValue;if(Rc!==n)if(n={context:n,memoizedValue:i,next:null},ys===null){if(Lo===null)throw Error(t(308));ys=n,Lo.dependencies={lanes:0,firstContext:n}}else ys=ys.next=n;return i}var Lr=null;function Ic(n){Lr===null?Lr=[n]:Lr.push(n)}function Af(n,i,a,u){var p=i.interleaved;return p===null?(a.next=a,Ic(i)):(a.next=p.next,p.next=a),i.interleaved=a,Di(n,u)}function Di(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var or=!1;function Uc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Cf(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Li(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function lr(n,i,a){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(wt&2)!==0){var p=u.pending;return p===null?i.next=i:(i.next=p.next,p.next=i),u.pending=i,Di(n,a)}return p=u.interleaved,p===null?(i.next=i,Ic(u)):(i.next=p.next,p.next=i),u.interleaved=i,Di(n,a)}function Io(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var u=i.lanes;u&=n.pendingLanes,a|=u,i.lanes=a,tn(n,a)}}function Nf(n,i){var a=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,a===u)){var p=null,g=null;if(a=a.firstBaseUpdate,a!==null){do{var E={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};g===null?p=g=E:g=g.next=E,a=a.next}while(a!==null);g===null?p=g=i:g=g.next=i}else p=g=i;a={baseState:u.baseState,firstBaseUpdate:p,lastBaseUpdate:g,shared:u.shared,effects:u.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Uo(n,i,a,u){var p=n.updateQueue;or=!1;var g=p.firstBaseUpdate,E=p.lastBaseUpdate,F=p.shared.pending;if(F!==null){p.shared.pending=null;var V=F,ae=V.next;V.next=null,E===null?g=ae:E.next=ae,E=V;var ve=n.alternate;ve!==null&&(ve=ve.updateQueue,F=ve.lastBaseUpdate,F!==E&&(F===null?ve.firstBaseUpdate=ae:F.next=ae,ve.lastBaseUpdate=V))}if(g!==null){var ye=p.baseState;E=0,ve=ae=V=null,F=g;do{var xe=F.lane,Ie=F.eventTime;if((u&xe)===xe){ve!==null&&(ve=ve.next={eventTime:Ie,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var je=n,He=F;switch(xe=i,Ie=a,He.tag){case 1:if(je=He.payload,typeof je=="function"){ye=je.call(Ie,ye,xe);break e}ye=je;break e;case 3:je.flags=je.flags&-65537|128;case 0:if(je=He.payload,xe=typeof je=="function"?je.call(Ie,ye,xe):je,xe==null)break e;ye=de({},ye,xe);break e;case 2:or=!0}}F.callback!==null&&F.lane!==0&&(n.flags|=64,xe=p.effects,xe===null?p.effects=[F]:xe.push(F))}else Ie={eventTime:Ie,lane:xe,tag:F.tag,payload:F.payload,callback:F.callback,next:null},ve===null?(ae=ve=Ie,V=ye):ve=ve.next=Ie,E|=xe;if(F=F.next,F===null){if(F=p.shared.pending,F===null)break;xe=F,F=xe.next,xe.next=null,p.lastBaseUpdate=xe,p.shared.pending=null}}while(!0);if(ve===null&&(V=ye),p.baseState=V,p.firstBaseUpdate=ae,p.lastBaseUpdate=ve,i=p.shared.interleaved,i!==null){p=i;do E|=p.lane,p=p.next;while(p!==i)}else g===null&&(p.shared.lanes=0);kr|=E,n.lanes=E,n.memoizedState=ye}}function Rf(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var u=n[i],p=u.callback;if(p!==null){if(u.callback=null,u=a,typeof p!="function")throw Error(t(191,p));p.call(u)}}}var ba={},gi=rr(ba),wa=rr(ba),Ea=rr(ba);function Ir(n){if(n===ba)throw Error(t(174));return n}function kc(n,i){switch(It(Ea,i),It(wa,n),It(gi,ba),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Xe(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=Xe(i,n)}Ft(gi),It(gi,i)}function Ms(){Ft(gi),Ft(wa),Ft(Ea)}function Pf(n){Ir(Ea.current);var i=Ir(gi.current),a=Xe(i,n.type);i!==a&&(It(wa,n),It(gi,a))}function Fc(n){wa.current===n&&(Ft(gi),Ft(wa))}var jt=rr(0);function ko(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Oc=[];function zc(){for(var n=0;n<Oc.length;n++)Oc[n]._workInProgressVersionPrimary=null;Oc.length=0}var Fo=w.ReactCurrentDispatcher,Bc=w.ReactCurrentBatchConfig,Ur=0,Vt=null,Kt=null,nn=null,Oo=!1,Ta=!1,Aa=0,Gg=0;function fn(){throw Error(t(321))}function jc(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!ni(n[a],i[a]))return!1;return!0}function Vc(n,i,a,u,p,g){if(Ur=g,Vt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Fo.current=n===null||n.memoizedState===null?qg:Yg,n=a(u,p),Ta){g=0;do{if(Ta=!1,Aa=0,25<=g)throw Error(t(301));g+=1,nn=Kt=null,i.updateQueue=null,Fo.current=Kg,n=a(u,p)}while(Ta)}if(Fo.current=jo,i=Kt!==null&&Kt.next!==null,Ur=0,nn=Kt=Vt=null,Oo=!1,i)throw Error(t(300));return n}function Hc(){var n=Aa!==0;return Aa=0,n}function vi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return nn===null?Vt.memoizedState=nn=n:nn=nn.next=n,nn}function Kn(){if(Kt===null){var n=Vt.alternate;n=n!==null?n.memoizedState:null}else n=Kt.next;var i=nn===null?Vt.memoizedState:nn.next;if(i!==null)nn=i,Kt=n;else{if(n===null)throw Error(t(310));Kt=n,n={memoizedState:Kt.memoizedState,baseState:Kt.baseState,baseQueue:Kt.baseQueue,queue:Kt.queue,next:null},nn===null?Vt.memoizedState=nn=n:nn=nn.next=n}return nn}function Ca(n,i){return typeof i=="function"?i(n):i}function Gc(n){var i=Kn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=Kt,p=u.baseQueue,g=a.pending;if(g!==null){if(p!==null){var E=p.next;p.next=g.next,g.next=E}u.baseQueue=p=g,a.pending=null}if(p!==null){g=p.next,u=u.baseState;var F=E=null,V=null,ae=g;do{var ve=ae.lane;if((Ur&ve)===ve)V!==null&&(V=V.next={lane:0,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null}),u=ae.hasEagerState?ae.eagerState:n(u,ae.action);else{var ye={lane:ve,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null};V===null?(F=V=ye,E=u):V=V.next=ye,Vt.lanes|=ve,kr|=ve}ae=ae.next}while(ae!==null&&ae!==g);V===null?E=u:V.next=F,ni(u,i.memoizedState)||(Rn=!0),i.memoizedState=u,i.baseState=E,i.baseQueue=V,a.lastRenderedState=u}if(n=a.interleaved,n!==null){p=n;do g=p.lane,Vt.lanes|=g,kr|=g,p=p.next;while(p!==n)}else p===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function Wc(n){var i=Kn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=a.dispatch,p=a.pending,g=i.memoizedState;if(p!==null){a.pending=null;var E=p=p.next;do g=n(g,E.action),E=E.next;while(E!==p);ni(g,i.memoizedState)||(Rn=!0),i.memoizedState=g,i.baseQueue===null&&(i.baseState=g),a.lastRenderedState=g}return[g,u]}function Df(){}function Lf(n,i){var a=Vt,u=Kn(),p=i(),g=!ni(u.memoizedState,p);if(g&&(u.memoizedState=p,Rn=!0),u=u.queue,Xc(kf.bind(null,a,u,n),[n]),u.getSnapshot!==i||g||nn!==null&&nn.memoizedState.tag&1){if(a.flags|=2048,Na(9,Uf.bind(null,a,u,p,i),void 0,null),rn===null)throw Error(t(349));(Ur&30)!==0||If(a,i,p)}return p}function If(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=Vt.updateQueue,i===null?(i={lastEffect:null,stores:null},Vt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function Uf(n,i,a,u){i.value=a,i.getSnapshot=u,Ff(i)&&Of(n)}function kf(n,i,a){return a(function(){Ff(i)&&Of(n)})}function Ff(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!ni(n,a)}catch{return!0}}function Of(n){var i=Di(n,1);i!==null&&oi(i,n,1,-1)}function zf(n){var i=vi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ca,lastRenderedState:n},i.queue=n,n=n.dispatch=$g.bind(null,Vt,n),[i.memoizedState,n]}function Na(n,i,a,u){return n={tag:n,create:i,destroy:a,deps:u,next:null},i=Vt.updateQueue,i===null?(i={lastEffect:null,stores:null},Vt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(u=a.next,a.next=n,n.next=u,i.lastEffect=n)),n}function Bf(){return Kn().memoizedState}function zo(n,i,a,u){var p=vi();Vt.flags|=n,p.memoizedState=Na(1|i,a,void 0,u===void 0?null:u)}function Bo(n,i,a,u){var p=Kn();u=u===void 0?null:u;var g=void 0;if(Kt!==null){var E=Kt.memoizedState;if(g=E.destroy,u!==null&&jc(u,E.deps)){p.memoizedState=Na(i,a,g,u);return}}Vt.flags|=n,p.memoizedState=Na(1|i,a,g,u)}function jf(n,i){return zo(8390656,8,n,i)}function Xc(n,i){return Bo(2048,8,n,i)}function Vf(n,i){return Bo(4,2,n,i)}function Hf(n,i){return Bo(4,4,n,i)}function Gf(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function Wf(n,i,a){return a=a!=null?a.concat([n]):null,Bo(4,4,Gf.bind(null,i,n),a)}function $c(){}function Xf(n,i){var a=Kn();i=i===void 0?null:i;var u=a.memoizedState;return u!==null&&i!==null&&jc(i,u[1])?u[0]:(a.memoizedState=[n,i],n)}function $f(n,i){var a=Kn();i=i===void 0?null:i;var u=a.memoizedState;return u!==null&&i!==null&&jc(i,u[1])?u[0]:(n=n(),a.memoizedState=[n,i],n)}function qf(n,i,a){return(Ur&21)===0?(n.baseState&&(n.baseState=!1,Rn=!0),n.memoizedState=a):(ni(a,i)||(a=Pt(),Vt.lanes|=a,kr|=a,n.baseState=!0),i)}function Wg(n,i){var a=bt;bt=a!==0&&4>a?a:4,n(!0);var u=Bc.transition;Bc.transition={};try{n(!1),i()}finally{bt=a,Bc.transition=u}}function Yf(){return Kn().memoizedState}function Xg(n,i,a){var u=hr(n);if(a={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null},Kf(n))Jf(i,a);else if(a=Af(n,i,a,u),a!==null){var p=En();oi(a,n,u,p),Zf(a,i,u)}}function $g(n,i,a){var u=hr(n),p={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null};if(Kf(n))Jf(i,p);else{var g=n.alternate;if(n.lanes===0&&(g===null||g.lanes===0)&&(g=i.lastRenderedReducer,g!==null))try{var E=i.lastRenderedState,F=g(E,a);if(p.hasEagerState=!0,p.eagerState=F,ni(F,E)){var V=i.interleaved;V===null?(p.next=p,Ic(i)):(p.next=V.next,V.next=p),i.interleaved=p;return}}catch{}finally{}a=Af(n,i,p,u),a!==null&&(p=En(),oi(a,n,u,p),Zf(a,i,u))}}function Kf(n){var i=n.alternate;return n===Vt||i!==null&&i===Vt}function Jf(n,i){Ta=Oo=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Zf(n,i,a){if((a&4194240)!==0){var u=i.lanes;u&=n.pendingLanes,a|=u,i.lanes=a,tn(n,a)}}var jo={readContext:Yn,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useInsertionEffect:fn,useLayoutEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useMutableSource:fn,useSyncExternalStore:fn,useId:fn,unstable_isNewReconciler:!1},qg={readContext:Yn,useCallback:function(n,i){return vi().memoizedState=[n,i===void 0?null:i],n},useContext:Yn,useEffect:jf,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,zo(4194308,4,Gf.bind(null,i,n),a)},useLayoutEffect:function(n,i){return zo(4194308,4,n,i)},useInsertionEffect:function(n,i){return zo(4,2,n,i)},useMemo:function(n,i){var a=vi();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var u=vi();return i=a!==void 0?a(i):i,u.memoizedState=u.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},u.queue=n,n=n.dispatch=Xg.bind(null,Vt,n),[u.memoizedState,n]},useRef:function(n){var i=vi();return n={current:n},i.memoizedState=n},useState:zf,useDebugValue:$c,useDeferredValue:function(n){return vi().memoizedState=n},useTransition:function(){var n=zf(!1),i=n[0];return n=Wg.bind(null,n[1]),vi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var u=Vt,p=vi();if(zt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),rn===null)throw Error(t(349));(Ur&30)!==0||If(u,i,a)}p.memoizedState=a;var g={value:a,getSnapshot:i};return p.queue=g,jf(kf.bind(null,u,g,n),[n]),u.flags|=2048,Na(9,Uf.bind(null,u,g,a,i),void 0,null),a},useId:function(){var n=vi(),i=rn.identifierPrefix;if(zt){var a=Pi,u=Ri;a=(u&~(1<<32-lt(u)-1)).toString(32)+a,i=":"+i+"R"+a,a=Aa++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=Gg++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},Yg={readContext:Yn,useCallback:Xf,useContext:Yn,useEffect:Xc,useImperativeHandle:Wf,useInsertionEffect:Vf,useLayoutEffect:Hf,useMemo:$f,useReducer:Gc,useRef:Bf,useState:function(){return Gc(Ca)},useDebugValue:$c,useDeferredValue:function(n){var i=Kn();return qf(i,Kt.memoizedState,n)},useTransition:function(){var n=Gc(Ca)[0],i=Kn().memoizedState;return[n,i]},useMutableSource:Df,useSyncExternalStore:Lf,useId:Yf,unstable_isNewReconciler:!1},Kg={readContext:Yn,useCallback:Xf,useContext:Yn,useEffect:Xc,useImperativeHandle:Wf,useInsertionEffect:Vf,useLayoutEffect:Hf,useMemo:$f,useReducer:Wc,useRef:Bf,useState:function(){return Wc(Ca)},useDebugValue:$c,useDeferredValue:function(n){var i=Kn();return Kt===null?i.memoizedState=n:qf(i,Kt.memoizedState,n)},useTransition:function(){var n=Wc(Ca)[0],i=Kn().memoizedState;return[n,i]},useMutableSource:Df,useSyncExternalStore:Lf,useId:Yf,unstable_isNewReconciler:!1};function ri(n,i){if(n&&n.defaultProps){i=de({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function qc(n,i,a,u){i=n.memoizedState,a=a(u,i),a=a==null?i:de({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var Vo={isMounted:function(n){return(n=n._reactInternals)?pi(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var u=En(),p=hr(n),g=Li(u,p);g.payload=i,a!=null&&(g.callback=a),i=lr(n,g,p),i!==null&&(oi(i,n,p,u),Io(i,n,p))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var u=En(),p=hr(n),g=Li(u,p);g.tag=1,g.payload=i,a!=null&&(g.callback=a),i=lr(n,g,p),i!==null&&(oi(i,n,p,u),Io(i,n,p))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=En(),u=hr(n),p=Li(a,u);p.tag=2,i!=null&&(p.callback=i),i=lr(n,p,u),i!==null&&(oi(i,n,u,a),Io(i,n,u))}};function Qf(n,i,a,u,p,g,E){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,g,E):i.prototype&&i.prototype.isPureReactComponent?!ma(a,u)||!ma(p,g):!0}function ep(n,i,a){var u=!1,p=sr,g=i.contextType;return typeof g=="object"&&g!==null?g=Yn(g):(p=Nn(i)?Rr:hn.current,u=i.contextTypes,g=(u=u!=null)?ms(n,p):sr),i=new i(a,g),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Vo,n.stateNode=i,i._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=p,n.__reactInternalMemoizedMaskedChildContext=g),i}function tp(n,i,a,u){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,u),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,u),i.state!==n&&Vo.enqueueReplaceState(i,i.state,null)}function Yc(n,i,a,u){var p=n.stateNode;p.props=a,p.state=n.memoizedState,p.refs={},Uc(n);var g=i.contextType;typeof g=="object"&&g!==null?p.context=Yn(g):(g=Nn(i)?Rr:hn.current,p.context=ms(n,g)),p.state=n.memoizedState,g=i.getDerivedStateFromProps,typeof g=="function"&&(qc(n,i,g,a),p.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(i=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),i!==p.state&&Vo.enqueueReplaceState(p,p.state,null),Uo(n,a,p,u),p.state=n.memoizedState),typeof p.componentDidMount=="function"&&(n.flags|=4194308)}function bs(n,i){try{var a="",u=i;do a+=pe(u),u=u.return;while(u);var p=a}catch(g){p=`
Error generating stack: `+g.message+`
`+g.stack}return{value:n,source:i,stack:p,digest:null}}function Kc(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function Jc(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var Jg=typeof WeakMap=="function"?WeakMap:Map;function np(n,i,a){a=Li(-1,a),a.tag=3,a.payload={element:null};var u=i.value;return a.callback=function(){Yo||(Yo=!0,hu=u),Jc(n,i)},a}function ip(n,i,a){a=Li(-1,a),a.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var p=i.value;a.payload=function(){return u(p)},a.callback=function(){Jc(n,i)}}var g=n.stateNode;return g!==null&&typeof g.componentDidCatch=="function"&&(a.callback=function(){Jc(n,i),typeof u!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var E=i.stack;this.componentDidCatch(i.value,{componentStack:E!==null?E:""})}),a}function rp(n,i,a){var u=n.pingCache;if(u===null){u=n.pingCache=new Jg;var p=new Set;u.set(i,p)}else p=u.get(i),p===void 0&&(p=new Set,u.set(i,p));p.has(a)||(p.add(a),n=dv.bind(null,n,i,a),i.then(n,n))}function sp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function ap(n,i,a,u,p){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Li(-1,1),i.tag=2,lr(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=p,n)}var Zg=w.ReactCurrentOwner,Rn=!1;function wn(n,i,a,u){i.child=n===null?Tf(i,null,a,u):_s(i,n.child,a,u)}function op(n,i,a,u,p){a=a.render;var g=i.ref;return Ss(i,p),u=Vc(n,i,a,u,g,p),a=Hc(),n!==null&&!Rn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~p,Ii(n,i,p)):(zt&&a&&Ec(i),i.flags|=1,wn(n,i,u,p),i.child)}function lp(n,i,a,u,p){if(n===null){var g=a.type;return typeof g=="function"&&!_u(g)&&g.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=g,cp(n,i,g,u,p)):(n=tl(a.type,null,u,i,i.mode,p),n.ref=i.ref,n.return=i,i.child=n)}if(g=n.child,(n.lanes&p)===0){var E=g.memoizedProps;if(a=a.compare,a=a!==null?a:ma,a(E,u)&&n.ref===i.ref)return Ii(n,i,p)}return i.flags|=1,n=pr(g,u),n.ref=i.ref,n.return=i,i.child=n}function cp(n,i,a,u,p){if(n!==null){var g=n.memoizedProps;if(ma(g,u)&&n.ref===i.ref)if(Rn=!1,i.pendingProps=u=g,(n.lanes&p)!==0)(n.flags&131072)!==0&&(Rn=!0);else return i.lanes=n.lanes,Ii(n,i,p)}return Zc(n,i,a,u,p)}function up(n,i,a){var u=i.pendingProps,p=u.children,g=n!==null?n.memoizedState:null;if(u.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},It(Es,Vn),Vn|=a;else{if((a&1073741824)===0)return n=g!==null?g.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,It(Es,Vn),Vn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=g!==null?g.baseLanes:a,It(Es,Vn),Vn|=u}else g!==null?(u=g.baseLanes|a,i.memoizedState=null):u=a,It(Es,Vn),Vn|=u;return wn(n,i,p,a),i.child}function dp(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function Zc(n,i,a,u,p){var g=Nn(a)?Rr:hn.current;return g=ms(i,g),Ss(i,p),a=Vc(n,i,a,u,g,p),u=Hc(),n!==null&&!Rn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~p,Ii(n,i,p)):(zt&&u&&Ec(i),i.flags|=1,wn(n,i,a,p),i.child)}function hp(n,i,a,u,p){if(Nn(a)){var g=!0;To(i)}else g=!1;if(Ss(i,p),i.stateNode===null)Go(n,i),ep(i,a,u),Yc(i,a,u,p),u=!0;else if(n===null){var E=i.stateNode,F=i.memoizedProps;E.props=F;var V=E.context,ae=a.contextType;typeof ae=="object"&&ae!==null?ae=Yn(ae):(ae=Nn(a)?Rr:hn.current,ae=ms(i,ae));var ve=a.getDerivedStateFromProps,ye=typeof ve=="function"||typeof E.getSnapshotBeforeUpdate=="function";ye||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(F!==u||V!==ae)&&tp(i,E,u,ae),or=!1;var xe=i.memoizedState;E.state=xe,Uo(i,u,E,p),V=i.memoizedState,F!==u||xe!==V||Cn.current||or?(typeof ve=="function"&&(qc(i,a,ve,u),V=i.memoizedState),(F=or||Qf(i,a,F,u,xe,V,ae))?(ye||typeof E.UNSAFE_componentWillMount!="function"&&typeof E.componentWillMount!="function"||(typeof E.componentWillMount=="function"&&E.componentWillMount(),typeof E.UNSAFE_componentWillMount=="function"&&E.UNSAFE_componentWillMount()),typeof E.componentDidMount=="function"&&(i.flags|=4194308)):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=u,i.memoizedState=V),E.props=u,E.state=V,E.context=ae,u=F):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),u=!1)}else{E=i.stateNode,Cf(n,i),F=i.memoizedProps,ae=i.type===i.elementType?F:ri(i.type,F),E.props=ae,ye=i.pendingProps,xe=E.context,V=a.contextType,typeof V=="object"&&V!==null?V=Yn(V):(V=Nn(a)?Rr:hn.current,V=ms(i,V));var Ie=a.getDerivedStateFromProps;(ve=typeof Ie=="function"||typeof E.getSnapshotBeforeUpdate=="function")||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(F!==ye||xe!==V)&&tp(i,E,u,V),or=!1,xe=i.memoizedState,E.state=xe,Uo(i,u,E,p);var je=i.memoizedState;F!==ye||xe!==je||Cn.current||or?(typeof Ie=="function"&&(qc(i,a,Ie,u),je=i.memoizedState),(ae=or||Qf(i,a,ae,u,xe,je,V)||!1)?(ve||typeof E.UNSAFE_componentWillUpdate!="function"&&typeof E.componentWillUpdate!="function"||(typeof E.componentWillUpdate=="function"&&E.componentWillUpdate(u,je,V),typeof E.UNSAFE_componentWillUpdate=="function"&&E.UNSAFE_componentWillUpdate(u,je,V)),typeof E.componentDidUpdate=="function"&&(i.flags|=4),typeof E.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof E.componentDidUpdate!="function"||F===n.memoizedProps&&xe===n.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&xe===n.memoizedState||(i.flags|=1024),i.memoizedProps=u,i.memoizedState=je),E.props=u,E.state=je,E.context=V,u=ae):(typeof E.componentDidUpdate!="function"||F===n.memoizedProps&&xe===n.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&xe===n.memoizedState||(i.flags|=1024),u=!1)}return Qc(n,i,a,u,g,p)}function Qc(n,i,a,u,p,g){dp(n,i);var E=(i.flags&128)!==0;if(!u&&!E)return p&&gf(i,a,!1),Ii(n,i,g);u=i.stateNode,Zg.current=i;var F=E&&typeof a.getDerivedStateFromError!="function"?null:u.render();return i.flags|=1,n!==null&&E?(i.child=_s(i,n.child,null,g),i.child=_s(i,null,F,g)):wn(n,i,F,g),i.memoizedState=u.state,p&&gf(i,a,!0),i.child}function fp(n){var i=n.stateNode;i.pendingContext?mf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&mf(n,i.context,!1),kc(n,i.containerInfo)}function pp(n,i,a,u,p){return vs(),Nc(p),i.flags|=256,wn(n,i,a,u),i.child}var eu={dehydrated:null,treeContext:null,retryLane:0};function tu(n){return{baseLanes:n,cachePool:null,transitions:null}}function mp(n,i,a){var u=i.pendingProps,p=jt.current,g=!1,E=(i.flags&128)!==0,F;if((F=E)||(F=n!==null&&n.memoizedState===null?!1:(p&2)!==0),F?(g=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(p|=1),It(jt,p&1),n===null)return Cc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(E=u.children,n=u.fallback,g?(u=i.mode,g=i.child,E={mode:"hidden",children:E},(u&1)===0&&g!==null?(g.childLanes=0,g.pendingProps=E):g=nl(E,u,0,null),n=Br(n,u,a,null),g.return=i,n.return=i,g.sibling=n,i.child=g,i.child.memoizedState=tu(a),i.memoizedState=eu,n):nu(i,E));if(p=n.memoizedState,p!==null&&(F=p.dehydrated,F!==null))return Qg(n,i,E,u,F,p,a);if(g){g=u.fallback,E=i.mode,p=n.child,F=p.sibling;var V={mode:"hidden",children:u.children};return(E&1)===0&&i.child!==p?(u=i.child,u.childLanes=0,u.pendingProps=V,i.deletions=null):(u=pr(p,V),u.subtreeFlags=p.subtreeFlags&14680064),F!==null?g=pr(F,g):(g=Br(g,E,a,null),g.flags|=2),g.return=i,u.return=i,u.sibling=g,i.child=u,u=g,g=i.child,E=n.child.memoizedState,E=E===null?tu(a):{baseLanes:E.baseLanes|a,cachePool:null,transitions:E.transitions},g.memoizedState=E,g.childLanes=n.childLanes&~a,i.memoizedState=eu,u}return g=n.child,n=g.sibling,u=pr(g,{mode:"visible",children:u.children}),(i.mode&1)===0&&(u.lanes=a),u.return=i,u.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=u,i.memoizedState=null,u}function nu(n,i){return i=nl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Ho(n,i,a,u){return u!==null&&Nc(u),_s(i,n.child,null,a),n=nu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function Qg(n,i,a,u,p,g,E){if(a)return i.flags&256?(i.flags&=-257,u=Kc(Error(t(422))),Ho(n,i,E,u)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(g=u.fallback,p=i.mode,u=nl({mode:"visible",children:u.children},p,0,null),g=Br(g,p,E,null),g.flags|=2,u.return=i,g.return=i,u.sibling=g,i.child=u,(i.mode&1)!==0&&_s(i,n.child,null,E),i.child.memoizedState=tu(E),i.memoizedState=eu,g);if((i.mode&1)===0)return Ho(n,i,E,null);if(p.data==="$!"){if(u=p.nextSibling&&p.nextSibling.dataset,u)var F=u.dgst;return u=F,g=Error(t(419)),u=Kc(g,u,void 0),Ho(n,i,E,u)}if(F=(E&n.childLanes)!==0,Rn||F){if(u=rn,u!==null){switch(E&-E){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=(p&(u.suspendedLanes|E))!==0?0:p,p!==0&&p!==g.retryLane&&(g.retryLane=p,Di(n,p),oi(u,n,p,-1))}return vu(),u=Kc(Error(t(421))),Ho(n,i,E,u)}return p.data==="$?"?(i.flags|=128,i.child=n.child,i=hv.bind(null,n),p._reactRetry=i,null):(n=g.treeContext,jn=ir(p.nextSibling),Bn=i,zt=!0,ii=null,n!==null&&($n[qn++]=Ri,$n[qn++]=Pi,$n[qn++]=Pr,Ri=n.id,Pi=n.overflow,Pr=i),i=nu(i,u.children),i.flags|=4096,i)}function xp(n,i,a){n.lanes|=i;var u=n.alternate;u!==null&&(u.lanes|=i),Lc(n.return,i,a)}function iu(n,i,a,u,p){var g=n.memoizedState;g===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:u,tail:a,tailMode:p}:(g.isBackwards=i,g.rendering=null,g.renderingStartTime=0,g.last=u,g.tail=a,g.tailMode=p)}function gp(n,i,a){var u=i.pendingProps,p=u.revealOrder,g=u.tail;if(wn(n,i,u.children,a),u=jt.current,(u&2)!==0)u=u&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&xp(n,a,i);else if(n.tag===19)xp(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(It(jt,u),(i.mode&1)===0)i.memoizedState=null;else switch(p){case"forwards":for(a=i.child,p=null;a!==null;)n=a.alternate,n!==null&&ko(n)===null&&(p=a),a=a.sibling;a=p,a===null?(p=i.child,i.child=null):(p=a.sibling,a.sibling=null),iu(i,!1,p,a,g);break;case"backwards":for(a=null,p=i.child,i.child=null;p!==null;){if(n=p.alternate,n!==null&&ko(n)===null){i.child=p;break}n=p.sibling,p.sibling=a,a=p,p=n}iu(i,!0,a,null,g);break;case"together":iu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Go(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Ii(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),kr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=pr(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=pr(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function ev(n,i,a){switch(i.tag){case 3:fp(i),vs();break;case 5:Pf(i);break;case 1:Nn(i.type)&&To(i);break;case 4:kc(i,i.stateNode.containerInfo);break;case 10:var u=i.type._context,p=i.memoizedProps.value;It(Do,u._currentValue),u._currentValue=p;break;case 13:if(u=i.memoizedState,u!==null)return u.dehydrated!==null?(It(jt,jt.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?mp(n,i,a):(It(jt,jt.current&1),n=Ii(n,i,a),n!==null?n.sibling:null);It(jt,jt.current&1);break;case 19:if(u=(a&i.childLanes)!==0,(n.flags&128)!==0){if(u)return gp(n,i,a);i.flags|=128}if(p=i.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),It(jt,jt.current),u)break;return null;case 22:case 23:return i.lanes=0,up(n,i,a)}return Ii(n,i,a)}var vp,ru,_p,yp;vp=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},ru=function(){},_p=function(n,i,a,u){var p=n.memoizedProps;if(p!==u){n=i.stateNode,Ir(gi.current);var g=null;switch(a){case"input":p=H(n,p),u=H(n,u),g=[];break;case"select":p=de({},p,{value:void 0}),u=de({},u,{value:void 0}),g=[];break;case"textarea":p=A(n,p),u=A(n,u),g=[];break;default:typeof p.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=bo)}pt(a,u);var E;a=null;for(ae in p)if(!u.hasOwnProperty(ae)&&p.hasOwnProperty(ae)&&p[ae]!=null)if(ae==="style"){var F=p[ae];for(E in F)F.hasOwnProperty(E)&&(a||(a={}),a[E]="")}else ae!=="dangerouslySetInnerHTML"&&ae!=="children"&&ae!=="suppressContentEditableWarning"&&ae!=="suppressHydrationWarning"&&ae!=="autoFocus"&&(o.hasOwnProperty(ae)?g||(g=[]):(g=g||[]).push(ae,null));for(ae in u){var V=u[ae];if(F=p!=null?p[ae]:void 0,u.hasOwnProperty(ae)&&V!==F&&(V!=null||F!=null))if(ae==="style")if(F){for(E in F)!F.hasOwnProperty(E)||V&&V.hasOwnProperty(E)||(a||(a={}),a[E]="");for(E in V)V.hasOwnProperty(E)&&F[E]!==V[E]&&(a||(a={}),a[E]=V[E])}else a||(g||(g=[]),g.push(ae,a)),a=V;else ae==="dangerouslySetInnerHTML"?(V=V?V.__html:void 0,F=F?F.__html:void 0,V!=null&&F!==V&&(g=g||[]).push(ae,V)):ae==="children"?typeof V!="string"&&typeof V!="number"||(g=g||[]).push(ae,""+V):ae!=="suppressContentEditableWarning"&&ae!=="suppressHydrationWarning"&&(o.hasOwnProperty(ae)?(V!=null&&ae==="onScroll"&&kt("scroll",n),g||F===V||(g=[])):(g=g||[]).push(ae,V))}a&&(g=g||[]).push("style",a);var ae=g;(i.updateQueue=ae)&&(i.flags|=4)}},yp=function(n,i,a,u){a!==u&&(i.flags|=4)};function Ra(n,i){if(!zt)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var u=null;a!==null;)a.alternate!==null&&(u=a),a=a.sibling;u===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function pn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,u=0;if(i)for(var p=n.child;p!==null;)a|=p.lanes|p.childLanes,u|=p.subtreeFlags&14680064,u|=p.flags&14680064,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)a|=p.lanes|p.childLanes,u|=p.subtreeFlags,u|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=u,n.childLanes=a,i}function tv(n,i,a){var u=i.pendingProps;switch(Tc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pn(i),null;case 1:return Nn(i.type)&&Eo(),pn(i),null;case 3:return u=i.stateNode,Ms(),Ft(Cn),Ft(hn),zc(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(Ro(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ii!==null&&(mu(ii),ii=null))),ru(n,i),pn(i),null;case 5:Fc(i);var p=Ir(Ea.current);if(a=i.type,n!==null&&i.stateNode!=null)_p(n,i,a,u,p),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!u){if(i.stateNode===null)throw Error(t(166));return pn(i),null}if(n=Ir(gi.current),Ro(i)){u=i.stateNode,a=i.type;var g=i.memoizedProps;switch(u[xi]=i,u[ya]=g,n=(i.mode&1)!==0,a){case"dialog":kt("cancel",u),kt("close",u);break;case"iframe":case"object":case"embed":kt("load",u);break;case"video":case"audio":for(p=0;p<ga.length;p++)kt(ga[p],u);break;case"source":kt("error",u);break;case"img":case"image":case"link":kt("error",u),kt("load",u);break;case"details":kt("toggle",u);break;case"input":Sn(u,g),kt("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!g.multiple},kt("invalid",u);break;case"textarea":ie(u,g),kt("invalid",u)}pt(a,g),p=null;for(var E in g)if(g.hasOwnProperty(E)){var F=g[E];E==="children"?typeof F=="string"?u.textContent!==F&&(g.suppressHydrationWarning!==!0&&Mo(u.textContent,F,n),p=["children",F]):typeof F=="number"&&u.textContent!==""+F&&(g.suppressHydrationWarning!==!0&&Mo(u.textContent,F,n),p=["children",""+F]):o.hasOwnProperty(E)&&F!=null&&E==="onScroll"&&kt("scroll",u)}switch(a){case"input":Dt(u),Ye(u,g,!0);break;case"textarea":Dt(u),ge(u);break;case"select":case"option":break;default:typeof g.onClick=="function"&&(u.onclick=bo)}u=p,i.updateQueue=u,u!==null&&(i.flags|=4)}else{E=p.nodeType===9?p:p.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=he(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=E.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=E.createElement(a,{is:u.is}):(n=E.createElement(a),a==="select"&&(E=n,u.multiple?E.multiple=!0:u.size&&(E.size=u.size))):n=E.createElementNS(n,a),n[xi]=i,n[ya]=u,vp(n,i,!1,!1),i.stateNode=n;e:{switch(E=st(a,u),a){case"dialog":kt("cancel",n),kt("close",n),p=u;break;case"iframe":case"object":case"embed":kt("load",n),p=u;break;case"video":case"audio":for(p=0;p<ga.length;p++)kt(ga[p],n);p=u;break;case"source":kt("error",n),p=u;break;case"img":case"image":case"link":kt("error",n),kt("load",n),p=u;break;case"details":kt("toggle",n),p=u;break;case"input":Sn(n,u),p=H(n,u),kt("invalid",n);break;case"option":p=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},p=de({},u,{value:void 0}),kt("invalid",n);break;case"textarea":ie(n,u),p=A(n,u),kt("invalid",n);break;default:p=u}pt(a,p),F=p;for(g in F)if(F.hasOwnProperty(g)){var V=F[g];g==="style"?nt(n,V):g==="dangerouslySetInnerHTML"?(V=V?V.__html:void 0,V!=null&&ke(n,V)):g==="children"?typeof V=="string"?(a!=="textarea"||V!=="")&&ht(n,V):typeof V=="number"&&ht(n,""+V):g!=="suppressContentEditableWarning"&&g!=="suppressHydrationWarning"&&g!=="autoFocus"&&(o.hasOwnProperty(g)?V!=null&&g==="onScroll"&&kt("scroll",n):V!=null&&C(n,g,V,E))}switch(a){case"input":Dt(n),Ye(n,u,!1);break;case"textarea":Dt(n),ge(n);break;case"option":u.value!=null&&n.setAttribute("value",""+Te(u.value));break;case"select":n.multiple=!!u.multiple,g=u.value,g!=null?k(n,!!u.multiple,g,!1):u.defaultValue!=null&&k(n,!!u.multiple,u.defaultValue,!0);break;default:typeof p.onClick=="function"&&(n.onclick=bo)}switch(a){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return pn(i),null;case 6:if(n&&i.stateNode!=null)yp(n,i,n.memoizedProps,u);else{if(typeof u!="string"&&i.stateNode===null)throw Error(t(166));if(a=Ir(Ea.current),Ir(gi.current),Ro(i)){if(u=i.stateNode,a=i.memoizedProps,u[xi]=i,(g=u.nodeValue!==a)&&(n=Bn,n!==null))switch(n.tag){case 3:Mo(u.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Mo(u.nodeValue,a,(n.mode&1)!==0)}g&&(i.flags|=4)}else u=(a.nodeType===9?a:a.ownerDocument).createTextNode(u),u[xi]=i,i.stateNode=u}return pn(i),null;case 13:if(Ft(jt),u=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(zt&&jn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)bf(),vs(),i.flags|=98560,g=!1;else if(g=Ro(i),u!==null&&u.dehydrated!==null){if(n===null){if(!g)throw Error(t(318));if(g=i.memoizedState,g=g!==null?g.dehydrated:null,!g)throw Error(t(317));g[xi]=i}else vs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;pn(i),g=!1}else ii!==null&&(mu(ii),ii=null),g=!0;if(!g)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(jt.current&1)!==0?Jt===0&&(Jt=3):vu())),i.updateQueue!==null&&(i.flags|=4),pn(i),null);case 4:return Ms(),ru(n,i),n===null&&va(i.stateNode.containerInfo),pn(i),null;case 10:return Dc(i.type._context),pn(i),null;case 17:return Nn(i.type)&&Eo(),pn(i),null;case 19:if(Ft(jt),g=i.memoizedState,g===null)return pn(i),null;if(u=(i.flags&128)!==0,E=g.rendering,E===null)if(u)Ra(g,!1);else{if(Jt!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(E=ko(n),E!==null){for(i.flags|=128,Ra(g,!1),u=E.updateQueue,u!==null&&(i.updateQueue=u,i.flags|=4),i.subtreeFlags=0,u=a,a=i.child;a!==null;)g=a,n=u,g.flags&=14680066,E=g.alternate,E===null?(g.childLanes=0,g.lanes=n,g.child=null,g.subtreeFlags=0,g.memoizedProps=null,g.memoizedState=null,g.updateQueue=null,g.dependencies=null,g.stateNode=null):(g.childLanes=E.childLanes,g.lanes=E.lanes,g.child=E.child,g.subtreeFlags=0,g.deletions=null,g.memoizedProps=E.memoizedProps,g.memoizedState=E.memoizedState,g.updateQueue=E.updateQueue,g.type=E.type,n=E.dependencies,g.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return It(jt,jt.current&1|2),i.child}n=n.sibling}g.tail!==null&&te()>Ts&&(i.flags|=128,u=!0,Ra(g,!1),i.lanes=4194304)}else{if(!u)if(n=ko(E),n!==null){if(i.flags|=128,u=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Ra(g,!0),g.tail===null&&g.tailMode==="hidden"&&!E.alternate&&!zt)return pn(i),null}else 2*te()-g.renderingStartTime>Ts&&a!==1073741824&&(i.flags|=128,u=!0,Ra(g,!1),i.lanes=4194304);g.isBackwards?(E.sibling=i.child,i.child=E):(a=g.last,a!==null?a.sibling=E:i.child=E,g.last=E)}return g.tail!==null?(i=g.tail,g.rendering=i,g.tail=i.sibling,g.renderingStartTime=te(),i.sibling=null,a=jt.current,It(jt,u?a&1|2:a&1),i):(pn(i),null);case 22:case 23:return gu(),u=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(i.flags|=8192),u&&(i.mode&1)!==0?(Vn&1073741824)!==0&&(pn(i),i.subtreeFlags&6&&(i.flags|=8192)):pn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function nv(n,i){switch(Tc(i),i.tag){case 1:return Nn(i.type)&&Eo(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Ms(),Ft(Cn),Ft(hn),zc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Fc(i),null;case 13:if(Ft(jt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));vs()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Ft(jt),null;case 4:return Ms(),null;case 10:return Dc(i.type._context),null;case 22:case 23:return gu(),null;case 24:return null;default:return null}}var Wo=!1,mn=!1,iv=typeof WeakSet=="function"?WeakSet:Set,Fe=null;function ws(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(u){Wt(n,i,u)}else a.current=null}function su(n,i,a){try{a()}catch(u){Wt(n,i,u)}}var Sp=!1;function rv(n,i){if(gc=uo,n=Zh(),cc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var u=a.getSelection&&a.getSelection();if(u&&u.rangeCount!==0){a=u.anchorNode;var p=u.anchorOffset,g=u.focusNode;u=u.focusOffset;try{a.nodeType,g.nodeType}catch{a=null;break e}var E=0,F=-1,V=-1,ae=0,ve=0,ye=n,xe=null;t:for(;;){for(var Ie;ye!==a||p!==0&&ye.nodeType!==3||(F=E+p),ye!==g||u!==0&&ye.nodeType!==3||(V=E+u),ye.nodeType===3&&(E+=ye.nodeValue.length),(Ie=ye.firstChild)!==null;)xe=ye,ye=Ie;for(;;){if(ye===n)break t;if(xe===a&&++ae===p&&(F=E),xe===g&&++ve===u&&(V=E),(Ie=ye.nextSibling)!==null)break;ye=xe,xe=ye.parentNode}ye=Ie}a=F===-1||V===-1?null:{start:F,end:V}}else a=null}a=a||{start:0,end:0}}else a=null;for(vc={focusedElem:n,selectionRange:a},uo=!1,Fe=i;Fe!==null;)if(i=Fe,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Fe=n;else for(;Fe!==null;){i=Fe;try{var je=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(je!==null){var He=je.memoizedProps,Xt=je.memoizedState,Q=i.stateNode,W=Q.getSnapshotBeforeUpdate(i.elementType===i.type?He:ri(i.type,He),Xt);Q.__reactInternalSnapshotBeforeUpdate=W}break;case 3:var ne=i.stateNode.containerInfo;ne.nodeType===1?ne.textContent="":ne.nodeType===9&&ne.documentElement&&ne.removeChild(ne.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ee){Wt(i,i.return,Ee)}if(n=i.sibling,n!==null){n.return=i.return,Fe=n;break}Fe=i.return}return je=Sp,Sp=!1,je}function Pa(n,i,a){var u=i.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var p=u=u.next;do{if((p.tag&n)===n){var g=p.destroy;p.destroy=void 0,g!==void 0&&su(i,a,g)}p=p.next}while(p!==u)}}function Xo(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var u=a.create;a.destroy=u()}a=a.next}while(a!==i)}}function au(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function Mp(n){var i=n.alternate;i!==null&&(n.alternate=null,Mp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[xi],delete i[ya],delete i[Mc],delete i[Bg],delete i[jg])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function bp(n){return n.tag===5||n.tag===3||n.tag===4}function wp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||bp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function ou(n,i,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=bo));else if(u!==4&&(n=n.child,n!==null))for(ou(n,i,a),n=n.sibling;n!==null;)ou(n,i,a),n=n.sibling}function lu(n,i,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(lu(n,i,a),n=n.sibling;n!==null;)lu(n,i,a),n=n.sibling}var ln=null,si=!1;function cr(n,i,a){for(a=a.child;a!==null;)Ep(n,i,a),a=a.sibling}function Ep(n,i,a){if(Ve&&typeof Ve.onCommitFiberUnmount=="function")try{Ve.onCommitFiberUnmount(tt,a)}catch{}switch(a.tag){case 5:mn||ws(a,i);case 6:var u=ln,p=si;ln=null,cr(n,i,a),ln=u,si=p,ln!==null&&(si?(n=ln,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):ln.removeChild(a.stateNode));break;case 18:ln!==null&&(si?(n=ln,a=a.stateNode,n.nodeType===8?Sc(n.parentNode,a):n.nodeType===1&&Sc(n,a),ca(n)):Sc(ln,a.stateNode));break;case 4:u=ln,p=si,ln=a.stateNode.containerInfo,si=!0,cr(n,i,a),ln=u,si=p;break;case 0:case 11:case 14:case 15:if(!mn&&(u=a.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){p=u=u.next;do{var g=p,E=g.destroy;g=g.tag,E!==void 0&&((g&2)!==0||(g&4)!==0)&&su(a,i,E),p=p.next}while(p!==u)}cr(n,i,a);break;case 1:if(!mn&&(ws(a,i),u=a.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=a.memoizedProps,u.state=a.memoizedState,u.componentWillUnmount()}catch(F){Wt(a,i,F)}cr(n,i,a);break;case 21:cr(n,i,a);break;case 22:a.mode&1?(mn=(u=mn)||a.memoizedState!==null,cr(n,i,a),mn=u):cr(n,i,a);break;default:cr(n,i,a)}}function Tp(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new iv),i.forEach(function(u){var p=fv.bind(null,n,u);a.has(u)||(a.add(u),u.then(p,p))})}}function ai(n,i){var a=i.deletions;if(a!==null)for(var u=0;u<a.length;u++){var p=a[u];try{var g=n,E=i,F=E;e:for(;F!==null;){switch(F.tag){case 5:ln=F.stateNode,si=!1;break e;case 3:ln=F.stateNode.containerInfo,si=!0;break e;case 4:ln=F.stateNode.containerInfo,si=!0;break e}F=F.return}if(ln===null)throw Error(t(160));Ep(g,E,p),ln=null,si=!1;var V=p.alternate;V!==null&&(V.return=null),p.return=null}catch(ae){Wt(p,i,ae)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Ap(i,n),i=i.sibling}function Ap(n,i){var a=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ai(i,n),_i(n),u&4){try{Pa(3,n,n.return),Xo(3,n)}catch(He){Wt(n,n.return,He)}try{Pa(5,n,n.return)}catch(He){Wt(n,n.return,He)}}break;case 1:ai(i,n),_i(n),u&512&&a!==null&&ws(a,a.return);break;case 5:if(ai(i,n),_i(n),u&512&&a!==null&&ws(a,a.return),n.flags&32){var p=n.stateNode;try{ht(p,"")}catch(He){Wt(n,n.return,He)}}if(u&4&&(p=n.stateNode,p!=null)){var g=n.memoizedProps,E=a!==null?a.memoizedProps:g,F=n.type,V=n.updateQueue;if(n.updateQueue=null,V!==null)try{F==="input"&&g.type==="radio"&&g.name!=null&&gt(p,g),st(F,E);var ae=st(F,g);for(E=0;E<V.length;E+=2){var ve=V[E],ye=V[E+1];ve==="style"?nt(p,ye):ve==="dangerouslySetInnerHTML"?ke(p,ye):ve==="children"?ht(p,ye):C(p,ve,ye,ae)}switch(F){case"input":ft(p,g);break;case"textarea":me(p,g);break;case"select":var xe=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!g.multiple;var Ie=g.value;Ie!=null?k(p,!!g.multiple,Ie,!1):xe!==!!g.multiple&&(g.defaultValue!=null?k(p,!!g.multiple,g.defaultValue,!0):k(p,!!g.multiple,g.multiple?[]:"",!1))}p[ya]=g}catch(He){Wt(n,n.return,He)}}break;case 6:if(ai(i,n),_i(n),u&4){if(n.stateNode===null)throw Error(t(162));p=n.stateNode,g=n.memoizedProps;try{p.nodeValue=g}catch(He){Wt(n,n.return,He)}}break;case 3:if(ai(i,n),_i(n),u&4&&a!==null&&a.memoizedState.isDehydrated)try{ca(i.containerInfo)}catch(He){Wt(n,n.return,He)}break;case 4:ai(i,n),_i(n);break;case 13:ai(i,n),_i(n),p=n.child,p.flags&8192&&(g=p.memoizedState!==null,p.stateNode.isHidden=g,!g||p.alternate!==null&&p.alternate.memoizedState!==null||(du=te())),u&4&&Tp(n);break;case 22:if(ve=a!==null&&a.memoizedState!==null,n.mode&1?(mn=(ae=mn)||ve,ai(i,n),mn=ae):ai(i,n),_i(n),u&8192){if(ae=n.memoizedState!==null,(n.stateNode.isHidden=ae)&&!ve&&(n.mode&1)!==0)for(Fe=n,ve=n.child;ve!==null;){for(ye=Fe=ve;Fe!==null;){switch(xe=Fe,Ie=xe.child,xe.tag){case 0:case 11:case 14:case 15:Pa(4,xe,xe.return);break;case 1:ws(xe,xe.return);var je=xe.stateNode;if(typeof je.componentWillUnmount=="function"){u=xe,a=xe.return;try{i=u,je.props=i.memoizedProps,je.state=i.memoizedState,je.componentWillUnmount()}catch(He){Wt(u,a,He)}}break;case 5:ws(xe,xe.return);break;case 22:if(xe.memoizedState!==null){Rp(ye);continue}}Ie!==null?(Ie.return=xe,Fe=Ie):Rp(ye)}ve=ve.sibling}e:for(ve=null,ye=n;;){if(ye.tag===5){if(ve===null){ve=ye;try{p=ye.stateNode,ae?(g=p.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none"):(F=ye.stateNode,V=ye.memoizedProps.style,E=V!=null&&V.hasOwnProperty("display")?V.display:null,F.style.display=et("display",E))}catch(He){Wt(n,n.return,He)}}}else if(ye.tag===6){if(ve===null)try{ye.stateNode.nodeValue=ae?"":ye.memoizedProps}catch(He){Wt(n,n.return,He)}}else if((ye.tag!==22&&ye.tag!==23||ye.memoizedState===null||ye===n)&&ye.child!==null){ye.child.return=ye,ye=ye.child;continue}if(ye===n)break e;for(;ye.sibling===null;){if(ye.return===null||ye.return===n)break e;ve===ye&&(ve=null),ye=ye.return}ve===ye&&(ve=null),ye.sibling.return=ye.return,ye=ye.sibling}}break;case 19:ai(i,n),_i(n),u&4&&Tp(n);break;case 21:break;default:ai(i,n),_i(n)}}function _i(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(bp(a)){var u=a;break e}a=a.return}throw Error(t(160))}switch(u.tag){case 5:var p=u.stateNode;u.flags&32&&(ht(p,""),u.flags&=-33);var g=wp(n);lu(n,g,p);break;case 3:case 4:var E=u.stateNode.containerInfo,F=wp(n);ou(n,F,E);break;default:throw Error(t(161))}}catch(V){Wt(n,n.return,V)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function sv(n,i,a){Fe=n,Cp(n)}function Cp(n,i,a){for(var u=(n.mode&1)!==0;Fe!==null;){var p=Fe,g=p.child;if(p.tag===22&&u){var E=p.memoizedState!==null||Wo;if(!E){var F=p.alternate,V=F!==null&&F.memoizedState!==null||mn;F=Wo;var ae=mn;if(Wo=E,(mn=V)&&!ae)for(Fe=p;Fe!==null;)E=Fe,V=E.child,E.tag===22&&E.memoizedState!==null?Pp(p):V!==null?(V.return=E,Fe=V):Pp(p);for(;g!==null;)Fe=g,Cp(g),g=g.sibling;Fe=p,Wo=F,mn=ae}Np(n)}else(p.subtreeFlags&8772)!==0&&g!==null?(g.return=p,Fe=g):Np(n)}}function Np(n){for(;Fe!==null;){var i=Fe;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:mn||Xo(5,i);break;case 1:var u=i.stateNode;if(i.flags&4&&!mn)if(a===null)u.componentDidMount();else{var p=i.elementType===i.type?a.memoizedProps:ri(i.type,a.memoizedProps);u.componentDidUpdate(p,a.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var g=i.updateQueue;g!==null&&Rf(i,g,u);break;case 3:var E=i.updateQueue;if(E!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}Rf(i,E,a)}break;case 5:var F=i.stateNode;if(a===null&&i.flags&4){a=F;var V=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":V.autoFocus&&a.focus();break;case"img":V.src&&(a.src=V.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var ae=i.alternate;if(ae!==null){var ve=ae.memoizedState;if(ve!==null){var ye=ve.dehydrated;ye!==null&&ca(ye)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}mn||i.flags&512&&au(i)}catch(xe){Wt(i,i.return,xe)}}if(i===n){Fe=null;break}if(a=i.sibling,a!==null){a.return=i.return,Fe=a;break}Fe=i.return}}function Rp(n){for(;Fe!==null;){var i=Fe;if(i===n){Fe=null;break}var a=i.sibling;if(a!==null){a.return=i.return,Fe=a;break}Fe=i.return}}function Pp(n){for(;Fe!==null;){var i=Fe;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{Xo(4,i)}catch(V){Wt(i,a,V)}break;case 1:var u=i.stateNode;if(typeof u.componentDidMount=="function"){var p=i.return;try{u.componentDidMount()}catch(V){Wt(i,p,V)}}var g=i.return;try{au(i)}catch(V){Wt(i,g,V)}break;case 5:var E=i.return;try{au(i)}catch(V){Wt(i,E,V)}}}catch(V){Wt(i,i.return,V)}if(i===n){Fe=null;break}var F=i.sibling;if(F!==null){F.return=i.return,Fe=F;break}Fe=i.return}}var av=Math.ceil,$o=w.ReactCurrentDispatcher,cu=w.ReactCurrentOwner,Jn=w.ReactCurrentBatchConfig,wt=0,rn=null,$t=null,cn=0,Vn=0,Es=rr(0),Jt=0,Da=null,kr=0,qo=0,uu=0,La=null,Pn=null,du=0,Ts=1/0,Ui=null,Yo=!1,hu=null,ur=null,Ko=!1,dr=null,Jo=0,Ia=0,fu=null,Zo=-1,Qo=0;function En(){return(wt&6)!==0?te():Zo!==-1?Zo:Zo=te()}function hr(n){return(n.mode&1)===0?1:(wt&2)!==0&&cn!==0?cn&-cn:Hg.transition!==null?(Qo===0&&(Qo=Pt()),Qo):(n=bt,n!==0||(n=window.event,n=n===void 0?16:Dh(n.type)),n)}function oi(n,i,a,u){if(50<Ia)throw Ia=0,fu=null,Error(t(185));en(n,a,u),((wt&2)===0||n!==rn)&&(n===rn&&((wt&2)===0&&(qo|=a),Jt===4&&fr(n,cn)),Dn(n,u),a===1&&wt===0&&(i.mode&1)===0&&(Ts=te()+500,Ao&&ar()))}function Dn(n,i){var a=n.callbackNode;bn(n,i);var u=un(n,n===rn?cn:0);if(u===0)a!==null&&R(a),n.callbackNode=null,n.callbackPriority=0;else if(i=u&-u,n.callbackPriority!==i){if(a!=null&&R(a),i===1)n.tag===0?Vg(Lp.bind(null,n)):vf(Lp.bind(null,n)),Og(function(){(wt&6)===0&&ar()}),a=null;else{switch(mi(u)){case 1:a=Se;break;case 4:a=Ne;break;case 16:a=Le;break;case 536870912:a=it;break;default:a=Le}a=jp(a,Dp.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function Dp(n,i){if(Zo=-1,Qo=0,(wt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(As()&&n.callbackNode!==a)return null;var u=un(n,n===rn?cn:0);if(u===0)return null;if((u&30)!==0||(u&n.expiredLanes)!==0||i)i=el(n,u);else{i=u;var p=wt;wt|=2;var g=Up();(rn!==n||cn!==i)&&(Ui=null,Ts=te()+500,Or(n,i));do try{cv();break}catch(F){Ip(n,F)}while(!0);Pc(),$o.current=g,wt=p,$t!==null?i=0:(rn=null,cn=0,i=Jt)}if(i!==0){if(i===2&&(p=Ai(n),p!==0&&(u=p,i=pu(n,p))),i===1)throw a=Da,Or(n,0),fr(n,u),Dn(n,te()),a;if(i===6)fr(n,u);else{if(p=n.current.alternate,(u&30)===0&&!ov(p)&&(i=el(n,u),i===2&&(g=Ai(n),g!==0&&(u=g,i=pu(n,g))),i===1))throw a=Da,Or(n,0),fr(n,u),Dn(n,te()),a;switch(n.finishedWork=p,n.finishedLanes=u,i){case 0:case 1:throw Error(t(345));case 2:zr(n,Pn,Ui);break;case 3:if(fr(n,u),(u&130023424)===u&&(i=du+500-te(),10<i)){if(un(n,0)!==0)break;if(p=n.suspendedLanes,(p&u)!==u){En(),n.pingedLanes|=n.suspendedLanes&p;break}n.timeoutHandle=yc(zr.bind(null,n,Pn,Ui),i);break}zr(n,Pn,Ui);break;case 4:if(fr(n,u),(u&4194240)===u)break;for(i=n.eventTimes,p=-1;0<u;){var E=31-lt(u);g=1<<E,E=i[E],E>p&&(p=E),u&=~g}if(u=p,u=te()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*av(u/1960))-u,10<u){n.timeoutHandle=yc(zr.bind(null,n,Pn,Ui),u);break}zr(n,Pn,Ui);break;case 5:zr(n,Pn,Ui);break;default:throw Error(t(329))}}}return Dn(n,te()),n.callbackNode===a?Dp.bind(null,n):null}function pu(n,i){var a=La;return n.current.memoizedState.isDehydrated&&(Or(n,i).flags|=256),n=el(n,i),n!==2&&(i=Pn,Pn=a,i!==null&&mu(i)),n}function mu(n){Pn===null?Pn=n:Pn.push.apply(Pn,n)}function ov(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var u=0;u<a.length;u++){var p=a[u],g=p.getSnapshot;p=p.value;try{if(!ni(g(),p))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function fr(n,i){for(i&=~uu,i&=~qo,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-lt(i),u=1<<a;n[a]=-1,i&=~u}}function Lp(n){if((wt&6)!==0)throw Error(t(327));As();var i=un(n,0);if((i&1)===0)return Dn(n,te()),null;var a=el(n,i);if(n.tag!==0&&a===2){var u=Ai(n);u!==0&&(i=u,a=pu(n,u))}if(a===1)throw a=Da,Or(n,0),fr(n,i),Dn(n,te()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,zr(n,Pn,Ui),Dn(n,te()),null}function xu(n,i){var a=wt;wt|=1;try{return n(i)}finally{wt=a,wt===0&&(Ts=te()+500,Ao&&ar())}}function Fr(n){dr!==null&&dr.tag===0&&(wt&6)===0&&As();var i=wt;wt|=1;var a=Jn.transition,u=bt;try{if(Jn.transition=null,bt=1,n)return n()}finally{bt=u,Jn.transition=a,wt=i,(wt&6)===0&&ar()}}function gu(){Vn=Es.current,Ft(Es)}function Or(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,Fg(a)),$t!==null)for(a=$t.return;a!==null;){var u=a;switch(Tc(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&Eo();break;case 3:Ms(),Ft(Cn),Ft(hn),zc();break;case 5:Fc(u);break;case 4:Ms();break;case 13:Ft(jt);break;case 19:Ft(jt);break;case 10:Dc(u.type._context);break;case 22:case 23:gu()}a=a.return}if(rn=n,$t=n=pr(n.current,null),cn=Vn=i,Jt=0,Da=null,uu=qo=kr=0,Pn=La=null,Lr!==null){for(i=0;i<Lr.length;i++)if(a=Lr[i],u=a.interleaved,u!==null){a.interleaved=null;var p=u.next,g=a.pending;if(g!==null){var E=g.next;g.next=p,u.next=E}a.pending=u}Lr=null}return n}function Ip(n,i){do{var a=$t;try{if(Pc(),Fo.current=jo,Oo){for(var u=Vt.memoizedState;u!==null;){var p=u.queue;p!==null&&(p.pending=null),u=u.next}Oo=!1}if(Ur=0,nn=Kt=Vt=null,Ta=!1,Aa=0,cu.current=null,a===null||a.return===null){Jt=1,Da=i,$t=null;break}e:{var g=n,E=a.return,F=a,V=i;if(i=cn,F.flags|=32768,V!==null&&typeof V=="object"&&typeof V.then=="function"){var ae=V,ve=F,ye=ve.tag;if((ve.mode&1)===0&&(ye===0||ye===11||ye===15)){var xe=ve.alternate;xe?(ve.updateQueue=xe.updateQueue,ve.memoizedState=xe.memoizedState,ve.lanes=xe.lanes):(ve.updateQueue=null,ve.memoizedState=null)}var Ie=sp(E);if(Ie!==null){Ie.flags&=-257,ap(Ie,E,F,g,i),Ie.mode&1&&rp(g,ae,i),i=Ie,V=ae;var je=i.updateQueue;if(je===null){var He=new Set;He.add(V),i.updateQueue=He}else je.add(V);break e}else{if((i&1)===0){rp(g,ae,i),vu();break e}V=Error(t(426))}}else if(zt&&F.mode&1){var Xt=sp(E);if(Xt!==null){(Xt.flags&65536)===0&&(Xt.flags|=256),ap(Xt,E,F,g,i),Nc(bs(V,F));break e}}g=V=bs(V,F),Jt!==4&&(Jt=2),La===null?La=[g]:La.push(g),g=E;do{switch(g.tag){case 3:g.flags|=65536,i&=-i,g.lanes|=i;var Q=np(g,V,i);Nf(g,Q);break e;case 1:F=V;var W=g.type,ne=g.stateNode;if((g.flags&128)===0&&(typeof W.getDerivedStateFromError=="function"||ne!==null&&typeof ne.componentDidCatch=="function"&&(ur===null||!ur.has(ne)))){g.flags|=65536,i&=-i,g.lanes|=i;var Ee=ip(g,F,i);Nf(g,Ee);break e}}g=g.return}while(g!==null)}Fp(a)}catch($e){i=$e,$t===a&&a!==null&&($t=a=a.return);continue}break}while(!0)}function Up(){var n=$o.current;return $o.current=jo,n===null?jo:n}function vu(){(Jt===0||Jt===3||Jt===2)&&(Jt=4),rn===null||(kr&268435455)===0&&(qo&268435455)===0||fr(rn,cn)}function el(n,i){var a=wt;wt|=2;var u=Up();(rn!==n||cn!==i)&&(Ui=null,Or(n,i));do try{lv();break}catch(p){Ip(n,p)}while(!0);if(Pc(),wt=a,$o.current=u,$t!==null)throw Error(t(261));return rn=null,cn=0,Jt}function lv(){for(;$t!==null;)kp($t)}function cv(){for(;$t!==null&&!q();)kp($t)}function kp(n){var i=Bp(n.alternate,n,Vn);n.memoizedProps=n.pendingProps,i===null?Fp(n):$t=i,cu.current=null}function Fp(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=tv(a,i,Vn),a!==null){$t=a;return}}else{if(a=nv(a,i),a!==null){a.flags&=32767,$t=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Jt=6,$t=null;return}}if(i=i.sibling,i!==null){$t=i;return}$t=i=n}while(i!==null);Jt===0&&(Jt=5)}function zr(n,i,a){var u=bt,p=Jn.transition;try{Jn.transition=null,bt=1,uv(n,i,a,u)}finally{Jn.transition=p,bt=u}return null}function uv(n,i,a,u){do As();while(dr!==null);if((wt&6)!==0)throw Error(t(327));a=n.finishedWork;var p=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var g=a.lanes|a.childLanes;if(on(n,g),n===rn&&($t=rn=null,cn=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||Ko||(Ko=!0,jp(Le,function(){return As(),null})),g=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||g){g=Jn.transition,Jn.transition=null;var E=bt;bt=1;var F=wt;wt|=4,cu.current=null,rv(n,a),Ap(a,n),Rg(vc),uo=!!gc,vc=gc=null,n.current=a,sv(a),se(),wt=F,bt=E,Jn.transition=g}else n.current=a;if(Ko&&(Ko=!1,dr=n,Jo=p),g=n.pendingLanes,g===0&&(ur=null),_t(a.stateNode),Dn(n,te()),i!==null)for(u=n.onRecoverableError,a=0;a<i.length;a++)p=i[a],u(p.value,{componentStack:p.stack,digest:p.digest});if(Yo)throw Yo=!1,n=hu,hu=null,n;return(Jo&1)!==0&&n.tag!==0&&As(),g=n.pendingLanes,(g&1)!==0?n===fu?Ia++:(Ia=0,fu=n):Ia=0,ar(),null}function As(){if(dr!==null){var n=mi(Jo),i=Jn.transition,a=bt;try{if(Jn.transition=null,bt=16>n?16:n,dr===null)var u=!1;else{if(n=dr,dr=null,Jo=0,(wt&6)!==0)throw Error(t(331));var p=wt;for(wt|=4,Fe=n.current;Fe!==null;){var g=Fe,E=g.child;if((Fe.flags&16)!==0){var F=g.deletions;if(F!==null){for(var V=0;V<F.length;V++){var ae=F[V];for(Fe=ae;Fe!==null;){var ve=Fe;switch(ve.tag){case 0:case 11:case 15:Pa(8,ve,g)}var ye=ve.child;if(ye!==null)ye.return=ve,Fe=ye;else for(;Fe!==null;){ve=Fe;var xe=ve.sibling,Ie=ve.return;if(Mp(ve),ve===ae){Fe=null;break}if(xe!==null){xe.return=Ie,Fe=xe;break}Fe=Ie}}}var je=g.alternate;if(je!==null){var He=je.child;if(He!==null){je.child=null;do{var Xt=He.sibling;He.sibling=null,He=Xt}while(He!==null)}}Fe=g}}if((g.subtreeFlags&2064)!==0&&E!==null)E.return=g,Fe=E;else e:for(;Fe!==null;){if(g=Fe,(g.flags&2048)!==0)switch(g.tag){case 0:case 11:case 15:Pa(9,g,g.return)}var Q=g.sibling;if(Q!==null){Q.return=g.return,Fe=Q;break e}Fe=g.return}}var W=n.current;for(Fe=W;Fe!==null;){E=Fe;var ne=E.child;if((E.subtreeFlags&2064)!==0&&ne!==null)ne.return=E,Fe=ne;else e:for(E=W;Fe!==null;){if(F=Fe,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:Xo(9,F)}}catch($e){Wt(F,F.return,$e)}if(F===E){Fe=null;break e}var Ee=F.sibling;if(Ee!==null){Ee.return=F.return,Fe=Ee;break e}Fe=F.return}}if(wt=p,ar(),Ve&&typeof Ve.onPostCommitFiberRoot=="function")try{Ve.onPostCommitFiberRoot(tt,n)}catch{}u=!0}return u}finally{bt=a,Jn.transition=i}}return!1}function Op(n,i,a){i=bs(a,i),i=np(n,i,1),n=lr(n,i,1),i=En(),n!==null&&(en(n,1,i),Dn(n,i))}function Wt(n,i,a){if(n.tag===3)Op(n,n,a);else for(;i!==null;){if(i.tag===3){Op(i,n,a);break}else if(i.tag===1){var u=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(ur===null||!ur.has(u))){n=bs(a,n),n=ip(i,n,1),i=lr(i,n,1),n=En(),i!==null&&(en(i,1,n),Dn(i,n));break}}i=i.return}}function dv(n,i,a){var u=n.pingCache;u!==null&&u.delete(i),i=En(),n.pingedLanes|=n.suspendedLanes&a,rn===n&&(cn&a)===a&&(Jt===4||Jt===3&&(cn&130023424)===cn&&500>te()-du?Or(n,0):uu|=a),Dn(n,i)}function zp(n,i){i===0&&((n.mode&1)===0?i=1:(i=Gt,Gt<<=1,(Gt&130023424)===0&&(Gt=4194304)));var a=En();n=Di(n,i),n!==null&&(en(n,i,a),Dn(n,a))}function hv(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),zp(n,a)}function fv(n,i){var a=0;switch(n.tag){case 13:var u=n.stateNode,p=n.memoizedState;p!==null&&(a=p.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(i),zp(n,a)}var Bp;Bp=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Cn.current)Rn=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return Rn=!1,ev(n,i,a);Rn=(n.flags&131072)!==0}else Rn=!1,zt&&(i.flags&1048576)!==0&&_f(i,No,i.index);switch(i.lanes=0,i.tag){case 2:var u=i.type;Go(n,i),n=i.pendingProps;var p=ms(i,hn.current);Ss(i,a),p=Vc(null,i,u,n,p,a);var g=Hc();return i.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Nn(u)?(g=!0,To(i)):g=!1,i.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,Uc(i),p.updater=Vo,i.stateNode=p,p._reactInternals=i,Yc(i,u,n,a),i=Qc(null,i,u,!0,g,a)):(i.tag=0,zt&&g&&Ec(i),wn(null,i,p,a),i=i.child),i;case 16:u=i.elementType;e:{switch(Go(n,i),n=i.pendingProps,p=u._init,u=p(u._payload),i.type=u,p=i.tag=mv(u),n=ri(u,n),p){case 0:i=Zc(null,i,u,n,a);break e;case 1:i=hp(null,i,u,n,a);break e;case 11:i=op(null,i,u,n,a);break e;case 14:i=lp(null,i,u,ri(u.type,n),a);break e}throw Error(t(306,u,""))}return i;case 0:return u=i.type,p=i.pendingProps,p=i.elementType===u?p:ri(u,p),Zc(n,i,u,p,a);case 1:return u=i.type,p=i.pendingProps,p=i.elementType===u?p:ri(u,p),hp(n,i,u,p,a);case 3:e:{if(fp(i),n===null)throw Error(t(387));u=i.pendingProps,g=i.memoizedState,p=g.element,Cf(n,i),Uo(i,u,null,a);var E=i.memoizedState;if(u=E.element,g.isDehydrated)if(g={element:u,isDehydrated:!1,cache:E.cache,pendingSuspenseBoundaries:E.pendingSuspenseBoundaries,transitions:E.transitions},i.updateQueue.baseState=g,i.memoizedState=g,i.flags&256){p=bs(Error(t(423)),i),i=pp(n,i,u,a,p);break e}else if(u!==p){p=bs(Error(t(424)),i),i=pp(n,i,u,a,p);break e}else for(jn=ir(i.stateNode.containerInfo.firstChild),Bn=i,zt=!0,ii=null,a=Tf(i,null,u,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(vs(),u===p){i=Ii(n,i,a);break e}wn(n,i,u,a)}i=i.child}return i;case 5:return Pf(i),n===null&&Cc(i),u=i.type,p=i.pendingProps,g=n!==null?n.memoizedProps:null,E=p.children,_c(u,p)?E=null:g!==null&&_c(u,g)&&(i.flags|=32),dp(n,i),wn(n,i,E,a),i.child;case 6:return n===null&&Cc(i),null;case 13:return mp(n,i,a);case 4:return kc(i,i.stateNode.containerInfo),u=i.pendingProps,n===null?i.child=_s(i,null,u,a):wn(n,i,u,a),i.child;case 11:return u=i.type,p=i.pendingProps,p=i.elementType===u?p:ri(u,p),op(n,i,u,p,a);case 7:return wn(n,i,i.pendingProps,a),i.child;case 8:return wn(n,i,i.pendingProps.children,a),i.child;case 12:return wn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(u=i.type._context,p=i.pendingProps,g=i.memoizedProps,E=p.value,It(Do,u._currentValue),u._currentValue=E,g!==null)if(ni(g.value,E)){if(g.children===p.children&&!Cn.current){i=Ii(n,i,a);break e}}else for(g=i.child,g!==null&&(g.return=i);g!==null;){var F=g.dependencies;if(F!==null){E=g.child;for(var V=F.firstContext;V!==null;){if(V.context===u){if(g.tag===1){V=Li(-1,a&-a),V.tag=2;var ae=g.updateQueue;if(ae!==null){ae=ae.shared;var ve=ae.pending;ve===null?V.next=V:(V.next=ve.next,ve.next=V),ae.pending=V}}g.lanes|=a,V=g.alternate,V!==null&&(V.lanes|=a),Lc(g.return,a,i),F.lanes|=a;break}V=V.next}}else if(g.tag===10)E=g.type===i.type?null:g.child;else if(g.tag===18){if(E=g.return,E===null)throw Error(t(341));E.lanes|=a,F=E.alternate,F!==null&&(F.lanes|=a),Lc(E,a,i),E=g.sibling}else E=g.child;if(E!==null)E.return=g;else for(E=g;E!==null;){if(E===i){E=null;break}if(g=E.sibling,g!==null){g.return=E.return,E=g;break}E=E.return}g=E}wn(n,i,p.children,a),i=i.child}return i;case 9:return p=i.type,u=i.pendingProps.children,Ss(i,a),p=Yn(p),u=u(p),i.flags|=1,wn(n,i,u,a),i.child;case 14:return u=i.type,p=ri(u,i.pendingProps),p=ri(u.type,p),lp(n,i,u,p,a);case 15:return cp(n,i,i.type,i.pendingProps,a);case 17:return u=i.type,p=i.pendingProps,p=i.elementType===u?p:ri(u,p),Go(n,i),i.tag=1,Nn(u)?(n=!0,To(i)):n=!1,Ss(i,a),ep(i,u,p),Yc(i,u,p,a),Qc(null,i,u,!0,n,a);case 19:return gp(n,i,a);case 22:return up(n,i,a)}throw Error(t(156,i.tag))};function jp(n,i){return oo(n,i)}function pv(n,i,a,u){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Zn(n,i,a,u){return new pv(n,i,a,u)}function _u(n){return n=n.prototype,!(!n||!n.isReactComponent)}function mv(n){if(typeof n=="function")return _u(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ee)return 11;if(n===Y)return 14}return 2}function pr(n,i){var a=n.alternate;return a===null?(a=Zn(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function tl(n,i,a,u,p,g){var E=2;if(u=n,typeof n=="function")_u(n)&&(E=1);else if(typeof n=="string")E=5;else e:switch(n){case U:return Br(a.children,p,g,i);case B:E=8,p|=8;break;case L:return n=Zn(12,a,i,p|2),n.elementType=L,n.lanes=g,n;case J:return n=Zn(13,a,i,p),n.elementType=J,n.lanes=g,n;case ce:return n=Zn(19,a,i,p),n.elementType=ce,n.lanes=g,n;case Z:return nl(a,p,g,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case N:E=10;break e;case j:E=9;break e;case ee:E=11;break e;case Y:E=14;break e;case G:E=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=Zn(E,a,i,p),i.elementType=n,i.type=u,i.lanes=g,i}function Br(n,i,a,u){return n=Zn(7,n,u,i),n.lanes=a,n}function nl(n,i,a,u){return n=Zn(22,n,u,i),n.elementType=Z,n.lanes=a,n.stateNode={isHidden:!1},n}function yu(n,i,a){return n=Zn(6,n,null,i),n.lanes=a,n}function Su(n,i,a){return i=Zn(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function xv(n,i,a,u,p){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=dn(0),this.expirationTimes=dn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dn(0),this.identifierPrefix=u,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function Mu(n,i,a,u,p,g,E,F,V){return n=new xv(n,i,a,F,V),i===1?(i=1,g===!0&&(i|=8)):i=0,g=Zn(3,null,null,i),n.current=g,g.stateNode=n,g.memoizedState={element:u,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Uc(g),n}function gv(n,i,a){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:P,key:u==null?null:""+u,children:n,containerInfo:i,implementation:a}}function Vp(n){if(!n)return sr;n=n._reactInternals;e:{if(pi(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Nn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Nn(a))return xf(n,a,i)}return i}function Hp(n,i,a,u,p,g,E,F,V){return n=Mu(a,u,!0,n,p,g,E,F,V),n.context=Vp(null),a=n.current,u=En(),p=hr(a),g=Li(u,p),g.callback=i??null,lr(a,g,p),n.current.lanes=p,en(n,p,u),Dn(n,u),n}function il(n,i,a,u){var p=i.current,g=En(),E=hr(p);return a=Vp(a),i.context===null?i.context=a:i.pendingContext=a,i=Li(g,E),i.payload={element:n},u=u===void 0?null:u,u!==null&&(i.callback=u),n=lr(p,i,E),n!==null&&(oi(n,p,E,g),Io(n,p,E)),E}function rl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Gp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function bu(n,i){Gp(n,i),(n=n.alternate)&&Gp(n,i)}function vv(){return null}var Wp=typeof reportError=="function"?reportError:function(n){console.error(n)};function wu(n){this._internalRoot=n}sl.prototype.render=wu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));il(n,i,null,null)},sl.prototype.unmount=wu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Fr(function(){il(null,n,null,null)}),i[Ci]=null}};function sl(n){this._internalRoot=n}sl.prototype.unstable_scheduleHydration=function(n){if(n){var i=Ah();n={blockedOn:null,target:n,priority:i};for(var a=0;a<er.length&&i!==0&&i<er[a].priority;a++);er.splice(a,0,n),a===0&&Rh(n)}};function Eu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function al(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Xp(){}function _v(n,i,a,u,p){if(p){if(typeof u=="function"){var g=u;u=function(){var ae=rl(E);g.call(ae)}}var E=Hp(i,u,n,0,null,!1,!1,"",Xp);return n._reactRootContainer=E,n[Ci]=E.current,va(n.nodeType===8?n.parentNode:n),Fr(),E}for(;p=n.lastChild;)n.removeChild(p);if(typeof u=="function"){var F=u;u=function(){var ae=rl(V);F.call(ae)}}var V=Mu(n,0,!1,null,null,!1,!1,"",Xp);return n._reactRootContainer=V,n[Ci]=V.current,va(n.nodeType===8?n.parentNode:n),Fr(function(){il(i,V,a,u)}),V}function ol(n,i,a,u,p){var g=a._reactRootContainer;if(g){var E=g;if(typeof p=="function"){var F=p;p=function(){var V=rl(E);F.call(V)}}il(i,E,n,p)}else E=_v(a,i,n,p,u);return rl(E)}Eh=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=vt(i.pendingLanes);a!==0&&(tn(i,a|1),Dn(i,te()),(wt&6)===0&&(Ts=te()+500,ar()))}break;case 13:Fr(function(){var u=Di(n,1);if(u!==null){var p=En();oi(u,n,1,p)}}),bu(n,1)}},Kl=function(n){if(n.tag===13){var i=Di(n,134217728);if(i!==null){var a=En();oi(i,n,134217728,a)}bu(n,134217728)}},Th=function(n){if(n.tag===13){var i=hr(n),a=Di(n,i);if(a!==null){var u=En();oi(a,n,i,u)}bu(n,i)}},Ah=function(){return bt},Ch=function(n,i){var a=bt;try{return bt=n,i()}finally{bt=a}},Ce=function(n,i,a){switch(i){case"input":if(ft(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var u=a[i];if(u!==n&&u.form===n.form){var p=wo(u);if(!p)throw Error(t(90));Lt(u),ft(u,p)}}}break;case"textarea":me(n,a);break;case"select":i=a.value,i!=null&&k(n,!!a.multiple,i,!1)}},Ut=xu,Yt=Fr;var yv={usingClientEntryPoint:!1,Events:[Sa,fs,wo,Pe,at,xu]},Ua={findFiberByHostInstance:Nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Sv={bundleType:Ua.bundleType,version:Ua.version,rendererPackageName:Ua.rendererPackageName,rendererConfig:Ua.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:w.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=so(n),n===null?null:n.stateNode},findFiberByHostInstance:Ua.findFiberByHostInstance||vv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ll=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ll.isDisabled&&ll.supportsFiber)try{tt=ll.inject(Sv),Ve=ll}catch{}}return Ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yv,Ln.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Eu(i))throw Error(t(200));return gv(n,i,null,a)},Ln.createRoot=function(n,i){if(!Eu(n))throw Error(t(299));var a=!1,u="",p=Wp;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onRecoverableError!==void 0&&(p=i.onRecoverableError)),i=Mu(n,1,!1,null,null,a,!1,u,p),n[Ci]=i.current,va(n.nodeType===8?n.parentNode:n),new wu(i)},Ln.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=so(i),n=n===null?null:n.stateNode,n},Ln.flushSync=function(n){return Fr(n)},Ln.hydrate=function(n,i,a){if(!al(i))throw Error(t(200));return ol(null,n,i,!0,a)},Ln.hydrateRoot=function(n,i,a){if(!Eu(n))throw Error(t(405));var u=a!=null&&a.hydratedSources||null,p=!1,g="",E=Wp;if(a!=null&&(a.unstable_strictMode===!0&&(p=!0),a.identifierPrefix!==void 0&&(g=a.identifierPrefix),a.onRecoverableError!==void 0&&(E=a.onRecoverableError)),i=Hp(i,null,n,1,a??null,p,!1,g,E),n[Ci]=i.current,va(n),u)for(n=0;n<u.length;n++)a=u[n],p=a._getVersion,p=p(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,p]:i.mutableSourceEagerHydrationData.push(a,p);return new sl(i)},Ln.render=function(n,i,a){if(!al(i))throw Error(t(200));return ol(null,n,i,!1,a)},Ln.unmountComponentAtNode=function(n){if(!al(n))throw Error(t(40));return n._reactRootContainer?(Fr(function(){ol(null,null,n,!1,function(){n._reactRootContainer=null,n[Ci]=null})}),!0):!1},Ln.unstable_batchedUpdates=xu,Ln.unstable_renderSubtreeIntoContainer=function(n,i,a,u){if(!al(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return ol(n,i,a,!1,u)},Ln.version="18.3.1-next-f1338f8080-20240426",Ln}var em;function Rv(){if(em)return Cu.exports;em=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Cu.exports=Nv(),Cu.exports}var tm;function Pv(){if(tm)return cl;tm=1;var s=Rv();return cl.createRoot=s.createRoot,cl.hydrateRoot=s.hydrateRoot,cl}var Dv=Pv();const Lv=r0(Dv),Iv=[{id:"tenant_apex",name:"Apex Dental Studio",slug:"apex-dental",address:"742 Evergreen Terrace, Suite 300, Austin, TX",phone:"(512) 555-0198",email:"contact@apexdental.com",status:"active",doctorAdminName:"Dr. Sarah Vance, DDS",doctorAdminEmail:"dr.vance@apexdental.com",storageMb:1420,plan:"Enterprise",createdAt:"2024-01-15"},{id:"tenant_radiant",name:"Radiant Smile Dental",slug:"radiant-smile",address:"1204 Pine Crest Blvd, Denver, CO",phone:"(303) 555-4821",email:"admin@radiantsmile.com",status:"active",doctorAdminName:"Dr. Julian Martinez, DMD",doctorAdminEmail:"dr.martinez@radiantsmile.com",storageMb:890,plan:"Professional",createdAt:"2024-03-20"}],Cs=[{id:"user_super_admin",tenantId:null,name:"Arthur Pendelton",email:"superadmin@dentrixplatform.io",role:"SUPER_ADMIN",title:"Platform Infrastructure Lead",permissions:{canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!0,canViewRevenue:!0,canManageServices:!0,canManageStaff:!0},status:"active",joinedAt:"2023-11-01"},{id:"user_apex_doctor",tenantId:"tenant_apex",name:"Dr. Sarah Vance, DDS",email:"dr.vance@apexdental.com",role:"DOCTOR_ADMIN",title:"Lead Dental Surgeon & Clinic Owner",phone:"(512) 555-0199",permissions:{canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!0,canViewRevenue:!0,canManageServices:!0,canManageStaff:!0},status:"active",joinedAt:"2024-01-15"},{id:"user_apex_receptionist",tenantId:"tenant_apex",name:"Emma Robinson",email:"emma.reception@apexdental.com",role:"STAFF",title:"Lead Front Desk Coordinator",phone:"(512) 555-0177",permissions:{canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!1,canViewRevenue:!1,canManageServices:!1,canManageStaff:!1},status:"active",joinedAt:"2024-02-01"},{id:"user_apex_hygienist",tenantId:"tenant_apex",name:"Marcus Lee, RDH",email:"marcus.hygiene@apexdental.com",role:"STAFF",title:"Registered Dental Hygienist",phone:"(512) 555-0164",permissions:{canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!0,canViewRevenue:!1,canManageServices:!1,canManageStaff:!1},status:"active",joinedAt:"2024-02-15"},{id:"user_radiant_doctor",tenantId:"tenant_radiant",name:"Dr. Julian Martinez, DMD",email:"dr.martinez@radiantsmile.com",role:"DOCTOR_ADMIN",title:"Doctor Owner & Cosmetic Specialist",phone:"(303) 555-4822",permissions:{canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!0,canViewRevenue:!0,canManageServices:!0,canManageStaff:!0},status:"active",joinedAt:"2024-03-20"}],Uv=[{id:"srv_1",tenantId:"tenant_apex",code:"D0120",name:"Periodic Oral Evaluation",category:"Preventive",durationMinutes:30,basePrice:65,description:"Comprehensive evaluation established patient including cancer screening and soft tissue assessment.",isActive:!0},{id:"srv_2",tenantId:"tenant_apex",code:"D1110",name:"Prophylaxis (Adult Cleaning)",category:"Preventive",durationMinutes:45,basePrice:110,description:"Removal of plaque, calculus, and stains from tooth structures in the permanent and transitional dentition.",isActive:!0},{id:"srv_3",tenantId:"tenant_apex",code:"D2391",name:"Resin Composite - 1 Surface (Posterior)",category:"Restorative",durationMinutes:60,basePrice:220,description:"Direct tooth-colored light-cured composite resin filling on one tooth surface.",isActive:!0},{id:"srv_4",tenantId:"tenant_apex",code:"D2740",name:"Porcelain/Ceramic Crown",category:"Restorative",durationMinutes:90,basePrice:1150,description:"Full-coverage all-ceramic high translucent crown custom fabricated for posterior or anterior tooth.",isActive:!0},{id:"srv_5",tenantId:"tenant_apex",code:"D3330",name:"Molar Endodontic Therapy (Root Canal)",category:"Endodontics",durationMinutes:90,basePrice:1350,description:"Complete mechanical and chemical debridement and gutta-percha obturation of molar pulp canal system.",isActive:!0},{id:"srv_6",tenantId:"tenant_apex",code:"D7140",name:"Extraction of Erupted Tooth",category:"Oral Surgery",durationMinutes:45,basePrice:240,description:"Simple surgical extraction of exposed tooth or residual root with local anesthesia.",isActive:!0},{id:"srv_7",tenantId:"tenant_apex",code:"D4341",name:"Periodontal Scaling & Root Planing (per quad)",category:"Periodontics",durationMinutes:60,basePrice:280,description:"Deep therapeutic root instrumentation for active pocket reduction and biofilm elimination.",isActive:!0},{id:"srv_8",tenantId:"tenant_apex",code:"D8080",name:"Comprehensive Orthodontic Consultation & Scan",category:"Orthodontics",durationMinutes:45,basePrice:180,description:"Full 3D intraoral digital scan and clear aligner treatment simulation.",isActive:!0}],kv=[{id:"pat_1",tenantId:"tenant_apex",firstName:"Eleanor",lastName:"Rigby",email:"eleanor.rigby@gmail.com",phone:"(512) 839-4412",dateOfBirth:"1988-06-14",gender:"Female",address:"4502 South Congress Ave, Austin, TX",insurance:{provider:"Delta Dental Premier",policyNumber:"DEL-8839210",groupNumber:"GRP-9901"},emergencyContact:{name:"Thomas Rigby",phone:"(512) 839-4413",relationship:"Spouse"},medicalAlerts:["Penicillin Allergy","Mitral Valve Prolapse"],balance:0,lastVisit:"2024-09-01",nextVisit:"2024-09-08",status:"Active",createdAt:"2023-05-12"},{id:"pat_2",tenantId:"tenant_apex",firstName:"David",lastName:"Holloway",email:"dholloway@austintech.io",phone:"(512) 991-3044",dateOfBirth:"1976-11-23",gender:"Male",address:"1802 Barton Springs Rd, Austin, TX",insurance:{provider:"MetLife Dental Preferred",policyNumber:"MET-4410294",groupNumber:"TECH-400"},emergencyContact:{name:"Sarah Holloway",phone:"(512) 991-3045",relationship:"Wife"},medicalAlerts:["Hypertension (Lisinopril 10mg)"],balance:220,lastVisit:"2024-08-15",nextVisit:"2024-09-08",status:"Active",createdAt:"2023-08-19"},{id:"pat_3",tenantId:"tenant_apex",firstName:"Chloe",lastName:"Kowalski",email:"chloe.k@outlook.com",phone:"(512) 420-9118",dateOfBirth:"1995-03-08",gender:"Female",address:"908 East 6th Street, Austin, TX",insurance:{provider:"Cigna Dental Health",policyNumber:"CIG-1002934",groupNumber:"CIG-882"},emergencyContact:{name:"Jan Kowalski",phone:"(512) 420-9119",relationship:"Father"},medicalAlerts:["Latex Sensitivity"],balance:0,lastVisit:"2024-07-22",nextVisit:"2024-09-09",status:"Active",createdAt:"2024-01-10"},{id:"pat_4",tenantId:"tenant_apex",firstName:"Mateo",lastName:"Vasquez",email:"mateo.v@gmail.com",phone:"(512) 774-8219",dateOfBirth:"1991-09-30",gender:"Male",address:"3200 Guadalupe St, Austin, TX",insurance:{provider:"Guardian DentalGuard",policyNumber:"GDG-551042",groupNumber:"AUSTIN-01"},emergencyContact:{name:"Carmen Vasquez",phone:"(512) 774-8220",relationship:"Mother"},medicalAlerts:[],balance:450,lastVisit:"2024-06-10",nextVisit:"2024-09-08",status:"Active",createdAt:"2024-02-05"},{id:"pat_5",tenantId:"tenant_apex",firstName:"Aria",lastName:"Montgomery",email:"aria.m@rosewood.net",phone:"(512) 662-3901",dateOfBirth:"2001-12-05",gender:"Female",address:"1410 Manor Rd, Austin, TX",insurance:{provider:"Aetna Dental PPO",policyNumber:"AET-994812",groupNumber:"GRP-22"},emergencyContact:{name:"Byron Montgomery",phone:"(512) 662-3902",relationship:"Father"},medicalAlerts:["Asthma (Albuterol PRN)"],balance:0,lastVisit:"2024-08-28",nextVisit:"2024-09-10",status:"Active",createdAt:"2024-04-12"}],Fv=[{id:"note_1",tenantId:"tenant_apex",patientId:"pat_2",doctorId:"user_apex_doctor",doctorName:"Dr. Sarah Vance, DDS",date:"2024-08-15",toothNumber:"#19 (Mandibular Left First Molar)",procedureName:"Resin Composite - 1 Surface (D2391)",diagnosis:"Recurrent occlusal decay under fractured amalgam margin.",notes:"Administered 1 carpule Septocaine 4% with 1:100,000 epi via IAN block. Achieved profound anesthesia. Placed rubber dam isolation. Excavated active caries using #4 round carbide bur. Etched for 15 sec with 37% phosphoric acid, Prime&Bond applied and cured. Placed Filtek Supreme A2 composite in 2mm increments. Finished with fine diamonds and Enhance polishing cups. Occlusion checked with 40um articulating paper in centric and lateral excursions — clear.",treatmentPlanSummary:"Recommend ceramic crown (#19) if lingual cusp shows future micro-fracture.",vitals:{bloodPressure:"124/82 mmHg",pulseRate:"72 bpm"},doctorSignature:"Dr. Sarah Vance, DDS (License #TX-48921)",signedAt:"2024-08-15 14:35"},{id:"note_2",tenantId:"tenant_apex",patientId:"pat_1",doctorId:"user_apex_doctor",doctorName:"Dr. Sarah Vance, DDS",date:"2024-09-01",toothNumber:"Full Mouth / Preventive",procedureName:"Periodic Evaluation & Prophylaxis (D0120 & D1110)",diagnosis:"Generalized mild marginal gingivitis; no active carious lesions detected.",notes:"Full mouth periodontal charting completed by Marcus RDH. Pockets range 2-3mm with isolated 4mm mesial of #30 with bleeding upon probing. Supra-gingival calculus removed using ultrasonic scaler and hand curettes. Polished with fine mint prophy paste. Fluoride varnish applied. Reviewed Bass brushing technique and daily interdental flossing.",treatmentPlanSummary:"6-month recall routine maintenance scheduled.",vitals:{bloodPressure:"116/74 mmHg",pulseRate:"68 bpm"},doctorSignature:"Dr. Sarah Vance, DDS (License #TX-48921)",signedAt:"2024-09-01 11:15"}],Ov=()=>{const s=new Date().toISOString().split("T")[0];return[{id:"apt_1",tenantId:"tenant_apex",patientId:"pat_1",patientName:"Eleanor Rigby",patientPhone:"(512) 839-4412",doctorId:"user_apex_doctor",doctorName:"Dr. Sarah Vance, DDS",serviceId:"srv_2",serviceName:"Prophylaxis (Adult Cleaning)",procedureCode:"D1110",date:s,startTime:"09:00",endTime:"09:45",durationMinutes:45,operatoryChair:"Chair 1 - Hygiene",status:"In-Chair",notes:"Patient arrived early. Mentioned sensitivity on lower right.",fee:110},{id:"apt_2",tenantId:"tenant_apex",patientId:"pat_2",patientName:"David Holloway",patientPhone:"(512) 991-3044",doctorId:"user_apex_doctor",doctorName:"Dr. Sarah Vance, DDS",serviceId:"srv_3",serviceName:"Resin Composite - 1 Surface",procedureCode:"D2391",date:s,startTime:"10:00",endTime:"11:00",durationMinutes:60,operatoryChair:"Chair 2 - Surgery",status:"Scheduled",notes:"Follow-up for tooth #19 restoration check.",fee:220},{id:"apt_3",tenantId:"tenant_apex",patientId:"pat_4",patientName:"Mateo Vasquez",patientPhone:"(512) 774-8219",doctorId:"user_apex_doctor",doctorName:"Dr. Sarah Vance, DDS",serviceId:"srv_5",serviceName:"Molar Endodontic Therapy",procedureCode:"D3330",date:s,startTime:"13:30",endTime:"15:00",durationMinutes:90,operatoryChair:"Chair 2 - Surgery",status:"Scheduled",notes:"Severe nocturnal throbbing pain on tooth #30.",fee:1350},{id:"apt_4",tenantId:"tenant_apex",patientId:"pat_3",patientName:"Chloe Kowalski",patientPhone:"(512) 420-9118",doctorId:"user_apex_doctor",doctorName:"Dr. Sarah Vance, DDS",serviceId:"srv_8",serviceName:"Comprehensive Orthodontic Consultation",procedureCode:"D8080",date:s,startTime:"15:30",endTime:"16:15",durationMinutes:45,operatoryChair:"Chair 3 - General",status:"Scheduled",notes:"Interested in clear aligner therapy for anterior crowding.",fee:180},{id:"apt_5",tenantId:"tenant_apex",patientId:"pat_5",patientName:"Aria Montgomery",patientPhone:"(512) 662-3901",doctorId:"user_apex_doctor",doctorName:"Dr. Sarah Vance, DDS",serviceId:"srv_1",serviceName:"Periodic Oral Evaluation",procedureCode:"D0120",date:s,startTime:"11:15",endTime:"11:45",durationMinutes:30,operatoryChair:"Chair 1 - Hygiene",status:"Completed",notes:"Clean checkup, no new issues.",fee:65}]},zv=[{id:"inv_101",tenantId:"tenant_apex",invoiceNumber:"INV-2024-00101",patientId:"pat_5",patientName:"Aria Montgomery",serviceName:"Periodic Oral Evaluation (D0120)",amount:65,amountPaid:65,balance:0,date:"2024-09-07",dueDate:"2024-09-07",status:"Paid",paymentMethod:"Credit Card"},{id:"inv_102",tenantId:"tenant_apex",invoiceNumber:"INV-2024-00102",patientId:"pat_2",patientName:"David Holloway",serviceName:"Resin Composite 1 Surface (D2391)",amount:220,amountPaid:0,balance:220,date:"2024-09-07",dueDate:"2024-09-21",status:"Pending"},{id:"inv_103",tenantId:"tenant_apex",invoiceNumber:"INV-2024-00103",patientId:"pat_4",patientName:"Mateo Vasquez",serviceName:"Periodontal Scaling & Planing (D4341)",amount:560,amountPaid:110,balance:450,date:"2024-08-25",dueDate:"2024-09-05",status:"Overdue",paymentMethod:"Debit Card"},{id:"inv_104",tenantId:"tenant_apex",invoiceNumber:"INV-2024-00104",patientId:"pat_1",patientName:"Eleanor Rigby",serviceName:"Prophylaxis & Oral Exam (D1110 & D0120)",amount:175,amountPaid:175,balance:0,date:"2024-09-01",dueDate:"2024-09-01",status:"Paid",paymentMethod:"Insurance"},{id:"inv_105",tenantId:"tenant_apex",invoiceNumber:"INV-2024-00105",patientId:"pat_3",patientName:"Chloe Kowalski",serviceName:"Porcelain Ceramic Crown (D2740)",amount:1150,amountPaid:1150,balance:0,date:"2024-08-18",dueDate:"2024-08-18",status:"Paid",paymentMethod:"Credit Card"}],Bv={databasePools:{active:14,idle:36,max:100},storageUsedGb:28.4,storageTotalGb:250,uptimePercent:99.98,activeTenantsCount:2,totalAppointmentsToday:5},s0=we.createContext(void 0),jv=({children:s})=>{const[e,t]=we.useState(()=>{const T=localStorage.getItem("dentrix_tenants");return T?JSON.parse(T):Iv}),[r,o]=we.useState(()=>{const T=localStorage.getItem("dentrix_users");return T?JSON.parse(T):Cs}),[l,d]=we.useState(()=>{const T=localStorage.getItem("dentrix_active_user");return T?JSON.parse(T):Cs.find(S=>S.id==="user_apex_doctor")||Cs[1]});we.useEffect(()=>{localStorage.setItem("dentrix_tenants",JSON.stringify(e))},[e]),we.useEffect(()=>{localStorage.setItem("dentrix_users",JSON.stringify(r))},[r]),we.useEffect(()=>{localStorage.setItem("dentrix_active_user",JSON.stringify(l))},[l]);const h=e.find(T=>T.id===l.tenantId)||null,f=(T,S)=>{const x=S||l.tenantId||"tenant_apex";if(T==="SUPER_ADMIN"){const I=r.find(C=>C.role==="SUPER_ADMIN")||Cs[0];d(I)}else if(T==="DOCTOR_ADMIN"){const I=r.find(C=>C.role==="DOCTOR_ADMIN"&&C.tenantId===x)||r.find(C=>C.role==="DOCTOR_ADMIN")||Cs[1];d(I)}else{const I=r.find(C=>C.role==="STAFF"&&C.tenantId===x)||r.find(C=>C.role==="STAFF")||Cs[2];d(I)}},m=T=>{if(l.role==="SUPER_ADMIN")return;const S=r.find(x=>x.tenantId===T&&x.role===l.role);if(S)d(S);else{const x=r.find(I=>I.tenantId===T);x&&d(x)}},v=(T,S)=>{o(x=>x.map(I=>I.id===T?{...I,permissions:{...I.permissions,...S}}:I)),l.id===T&&d(x=>({...x,permissions:{...x.permissions,...S}}))},_=(T,S)=>{t(x=>[T,...x]),o(x=>[...x,S])},y=T=>{t(S=>S.map(x=>x.id===T?{...x,status:x.status==="active"?"suspended":"active"}:x))},M=T=>{const S={...T,id:`user_staff_${Date.now()}`,joinedAt:new Date().toISOString().split("T")[0]};o(x=>[...x,S])},b=T=>{o(S=>S.map(x=>x.id===T?{...x,status:x.status==="active"?"inactive":"active"}:x))};return c.jsx(s0.Provider,{value:{currentUser:l,currentTenant:h,allTenants:e,allUsers:r,switchRole:f,switchTenant:m,updateUserPermissions:v,addTenant:_,toggleTenantStatus:y,addStaffMember:M,toggleStaffStatus:b},children:s})},On=()=>{const s=we.useContext(s0);if(!s)throw new Error("useAuth must be used within an AuthProvider");return s},a0=we.createContext(void 0),Vv=({children:s})=>{const{currentUser:e,currentTenant:t}=On(),r=(t==null?void 0:t.id)||"tenant_apex",[o,l]=we.useState(()=>{const G=localStorage.getItem("dentrix_patients");return G?JSON.parse(G):kv}),[d,h]=we.useState(()=>{const G=localStorage.getItem("dentrix_appointments");return G?JSON.parse(G):Ov()}),[f,m]=we.useState(()=>{const G=localStorage.getItem("dentrix_services");return G?JSON.parse(G):Uv}),[v,_]=we.useState(()=>{const G=localStorage.getItem("dentrix_clinical_notes");return G?JSON.parse(G):Fv}),[y,M]=we.useState(()=>{const G=localStorage.getItem("dentrix_invoices");return G?JSON.parse(G):zv}),[b,T]=we.useState(()=>{const G=localStorage.getItem("dentrix_system_health");return G?JSON.parse(G):Bv});we.useEffect(()=>{localStorage.setItem("dentrix_patients",JSON.stringify(o))},[o]),we.useEffect(()=>{localStorage.setItem("dentrix_appointments",JSON.stringify(d))},[d]),we.useEffect(()=>{localStorage.setItem("dentrix_services",JSON.stringify(f))},[f]),we.useEffect(()=>{localStorage.setItem("dentrix_clinical_notes",JSON.stringify(v))},[v]),we.useEffect(()=>{localStorage.setItem("dentrix_invoices",JSON.stringify(y))},[y]),we.useEffect(()=>{localStorage.setItem("dentrix_system_health",JSON.stringify(b))},[b]);const S=e.role==="SUPER_ADMIN",x=S?o:o.filter(G=>G.tenantId===r),I=S?d:d.filter(G=>G.tenantId===r),C=S?f:f.filter(G=>G.tenantId===r),w=S?v:v.filter(G=>G.tenantId===r),D=S?y:y.filter(G=>G.tenantId===r),P=G=>{const Z={...G,id:`pat_${Date.now()}`,tenantId:r,createdAt:new Date().toISOString().split("T")[0]};return l(O=>[Z,...O]),Z},U=G=>{l(Z=>Z.map(O=>O.id===G.id?G:O))},B=G=>{const Z={...G,id:`apt_${Date.now()}`,tenantId:r};h(oe=>[Z,...oe]);const O={id:`inv_${Date.now()}`,tenantId:r,invoiceNumber:`INV-${new Date().getFullYear()}-${Math.floor(1e4+Math.random()*9e4)}`,patientId:Z.patientId,patientName:Z.patientName,appointmentId:Z.id,serviceName:`${Z.serviceName} (${Z.procedureCode})`,amount:Z.fee,amountPaid:0,balance:Z.fee,date:Z.date,dueDate:Z.date,status:"Pending"};return M(oe=>[O,...oe]),Z},L=(G,Z)=>{h(O=>O.map(oe=>oe.id===G?{...oe,status:Z}:oe))},N=G=>{const Z={...G,id:`note_${Date.now()}`,tenantId:r,signedAt:new Date().toISOString().replace("T"," ").substring(0,16)};return _(O=>[Z,...O]),Z},j=G=>{const Z={...G,id:`srv_${Date.now()}`,tenantId:r};return m(O=>[...O,Z]),Z},ee=G=>{m(Z=>Z.map(O=>O.id===G.id?G:O))},J=G=>{m(Z=>Z.map(O=>O.id===G?{...O,isActive:!O.isActive}:O))},ce=G=>{const Z={...G,id:`inv_${Date.now()}`,tenantId:r};return M(O=>[Z,...O]),Z},Y=(G,Z="Credit Card")=>{M(O=>O.map(oe=>oe.id===G?{...oe,amountPaid:oe.amount,balance:0,status:"Paid",paymentMethod:Z}:oe))};return c.jsx(a0.Provider,{value:{patients:x,appointments:I,services:C,clinicalNotes:w,invoices:D,systemHealth:b,allPatients:o,allAppointments:d,allInvoices:y,addPatient:P,updatePatient:U,addAppointment:B,updateAppointmentStatus:L,addClinicalNote:N,addService:j,updateService:ee,toggleServiceActive:J,addInvoice:ce,markInvoicePaid:Y},children:s})},ti=()=>{const s=we.useContext(a0);if(!s)throw new Error("useData must be used within a DataProvider");return s};/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hv=s=>s==null?void 0:s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Gv(s,e,t=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Hv(s),size:24,node:e,...t.length>0?{aliases:t}:{}}}/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wv=s=>{let e="",t=!1;for(const r of s){if(r==="-"||r==="_"||r<=" "){t=e.length>0;continue}e.length===0?e+=r.toLowerCase():e+=t?r.toUpperCase():r,t=!1}return e};/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xv=s=>{const e=Wv(s);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fd=(...s)=>s.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Pu(s){return s!=null}function $v(s,e={}){var y,M;const t=e.attributeNames??{},r=b=>t[b]??b,o=s.size??s.width??jr.width,l=s.size??s.height??jr.height,d=((y=s.aliases)==null?void 0:y.filter(b=>typeof b=="string"&&b.trim()!=="").map(b=>`lucide-${b}`))??[],h=[...s.name?[`lucide-${s.name}`]:[],...d],f=((M=e.className)==null?void 0:M.split(" ").filter(Boolean))??[],m=e.includeDefaultClasses===!1?fd(...f):fd("lucide",...h,...f),v=e.absoluteStrokeWidth?Number(e.strokeWidth??jr["stroke-width"])*Number(s.size??s.width??jr.width)/Number(e.size??e.width??jr.width):e.strokeWidth??jr["stroke-width"];return["svg",{...Object.entries(jr).reduce((b,[T,S])=>(b[r(T)]=S,b),{}),..."color"in e&&e.color&&{[r("stroke")]:e.color},..."size"in e&&Pu(e.size)&&{[r("width")]:e.size,[r("height")]:e.size},..."width"in e&&Pu(e.width)&&{[r("width")]:e.width},..."height"in e&&Pu(e.height)&&{[r("height")]:e.height},[r("stroke-width")]:v,...m&&{[r("class")]:m},[r("viewBox")]:`0 0 ${o} ${l}`,...e.hasA11yProp===!1?{[r("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},s.node.map(b=>{const[T,S,x]=b,I=e.nonScalingStroke?{[r("vector-effect")]:"non-scaling-stroke",...S}:S;return x?[T,I,x]:[T,I]})]}/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function qv(s,e={}){return $v(s,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yv=s=>{for(const e in s)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},Kv=we.createContext({}),Jv=()=>we.useContext(Kv),Zv=we.forwardRef(({color:s,size:e,width:t,height:r,strokeWidth:o,absoluteStrokeWidth:l,nonScalingStroke:d,className:h="",children:f,iconNode:m=[],icon:v={node:m,aliases:[],size:24},..._},y)=>{const{size:M=24,strokeWidth:b=2,absoluteStrokeWidth:T=!1,nonScalingStroke:S=!1,color:x="currentColor",className:I=""}=Jv()??{},C=!!f||Yv(_),[w,D,P=[]]=qv(v,{color:s??x,width:t??e??M,height:r??e??M,strokeWidth:o??b,absoluteStrokeWidth:l??T,nonScalingStroke:d??S,className:fd(I,h),hasA11yProp:C,attributes:_});return we.createElement(w,{ref:y,...D},[...P.map(([U,B])=>we.createElement(U,B)),...Array.isArray(f)?f:[f]])});/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function ot(s,e=[],t=[]){const r=typeof s=="string"?Gv(s,e,t):s,o=we.forwardRef(({className:l,...d},h)=>we.createElement(Zv,{ref:h,icon:r,className:l,...d}));return r.name&&(o.displayName=Xv(r.name)),o}/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0={name:"activity",size:24,node:[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]};o0.node;const pd=ot(o0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0={name:"armchair",size:24,node:[["path",{d:"M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3",key:"irtipd"}],["path",{d:"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",key:"1qyhux"}],["path",{d:"M5 18v2",key:"ppbyun"}],["path",{d:"M19 18v2",key:"gy7782"}]]};l0.node;const Ol=ot(l0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};c0.node;const Qv=ot(c0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u0={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};u0.node;const nm=ot(u0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0={name:"bell",size:24,node:[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]]};d0.node;const e_=ot(d0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h0={name:"building-2",size:24,node:[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]]};h0.node;const $s=ot(h0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0={name:"building",size:24,node:[["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3",key:"cabbwy"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]]};f0.node;const t_=ot(f0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0={name:"calendar-days",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M8 13h.01",key:"1sbv64"}],["path",{d:"M12 13h.01",key:"y0uutt"}],["path",{d:"M16 13h.01",key:"wip0gl"}],["path",{d:"M8 17h.01",key:"p3bg7i"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M16 17h.01",key:"ql8jdd"}]]};p0.node;const m0=ot(p0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0={name:"calendar",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]]};x0.node;const $a=ot(x0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};g0.node;const n_=ot(g0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};v0.node;const _0=ot(v0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y0={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};y0.node;const ih=ot(y0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S0={name:"circle-alert",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],aliases:["alert-circle"]};S0.node;const M0=ot(S0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b0={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};b0.node;const rh=ot(b0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w0={name:"clock",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]};w0.node;const sh=ot(w0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E0={name:"credit-card",size:24,node:[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]};E0.node;const i_=ot(E0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T0={name:"database",size:24,node:[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]};T0.node;const ah=ot(T0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A0={name:"dollar-sign",size:24,node:[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]};A0.node;const na=ot(A0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C0={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};C0.node;const r_=ot(C0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N0={name:"face-slightly-smiling",size:24,node:[["path",{d:"M15 10V9",key:"4dkmfx"}],["path",{d:"M16.472 15a6 6 0 01-8.943 0",key:"7qomzy"}],["path",{d:"M9 10V9",key:"1lazqi"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],aliases:["smile"]};N0.node;const s_=ot(N0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R0={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};R0.node;const P0=ot(R0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D0={name:"funnel",size:24,node:[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],aliases:["filter"]};D0.node;const a_=ot(D0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L0={name:"hard-drive",size:24,node:[["path",{d:"M10 16h.01",key:"1bzywj"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"18tbho"}],["path",{d:"M21.946 12.013H2.054",key:"zqlbp7"}],["path",{d:"M6 16h.01",key:"1pmjb7"}]]};L0.node;const I0=ot(L0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U0={name:"heart-pulse",size:24,node:[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}],["path",{d:"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"auskq0"}]]};U0.node;const k0=ot(U0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F0={name:"layout-dashboard",size:24,node:[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]};F0.node;const o_=ot(F0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O0={name:"mail",size:24,node:[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]};O0.node;const z0=ot(O0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B0={name:"phone",size:24,node:[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]};B0.node;const j0=ot(B0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V0={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};V0.node;const qs=ot(V0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H0={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};H0.node;const Hl=ot(H0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G0={name:"settings-2",size:24,node:[["path",{d:"M14 17H5",key:"gfn3mx"}],["path",{d:"M19 7h-9",key:"6i9tg"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]};G0.node;const W0=ot(G0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X0={name:"shield-alert",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]};X0.node;const l_=ot(X0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $0={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};$0.node;const c_=ot($0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q0={name:"shield",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]};q0.node;const Gl=ot(q0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y0={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Y0.node;const K0=ot(Y0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J0={name:"stethoscope",size:24,node:[["path",{d:"M11 2v2",key:"1539x4"}],["path",{d:"M5 2v2",key:"1yf1q8"}],["path",{d:"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",key:"rb5t3r"}],["path",{d:"M8 15a6 6 0 0 0 12 0v-3",key:"x18d4x"}],["circle",{cx:"20",cy:"10",r:"2",key:"ts1r5v"}]]};J0.node;const oh=ot(J0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z0={name:"trending-up",size:24,node:[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]};Z0.node;const Q0=ot(Z0);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ex={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};ex.node;const tx=ot(ex);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nx={name:"user-cog",size:24,node:[["path",{d:"M10 15H6a4 4 0 0 0-4 4v2",key:"1nfge6"}],["path",{d:"m14.305 16.53.923-.382",key:"1itpsq"}],["path",{d:"m15.228 13.852-.923-.383",key:"eplpkm"}],["path",{d:"m16.852 12.228-.383-.923",key:"13v3q0"}],["path",{d:"m16.852 17.772-.383.924",key:"1i8mnm"}],["path",{d:"m19.148 12.228.383-.923",key:"1q8j1v"}],["path",{d:"m19.53 18.696-.382-.924",key:"vk1qj3"}],["path",{d:"m20.772 13.852.924-.383",key:"n880s0"}],["path",{d:"m20.772 16.148.924.383",key:"1g6xey"}],["circle",{cx:"18",cy:"15",r:"3",key:"gjjjvw"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};nx.node;const u_=ot(nx);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ix={name:"user-check",size:24,node:[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};ix.node;const lh=ot(ix);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rx={name:"user-plus",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]};rx.node;const Wl=ot(rx);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sx={name:"user",size:24,node:[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]};sx.node;const d_=ot(sx);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ax={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};ax.node;const ch=ot(ax);/**
 * @license lucide-react v1.42.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ox={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};ox.node;const is=ot(ox);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const uh="174",h_=0,im=1,f_=2,lx=1,p_=2,ji=3,Er=0,kn=1,Vi=2,br=0,Gs=1,rm=2,sm=3,am=4,m_=5,Jr=100,x_=101,g_=102,v_=103,__=104,y_=200,S_=201,M_=202,b_=203,md=204,xd=205,w_=206,E_=207,T_=208,A_=209,C_=210,N_=211,R_=212,P_=213,D_=214,gd=0,vd=1,_d=2,Ys=3,yd=4,Sd=5,Md=6,bd=7,cx=0,L_=1,I_=2,wr=0,U_=1,k_=2,F_=3,ux=4,O_=5,z_=6,B_=7,dx=300,Ks=301,Js=302,wd=303,Ed=304,Xl=306,Td=1e3,Qr=1001,Ad=1002,fi=1003,j_=1004,ul=1005,Si=1006,Du=1007,es=1008,Xi=1009,hx=1010,fx=1011,qa=1012,dh=1013,ts=1014,Hi=1015,Ya=1016,hh=1017,fh=1018,Zs=1020,px=35902,mx=1021,xx=1022,hi=1023,gx=1024,vx=1025,Ws=1026,Qs=1027,_x=1028,ph=1029,yx=1030,mh=1031,xh=1033,Dl=33776,Ll=33777,Il=33778,Ul=33779,Cd=35840,Nd=35841,Rd=35842,Pd=35843,Dd=36196,Ld=37492,Id=37496,Ud=37808,kd=37809,Fd=37810,Od=37811,zd=37812,Bd=37813,jd=37814,Vd=37815,Hd=37816,Gd=37817,Wd=37818,Xd=37819,$d=37820,qd=37821,kl=36492,Yd=36494,Kd=36495,Sx=36283,Jd=36284,Zd=36285,Qd=36286,V_=3200,H_=3201,Mx=0,G_=1,Mr="",ei="srgb",ea="srgb-linear",zl="linear",Nt="srgb",Ns=7680,om=519,W_=512,X_=513,$_=514,bx=515,q_=516,Y_=517,K_=518,J_=519,lm=35044,cm="300 es",Gi=2e3,Bl=2001;class ia{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const o=r[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let l=0,d=o.length;l<d;l++)o[l].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lu=Math.PI/180,eh=180/Math.PI;function Ka(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xn[s&255]+xn[s>>8&255]+xn[s>>16&255]+xn[s>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[r&255]+xn[r>>8&255]+xn[r>>16&255]+xn[r>>24&255]).toLowerCase()}function xt(s,e,t){return Math.max(e,Math.min(t,s))}function Z_(s,e){return(s%e+e)%e}function Iu(s,e,t){return(1-t)*s+t*e}function Fa(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function In(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Qe{constructor(e=0,t=0){Qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,o=e.elements;return this.x=o[0]*t+o[3]*r+o[6],this.y=o[1]*t+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(xt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),o=Math.sin(t),l=this.x-e.x,d=this.y-e.y;return this.x=l*r-d*o+e.x,this.y=l*o+d*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ct{constructor(e,t,r,o,l,d,h,f,m){ct.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,d,h,f,m)}set(e,t,r,o,l,d,h,f,m){const v=this.elements;return v[0]=e,v[1]=o,v[2]=h,v[3]=t,v[4]=l,v[5]=f,v[6]=r,v[7]=d,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,d=r[0],h=r[3],f=r[6],m=r[1],v=r[4],_=r[7],y=r[2],M=r[5],b=r[8],T=o[0],S=o[3],x=o[6],I=o[1],C=o[4],w=o[7],D=o[2],P=o[5],U=o[8];return l[0]=d*T+h*I+f*D,l[3]=d*S+h*C+f*P,l[6]=d*x+h*w+f*U,l[1]=m*T+v*I+_*D,l[4]=m*S+v*C+_*P,l[7]=m*x+v*w+_*U,l[2]=y*T+M*I+b*D,l[5]=y*S+M*C+b*P,l[8]=y*x+M*w+b*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],h=e[5],f=e[6],m=e[7],v=e[8];return t*d*v-t*h*m-r*l*v+r*h*f+o*l*m-o*d*f}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],h=e[5],f=e[6],m=e[7],v=e[8],_=v*d-h*m,y=h*f-v*l,M=m*l-d*f,b=t*_+r*y+o*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=_*T,e[1]=(o*m-v*r)*T,e[2]=(h*r-o*d)*T,e[3]=y*T,e[4]=(v*t-o*f)*T,e[5]=(o*l-h*t)*T,e[6]=M*T,e[7]=(r*f-m*t)*T,e[8]=(d*t-r*l)*T,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,o,l,d,h){const f=Math.cos(l),m=Math.sin(l);return this.set(r*f,r*m,-r*(f*d+m*h)+d+e,-o*m,o*f,-o*(-m*d+f*h)+h+t,0,0,1),this}scale(e,t){return this.premultiply(Uu.makeScale(e,t)),this}rotate(e){return this.premultiply(Uu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Uu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<9;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uu=new ct;function wx(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function jl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Q_(){const s=jl("canvas");return s.style.display="block",s}const um={};function qr(s){s in um||(um[s]=!0,console.warn(s))}function ey(s,e,t){return new Promise(function(r,o){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:o();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}function ty(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function ny(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const dm=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hm=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function iy(){const s={enabled:!0,workingColorSpace:ea,spaces:{},convert:function(o,l,d){return this.enabled===!1||l===d||!l||!d||(this.spaces[l].transfer===Nt&&(o.r=Wi(o.r),o.g=Wi(o.g),o.b=Wi(o.b)),this.spaces[l].primaries!==this.spaces[d].primaries&&(o.applyMatrix3(this.spaces[l].toXYZ),o.applyMatrix3(this.spaces[d].fromXYZ)),this.spaces[d].transfer===Nt&&(o.r=Xs(o.r),o.g=Xs(o.g),o.b=Xs(o.b))),o},fromWorkingColorSpace:function(o,l){return this.convert(o,this.workingColorSpace,l)},toWorkingColorSpace:function(o,l){return this.convert(o,l,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Mr?zl:this.spaces[o].transfer},getLuminanceCoefficients:function(o,l=this.workingColorSpace){return o.fromArray(this.spaces[l].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,l,d){return o.copy(this.spaces[l].toXYZ).multiply(this.spaces[d].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[ea]:{primaries:e,whitePoint:r,transfer:zl,toXYZ:dm,fromXYZ:hm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ei},outputColorSpaceConfig:{drawingBufferColorSpace:ei}},[ei]:{primaries:e,whitePoint:r,transfer:Nt,toXYZ:dm,fromXYZ:hm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ei}}}),s}const Tt=iy();function Wi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Rs;class ry{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Rs===void 0&&(Rs=jl("canvas")),Rs.width=e.width,Rs.height=e.height;const r=Rs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Rs}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=jl("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),l=o.data;for(let d=0;d<l.length;d++)l[d]=Wi(l[d]/255)*255;return r.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Wi(t[r]/255)*255):t[r]=Wi(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sy=0;class gh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sy++}),this.uuid=Ka(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let d=0,h=o.length;d<h;d++)o[d].isDataTexture?l.push(ku(o[d].image)):l.push(ku(o[d]))}else l=ku(o);r.url=l}return t||(e.images[this.uuid]=r),r}}function ku(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ry.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ay=0;class Fn extends ia{constructor(e=Fn.DEFAULT_IMAGE,t=Fn.DEFAULT_MAPPING,r=Qr,o=Qr,l=Si,d=es,h=hi,f=Xi,m=Fn.DEFAULT_ANISOTROPY,v=Mr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ay++}),this.uuid=Ka(),this.name="",this.source=new gh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=l,this.minFilter=d,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=f,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Td:e.x=e.x-Math.floor(e.x);break;case Qr:e.x=e.x<0?0:1;break;case Ad:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Td:e.y=e.y-Math.floor(e.y);break;case Qr:e.y=e.y<0?0:1;break;case Ad:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Fn.DEFAULT_IMAGE=null;Fn.DEFAULT_MAPPING=dx;Fn.DEFAULT_ANISOTROPY=1;class Rt{constructor(e=0,t=0,r=0,o=1){Rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,o){return this.x=e,this.y=t,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=this.w,d=e.elements;return this.x=d[0]*t+d[4]*r+d[8]*o+d[12]*l,this.y=d[1]*t+d[5]*r+d[9]*o+d[13]*l,this.z=d[2]*t+d[6]*r+d[10]*o+d[14]*l,this.w=d[3]*t+d[7]*r+d[11]*o+d[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,o,l;const f=e.elements,m=f[0],v=f[4],_=f[8],y=f[1],M=f[5],b=f[9],T=f[2],S=f[6],x=f[10];if(Math.abs(v-y)<.01&&Math.abs(_-T)<.01&&Math.abs(b-S)<.01){if(Math.abs(v+y)<.1&&Math.abs(_+T)<.1&&Math.abs(b+S)<.1&&Math.abs(m+M+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(m+1)/2,w=(M+1)/2,D=(x+1)/2,P=(v+y)/4,U=(_+T)/4,B=(b+S)/4;return C>w&&C>D?C<.01?(r=0,o=.707106781,l=.707106781):(r=Math.sqrt(C),o=P/r,l=U/r):w>D?w<.01?(r=.707106781,o=0,l=.707106781):(o=Math.sqrt(w),r=P/o,l=B/o):D<.01?(r=.707106781,o=.707106781,l=0):(l=Math.sqrt(D),r=U/l,o=B/l),this.set(r,o,l,t),this}let I=Math.sqrt((S-b)*(S-b)+(_-T)*(_-T)+(y-v)*(y-v));return Math.abs(I)<.001&&(I=1),this.x=(S-b)/I,this.y=(_-T)/I,this.z=(y-v)/I,this.w=Math.acos((m+M+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class oy extends ia{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);const o={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new Fn(o,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const d=r.count;for(let h=0;h<d;h++)this.textures[h]=l.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let o=0,l=this.textures.length;o<l;o++)this.textures[o].image.width=e,this.textures[o].image.height=t,this.textures[o].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,r=e.textures.length;t<r;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const o=Object.assign({},e.textures[t].image);this.textures[t].source=new gh(o)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends oy{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class Ex extends Fn{constructor(e=null,t=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=fi,this.minFilter=fi,this.wrapR=Qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ly extends Fn{constructor(e=null,t=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=fi,this.minFilter=fi,this.wrapR=Qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ja{constructor(e=0,t=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=o}static slerpFlat(e,t,r,o,l,d,h){let f=r[o+0],m=r[o+1],v=r[o+2],_=r[o+3];const y=l[d+0],M=l[d+1],b=l[d+2],T=l[d+3];if(h===0){e[t+0]=f,e[t+1]=m,e[t+2]=v,e[t+3]=_;return}if(h===1){e[t+0]=y,e[t+1]=M,e[t+2]=b,e[t+3]=T;return}if(_!==T||f!==y||m!==M||v!==b){let S=1-h;const x=f*y+m*M+v*b+_*T,I=x>=0?1:-1,C=1-x*x;if(C>Number.EPSILON){const D=Math.sqrt(C),P=Math.atan2(D,x*I);S=Math.sin(S*P)/D,h=Math.sin(h*P)/D}const w=h*I;if(f=f*S+y*w,m=m*S+M*w,v=v*S+b*w,_=_*S+T*w,S===1-h){const D=1/Math.sqrt(f*f+m*m+v*v+_*_);f*=D,m*=D,v*=D,_*=D}}e[t]=f,e[t+1]=m,e[t+2]=v,e[t+3]=_}static multiplyQuaternionsFlat(e,t,r,o,l,d){const h=r[o],f=r[o+1],m=r[o+2],v=r[o+3],_=l[d],y=l[d+1],M=l[d+2],b=l[d+3];return e[t]=h*b+v*_+f*M-m*y,e[t+1]=f*b+v*y+m*_-h*M,e[t+2]=m*b+v*M+h*y-f*_,e[t+3]=v*b-h*_-f*y-m*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,o){return this._x=e,this._y=t,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,o=e._y,l=e._z,d=e._order,h=Math.cos,f=Math.sin,m=h(r/2),v=h(o/2),_=h(l/2),y=f(r/2),M=f(o/2),b=f(l/2);switch(d){case"XYZ":this._x=y*v*_+m*M*b,this._y=m*M*_-y*v*b,this._z=m*v*b+y*M*_,this._w=m*v*_-y*M*b;break;case"YXZ":this._x=y*v*_+m*M*b,this._y=m*M*_-y*v*b,this._z=m*v*b-y*M*_,this._w=m*v*_+y*M*b;break;case"ZXY":this._x=y*v*_-m*M*b,this._y=m*M*_+y*v*b,this._z=m*v*b+y*M*_,this._w=m*v*_-y*M*b;break;case"ZYX":this._x=y*v*_-m*M*b,this._y=m*M*_+y*v*b,this._z=m*v*b-y*M*_,this._w=m*v*_+y*M*b;break;case"YZX":this._x=y*v*_+m*M*b,this._y=m*M*_+y*v*b,this._z=m*v*b-y*M*_,this._w=m*v*_-y*M*b;break;case"XZY":this._x=y*v*_-m*M*b,this._y=m*M*_-y*v*b,this._z=m*v*b+y*M*_,this._w=m*v*_+y*M*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+d)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],o=t[4],l=t[8],d=t[1],h=t[5],f=t[9],m=t[2],v=t[6],_=t[10],y=r+h+_;if(y>0){const M=.5/Math.sqrt(y+1);this._w=.25/M,this._x=(v-f)*M,this._y=(l-m)*M,this._z=(d-o)*M}else if(r>h&&r>_){const M=2*Math.sqrt(1+r-h-_);this._w=(v-f)/M,this._x=.25*M,this._y=(o+d)/M,this._z=(l+m)/M}else if(h>_){const M=2*Math.sqrt(1+h-r-_);this._w=(l-m)/M,this._x=(o+d)/M,this._y=.25*M,this._z=(f+v)/M}else{const M=2*Math.sqrt(1+_-r-h);this._w=(d-o)/M,this._x=(l+m)/M,this._y=(f+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,t/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,o=e._y,l=e._z,d=e._w,h=t._x,f=t._y,m=t._z,v=t._w;return this._x=r*v+d*h+o*m-l*f,this._y=o*v+d*f+l*h-r*m,this._z=l*v+d*m+r*f-o*h,this._w=d*v-r*h-o*f-l*m,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,o=this._y,l=this._z,d=this._w;let h=d*e._w+r*e._x+o*e._y+l*e._z;if(h<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,h=-h):this.copy(e),h>=1)return this._w=d,this._x=r,this._y=o,this._z=l,this;const f=1-h*h;if(f<=Number.EPSILON){const M=1-t;return this._w=M*d+t*this._w,this._x=M*r+t*this._x,this._y=M*o+t*this._y,this._z=M*l+t*this._z,this.normalize(),this}const m=Math.sqrt(f),v=Math.atan2(m,h),_=Math.sin((1-t)*v)/m,y=Math.sin(t*v)/m;return this._w=d*_+this._w*y,this._x=r*_+this._x*y,this._y=o*_+this._y*y,this._z=l*_+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),o=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(o*Math.sin(e),o*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(e=0,t=0,r=0){X.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*o,this.y=l[1]*t+l[4]*r+l[7]*o,this.z=l[2]*t+l[5]*r+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=e.elements,d=1/(l[3]*t+l[7]*r+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*o+l[12])*d,this.y=(l[1]*t+l[5]*r+l[9]*o+l[13])*d,this.z=(l[2]*t+l[6]*r+l[10]*o+l[14])*d,this}applyQuaternion(e){const t=this.x,r=this.y,o=this.z,l=e.x,d=e.y,h=e.z,f=e.w,m=2*(d*o-h*r),v=2*(h*t-l*o),_=2*(l*r-d*t);return this.x=t+f*m+d*_-h*v,this.y=r+f*v+h*m-l*_,this.z=o+f*_+l*v-d*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*o,this.y=l[1]*t+l[5]*r+l[9]*o,this.z=l[2]*t+l[6]*r+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,o=e.y,l=e.z,d=t.x,h=t.y,f=t.z;return this.x=o*f-l*h,this.y=l*d-r*f,this.z=r*h-o*d,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Fu.copy(this).projectOnVector(e),this.sub(Fu)}reflect(e){return this.sub(Fu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(xt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return t*t+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const o=Math.sin(t)*e;return this.x=o*Math.sin(r),this.y=Math.cos(t)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fu=new X,fm=new Ja;class Za{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let d=0,h=l.count;d<h;d++)e.isMesh===!0?e.getVertexPosition(d,li):li.fromBufferAttribute(l,d),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),dl.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),dl.copy(r.boundingBox)),dl.applyMatrix4(e.matrixWorld),this.union(dl)}const o=e.children;for(let l=0,d=o.length;l<d;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oa),hl.subVectors(this.max,Oa),Ps.subVectors(e.a,Oa),Ds.subVectors(e.b,Oa),Ls.subVectors(e.c,Oa),xr.subVectors(Ds,Ps),gr.subVectors(Ls,Ds),Vr.subVectors(Ps,Ls);let t=[0,-xr.z,xr.y,0,-gr.z,gr.y,0,-Vr.z,Vr.y,xr.z,0,-xr.x,gr.z,0,-gr.x,Vr.z,0,-Vr.x,-xr.y,xr.x,0,-gr.y,gr.x,0,-Vr.y,Vr.x,0];return!Ou(t,Ps,Ds,Ls,hl)||(t=[1,0,0,0,1,0,0,0,1],!Ou(t,Ps,Ds,Ls,hl))?!1:(fl.crossVectors(xr,gr),t=[fl.x,fl.y,fl.z],Ou(t,Ps,Ds,Ls,hl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ki=[new X,new X,new X,new X,new X,new X,new X,new X],li=new X,dl=new Za,Ps=new X,Ds=new X,Ls=new X,xr=new X,gr=new X,Vr=new X,Oa=new X,hl=new X,fl=new X,Hr=new X;function Ou(s,e,t,r,o){for(let l=0,d=s.length-3;l<=d;l+=3){Hr.fromArray(s,l);const h=o.x*Math.abs(Hr.x)+o.y*Math.abs(Hr.y)+o.z*Math.abs(Hr.z),f=e.dot(Hr),m=t.dot(Hr),v=r.dot(Hr);if(Math.max(-Math.max(f,m,v),Math.min(f,m,v))>h)return!1}return!0}const cy=new Za,za=new X,zu=new X;class vh{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):cy.setFromPoints(e).getCenter(r);let o=0;for(let l=0,d=e.length;l<d;l++)o=Math.max(o,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;za.subVectors(e,this.center);const t=za.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),o=(r-this.radius)*.5;this.center.addScaledVector(za,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(za.copy(e.center).add(zu)),this.expandByPoint(za.copy(e.center).sub(zu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fi=new X,Bu=new X,pl=new X,vr=new X,ju=new X,ml=new X,Vu=new X;class uy{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,t),Fi.distanceToSquared(e))}distanceSqToSegment(e,t,r,o){Bu.copy(e).add(t).multiplyScalar(.5),pl.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(Bu);const l=e.distanceTo(t)*.5,d=-this.direction.dot(pl),h=vr.dot(this.direction),f=-vr.dot(pl),m=vr.lengthSq(),v=Math.abs(1-d*d);let _,y,M,b;if(v>0)if(_=d*f-h,y=d*h-f,b=l*v,_>=0)if(y>=-b)if(y<=b){const T=1/v;_*=T,y*=T,M=_*(_+d*y+2*h)+y*(d*_+y+2*f)+m}else y=l,_=Math.max(0,-(d*y+h)),M=-_*_+y*(y+2*f)+m;else y=-l,_=Math.max(0,-(d*y+h)),M=-_*_+y*(y+2*f)+m;else y<=-b?(_=Math.max(0,-(-d*l+h)),y=_>0?-l:Math.min(Math.max(-l,-f),l),M=-_*_+y*(y+2*f)+m):y<=b?(_=0,y=Math.min(Math.max(-l,-f),l),M=y*(y+2*f)+m):(_=Math.max(0,-(d*l+h)),y=_>0?l:Math.min(Math.max(-l,-f),l),M=-_*_+y*(y+2*f)+m);else y=d>0?-l:l,_=Math.max(0,-(d*y+h)),M=-_*_+y*(y+2*f)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(Bu).addScaledVector(pl,y),M}intersectSphere(e,t){Fi.subVectors(e.center,this.origin);const r=Fi.dot(this.direction),o=Fi.dot(Fi)-r*r,l=e.radius*e.radius;if(o>l)return null;const d=Math.sqrt(l-o),h=r-d,f=r+d;return f<0?null:h<0?this.at(f,t):this.at(h,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,o,l,d,h,f;const m=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,y=this.origin;return m>=0?(r=(e.min.x-y.x)*m,o=(e.max.x-y.x)*m):(r=(e.max.x-y.x)*m,o=(e.min.x-y.x)*m),v>=0?(l=(e.min.y-y.y)*v,d=(e.max.y-y.y)*v):(l=(e.max.y-y.y)*v,d=(e.min.y-y.y)*v),r>d||l>o||((l>r||isNaN(r))&&(r=l),(d<o||isNaN(o))&&(o=d),_>=0?(h=(e.min.z-y.z)*_,f=(e.max.z-y.z)*_):(h=(e.max.z-y.z)*_,f=(e.min.z-y.z)*_),r>f||h>o)||((h>r||r!==r)&&(r=h),(f<o||o!==o)&&(o=f),o<0)?null:this.at(r>=0?r:o,t)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,t,r,o,l){ju.subVectors(t,e),ml.subVectors(r,e),Vu.crossVectors(ju,ml);let d=this.direction.dot(Vu),h;if(d>0){if(o)return null;h=1}else if(d<0)h=-1,d=-d;else return null;vr.subVectors(this.origin,e);const f=h*this.direction.dot(ml.crossVectors(vr,ml));if(f<0)return null;const m=h*this.direction.dot(ju.cross(vr));if(m<0||f+m>d)return null;const v=-h*vr.dot(Vu);return v<0?null:this.at(v/d,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(e,t,r,o,l,d,h,f,m,v,_,y,M,b,T,S){Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,d,h,f,m,v,_,y,M,b,T,S)}set(e,t,r,o,l,d,h,f,m,v,_,y,M,b,T,S){const x=this.elements;return x[0]=e,x[4]=t,x[8]=r,x[12]=o,x[1]=l,x[5]=d,x[9]=h,x[13]=f,x[2]=m,x[6]=v,x[10]=_,x[14]=y,x[3]=M,x[7]=b,x[11]=T,x[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,o=1/Is.setFromMatrixColumn(e,0).length(),l=1/Is.setFromMatrixColumn(e,1).length(),d=1/Is.setFromMatrixColumn(e,2).length();return t[0]=r[0]*o,t[1]=r[1]*o,t[2]=r[2]*o,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*d,t[9]=r[9]*d,t[10]=r[10]*d,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,o=e.y,l=e.z,d=Math.cos(r),h=Math.sin(r),f=Math.cos(o),m=Math.sin(o),v=Math.cos(l),_=Math.sin(l);if(e.order==="XYZ"){const y=d*v,M=d*_,b=h*v,T=h*_;t[0]=f*v,t[4]=-f*_,t[8]=m,t[1]=M+b*m,t[5]=y-T*m,t[9]=-h*f,t[2]=T-y*m,t[6]=b+M*m,t[10]=d*f}else if(e.order==="YXZ"){const y=f*v,M=f*_,b=m*v,T=m*_;t[0]=y+T*h,t[4]=b*h-M,t[8]=d*m,t[1]=d*_,t[5]=d*v,t[9]=-h,t[2]=M*h-b,t[6]=T+y*h,t[10]=d*f}else if(e.order==="ZXY"){const y=f*v,M=f*_,b=m*v,T=m*_;t[0]=y-T*h,t[4]=-d*_,t[8]=b+M*h,t[1]=M+b*h,t[5]=d*v,t[9]=T-y*h,t[2]=-d*m,t[6]=h,t[10]=d*f}else if(e.order==="ZYX"){const y=d*v,M=d*_,b=h*v,T=h*_;t[0]=f*v,t[4]=b*m-M,t[8]=y*m+T,t[1]=f*_,t[5]=T*m+y,t[9]=M*m-b,t[2]=-m,t[6]=h*f,t[10]=d*f}else if(e.order==="YZX"){const y=d*f,M=d*m,b=h*f,T=h*m;t[0]=f*v,t[4]=T-y*_,t[8]=b*_+M,t[1]=_,t[5]=d*v,t[9]=-h*v,t[2]=-m*v,t[6]=M*_+b,t[10]=y-T*_}else if(e.order==="XZY"){const y=d*f,M=d*m,b=h*f,T=h*m;t[0]=f*v,t[4]=-_,t[8]=m*v,t[1]=y*_+T,t[5]=d*v,t[9]=M*_-b,t[2]=b*_-M,t[6]=h*v,t[10]=T*_+y}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dy,e,hy)}lookAt(e,t,r){const o=this.elements;return Hn.subVectors(e,t),Hn.lengthSq()===0&&(Hn.z=1),Hn.normalize(),_r.crossVectors(r,Hn),_r.lengthSq()===0&&(Math.abs(r.z)===1?Hn.x+=1e-4:Hn.z+=1e-4,Hn.normalize(),_r.crossVectors(r,Hn)),_r.normalize(),xl.crossVectors(Hn,_r),o[0]=_r.x,o[4]=xl.x,o[8]=Hn.x,o[1]=_r.y,o[5]=xl.y,o[9]=Hn.y,o[2]=_r.z,o[6]=xl.z,o[10]=Hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,d=r[0],h=r[4],f=r[8],m=r[12],v=r[1],_=r[5],y=r[9],M=r[13],b=r[2],T=r[6],S=r[10],x=r[14],I=r[3],C=r[7],w=r[11],D=r[15],P=o[0],U=o[4],B=o[8],L=o[12],N=o[1],j=o[5],ee=o[9],J=o[13],ce=o[2],Y=o[6],G=o[10],Z=o[14],O=o[3],oe=o[7],de=o[11],z=o[15];return l[0]=d*P+h*N+f*ce+m*O,l[4]=d*U+h*j+f*Y+m*oe,l[8]=d*B+h*ee+f*G+m*de,l[12]=d*L+h*J+f*Z+m*z,l[1]=v*P+_*N+y*ce+M*O,l[5]=v*U+_*j+y*Y+M*oe,l[9]=v*B+_*ee+y*G+M*de,l[13]=v*L+_*J+y*Z+M*z,l[2]=b*P+T*N+S*ce+x*O,l[6]=b*U+T*j+S*Y+x*oe,l[10]=b*B+T*ee+S*G+x*de,l[14]=b*L+T*J+S*Z+x*z,l[3]=I*P+C*N+w*ce+D*O,l[7]=I*U+C*j+w*Y+D*oe,l[11]=I*B+C*ee+w*G+D*de,l[15]=I*L+C*J+w*Z+D*z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],o=e[8],l=e[12],d=e[1],h=e[5],f=e[9],m=e[13],v=e[2],_=e[6],y=e[10],M=e[14],b=e[3],T=e[7],S=e[11],x=e[15];return b*(+l*f*_-o*m*_-l*h*y+r*m*y+o*h*M-r*f*M)+T*(+t*f*M-t*m*y+l*d*y-o*d*M+o*m*v-l*f*v)+S*(+t*m*_-t*h*M-l*d*_+r*d*M+l*h*v-r*m*v)+x*(-o*h*v-t*f*_+t*h*y+o*d*_-r*d*y+r*f*v)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],h=e[5],f=e[6],m=e[7],v=e[8],_=e[9],y=e[10],M=e[11],b=e[12],T=e[13],S=e[14],x=e[15],I=_*S*m-T*y*m+T*f*M-h*S*M-_*f*x+h*y*x,C=b*y*m-v*S*m-b*f*M+d*S*M+v*f*x-d*y*x,w=v*T*m-b*_*m+b*h*M-d*T*M-v*h*x+d*_*x,D=b*_*f-v*T*f-b*h*y+d*T*y+v*h*S-d*_*S,P=t*I+r*C+o*w+l*D;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/P;return e[0]=I*U,e[1]=(T*y*l-_*S*l-T*o*M+r*S*M+_*o*x-r*y*x)*U,e[2]=(h*S*l-T*f*l+T*o*m-r*S*m-h*o*x+r*f*x)*U,e[3]=(_*f*l-h*y*l-_*o*m+r*y*m+h*o*M-r*f*M)*U,e[4]=C*U,e[5]=(v*S*l-b*y*l+b*o*M-t*S*M-v*o*x+t*y*x)*U,e[6]=(b*f*l-d*S*l-b*o*m+t*S*m+d*o*x-t*f*x)*U,e[7]=(d*y*l-v*f*l+v*o*m-t*y*m-d*o*M+t*f*M)*U,e[8]=w*U,e[9]=(b*_*l-v*T*l-b*r*M+t*T*M+v*r*x-t*_*x)*U,e[10]=(d*T*l-b*h*l+b*r*m-t*T*m-d*r*x+t*h*x)*U,e[11]=(v*h*l-d*_*l-v*r*m+t*_*m+d*r*M-t*h*M)*U,e[12]=D*U,e[13]=(v*T*o-b*_*o+b*r*y-t*T*y-v*r*S+t*_*S)*U,e[14]=(b*h*o-d*T*o-b*r*f+t*T*f+d*r*S-t*h*S)*U,e[15]=(d*_*o-v*h*o+v*r*f-t*_*f-d*r*y+t*h*y)*U,this}scale(e){const t=this.elements,r=e.x,o=e.y,l=e.z;return t[0]*=r,t[4]*=o,t[8]*=l,t[1]*=r,t[5]*=o,t[9]*=l,t[2]*=r,t[6]*=o,t[10]*=l,t[3]*=r,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,o))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),o=Math.sin(t),l=1-r,d=e.x,h=e.y,f=e.z,m=l*d,v=l*h;return this.set(m*d+r,m*h-o*f,m*f+o*h,0,m*h+o*f,v*h+r,v*f-o*d,0,m*f-o*h,v*f+o*d,l*f*f+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,o,l,d){return this.set(1,r,l,0,e,1,d,0,t,o,1,0,0,0,0,1),this}compose(e,t,r){const o=this.elements,l=t._x,d=t._y,h=t._z,f=t._w,m=l+l,v=d+d,_=h+h,y=l*m,M=l*v,b=l*_,T=d*v,S=d*_,x=h*_,I=f*m,C=f*v,w=f*_,D=r.x,P=r.y,U=r.z;return o[0]=(1-(T+x))*D,o[1]=(M+w)*D,o[2]=(b-C)*D,o[3]=0,o[4]=(M-w)*P,o[5]=(1-(y+x))*P,o[6]=(S+I)*P,o[7]=0,o[8]=(b+C)*U,o[9]=(S-I)*U,o[10]=(1-(y+T))*U,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,r){const o=this.elements;let l=Is.set(o[0],o[1],o[2]).length();const d=Is.set(o[4],o[5],o[6]).length(),h=Is.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],ci.copy(this);const m=1/l,v=1/d,_=1/h;return ci.elements[0]*=m,ci.elements[1]*=m,ci.elements[2]*=m,ci.elements[4]*=v,ci.elements[5]*=v,ci.elements[6]*=v,ci.elements[8]*=_,ci.elements[9]*=_,ci.elements[10]*=_,t.setFromRotationMatrix(ci),r.x=l,r.y=d,r.z=h,this}makePerspective(e,t,r,o,l,d,h=Gi){const f=this.elements,m=2*l/(t-e),v=2*l/(r-o),_=(t+e)/(t-e),y=(r+o)/(r-o);let M,b;if(h===Gi)M=-(d+l)/(d-l),b=-2*d*l/(d-l);else if(h===Bl)M=-d/(d-l),b=-d*l/(d-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return f[0]=m,f[4]=0,f[8]=_,f[12]=0,f[1]=0,f[5]=v,f[9]=y,f[13]=0,f[2]=0,f[6]=0,f[10]=M,f[14]=b,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,r,o,l,d,h=Gi){const f=this.elements,m=1/(t-e),v=1/(r-o),_=1/(d-l),y=(t+e)*m,M=(r+o)*v;let b,T;if(h===Gi)b=(d+l)*_,T=-2*_;else if(h===Bl)b=l*_,T=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return f[0]=2*m,f[4]=0,f[8]=0,f[12]=-y,f[1]=0,f[5]=2*v,f[9]=0,f[13]=-M,f[2]=0,f[6]=0,f[10]=T,f[14]=-b,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<16;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Is=new X,ci=new Bt,dy=new X(0,0,0),hy=new X(1,1,1),_r=new X,xl=new X,Hn=new X,pm=new Bt,mm=new Ja;class bi{constructor(e=0,t=0,r=0,o=bi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,o=this._order){return this._x=e,this._y=t,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const o=e.elements,l=o[0],d=o[4],h=o[8],f=o[1],m=o[5],v=o[9],_=o[2],y=o[6],M=o[10];switch(t){case"XYZ":this._y=Math.asin(xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-d,l)):(this._x=Math.atan2(y,m),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(f,m)):(this._y=Math.atan2(-_,l),this._z=0);break;case"ZXY":this._x=Math.asin(xt(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-d,m)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-xt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(y,M),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-d,m));break;case"YZX":this._z=Math.asin(xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-_,l)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(y,m),this._y=Math.atan2(h,l)):(this._x=Math.atan2(-v,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return pm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pm,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mm.setFromEuler(this),this.setFromQuaternion(mm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bi.DEFAULT_ORDER="XYZ";class Tx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fy=0;const xm=new X,Us=new Ja,Oi=new Bt,gl=new X,Ba=new X,py=new X,my=new Ja,gm=new X(1,0,0),vm=new X(0,1,0),_m=new X(0,0,1),ym={type:"added"},xy={type:"removed"},ks={type:"childadded",child:null},Hu={type:"childremoved",child:null};class _n extends ia{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fy++}),this.uuid=Ka(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_n.DEFAULT_UP.clone();const e=new X,t=new bi,r=new Ja,o=new X(1,1,1);function l(){r.setFromEuler(t,!1)}function d(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Bt},normalMatrix:{value:new ct}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=_n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.multiply(Us),this}rotateOnWorldAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.premultiply(Us),this}rotateX(e){return this.rotateOnAxis(gm,e)}rotateY(e){return this.rotateOnAxis(vm,e)}rotateZ(e){return this.rotateOnAxis(_m,e)}translateOnAxis(e,t){return xm.copy(e).applyQuaternion(this.quaternion),this.position.add(xm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gm,e)}translateY(e){return this.translateOnAxis(vm,e)}translateZ(e){return this.translateOnAxis(_m,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?gl.copy(e):gl.set(e,t,r);const o=this.parent;this.updateWorldMatrix(!0,!1),Ba.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(Ba,gl,this.up):Oi.lookAt(gl,Ba,this.up),this.quaternion.setFromRotationMatrix(Oi),o&&(Oi.extractRotation(o.matrixWorld),Us.setFromRotationMatrix(Oi),this.quaternion.premultiply(Us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ym),ks.child=e,this.dispatchEvent(ks),ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xy),Hu.child=e,this.dispatchEvent(Hu),Hu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ym),ks.child=e,this.dispatchEvent(ks),ks.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,o=this.children.length;r<o;r++){const d=this.children[r].getObjectByProperty(e,t);if(d!==void 0)return d}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const o=this.children;for(let l=0,d=o.length;l<d;l++)o[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ba,e,py),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ba,my,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const o=this.children;for(let l=0,d=o.length;l<d;l++)o[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(h=>({boxInitialized:h.boxInitialized,boxMin:h.box.min.toArray(),boxMax:h.box.max.toArray(),sphereInitialized:h.sphereInitialized,sphereRadius:h.sphere.radius,sphereCenter:h.sphere.center.toArray()})),o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(h,f){return h[f.uuid]===void 0&&(h[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const f=h.shapes;if(Array.isArray(f))for(let m=0,v=f.length;m<v;m++){const _=f[m];l(e.shapes,_)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let f=0,m=this.material.length;f<m;f++)h.push(l(e.materials,this.material[f]));o.material=h}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const f=this.animations[h];o.animations.push(l(e.animations,f))}}if(t){const h=d(e.geometries),f=d(e.materials),m=d(e.textures),v=d(e.images),_=d(e.shapes),y=d(e.skeletons),M=d(e.animations),b=d(e.nodes);h.length>0&&(r.geometries=h),f.length>0&&(r.materials=f),m.length>0&&(r.textures=m),v.length>0&&(r.images=v),_.length>0&&(r.shapes=_),y.length>0&&(r.skeletons=y),M.length>0&&(r.animations=M),b.length>0&&(r.nodes=b)}return r.object=o,r;function d(h){const f=[];for(const m in h){const v=h[m];delete v.metadata,f.push(v)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}}_n.DEFAULT_UP=new X(0,1,0);_n.DEFAULT_MATRIX_AUTO_UPDATE=!0;_n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ui=new X,zi=new X,Gu=new X,Bi=new X,Fs=new X,Os=new X,Sm=new X,Wu=new X,Xu=new X,$u=new X,qu=new Rt,Yu=new Rt,Ku=new Rt;class di{constructor(e=new X,t=new X,r=new X){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,o){o.subVectors(r,t),ui.subVectors(e,t),o.cross(ui);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,r,o,l){ui.subVectors(o,t),zi.subVectors(r,t),Gu.subVectors(e,t);const d=ui.dot(ui),h=ui.dot(zi),f=ui.dot(Gu),m=zi.dot(zi),v=zi.dot(Gu),_=d*m-h*h;if(_===0)return l.set(0,0,0),null;const y=1/_,M=(m*f-h*v)*y,b=(d*v-h*f)*y;return l.set(1-M-b,b,M)}static containsPoint(e,t,r,o){return this.getBarycoord(e,t,r,o,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,t,r,o,l,d,h,f){return this.getBarycoord(e,t,r,o,Bi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Bi.x),f.addScaledVector(d,Bi.y),f.addScaledVector(h,Bi.z),f)}static getInterpolatedAttribute(e,t,r,o,l,d){return qu.setScalar(0),Yu.setScalar(0),Ku.setScalar(0),qu.fromBufferAttribute(e,t),Yu.fromBufferAttribute(e,r),Ku.fromBufferAttribute(e,o),d.setScalar(0),d.addScaledVector(qu,l.x),d.addScaledVector(Yu,l.y),d.addScaledVector(Ku,l.z),d}static isFrontFacing(e,t,r,o){return ui.subVectors(r,t),zi.subVectors(e,t),ui.cross(zi).dot(o)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,o){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,r,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),ui.cross(zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,o,l){return di.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}containsPoint(e){return di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,o=this.b,l=this.c;let d,h;Fs.subVectors(o,r),Os.subVectors(l,r),Wu.subVectors(e,r);const f=Fs.dot(Wu),m=Os.dot(Wu);if(f<=0&&m<=0)return t.copy(r);Xu.subVectors(e,o);const v=Fs.dot(Xu),_=Os.dot(Xu);if(v>=0&&_<=v)return t.copy(o);const y=f*_-v*m;if(y<=0&&f>=0&&v<=0)return d=f/(f-v),t.copy(r).addScaledVector(Fs,d);$u.subVectors(e,l);const M=Fs.dot($u),b=Os.dot($u);if(b>=0&&M<=b)return t.copy(l);const T=M*m-f*b;if(T<=0&&m>=0&&b<=0)return h=m/(m-b),t.copy(r).addScaledVector(Os,h);const S=v*b-M*_;if(S<=0&&_-v>=0&&M-b>=0)return Sm.subVectors(l,o),h=(_-v)/(_-v+(M-b)),t.copy(o).addScaledVector(Sm,h);const x=1/(S+T+y);return d=T*x,h=y*x,t.copy(r).addScaledVector(Fs,d).addScaledVector(Os,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ax={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},vl={h:0,s:0,l:0};function Ju(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class yt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ei){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.toWorkingColorSpace(this,t),this}setRGB(e,t,r,o=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=r,Tt.toWorkingColorSpace(this,o),this}setHSL(e,t,r,o=Tt.workingColorSpace){if(e=Z_(e,1),t=xt(t,0,1),r=xt(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,d=2*r-l;this.r=Ju(d,l,e+1/3),this.g=Ju(d,l,e),this.b=Ju(d,l,e-1/3)}return Tt.toWorkingColorSpace(this,o),this}setStyle(e,t=ei){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const d=o[1],h=o[2];switch(d){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],d=l.length;if(d===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(d===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ei){const r=Ax[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ei){return Tt.fromWorkingColorSpace(gn.copy(this),e),Math.round(xt(gn.r*255,0,255))*65536+Math.round(xt(gn.g*255,0,255))*256+Math.round(xt(gn.b*255,0,255))}getHexString(e=ei){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.fromWorkingColorSpace(gn.copy(this),t);const r=gn.r,o=gn.g,l=gn.b,d=Math.max(r,o,l),h=Math.min(r,o,l);let f,m;const v=(h+d)/2;if(h===d)f=0,m=0;else{const _=d-h;switch(m=v<=.5?_/(d+h):_/(2-d-h),d){case r:f=(o-l)/_+(o<l?6:0);break;case o:f=(l-r)/_+2;break;case l:f=(r-o)/_+4;break}f/=6}return e.h=f,e.s=m,e.l=v,e}getRGB(e,t=Tt.workingColorSpace){return Tt.fromWorkingColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=ei){Tt.fromWorkingColorSpace(gn.copy(this),e);const t=gn.r,r=gn.g,o=gn.b;return e!==ei?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,t,r){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(vl);const r=Iu(yr.h,vl.h,t),o=Iu(yr.s,vl.s,t),l=Iu(yr.l,vl.l,t);return this.setHSL(r,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*o,this.g=l[1]*t+l[4]*r+l[7]*o,this.b=l[2]*t+l[5]*r+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new yt;yt.NAMES=Ax;let gy=0;class Qa extends ia{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gy++}),this.uuid=Ka(),this.name="",this.type="Material",this.blending=Gs,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=md,this.blendDst=xd,this.blendEquation=Jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=om,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ns,this.stencilZFail=Ns,this.stencilZPass=Ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(r.blending=this.blending),this.side!==Er&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==md&&(r.blendSrc=this.blendSrc),this.blendDst!==xd&&(r.blendDst=this.blendDst),this.blendEquation!==Jr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==om&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ns&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Ns&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Ns&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(l){const d=[];for(const h in l){const f=l[h];delete f.metadata,d.push(f)}return d}if(t){const l=o(e.textures),d=o(e.images);l.length>0&&(r.textures=l),d.length>0&&(r.images=d)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const o=t.length;r=new Array(o);for(let l=0;l!==o;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Cx extends Qa{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=cx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const qt=new X,_l=new Qe;let vy=0;class Mi{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=lm,this.updateRanges=[],this.gpuType=Hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)_l.fromBufferAttribute(this,t),_l.applyMatrix3(e),this.setXY(t,_l.x,_l.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Fa(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=In(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Fa(t,this.array)),t}setX(e,t){return this.normalized&&(t=In(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Fa(t,this.array)),t}setY(e,t){return this.normalized&&(t=In(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Fa(t,this.array)),t}setZ(e,t){return this.normalized&&(t=In(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Fa(t,this.array)),t}setW(e,t){return this.normalized&&(t=In(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=In(t,this.array),r=In(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,o){return e*=this.itemSize,this.normalized&&(t=In(t,this.array),r=In(r,this.array),o=In(o,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,t,r,o,l){return e*=this.itemSize,this.normalized&&(t=In(t,this.array),r=In(r,this.array),o=In(o,this.array),l=In(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==lm&&(e.usage=this.usage),e}}class Nx extends Mi{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Rx extends Mi{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class yn extends Mi{constructor(e,t,r){super(new Float32Array(e),t,r)}}let _y=0;const Qn=new Bt,Zu=new _n,zs=new X,Gn=new Za,ja=new Za,an=new X;class wi extends ia{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_y++}),this.uuid=Ka(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wx(e)?Rx:Nx)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new ct().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qn.makeRotationFromQuaternion(e),this.applyMatrix4(Qn),this}rotateX(e){return Qn.makeRotationX(e),this.applyMatrix4(Qn),this}rotateY(e){return Qn.makeRotationY(e),this.applyMatrix4(Qn),this}rotateZ(e){return Qn.makeRotationZ(e),this.applyMatrix4(Qn),this}translate(e,t,r){return Qn.makeTranslation(e,t,r),this.applyMatrix4(Qn),this}scale(e,t,r){return Qn.makeScale(e,t,r),this.applyMatrix4(Qn),this}lookAt(e){return Zu.lookAt(e),Zu.updateMatrix(),this.applyMatrix4(Zu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zs).negate(),this.translate(zs.x,zs.y,zs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let o=0,l=e.length;o<l;o++){const d=e[o];r.push(d.x,d.y,d.z||0)}this.setAttribute("position",new yn(r,3))}else{const r=Math.min(e.length,t.count);for(let o=0;o<r;o++){const l=e[o];t.setXYZ(o,l.x,l.y,l.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Za);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const l=t[r];Gn.setFromBufferAttribute(l),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,Gn.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,Gn.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(Gn.min),this.boundingBox.expandByPoint(Gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vh);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const r=this.boundingSphere.center;if(Gn.setFromBufferAttribute(e),t)for(let l=0,d=t.length;l<d;l++){const h=t[l];ja.setFromBufferAttribute(h),this.morphTargetsRelative?(an.addVectors(Gn.min,ja.min),Gn.expandByPoint(an),an.addVectors(Gn.max,ja.max),Gn.expandByPoint(an)):(Gn.expandByPoint(ja.min),Gn.expandByPoint(ja.max))}Gn.getCenter(r);let o=0;for(let l=0,d=e.count;l<d;l++)an.fromBufferAttribute(e,l),o=Math.max(o,r.distanceToSquared(an));if(t)for(let l=0,d=t.length;l<d;l++){const h=t[l],f=this.morphTargetsRelative;for(let m=0,v=h.count;m<v;m++)an.fromBufferAttribute(h,m),f&&(zs.fromBufferAttribute(e,m),an.add(zs)),o=Math.max(o,r.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,o=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mi(new Float32Array(4*r.count),4));const d=this.getAttribute("tangent"),h=[],f=[];for(let B=0;B<r.count;B++)h[B]=new X,f[B]=new X;const m=new X,v=new X,_=new X,y=new Qe,M=new Qe,b=new Qe,T=new X,S=new X;function x(B,L,N){m.fromBufferAttribute(r,B),v.fromBufferAttribute(r,L),_.fromBufferAttribute(r,N),y.fromBufferAttribute(l,B),M.fromBufferAttribute(l,L),b.fromBufferAttribute(l,N),v.sub(m),_.sub(m),M.sub(y),b.sub(y);const j=1/(M.x*b.y-b.x*M.y);isFinite(j)&&(T.copy(v).multiplyScalar(b.y).addScaledVector(_,-M.y).multiplyScalar(j),S.copy(_).multiplyScalar(M.x).addScaledVector(v,-b.x).multiplyScalar(j),h[B].add(T),h[L].add(T),h[N].add(T),f[B].add(S),f[L].add(S),f[N].add(S))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let B=0,L=I.length;B<L;++B){const N=I[B],j=N.start,ee=N.count;for(let J=j,ce=j+ee;J<ce;J+=3)x(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const C=new X,w=new X,D=new X,P=new X;function U(B){D.fromBufferAttribute(o,B),P.copy(D);const L=h[B];C.copy(L),C.sub(D.multiplyScalar(D.dot(L))).normalize(),w.crossVectors(P,L);const j=w.dot(f[B])<0?-1:1;d.setXYZW(B,C.x,C.y,C.z,j)}for(let B=0,L=I.length;B<L;++B){const N=I[B],j=N.start,ee=N.count;for(let J=j,ce=j+ee;J<ce;J+=3)U(e.getX(J+0)),U(e.getX(J+1)),U(e.getX(J+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Mi(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let y=0,M=r.count;y<M;y++)r.setXYZ(y,0,0,0);const o=new X,l=new X,d=new X,h=new X,f=new X,m=new X,v=new X,_=new X;if(e)for(let y=0,M=e.count;y<M;y+=3){const b=e.getX(y+0),T=e.getX(y+1),S=e.getX(y+2);o.fromBufferAttribute(t,b),l.fromBufferAttribute(t,T),d.fromBufferAttribute(t,S),v.subVectors(d,l),_.subVectors(o,l),v.cross(_),h.fromBufferAttribute(r,b),f.fromBufferAttribute(r,T),m.fromBufferAttribute(r,S),h.add(v),f.add(v),m.add(v),r.setXYZ(b,h.x,h.y,h.z),r.setXYZ(T,f.x,f.y,f.z),r.setXYZ(S,m.x,m.y,m.z)}else for(let y=0,M=t.count;y<M;y+=3)o.fromBufferAttribute(t,y+0),l.fromBufferAttribute(t,y+1),d.fromBufferAttribute(t,y+2),v.subVectors(d,l),_.subVectors(o,l),v.cross(_),r.setXYZ(y+0,v.x,v.y,v.z),r.setXYZ(y+1,v.x,v.y,v.z),r.setXYZ(y+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)an.fromBufferAttribute(e,t),an.normalize(),e.setXYZ(t,an.x,an.y,an.z)}toNonIndexed(){function e(h,f){const m=h.array,v=h.itemSize,_=h.normalized,y=new m.constructor(f.length*v);let M=0,b=0;for(let T=0,S=f.length;T<S;T++){h.isInterleavedBufferAttribute?M=f[T]*h.data.stride+h.offset:M=f[T]*v;for(let x=0;x<v;x++)y[b++]=m[M++]}return new Mi(y,v,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wi,r=this.index.array,o=this.attributes;for(const h in o){const f=o[h],m=e(f,r);t.setAttribute(h,m)}const l=this.morphAttributes;for(const h in l){const f=[],m=l[h];for(let v=0,_=m.length;v<_;v++){const y=m[v],M=e(y,r);f.push(M)}t.morphAttributes[h]=f}t.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let h=0,f=d.length;h<f;h++){const m=d[h];t.addGroup(m.start,m.count,m.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const m in f)f[m]!==void 0&&(e[m]=f[m]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const f in r){const m=r[f];e.data.attributes[f]=m.toJSON(e.data)}const o={};let l=!1;for(const f in this.morphAttributes){const m=this.morphAttributes[f],v=[];for(let _=0,y=m.length;_<y;_++){const M=m[_];v.push(M.toJSON(e.data))}v.length>0&&(o[f]=v,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const o=e.attributes;for(const m in o){const v=o[m];this.setAttribute(m,v.clone(t))}const l=e.morphAttributes;for(const m in l){const v=[],_=l[m];for(let y=0,M=_.length;y<M;y++)v.push(_[y].clone(t));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let m=0,v=d.length;m<v;m++){const _=d[m];this.addGroup(_.start,_.count,_.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mm=new Bt,Gr=new uy,yl=new vh,bm=new X,Sl=new X,Ml=new X,bl=new X,Qu=new X,wl=new X,wm=new X,El=new X;class Xn extends _n{constructor(e=new wi,t=new Cx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const h=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=l}}}}getVertexPosition(e,t){const r=this.geometry,o=r.attributes.position,l=r.morphAttributes.position,d=r.morphTargetsRelative;t.fromBufferAttribute(o,e);const h=this.morphTargetInfluences;if(l&&h){wl.set(0,0,0);for(let f=0,m=l.length;f<m;f++){const v=h[f],_=l[f];v!==0&&(Qu.fromBufferAttribute(_,e),d?wl.addScaledVector(Qu,v):wl.addScaledVector(Qu.sub(t),v))}t.add(wl)}return t}raycast(e,t){const r=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),yl.copy(r.boundingSphere),yl.applyMatrix4(l),Gr.copy(e.ray).recast(e.near),!(yl.containsPoint(Gr.origin)===!1&&(Gr.intersectSphere(yl,bm)===null||Gr.origin.distanceToSquared(bm)>(e.far-e.near)**2))&&(Mm.copy(l).invert(),Gr.copy(e.ray).applyMatrix4(Mm),!(r.boundingBox!==null&&Gr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,Gr)))}_computeIntersections(e,t,r){let o;const l=this.geometry,d=this.material,h=l.index,f=l.attributes.position,m=l.attributes.uv,v=l.attributes.uv1,_=l.attributes.normal,y=l.groups,M=l.drawRange;if(h!==null)if(Array.isArray(d))for(let b=0,T=y.length;b<T;b++){const S=y[b],x=d[S.materialIndex],I=Math.max(S.start,M.start),C=Math.min(h.count,Math.min(S.start+S.count,M.start+M.count));for(let w=I,D=C;w<D;w+=3){const P=h.getX(w),U=h.getX(w+1),B=h.getX(w+2);o=Tl(this,x,e,r,m,v,_,P,U,B),o&&(o.faceIndex=Math.floor(w/3),o.face.materialIndex=S.materialIndex,t.push(o))}}else{const b=Math.max(0,M.start),T=Math.min(h.count,M.start+M.count);for(let S=b,x=T;S<x;S+=3){const I=h.getX(S),C=h.getX(S+1),w=h.getX(S+2);o=Tl(this,d,e,r,m,v,_,I,C,w),o&&(o.faceIndex=Math.floor(S/3),t.push(o))}}else if(f!==void 0)if(Array.isArray(d))for(let b=0,T=y.length;b<T;b++){const S=y[b],x=d[S.materialIndex],I=Math.max(S.start,M.start),C=Math.min(f.count,Math.min(S.start+S.count,M.start+M.count));for(let w=I,D=C;w<D;w+=3){const P=w,U=w+1,B=w+2;o=Tl(this,x,e,r,m,v,_,P,U,B),o&&(o.faceIndex=Math.floor(w/3),o.face.materialIndex=S.materialIndex,t.push(o))}}else{const b=Math.max(0,M.start),T=Math.min(f.count,M.start+M.count);for(let S=b,x=T;S<x;S+=3){const I=S,C=S+1,w=S+2;o=Tl(this,d,e,r,m,v,_,I,C,w),o&&(o.faceIndex=Math.floor(S/3),t.push(o))}}}}function yy(s,e,t,r,o,l,d,h){let f;if(e.side===kn?f=r.intersectTriangle(d,l,o,!0,h):f=r.intersectTriangle(o,l,d,e.side===Er,h),f===null)return null;El.copy(h),El.applyMatrix4(s.matrixWorld);const m=t.ray.origin.distanceTo(El);return m<t.near||m>t.far?null:{distance:m,point:El.clone(),object:s}}function Tl(s,e,t,r,o,l,d,h,f,m){s.getVertexPosition(h,Sl),s.getVertexPosition(f,Ml),s.getVertexPosition(m,bl);const v=yy(s,e,t,r,Sl,Ml,bl,wm);if(v){const _=new X;di.getBarycoord(wm,Sl,Ml,bl,_),o&&(v.uv=di.getInterpolatedAttribute(o,h,f,m,_,new Qe)),l&&(v.uv1=di.getInterpolatedAttribute(l,h,f,m,_,new Qe)),d&&(v.normal=di.getInterpolatedAttribute(d,h,f,m,_,new X),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const y={a:h,b:f,c:m,normal:new X,materialIndex:0};di.getNormal(Sl,Ml,bl,y.normal),v.face=y,v.barycoord=_}return v}class eo extends wi{constructor(e=1,t=1,r=1,o=1,l=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:o,heightSegments:l,depthSegments:d};const h=this;o=Math.floor(o),l=Math.floor(l),d=Math.floor(d);const f=[],m=[],v=[],_=[];let y=0,M=0;b("z","y","x",-1,-1,r,t,e,d,l,0),b("z","y","x",1,-1,r,t,-e,d,l,1),b("x","z","y",1,1,e,r,t,o,d,2),b("x","z","y",1,-1,e,r,-t,o,d,3),b("x","y","z",1,-1,e,t,r,o,l,4),b("x","y","z",-1,-1,e,t,-r,o,l,5),this.setIndex(f),this.setAttribute("position",new yn(m,3)),this.setAttribute("normal",new yn(v,3)),this.setAttribute("uv",new yn(_,2));function b(T,S,x,I,C,w,D,P,U,B,L){const N=w/U,j=D/B,ee=w/2,J=D/2,ce=P/2,Y=U+1,G=B+1;let Z=0,O=0;const oe=new X;for(let de=0;de<G;de++){const z=de*j-J;for(let le=0;le<Y;le++){const Ue=le*N-ee;oe[T]=Ue*I,oe[S]=z*C,oe[x]=ce,m.push(oe.x,oe.y,oe.z),oe[T]=0,oe[S]=0,oe[x]=P>0?1:-1,v.push(oe.x,oe.y,oe.z),_.push(le/U),_.push(1-de/B),Z+=1}}for(let de=0;de<B;de++)for(let z=0;z<U;z++){const le=y+z+Y*de,Ue=y+z+Y*(de+1),re=y+(z+1)+Y*(de+1),pe=y+(z+1)+Y*de;f.push(le,Ue,pe),f.push(Ue,re,pe),O+=6}h.addGroup(M,O,L),M+=O,y+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ta(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const o=s[t][r];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=o.clone():Array.isArray(o)?e[t][r]=o.slice():e[t][r]=o}}return e}function Tn(s){const e={};for(let t=0;t<s.length;t++){const r=ta(s[t]);for(const o in r)e[o]=r[o]}return e}function Sy(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Px(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}const My={clone:ta,merge:Tn};var by=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tr extends Qa{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=by,this.fragmentShader=wy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ta(e.uniforms),this.uniformsGroups=Sy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const d=this.uniforms[o].value;d&&d.isTexture?t.uniforms[o]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?t.uniforms[o]={type:"c",value:d.getHex()}:d&&d.isVector2?t.uniforms[o]={type:"v2",value:d.toArray()}:d&&d.isVector3?t.uniforms[o]={type:"v3",value:d.toArray()}:d&&d.isVector4?t.uniforms[o]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?t.uniforms[o]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?t.uniforms[o]={type:"m4",value:d.toArray()}:t.uniforms[o]={value:d}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Dx extends _n{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=Gi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Sr=new X,Em=new Qe,Tm=new Qe;class Wn extends Dx{constructor(e=50,t=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=eh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Lu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return eh*2*Math.atan(Math.tan(Lu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Sr.x,Sr.y).multiplyScalar(-e/Sr.z),Sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Sr.x,Sr.y).multiplyScalar(-e/Sr.z)}getViewSize(e,t){return this.getViewBounds(e,Em,Tm),t.subVectors(Tm,Em)}setViewOffset(e,t,r,o,l,d){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Lu*.5*this.fov)/this.zoom,r=2*t,o=this.aspect*r,l=-.5*o;const d=this.view;if(this.view!==null&&this.view.enabled){const f=d.fullWidth,m=d.fullHeight;l+=d.offsetX*o/f,t-=d.offsetY*r/m,o*=d.width/f,r*=d.height/m}const h=this.filmOffset;h!==0&&(l+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bs=-90,js=1;class Ey extends _n{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Wn(Bs,js,e,t);o.layers=this.layers,this.add(o);const l=new Wn(Bs,js,e,t);l.layers=this.layers,this.add(l);const d=new Wn(Bs,js,e,t);d.layers=this.layers,this.add(d);const h=new Wn(Bs,js,e,t);h.layers=this.layers,this.add(h);const f=new Wn(Bs,js,e,t);f.layers=this.layers,this.add(f);const m=new Wn(Bs,js,e,t);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,o,l,d,h,f]=t;for(const m of t)this.remove(m);if(e===Gi)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===Bl)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of t)this.add(m),m.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,d,h,f,m,v]=this.children,_=e.getRenderTarget(),y=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const T=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,o),e.render(t,l),e.setRenderTarget(r,1,o),e.render(t,d),e.setRenderTarget(r,2,o),e.render(t,h),e.setRenderTarget(r,3,o),e.render(t,f),e.setRenderTarget(r,4,o),e.render(t,m),r.texture.generateMipmaps=T,e.setRenderTarget(r,5,o),e.render(t,v),e.setRenderTarget(_,y,M),e.xr.enabled=b,r.texture.needsPMREMUpdate=!0}}class Lx extends Fn{constructor(e,t,r,o,l,d,h,f,m,v){e=e!==void 0?e:[],t=t!==void 0?t:Ks,super(e,t,r,o,l,d,h,f,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ty extends ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];this.texture=new Lx(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Si}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new eo(5,5,5),l=new Tr({name:"CubemapFromEquirect",uniforms:ta(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:kn,blending:br});l.uniforms.tEquirect.value=t;const d=new Xn(o,l),h=t.minFilter;return t.minFilter===es&&(t.minFilter=Si),new Ey(1,10,this).update(e,d),t.minFilter=h,d.geometry.dispose(),d.material.dispose(),this}clear(e,t,r,o){const l=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(t,r,o);e.setRenderTarget(l)}}class Ha extends _n{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ay={type:"move"};class ed{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ha,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ha,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ha,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let o=null,l=null,d=null;const h=this._targetRay,f=this._grip,m=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(m&&e.hand){d=!0;for(const T of e.hand.values()){const S=t.getJointPose(T,r),x=this._getHandJoint(m,T);S!==null&&(x.matrix.fromArray(S.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=S.radius),x.visible=S!==null}const v=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],y=v.position.distanceTo(_.position),M=.02,b=.005;m.inputState.pinching&&y>M+b?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&y<=M-b&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));h!==null&&(o=t.getPose(e.targetRaySpace,r),o===null&&l!==null&&(o=l),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(Ay)))}return h!==null&&(h.visible=o!==null),f!==null&&(f.visible=l!==null),m!==null&&(m.visible=d!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Ha;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}class Cy extends _n{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bi,this.environmentIntensity=1,this.environmentRotation=new bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const td=new X,Ny=new X,Ry=new ct;class Yr{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,o){return this.normal.set(e,t,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const o=td.subVectors(r,t).cross(Ny.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(td),o=this.normal.dot(r);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||Ry.getNormalMatrix(e),o=this.coplanarPoint(td).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wr=new vh,Al=new X;class _h{constructor(e=new Yr,t=new Yr,r=new Yr,o=new Yr,l=new Yr,d=new Yr){this.planes=[e,t,r,o,l,d]}set(e,t,r,o,l,d){const h=this.planes;return h[0].copy(e),h[1].copy(t),h[2].copy(r),h[3].copy(o),h[4].copy(l),h[5].copy(d),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Gi){const r=this.planes,o=e.elements,l=o[0],d=o[1],h=o[2],f=o[3],m=o[4],v=o[5],_=o[6],y=o[7],M=o[8],b=o[9],T=o[10],S=o[11],x=o[12],I=o[13],C=o[14],w=o[15];if(r[0].setComponents(f-l,y-m,S-M,w-x).normalize(),r[1].setComponents(f+l,y+m,S+M,w+x).normalize(),r[2].setComponents(f+d,y+v,S+b,w+I).normalize(),r[3].setComponents(f-d,y-v,S-b,w-I).normalize(),r[4].setComponents(f-h,y-_,S-T,w-C).normalize(),t===Gi)r[5].setComponents(f+h,y+_,S+T,w+C).normalize();else if(t===Bl)r[5].setComponents(h,_,T,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wr)}intersectsSprite(e){return Wr.center.set(0,0,0),Wr.radius=.7071067811865476,Wr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wr)}intersectsSphere(e){const t=this.planes,r=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const o=t[r];if(Al.x=o.normal.x>0?e.max.x:e.min.x,Al.y=o.normal.y>0?e.max.y:e.min.y,Al.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Al)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ix extends Fn{constructor(e,t,r,o,l,d,h,f,m,v=Ws){if(v!==Ws&&v!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&v===Ws&&(r=ts),r===void 0&&v===Qs&&(r=Zs),super(null,o,l,d,h,f,v,r,m),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=h!==void 0?h:fi,this.minFilter=f!==void 0?f:fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new gh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class $i{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const r=this.getUtoTmapping(e);return this.getPoint(r,t)}getPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return t}getSpacedPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let r,o=this.getPoint(0),l=0;t.push(0);for(let d=1;d<=e;d++)r=this.getPoint(d/e),l+=r.distanceTo(o),t.push(l),o=r;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const r=this.getLengths();let o=0;const l=r.length;let d;t?d=t:d=e*r[l-1];let h=0,f=l-1,m;for(;h<=f;)if(o=Math.floor(h+(f-h)/2),m=r[o]-d,m<0)h=o+1;else if(m>0)f=o-1;else{f=o;break}if(o=f,r[o]===d)return o/(l-1);const v=r[o],y=r[o+1]-v,M=(d-v)/y;return(o+M)/(l-1)}getTangent(e,t){let o=e-1e-4,l=e+1e-4;o<0&&(o=0),l>1&&(l=1);const d=this.getPoint(o),h=this.getPoint(l),f=t||(d.isVector2?new Qe:new X);return f.copy(h).sub(d).normalize(),f}getTangentAt(e,t){const r=this.getUtoTmapping(e);return this.getTangent(r,t)}computeFrenetFrames(e,t=!1){const r=new X,o=[],l=[],d=[],h=new X,f=new Bt;for(let M=0;M<=e;M++){const b=M/e;o[M]=this.getTangentAt(b,new X)}l[0]=new X,d[0]=new X;let m=Number.MAX_VALUE;const v=Math.abs(o[0].x),_=Math.abs(o[0].y),y=Math.abs(o[0].z);v<=m&&(m=v,r.set(1,0,0)),_<=m&&(m=_,r.set(0,1,0)),y<=m&&r.set(0,0,1),h.crossVectors(o[0],r).normalize(),l[0].crossVectors(o[0],h),d[0].crossVectors(o[0],l[0]);for(let M=1;M<=e;M++){if(l[M]=l[M-1].clone(),d[M]=d[M-1].clone(),h.crossVectors(o[M-1],o[M]),h.length()>Number.EPSILON){h.normalize();const b=Math.acos(xt(o[M-1].dot(o[M]),-1,1));l[M].applyMatrix4(f.makeRotationAxis(h,b))}d[M].crossVectors(o[M],l[M])}if(t===!0){let M=Math.acos(xt(l[0].dot(l[e]),-1,1));M/=e,o[0].dot(h.crossVectors(l[0],l[e]))>0&&(M=-M);for(let b=1;b<=e;b++)l[b].applyMatrix4(f.makeRotationAxis(o[b],M*b)),d[b].crossVectors(o[b],l[b])}return{tangents:o,normals:l,binormals:d}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ux extends $i{constructor(e=0,t=0,r=1,o=1,l=0,d=Math.PI*2,h=!1,f=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=r,this.yRadius=o,this.aStartAngle=l,this.aEndAngle=d,this.aClockwise=h,this.aRotation=f}getPoint(e,t=new Qe){const r=t,o=Math.PI*2;let l=this.aEndAngle-this.aStartAngle;const d=Math.abs(l)<Number.EPSILON;for(;l<0;)l+=o;for(;l>o;)l-=o;l<Number.EPSILON&&(d?l=0:l=o),this.aClockwise===!0&&!d&&(l===o?l=-o:l=l-o);const h=this.aStartAngle+e*l;let f=this.aX+this.xRadius*Math.cos(h),m=this.aY+this.yRadius*Math.sin(h);if(this.aRotation!==0){const v=Math.cos(this.aRotation),_=Math.sin(this.aRotation),y=f-this.aX,M=m-this.aY;f=y*v-M*_+this.aX,m=y*_+M*v+this.aY}return r.set(f,m)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Py extends Ux{constructor(e,t,r,o,l,d){super(e,t,r,r,o,l,d),this.isArcCurve=!0,this.type="ArcCurve"}}function yh(){let s=0,e=0,t=0,r=0;function o(l,d,h,f){s=l,e=h,t=-3*l+3*d-2*h-f,r=2*l-2*d+h+f}return{initCatmullRom:function(l,d,h,f,m){o(d,h,m*(h-l),m*(f-d))},initNonuniformCatmullRom:function(l,d,h,f,m,v,_){let y=(d-l)/m-(h-l)/(m+v)+(h-d)/v,M=(h-d)/v-(f-d)/(v+_)+(f-h)/_;y*=v,M*=v,o(d,h,y,M)},calc:function(l){const d=l*l,h=d*l;return s+e*l+t*d+r*h}}}const Cl=new X,nd=new yh,id=new yh,rd=new yh;class kx extends $i{constructor(e=[],t=!1,r="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=r,this.tension=o}getPoint(e,t=new X){const r=t,o=this.points,l=o.length,d=(l-(this.closed?0:1))*e;let h=Math.floor(d),f=d-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/l)+1)*l:f===0&&h===l-1&&(h=l-2,f=1);let m,v;this.closed||h>0?m=o[(h-1)%l]:(Cl.subVectors(o[0],o[1]).add(o[0]),m=Cl);const _=o[h%l],y=o[(h+1)%l];if(this.closed||h+2<l?v=o[(h+2)%l]:(Cl.subVectors(o[l-1],o[l-2]).add(o[l-1]),v=Cl),this.curveType==="centripetal"||this.curveType==="chordal"){const M=this.curveType==="chordal"?.5:.25;let b=Math.pow(m.distanceToSquared(_),M),T=Math.pow(_.distanceToSquared(y),M),S=Math.pow(y.distanceToSquared(v),M);T<1e-4&&(T=1),b<1e-4&&(b=T),S<1e-4&&(S=T),nd.initNonuniformCatmullRom(m.x,_.x,y.x,v.x,b,T,S),id.initNonuniformCatmullRom(m.y,_.y,y.y,v.y,b,T,S),rd.initNonuniformCatmullRom(m.z,_.z,y.z,v.z,b,T,S)}else this.curveType==="catmullrom"&&(nd.initCatmullRom(m.x,_.x,y.x,v.x,this.tension),id.initCatmullRom(m.y,_.y,y.y,v.y,this.tension),rd.initCatmullRom(m.z,_.z,y.z,v.z,this.tension));return r.set(nd.calc(f),id.calc(f),rd.calc(f)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(o.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const o=this.points[t];e.points.push(o.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(new X().fromArray(o))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Am(s,e,t,r,o){const l=(r-e)*.5,d=(o-t)*.5,h=s*s,f=s*h;return(2*t-2*r+l+d)*f+(-3*t+3*r-2*l-d)*h+l*s+t}function Dy(s,e){const t=1-s;return t*t*e}function Ly(s,e){return 2*(1-s)*s*e}function Iy(s,e){return s*s*e}function Wa(s,e,t,r){return Dy(s,e)+Ly(s,t)+Iy(s,r)}function Uy(s,e){const t=1-s;return t*t*t*e}function ky(s,e){const t=1-s;return 3*t*t*s*e}function Fy(s,e){return 3*(1-s)*s*s*e}function Oy(s,e){return s*s*s*e}function Xa(s,e,t,r,o){return Uy(s,e)+ky(s,t)+Fy(s,r)+Oy(s,o)}class zy extends $i{constructor(e=new Qe,t=new Qe,r=new Qe,o=new Qe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=r,this.v3=o}getPoint(e,t=new Qe){const r=t,o=this.v0,l=this.v1,d=this.v2,h=this.v3;return r.set(Xa(e,o.x,l.x,d.x,h.x),Xa(e,o.y,l.y,d.y,h.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class By extends $i{constructor(e=new X,t=new X,r=new X,o=new X){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=r,this.v3=o}getPoint(e,t=new X){const r=t,o=this.v0,l=this.v1,d=this.v2,h=this.v3;return r.set(Xa(e,o.x,l.x,d.x,h.x),Xa(e,o.y,l.y,d.y,h.y),Xa(e,o.z,l.z,d.z,h.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class jy extends $i{constructor(e=new Qe,t=new Qe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Qe){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Qe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vy extends $i{constructor(e=new X,t=new X){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new X){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new X){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hy extends $i{constructor(e=new Qe,t=new Qe,r=new Qe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new Qe){const r=t,o=this.v0,l=this.v1,d=this.v2;return r.set(Wa(e,o.x,l.x,d.x),Wa(e,o.y,l.y,d.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fx extends $i{constructor(e=new X,t=new X,r=new X){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new X){const r=t,o=this.v0,l=this.v1,d=this.v2;return r.set(Wa(e,o.x,l.x,d.x),Wa(e,o.y,l.y,d.y),Wa(e,o.z,l.z,d.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gy extends $i{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Qe){const r=t,o=this.points,l=(o.length-1)*e,d=Math.floor(l),h=l-d,f=o[d===0?d:d-1],m=o[d],v=o[d>o.length-2?o.length-1:d+1],_=o[d>o.length-3?o.length-1:d+2];return r.set(Am(h,f.x,m.x,v.x,_.x),Am(h,f.y,m.y,v.y,_.y)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const o=this.points[t];e.points.push(o.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(new Qe().fromArray(o))}return this}}var Wy=Object.freeze({__proto__:null,ArcCurve:Py,CatmullRomCurve3:kx,CubicBezierCurve:zy,CubicBezierCurve3:By,EllipseCurve:Ux,LineCurve:jy,LineCurve3:Vy,QuadraticBezierCurve:Hy,QuadraticBezierCurve3:Fx,SplineCurve:Gy});class Vl extends wi{constructor(e=1,t=1,r=1,o=32,l=1,d=!1,h=0,f=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:o,heightSegments:l,openEnded:d,thetaStart:h,thetaLength:f};const m=this;o=Math.floor(o),l=Math.floor(l);const v=[],_=[],y=[],M=[];let b=0;const T=[],S=r/2;let x=0;I(),d===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(v),this.setAttribute("position",new yn(_,3)),this.setAttribute("normal",new yn(y,3)),this.setAttribute("uv",new yn(M,2));function I(){const w=new X,D=new X;let P=0;const U=(t-e)/r;for(let B=0;B<=l;B++){const L=[],N=B/l,j=N*(t-e)+e;for(let ee=0;ee<=o;ee++){const J=ee/o,ce=J*f+h,Y=Math.sin(ce),G=Math.cos(ce);D.x=j*Y,D.y=-N*r+S,D.z=j*G,_.push(D.x,D.y,D.z),w.set(Y,U,G).normalize(),y.push(w.x,w.y,w.z),M.push(J,1-N),L.push(b++)}T.push(L)}for(let B=0;B<o;B++)for(let L=0;L<l;L++){const N=T[L][B],j=T[L+1][B],ee=T[L+1][B+1],J=T[L][B+1];(e>0||L!==0)&&(v.push(N,j,J),P+=3),(t>0||L!==l-1)&&(v.push(j,ee,J),P+=3)}m.addGroup(x,P,0),x+=P}function C(w){const D=b,P=new Qe,U=new X;let B=0;const L=w===!0?e:t,N=w===!0?1:-1;for(let ee=1;ee<=o;ee++)_.push(0,S*N,0),y.push(0,N,0),M.push(.5,.5),b++;const j=b;for(let ee=0;ee<=o;ee++){const ce=ee/o*f+h,Y=Math.cos(ce),G=Math.sin(ce);U.x=L*G,U.y=S*N,U.z=L*Y,_.push(U.x,U.y,U.z),y.push(0,N,0),P.x=Y*.5+.5,P.y=G*.5*N+.5,M.push(P.x,P.y),b++}for(let ee=0;ee<o;ee++){const J=D+ee,ce=j+ee;w===!0?v.push(ce,ce+1,J):v.push(ce+1,ce,J),B+=3}m.addGroup(x,B,w===!0?1:2),x+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $l extends wi{constructor(e=1,t=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:o};const l=e/2,d=t/2,h=Math.floor(r),f=Math.floor(o),m=h+1,v=f+1,_=e/h,y=t/f,M=[],b=[],T=[],S=[];for(let x=0;x<v;x++){const I=x*y-d;for(let C=0;C<m;C++){const w=C*_-l;b.push(w,-I,0),T.push(0,0,1),S.push(C/h),S.push(1-x/f)}}for(let x=0;x<f;x++)for(let I=0;I<h;I++){const C=I+m*x,w=I+m*(x+1),D=I+1+m*(x+1),P=I+1+m*x;M.push(C,w,P),M.push(w,D,P)}this.setIndex(M),this.setAttribute("position",new yn(b,3)),this.setAttribute("normal",new yn(T,3)),this.setAttribute("uv",new yn(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.width,e.height,e.widthSegments,e.heightSegments)}}class Sh extends wi{constructor(e=1,t=32,r=16,o=0,l=Math.PI*2,d=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:o,phiLength:l,thetaStart:d,thetaLength:h},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const f=Math.min(d+h,Math.PI);let m=0;const v=[],_=new X,y=new X,M=[],b=[],T=[],S=[];for(let x=0;x<=r;x++){const I=[],C=x/r;let w=0;x===0&&d===0?w=.5/t:x===r&&f===Math.PI&&(w=-.5/t);for(let D=0;D<=t;D++){const P=D/t;_.x=-e*Math.cos(o+P*l)*Math.sin(d+C*h),_.y=e*Math.cos(d+C*h),_.z=e*Math.sin(o+P*l)*Math.sin(d+C*h),b.push(_.x,_.y,_.z),y.copy(_).normalize(),T.push(y.x,y.y,y.z),S.push(P+w,1-C),I.push(m++)}v.push(I)}for(let x=0;x<r;x++)for(let I=0;I<t;I++){const C=v[x][I+1],w=v[x][I],D=v[x+1][I],P=v[x+1][I+1];(x!==0||d>0)&&M.push(C,w,P),(x!==r-1||f<Math.PI)&&M.push(w,D,P)}this.setIndex(M),this.setAttribute("position",new yn(b,3)),this.setAttribute("normal",new yn(T,3)),this.setAttribute("uv",new yn(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mh extends wi{constructor(e=new Fx(new X(-1,-1,0),new X(-1,1,0),new X(1,1,0)),t=64,r=1,o=8,l=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:r,radialSegments:o,closed:l};const d=e.computeFrenetFrames(t,l);this.tangents=d.tangents,this.normals=d.normals,this.binormals=d.binormals;const h=new X,f=new X,m=new Qe;let v=new X;const _=[],y=[],M=[],b=[];T(),this.setIndex(b),this.setAttribute("position",new yn(_,3)),this.setAttribute("normal",new yn(y,3)),this.setAttribute("uv",new yn(M,2));function T(){for(let C=0;C<t;C++)S(C);S(l===!1?t:0),I(),x()}function S(C){v=e.getPointAt(C/t,v);const w=d.normals[C],D=d.binormals[C];for(let P=0;P<=o;P++){const U=P/o*Math.PI*2,B=Math.sin(U),L=-Math.cos(U);f.x=L*w.x+B*D.x,f.y=L*w.y+B*D.y,f.z=L*w.z+B*D.z,f.normalize(),y.push(f.x,f.y,f.z),h.x=v.x+r*f.x,h.y=v.y+r*f.y,h.z=v.z+r*f.z,_.push(h.x,h.y,h.z)}}function x(){for(let C=1;C<=t;C++)for(let w=1;w<=o;w++){const D=(o+1)*(C-1)+(w-1),P=(o+1)*C+(w-1),U=(o+1)*C+w,B=(o+1)*(C-1)+w;b.push(D,P,B),b.push(P,U,B)}}function I(){for(let C=0;C<=t;C++)for(let w=0;w<=o;w++)m.x=C/t,m.y=w/o,M.push(m.x,m.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Mh(new Wy[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Xy extends Qa{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mx,this.normalScale=new Qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $y extends Xy{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Qe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new yt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new yt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new yt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class qy extends Qa{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=V_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Yy extends Qa{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class bh extends _n{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const sd=new Bt,Cm=new X,Nm=new X;class Ox{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Qe(512,512),this.map=null,this.mapPass=null,this.matrix=new Bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _h,this._frameExtents=new Qe(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;Cm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cm),Nm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Nm),t.updateMatrixWorld(),sd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sd),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(sd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Rm=new Bt,Va=new X,ad=new X;class Ky extends Ox{constructor(){super(new Wn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Qe(4,2),this._viewportCount=6,this._viewports=[new Rt(2,1,1,1),new Rt(0,1,1,1),new Rt(3,1,1,1),new Rt(1,1,1,1),new Rt(3,0,1,1),new Rt(1,0,1,1)],this._cubeDirections=[new X(1,0,0),new X(-1,0,0),new X(0,0,1),new X(0,0,-1),new X(0,1,0),new X(0,-1,0)],this._cubeUps=[new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,0,1),new X(0,0,-1)]}updateMatrices(e,t=0){const r=this.camera,o=this.matrix,l=e.distance||r.far;l!==r.far&&(r.far=l,r.updateProjectionMatrix()),Va.setFromMatrixPosition(e.matrixWorld),r.position.copy(Va),ad.copy(r.position),ad.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(ad),r.updateMatrixWorld(),o.makeTranslation(-Va.x,-Va.y,-Va.z),Rm.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rm)}}class Jy extends bh{constructor(e,t,r=0,o=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=o,this.shadow=new Ky}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class zx extends Dx{constructor(e=-1,t=1,r=1,o=-1,l=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=o,this.near=l,this.far=d,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,o,l,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=r-e,d=r+e,h=o+t,f=o-t;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,d=l+m*this.view.width,h-=v*this.view.offsetY,f=h-v*this.view.height}this.projectionMatrix.makeOrthographic(l,d,h,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Zy extends Ox{constructor(){super(new zx(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Pm extends bh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_n.DEFAULT_UP),this.updateMatrix(),this.target=new _n,this.shadow=new Zy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qy extends bh{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class eS extends Wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class tS{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Dm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Dm();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Dm(){return performance.now()}function Lm(s,e,t,r){const o=nS(r);switch(t){case mx:return s*e;case gx:return s*e;case vx:return s*e*2;case _x:return s*e/o.components*o.byteLength;case ph:return s*e/o.components*o.byteLength;case yx:return s*e*2/o.components*o.byteLength;case mh:return s*e*2/o.components*o.byteLength;case xx:return s*e*3/o.components*o.byteLength;case hi:return s*e*4/o.components*o.byteLength;case xh:return s*e*4/o.components*o.byteLength;case Dl:case Ll:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Il:case Ul:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Nd:case Pd:return Math.max(s,16)*Math.max(e,8)/4;case Cd:case Rd:return Math.max(s,8)*Math.max(e,8)/2;case Dd:case Ld:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Id:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ud:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case kd:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Fd:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Od:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case zd:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case jd:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Vd:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Hd:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Gd:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Wd:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Xd:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case $d:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case qd:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case kl:case Yd:case Kd:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Sx:case Jd:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Zd:case Qd:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nS(s){switch(s){case Xi:case hx:return{byteLength:1,components:1};case qa:case fx:case Ya:return{byteLength:2,components:1};case hh:case fh:return{byteLength:2,components:4};case ts:case dh:case Hi:return{byteLength:4,components:1};case px:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Bx(){let s=null,e=!1,t=null,r=null;function o(l,d){t(l,d),r=s.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(o),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function iS(s){const e=new WeakMap;function t(h,f){const m=h.array,v=h.usage,_=m.byteLength,y=s.createBuffer();s.bindBuffer(f,y),s.bufferData(f,m,v),h.onUploadCallback();let M;if(m instanceof Float32Array)M=s.FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?M=s.HALF_FLOAT:M=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=s.SHORT;else if(m instanceof Uint32Array)M=s.UNSIGNED_INT;else if(m instanceof Int32Array)M=s.INT;else if(m instanceof Int8Array)M=s.BYTE;else if(m instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:y,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:_}}function r(h,f,m){const v=f.array,_=f.updateRanges;if(s.bindBuffer(m,h),_.length===0)s.bufferSubData(m,0,v);else{_.sort((M,b)=>M.start-b.start);let y=0;for(let M=1;M<_.length;M++){const b=_[y],T=_[M];T.start<=b.start+b.count+1?b.count=Math.max(b.count,T.start+T.count-b.start):(++y,_[y]=T)}_.length=y+1;for(let M=0,b=_.length;M<b;M++){const T=_[M];s.bufferSubData(m,T.start*v.BYTES_PER_ELEMENT,v,T.start,T.count)}f.clearUpdateRanges()}f.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function l(h){h.isInterleavedBufferAttribute&&(h=h.data);const f=e.get(h);f&&(s.deleteBuffer(f.buffer),e.delete(h))}function d(h,f){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const v=e.get(h);(!v||v.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,t(h,f));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,h,f),m.version=h.version}}return{get:o,remove:l,update:d}}var rS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,aS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,fS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_S=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,SS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,MS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ES=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,TS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,AS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,CS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,NS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,RS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,PS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,DS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,LS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,IS="gl_FragColor = linearToOutputTexel( gl_FragColor );",US=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,FS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,OS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,VS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,HS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,GS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,WS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,XS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$S=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,KS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,JS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,QS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,e1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,t1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,n1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,i1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,r1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,s1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,a1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,o1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,d1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,h1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,f1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,x1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,g1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,y1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,M1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,b1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,T1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,A1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,C1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,N1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,R1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,P1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,D1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,L1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,U1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,k1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,F1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,O1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,z1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,B1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,j1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,V1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,H1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,W1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,X1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,q1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Y1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,J1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Z1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_M=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,MM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,EM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,AM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,CM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,DM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,UM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ut={alphahash_fragment:rS,alphahash_pars_fragment:sS,alphamap_fragment:aS,alphamap_pars_fragment:oS,alphatest_fragment:lS,alphatest_pars_fragment:cS,aomap_fragment:uS,aomap_pars_fragment:dS,batching_pars_vertex:hS,batching_vertex:fS,begin_vertex:pS,beginnormal_vertex:mS,bsdfs:xS,iridescence_fragment:gS,bumpmap_pars_fragment:vS,clipping_planes_fragment:_S,clipping_planes_pars_fragment:yS,clipping_planes_pars_vertex:SS,clipping_planes_vertex:MS,color_fragment:bS,color_pars_fragment:wS,color_pars_vertex:ES,color_vertex:TS,common:AS,cube_uv_reflection_fragment:CS,defaultnormal_vertex:NS,displacementmap_pars_vertex:RS,displacementmap_vertex:PS,emissivemap_fragment:DS,emissivemap_pars_fragment:LS,colorspace_fragment:IS,colorspace_pars_fragment:US,envmap_fragment:kS,envmap_common_pars_fragment:FS,envmap_pars_fragment:OS,envmap_pars_vertex:zS,envmap_physical_pars_fragment:KS,envmap_vertex:BS,fog_vertex:jS,fog_pars_vertex:VS,fog_fragment:HS,fog_pars_fragment:GS,gradientmap_pars_fragment:WS,lightmap_pars_fragment:XS,lights_lambert_fragment:$S,lights_lambert_pars_fragment:qS,lights_pars_begin:YS,lights_toon_fragment:JS,lights_toon_pars_fragment:ZS,lights_phong_fragment:QS,lights_phong_pars_fragment:e1,lights_physical_fragment:t1,lights_physical_pars_fragment:n1,lights_fragment_begin:i1,lights_fragment_maps:r1,lights_fragment_end:s1,logdepthbuf_fragment:a1,logdepthbuf_pars_fragment:o1,logdepthbuf_pars_vertex:l1,logdepthbuf_vertex:c1,map_fragment:u1,map_pars_fragment:d1,map_particle_fragment:h1,map_particle_pars_fragment:f1,metalnessmap_fragment:p1,metalnessmap_pars_fragment:m1,morphinstance_vertex:x1,morphcolor_vertex:g1,morphnormal_vertex:v1,morphtarget_pars_vertex:_1,morphtarget_vertex:y1,normal_fragment_begin:S1,normal_fragment_maps:M1,normal_pars_fragment:b1,normal_pars_vertex:w1,normal_vertex:E1,normalmap_pars_fragment:T1,clearcoat_normal_fragment_begin:A1,clearcoat_normal_fragment_maps:C1,clearcoat_pars_fragment:N1,iridescence_pars_fragment:R1,opaque_fragment:P1,packing:D1,premultiplied_alpha_fragment:L1,project_vertex:I1,dithering_fragment:U1,dithering_pars_fragment:k1,roughnessmap_fragment:F1,roughnessmap_pars_fragment:O1,shadowmap_pars_fragment:z1,shadowmap_pars_vertex:B1,shadowmap_vertex:j1,shadowmask_pars_fragment:V1,skinbase_vertex:H1,skinning_pars_vertex:G1,skinning_vertex:W1,skinnormal_vertex:X1,specularmap_fragment:$1,specularmap_pars_fragment:q1,tonemapping_fragment:Y1,tonemapping_pars_fragment:K1,transmission_fragment:J1,transmission_pars_fragment:Z1,uv_pars_fragment:Q1,uv_pars_vertex:eM,uv_vertex:tM,worldpos_vertex:nM,background_vert:iM,background_frag:rM,backgroundCube_vert:sM,backgroundCube_frag:aM,cube_vert:oM,cube_frag:lM,depth_vert:cM,depth_frag:uM,distanceRGBA_vert:dM,distanceRGBA_frag:hM,equirect_vert:fM,equirect_frag:pM,linedashed_vert:mM,linedashed_frag:xM,meshbasic_vert:gM,meshbasic_frag:vM,meshlambert_vert:_M,meshlambert_frag:yM,meshmatcap_vert:SM,meshmatcap_frag:MM,meshnormal_vert:bM,meshnormal_frag:wM,meshphong_vert:EM,meshphong_frag:TM,meshphysical_vert:AM,meshphysical_frag:CM,meshtoon_vert:NM,meshtoon_frag:RM,points_vert:PM,points_frag:DM,shadow_vert:LM,shadow_frag:IM,sprite_vert:UM,sprite_frag:kM},Re={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},yi={basic:{uniforms:Tn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:Tn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new yt(0)}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:Tn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:Tn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:Tn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new yt(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:Tn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:Tn([Re.points,Re.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:Tn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:Tn([Re.common,Re.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:Tn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:Tn([Re.sprite,Re.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distanceRGBA:{uniforms:Tn([Re.common,Re.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distanceRGBA_vert,fragmentShader:ut.distanceRGBA_frag},shadow:{uniforms:Tn([Re.lights,Re.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};yi.physical={uniforms:Tn([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};const Nl={r:0,b:0,g:0},Xr=new bi,FM=new Bt;function OM(s,e,t,r,o,l,d){const h=new yt(0);let f=l===!0?0:1,m,v,_=null,y=0,M=null;function b(C){let w=C.isScene===!0?C.background:null;return w&&w.isTexture&&(w=(C.backgroundBlurriness>0?t:e).get(w)),w}function T(C){let w=!1;const D=b(C);D===null?x(h,f):D&&D.isColor&&(x(D,1),w=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?r.buffers.color.setClear(0,0,0,1,d):P==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,d),(s.autoClear||w)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function S(C,w){const D=b(w);D&&(D.isCubeTexture||D.mapping===Xl)?(v===void 0&&(v=new Xn(new eo(1,1,1),new Tr({name:"BackgroundCubeMaterial",uniforms:ta(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(P,U,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(v)),Xr.copy(w.backgroundRotation),Xr.x*=-1,Xr.y*=-1,Xr.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(Xr.y*=-1,Xr.z*=-1),v.material.uniforms.envMap.value=D,v.material.uniforms.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(FM.makeRotationFromEuler(Xr)),v.material.toneMapped=Tt.getTransfer(D.colorSpace)!==Nt,(_!==D||y!==D.version||M!==s.toneMapping)&&(v.material.needsUpdate=!0,_=D,y=D.version,M=s.toneMapping),v.layers.enableAll(),C.unshift(v,v.geometry,v.material,0,0,null)):D&&D.isTexture&&(m===void 0&&(m=new Xn(new $l(2,2),new Tr({name:"BackgroundMaterial",uniforms:ta(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(m)),m.material.uniforms.t2D.value=D,m.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,m.material.toneMapped=Tt.getTransfer(D.colorSpace)!==Nt,D.matrixAutoUpdate===!0&&D.updateMatrix(),m.material.uniforms.uvTransform.value.copy(D.matrix),(_!==D||y!==D.version||M!==s.toneMapping)&&(m.material.needsUpdate=!0,_=D,y=D.version,M=s.toneMapping),m.layers.enableAll(),C.unshift(m,m.geometry,m.material,0,0,null))}function x(C,w){C.getRGB(Nl,Px(s)),r.buffers.color.setClear(Nl.r,Nl.g,Nl.b,w,d)}function I(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return h},setClearColor:function(C,w=1){h.set(C),f=w,x(h,f)},getClearAlpha:function(){return f},setClearAlpha:function(C){f=C,x(h,f)},render:T,addToRenderList:S,dispose:I}}function zM(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},o=y(null);let l=o,d=!1;function h(N,j,ee,J,ce){let Y=!1;const G=_(J,ee,j);l!==G&&(l=G,m(l.object)),Y=M(N,J,ee,ce),Y&&b(N,J,ee,ce),ce!==null&&e.update(ce,s.ELEMENT_ARRAY_BUFFER),(Y||d)&&(d=!1,w(N,j,ee,J),ce!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(ce).buffer))}function f(){return s.createVertexArray()}function m(N){return s.bindVertexArray(N)}function v(N){return s.deleteVertexArray(N)}function _(N,j,ee){const J=ee.wireframe===!0;let ce=r[N.id];ce===void 0&&(ce={},r[N.id]=ce);let Y=ce[j.id];Y===void 0&&(Y={},ce[j.id]=Y);let G=Y[J];return G===void 0&&(G=y(f()),Y[J]=G),G}function y(N){const j=[],ee=[],J=[];for(let ce=0;ce<t;ce++)j[ce]=0,ee[ce]=0,J[ce]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:j,enabledAttributes:ee,attributeDivisors:J,object:N,attributes:{},index:null}}function M(N,j,ee,J){const ce=l.attributes,Y=j.attributes;let G=0;const Z=ee.getAttributes();for(const O in Z)if(Z[O].location>=0){const de=ce[O];let z=Y[O];if(z===void 0&&(O==="instanceMatrix"&&N.instanceMatrix&&(z=N.instanceMatrix),O==="instanceColor"&&N.instanceColor&&(z=N.instanceColor)),de===void 0||de.attribute!==z||z&&de.data!==z.data)return!0;G++}return l.attributesNum!==G||l.index!==J}function b(N,j,ee,J){const ce={},Y=j.attributes;let G=0;const Z=ee.getAttributes();for(const O in Z)if(Z[O].location>=0){let de=Y[O];de===void 0&&(O==="instanceMatrix"&&N.instanceMatrix&&(de=N.instanceMatrix),O==="instanceColor"&&N.instanceColor&&(de=N.instanceColor));const z={};z.attribute=de,de&&de.data&&(z.data=de.data),ce[O]=z,G++}l.attributes=ce,l.attributesNum=G,l.index=J}function T(){const N=l.newAttributes;for(let j=0,ee=N.length;j<ee;j++)N[j]=0}function S(N){x(N,0)}function x(N,j){const ee=l.newAttributes,J=l.enabledAttributes,ce=l.attributeDivisors;ee[N]=1,J[N]===0&&(s.enableVertexAttribArray(N),J[N]=1),ce[N]!==j&&(s.vertexAttribDivisor(N,j),ce[N]=j)}function I(){const N=l.newAttributes,j=l.enabledAttributes;for(let ee=0,J=j.length;ee<J;ee++)j[ee]!==N[ee]&&(s.disableVertexAttribArray(ee),j[ee]=0)}function C(N,j,ee,J,ce,Y,G){G===!0?s.vertexAttribIPointer(N,j,ee,ce,Y):s.vertexAttribPointer(N,j,ee,J,ce,Y)}function w(N,j,ee,J){T();const ce=J.attributes,Y=ee.getAttributes(),G=j.defaultAttributeValues;for(const Z in Y){const O=Y[Z];if(O.location>=0){let oe=ce[Z];if(oe===void 0&&(Z==="instanceMatrix"&&N.instanceMatrix&&(oe=N.instanceMatrix),Z==="instanceColor"&&N.instanceColor&&(oe=N.instanceColor)),oe!==void 0){const de=oe.normalized,z=oe.itemSize,le=e.get(oe);if(le===void 0)continue;const Ue=le.buffer,re=le.type,pe=le.bytesPerElement,Me=re===s.INT||re===s.UNSIGNED_INT||oe.gpuType===dh;if(oe.isInterleavedBufferAttribute){const _e=oe.data,Te=_e.stride,qe=oe.offset;if(_e.isInstancedInterleavedBuffer){for(let Ge=0;Ge<O.locationSize;Ge++)x(O.location+Ge,_e.meshPerAttribute);N.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let Ge=0;Ge<O.locationSize;Ge++)S(O.location+Ge);s.bindBuffer(s.ARRAY_BUFFER,Ue);for(let Ge=0;Ge<O.locationSize;Ge++)C(O.location+Ge,z/O.locationSize,re,de,Te*pe,(qe+z/O.locationSize*Ge)*pe,Me)}else{if(oe.isInstancedBufferAttribute){for(let _e=0;_e<O.locationSize;_e++)x(O.location+_e,oe.meshPerAttribute);N.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let _e=0;_e<O.locationSize;_e++)S(O.location+_e);s.bindBuffer(s.ARRAY_BUFFER,Ue);for(let _e=0;_e<O.locationSize;_e++)C(O.location+_e,z/O.locationSize,re,de,z*pe,z/O.locationSize*_e*pe,Me)}}else if(G!==void 0){const de=G[Z];if(de!==void 0)switch(de.length){case 2:s.vertexAttrib2fv(O.location,de);break;case 3:s.vertexAttrib3fv(O.location,de);break;case 4:s.vertexAttrib4fv(O.location,de);break;default:s.vertexAttrib1fv(O.location,de)}}}}I()}function D(){B();for(const N in r){const j=r[N];for(const ee in j){const J=j[ee];for(const ce in J)v(J[ce].object),delete J[ce];delete j[ee]}delete r[N]}}function P(N){if(r[N.id]===void 0)return;const j=r[N.id];for(const ee in j){const J=j[ee];for(const ce in J)v(J[ce].object),delete J[ce];delete j[ee]}delete r[N.id]}function U(N){for(const j in r){const ee=r[j];if(ee[N.id]===void 0)continue;const J=ee[N.id];for(const ce in J)v(J[ce].object),delete J[ce];delete ee[N.id]}}function B(){L(),d=!0,l!==o&&(l=o,m(l.object))}function L(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:B,resetDefaultState:L,dispose:D,releaseStatesOfGeometry:P,releaseStatesOfProgram:U,initAttributes:T,enableAttribute:S,disableUnusedAttributes:I}}function BM(s,e,t){let r;function o(m){r=m}function l(m,v){s.drawArrays(r,m,v),t.update(v,r,1)}function d(m,v,_){_!==0&&(s.drawArraysInstanced(r,m,v,_),t.update(v,r,_))}function h(m,v,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,v,0,_);let M=0;for(let b=0;b<_;b++)M+=v[b];t.update(M,r,1)}function f(m,v,_,y){if(_===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let b=0;b<m.length;b++)d(m[b],v[b],y[b]);else{M.multiDrawArraysInstancedWEBGL(r,m,0,v,0,y,0,_);let b=0;for(let T=0;T<_;T++)b+=v[T]*y[T];t.update(b,r,1)}}this.setMode=o,this.render=l,this.renderInstances=d,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function jM(s,e,t,r){let o;function l(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");o=s.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function d(U){return!(U!==hi&&r.convert(U)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(U){const B=U===Ya&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==Xi&&r.convert(U)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Hi&&!B)}function f(U){if(U==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=t.precision!==void 0?t.precision:"highp";const v=f(m);v!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const _=t.logarithmicDepthBuffer===!0,y=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),M=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=s.getParameter(s.MAX_TEXTURE_SIZE),S=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),x=s.getParameter(s.MAX_VERTEX_ATTRIBS),I=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),C=s.getParameter(s.MAX_VARYING_VECTORS),w=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),D=b>0,P=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:f,textureFormatReadable:d,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:y,maxTextures:M,maxVertexTextures:b,maxTextureSize:T,maxCubemapSize:S,maxAttributes:x,maxVertexUniforms:I,maxVaryings:C,maxFragmentUniforms:w,vertexTextures:D,maxSamples:P}}function VM(s){const e=this;let t=null,r=0,o=!1,l=!1;const d=new Yr,h=new ct,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(_,y){const M=_.length!==0||y||r!==0||o;return o=y,r=_.length,M},this.beginShadows=function(){l=!0,v(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(_,y){t=v(_,y,0)},this.setState=function(_,y,M){const b=_.clippingPlanes,T=_.clipIntersection,S=_.clipShadows,x=s.get(_);if(!o||b===null||b.length===0||l&&!S)l?v(null):m();else{const I=l?0:r,C=I*4;let w=x.clippingState||null;f.value=w,w=v(b,y,C,M);for(let D=0;D!==C;++D)w[D]=t[D];x.clippingState=w,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=I}};function m(){f.value!==t&&(f.value=t,f.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(_,y,M,b){const T=_!==null?_.length:0;let S=null;if(T!==0){if(S=f.value,b!==!0||S===null){const x=M+T*4,I=y.matrixWorldInverse;h.getNormalMatrix(I),(S===null||S.length<x)&&(S=new Float32Array(x));for(let C=0,w=M;C!==T;++C,w+=4)d.copy(_[C]).applyMatrix4(I,h),d.normal.toArray(S,w),S[w+3]=d.constant}f.value=S,f.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,S}}function HM(s){let e=new WeakMap;function t(d,h){return h===wd?d.mapping=Ks:h===Ed&&(d.mapping=Js),d}function r(d){if(d&&d.isTexture){const h=d.mapping;if(h===wd||h===Ed)if(e.has(d)){const f=e.get(d).texture;return t(f,d.mapping)}else{const f=d.image;if(f&&f.height>0){const m=new Ty(f.height);return m.fromEquirectangularTexture(s,d),e.set(d,m),d.addEventListener("dispose",o),t(m.texture,d.mapping)}else return null}}return d}function o(d){const h=d.target;h.removeEventListener("dispose",o);const f=e.get(h);f!==void 0&&(e.delete(h),f.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}const Hs=4,Im=[.125,.215,.35,.446,.526,.582],Zr=20,od=new zx,Um=new yt;let ld=null,cd=0,ud=0,dd=!1;const Kr=(1+Math.sqrt(5))/2,Vs=1/Kr,km=[new X(-Kr,Vs,0),new X(Kr,Vs,0),new X(-Vs,0,Kr),new X(Vs,0,Kr),new X(0,Kr,-Vs),new X(0,Kr,Vs),new X(-1,1,-1),new X(1,1,-1),new X(-1,1,1),new X(1,1,1)],GM=new X;class Fm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,o=100,l={}){const{size:d=256,position:h=GM}=l;ld=this._renderer.getRenderTarget(),cd=this._renderer.getActiveCubeFace(),ud=this._renderer.getActiveMipmapLevel(),dd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const f=this._allocateTargets();return f.depthBuffer=!0,this._sceneToCubeUV(e,r,o,f,h),t>0&&this._blur(f,0,0,t),this._applyPMREM(f),this._cleanup(f),f}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ld,cd,ud),this._renderer.xr.enabled=dd,e.scissorTest=!1,Rl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ks||e.mapping===Js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ld=this._renderer.getRenderTarget(),cd=this._renderer.getActiveCubeFace(),ud=this._renderer.getActiveMipmapLevel(),dd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Si,minFilter:Si,generateMipmaps:!1,type:Ya,format:hi,colorSpace:ea,depthBuffer:!1},o=Om(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Om(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=WM(l)),this._blurMaterial=XM(l,e,t)}return o}_compileMaterial(e){const t=new Xn(this._lodPlanes[0],e);this._renderer.compile(t,od)}_sceneToCubeUV(e,t,r,o,l){const f=new Wn(90,1,t,r),m=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,y=_.autoClear,M=_.toneMapping;_.getClearColor(Um),_.toneMapping=wr,_.autoClear=!1;const b=new Cx({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),T=new Xn(new eo,b);let S=!1;const x=e.background;x?x.isColor&&(b.color.copy(x),e.background=null,S=!0):(b.color.copy(Um),S=!0);for(let I=0;I<6;I++){const C=I%3;C===0?(f.up.set(0,m[I],0),f.position.set(l.x,l.y,l.z),f.lookAt(l.x+v[I],l.y,l.z)):C===1?(f.up.set(0,0,m[I]),f.position.set(l.x,l.y,l.z),f.lookAt(l.x,l.y+v[I],l.z)):(f.up.set(0,m[I],0),f.position.set(l.x,l.y,l.z),f.lookAt(l.x,l.y,l.z+v[I]));const w=this._cubeSize;Rl(o,C*w,I>2?w:0,w,w),_.setRenderTarget(o),S&&_.render(T,f),_.render(e,f)}T.geometry.dispose(),T.material.dispose(),_.toneMapping=M,_.autoClear=y,e.background=x}_textureToCubeUV(e,t){const r=this._renderer,o=e.mapping===Ks||e.mapping===Js;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zm());const l=o?this._cubemapMaterial:this._equirectMaterial,d=new Xn(this._lodPlanes[0],l),h=l.uniforms;h.envMap.value=e;const f=this._cubeSize;Rl(t,0,0,3*f,2*f),r.setRenderTarget(t),r.render(d,od)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const o=this._lodPlanes.length;for(let l=1;l<o;l++){const d=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),h=km[(o-l-1)%km.length];this._blur(e,l-1,l,d,h)}t.autoClear=r}_blur(e,t,r,o,l){const d=this._pingPongRenderTarget;this._halfBlur(e,d,t,r,o,"latitudinal",l),this._halfBlur(d,e,r,r,o,"longitudinal",l)}_halfBlur(e,t,r,o,l,d,h){const f=this._renderer,m=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,_=new Xn(this._lodPlanes[o],m),y=m.uniforms,M=this._sizeLods[r]-1,b=isFinite(l)?Math.PI/(2*M):2*Math.PI/(2*Zr-1),T=l/b,S=isFinite(l)?1+Math.floor(v*T):Zr;S>Zr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Zr}`);const x=[];let I=0;for(let U=0;U<Zr;++U){const B=U/T,L=Math.exp(-B*B/2);x.push(L),U===0?I+=L:U<S&&(I+=2*L)}for(let U=0;U<x.length;U++)x[U]=x[U]/I;y.envMap.value=e.texture,y.samples.value=S,y.weights.value=x,y.latitudinal.value=d==="latitudinal",h&&(y.poleAxis.value=h);const{_lodMax:C}=this;y.dTheta.value=b,y.mipInt.value=C-r;const w=this._sizeLods[o],D=3*w*(o>C-Hs?o-C+Hs:0),P=4*(this._cubeSize-w);Rl(t,D,P,3*w,2*w),f.setRenderTarget(t),f.render(_,od)}}function WM(s){const e=[],t=[],r=[];let o=s;const l=s-Hs+1+Im.length;for(let d=0;d<l;d++){const h=Math.pow(2,o);t.push(h);let f=1/h;d>s-Hs?f=Im[d-s+Hs-1]:d===0&&(f=0),r.push(f);const m=1/(h-2),v=-m,_=1+m,y=[v,v,_,v,_,_,v,v,_,_,v,_],M=6,b=6,T=3,S=2,x=1,I=new Float32Array(T*b*M),C=new Float32Array(S*b*M),w=new Float32Array(x*b*M);for(let P=0;P<M;P++){const U=P%3*2/3-1,B=P>2?0:-1,L=[U,B,0,U+2/3,B,0,U+2/3,B+1,0,U,B,0,U+2/3,B+1,0,U,B+1,0];I.set(L,T*b*P),C.set(y,S*b*P);const N=[P,P,P,P,P,P];w.set(N,x*b*P)}const D=new wi;D.setAttribute("position",new Mi(I,T)),D.setAttribute("uv",new Mi(C,S)),D.setAttribute("faceIndex",new Mi(w,x)),e.push(D),o>Hs&&o--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Om(s,e,t){const r=new ns(s,e,t);return r.texture.mapping=Xl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Rl(s,e,t,r,o){s.viewport.set(e,t,r,o),s.scissor.set(e,t,r,o)}function XM(s,e,t){const r=new Float32Array(Zr),o=new X(0,1,0);return new Tr({name:"SphericalGaussianBlur",defines:{n:Zr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:wh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function zm(){return new Tr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function Bm(){return new Tr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function wh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function $M(s){let e=new WeakMap,t=null;function r(h){if(h&&h.isTexture){const f=h.mapping,m=f===wd||f===Ed,v=f===Ks||f===Js;if(m||v){let _=e.get(h);const y=_!==void 0?_.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==y)return t===null&&(t=new Fm(s)),_=m?t.fromEquirectangular(h,_):t.fromCubemap(h,_),_.texture.pmremVersion=h.pmremVersion,e.set(h,_),_.texture;if(_!==void 0)return _.texture;{const M=h.image;return m&&M&&M.height>0||v&&M&&o(M)?(t===null&&(t=new Fm(s)),_=m?t.fromEquirectangular(h):t.fromCubemap(h),_.texture.pmremVersion=h.pmremVersion,e.set(h,_),h.addEventListener("dispose",l),_.texture):null}}}return h}function o(h){let f=0;const m=6;for(let v=0;v<m;v++)h[v]!==void 0&&f++;return f===m}function l(h){const f=h.target;f.removeEventListener("dispose",l);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:d}}function qM(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let o;switch(r){case"WEBGL_depth_texture":o=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=s.getExtension(r)}return e[r]=o,o}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const o=t(r);return o===null&&qr("THREE.WebGLRenderer: "+r+" extension not supported."),o}}}function YM(s,e,t,r){const o={},l=new WeakMap;function d(_){const y=_.target;y.index!==null&&e.remove(y.index);for(const b in y.attributes)e.remove(y.attributes[b]);y.removeEventListener("dispose",d),delete o[y.id];const M=l.get(y);M&&(e.remove(M),l.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,t.memory.geometries--}function h(_,y){return o[y.id]===!0||(y.addEventListener("dispose",d),o[y.id]=!0,t.memory.geometries++),y}function f(_){const y=_.attributes;for(const M in y)e.update(y[M],s.ARRAY_BUFFER)}function m(_){const y=[],M=_.index,b=_.attributes.position;let T=0;if(M!==null){const I=M.array;T=M.version;for(let C=0,w=I.length;C<w;C+=3){const D=I[C+0],P=I[C+1],U=I[C+2];y.push(D,P,P,U,U,D)}}else if(b!==void 0){const I=b.array;T=b.version;for(let C=0,w=I.length/3-1;C<w;C+=3){const D=C+0,P=C+1,U=C+2;y.push(D,P,P,U,U,D)}}else return;const S=new(wx(y)?Rx:Nx)(y,1);S.version=T;const x=l.get(_);x&&e.remove(x),l.set(_,S)}function v(_){const y=l.get(_);if(y){const M=_.index;M!==null&&y.version<M.version&&m(_)}else m(_);return l.get(_)}return{get:h,update:f,getWireframeAttribute:v}}function KM(s,e,t){let r;function o(y){r=y}let l,d;function h(y){l=y.type,d=y.bytesPerElement}function f(y,M){s.drawElements(r,M,l,y*d),t.update(M,r,1)}function m(y,M,b){b!==0&&(s.drawElementsInstanced(r,M,l,y*d,b),t.update(M,r,b))}function v(y,M,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,l,y,0,b);let S=0;for(let x=0;x<b;x++)S+=M[x];t.update(S,r,1)}function _(y,M,b,T){if(b===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let x=0;x<y.length;x++)m(y[x]/d,M[x],T[x]);else{S.multiDrawElementsInstancedWEBGL(r,M,0,l,y,0,T,0,b);let x=0;for(let I=0;I<b;I++)x+=M[I]*T[I];t.update(x,r,1)}}this.setMode=o,this.setIndex=h,this.render=f,this.renderInstances=m,this.renderMultiDraw=v,this.renderMultiDrawInstances=_}function JM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,d,h){switch(t.calls++,d){case s.TRIANGLES:t.triangles+=h*(l/3);break;case s.LINES:t.lines+=h*(l/2);break;case s.LINE_STRIP:t.lines+=h*(l-1);break;case s.LINE_LOOP:t.lines+=h*l;break;case s.POINTS:t.points+=h*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:r}}function ZM(s,e,t){const r=new WeakMap,o=new Rt;function l(d,h,f){const m=d.morphTargetInfluences,v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=v!==void 0?v.length:0;let y=r.get(h);if(y===void 0||y.count!==_){let N=function(){B.dispose(),r.delete(h),h.removeEventListener("dispose",N)};var M=N;y!==void 0&&y.texture.dispose();const b=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,x=h.morphAttributes.position||[],I=h.morphAttributes.normal||[],C=h.morphAttributes.color||[];let w=0;b===!0&&(w=1),T===!0&&(w=2),S===!0&&(w=3);let D=h.attributes.position.count*w,P=1;D>e.maxTextureSize&&(P=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const U=new Float32Array(D*P*4*_),B=new Ex(U,D,P,_);B.type=Hi,B.needsUpdate=!0;const L=w*4;for(let j=0;j<_;j++){const ee=x[j],J=I[j],ce=C[j],Y=D*P*4*j;for(let G=0;G<ee.count;G++){const Z=G*L;b===!0&&(o.fromBufferAttribute(ee,G),U[Y+Z+0]=o.x,U[Y+Z+1]=o.y,U[Y+Z+2]=o.z,U[Y+Z+3]=0),T===!0&&(o.fromBufferAttribute(J,G),U[Y+Z+4]=o.x,U[Y+Z+5]=o.y,U[Y+Z+6]=o.z,U[Y+Z+7]=0),S===!0&&(o.fromBufferAttribute(ce,G),U[Y+Z+8]=o.x,U[Y+Z+9]=o.y,U[Y+Z+10]=o.z,U[Y+Z+11]=ce.itemSize===4?o.w:1)}}y={count:_,texture:B,size:new Qe(D,P)},r.set(h,y),h.addEventListener("dispose",N)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)f.getUniforms().setValue(s,"morphTexture",d.morphTexture,t);else{let b=0;for(let S=0;S<m.length;S++)b+=m[S];const T=h.morphTargetsRelative?1:1-b;f.getUniforms().setValue(s,"morphTargetBaseInfluence",T),f.getUniforms().setValue(s,"morphTargetInfluences",m)}f.getUniforms().setValue(s,"morphTargetsTexture",y.texture,t),f.getUniforms().setValue(s,"morphTargetsTextureSize",y.size)}return{update:l}}function QM(s,e,t,r){let o=new WeakMap;function l(f){const m=r.render.frame,v=f.geometry,_=e.get(f,v);if(o.get(_)!==m&&(e.update(_),o.set(_,m)),f.isInstancedMesh&&(f.hasEventListener("dispose",h)===!1&&f.addEventListener("dispose",h),o.get(f)!==m&&(t.update(f.instanceMatrix,s.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,s.ARRAY_BUFFER),o.set(f,m))),f.isSkinnedMesh){const y=f.skeleton;o.get(y)!==m&&(y.update(),o.set(y,m))}return _}function d(){o=new WeakMap}function h(f){const m=f.target;m.removeEventListener("dispose",h),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:l,dispose:d}}const jx=new Fn,jm=new Ix(1,1),Vx=new Ex,Hx=new ly,Gx=new Lx,Vm=[],Hm=[],Gm=new Float32Array(16),Wm=new Float32Array(9),Xm=new Float32Array(4);function ra(s,e,t){const r=s[0];if(r<=0||r>0)return s;const o=e*t;let l=Vm[o];if(l===void 0&&(l=new Float32Array(o),Vm[o]=l),e!==0){r.toArray(l,0);for(let d=1,h=0;d!==e;++d)h+=t,s[d].toArray(l,h)}return l}function Zt(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function Qt(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function ql(s,e){let t=Hm[e];t===void 0&&(t=new Int32Array(e),Hm[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function eb(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function tb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;s.uniform2fv(this.addr,e),Qt(t,e)}}function nb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;s.uniform3fv(this.addr,e),Qt(t,e)}}function ib(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;s.uniform4fv(this.addr,e),Qt(t,e)}}function rb(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Zt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,r))return;Xm.set(r),s.uniformMatrix2fv(this.addr,!1,Xm),Qt(t,r)}}function sb(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Zt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,r))return;Wm.set(r),s.uniformMatrix3fv(this.addr,!1,Wm),Qt(t,r)}}function ab(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Zt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,r))return;Gm.set(r),s.uniformMatrix4fv(this.addr,!1,Gm),Qt(t,r)}}function ob(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function lb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;s.uniform2iv(this.addr,e),Qt(t,e)}}function cb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;s.uniform3iv(this.addr,e),Qt(t,e)}}function ub(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;s.uniform4iv(this.addr,e),Qt(t,e)}}function db(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function hb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;s.uniform2uiv(this.addr,e),Qt(t,e)}}function fb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;s.uniform3uiv(this.addr,e),Qt(t,e)}}function pb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;s.uniform4uiv(this.addr,e),Qt(t,e)}}function mb(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o);let l;this.type===s.SAMPLER_2D_SHADOW?(jm.compareFunction=bx,l=jm):l=jx,t.setTexture2D(e||l,o)}function xb(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture3D(e||Hx,o)}function gb(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTextureCube(e||Gx,o)}function vb(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture2DArray(e||Vx,o)}function _b(s){switch(s){case 5126:return eb;case 35664:return tb;case 35665:return nb;case 35666:return ib;case 35674:return rb;case 35675:return sb;case 35676:return ab;case 5124:case 35670:return ob;case 35667:case 35671:return lb;case 35668:case 35672:return cb;case 35669:case 35673:return ub;case 5125:return db;case 36294:return hb;case 36295:return fb;case 36296:return pb;case 35678:case 36198:case 36298:case 36306:case 35682:return mb;case 35679:case 36299:case 36307:return xb;case 35680:case 36300:case 36308:case 36293:return gb;case 36289:case 36303:case 36311:case 36292:return vb}}function yb(s,e){s.uniform1fv(this.addr,e)}function Sb(s,e){const t=ra(e,this.size,2);s.uniform2fv(this.addr,t)}function Mb(s,e){const t=ra(e,this.size,3);s.uniform3fv(this.addr,t)}function bb(s,e){const t=ra(e,this.size,4);s.uniform4fv(this.addr,t)}function wb(s,e){const t=ra(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Eb(s,e){const t=ra(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Tb(s,e){const t=ra(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Ab(s,e){s.uniform1iv(this.addr,e)}function Cb(s,e){s.uniform2iv(this.addr,e)}function Nb(s,e){s.uniform3iv(this.addr,e)}function Rb(s,e){s.uniform4iv(this.addr,e)}function Pb(s,e){s.uniform1uiv(this.addr,e)}function Db(s,e){s.uniform2uiv(this.addr,e)}function Lb(s,e){s.uniform3uiv(this.addr,e)}function Ib(s,e){s.uniform4uiv(this.addr,e)}function Ub(s,e,t){const r=this.cache,o=e.length,l=ql(t,o);Zt(r,l)||(s.uniform1iv(this.addr,l),Qt(r,l));for(let d=0;d!==o;++d)t.setTexture2D(e[d]||jx,l[d])}function kb(s,e,t){const r=this.cache,o=e.length,l=ql(t,o);Zt(r,l)||(s.uniform1iv(this.addr,l),Qt(r,l));for(let d=0;d!==o;++d)t.setTexture3D(e[d]||Hx,l[d])}function Fb(s,e,t){const r=this.cache,o=e.length,l=ql(t,o);Zt(r,l)||(s.uniform1iv(this.addr,l),Qt(r,l));for(let d=0;d!==o;++d)t.setTextureCube(e[d]||Gx,l[d])}function Ob(s,e,t){const r=this.cache,o=e.length,l=ql(t,o);Zt(r,l)||(s.uniform1iv(this.addr,l),Qt(r,l));for(let d=0;d!==o;++d)t.setTexture2DArray(e[d]||Vx,l[d])}function zb(s){switch(s){case 5126:return yb;case 35664:return Sb;case 35665:return Mb;case 35666:return bb;case 35674:return wb;case 35675:return Eb;case 35676:return Tb;case 5124:case 35670:return Ab;case 35667:case 35671:return Cb;case 35668:case 35672:return Nb;case 35669:case 35673:return Rb;case 5125:return Pb;case 36294:return Db;case 36295:return Lb;case 36296:return Ib;case 35678:case 36198:case 36298:case 36306:case 35682:return Ub;case 35679:case 36299:case 36307:return kb;case 35680:case 36300:case 36308:case 36293:return Fb;case 36289:case 36303:case 36311:case 36292:return Ob}}class Bb{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=_b(t.type)}}class jb{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zb(t.type)}}class Vb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const o=this.seq;for(let l=0,d=o.length;l!==d;++l){const h=o[l];h.setValue(e,t[h.id],r)}}}const hd=/(\w+)(\])?(\[|\.)?/g;function $m(s,e){s.seq.push(e),s.map[e.id]=e}function Hb(s,e,t){const r=s.name,o=r.length;for(hd.lastIndex=0;;){const l=hd.exec(r),d=hd.lastIndex;let h=l[1];const f=l[2]==="]",m=l[3];if(f&&(h=h|0),m===void 0||m==="["&&d+2===o){$m(t,m===void 0?new Bb(h,s,e):new jb(h,s,e));break}else{let _=t.map[h];_===void 0&&(_=new Vb(h),$m(t,_)),t=_}}}class Fl{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<r;++o){const l=e.getActiveUniform(t,o),d=e.getUniformLocation(t,l.name);Hb(l,d,this)}}setValue(e,t,r,o){const l=this.map[t];l!==void 0&&l.setValue(e,r,o)}setOptional(e,t,r){const o=t[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,t,r,o){for(let l=0,d=t.length;l!==d;++l){const h=t[l],f=r[h.id];f.needsUpdate!==!1&&h.setValue(e,f.value,o)}}static seqWithValue(e,t){const r=[];for(let o=0,l=e.length;o!==l;++o){const d=e[o];d.id in t&&r.push(d)}return r}}function qm(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const Gb=37297;let Wb=0;function Xb(s,e){const t=s.split(`
`),r=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let d=o;d<l;d++){const h=d+1;r.push(`${h===e?">":" "} ${h}: ${t[d]}`)}return r.join(`
`)}const Ym=new ct;function $b(s){Tt._getMatrix(Ym,Tt.workingColorSpace,s);const e=`mat3( ${Ym.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(s)){case zl:return[e,"LinearTransferOETF"];case Nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Km(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),o=s.getShaderInfoLog(e).trim();if(r&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const d=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+Xb(s.getShaderSource(e),d)}else return o}function qb(s,e){const t=$b(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Yb(s,e){let t;switch(e){case U_:t="Linear";break;case k_:t="Reinhard";break;case F_:t="Cineon";break;case ux:t="ACESFilmic";break;case z_:t="AgX";break;case B_:t="Neutral";break;case O_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Pl=new X;function Kb(){Tt.getLuminanceCoefficients(Pl);const s=Pl.x.toFixed(4),e=Pl.y.toFixed(4),t=Pl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ga).join(`
`)}function Zb(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function Qb(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const l=s.getActiveAttrib(e,o),d=l.name;let h=1;l.type===s.FLOAT_MAT2&&(h=2),l.type===s.FLOAT_MAT3&&(h=3),l.type===s.FLOAT_MAT4&&(h=4),t[d]={type:l.type,location:s.getAttribLocation(e,d),locationSize:h}}return t}function Ga(s){return s!==""}function Jm(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ew=/^[ \t]*#include +<([\w\d./]+)>/gm;function th(s){return s.replace(ew,nw)}const tw=new Map;function nw(s,e){let t=ut[e];if(t===void 0){const r=tw.get(e);if(r!==void 0)t=ut[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return th(t)}const iw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qm(s){return s.replace(iw,rw)}function rw(s,e,t,r){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function e0(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function sw(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===lx?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===p_?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ji&&(e="SHADOWMAP_TYPE_VSM"),e}function aw(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ks:case Js:e="ENVMAP_TYPE_CUBE";break;case Xl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ow(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Js:e="ENVMAP_MODE_REFRACTION";break}return e}function lw(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case cx:e="ENVMAP_BLENDING_MULTIPLY";break;case L_:e="ENVMAP_BLENDING_MIX";break;case I_:e="ENVMAP_BLENDING_ADD";break}return e}function cw(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function uw(s,e,t,r){const o=s.getContext(),l=t.defines;let d=t.vertexShader,h=t.fragmentShader;const f=sw(t),m=aw(t),v=ow(t),_=lw(t),y=cw(t),M=Jb(t),b=Zb(l),T=o.createProgram();let S,x,I=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Ga).join(`
`),S.length>0&&(S+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Ga).join(`
`),x.length>0&&(x+=`
`)):(S=[e0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+v:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ga).join(`
`),x=[e0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+v:"",t.envMap?"#define "+_:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wr?"#define TONE_MAPPING":"",t.toneMapping!==wr?ut.tonemapping_pars_fragment:"",t.toneMapping!==wr?Yb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,qb("linearToOutputTexel",t.outputColorSpace),Kb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ga).join(`
`)),d=th(d),d=Jm(d,t),d=Zm(d,t),h=th(h),h=Jm(h,t),h=Zm(h,t),d=Qm(d),h=Qm(h),t.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,x=["#define varying in",t.glslVersion===cm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const C=I+S+d,w=I+x+h,D=qm(o,o.VERTEX_SHADER,C),P=qm(o,o.FRAGMENT_SHADER,w);o.attachShader(T,D),o.attachShader(T,P),t.index0AttributeName!==void 0?o.bindAttribLocation(T,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(T,0,"position"),o.linkProgram(T);function U(j){if(s.debug.checkShaderErrors){const ee=o.getProgramInfoLog(T).trim(),J=o.getShaderInfoLog(D).trim(),ce=o.getShaderInfoLog(P).trim();let Y=!0,G=!0;if(o.getProgramParameter(T,o.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,T,D,P);else{const Z=Km(o,D,"vertex"),O=Km(o,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(T,o.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+ee+`
`+Z+`
`+O)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(J===""||ce==="")&&(G=!1);G&&(j.diagnostics={runnable:Y,programLog:ee,vertexShader:{log:J,prefix:S},fragmentShader:{log:ce,prefix:x}})}o.deleteShader(D),o.deleteShader(P),B=new Fl(o,T),L=Qb(o,T)}let B;this.getUniforms=function(){return B===void 0&&U(this),B};let L;this.getAttributes=function(){return L===void 0&&U(this),L};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=o.getProgramParameter(T,Gb)),N},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wb++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=D,this.fragmentShader=P,this}let dw=0;class hw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(r),d=this._getShaderCacheForMaterial(e);return d.has(o)===!1&&(d.add(o),o.usedTimes++),d.has(l)===!1&&(d.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new fw(e),t.set(e,r)),r}}class fw{constructor(e){this.id=dw++,this.code=e,this.usedTimes=0}}function pw(s,e,t,r,o,l,d){const h=new Tx,f=new hw,m=new Set,v=[],_=o.logarithmicDepthBuffer,y=o.vertexTextures;let M=o.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(L){return m.add(L),L===0?"uv":`uv${L}`}function S(L,N,j,ee,J){const ce=ee.fog,Y=J.geometry,G=L.isMeshStandardMaterial?ee.environment:null,Z=(L.isMeshStandardMaterial?t:e).get(L.envMap||G),O=Z&&Z.mapping===Xl?Z.image.height:null,oe=b[L.type];L.precision!==null&&(M=o.getMaxPrecision(L.precision),M!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",M,"instead."));const de=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,z=de!==void 0?de.length:0;let le=0;Y.morphAttributes.position!==void 0&&(le=1),Y.morphAttributes.normal!==void 0&&(le=2),Y.morphAttributes.color!==void 0&&(le=3);let Ue,re,pe,Me;if(oe){const Mt=yi[oe];Ue=Mt.vertexShader,re=Mt.fragmentShader}else Ue=L.vertexShader,re=L.fragmentShader,f.update(L),pe=f.getVertexShaderID(L),Me=f.getFragmentShaderID(L);const _e=s.getRenderTarget(),Te=s.state.buffers.depth.getReversed(),qe=J.isInstancedMesh===!0,Ge=J.isBatchedMesh===!0,Dt=!!L.map,Lt=!!L.matcap,dt=!!Z,H=!!L.aoMap,Sn=!!L.lightMap,gt=!!L.bumpMap,ft=!!L.normalMap,Ye=!!L.displacementMap,Ct=!!L.emissiveMap,We=!!L.metalnessMap,k=!!L.roughnessMap,A=L.anisotropy>0,ie=L.clearcoat>0,me=L.dispersion>0,ge=L.iridescence>0,he=L.sheen>0,Xe=L.transmission>0,Ae=A&&!!L.anisotropyMap,ke=ie&&!!L.clearcoatMap,ht=ie&&!!L.clearcoatNormalMap,be=ie&&!!L.clearcoatRoughnessMap,Oe=ge&&!!L.iridescenceMap,et=ge&&!!L.iridescenceThicknessMap,nt=he&&!!L.sheenColorMap,ze=he&&!!L.sheenRoughnessMap,pt=!!L.specularMap,st=!!L.specularColorMap,At=!!L.specularIntensityMap,$=Xe&&!!L.transmissionMap,Ce=Xe&&!!L.thicknessMap,ue=!!L.gradientMap,fe=!!L.alphaMap,De=L.alphaTest>0,Pe=!!L.alphaHash,at=!!L.extensions;let Ut=wr;L.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(Ut=s.toneMapping);const Yt={shaderID:oe,shaderType:L.type,shaderName:L.name,vertexShader:Ue,fragmentShader:re,defines:L.defines,customVertexShaderID:pe,customFragmentShaderID:Me,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:M,batching:Ge,batchingColor:Ge&&J._colorsTexture!==null,instancing:qe,instancingColor:qe&&J.instanceColor!==null,instancingMorph:qe&&J.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:_e===null?s.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:ea,alphaToCoverage:!!L.alphaToCoverage,map:Dt,matcap:Lt,envMap:dt,envMapMode:dt&&Z.mapping,envMapCubeUVHeight:O,aoMap:H,lightMap:Sn,bumpMap:gt,normalMap:ft,displacementMap:y&&Ye,emissiveMap:Ct,normalMapObjectSpace:ft&&L.normalMapType===G_,normalMapTangentSpace:ft&&L.normalMapType===Mx,metalnessMap:We,roughnessMap:k,anisotropy:A,anisotropyMap:Ae,clearcoat:ie,clearcoatMap:ke,clearcoatNormalMap:ht,clearcoatRoughnessMap:be,dispersion:me,iridescence:ge,iridescenceMap:Oe,iridescenceThicknessMap:et,sheen:he,sheenColorMap:nt,sheenRoughnessMap:ze,specularMap:pt,specularColorMap:st,specularIntensityMap:At,transmission:Xe,transmissionMap:$,thicknessMap:Ce,gradientMap:ue,opaque:L.transparent===!1&&L.blending===Gs&&L.alphaToCoverage===!1,alphaMap:fe,alphaTest:De,alphaHash:Pe,combine:L.combine,mapUv:Dt&&T(L.map.channel),aoMapUv:H&&T(L.aoMap.channel),lightMapUv:Sn&&T(L.lightMap.channel),bumpMapUv:gt&&T(L.bumpMap.channel),normalMapUv:ft&&T(L.normalMap.channel),displacementMapUv:Ye&&T(L.displacementMap.channel),emissiveMapUv:Ct&&T(L.emissiveMap.channel),metalnessMapUv:We&&T(L.metalnessMap.channel),roughnessMapUv:k&&T(L.roughnessMap.channel),anisotropyMapUv:Ae&&T(L.anisotropyMap.channel),clearcoatMapUv:ke&&T(L.clearcoatMap.channel),clearcoatNormalMapUv:ht&&T(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&T(L.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&T(L.iridescenceMap.channel),iridescenceThicknessMapUv:et&&T(L.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&T(L.sheenColorMap.channel),sheenRoughnessMapUv:ze&&T(L.sheenRoughnessMap.channel),specularMapUv:pt&&T(L.specularMap.channel),specularColorMapUv:st&&T(L.specularColorMap.channel),specularIntensityMapUv:At&&T(L.specularIntensityMap.channel),transmissionMapUv:$&&T(L.transmissionMap.channel),thicknessMapUv:Ce&&T(L.thicknessMap.channel),alphaMapUv:fe&&T(L.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(ft||A),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!Y.attributes.uv&&(Dt||fe),fog:!!ce,useFog:L.fog===!0,fogExp2:!!ce&&ce.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Te,skinning:J.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:z,morphTextureStride:le,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:L.dithering,shadowMapEnabled:s.shadowMap.enabled&&j.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Dt&&L.map.isVideoTexture===!0&&Tt.getTransfer(L.map.colorSpace)===Nt,decodeVideoTextureEmissive:Ct&&L.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(L.emissiveMap.colorSpace)===Nt,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===Vi,flipSided:L.side===kn,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:at&&L.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&L.extensions.multiDraw===!0||Ge)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return Yt.vertexUv1s=m.has(1),Yt.vertexUv2s=m.has(2),Yt.vertexUv3s=m.has(3),m.clear(),Yt}function x(L){const N=[];if(L.shaderID?N.push(L.shaderID):(N.push(L.customVertexShaderID),N.push(L.customFragmentShaderID)),L.defines!==void 0)for(const j in L.defines)N.push(j),N.push(L.defines[j]);return L.isRawShaderMaterial===!1&&(I(N,L),C(N,L),N.push(s.outputColorSpace)),N.push(L.customProgramCacheKey),N.join()}function I(L,N){L.push(N.precision),L.push(N.outputColorSpace),L.push(N.envMapMode),L.push(N.envMapCubeUVHeight),L.push(N.mapUv),L.push(N.alphaMapUv),L.push(N.lightMapUv),L.push(N.aoMapUv),L.push(N.bumpMapUv),L.push(N.normalMapUv),L.push(N.displacementMapUv),L.push(N.emissiveMapUv),L.push(N.metalnessMapUv),L.push(N.roughnessMapUv),L.push(N.anisotropyMapUv),L.push(N.clearcoatMapUv),L.push(N.clearcoatNormalMapUv),L.push(N.clearcoatRoughnessMapUv),L.push(N.iridescenceMapUv),L.push(N.iridescenceThicknessMapUv),L.push(N.sheenColorMapUv),L.push(N.sheenRoughnessMapUv),L.push(N.specularMapUv),L.push(N.specularColorMapUv),L.push(N.specularIntensityMapUv),L.push(N.transmissionMapUv),L.push(N.thicknessMapUv),L.push(N.combine),L.push(N.fogExp2),L.push(N.sizeAttenuation),L.push(N.morphTargetsCount),L.push(N.morphAttributeCount),L.push(N.numDirLights),L.push(N.numPointLights),L.push(N.numSpotLights),L.push(N.numSpotLightMaps),L.push(N.numHemiLights),L.push(N.numRectAreaLights),L.push(N.numDirLightShadows),L.push(N.numPointLightShadows),L.push(N.numSpotLightShadows),L.push(N.numSpotLightShadowsWithMaps),L.push(N.numLightProbes),L.push(N.shadowMapType),L.push(N.toneMapping),L.push(N.numClippingPlanes),L.push(N.numClipIntersection),L.push(N.depthPacking)}function C(L,N){h.disableAll(),N.supportsVertexTextures&&h.enable(0),N.instancing&&h.enable(1),N.instancingColor&&h.enable(2),N.instancingMorph&&h.enable(3),N.matcap&&h.enable(4),N.envMap&&h.enable(5),N.normalMapObjectSpace&&h.enable(6),N.normalMapTangentSpace&&h.enable(7),N.clearcoat&&h.enable(8),N.iridescence&&h.enable(9),N.alphaTest&&h.enable(10),N.vertexColors&&h.enable(11),N.vertexAlphas&&h.enable(12),N.vertexUv1s&&h.enable(13),N.vertexUv2s&&h.enable(14),N.vertexUv3s&&h.enable(15),N.vertexTangents&&h.enable(16),N.anisotropy&&h.enable(17),N.alphaHash&&h.enable(18),N.batching&&h.enable(19),N.dispersion&&h.enable(20),N.batchingColor&&h.enable(21),L.push(h.mask),h.disableAll(),N.fog&&h.enable(0),N.useFog&&h.enable(1),N.flatShading&&h.enable(2),N.logarithmicDepthBuffer&&h.enable(3),N.reverseDepthBuffer&&h.enable(4),N.skinning&&h.enable(5),N.morphTargets&&h.enable(6),N.morphNormals&&h.enable(7),N.morphColors&&h.enable(8),N.premultipliedAlpha&&h.enable(9),N.shadowMapEnabled&&h.enable(10),N.doubleSided&&h.enable(11),N.flipSided&&h.enable(12),N.useDepthPacking&&h.enable(13),N.dithering&&h.enable(14),N.transmission&&h.enable(15),N.sheen&&h.enable(16),N.opaque&&h.enable(17),N.pointsUvs&&h.enable(18),N.decodeVideoTexture&&h.enable(19),N.decodeVideoTextureEmissive&&h.enable(20),N.alphaToCoverage&&h.enable(21),L.push(h.mask)}function w(L){const N=b[L.type];let j;if(N){const ee=yi[N];j=My.clone(ee.uniforms)}else j=L.uniforms;return j}function D(L,N){let j;for(let ee=0,J=v.length;ee<J;ee++){const ce=v[ee];if(ce.cacheKey===N){j=ce,++j.usedTimes;break}}return j===void 0&&(j=new uw(s,N,L,l),v.push(j)),j}function P(L){if(--L.usedTimes===0){const N=v.indexOf(L);v[N]=v[v.length-1],v.pop(),L.destroy()}}function U(L){f.remove(L)}function B(){f.dispose()}return{getParameters:S,getProgramCacheKey:x,getUniforms:w,acquireProgram:D,releaseProgram:P,releaseShaderCache:U,programs:v,dispose:B}}function mw(){let s=new WeakMap;function e(d){return s.has(d)}function t(d){let h=s.get(d);return h===void 0&&(h={},s.set(d,h)),h}function r(d){s.delete(d)}function o(d,h,f){s.get(d)[h]=f}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:o,dispose:l}}function xw(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function t0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function n0(){const s=[];let e=0;const t=[],r=[],o=[];function l(){e=0,t.length=0,r.length=0,o.length=0}function d(_,y,M,b,T,S){let x=s[e];return x===void 0?(x={id:_.id,object:_,geometry:y,material:M,groupOrder:b,renderOrder:_.renderOrder,z:T,group:S},s[e]=x):(x.id=_.id,x.object=_,x.geometry=y,x.material=M,x.groupOrder=b,x.renderOrder=_.renderOrder,x.z=T,x.group=S),e++,x}function h(_,y,M,b,T,S){const x=d(_,y,M,b,T,S);M.transmission>0?r.push(x):M.transparent===!0?o.push(x):t.push(x)}function f(_,y,M,b,T,S){const x=d(_,y,M,b,T,S);M.transmission>0?r.unshift(x):M.transparent===!0?o.unshift(x):t.unshift(x)}function m(_,y){t.length>1&&t.sort(_||xw),r.length>1&&r.sort(y||t0),o.length>1&&o.sort(y||t0)}function v(){for(let _=e,y=s.length;_<y;_++){const M=s[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:r,transparent:o,init:l,push:h,unshift:f,finish:v,sort:m}}function gw(){let s=new WeakMap;function e(r,o){const l=s.get(r);let d;return l===void 0?(d=new n0,s.set(r,[d])):o>=l.length?(d=new n0,l.push(d)):d=l[o],d}function t(){s=new WeakMap}return{get:e,dispose:t}}function vw(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new X,color:new yt};break;case"SpotLight":t={position:new X,direction:new X,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new yt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":t={color:new yt,position:new X,halfWidth:new X,halfHeight:new X};break}return s[e.id]=t,t}}}function _w(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let yw=0;function Sw(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Mw(s){const e=new vw,t=_w(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new X);const o=new X,l=new Bt,d=new Bt;function h(m){let v=0,_=0,y=0;for(let L=0;L<9;L++)r.probe[L].set(0,0,0);let M=0,b=0,T=0,S=0,x=0,I=0,C=0,w=0,D=0,P=0,U=0;m.sort(Sw);for(let L=0,N=m.length;L<N;L++){const j=m[L],ee=j.color,J=j.intensity,ce=j.distance,Y=j.shadow&&j.shadow.map?j.shadow.map.texture:null;if(j.isAmbientLight)v+=ee.r*J,_+=ee.g*J,y+=ee.b*J;else if(j.isLightProbe){for(let G=0;G<9;G++)r.probe[G].addScaledVector(j.sh.coefficients[G],J);U++}else if(j.isDirectionalLight){const G=e.get(j);if(G.color.copy(j.color).multiplyScalar(j.intensity),j.castShadow){const Z=j.shadow,O=t.get(j);O.shadowIntensity=Z.intensity,O.shadowBias=Z.bias,O.shadowNormalBias=Z.normalBias,O.shadowRadius=Z.radius,O.shadowMapSize=Z.mapSize,r.directionalShadow[M]=O,r.directionalShadowMap[M]=Y,r.directionalShadowMatrix[M]=j.shadow.matrix,I++}r.directional[M]=G,M++}else if(j.isSpotLight){const G=e.get(j);G.position.setFromMatrixPosition(j.matrixWorld),G.color.copy(ee).multiplyScalar(J),G.distance=ce,G.coneCos=Math.cos(j.angle),G.penumbraCos=Math.cos(j.angle*(1-j.penumbra)),G.decay=j.decay,r.spot[T]=G;const Z=j.shadow;if(j.map&&(r.spotLightMap[D]=j.map,D++,Z.updateMatrices(j),j.castShadow&&P++),r.spotLightMatrix[T]=Z.matrix,j.castShadow){const O=t.get(j);O.shadowIntensity=Z.intensity,O.shadowBias=Z.bias,O.shadowNormalBias=Z.normalBias,O.shadowRadius=Z.radius,O.shadowMapSize=Z.mapSize,r.spotShadow[T]=O,r.spotShadowMap[T]=Y,w++}T++}else if(j.isRectAreaLight){const G=e.get(j);G.color.copy(ee).multiplyScalar(J),G.halfWidth.set(j.width*.5,0,0),G.halfHeight.set(0,j.height*.5,0),r.rectArea[S]=G,S++}else if(j.isPointLight){const G=e.get(j);if(G.color.copy(j.color).multiplyScalar(j.intensity),G.distance=j.distance,G.decay=j.decay,j.castShadow){const Z=j.shadow,O=t.get(j);O.shadowIntensity=Z.intensity,O.shadowBias=Z.bias,O.shadowNormalBias=Z.normalBias,O.shadowRadius=Z.radius,O.shadowMapSize=Z.mapSize,O.shadowCameraNear=Z.camera.near,O.shadowCameraFar=Z.camera.far,r.pointShadow[b]=O,r.pointShadowMap[b]=Y,r.pointShadowMatrix[b]=j.shadow.matrix,C++}r.point[b]=G,b++}else if(j.isHemisphereLight){const G=e.get(j);G.skyColor.copy(j.color).multiplyScalar(J),G.groundColor.copy(j.groundColor).multiplyScalar(J),r.hemi[x]=G,x++}}S>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Re.LTC_FLOAT_1,r.rectAreaLTC2=Re.LTC_FLOAT_2):(r.rectAreaLTC1=Re.LTC_HALF_1,r.rectAreaLTC2=Re.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=_,r.ambient[2]=y;const B=r.hash;(B.directionalLength!==M||B.pointLength!==b||B.spotLength!==T||B.rectAreaLength!==S||B.hemiLength!==x||B.numDirectionalShadows!==I||B.numPointShadows!==C||B.numSpotShadows!==w||B.numSpotMaps!==D||B.numLightProbes!==U)&&(r.directional.length=M,r.spot.length=T,r.rectArea.length=S,r.point.length=b,r.hemi.length=x,r.directionalShadow.length=I,r.directionalShadowMap.length=I,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=I,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=w+D-P,r.spotLightMap.length=D,r.numSpotLightShadowsWithMaps=P,r.numLightProbes=U,B.directionalLength=M,B.pointLength=b,B.spotLength=T,B.rectAreaLength=S,B.hemiLength=x,B.numDirectionalShadows=I,B.numPointShadows=C,B.numSpotShadows=w,B.numSpotMaps=D,B.numLightProbes=U,r.version=yw++)}function f(m,v){let _=0,y=0,M=0,b=0,T=0;const S=v.matrixWorldInverse;for(let x=0,I=m.length;x<I;x++){const C=m[x];if(C.isDirectionalLight){const w=r.directional[_];w.direction.setFromMatrixPosition(C.matrixWorld),o.setFromMatrixPosition(C.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(S),_++}else if(C.isSpotLight){const w=r.spot[M];w.position.setFromMatrixPosition(C.matrixWorld),w.position.applyMatrix4(S),w.direction.setFromMatrixPosition(C.matrixWorld),o.setFromMatrixPosition(C.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(S),M++}else if(C.isRectAreaLight){const w=r.rectArea[b];w.position.setFromMatrixPosition(C.matrixWorld),w.position.applyMatrix4(S),d.identity(),l.copy(C.matrixWorld),l.premultiply(S),d.extractRotation(l),w.halfWidth.set(C.width*.5,0,0),w.halfHeight.set(0,C.height*.5,0),w.halfWidth.applyMatrix4(d),w.halfHeight.applyMatrix4(d),b++}else if(C.isPointLight){const w=r.point[y];w.position.setFromMatrixPosition(C.matrixWorld),w.position.applyMatrix4(S),y++}else if(C.isHemisphereLight){const w=r.hemi[T];w.direction.setFromMatrixPosition(C.matrixWorld),w.direction.transformDirection(S),T++}}}return{setup:h,setupView:f,state:r}}function i0(s){const e=new Mw(s),t=[],r=[];function o(v){m.camera=v,t.length=0,r.length=0}function l(v){t.push(v)}function d(v){r.push(v)}function h(){e.setup(t)}function f(v){e.setupView(t,v)}const m={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:o,state:m,setupLights:h,setupLightsView:f,pushLight:l,pushShadow:d}}function bw(s){let e=new WeakMap;function t(o,l=0){const d=e.get(o);let h;return d===void 0?(h=new i0(s),e.set(o,[h])):l>=d.length?(h=new i0(s),d.push(h)):h=d[l],h}function r(){e=new WeakMap}return{get:t,dispose:r}}const ww=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ew=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tw(s,e,t){let r=new _h;const o=new Qe,l=new Qe,d=new Rt,h=new qy({depthPacking:H_}),f=new Yy,m={},v=t.maxTextureSize,_={[Er]:kn,[kn]:Er,[Vi]:Vi},y=new Tr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:ww,fragmentShader:Ew}),M=y.clone();M.defines.HORIZONTAL_PASS=1;const b=new wi;b.setAttribute("position",new Mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new Xn(b,y),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lx;let x=this.type;this.render=function(P,U,B){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||P.length===0)return;const L=s.getRenderTarget(),N=s.getActiveCubeFace(),j=s.getActiveMipmapLevel(),ee=s.state;ee.setBlending(br),ee.buffers.color.setClear(1,1,1,1),ee.buffers.depth.setTest(!0),ee.setScissorTest(!1);const J=x!==ji&&this.type===ji,ce=x===ji&&this.type!==ji;for(let Y=0,G=P.length;Y<G;Y++){const Z=P[Y],O=Z.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;o.copy(O.mapSize);const oe=O.getFrameExtents();if(o.multiply(oe),l.copy(O.mapSize),(o.x>v||o.y>v)&&(o.x>v&&(l.x=Math.floor(v/oe.x),o.x=l.x*oe.x,O.mapSize.x=l.x),o.y>v&&(l.y=Math.floor(v/oe.y),o.y=l.y*oe.y,O.mapSize.y=l.y)),O.map===null||J===!0||ce===!0){const z=this.type!==ji?{minFilter:fi,magFilter:fi}:{};O.map!==null&&O.map.dispose(),O.map=new ns(o.x,o.y,z),O.map.texture.name=Z.name+".shadowMap",O.camera.updateProjectionMatrix()}s.setRenderTarget(O.map),s.clear();const de=O.getViewportCount();for(let z=0;z<de;z++){const le=O.getViewport(z);d.set(l.x*le.x,l.y*le.y,l.x*le.z,l.y*le.w),ee.viewport(d),O.updateMatrices(Z,z),r=O.getFrustum(),w(U,B,O.camera,Z,this.type)}O.isPointLightShadow!==!0&&this.type===ji&&I(O,B),O.needsUpdate=!1}x=this.type,S.needsUpdate=!1,s.setRenderTarget(L,N,j)};function I(P,U){const B=e.update(T);y.defines.VSM_SAMPLES!==P.blurSamples&&(y.defines.VSM_SAMPLES=P.blurSamples,M.defines.VSM_SAMPLES=P.blurSamples,y.needsUpdate=!0,M.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new ns(o.x,o.y)),y.uniforms.shadow_pass.value=P.map.texture,y.uniforms.resolution.value=P.mapSize,y.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(U,null,B,y,T,null),M.uniforms.shadow_pass.value=P.mapPass.texture,M.uniforms.resolution.value=P.mapSize,M.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(U,null,B,M,T,null)}function C(P,U,B,L){let N=null;const j=B.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(j!==void 0)N=j;else if(N=B.isPointLight===!0?f:h,s.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const ee=N.uuid,J=U.uuid;let ce=m[ee];ce===void 0&&(ce={},m[ee]=ce);let Y=ce[J];Y===void 0&&(Y=N.clone(),ce[J]=Y,U.addEventListener("dispose",D)),N=Y}if(N.visible=U.visible,N.wireframe=U.wireframe,L===ji?N.side=U.shadowSide!==null?U.shadowSide:U.side:N.side=U.shadowSide!==null?U.shadowSide:_[U.side],N.alphaMap=U.alphaMap,N.alphaTest=U.alphaTest,N.map=U.map,N.clipShadows=U.clipShadows,N.clippingPlanes=U.clippingPlanes,N.clipIntersection=U.clipIntersection,N.displacementMap=U.displacementMap,N.displacementScale=U.displacementScale,N.displacementBias=U.displacementBias,N.wireframeLinewidth=U.wireframeLinewidth,N.linewidth=U.linewidth,B.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const ee=s.properties.get(N);ee.light=B}return N}function w(P,U,B,L,N){if(P.visible===!1)return;if(P.layers.test(U.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&N===ji)&&(!P.frustumCulled||r.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,P.matrixWorld);const J=e.update(P),ce=P.material;if(Array.isArray(ce)){const Y=J.groups;for(let G=0,Z=Y.length;G<Z;G++){const O=Y[G],oe=ce[O.materialIndex];if(oe&&oe.visible){const de=C(P,oe,L,N);P.onBeforeShadow(s,P,U,B,J,de,O),s.renderBufferDirect(B,null,J,de,P,O),P.onAfterShadow(s,P,U,B,J,de,O)}}}else if(ce.visible){const Y=C(P,ce,L,N);P.onBeforeShadow(s,P,U,B,J,Y,null),s.renderBufferDirect(B,null,J,Y,P,null),P.onAfterShadow(s,P,U,B,J,Y,null)}}const ee=P.children;for(let J=0,ce=ee.length;J<ce;J++)w(ee[J],U,B,L,N)}function D(P){P.target.removeEventListener("dispose",D);for(const B in m){const L=m[B],N=P.target.uuid;N in L&&(L[N].dispose(),delete L[N])}}}const Aw={[gd]:vd,[_d]:Md,[yd]:bd,[Ys]:Sd,[vd]:gd,[Md]:_d,[bd]:yd,[Sd]:Ys};function Cw(s,e){function t(){let $=!1;const Ce=new Rt;let ue=null;const fe=new Rt(0,0,0,0);return{setMask:function(De){ue!==De&&!$&&(s.colorMask(De,De,De,De),ue=De)},setLocked:function(De){$=De},setClear:function(De,Pe,at,Ut,Yt){Yt===!0&&(De*=Ut,Pe*=Ut,at*=Ut),Ce.set(De,Pe,at,Ut),fe.equals(Ce)===!1&&(s.clearColor(De,Pe,at,Ut),fe.copy(Ce))},reset:function(){$=!1,ue=null,fe.set(-1,0,0,0)}}}function r(){let $=!1,Ce=!1,ue=null,fe=null,De=null;return{setReversed:function(Pe){if(Ce!==Pe){const at=e.get("EXT_clip_control");Ce?at.clipControlEXT(at.LOWER_LEFT_EXT,at.ZERO_TO_ONE_EXT):at.clipControlEXT(at.LOWER_LEFT_EXT,at.NEGATIVE_ONE_TO_ONE_EXT);const Ut=De;De=null,this.setClear(Ut)}Ce=Pe},getReversed:function(){return Ce},setTest:function(Pe){Pe?_e(s.DEPTH_TEST):Te(s.DEPTH_TEST)},setMask:function(Pe){ue!==Pe&&!$&&(s.depthMask(Pe),ue=Pe)},setFunc:function(Pe){if(Ce&&(Pe=Aw[Pe]),fe!==Pe){switch(Pe){case gd:s.depthFunc(s.NEVER);break;case vd:s.depthFunc(s.ALWAYS);break;case _d:s.depthFunc(s.LESS);break;case Ys:s.depthFunc(s.LEQUAL);break;case yd:s.depthFunc(s.EQUAL);break;case Sd:s.depthFunc(s.GEQUAL);break;case Md:s.depthFunc(s.GREATER);break;case bd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}fe=Pe}},setLocked:function(Pe){$=Pe},setClear:function(Pe){De!==Pe&&(Ce&&(Pe=1-Pe),s.clearDepth(Pe),De=Pe)},reset:function(){$=!1,ue=null,fe=null,De=null,Ce=!1}}}function o(){let $=!1,Ce=null,ue=null,fe=null,De=null,Pe=null,at=null,Ut=null,Yt=null;return{setTest:function(Mt){$||(Mt?_e(s.STENCIL_TEST):Te(s.STENCIL_TEST))},setMask:function(Mt){Ce!==Mt&&!$&&(s.stencilMask(Mt),Ce=Mt)},setFunc:function(Mt,An,Mn){(ue!==Mt||fe!==An||De!==Mn)&&(s.stencilFunc(Mt,An,Mn),ue=Mt,fe=An,De=Mn)},setOp:function(Mt,An,Mn){(Pe!==Mt||at!==An||Ut!==Mn)&&(s.stencilOp(Mt,An,Mn),Pe=Mt,at=An,Ut=Mn)},setLocked:function(Mt){$=Mt},setClear:function(Mt){Yt!==Mt&&(s.clearStencil(Mt),Yt=Mt)},reset:function(){$=!1,Ce=null,ue=null,fe=null,De=null,Pe=null,at=null,Ut=null,Yt=null}}}const l=new t,d=new r,h=new o,f=new WeakMap,m=new WeakMap;let v={},_={},y=new WeakMap,M=[],b=null,T=!1,S=null,x=null,I=null,C=null,w=null,D=null,P=null,U=new yt(0,0,0),B=0,L=!1,N=null,j=null,ee=null,J=null,ce=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Z=0;const O=s.getParameter(s.VERSION);O.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(O)[1]),G=Z>=1):O.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),G=Z>=2);let oe=null,de={};const z=s.getParameter(s.SCISSOR_BOX),le=s.getParameter(s.VIEWPORT),Ue=new Rt().fromArray(z),re=new Rt().fromArray(le);function pe($,Ce,ue,fe){const De=new Uint8Array(4),Pe=s.createTexture();s.bindTexture($,Pe),s.texParameteri($,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri($,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let at=0;at<ue;at++)$===s.TEXTURE_3D||$===s.TEXTURE_2D_ARRAY?s.texImage3D(Ce,0,s.RGBA,1,1,fe,0,s.RGBA,s.UNSIGNED_BYTE,De):s.texImage2D(Ce+at,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,De);return Pe}const Me={};Me[s.TEXTURE_2D]=pe(s.TEXTURE_2D,s.TEXTURE_2D,1),Me[s.TEXTURE_CUBE_MAP]=pe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[s.TEXTURE_2D_ARRAY]=pe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Me[s.TEXTURE_3D]=pe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),d.setClear(1),h.setClear(0),_e(s.DEPTH_TEST),d.setFunc(Ys),gt(!1),ft(im),_e(s.CULL_FACE),H(br);function _e($){v[$]!==!0&&(s.enable($),v[$]=!0)}function Te($){v[$]!==!1&&(s.disable($),v[$]=!1)}function qe($,Ce){return _[$]!==Ce?(s.bindFramebuffer($,Ce),_[$]=Ce,$===s.DRAW_FRAMEBUFFER&&(_[s.FRAMEBUFFER]=Ce),$===s.FRAMEBUFFER&&(_[s.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Ge($,Ce){let ue=M,fe=!1;if($){ue=y.get(Ce),ue===void 0&&(ue=[],y.set(Ce,ue));const De=$.textures;if(ue.length!==De.length||ue[0]!==s.COLOR_ATTACHMENT0){for(let Pe=0,at=De.length;Pe<at;Pe++)ue[Pe]=s.COLOR_ATTACHMENT0+Pe;ue.length=De.length,fe=!0}}else ue[0]!==s.BACK&&(ue[0]=s.BACK,fe=!0);fe&&s.drawBuffers(ue)}function Dt($){return b!==$?(s.useProgram($),b=$,!0):!1}const Lt={[Jr]:s.FUNC_ADD,[x_]:s.FUNC_SUBTRACT,[g_]:s.FUNC_REVERSE_SUBTRACT};Lt[v_]=s.MIN,Lt[__]=s.MAX;const dt={[y_]:s.ZERO,[S_]:s.ONE,[M_]:s.SRC_COLOR,[md]:s.SRC_ALPHA,[C_]:s.SRC_ALPHA_SATURATE,[T_]:s.DST_COLOR,[w_]:s.DST_ALPHA,[b_]:s.ONE_MINUS_SRC_COLOR,[xd]:s.ONE_MINUS_SRC_ALPHA,[A_]:s.ONE_MINUS_DST_COLOR,[E_]:s.ONE_MINUS_DST_ALPHA,[N_]:s.CONSTANT_COLOR,[R_]:s.ONE_MINUS_CONSTANT_COLOR,[P_]:s.CONSTANT_ALPHA,[D_]:s.ONE_MINUS_CONSTANT_ALPHA};function H($,Ce,ue,fe,De,Pe,at,Ut,Yt,Mt){if($===br){T===!0&&(Te(s.BLEND),T=!1);return}if(T===!1&&(_e(s.BLEND),T=!0),$!==m_){if($!==S||Mt!==L){if((x!==Jr||w!==Jr)&&(s.blendEquation(s.FUNC_ADD),x=Jr,w=Jr),Mt)switch($){case Gs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case rm:s.blendFunc(s.ONE,s.ONE);break;case sm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case am:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case Gs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case rm:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case sm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case am:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}I=null,C=null,D=null,P=null,U.set(0,0,0),B=0,S=$,L=Mt}return}De=De||Ce,Pe=Pe||ue,at=at||fe,(Ce!==x||De!==w)&&(s.blendEquationSeparate(Lt[Ce],Lt[De]),x=Ce,w=De),(ue!==I||fe!==C||Pe!==D||at!==P)&&(s.blendFuncSeparate(dt[ue],dt[fe],dt[Pe],dt[at]),I=ue,C=fe,D=Pe,P=at),(Ut.equals(U)===!1||Yt!==B)&&(s.blendColor(Ut.r,Ut.g,Ut.b,Yt),U.copy(Ut),B=Yt),S=$,L=!1}function Sn($,Ce){$.side===Vi?Te(s.CULL_FACE):_e(s.CULL_FACE);let ue=$.side===kn;Ce&&(ue=!ue),gt(ue),$.blending===Gs&&$.transparent===!1?H(br):H($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),d.setFunc($.depthFunc),d.setTest($.depthTest),d.setMask($.depthWrite),l.setMask($.colorWrite);const fe=$.stencilWrite;h.setTest(fe),fe&&(h.setMask($.stencilWriteMask),h.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),h.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),Ct($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?_e(s.SAMPLE_ALPHA_TO_COVERAGE):Te(s.SAMPLE_ALPHA_TO_COVERAGE)}function gt($){N!==$&&($?s.frontFace(s.CW):s.frontFace(s.CCW),N=$)}function ft($){$!==h_?(_e(s.CULL_FACE),$!==j&&($===im?s.cullFace(s.BACK):$===f_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Te(s.CULL_FACE),j=$}function Ye($){$!==ee&&(G&&s.lineWidth($),ee=$)}function Ct($,Ce,ue){$?(_e(s.POLYGON_OFFSET_FILL),(J!==Ce||ce!==ue)&&(s.polygonOffset(Ce,ue),J=Ce,ce=ue)):Te(s.POLYGON_OFFSET_FILL)}function We($){$?_e(s.SCISSOR_TEST):Te(s.SCISSOR_TEST)}function k($){$===void 0&&($=s.TEXTURE0+Y-1),oe!==$&&(s.activeTexture($),oe=$)}function A($,Ce,ue){ue===void 0&&(oe===null?ue=s.TEXTURE0+Y-1:ue=oe);let fe=de[ue];fe===void 0&&(fe={type:void 0,texture:void 0},de[ue]=fe),(fe.type!==$||fe.texture!==Ce)&&(oe!==ue&&(s.activeTexture(ue),oe=ue),s.bindTexture($,Ce||Me[$]),fe.type=$,fe.texture=Ce)}function ie(){const $=de[oe];$!==void 0&&$.type!==void 0&&(s.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function me(){try{s.compressedTexImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ge(){try{s.compressedTexImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function he(){try{s.texSubImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Xe(){try{s.texSubImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ae(){try{s.compressedTexSubImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ke(){try{s.compressedTexSubImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ht(){try{s.texStorage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function be(){try{s.texStorage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Oe(){try{s.texImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function et(){try{s.texImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function nt($){Ue.equals($)===!1&&(s.scissor($.x,$.y,$.z,$.w),Ue.copy($))}function ze($){re.equals($)===!1&&(s.viewport($.x,$.y,$.z,$.w),re.copy($))}function pt($,Ce){let ue=m.get(Ce);ue===void 0&&(ue=new WeakMap,m.set(Ce,ue));let fe=ue.get($);fe===void 0&&(fe=s.getUniformBlockIndex(Ce,$.name),ue.set($,fe))}function st($,Ce){const fe=m.get(Ce).get($);f.get(Ce)!==fe&&(s.uniformBlockBinding(Ce,fe,$.__bindingPointIndex),f.set(Ce,fe))}function At(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),d.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),v={},oe=null,de={},_={},y=new WeakMap,M=[],b=null,T=!1,S=null,x=null,I=null,C=null,w=null,D=null,P=null,U=new yt(0,0,0),B=0,L=!1,N=null,j=null,ee=null,J=null,ce=null,Ue.set(0,0,s.canvas.width,s.canvas.height),re.set(0,0,s.canvas.width,s.canvas.height),l.reset(),d.reset(),h.reset()}return{buffers:{color:l,depth:d,stencil:h},enable:_e,disable:Te,bindFramebuffer:qe,drawBuffers:Ge,useProgram:Dt,setBlending:H,setMaterial:Sn,setFlipSided:gt,setCullFace:ft,setLineWidth:Ye,setPolygonOffset:Ct,setScissorTest:We,activeTexture:k,bindTexture:A,unbindTexture:ie,compressedTexImage2D:me,compressedTexImage3D:ge,texImage2D:Oe,texImage3D:et,updateUBOMapping:pt,uniformBlockBinding:st,texStorage2D:ht,texStorage3D:be,texSubImage2D:he,texSubImage3D:Xe,compressedTexSubImage2D:Ae,compressedTexSubImage3D:ke,scissor:nt,viewport:ze,reset:At}}function Nw(s,e,t,r,o,l,d){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new Qe,v=new WeakMap;let _;const y=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(k,A){return M?new OffscreenCanvas(k,A):jl("canvas")}function T(k,A,ie){let me=1;const ge=We(k);if((ge.width>ie||ge.height>ie)&&(me=ie/Math.max(ge.width,ge.height)),me<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){const he=Math.floor(me*ge.width),Xe=Math.floor(me*ge.height);_===void 0&&(_=b(he,Xe));const Ae=A?b(he,Xe):_;return Ae.width=he,Ae.height=Xe,Ae.getContext("2d").drawImage(k,0,0,he,Xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ge.width+"x"+ge.height+") to ("+he+"x"+Xe+")."),Ae}else return"data"in k&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ge.width+"x"+ge.height+")."),k;return k}function S(k){return k.generateMipmaps}function x(k){s.generateMipmap(k)}function I(k){return k.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:k.isWebGL3DRenderTarget?s.TEXTURE_3D:k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function C(k,A,ie,me,ge=!1){if(k!==null){if(s[k]!==void 0)return s[k];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let he=A;if(A===s.RED&&(ie===s.FLOAT&&(he=s.R32F),ie===s.HALF_FLOAT&&(he=s.R16F),ie===s.UNSIGNED_BYTE&&(he=s.R8)),A===s.RED_INTEGER&&(ie===s.UNSIGNED_BYTE&&(he=s.R8UI),ie===s.UNSIGNED_SHORT&&(he=s.R16UI),ie===s.UNSIGNED_INT&&(he=s.R32UI),ie===s.BYTE&&(he=s.R8I),ie===s.SHORT&&(he=s.R16I),ie===s.INT&&(he=s.R32I)),A===s.RG&&(ie===s.FLOAT&&(he=s.RG32F),ie===s.HALF_FLOAT&&(he=s.RG16F),ie===s.UNSIGNED_BYTE&&(he=s.RG8)),A===s.RG_INTEGER&&(ie===s.UNSIGNED_BYTE&&(he=s.RG8UI),ie===s.UNSIGNED_SHORT&&(he=s.RG16UI),ie===s.UNSIGNED_INT&&(he=s.RG32UI),ie===s.BYTE&&(he=s.RG8I),ie===s.SHORT&&(he=s.RG16I),ie===s.INT&&(he=s.RG32I)),A===s.RGB_INTEGER&&(ie===s.UNSIGNED_BYTE&&(he=s.RGB8UI),ie===s.UNSIGNED_SHORT&&(he=s.RGB16UI),ie===s.UNSIGNED_INT&&(he=s.RGB32UI),ie===s.BYTE&&(he=s.RGB8I),ie===s.SHORT&&(he=s.RGB16I),ie===s.INT&&(he=s.RGB32I)),A===s.RGBA_INTEGER&&(ie===s.UNSIGNED_BYTE&&(he=s.RGBA8UI),ie===s.UNSIGNED_SHORT&&(he=s.RGBA16UI),ie===s.UNSIGNED_INT&&(he=s.RGBA32UI),ie===s.BYTE&&(he=s.RGBA8I),ie===s.SHORT&&(he=s.RGBA16I),ie===s.INT&&(he=s.RGBA32I)),A===s.RGB&&ie===s.UNSIGNED_INT_5_9_9_9_REV&&(he=s.RGB9_E5),A===s.RGBA){const Xe=ge?zl:Tt.getTransfer(me);ie===s.FLOAT&&(he=s.RGBA32F),ie===s.HALF_FLOAT&&(he=s.RGBA16F),ie===s.UNSIGNED_BYTE&&(he=Xe===Nt?s.SRGB8_ALPHA8:s.RGBA8),ie===s.UNSIGNED_SHORT_4_4_4_4&&(he=s.RGBA4),ie===s.UNSIGNED_SHORT_5_5_5_1&&(he=s.RGB5_A1)}return(he===s.R16F||he===s.R32F||he===s.RG16F||he===s.RG32F||he===s.RGBA16F||he===s.RGBA32F)&&e.get("EXT_color_buffer_float"),he}function w(k,A){let ie;return k?A===null||A===ts||A===Zs?ie=s.DEPTH24_STENCIL8:A===Hi?ie=s.DEPTH32F_STENCIL8:A===qa&&(ie=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ts||A===Zs?ie=s.DEPTH_COMPONENT24:A===Hi?ie=s.DEPTH_COMPONENT32F:A===qa&&(ie=s.DEPTH_COMPONENT16),ie}function D(k,A){return S(k)===!0||k.isFramebufferTexture&&k.minFilter!==fi&&k.minFilter!==Si?Math.log2(Math.max(A.width,A.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?A.mipmaps.length:1}function P(k){const A=k.target;A.removeEventListener("dispose",P),B(A),A.isVideoTexture&&v.delete(A)}function U(k){const A=k.target;A.removeEventListener("dispose",U),N(A)}function B(k){const A=r.get(k);if(A.__webglInit===void 0)return;const ie=k.source,me=y.get(ie);if(me){const ge=me[A.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&L(k),Object.keys(me).length===0&&y.delete(ie)}r.remove(k)}function L(k){const A=r.get(k);s.deleteTexture(A.__webglTexture);const ie=k.source,me=y.get(ie);delete me[A.__cacheKey],d.memory.textures--}function N(k){const A=r.get(k);if(k.depthTexture&&(k.depthTexture.dispose(),r.remove(k.depthTexture)),k.isWebGLCubeRenderTarget)for(let me=0;me<6;me++){if(Array.isArray(A.__webglFramebuffer[me]))for(let ge=0;ge<A.__webglFramebuffer[me].length;ge++)s.deleteFramebuffer(A.__webglFramebuffer[me][ge]);else s.deleteFramebuffer(A.__webglFramebuffer[me]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[me])}else{if(Array.isArray(A.__webglFramebuffer))for(let me=0;me<A.__webglFramebuffer.length;me++)s.deleteFramebuffer(A.__webglFramebuffer[me]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let me=0;me<A.__webglColorRenderbuffer.length;me++)A.__webglColorRenderbuffer[me]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[me]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const ie=k.textures;for(let me=0,ge=ie.length;me<ge;me++){const he=r.get(ie[me]);he.__webglTexture&&(s.deleteTexture(he.__webglTexture),d.memory.textures--),r.remove(ie[me])}r.remove(k)}let j=0;function ee(){j=0}function J(){const k=j;return k>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+o.maxTextures),j+=1,k}function ce(k){const A=[];return A.push(k.wrapS),A.push(k.wrapT),A.push(k.wrapR||0),A.push(k.magFilter),A.push(k.minFilter),A.push(k.anisotropy),A.push(k.internalFormat),A.push(k.format),A.push(k.type),A.push(k.generateMipmaps),A.push(k.premultiplyAlpha),A.push(k.flipY),A.push(k.unpackAlignment),A.push(k.colorSpace),A.join()}function Y(k,A){const ie=r.get(k);if(k.isVideoTexture&&Ye(k),k.isRenderTargetTexture===!1&&k.version>0&&ie.__version!==k.version){const me=k.image;if(me===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(me.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re(ie,k,A);return}}t.bindTexture(s.TEXTURE_2D,ie.__webglTexture,s.TEXTURE0+A)}function G(k,A){const ie=r.get(k);if(k.version>0&&ie.__version!==k.version){re(ie,k,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,ie.__webglTexture,s.TEXTURE0+A)}function Z(k,A){const ie=r.get(k);if(k.version>0&&ie.__version!==k.version){re(ie,k,A);return}t.bindTexture(s.TEXTURE_3D,ie.__webglTexture,s.TEXTURE0+A)}function O(k,A){const ie=r.get(k);if(k.version>0&&ie.__version!==k.version){pe(ie,k,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,ie.__webglTexture,s.TEXTURE0+A)}const oe={[Td]:s.REPEAT,[Qr]:s.CLAMP_TO_EDGE,[Ad]:s.MIRRORED_REPEAT},de={[fi]:s.NEAREST,[j_]:s.NEAREST_MIPMAP_NEAREST,[ul]:s.NEAREST_MIPMAP_LINEAR,[Si]:s.LINEAR,[Du]:s.LINEAR_MIPMAP_NEAREST,[es]:s.LINEAR_MIPMAP_LINEAR},z={[W_]:s.NEVER,[J_]:s.ALWAYS,[X_]:s.LESS,[bx]:s.LEQUAL,[$_]:s.EQUAL,[K_]:s.GEQUAL,[q_]:s.GREATER,[Y_]:s.NOTEQUAL};function le(k,A){if(A.type===Hi&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Si||A.magFilter===Du||A.magFilter===ul||A.magFilter===es||A.minFilter===Si||A.minFilter===Du||A.minFilter===ul||A.minFilter===es)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(k,s.TEXTURE_WRAP_S,oe[A.wrapS]),s.texParameteri(k,s.TEXTURE_WRAP_T,oe[A.wrapT]),(k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY)&&s.texParameteri(k,s.TEXTURE_WRAP_R,oe[A.wrapR]),s.texParameteri(k,s.TEXTURE_MAG_FILTER,de[A.magFilter]),s.texParameteri(k,s.TEXTURE_MIN_FILTER,de[A.minFilter]),A.compareFunction&&(s.texParameteri(k,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(k,s.TEXTURE_COMPARE_FUNC,z[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===fi||A.minFilter!==ul&&A.minFilter!==es||A.type===Hi&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||r.get(A).__currentAnisotropy){const ie=e.get("EXT_texture_filter_anisotropic");s.texParameterf(k,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,o.getMaxAnisotropy())),r.get(A).__currentAnisotropy=A.anisotropy}}}function Ue(k,A){let ie=!1;k.__webglInit===void 0&&(k.__webglInit=!0,A.addEventListener("dispose",P));const me=A.source;let ge=y.get(me);ge===void 0&&(ge={},y.set(me,ge));const he=ce(A);if(he!==k.__cacheKey){ge[he]===void 0&&(ge[he]={texture:s.createTexture(),usedTimes:0},d.memory.textures++,ie=!0),ge[he].usedTimes++;const Xe=ge[k.__cacheKey];Xe!==void 0&&(ge[k.__cacheKey].usedTimes--,Xe.usedTimes===0&&L(A)),k.__cacheKey=he,k.__webglTexture=ge[he].texture}return ie}function re(k,A,ie){let me=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(me=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(me=s.TEXTURE_3D);const ge=Ue(k,A),he=A.source;t.bindTexture(me,k.__webglTexture,s.TEXTURE0+ie);const Xe=r.get(he);if(he.version!==Xe.__version||ge===!0){t.activeTexture(s.TEXTURE0+ie);const Ae=Tt.getPrimaries(Tt.workingColorSpace),ke=A.colorSpace===Mr?null:Tt.getPrimaries(A.colorSpace),ht=A.colorSpace===Mr||Ae===ke?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);let be=T(A.image,!1,o.maxTextureSize);be=Ct(A,be);const Oe=l.convert(A.format,A.colorSpace),et=l.convert(A.type);let nt=C(A.internalFormat,Oe,et,A.colorSpace,A.isVideoTexture);le(me,A);let ze;const pt=A.mipmaps,st=A.isVideoTexture!==!0,At=Xe.__version===void 0||ge===!0,$=he.dataReady,Ce=D(A,be);if(A.isDepthTexture)nt=w(A.format===Qs,A.type),At&&(st?t.texStorage2D(s.TEXTURE_2D,1,nt,be.width,be.height):t.texImage2D(s.TEXTURE_2D,0,nt,be.width,be.height,0,Oe,et,null));else if(A.isDataTexture)if(pt.length>0){st&&At&&t.texStorage2D(s.TEXTURE_2D,Ce,nt,pt[0].width,pt[0].height);for(let ue=0,fe=pt.length;ue<fe;ue++)ze=pt[ue],st?$&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,ze.width,ze.height,Oe,et,ze.data):t.texImage2D(s.TEXTURE_2D,ue,nt,ze.width,ze.height,0,Oe,et,ze.data);A.generateMipmaps=!1}else st?(At&&t.texStorage2D(s.TEXTURE_2D,Ce,nt,be.width,be.height),$&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,be.width,be.height,Oe,et,be.data)):t.texImage2D(s.TEXTURE_2D,0,nt,be.width,be.height,0,Oe,et,be.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){st&&At&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,nt,pt[0].width,pt[0].height,be.depth);for(let ue=0,fe=pt.length;ue<fe;ue++)if(ze=pt[ue],A.format!==hi)if(Oe!==null)if(st){if($)if(A.layerUpdates.size>0){const De=Lm(ze.width,ze.height,A.format,A.type);for(const Pe of A.layerUpdates){const at=ze.data.subarray(Pe*De/ze.data.BYTES_PER_ELEMENT,(Pe+1)*De/ze.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,Pe,ze.width,ze.height,1,Oe,at)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,ze.width,ze.height,be.depth,Oe,ze.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ue,nt,ze.width,ze.height,be.depth,0,ze.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else st?$&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,ze.width,ze.height,be.depth,Oe,et,ze.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ue,nt,ze.width,ze.height,be.depth,0,Oe,et,ze.data)}else{st&&At&&t.texStorage2D(s.TEXTURE_2D,Ce,nt,pt[0].width,pt[0].height);for(let ue=0,fe=pt.length;ue<fe;ue++)ze=pt[ue],A.format!==hi?Oe!==null?st?$&&t.compressedTexSubImage2D(s.TEXTURE_2D,ue,0,0,ze.width,ze.height,Oe,ze.data):t.compressedTexImage2D(s.TEXTURE_2D,ue,nt,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?$&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,ze.width,ze.height,Oe,et,ze.data):t.texImage2D(s.TEXTURE_2D,ue,nt,ze.width,ze.height,0,Oe,et,ze.data)}else if(A.isDataArrayTexture)if(st){if(At&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,nt,be.width,be.height,be.depth),$)if(A.layerUpdates.size>0){const ue=Lm(be.width,be.height,A.format,A.type);for(const fe of A.layerUpdates){const De=be.data.subarray(fe*ue/be.data.BYTES_PER_ELEMENT,(fe+1)*ue/be.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,fe,be.width,be.height,1,Oe,et,De)}A.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,be.width,be.height,be.depth,Oe,et,be.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,nt,be.width,be.height,be.depth,0,Oe,et,be.data);else if(A.isData3DTexture)st?(At&&t.texStorage3D(s.TEXTURE_3D,Ce,nt,be.width,be.height,be.depth),$&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,be.width,be.height,be.depth,Oe,et,be.data)):t.texImage3D(s.TEXTURE_3D,0,nt,be.width,be.height,be.depth,0,Oe,et,be.data);else if(A.isFramebufferTexture){if(At)if(st)t.texStorage2D(s.TEXTURE_2D,Ce,nt,be.width,be.height);else{let ue=be.width,fe=be.height;for(let De=0;De<Ce;De++)t.texImage2D(s.TEXTURE_2D,De,nt,ue,fe,0,Oe,et,null),ue>>=1,fe>>=1}}else if(pt.length>0){if(st&&At){const ue=We(pt[0]);t.texStorage2D(s.TEXTURE_2D,Ce,nt,ue.width,ue.height)}for(let ue=0,fe=pt.length;ue<fe;ue++)ze=pt[ue],st?$&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,Oe,et,ze):t.texImage2D(s.TEXTURE_2D,ue,nt,Oe,et,ze);A.generateMipmaps=!1}else if(st){if(At){const ue=We(be);t.texStorage2D(s.TEXTURE_2D,Ce,nt,ue.width,ue.height)}$&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Oe,et,be)}else t.texImage2D(s.TEXTURE_2D,0,nt,Oe,et,be);S(A)&&x(me),Xe.__version=he.version,A.onUpdate&&A.onUpdate(A)}k.__version=A.version}function pe(k,A,ie){if(A.image.length!==6)return;const me=Ue(k,A),ge=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+ie);const he=r.get(ge);if(ge.version!==he.__version||me===!0){t.activeTexture(s.TEXTURE0+ie);const Xe=Tt.getPrimaries(Tt.workingColorSpace),Ae=A.colorSpace===Mr?null:Tt.getPrimaries(A.colorSpace),ke=A.colorSpace===Mr||Xe===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);const ht=A.isCompressedTexture||A.image[0].isCompressedTexture,be=A.image[0]&&A.image[0].isDataTexture,Oe=[];for(let fe=0;fe<6;fe++)!ht&&!be?Oe[fe]=T(A.image[fe],!0,o.maxCubemapSize):Oe[fe]=be?A.image[fe].image:A.image[fe],Oe[fe]=Ct(A,Oe[fe]);const et=Oe[0],nt=l.convert(A.format,A.colorSpace),ze=l.convert(A.type),pt=C(A.internalFormat,nt,ze,A.colorSpace),st=A.isVideoTexture!==!0,At=he.__version===void 0||me===!0,$=ge.dataReady;let Ce=D(A,et);le(s.TEXTURE_CUBE_MAP,A);let ue;if(ht){st&&At&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,pt,et.width,et.height);for(let fe=0;fe<6;fe++){ue=Oe[fe].mipmaps;for(let De=0;De<ue.length;De++){const Pe=ue[De];A.format!==hi?nt!==null?st?$&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De,0,0,Pe.width,Pe.height,nt,Pe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De,pt,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):st?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De,0,0,Pe.width,Pe.height,nt,ze,Pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De,pt,Pe.width,Pe.height,0,nt,ze,Pe.data)}}}else{if(ue=A.mipmaps,st&&At){ue.length>0&&Ce++;const fe=We(Oe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,pt,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(be){st?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Oe[fe].width,Oe[fe].height,nt,ze,Oe[fe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,pt,Oe[fe].width,Oe[fe].height,0,nt,ze,Oe[fe].data);for(let De=0;De<ue.length;De++){const at=ue[De].image[fe].image;st?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De+1,0,0,at.width,at.height,nt,ze,at.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De+1,pt,at.width,at.height,0,nt,ze,at.data)}}else{st?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,nt,ze,Oe[fe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,pt,nt,ze,Oe[fe]);for(let De=0;De<ue.length;De++){const Pe=ue[De];st?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De+1,0,0,nt,ze,Pe.image[fe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De+1,pt,nt,ze,Pe.image[fe])}}}S(A)&&x(s.TEXTURE_CUBE_MAP),he.__version=ge.version,A.onUpdate&&A.onUpdate(A)}k.__version=A.version}function Me(k,A,ie,me,ge,he){const Xe=l.convert(ie.format,ie.colorSpace),Ae=l.convert(ie.type),ke=C(ie.internalFormat,Xe,Ae,ie.colorSpace),ht=r.get(A),be=r.get(ie);if(be.__renderTarget=A,!ht.__hasExternalTextures){const Oe=Math.max(1,A.width>>he),et=Math.max(1,A.height>>he);ge===s.TEXTURE_3D||ge===s.TEXTURE_2D_ARRAY?t.texImage3D(ge,he,ke,Oe,et,A.depth,0,Xe,Ae,null):t.texImage2D(ge,he,ke,Oe,et,0,Xe,Ae,null)}t.bindFramebuffer(s.FRAMEBUFFER,k),ft(A)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,ge,be.__webglTexture,0,gt(A)):(ge===s.TEXTURE_2D||ge>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,me,ge,be.__webglTexture,he),t.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(k,A,ie){if(s.bindRenderbuffer(s.RENDERBUFFER,k),A.depthBuffer){const me=A.depthTexture,ge=me&&me.isDepthTexture?me.type:null,he=w(A.stencilBuffer,ge),Xe=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ae=gt(A);ft(A)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ae,he,A.width,A.height):ie?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ae,he,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,he,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Xe,s.RENDERBUFFER,k)}else{const me=A.textures;for(let ge=0;ge<me.length;ge++){const he=me[ge],Xe=l.convert(he.format,he.colorSpace),Ae=l.convert(he.type),ke=C(he.internalFormat,Xe,Ae,he.colorSpace),ht=gt(A);ie&&ft(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,ke,A.width,A.height):ft(A)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,ke,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,ke,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Te(k,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,k),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const me=r.get(A.depthTexture);me.__renderTarget=A,(!me.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),Y(A.depthTexture,0);const ge=me.__webglTexture,he=gt(A);if(A.depthTexture.format===Ws)ft(A)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ge,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ge,0);else if(A.depthTexture.format===Qs)ft(A)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ge,0,he):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ge,0);else throw new Error("Unknown depthTexture format")}function qe(k){const A=r.get(k),ie=k.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==k.depthTexture){const me=k.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),me){const ge=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,me.removeEventListener("dispose",ge)};me.addEventListener("dispose",ge),A.__depthDisposeCallback=ge}A.__boundDepthTexture=me}if(k.depthTexture&&!A.__autoAllocateDepthBuffer){if(ie)throw new Error("target.depthTexture not supported in Cube render targets");Te(A.__webglFramebuffer,k)}else if(ie){A.__webglDepthbuffer=[];for(let me=0;me<6;me++)if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[me]),A.__webglDepthbuffer[me]===void 0)A.__webglDepthbuffer[me]=s.createRenderbuffer(),_e(A.__webglDepthbuffer[me],k,!1);else{const ge=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=A.__webglDepthbuffer[me];s.bindRenderbuffer(s.RENDERBUFFER,he),s.framebufferRenderbuffer(s.FRAMEBUFFER,ge,s.RENDERBUFFER,he)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),_e(A.__webglDepthbuffer,k,!1);else{const me=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ge),s.framebufferRenderbuffer(s.FRAMEBUFFER,me,s.RENDERBUFFER,ge)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ge(k,A,ie){const me=r.get(k);A!==void 0&&Me(me.__webglFramebuffer,k,k.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ie!==void 0&&qe(k)}function Dt(k){const A=k.texture,ie=r.get(k),me=r.get(A);k.addEventListener("dispose",U);const ge=k.textures,he=k.isWebGLCubeRenderTarget===!0,Xe=ge.length>1;if(Xe||(me.__webglTexture===void 0&&(me.__webglTexture=s.createTexture()),me.__version=A.version,d.memory.textures++),he){ie.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(A.mipmaps&&A.mipmaps.length>0){ie.__webglFramebuffer[Ae]=[];for(let ke=0;ke<A.mipmaps.length;ke++)ie.__webglFramebuffer[Ae][ke]=s.createFramebuffer()}else ie.__webglFramebuffer[Ae]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){ie.__webglFramebuffer=[];for(let Ae=0;Ae<A.mipmaps.length;Ae++)ie.__webglFramebuffer[Ae]=s.createFramebuffer()}else ie.__webglFramebuffer=s.createFramebuffer();if(Xe)for(let Ae=0,ke=ge.length;Ae<ke;Ae++){const ht=r.get(ge[Ae]);ht.__webglTexture===void 0&&(ht.__webglTexture=s.createTexture(),d.memory.textures++)}if(k.samples>0&&ft(k)===!1){ie.__webglMultisampledFramebuffer=s.createFramebuffer(),ie.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,ie.__webglMultisampledFramebuffer);for(let Ae=0;Ae<ge.length;Ae++){const ke=ge[Ae];ie.__webglColorRenderbuffer[Ae]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ie.__webglColorRenderbuffer[Ae]);const ht=l.convert(ke.format,ke.colorSpace),be=l.convert(ke.type),Oe=C(ke.internalFormat,ht,be,ke.colorSpace,k.isXRRenderTarget===!0),et=gt(k);s.renderbufferStorageMultisample(s.RENDERBUFFER,et,Oe,k.width,k.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,ie.__webglColorRenderbuffer[Ae])}s.bindRenderbuffer(s.RENDERBUFFER,null),k.depthBuffer&&(ie.__webglDepthRenderbuffer=s.createRenderbuffer(),_e(ie.__webglDepthRenderbuffer,k,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(he){t.bindTexture(s.TEXTURE_CUBE_MAP,me.__webglTexture),le(s.TEXTURE_CUBE_MAP,A);for(let Ae=0;Ae<6;Ae++)if(A.mipmaps&&A.mipmaps.length>0)for(let ke=0;ke<A.mipmaps.length;ke++)Me(ie.__webglFramebuffer[Ae][ke],k,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ke);else Me(ie.__webglFramebuffer[Ae],k,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);S(A)&&x(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Xe){for(let Ae=0,ke=ge.length;Ae<ke;Ae++){const ht=ge[Ae],be=r.get(ht);t.bindTexture(s.TEXTURE_2D,be.__webglTexture),le(s.TEXTURE_2D,ht),Me(ie.__webglFramebuffer,k,ht,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,0),S(ht)&&x(s.TEXTURE_2D)}t.unbindTexture()}else{let Ae=s.TEXTURE_2D;if((k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(Ae=k.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ae,me.__webglTexture),le(Ae,A),A.mipmaps&&A.mipmaps.length>0)for(let ke=0;ke<A.mipmaps.length;ke++)Me(ie.__webglFramebuffer[ke],k,A,s.COLOR_ATTACHMENT0,Ae,ke);else Me(ie.__webglFramebuffer,k,A,s.COLOR_ATTACHMENT0,Ae,0);S(A)&&x(Ae),t.unbindTexture()}k.depthBuffer&&qe(k)}function Lt(k){const A=k.textures;for(let ie=0,me=A.length;ie<me;ie++){const ge=A[ie];if(S(ge)){const he=I(k),Xe=r.get(ge).__webglTexture;t.bindTexture(he,Xe),x(he),t.unbindTexture()}}}const dt=[],H=[];function Sn(k){if(k.samples>0){if(ft(k)===!1){const A=k.textures,ie=k.width,me=k.height;let ge=s.COLOR_BUFFER_BIT;const he=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Xe=r.get(k),Ae=A.length>1;if(Ae)for(let ke=0;ke<A.length;ke++)t.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Xe.__webglFramebuffer);for(let ke=0;ke<A.length;ke++){if(k.resolveDepthBuffer&&(k.depthBuffer&&(ge|=s.DEPTH_BUFFER_BIT),k.stencilBuffer&&k.resolveStencilBuffer&&(ge|=s.STENCIL_BUFFER_BIT)),Ae){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Xe.__webglColorRenderbuffer[ke]);const ht=r.get(A[ke]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ht,0)}s.blitFramebuffer(0,0,ie,me,0,0,ie,me,ge,s.NEAREST),f===!0&&(dt.length=0,H.length=0,dt.push(s.COLOR_ATTACHMENT0+ke),k.depthBuffer&&k.resolveDepthBuffer===!1&&(dt.push(he),H.push(he),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,H)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ae)for(let ke=0;ke<A.length;ke++){t.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.RENDERBUFFER,Xe.__webglColorRenderbuffer[ke]);const ht=r.get(A[ke]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.TEXTURE_2D,ht,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Xe.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.resolveDepthBuffer===!1&&f){const A=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function gt(k){return Math.min(o.maxSamples,k.samples)}function ft(k){const A=r.get(k);return k.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ye(k){const A=d.render.frame;v.get(k)!==A&&(v.set(k,A),k.update())}function Ct(k,A){const ie=k.colorSpace,me=k.format,ge=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||ie!==ea&&ie!==Mr&&(Tt.getTransfer(ie)===Nt?(me!==hi||ge!==Xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ie)),A}function We(k){return typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement?(m.width=k.naturalWidth||k.width,m.height=k.naturalHeight||k.height):typeof VideoFrame<"u"&&k instanceof VideoFrame?(m.width=k.displayWidth,m.height=k.displayHeight):(m.width=k.width,m.height=k.height),m}this.allocateTextureUnit=J,this.resetTextureUnits=ee,this.setTexture2D=Y,this.setTexture2DArray=G,this.setTexture3D=Z,this.setTextureCube=O,this.rebindTextures=Ge,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Sn,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=ft}function Rw(s,e){function t(r,o=Mr){let l;const d=Tt.getTransfer(o);if(r===Xi)return s.UNSIGNED_BYTE;if(r===hh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===fh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===px)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===hx)return s.BYTE;if(r===fx)return s.SHORT;if(r===qa)return s.UNSIGNED_SHORT;if(r===dh)return s.INT;if(r===ts)return s.UNSIGNED_INT;if(r===Hi)return s.FLOAT;if(r===Ya)return s.HALF_FLOAT;if(r===mx)return s.ALPHA;if(r===xx)return s.RGB;if(r===hi)return s.RGBA;if(r===gx)return s.LUMINANCE;if(r===vx)return s.LUMINANCE_ALPHA;if(r===Ws)return s.DEPTH_COMPONENT;if(r===Qs)return s.DEPTH_STENCIL;if(r===_x)return s.RED;if(r===ph)return s.RED_INTEGER;if(r===yx)return s.RG;if(r===mh)return s.RG_INTEGER;if(r===xh)return s.RGBA_INTEGER;if(r===Dl||r===Ll||r===Il||r===Ul)if(d===Nt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Dl)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ll)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Il)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ul)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Dl)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ll)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Il)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ul)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Cd||r===Nd||r===Rd||r===Pd)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===Cd)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Nd)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Rd)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Pd)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Dd||r===Ld||r===Id)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Dd||r===Ld)return d===Nt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Id)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ud||r===kd||r===Fd||r===Od||r===zd||r===Bd||r===jd||r===Vd||r===Hd||r===Gd||r===Wd||r===Xd||r===$d||r===qd)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Ud)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===kd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Fd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Od)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===zd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Bd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===jd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Vd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Hd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Gd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Wd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Xd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===$d)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===qd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===kl||r===Yd||r===Kd)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===kl)return d===Nt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Yd)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Kd)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Sx||r===Jd||r===Zd||r===Qd)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===kl)return l.COMPRESSED_RED_RGTC1_EXT;if(r===Jd)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Zd)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Qd)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Zs?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}const Pw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Lw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const o=new Fn,l=e.properties.get(o);l.__webglTexture=t.texture,(t.depthNear!==r.depthNear||t.depthFar!==r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=o}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new Tr({vertexShader:Pw,fragmentShader:Dw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Xn(new $l(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Iw extends ia{constructor(e,t){super();const r=this;let o=null,l=1,d=null,h="local-floor",f=1,m=null,v=null,_=null,y=null,M=null,b=null;const T=new Lw,S=t.getContextAttributes();let x=null,I=null;const C=[],w=[],D=new Qe;let P=null;const U=new Wn;U.viewport=new Rt;const B=new Wn;B.viewport=new Rt;const L=[U,B],N=new eS;let j=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let pe=C[re];return pe===void 0&&(pe=new ed,C[re]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(re){let pe=C[re];return pe===void 0&&(pe=new ed,C[re]=pe),pe.getGripSpace()},this.getHand=function(re){let pe=C[re];return pe===void 0&&(pe=new ed,C[re]=pe),pe.getHandSpace()};function J(re){const pe=w.indexOf(re.inputSource);if(pe===-1)return;const Me=C[pe];Me!==void 0&&(Me.update(re.inputSource,re.frame,m||d),Me.dispatchEvent({type:re.type,data:re.inputSource}))}function ce(){o.removeEventListener("select",J),o.removeEventListener("selectstart",J),o.removeEventListener("selectend",J),o.removeEventListener("squeeze",J),o.removeEventListener("squeezestart",J),o.removeEventListener("squeezeend",J),o.removeEventListener("end",ce),o.removeEventListener("inputsourceschange",Y);for(let re=0;re<C.length;re++){const pe=w[re];pe!==null&&(w[re]=null,C[re].disconnect(pe))}j=null,ee=null,T.reset(),e.setRenderTarget(x),M=null,y=null,_=null,o=null,I=null,Ue.stop(),r.isPresenting=!1,e.setPixelRatio(P),e.setSize(D.width,D.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){l=re,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){h=re,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||d},this.setReferenceSpace=function(re){m=re},this.getBaseLayer=function(){return y!==null?y:M},this.getBinding=function(){return _},this.getFrame=function(){return b},this.getSession=function(){return o},this.setSession=async function(re){if(o=re,o!==null){if(x=e.getRenderTarget(),o.addEventListener("select",J),o.addEventListener("selectstart",J),o.addEventListener("selectend",J),o.addEventListener("squeeze",J),o.addEventListener("squeezestart",J),o.addEventListener("squeezeend",J),o.addEventListener("end",ce),o.addEventListener("inputsourceschange",Y),S.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(D),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,_e=null,Te=null;S.depth&&(Te=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=S.stencil?Qs:Ws,_e=S.stencil?Zs:ts);const qe={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:l};_=new XRWebGLBinding(o,t),y=_.createProjectionLayer(qe),o.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),I=new ns(y.textureWidth,y.textureHeight,{format:hi,type:Xi,depthTexture:new Ix(y.textureWidth,y.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}else{const Me={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:l};M=new XRWebGLLayer(o,t,Me),o.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),I=new ns(M.framebufferWidth,M.framebufferHeight,{format:hi,type:Xi,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(f),m=null,d=await o.requestReferenceSpace(h),Ue.setContext(o),Ue.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function Y(re){for(let pe=0;pe<re.removed.length;pe++){const Me=re.removed[pe],_e=w.indexOf(Me);_e>=0&&(w[_e]=null,C[_e].disconnect(Me))}for(let pe=0;pe<re.added.length;pe++){const Me=re.added[pe];let _e=w.indexOf(Me);if(_e===-1){for(let qe=0;qe<C.length;qe++)if(qe>=w.length){w.push(Me),_e=qe;break}else if(w[qe]===null){w[qe]=Me,_e=qe;break}if(_e===-1)break}const Te=C[_e];Te&&Te.connect(Me)}}const G=new X,Z=new X;function O(re,pe,Me){G.setFromMatrixPosition(pe.matrixWorld),Z.setFromMatrixPosition(Me.matrixWorld);const _e=G.distanceTo(Z),Te=pe.projectionMatrix.elements,qe=Me.projectionMatrix.elements,Ge=Te[14]/(Te[10]-1),Dt=Te[14]/(Te[10]+1),Lt=(Te[9]+1)/Te[5],dt=(Te[9]-1)/Te[5],H=(Te[8]-1)/Te[0],Sn=(qe[8]+1)/qe[0],gt=Ge*H,ft=Ge*Sn,Ye=_e/(-H+Sn),Ct=Ye*-H;if(pe.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(Ct),re.translateZ(Ye),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Te[10]===-1)re.projectionMatrix.copy(pe.projectionMatrix),re.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const We=Ge+Ye,k=Dt+Ye,A=gt-Ct,ie=ft+(_e-Ct),me=Lt*Dt/k*We,ge=dt*Dt/k*We;re.projectionMatrix.makePerspective(A,ie,me,ge,We,k),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function oe(re,pe){pe===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(pe.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(o===null)return;let pe=re.near,Me=re.far;T.texture!==null&&(T.depthNear>0&&(pe=T.depthNear),T.depthFar>0&&(Me=T.depthFar)),N.near=B.near=U.near=pe,N.far=B.far=U.far=Me,(j!==N.near||ee!==N.far)&&(o.updateRenderState({depthNear:N.near,depthFar:N.far}),j=N.near,ee=N.far),U.layers.mask=re.layers.mask|2,B.layers.mask=re.layers.mask|4,N.layers.mask=U.layers.mask|B.layers.mask;const _e=re.parent,Te=N.cameras;oe(N,_e);for(let qe=0;qe<Te.length;qe++)oe(Te[qe],_e);Te.length===2?O(N,U,B):N.projectionMatrix.copy(U.projectionMatrix),de(re,N,_e)};function de(re,pe,Me){Me===null?re.matrix.copy(pe.matrixWorld):(re.matrix.copy(Me.matrixWorld),re.matrix.invert(),re.matrix.multiply(pe.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(pe.projectionMatrix),re.projectionMatrixInverse.copy(pe.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=eh*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(y===null&&M===null))return f},this.setFoveation=function(re){f=re,y!==null&&(y.fixedFoveation=re),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=re)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(N)};let z=null;function le(re,pe){if(v=pe.getViewerPose(m||d),b=pe,v!==null){const Me=v.views;M!==null&&(e.setRenderTargetFramebuffer(I,M.framebuffer),e.setRenderTarget(I));let _e=!1;Me.length!==N.cameras.length&&(N.cameras.length=0,_e=!0);for(let Ge=0;Ge<Me.length;Ge++){const Dt=Me[Ge];let Lt=null;if(M!==null)Lt=M.getViewport(Dt);else{const H=_.getViewSubImage(y,Dt);Lt=H.viewport,Ge===0&&(e.setRenderTargetTextures(I,H.colorTexture,y.ignoreDepthValues?void 0:H.depthStencilTexture),e.setRenderTarget(I))}let dt=L[Ge];dt===void 0&&(dt=new Wn,dt.layers.enable(Ge),dt.viewport=new Rt,L[Ge]=dt),dt.matrix.fromArray(Dt.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(Dt.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(Lt.x,Lt.y,Lt.width,Lt.height),Ge===0&&(N.matrix.copy(dt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),_e===!0&&N.cameras.push(dt)}const Te=o.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&_){const Ge=_.getDepthInformation(Me[0]);Ge&&Ge.isValid&&Ge.texture&&T.init(e,Ge,o.renderState)}}for(let Me=0;Me<C.length;Me++){const _e=w[Me],Te=C[Me];_e!==null&&Te!==void 0&&Te.update(_e,pe,m||d)}z&&z(re,pe),pe.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:pe}),b=null}const Ue=new Bx;Ue.setAnimationLoop(le),this.setAnimationLoop=function(re){z=re},this.dispose=function(){}}}const $r=new bi,Uw=new Bt;function kw(s,e){function t(S,x){S.matrixAutoUpdate===!0&&S.updateMatrix(),x.value.copy(S.matrix)}function r(S,x){x.color.getRGB(S.fogColor.value,Px(s)),x.isFog?(S.fogNear.value=x.near,S.fogFar.value=x.far):x.isFogExp2&&(S.fogDensity.value=x.density)}function o(S,x,I,C,w){x.isMeshBasicMaterial||x.isMeshLambertMaterial?l(S,x):x.isMeshToonMaterial?(l(S,x),_(S,x)):x.isMeshPhongMaterial?(l(S,x),v(S,x)):x.isMeshStandardMaterial?(l(S,x),y(S,x),x.isMeshPhysicalMaterial&&M(S,x,w)):x.isMeshMatcapMaterial?(l(S,x),b(S,x)):x.isMeshDepthMaterial?l(S,x):x.isMeshDistanceMaterial?(l(S,x),T(S,x)):x.isMeshNormalMaterial?l(S,x):x.isLineBasicMaterial?(d(S,x),x.isLineDashedMaterial&&h(S,x)):x.isPointsMaterial?f(S,x,I,C):x.isSpriteMaterial?m(S,x):x.isShadowMaterial?(S.color.value.copy(x.color),S.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function l(S,x){S.opacity.value=x.opacity,x.color&&S.diffuse.value.copy(x.color),x.emissive&&S.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(S.map.value=x.map,t(x.map,S.mapTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,t(x.alphaMap,S.alphaMapTransform)),x.bumpMap&&(S.bumpMap.value=x.bumpMap,t(x.bumpMap,S.bumpMapTransform),S.bumpScale.value=x.bumpScale,x.side===kn&&(S.bumpScale.value*=-1)),x.normalMap&&(S.normalMap.value=x.normalMap,t(x.normalMap,S.normalMapTransform),S.normalScale.value.copy(x.normalScale),x.side===kn&&S.normalScale.value.negate()),x.displacementMap&&(S.displacementMap.value=x.displacementMap,t(x.displacementMap,S.displacementMapTransform),S.displacementScale.value=x.displacementScale,S.displacementBias.value=x.displacementBias),x.emissiveMap&&(S.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,S.emissiveMapTransform)),x.specularMap&&(S.specularMap.value=x.specularMap,t(x.specularMap,S.specularMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest);const I=e.get(x),C=I.envMap,w=I.envMapRotation;C&&(S.envMap.value=C,$r.copy(w),$r.x*=-1,$r.y*=-1,$r.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&($r.y*=-1,$r.z*=-1),S.envMapRotation.value.setFromMatrix4(Uw.makeRotationFromEuler($r)),S.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=x.reflectivity,S.ior.value=x.ior,S.refractionRatio.value=x.refractionRatio),x.lightMap&&(S.lightMap.value=x.lightMap,S.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,S.lightMapTransform)),x.aoMap&&(S.aoMap.value=x.aoMap,S.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,S.aoMapTransform))}function d(S,x){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,x.map&&(S.map.value=x.map,t(x.map,S.mapTransform))}function h(S,x){S.dashSize.value=x.dashSize,S.totalSize.value=x.dashSize+x.gapSize,S.scale.value=x.scale}function f(S,x,I,C){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,S.size.value=x.size*I,S.scale.value=C*.5,x.map&&(S.map.value=x.map,t(x.map,S.uvTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,t(x.alphaMap,S.alphaMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest)}function m(S,x){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,S.rotation.value=x.rotation,x.map&&(S.map.value=x.map,t(x.map,S.mapTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,t(x.alphaMap,S.alphaMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest)}function v(S,x){S.specular.value.copy(x.specular),S.shininess.value=Math.max(x.shininess,1e-4)}function _(S,x){x.gradientMap&&(S.gradientMap.value=x.gradientMap)}function y(S,x){S.metalness.value=x.metalness,x.metalnessMap&&(S.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,S.metalnessMapTransform)),S.roughness.value=x.roughness,x.roughnessMap&&(S.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,S.roughnessMapTransform)),x.envMap&&(S.envMapIntensity.value=x.envMapIntensity)}function M(S,x,I){S.ior.value=x.ior,x.sheen>0&&(S.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),S.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(S.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,S.sheenColorMapTransform)),x.sheenRoughnessMap&&(S.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,S.sheenRoughnessMapTransform))),x.clearcoat>0&&(S.clearcoat.value=x.clearcoat,S.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(S.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,S.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(S.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===kn&&S.clearcoatNormalScale.value.negate())),x.dispersion>0&&(S.dispersion.value=x.dispersion),x.iridescence>0&&(S.iridescence.value=x.iridescence,S.iridescenceIOR.value=x.iridescenceIOR,S.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(S.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,S.iridescenceMapTransform)),x.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),x.transmission>0&&(S.transmission.value=x.transmission,S.transmissionSamplerMap.value=I.texture,S.transmissionSamplerSize.value.set(I.width,I.height),x.transmissionMap&&(S.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,S.transmissionMapTransform)),S.thickness.value=x.thickness,x.thicknessMap&&(S.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=x.attenuationDistance,S.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(S.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(S.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=x.specularIntensity,S.specularColor.value.copy(x.specularColor),x.specularColorMap&&(S.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,S.specularColorMapTransform)),x.specularIntensityMap&&(S.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,S.specularIntensityMapTransform))}function b(S,x){x.matcap&&(S.matcap.value=x.matcap)}function T(S,x){const I=e.get(x).light;S.referencePosition.value.setFromMatrixPosition(I.matrixWorld),S.nearDistance.value=I.shadow.camera.near,S.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function Fw(s,e,t,r){let o={},l={},d=[];const h=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function f(I,C){const w=C.program;r.uniformBlockBinding(I,w)}function m(I,C){let w=o[I.id];w===void 0&&(b(I),w=v(I),o[I.id]=w,I.addEventListener("dispose",S));const D=C.program;r.updateUBOMapping(I,D);const P=e.render.frame;l[I.id]!==P&&(y(I),l[I.id]=P)}function v(I){const C=_();I.__bindingPointIndex=C;const w=s.createBuffer(),D=I.__size,P=I.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,D,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,C,w),w}function _(){for(let I=0;I<h;I++)if(d.indexOf(I)===-1)return d.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(I){const C=o[I.id],w=I.uniforms,D=I.__cache;s.bindBuffer(s.UNIFORM_BUFFER,C);for(let P=0,U=w.length;P<U;P++){const B=Array.isArray(w[P])?w[P]:[w[P]];for(let L=0,N=B.length;L<N;L++){const j=B[L];if(M(j,P,L,D)===!0){const ee=j.__offset,J=Array.isArray(j.value)?j.value:[j.value];let ce=0;for(let Y=0;Y<J.length;Y++){const G=J[Y],Z=T(G);typeof G=="number"||typeof G=="boolean"?(j.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,ee+ce,j.__data)):G.isMatrix3?(j.__data[0]=G.elements[0],j.__data[1]=G.elements[1],j.__data[2]=G.elements[2],j.__data[3]=0,j.__data[4]=G.elements[3],j.__data[5]=G.elements[4],j.__data[6]=G.elements[5],j.__data[7]=0,j.__data[8]=G.elements[6],j.__data[9]=G.elements[7],j.__data[10]=G.elements[8],j.__data[11]=0):(G.toArray(j.__data,ce),ce+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ee,j.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function M(I,C,w,D){const P=I.value,U=C+"_"+w;if(D[U]===void 0)return typeof P=="number"||typeof P=="boolean"?D[U]=P:D[U]=P.clone(),!0;{const B=D[U];if(typeof P=="number"||typeof P=="boolean"){if(B!==P)return D[U]=P,!0}else if(B.equals(P)===!1)return B.copy(P),!0}return!1}function b(I){const C=I.uniforms;let w=0;const D=16;for(let U=0,B=C.length;U<B;U++){const L=Array.isArray(C[U])?C[U]:[C[U]];for(let N=0,j=L.length;N<j;N++){const ee=L[N],J=Array.isArray(ee.value)?ee.value:[ee.value];for(let ce=0,Y=J.length;ce<Y;ce++){const G=J[ce],Z=T(G),O=w%D,oe=O%Z.boundary,de=O+oe;w+=oe,de!==0&&D-de<Z.storage&&(w+=D-de),ee.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=w,w+=Z.storage}}}const P=w%D;return P>0&&(w+=D-P),I.__size=w,I.__cache={},this}function T(I){const C={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(C.boundary=4,C.storage=4):I.isVector2?(C.boundary=8,C.storage=8):I.isVector3||I.isColor?(C.boundary=16,C.storage=12):I.isVector4?(C.boundary=16,C.storage=16):I.isMatrix3?(C.boundary=48,C.storage=48):I.isMatrix4?(C.boundary=64,C.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),C}function S(I){const C=I.target;C.removeEventListener("dispose",S);const w=d.indexOf(C.__bindingPointIndex);d.splice(w,1),s.deleteBuffer(o[C.id]),delete o[C.id],delete l[C.id]}function x(){for(const I in o)s.deleteBuffer(o[I]);d=[],o={},l={}}return{bind:f,update:m,dispose:x}}class Ow{constructor(e={}){const{canvas:t=Q_(),context:r=null,depth:o=!0,stencil:l=!1,alpha:d=!1,antialias:h=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:y=!1}=e;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=d;const b=new Uint32Array(4),T=new Int32Array(4);let S=null,x=null;const I=[],C=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ei,this.toneMapping=wr,this.toneMappingExposure=1;const w=this;let D=!1,P=0,U=0,B=null,L=-1,N=null;const j=new Rt,ee=new Rt;let J=null;const ce=new yt(0);let Y=0,G=t.width,Z=t.height,O=1,oe=null,de=null;const z=new Rt(0,0,G,Z),le=new Rt(0,0,G,Z);let Ue=!1;const re=new _h;let pe=!1,Me=!1;this.transmissionResolutionScale=1;const _e=new Bt,Te=new Bt,qe=new X,Ge=new Rt,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Lt=!1;function dt(){return B===null?O:1}let H=r;function Sn(R,q){return t.getContext(R,q)}try{const R={alpha:!0,depth:o,stencil:l,antialias:h,premultipliedAlpha:f,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${uh}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",De,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),H===null){const q="webgl2";if(H=Sn(q,R),H===null)throw Sn(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let gt,ft,Ye,Ct,We,k,A,ie,me,ge,he,Xe,Ae,ke,ht,be,Oe,et,nt,ze,pt,st,At,$;function Ce(){gt=new qM(H),gt.init(),st=new Rw(H,gt),ft=new jM(H,gt,e,st),Ye=new Cw(H,gt),ft.reverseDepthBuffer&&y&&Ye.buffers.depth.setReversed(!0),Ct=new JM(H),We=new mw,k=new Nw(H,gt,Ye,We,ft,st,Ct),A=new HM(w),ie=new $M(w),me=new iS(H),At=new zM(H,me),ge=new YM(H,me,Ct,At),he=new QM(H,ge,me,Ct),nt=new ZM(H,ft,k),be=new VM(We),Xe=new pw(w,A,ie,gt,ft,At,be),Ae=new kw(w,We),ke=new gw,ht=new bw(gt),et=new OM(w,A,ie,Ye,he,M,f),Oe=new Tw(w,he,ft),$=new Fw(H,Ct,ft,Ye),ze=new BM(H,gt,Ct),pt=new KM(H,gt,Ct),Ct.programs=Xe.programs,w.capabilities=ft,w.extensions=gt,w.properties=We,w.renderLists=ke,w.shadowMap=Oe,w.state=Ye,w.info=Ct}Ce();const ue=new Iw(w,H);this.xr=ue,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const R=gt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=gt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(R){R!==void 0&&(O=R,this.setSize(G,Z,!1))},this.getSize=function(R){return R.set(G,Z)},this.setSize=function(R,q,se=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=R,Z=q,t.width=Math.floor(R*O),t.height=Math.floor(q*O),se===!0&&(t.style.width=R+"px",t.style.height=q+"px"),this.setViewport(0,0,R,q)},this.getDrawingBufferSize=function(R){return R.set(G*O,Z*O).floor()},this.setDrawingBufferSize=function(R,q,se){G=R,Z=q,O=se,t.width=Math.floor(R*se),t.height=Math.floor(q*se),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(j)},this.getViewport=function(R){return R.copy(z)},this.setViewport=function(R,q,se,te){R.isVector4?z.set(R.x,R.y,R.z,R.w):z.set(R,q,se,te),Ye.viewport(j.copy(z).multiplyScalar(O).round())},this.getScissor=function(R){return R.copy(le)},this.setScissor=function(R,q,se,te){R.isVector4?le.set(R.x,R.y,R.z,R.w):le.set(R,q,se,te),Ye.scissor(ee.copy(le).multiplyScalar(O).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(R){Ye.setScissorTest(Ue=R)},this.setOpaqueSort=function(R){oe=R},this.setTransparentSort=function(R){de=R},this.getClearColor=function(R){return R.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,se=!0){let te=0;if(R){let K=!1;if(B!==null){const Se=B.texture.format;K=Se===xh||Se===mh||Se===ph}if(K){const Se=B.texture.type,Ne=Se===Xi||Se===ts||Se===qa||Se===Zs||Se===hh||Se===fh,Le=et.getClearColor(),Be=et.getClearAlpha(),it=Le.r,tt=Le.g,Ve=Le.b;Ne?(b[0]=it,b[1]=tt,b[2]=Ve,b[3]=Be,H.clearBufferuiv(H.COLOR,0,b)):(T[0]=it,T[1]=tt,T[2]=Ve,T[3]=Be,H.clearBufferiv(H.COLOR,0,T))}else te|=H.COLOR_BUFFER_BIT}q&&(te|=H.DEPTH_BUFFER_BIT),se&&(te|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",De,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),et.dispose(),ke.dispose(),ht.dispose(),We.dispose(),A.dispose(),ie.dispose(),he.dispose(),At.dispose(),$.dispose(),Xe.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",rs),ue.removeEventListener("sessionend",qi),Ei.stop()};function fe(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function De(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const R=Ct.autoReset,q=Oe.enabled,se=Oe.autoUpdate,te=Oe.needsUpdate,K=Oe.type;Ce(),Ct.autoReset=R,Oe.enabled=q,Oe.autoUpdate=se,Oe.needsUpdate=te,Oe.type=K}function Pe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function at(R){const q=R.target;q.removeEventListener("dispose",at),Ut(q)}function Ut(R){Yt(R),We.remove(R)}function Yt(R){const q=We.get(R).programs;q!==void 0&&(q.forEach(function(se){Xe.releaseProgram(se)}),R.isShaderMaterial&&Xe.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,se,te,K,Se){q===null&&(q=Dt);const Ne=K.isMesh&&K.matrixWorld.determinant()<0,Le=io(R,q,se,te,K);Ye.setMaterial(te,Ne);let Be=se.index,it=1;if(te.wireframe===!0){if(Be=ge.getWireframeAttribute(se),Be===void 0)return;it=2}const tt=se.drawRange,Ve=se.attributes.position;let _t=tt.start*it,lt=(tt.start+tt.count)*it;Se!==null&&(_t=Math.max(_t,Se.start*it),lt=Math.min(lt,(Se.start+Se.count)*it)),Be!==null?(_t=Math.max(_t,0),lt=Math.min(lt,Be.count)):Ve!=null&&(_t=Math.max(_t,0),lt=Math.min(lt,Ve.count));const Ht=lt-_t;if(Ht<0||Ht===1/0)return;At.setup(K,te,Le,se,Be);let Ot,St=ze;if(Be!==null&&(Ot=me.get(Be),St=pt,St.setIndex(Ot)),K.isMesh)te.wireframe===!0?(Ye.setLineWidth(te.wireframeLinewidth*dt()),St.setMode(H.LINES)):St.setMode(H.TRIANGLES);else if(K.isLine){let Ke=te.linewidth;Ke===void 0&&(Ke=1),Ye.setLineWidth(Ke*dt()),K.isLineSegments?St.setMode(H.LINES):K.isLineLoop?St.setMode(H.LINE_LOOP):St.setMode(H.LINE_STRIP)}else K.isPoints?St.setMode(H.POINTS):K.isSprite&&St.setMode(H.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)qr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),St.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(gt.get("WEBGL_multi_draw"))St.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Ke=K._multiDrawStarts,Gt=K._multiDrawCounts,vt=K._multiDrawCount,un=Be?me.get(Be).bytesPerElement:1,Ki=We.get(te).currentProgram.getUniforms();for(let bn=0;bn<vt;bn++)Ki.setValue(H,"_gl_DrawID",bn),St.render(Ke[bn]/un,Gt[bn])}else if(K.isInstancedMesh)St.renderInstances(_t,Ht,K.count);else if(se.isInstancedBufferGeometry){const Ke=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Gt=Math.min(se.instanceCount,Ke);St.renderInstances(_t,Ht,Gt)}else St.render(_t,Ht)};function Mt(R,q,se){R.transparent===!0&&R.side===Vi&&R.forceSinglePass===!1?(R.side=kn,R.needsUpdate=!0,ss(R,q,se),R.side=Er,R.needsUpdate=!0,ss(R,q,se),R.side=Vi):ss(R,q,se)}this.compile=function(R,q,se=null){se===null&&(se=R),x=ht.get(se),x.init(q),C.push(x),se.traverseVisible(function(K){K.isLight&&K.layers.test(q.layers)&&(x.pushLight(K),K.castShadow&&x.pushShadow(K))}),R!==se&&R.traverseVisible(function(K){K.isLight&&K.layers.test(q.layers)&&(x.pushLight(K),K.castShadow&&x.pushShadow(K))}),x.setupLights();const te=new Set;return R.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Se=K.material;if(Se)if(Array.isArray(Se))for(let Ne=0;Ne<Se.length;Ne++){const Le=Se[Ne];Mt(Le,se,K),te.add(Le)}else Mt(Se,se,K),te.add(Se)}),x=C.pop(),te},this.compileAsync=function(R,q,se=null){const te=this.compile(R,q,se);return new Promise(K=>{function Se(){if(te.forEach(function(Ne){We.get(Ne).currentProgram.isReady()&&te.delete(Ne)}),te.size===0){K(R);return}setTimeout(Se,10)}gt.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let An=null;function Mn(R){An&&An(R)}function rs(){Ei.stop()}function qi(){Ei.start()}const Ei=new Bx;Ei.setAnimationLoop(Mn),typeof self<"u"&&Ei.setContext(self),this.setAnimationLoop=function(R){An=R,ue.setAnimationLoop(R),R===null?Ei.stop():Ei.start()},ue.addEventListener("sessionstart",rs),ue.addEventListener("sessionend",qi),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(q),q=ue.getCamera()),R.isScene===!0&&R.onBeforeRender(w,R,q,B),x=ht.get(R,C.length),x.init(q),C.push(x),Te.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),re.setFromProjectionMatrix(Te),Me=this.localClippingEnabled,pe=be.init(this.clippingPlanes,Me),S=ke.get(R,I.length),S.init(),I.push(S),ue.enabled===!0&&ue.isPresenting===!0){const Se=w.xr.getDepthSensingMesh();Se!==null&&Ti(Se,q,-1/0,w.sortObjects)}Ti(R,q,0,w.sortObjects),S.finish(),w.sortObjects===!0&&S.sort(oe,de),Lt=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,Lt&&et.addToRenderList(S,R),this.info.render.frame++,pe===!0&&be.beginShadows();const se=x.state.shadowsArray;Oe.render(se,R,q),pe===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=S.opaque,K=S.transmissive;if(x.setupLights(),q.isArrayCamera){const Se=q.cameras;if(K.length>0)for(let Ne=0,Le=Se.length;Ne<Le;Ne++){const Be=Se[Ne];Cr(te,K,R,Be)}Lt&&et.render(R);for(let Ne=0,Le=Se.length;Ne<Le;Ne++){const Be=Se[Ne];Ar(S,R,Be,Be.viewport)}}else K.length>0&&Cr(te,K,R,q),Lt&&et.render(R),Ar(S,R,q);B!==null&&U===0&&(k.updateMultisampleRenderTarget(B),k.updateRenderTargetMipmap(B)),R.isScene===!0&&R.onAfterRender(w,R,q),At.resetDefaultState(),L=-1,N=null,C.pop(),C.length>0?(x=C[C.length-1],pe===!0&&be.setGlobalState(w.clippingPlanes,x.state.camera)):x=null,I.pop(),I.length>0?S=I[I.length-1]:S=null};function Ti(R,q,se,te){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)se=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)x.pushLight(R),R.castShadow&&x.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||re.intersectsSprite(R)){te&&Ge.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Te);const Ne=he.update(R),Le=R.material;Le.visible&&S.push(R,Ne,Le,se,Ge.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||re.intersectsObject(R))){const Ne=he.update(R),Le=R.material;if(te&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ge.copy(R.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Ge.copy(Ne.boundingSphere.center)),Ge.applyMatrix4(R.matrixWorld).applyMatrix4(Te)),Array.isArray(Le)){const Be=Ne.groups;for(let it=0,tt=Be.length;it<tt;it++){const Ve=Be[it],_t=Le[Ve.materialIndex];_t&&_t.visible&&S.push(R,Ne,_t,se,Ge.z,Ve)}}else Le.visible&&S.push(R,Ne,Le,se,Ge.z,null)}}const Se=R.children;for(let Ne=0,Le=Se.length;Ne<Le;Ne++)Ti(Se[Ne],q,se,te)}function Ar(R,q,se,te){const K=R.opaque,Se=R.transmissive,Ne=R.transparent;x.setupLightsView(se),pe===!0&&be.setGlobalState(w.clippingPlanes,se),te&&Ye.viewport(j.copy(te)),K.length>0&&Yi(K,q,se),Se.length>0&&Yi(Se,q,se),Ne.length>0&&Yi(Ne,q,se),Ye.buffers.depth.setTest(!0),Ye.buffers.depth.setMask(!0),Ye.buffers.color.setMask(!0),Ye.setPolygonOffset(!1)}function Cr(R,q,se,te){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;x.state.transmissionRenderTarget[te.id]===void 0&&(x.state.transmissionRenderTarget[te.id]=new ns(1,1,{generateMipmaps:!0,type:gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float")?Ya:Xi,minFilter:es,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Tt.workingColorSpace}));const Se=x.state.transmissionRenderTarget[te.id],Ne=te.viewport||j;Se.setSize(Ne.z*w.transmissionResolutionScale,Ne.w*w.transmissionResolutionScale);const Le=w.getRenderTarget();w.setRenderTarget(Se),w.getClearColor(ce),Y=w.getClearAlpha(),Y<1&&w.setClearColor(16777215,.5),w.clear(),Lt&&et.render(se);const Be=w.toneMapping;w.toneMapping=wr;const it=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),x.setupLightsView(te),pe===!0&&be.setGlobalState(w.clippingPlanes,te),Yi(R,se,te),k.updateMultisampleRenderTarget(Se),k.updateRenderTargetMipmap(Se),gt.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let Ve=0,_t=q.length;Ve<_t;Ve++){const lt=q[Ve],Ht=lt.object,Ot=lt.geometry,St=lt.material,Ke=lt.group;if(St.side===Vi&&Ht.layers.test(te.layers)){const Gt=St.side;St.side=kn,St.needsUpdate=!0,to(Ht,se,te,Ot,St,Ke),St.side=Gt,St.needsUpdate=!0,tt=!0}}tt===!0&&(k.updateMultisampleRenderTarget(Se),k.updateRenderTargetMipmap(Se))}w.setRenderTarget(Le),w.setClearColor(ce,Y),it!==void 0&&(te.viewport=it),w.toneMapping=Be}function Yi(R,q,se){const te=q.isScene===!0?q.overrideMaterial:null;for(let K=0,Se=R.length;K<Se;K++){const Ne=R[K],Le=Ne.object,Be=Ne.geometry,it=te===null?Ne.material:te,tt=Ne.group;Le.layers.test(se.layers)&&to(Le,q,se,Be,it,tt)}}function to(R,q,se,te,K,Se){R.onBeforeRender(w,q,se,te,K,Se),R.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),K.onBeforeRender(w,q,se,te,R,Se),K.transparent===!0&&K.side===Vi&&K.forceSinglePass===!1?(K.side=kn,K.needsUpdate=!0,w.renderBufferDirect(se,q,te,K,R,Se),K.side=Er,K.needsUpdate=!0,w.renderBufferDirect(se,q,te,K,R,Se),K.side=Vi):w.renderBufferDirect(se,q,te,K,R,Se),R.onAfterRender(w,q,se,te,K,Se)}function ss(R,q,se){q.isScene!==!0&&(q=Dt);const te=We.get(R),K=x.state.lights,Se=x.state.shadowsArray,Ne=K.state.version,Le=Xe.getParameters(R,K.state,Se,q,se),Be=Xe.getProgramCacheKey(Le);let it=te.programs;te.environment=R.isMeshStandardMaterial?q.environment:null,te.fog=q.fog,te.envMap=(R.isMeshStandardMaterial?ie:A).get(R.envMap||te.environment),te.envMapRotation=te.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,it===void 0&&(R.addEventListener("dispose",at),it=new Map,te.programs=it);let tt=it.get(Be);if(tt!==void 0){if(te.currentProgram===tt&&te.lightsStateVersion===Ne)return pi(R,Le),tt}else Le.uniforms=Xe.getUniforms(R),R.onBeforeCompile(Le,w),tt=Xe.acquireProgram(Le,Be),it.set(Be,tt),te.uniforms=Le.uniforms;const Ve=te.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ve.clippingPlanes=be.uniform),pi(R,Le),te.needsLights=Yl(R),te.lightsStateVersion=Ne,te.needsLights&&(Ve.ambientLightColor.value=K.state.ambient,Ve.lightProbe.value=K.state.probe,Ve.directionalLights.value=K.state.directional,Ve.directionalLightShadows.value=K.state.directionalShadow,Ve.spotLights.value=K.state.spot,Ve.spotLightShadows.value=K.state.spotShadow,Ve.rectAreaLights.value=K.state.rectArea,Ve.ltc_1.value=K.state.rectAreaLTC1,Ve.ltc_2.value=K.state.rectAreaLTC2,Ve.pointLights.value=K.state.point,Ve.pointLightShadows.value=K.state.pointShadow,Ve.hemisphereLights.value=K.state.hemi,Ve.directionalShadowMap.value=K.state.directionalShadowMap,Ve.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ve.spotShadowMap.value=K.state.spotShadowMap,Ve.spotLightMatrix.value=K.state.spotLightMatrix,Ve.spotLightMap.value=K.state.spotLightMap,Ve.pointShadowMap.value=K.state.pointShadowMap,Ve.pointShadowMatrix.value=K.state.pointShadowMatrix),te.currentProgram=tt,te.uniformsList=null,tt}function no(R){if(R.uniformsList===null){const q=R.currentProgram.getUniforms();R.uniformsList=Fl.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function pi(R,q){const se=We.get(R);se.outputColorSpace=q.outputColorSpace,se.batching=q.batching,se.batchingColor=q.batchingColor,se.instancing=q.instancing,se.instancingColor=q.instancingColor,se.instancingMorph=q.instancingMorph,se.skinning=q.skinning,se.morphTargets=q.morphTargets,se.morphNormals=q.morphNormals,se.morphColors=q.morphColors,se.morphTargetsCount=q.morphTargetsCount,se.numClippingPlanes=q.numClippingPlanes,se.numIntersection=q.numClipIntersection,se.vertexAlphas=q.vertexAlphas,se.vertexTangents=q.vertexTangents,se.toneMapping=q.toneMapping}function io(R,q,se,te,K){q.isScene!==!0&&(q=Dt),k.resetTextureUnits();const Se=q.fog,Ne=te.isMeshStandardMaterial?q.environment:null,Le=B===null?w.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:ea,Be=(te.isMeshStandardMaterial?ie:A).get(te.envMap||Ne),it=te.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,tt=!!se.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Ve=!!se.morphAttributes.position,_t=!!se.morphAttributes.normal,lt=!!se.morphAttributes.color;let Ht=wr;te.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Ht=w.toneMapping);const Ot=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,St=Ot!==void 0?Ot.length:0,Ke=We.get(te),Gt=x.state.lights;if(pe===!0&&(Me===!0||R!==N)){const on=R===N&&te.id===L;be.setState(te,R,on)}let vt=!1;te.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==Gt.state.version||Ke.outputColorSpace!==Le||K.isBatchedMesh&&Ke.batching===!1||!K.isBatchedMesh&&Ke.batching===!0||K.isBatchedMesh&&Ke.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ke.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ke.instancing===!1||!K.isInstancedMesh&&Ke.instancing===!0||K.isSkinnedMesh&&Ke.skinning===!1||!K.isSkinnedMesh&&Ke.skinning===!0||K.isInstancedMesh&&Ke.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ke.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ke.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ke.instancingMorph===!1&&K.morphTexture!==null||Ke.envMap!==Be||te.fog===!0&&Ke.fog!==Se||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==be.numPlanes||Ke.numIntersection!==be.numIntersection)||Ke.vertexAlphas!==it||Ke.vertexTangents!==tt||Ke.morphTargets!==Ve||Ke.morphNormals!==_t||Ke.morphColors!==lt||Ke.toneMapping!==Ht||Ke.morphTargetsCount!==St)&&(vt=!0):(vt=!0,Ke.__version=te.version);let un=Ke.currentProgram;vt===!0&&(un=ss(te,q,K));let Ki=!1,bn=!1,Ai=!1;const Pt=un.getUniforms(),dn=Ke.uniforms;if(Ye.useProgram(un.program)&&(Ki=!0,bn=!0,Ai=!0),te.id!==L&&(L=te.id,bn=!0),Ki||N!==R){Ye.buffers.depth.getReversed()?(_e.copy(R.projectionMatrix),ty(_e),ny(_e),Pt.setValue(H,"projectionMatrix",_e)):Pt.setValue(H,"projectionMatrix",R.projectionMatrix),Pt.setValue(H,"viewMatrix",R.matrixWorldInverse);const tn=Pt.map.cameraPosition;tn!==void 0&&tn.setValue(H,qe.setFromMatrixPosition(R.matrixWorld)),ft.logarithmicDepthBuffer&&Pt.setValue(H,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Pt.setValue(H,"isOrthographic",R.isOrthographicCamera===!0),N!==R&&(N=R,bn=!0,Ai=!0)}if(K.isSkinnedMesh){Pt.setOptional(H,K,"bindMatrix"),Pt.setOptional(H,K,"bindMatrixInverse");const on=K.skeleton;on&&(on.boneTexture===null&&on.computeBoneTexture(),Pt.setValue(H,"boneTexture",on.boneTexture,k))}K.isBatchedMesh&&(Pt.setOptional(H,K,"batchingTexture"),Pt.setValue(H,"batchingTexture",K._matricesTexture,k),Pt.setOptional(H,K,"batchingIdTexture"),Pt.setValue(H,"batchingIdTexture",K._indirectTexture,k),Pt.setOptional(H,K,"batchingColorTexture"),K._colorsTexture!==null&&Pt.setValue(H,"batchingColorTexture",K._colorsTexture,k));const en=se.morphAttributes;if((en.position!==void 0||en.normal!==void 0||en.color!==void 0)&&nt.update(K,se,un),(bn||Ke.receiveShadow!==K.receiveShadow)&&(Ke.receiveShadow=K.receiveShadow,Pt.setValue(H,"receiveShadow",K.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(dn.envMap.value=Be,dn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&q.environment!==null&&(dn.envMapIntensity.value=q.environmentIntensity),bn&&(Pt.setValue(H,"toneMappingExposure",w.toneMappingExposure),Ke.needsLights&&ro(dn,Ai),Se&&te.fog===!0&&Ae.refreshFogUniforms(dn,Se),Ae.refreshMaterialUniforms(dn,te,O,Z,x.state.transmissionRenderTarget[R.id]),Fl.upload(H,no(Ke),dn,k)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Fl.upload(H,no(Ke),dn,k),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Pt.setValue(H,"center",K.center),Pt.setValue(H,"modelViewMatrix",K.modelViewMatrix),Pt.setValue(H,"normalMatrix",K.normalMatrix),Pt.setValue(H,"modelMatrix",K.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const on=te.uniformsGroups;for(let tn=0,bt=on.length;tn<bt;tn++){const mi=on[tn];$.update(mi,un),$.bind(mi,un)}}return un}function ro(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function Yl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(R,q,se){We.get(R.texture).__webglTexture=q,We.get(R.depthTexture).__webglTexture=se;const te=We.get(R);te.__hasExternalTextures=!0,te.__autoAllocateDepthBuffer=se===void 0,te.__autoAllocateDepthBuffer||gt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,q){const se=We.get(R);se.__webglFramebuffer=q,se.__useDefaultFramebuffer=q===void 0};const so=H.createFramebuffer();this.setRenderTarget=function(R,q=0,se=0){B=R,P=q,U=se;let te=!0,K=null,Se=!1,Ne=!1;if(R){const Be=We.get(R);if(Be.__useDefaultFramebuffer!==void 0)Ye.bindFramebuffer(H.FRAMEBUFFER,null),te=!1;else if(Be.__webglFramebuffer===void 0)k.setupRenderTarget(R);else if(Be.__hasExternalTextures)k.rebindTextures(R,We.get(R.texture).__webglTexture,We.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ve=R.depthTexture;if(Be.__boundDepthTexture!==Ve){if(Ve!==null&&We.has(Ve)&&(R.width!==Ve.image.width||R.height!==Ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(R)}}const it=R.texture;(it.isData3DTexture||it.isDataArrayTexture||it.isCompressedArrayTexture)&&(Ne=!0);const tt=We.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(tt[q])?K=tt[q][se]:K=tt[q],Se=!0):R.samples>0&&k.useMultisampledRTT(R)===!1?K=We.get(R).__webglMultisampledFramebuffer:Array.isArray(tt)?K=tt[se]:K=tt,j.copy(R.viewport),ee.copy(R.scissor),J=R.scissorTest}else j.copy(z).multiplyScalar(O).floor(),ee.copy(le).multiplyScalar(O).floor(),J=Ue;if(se!==0&&(K=so),Ye.bindFramebuffer(H.FRAMEBUFFER,K)&&te&&Ye.drawBuffers(R,K),Ye.viewport(j),Ye.scissor(ee),Ye.setScissorTest(J),Se){const Be=We.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+q,Be.__webglTexture,se)}else if(Ne){const Be=We.get(R.texture),it=q;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Be.__webglTexture,se,it)}else if(R!==null&&se!==0){const Be=We.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Be.__webglTexture,se)}L=-1},this.readRenderTargetPixels=function(R,q,se,te,K,Se,Ne){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=We.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ne!==void 0&&(Le=Le[Ne]),Le){Ye.bindFramebuffer(H.FRAMEBUFFER,Le);try{const Be=R.texture,it=Be.format,tt=Be.type;if(!ft.textureFormatReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=R.width-te&&se>=0&&se<=R.height-K&&H.readPixels(q,se,te,K,st.convert(it),st.convert(tt),Se)}finally{const Be=B!==null?We.get(B).__webglFramebuffer:null;Ye.bindFramebuffer(H.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(R,q,se,te,K,Se,Ne){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=We.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ne!==void 0&&(Le=Le[Ne]),Le){const Be=R.texture,it=Be.format,tt=Be.type;if(!ft.textureFormatReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=R.width-te&&se>=0&&se<=R.height-K){Ye.bindFramebuffer(H.FRAMEBUFFER,Le);const Ve=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Ve),H.bufferData(H.PIXEL_PACK_BUFFER,Se.byteLength,H.STREAM_READ),H.readPixels(q,se,te,K,st.convert(it),st.convert(tt),0);const _t=B!==null?We.get(B).__webglFramebuffer:null;Ye.bindFramebuffer(H.FRAMEBUFFER,_t);const lt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await ey(H,lt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Ve),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Se),H.deleteBuffer(Ve),H.deleteSync(lt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,q=null,se=0){R.isTexture!==!0&&(qr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,R=arguments[1]);const te=Math.pow(2,-se),K=Math.floor(R.image.width*te),Se=Math.floor(R.image.height*te),Ne=q!==null?q.x:0,Le=q!==null?q.y:0;k.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,se,0,0,Ne,Le,K,Se),Ye.unbindTexture()};const ao=H.createFramebuffer(),oo=H.createFramebuffer();this.copyTextureToTexture=function(R,q,se=null,te=null,K=0,Se=null){R.isTexture!==!0&&(qr("WebGLRenderer: copyTextureToTexture function signature has changed."),te=arguments[0]||null,R=arguments[1],q=arguments[2],Se=arguments[3]||0,se=null),Se===null&&(K!==0?(qr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Se=K,K=0):Se=0);let Ne,Le,Be,it,tt,Ve,_t,lt,Ht;const Ot=R.isCompressedTexture?R.mipmaps[Se]:R.image;if(se!==null)Ne=se.max.x-se.min.x,Le=se.max.y-se.min.y,Be=se.isBox3?se.max.z-se.min.z:1,it=se.min.x,tt=se.min.y,Ve=se.isBox3?se.min.z:0;else{const en=Math.pow(2,-K);Ne=Math.floor(Ot.width*en),Le=Math.floor(Ot.height*en),R.isDataArrayTexture?Be=Ot.depth:R.isData3DTexture?Be=Math.floor(Ot.depth*en):Be=1,it=0,tt=0,Ve=0}te!==null?(_t=te.x,lt=te.y,Ht=te.z):(_t=0,lt=0,Ht=0);const St=st.convert(q.format),Ke=st.convert(q.type);let Gt;q.isData3DTexture?(k.setTexture3D(q,0),Gt=H.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(k.setTexture2DArray(q,0),Gt=H.TEXTURE_2D_ARRAY):(k.setTexture2D(q,0),Gt=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,q.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,q.unpackAlignment);const vt=H.getParameter(H.UNPACK_ROW_LENGTH),un=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Ki=H.getParameter(H.UNPACK_SKIP_PIXELS),bn=H.getParameter(H.UNPACK_SKIP_ROWS),Ai=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,Ot.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ot.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,it),H.pixelStorei(H.UNPACK_SKIP_ROWS,tt),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Ve);const Pt=R.isDataArrayTexture||R.isData3DTexture,dn=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){const en=We.get(R),on=We.get(q),tn=We.get(en.__renderTarget),bt=We.get(on.__renderTarget);Ye.bindFramebuffer(H.READ_FRAMEBUFFER,tn.__webglFramebuffer),Ye.bindFramebuffer(H.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let mi=0;mi<Be;mi++)Pt&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,We.get(R).__webglTexture,K,Ve+mi),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,We.get(q).__webglTexture,Se,Ht+mi)),H.blitFramebuffer(it,tt,Ne,Le,_t,lt,Ne,Le,H.DEPTH_BUFFER_BIT,H.NEAREST);Ye.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ye.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(K!==0||R.isRenderTargetTexture||We.has(R)){const en=We.get(R),on=We.get(q);Ye.bindFramebuffer(H.READ_FRAMEBUFFER,ao),Ye.bindFramebuffer(H.DRAW_FRAMEBUFFER,oo);for(let tn=0;tn<Be;tn++)Pt?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,en.__webglTexture,K,Ve+tn):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,en.__webglTexture,K),dn?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,on.__webglTexture,Se,Ht+tn):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,on.__webglTexture,Se),K!==0?H.blitFramebuffer(it,tt,Ne,Le,_t,lt,Ne,Le,H.COLOR_BUFFER_BIT,H.NEAREST):dn?H.copyTexSubImage3D(Gt,Se,_t,lt,Ht+tn,it,tt,Ne,Le):H.copyTexSubImage2D(Gt,Se,_t,lt,it,tt,Ne,Le);Ye.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ye.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else dn?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(Gt,Se,_t,lt,Ht,Ne,Le,Be,St,Ke,Ot.data):q.isCompressedArrayTexture?H.compressedTexSubImage3D(Gt,Se,_t,lt,Ht,Ne,Le,Be,St,Ot.data):H.texSubImage3D(Gt,Se,_t,lt,Ht,Ne,Le,Be,St,Ke,Ot):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Se,_t,lt,Ne,Le,St,Ke,Ot.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Se,_t,lt,Ot.width,Ot.height,St,Ot.data):H.texSubImage2D(H.TEXTURE_2D,Se,_t,lt,Ne,Le,St,Ke,Ot);H.pixelStorei(H.UNPACK_ROW_LENGTH,vt),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,un),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Ki),H.pixelStorei(H.UNPACK_SKIP_ROWS,bn),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Ai),Se===0&&q.generateMipmaps&&H.generateMipmap(Gt),Ye.unbindTexture()},this.copyTextureToTexture3D=function(R,q,se=null,te=null,K=0){return R.isTexture!==!0&&(qr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),se=arguments[0]||null,te=arguments[1]||null,R=arguments[2],q=arguments[3],K=arguments[4]||0),qr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,q,se,te,K)},this.initRenderTarget=function(R){We.get(R).__webglFramebuffer===void 0&&k.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?k.setTextureCube(R,0):R.isData3DTexture?k.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?k.setTexture2DArray(R,0):k.setTexture2D(R,0),Ye.unbindTexture()},this.resetState=function(){P=0,U=0,B=null,Ye.reset(),At.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}}const zw=({onClick:s,size:e=56})=>{const t=we.useRef(null),r=we.useRef(!1);return we.useEffect(()=>{const o=t.current;if(!o)return;const l=new Cy,d=new Wn(40,1,.1,100);d.position.set(0,.4,4.2);const h=new Ow({antialias:!0,alpha:!0});h.setSize(e,e),h.setPixelRatio(Math.min(window.devicePixelRatio,2)),h.toneMapping=ux,h.toneMappingExposure=1.2,o.appendChild(h.domElement);const f=new $y({color:16777215,emissive:661807,emissiveIntensity:.08,roughness:.12,metalness:.05,clearcoat:1,clearcoatRoughness:.08,reflectivity:.95,transmission:.05,thickness:.5,specularIntensity:1,specularColor:new yt(14412542)}),m=new Ha,v=new Vl(.72,.55,.9,32,16),_=v.attributes.position;for(let ee=0;ee<_.count;ee++){const J=_.getY(ee),ce=_.getX(ee),Y=_.getZ(ee);if(J>.2){const G=Math.atan2(Y,ce),Z=Math.sin(G*4)*.12,O=Math.max(0,.5-Math.sqrt(ce*ce+Y*Y))*.25;_.setY(ee,J+Z-O)}}v.computeVertexNormals();const y=new Xn(v,f);y.position.y=.35,m.add(y),[[.35,.72,.35],[-.35,.72,.35],[.35,.72,-.35],[-.35,.72,-.35]].forEach(([ee,J,ce])=>{const Y=new Sh(.24,16,16);Y.scale(1,.65,1);const G=new Xn(Y,f);G.position.set(ee,J,ce),m.add(G)});const b=new Vl(.55,.42,.35,24),T=new Xn(b,f);T.position.y=-.15,m.add(T);const S=(ee,J)=>{const ce=new kx([new X(ee*.6,-.25,0),new X(ee*1.1,-.7,J*.05),new X(ee*.85,-1.2,J*.12),new X(ee*.5,-1.55,J*.15)]),Y=new Mh(ce,24,.2,16,!1),G=Y.attributes.position;for(let Z=0;Z<G.count;Z++){const O=G.getY(Z),oe=Math.max(.2,(O+1.6)/1.4);G.setX(Z,G.getX(Z)*oe),G.setZ(Z,G.getZ(Z)*oe)}return Y.computeVertexNormals(),new Xn(Y,f)},x=S(-.28,-1),I=S(.28,1);m.add(x),m.add(I),m.position.y=.2,m.scale.set(1.15,1.15,1.15),l.add(m);const C=new Qy(16777215,1.4);l.add(C);const w=new Pm(2450411,3.5);w.position.set(4,5,4),l.add(w);const D=new Pm(16777215,4);D.position.set(-4,3,-3),l.add(D);const P=new Jy(9684477,2,10);P.position.set(0,-2,3),l.add(P);let U,B=new tS;const L=()=>{U=requestAnimationFrame(L);const ee=B.getElapsedTime();m.position.y=.1+Math.sin(ee*2)*.08,r.current?(m.rotation.y+=.045,m.rotation.x=Math.sin(ee*4)*.15):(m.rotation.y+=.015,m.rotation.x=Math.sin(ee*1.5)*.06),h.render(l,d)};L();const N=()=>{r.current=!0},j=()=>{r.current=!1};return o.addEventListener("mouseenter",N),o.addEventListener("mouseleave",j),()=>{cancelAnimationFrame(U),o.removeEventListener("mouseenter",N),o.removeEventListener("mouseleave",j),o.contains(h.domElement)&&o.removeChild(h.domElement),h.dispose(),v.dispose(),f.dispose()}},[e]),c.jsx("div",{ref:t,onClick:s,className:"relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 group",title:"Dentrix Home / Dashboard",style:{width:e,height:e},children:c.jsx("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-600/20 via-primary-400/20 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none"})})},Bw=({currentRoute:s,onNavigate:e})=>{const[t,r]=we.useState(!1),{currentUser:o,currentTenant:l}=On(),{appointments:d,patients:h}=ti(),f=o.role==="SUPER_ADMIN",m=o.role==="DOCTOR_ADMIN",v=o.permissions.canViewRevenue||f,_=o.permissions.canManageStaff||m||f,y=o.permissions.canManageServices||m||f,M=new Date().toISOString().split("T")[0],b=d.filter(S=>S.date===M).length,T=[{id:"dashboard",label:"Dashboard",icon:o_,badge:null,visible:!0},{id:"appointments",label:"Appointments",icon:m0,badge:b>0?`${b} Today`:null,badgeColor:"bg-primary-100 text-primary-800",visible:!f},{id:"patients",label:"Patients",icon:ch,badge:`${h.length}`,badgeColor:"bg-surface-200 text-slate-700",visible:!f},{id:"revenue",label:"Revenue & Billing",icon:na,badge:null,visible:v},{id:"staff",label:"Staff Management",icon:lh,badge:null,visible:_&&!f},{id:"services",label:"Services Catalog",icon:W0,badge:null,visible:y&&!f},{id:"tenants",label:"Tenant Directory",icon:$s,badge:"Super Admin",badgeColor:"bg-amber-100 text-amber-800 font-semibold",visible:f}];return c.jsxs("aside",{className:`relative flex flex-col bg-white border-r border-border transition-all duration-300 z-30 select-none ${t?"w-20":"w-64"}`,children:[c.jsxs("div",{className:"h-20 flex items-center px-4 border-b border-border/80 justify-between overflow-hidden",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"flex-shrink-0",children:c.jsx(zw,{size:46,onClick:()=>e("dashboard")})}),!t&&c.jsxs("div",{className:"flex flex-col",children:[c.jsxs("span",{className:"font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5",children:["Dentrix",c.jsx("span",{className:"text-[10px] uppercase font-bold tracking-widest bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded border border-primary-200",children:"v2.0"})]}),c.jsx("span",{className:"text-xs text-slate-500 truncate max-w-[140px]",children:f?"Cloud Network Console":(l==null?void 0:l.name)||"Clinic Administration"})]})]}),c.jsx("button",{onClick:()=>r(!t),className:"p-1.5 text-slate-400 hover:text-slate-700 hover:bg-surface-100 rounded-lg transition-colors",title:t?"Expand Sidebar":"Collapse Sidebar",children:t?c.jsx(ih,{size:18}):c.jsx(_0,{size:18})})]}),!t&&c.jsx("div",{className:"px-4 py-2.5 mx-3 my-2 rounded-xl bg-surface-50 border border-slate-200/80 flex items-center justify-between",children:c.jsxs("div",{className:"flex items-center space-x-2 truncate",children:[c.jsx("span",{className:`w-2 h-2 rounded-full ${f?"bg-amber-500 animate-pulse":"bg-clinical-success"}`}),c.jsxs("div",{className:"flex flex-col truncate",children:[c.jsx("span",{className:"text-[11px] font-semibold text-slate-700 truncate",children:f?"Global Multi-Tenant Root":l==null?void 0:l.name}),c.jsx("span",{className:"text-[10px] text-slate-600",children:f?"System Health: 99.98%":`Plan: ${(l==null?void 0:l.plan)||"Active"}`})]})]})}),c.jsx("nav",{className:"flex-1 py-3 px-3 space-y-1.5 overflow-y-auto",children:T.filter(S=>S.visible).map(S=>{const x=S.icon,I=s===S.id;return c.jsxs("button",{onClick:()=>e(S.id),className:`w-full flex items-center rounded-xl transition-all duration-200 group text-sm font-medium ${I?"bg-primary-600 text-white shadow-md shadow-primary-600/25":"text-slate-600 hover:text-slate-900 hover:bg-surface-100"} ${t?"justify-center p-3":"px-3.5 py-2.5 space-x-3"}`,title:t?S.label:void 0,children:[c.jsx(x,{size:20,className:`flex-shrink-0 transition-transform group-hover:scale-110 ${I?"text-white":"text-slate-500 group-hover:text-primary-600"}`}),!t&&c.jsx("span",{className:"flex-1 text-left truncate",children:S.label}),!t&&S.badge&&c.jsx("span",{className:`text-[11px] font-medium px-2 py-0.5 rounded-full ${I?"bg-white/20 text-white":S.badgeColor||"bg-slate-100 text-slate-600"}`,children:S.badge})]},S.id)})}),!t&&o.role==="STAFF"&&c.jsxs("div",{className:"mx-3 mb-2 p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-start space-x-2",children:[c.jsx(l_,{size:16,className:"text-amber-600 flex-shrink-0 mt-0.5"}),c.jsxs("div",{className:"leading-snug",children:[c.jsx("span",{className:"font-semibold block",children:"Scoped Staff Role"}),"Revenue & financial metrics restricted by Clinic Administrator."]})]}),c.jsx("div",{className:"p-3 border-t border-border bg-surface-50/60",children:c.jsxs("div",{className:`flex items-center ${t?"justify-center":"space-x-3"}`,children:[c.jsx("div",{className:"w-10 h-10 rounded-full bg-primary-100 border border-primary-200 text-primary-800 flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0",children:o.name.split(" ").map(S=>S[0]).join("").substring(0,2)}),!t&&c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsx("p",{className:"text-xs font-bold text-slate-900 truncate",children:o.name}),c.jsx("p",{className:"text-[11px] text-slate-500 truncate",children:o.title}),c.jsx("div",{className:"mt-0.5 inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded bg-primary-50 text-primary-700 border border-primary-200",children:o.role.replace("_"," ")})]})]})})]})},jw=({onQuickBook:s})=>{const{currentUser:e,currentTenant:t,allTenants:r,switchRole:o,switchTenant:l}=On(),d=e.role==="SUPER_ADMIN",h=[{role:"SUPER_ADMIN",label:"Super Admin",icon:c_},{role:"DOCTOR_ADMIN",label:"Doctor Admin",icon:oh},{role:"STAFF",label:"Staff (Front Desk)",icon:u_}];return c.jsxs("header",{className:"h-16 bg-white border-b border-border px-6 flex items-center justify-between z-20 sticky top-0 shadow-sm",children:[c.jsxs("div",{className:"flex items-center space-x-4 flex-1 max-w-xl",children:[d?c.jsxs("div",{className:"flex items-center space-x-2 bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-amber-900 shadow-sm",children:[c.jsx(K0,{size:14,className:"text-amber-600 flex-shrink-0"}),c.jsx("span",{children:"Platform Root Console"})]}):c.jsx("div",{className:"relative flex items-center",children:c.jsxs("div",{className:"flex items-center space-x-2 bg-surface-50 border border-slate-200/90 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm",children:[c.jsx(t_,{size:14,className:"text-primary-600 flex-shrink-0"}),c.jsx("select",{"aria-label":"Select Clinic Tenant",value:(t==null?void 0:t.id)||"",onChange:f=>l(f.target.value),className:"bg-transparent border-none focus:outline-none cursor-pointer pr-2 text-slate-800 font-medium",children:r.map(f=>c.jsxs("option",{value:f.id,disabled:f.status==="suspended",children:[f.name," ",f.status==="suspended"?"(Suspended)":""]},f.id))})]})}),c.jsxs("div",{className:"relative flex-1 hidden md:block",children:[c.jsx(Hl,{size:16,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),c.jsx("input",{type:"text",placeholder:"Search patients by name, phone, or CDT code...",className:"w-full bg-surface-50 border border-border/80 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"})]})]}),c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsxs("div",{className:"hidden lg:flex items-center bg-surface-100 p-1 rounded-xl border border-border/60",children:[c.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2",children:"Simulate Role:"}),h.map(({role:f,label:m,icon:v})=>{const _=e.role===f;return c.jsxs("button",{onClick:()=>o(f),className:`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${_?"bg-white text-primary-700 shadow-sm border border-slate-200":"text-slate-600 hover:text-slate-900 hover:bg-white/50"}`,children:[c.jsx(v,{size:14,className:_?"text-primary-600":"text-slate-400"}),c.jsx("span",{children:m})]},f)})]}),!d&&c.jsxs("button",{onClick:s,className:"flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 active:scale-95 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md shadow-primary-600/20 transition-all",children:[c.jsx(qs,{size:16}),c.jsx("span",{className:"hidden sm:inline",children:"Book Appointment"})]}),c.jsx("div",{className:"relative",children:c.jsxs("button",{className:"p-2 text-slate-500 hover:text-slate-800 hover:bg-surface-100 rounded-xl transition-colors relative",title:"Notifications",children:[c.jsx(e_,{size:18}),c.jsx("span",{className:"absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-clinical-danger animate-pulse"})]})})]})]})},vn=({title:s,value:e,subtitle:t,trend:r,icon:o,iconBgColor:l="bg-primary-50",iconColor:d="text-primary-600",className:h="",onClick:f})=>c.jsx("div",{onClick:f,className:`bg-white rounded-2xl p-5 border border-border/80 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 ${f?"cursor-pointer":""} ${h}`,children:c.jsxs("div",{className:"flex items-start justify-between",children:[c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-slate-600 truncate",children:s}),c.jsx("h3",{className:"text-2xl font-extrabold text-slate-900 mt-1 tracking-tight",children:e}),r&&c.jsxs("div",{className:"flex items-center space-x-1.5 mt-2",children:[c.jsxs("span",{className:`text-xs font-bold ${r.isPositive?"text-emerald-600":"text-rose-600"}`,children:[r.isPositive?"↑":"↓"," ",r.value]}),c.jsx("span",{className:"text-[11px] text-slate-600",children:"vs last period"})]}),t&&!r&&c.jsx("p",{className:"text-xs text-slate-600 mt-1.5 truncate",children:t})]}),c.jsx("div",{className:`p-3 rounded-2xl ${l} ${d} flex-shrink-0 shadow-sm`,children:c.jsx(o,{size:24})})]})}),Un=({variant:s="neutral",children:e,className:t="",dot:r=!1})=>{const o={success:"bg-emerald-50 text-emerald-700 border-emerald-200/80",warning:"bg-amber-50 text-amber-800 border-amber-200/80",danger:"bg-rose-50 text-rose-700 border-rose-200/80",info:"bg-sky-50 text-sky-700 border-sky-200/80",neutral:"bg-slate-100 text-slate-700 border-slate-200",primary:"bg-primary-50 text-primary-700 border-primary-200"},l={success:"bg-emerald-500",warning:"bg-amber-500",danger:"bg-rose-500",info:"bg-sky-500",neutral:"bg-slate-400",primary:"bg-primary-600"};return c.jsxs("span",{className:`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${o[s]} ${t}`,children:[r&&c.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${l[s]}`}),e]})},Vw=({onNavigate:s,onBookAppointment:e,onSelectPatient:t})=>{const{currentUser:r,currentTenant:o,allTenants:l}=On(),{appointments:d,patients:h,invoices:f,systemHealth:m,updateAppointmentStatus:v}=ti(),_=r.role==="SUPER_ADMIN",y=r.permissions.canViewRevenue||_,M=new Date().toISOString().split("T")[0],b=d.filter(w=>w.date===M),T=b.reduce((w,D)=>w+D.fee,0),x=f.filter(w=>w.status==="Paid").reduce((w,D)=>w+D.amountPaid,0),I=f.filter(w=>w.status!=="Paid").reduce((w,D)=>w+D.balance,0),C=[{name:"Chair 1 - Hygiene",currentApt:b.find(w=>w.operatoryChair==="Chair 1 - Hygiene"&&w.status==="In-Chair"),nextApt:b.find(w=>w.operatoryChair==="Chair 1 - Hygiene"&&w.status==="Scheduled")},{name:"Chair 2 - Surgery",currentApt:b.find(w=>w.operatoryChair==="Chair 2 - Surgery"&&w.status==="In-Chair"),nextApt:b.find(w=>w.operatoryChair==="Chair 2 - Surgery"&&w.status==="Scheduled")},{name:"Chair 3 - General",currentApt:b.find(w=>w.operatoryChair==="Chair 3 - General"&&w.status==="In-Chair"),nextApt:b.find(w=>w.operatoryChair==="Chair 3 - General"&&w.status==="Scheduled")}];return _?c.jsxs("div",{className:"p-8 space-y-8 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-primary-950 text-white p-7 rounded-3xl shadow-elevation-3",children:[c.jsxs("div",{children:[c.jsxs("div",{className:"inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-amber-500/30",children:[c.jsx(pd,{size:13,className:"animate-pulse"})," Multi-Tenant System Root"]}),c.jsx("h1",{className:"text-2xl font-bold tracking-tight",children:"Super Admin Global Console"}),c.jsx("p",{className:"text-xs text-slate-300 mt-1",children:"Overseeing tenant database partitions, connection pooling, and infrastructure health."})]}),c.jsxs("button",{onClick:()=>s("tenants"),className:"self-start md:self-auto bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-glow-royal transition-all flex items-center gap-2",children:[c.jsx($s,{size:16})," Manage Clinic Tenants"]})]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",children:[c.jsx(vn,{title:"Active Clinic Tenants",value:l.filter(w=>w.status==="active").length,subtitle:`${l.length} Total Provisioned`,icon:$s,iconBgColor:"bg-amber-50",iconColor:"text-amber-700"}),c.jsx(vn,{title:"Database Connection Pools",value:`${m.databasePools.active}/${m.databasePools.max}`,subtitle:`${m.databasePools.idle} Idle connections`,icon:ah,iconBgColor:"bg-sky-50",iconColor:"text-sky-700"}),c.jsx(vn,{title:"Cloud Storage Footprint",value:`${m.storageUsedGb} GB`,subtitle:`of ${m.storageTotalGb} GB Allocated`,icon:I0,iconBgColor:"bg-indigo-50",iconColor:"text-indigo-700"}),c.jsx(vn,{title:"Platform Uptime SLA",value:`${m.uptimePercent}%`,subtitle:"All services operational",icon:pd,iconBgColor:"bg-emerald-50",iconColor:"text-emerald-700"})]}),c.jsxs("div",{className:"bg-white rounded-3xl p-6 border border-border shadow-elevation-1",children:[c.jsxs("div",{className:"flex items-center justify-between mb-5",children:[c.jsxs("div",{children:[c.jsx("h2",{className:"text-base font-bold text-slate-900",children:"Provisioned Dental Tenants"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Logical schema partitions and Doctor Owners"})]}),c.jsxs("button",{onClick:()=>s("tenants"),className:"text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1",children:["View Full Directory ",c.jsx(nm,{size:14})]})]}),c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3 px-4",children:"Clinic Name"}),c.jsx("th",{className:"py-3 px-4",children:"Subdomain / Tenant ID"}),c.jsx("th",{className:"py-3 px-4",children:"Doctor Owner"}),c.jsx("th",{className:"py-3 px-4",children:"Storage"}),c.jsx("th",{className:"py-3 px-4",children:"Plan"}),c.jsx("th",{className:"py-3 px-4",children:"Status"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:l.map(w=>c.jsxs("tr",{className:"hover:bg-surface-50/60",children:[c.jsx("td",{className:"py-3.5 px-4 font-bold text-slate-900",children:w.name}),c.jsxs("td",{className:"py-3.5 px-4 font-mono text-primary-700",children:[w.slug,".dentrix.io"]}),c.jsx("td",{className:"py-3.5 px-4 text-slate-700",children:w.doctorAdminName}),c.jsxs("td",{className:"py-3.5 px-4 text-slate-600",children:[w.storageMb," MB"]}),c.jsx("td",{className:"py-3.5 px-4",children:c.jsx("span",{className:"font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700",children:w.plan})}),c.jsx("td",{className:"py-3.5 px-4",children:c.jsx(Un,{variant:w.status==="active"?"success":"danger",dot:!0,children:w.status.toUpperCase()})})]},w.id))})]})})]})]}):c.jsxs("div",{className:"p-8 space-y-8 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1",children:[c.jsxs("div",{children:[c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-clinical-success animate-pulse"}),c.jsxs("span",{className:"text-xs font-bold text-primary-700 uppercase tracking-wider",children:[o==null?void 0:o.name," — Clinical Operations"]})]}),c.jsxs("h1",{className:"text-2xl font-black text-slate-900 mt-1 tracking-tight",children:["Welcome back, ",r.name]}),c.jsxs("p",{className:"text-xs text-slate-500",children:[new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})," ","• ",b.length," appointments scheduled today"]})]}),c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("button",{onClick:()=>s("appointments"),className:"px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-surface-100 transition-colors",children:"Open Calendar"}),c.jsx("button",{onClick:e,className:"px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md shadow-primary-600/20 transition-all flex items-center gap-1.5",children:"+ Book Appointment"})]})]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",children:[c.jsx(vn,{title:"Today's Appointments",value:b.length,subtitle:`${b.filter(w=>w.status==="Completed").length} completed so far`,icon:m0,iconBgColor:"bg-primary-50",iconColor:"text-primary-600",onClick:()=>s("appointments")}),c.jsx(vn,{title:"Active Patients",value:h.length,trend:{value:"12%",isPositive:!0},icon:ch,iconBgColor:"bg-emerald-50",iconColor:"text-emerald-600",onClick:()=>s("patients")}),y?c.jsxs(c.Fragment,{children:[c.jsx(vn,{title:"Today's Billed Production",value:`$${T.toLocaleString()}`,subtitle:"Mapped from CDT service fees",icon:na,iconBgColor:"bg-sky-50",iconColor:"text-sky-600",onClick:()=>s("revenue")}),c.jsx(vn,{title:"Monthly Collections",value:`$${x.toLocaleString()}`,subtitle:`Pending balance: $${I.toLocaleString()}`,trend:{value:"8.4%",isPositive:!0},icon:Q0,iconBgColor:"bg-amber-50",iconColor:"text-amber-600",onClick:()=>s("revenue")})]}):c.jsxs("div",{className:"sm:col-span-2 p-5 bg-surface-50 border border-border rounded-2xl flex items-center space-x-3 text-slate-500",children:[c.jsx(M0,{size:20,className:"text-amber-500 flex-shrink-0"}),c.jsxs("div",{className:"text-xs",children:[c.jsx("span",{className:"font-bold text-slate-700 block",children:"Financial Access Scoped"}),"Revenue and billing reports are restricted by your Clinic Administrator."]})]})]}),c.jsxs("div",{children:[c.jsxs("div",{className:"flex items-center justify-between mb-4",children:[c.jsxs("h2",{className:"text-base font-bold text-slate-900 flex items-center gap-2",children:[c.jsx(Ol,{size:18,className:"text-primary-600"}),"Live Operatory Chair Status"]}),c.jsx("span",{className:"text-xs text-slate-600 font-medium",children:"Real-time operatory flow"})]}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:C.map(w=>c.jsxs("div",{className:"bg-white rounded-3xl p-5 border border-border shadow-elevation-1 flex flex-col justify-between",children:[c.jsxs("div",{children:[c.jsxs("div",{className:"flex items-center justify-between mb-3",children:[c.jsx("span",{className:"font-bold text-sm text-slate-900",children:w.name}),c.jsx(Un,{variant:w.currentApt?"danger":"success",dot:!0,children:w.currentApt?"IN-CHAIR":"CHAIR VACANT"})]}),w.currentApt?c.jsxs("div",{className:"p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl space-y-2",children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsx("span",{className:"text-xs font-bold text-slate-900",children:w.currentApt.patientName}),c.jsxs("span",{className:"text-[11px] font-mono font-semibold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200",children:[w.currentApt.startTime," - ",w.currentApt.endTime]})]}),c.jsxs("p",{className:"text-xs text-slate-600",children:[w.currentApt.serviceName," (",w.currentApt.procedureCode,")"]}),c.jsxs("div",{className:"pt-1 flex items-center justify-between",children:[c.jsxs("span",{className:"text-[11px] text-slate-600",children:["Provider: ",w.currentApt.doctorName]}),c.jsx("button",{onClick:()=>v(w.currentApt.id,"Completed"),className:"text-[11px] font-bold text-emerald-700 bg-white hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors shadow-sm",children:"Mark Done"})]})]}):c.jsx("div",{className:"p-4 bg-surface-50 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-600",children:"No patient currently in operatory chair."})]}),c.jsxs("div",{className:"mt-4 pt-3 border-t border-border flex items-center justify-between text-xs",children:[c.jsx("span",{className:"text-slate-600",children:"Next Patient:"}),w.nextApt?c.jsxs("span",{className:"font-semibold text-primary-700 truncate max-w-[170px]",children:[w.nextApt.startTime," — ",w.nextApt.patientName]}):c.jsx("span",{className:"text-slate-600 italic",children:"No scheduled patients"})]})]},w.name))})]}),c.jsxs("div",{className:"bg-white rounded-3xl p-6 border border-border shadow-elevation-1",children:[c.jsxs("div",{className:"flex items-center justify-between mb-5",children:[c.jsxs("div",{children:[c.jsx("h2",{className:"text-base font-bold text-slate-900",children:"Today's Appointment Schedule"}),c.jsxs("p",{className:"text-xs text-slate-500",children:["Live clinical appointments for ",M]})]}),c.jsxs("button",{onClick:()=>s("appointments"),className:"text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1",children:["Full Calendar View ",c.jsx(nm,{size:14})]})]}),b.length===0?c.jsx("div",{className:"text-center py-10 text-xs text-slate-400",children:'No appointments scheduled for today. Click "Book Appointment" to schedule.'}):c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3 px-4",children:"Time"}),c.jsx("th",{className:"py-3 px-4",children:"Patient"}),c.jsx("th",{className:"py-3 px-4",children:"Dental Procedure"}),c.jsx("th",{className:"py-3 px-4",children:"Operatory"}),c.jsx("th",{className:"py-3 px-4",children:"Provider"}),c.jsx("th",{className:"py-3 px-4",children:"Status"}),c.jsx("th",{className:"py-3 px-4 text-right",children:"Quick Action"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:b.map(w=>{const D=P=>{switch(P){case"Completed":return"success";case"In-Chair":return"danger";case"Scheduled":return"info";default:return"neutral"}};return c.jsxs("tr",{className:"hover:bg-surface-50/60",children:[c.jsxs("td",{className:"py-3 px-4 font-mono font-bold text-slate-900",children:[w.startTime," - ",w.endTime]}),c.jsx("td",{className:"py-3 px-4 font-bold text-primary-700 hover:underline cursor-pointer",onClick:()=>t(w.patientId),children:w.patientName}),c.jsxs("td",{className:"py-3 px-4 text-slate-700",children:[c.jsxs("span",{className:"font-mono text-slate-500 mr-1",children:["[",w.procedureCode,"]"]}),w.serviceName]}),c.jsx("td",{className:"py-3 px-4 text-slate-600",children:w.operatoryChair}),c.jsx("td",{className:"py-3 px-4 text-slate-600",children:w.doctorName}),c.jsx("td",{className:"py-3 px-4",children:c.jsx(Un,{variant:D(w.status),dot:!0,children:w.status})}),c.jsx("td",{className:"py-3 px-4 text-right",children:c.jsxs("select",{value:w.status,onChange:P=>v(w.id,P.target.value),className:"bg-surface-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none",children:[c.jsx("option",{value:"Scheduled",children:"Scheduled"}),c.jsx("option",{value:"In-Chair",children:"In-Chair"}),c.jsx("option",{value:"Completed",children:"Completed"}),c.jsx("option",{value:"Cancelled",children:"Cancelled"}),c.jsx("option",{value:"No-Show",children:"No-Show"})]})})]},w.id)})})]})})]})]})},Hw=({onBookAppointment:s,onSelectPatient:e})=>{const{appointments:t,updateAppointmentStatus:r}=ti(),[o,l]=we.useState(()=>new Date().toISOString().split("T")[0]),[d,h]=we.useState("All"),[f,m]=we.useState("chairs"),v=t.filter(x=>{const I=x.date===o,C=d==="All"||x.operatoryChair===d;return I&&C}),_=["Chair 1 - Hygiene","Chair 2 - Surgery","Chair 3 - General"],y=["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"],M=()=>{const x=new Date(o);x.setDate(x.getDate()-1),l(x.toISOString().split("T")[0])},b=()=>{const x=new Date(o);x.setDate(x.getDate()+1),l(x.toISOString().split("T")[0])},T=()=>{l(new Date().toISOString().split("T")[0])},S=x=>{switch(x){case"Completed":return c.jsx(Un,{variant:"success",dot:!0,children:"Completed"});case"In-Chair":return c.jsx(Un,{variant:"danger",dot:!0,children:"In-Chair"});case"Scheduled":return c.jsx(Un,{variant:"info",dot:!0,children:"Scheduled"});case"Cancelled":return c.jsx(Un,{variant:"neutral",children:"Cancelled"});case"No-Show":return c.jsx(Un,{variant:"warning",children:"No-Show"})}};return c.jsxs("div",{className:"p-8 space-y-6 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-border shadow-elevation-1",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"p-3 bg-primary-50 text-primary-700 rounded-2xl",children:c.jsx($a,{size:24})}),c.jsxs("div",{children:[c.jsx("h1",{className:"text-xl font-bold text-slate-900",children:"Appointment Scheduling Engine"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Operatory chair assignment, doctor mapping, and patient flow."})]})]}),c.jsxs("div",{className:"flex items-center flex-wrap gap-2.5",children:[c.jsxs("div",{className:"flex items-center bg-surface-50 border border-border rounded-2xl p-1",children:[c.jsx("button",{onClick:M,className:"p-1.5 hover:bg-white rounded-xl text-slate-600 transition-colors",title:"Previous Day",children:c.jsx(_0,{size:16})}),c.jsx("button",{onClick:T,className:"px-3 py-1 text-xs font-bold text-primary-700 hover:bg-white rounded-xl transition-colors",children:"Today"}),c.jsx("input",{type:"date",value:o,onChange:x=>l(x.target.value),className:"bg-transparent text-xs font-semibold text-slate-800 px-2 border-none focus:outline-none cursor-pointer"}),c.jsx("button",{onClick:b,className:"p-1.5 hover:bg-white rounded-xl text-slate-600 transition-colors",title:"Next Day",children:c.jsx(ih,{size:16})})]}),c.jsxs("div",{className:"flex items-center bg-surface-100 p-1 rounded-2xl border border-border",children:[c.jsx("button",{onClick:()=>m("chairs"),className:`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${f==="chairs"?"bg-white text-primary-700 shadow-sm":"text-slate-600 hover:text-slate-900"}`,children:"Chair Columns"}),c.jsx("button",{onClick:()=>m("day"),className:`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${f==="day"?"bg-white text-primary-700 shadow-sm":"text-slate-600 hover:text-slate-900"}`,children:"Hourly Timeline"}),c.jsx("button",{onClick:()=>m("list"),className:`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${f==="list"?"bg-white text-primary-700 shadow-sm":"text-slate-600 hover:text-slate-900"}`,children:"List View"})]}),c.jsxs("button",{onClick:s,className:"flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all",children:[c.jsx(qs,{size:16}),c.jsx("span",{children:"Book Appointment"})]})]})]}),c.jsxs("div",{className:"flex items-center gap-2 overflow-x-auto pb-1",children:[c.jsxs("span",{className:"text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1",children:[c.jsx(a_,{size:13})," Filter Chair:"]}),["All",..._].map(x=>c.jsx("button",{onClick:()=>h(x),className:`px-3 py-1 rounded-full text-xs font-semibold transition-all ${d===x?"bg-primary-600 text-white shadow-sm":"bg-white border border-border text-slate-600 hover:bg-surface-100"}`,children:x},x))]}),f==="chairs"&&c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:_.filter(x=>d==="All"||d===x).map(x=>{const I=t.filter(C=>C.date===o&&C.operatoryChair===x).sort((C,w)=>C.startTime.localeCompare(w.startTime));return c.jsxs("div",{className:"bg-white rounded-3xl border border-border p-5 shadow-elevation-1 flex flex-col min-h-[550px]",children:[c.jsx("div",{className:"flex items-center justify-between pb-3 mb-4 border-b border-border",children:c.jsxs("div",{className:"flex items-center space-x-2",children:[c.jsx("div",{className:"p-2 rounded-xl bg-primary-50 text-primary-600",children:c.jsx(Ol,{size:18})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-sm font-bold text-slate-900",children:x}),c.jsxs("span",{className:"text-[11px] text-slate-500",children:[I.length," appointments scheduled"]})]})]})}),c.jsx("div",{className:"space-y-3.5 flex-1 overflow-y-auto pr-1",children:I.length===0?c.jsxs("div",{className:"h-48 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs",children:[c.jsx(Ol,{size:28,className:"mb-2 text-slate-300"}),"No appointments booked for this chair on ",o,"."]}):I.map(C=>c.jsxs("div",{className:"bg-surface-50 hover:bg-primary-50/40 p-4 rounded-2xl border border-slate-200/80 transition-all space-y-2.5 shadow-sm",children:[c.jsxs("div",{className:"flex items-start justify-between gap-2",children:[c.jsxs("span",{className:"font-mono text-xs font-extrabold text-primary-700 bg-white px-2.5 py-0.5 rounded-lg border border-primary-100 shadow-sm",children:[C.startTime," - ",C.endTime]}),S(C.status)]}),c.jsxs("div",{children:[c.jsx("button",{onClick:()=>e(C.patientId),className:"font-bold text-sm text-slate-900 hover:text-primary-700 text-left block transition-colors",children:C.patientName}),c.jsxs("p",{className:"text-xs text-slate-600 mt-0.5",children:[c.jsxs("span",{className:"font-mono font-semibold text-slate-500",children:["[",C.procedureCode,"]"]})," ",C.serviceName]})]}),c.jsxs("div",{className:"flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60",children:[c.jsxs("span",{className:"truncate",children:["Dr: ",C.doctorName]}),c.jsxs("span",{className:"font-bold text-slate-800",children:["$",C.fee]})]}),c.jsx("div",{className:"flex items-center gap-1.5 pt-1",children:["Scheduled","In-Chair","Completed"].map(w=>c.jsx("button",{onClick:()=>r(C.id,w),className:`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all ${C.status===w?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-600 border-slate-200 hover:bg-slate-100"}`,children:w},w))})]},C.id))})]},x)})}),f==="day"&&c.jsx("div",{className:"bg-white rounded-3xl border border-border p-6 shadow-elevation-1 overflow-x-auto",children:c.jsx("div",{className:"min-w-[700px] divide-y divide-border",children:y.map(x=>{const I=t.filter(C=>C.date===o&&C.startTime.startsWith(x.split(":")[0]));return c.jsxs("div",{className:"py-3 flex items-start space-x-6",children:[c.jsx("div",{className:"w-16 flex-shrink-0 font-mono text-xs font-bold text-slate-500 pt-1",children:x}),c.jsx("div",{className:"flex-1 min-h-[44px] flex items-center flex-wrap gap-3",children:I.length===0?c.jsx("span",{className:"text-xs text-slate-300 italic",children:"No appointments"}):I.map(C=>c.jsxs("div",{className:"bg-primary-50 border border-primary-200 px-3 py-2 rounded-xl text-xs flex items-center space-x-3 shadow-sm",children:[c.jsx("span",{className:"font-mono font-bold text-primary-800",children:C.startTime}),c.jsx("span",{onClick:()=>e(C.patientId),className:"font-bold text-slate-900 hover:underline cursor-pointer",children:C.patientName}),c.jsx("span",{className:"text-slate-600 truncate max-w-[200px]",children:C.serviceName}),c.jsx("span",{className:"text-slate-500 text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200",children:C.operatoryChair}),S(C.status)]},C.id))})]},x)})})}),f==="list"&&c.jsx("div",{className:"bg-white rounded-3xl border border-border p-6 shadow-elevation-1 overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3 px-4",children:"Time"}),c.jsx("th",{className:"py-3 px-4",children:"Patient"}),c.jsx("th",{className:"py-3 px-4",children:"Service / CDT"}),c.jsx("th",{className:"py-3 px-4",children:"Operatory"}),c.jsx("th",{className:"py-3 px-4",children:"Doctor"}),c.jsx("th",{className:"py-3 px-4",children:"Fee"}),c.jsx("th",{className:"py-3 px-4",children:"Status"}),c.jsx("th",{className:"py-3 px-4",children:"Update Status"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:v.map(x=>c.jsxs("tr",{className:"hover:bg-surface-50/60",children:[c.jsxs("td",{className:"py-3.5 px-4 font-mono font-bold text-slate-900",children:[x.startTime," - ",x.endTime]}),c.jsx("td",{onClick:()=>e(x.patientId),className:"py-3.5 px-4 font-bold text-primary-700 hover:underline cursor-pointer",children:x.patientName}),c.jsxs("td",{className:"py-3.5 px-4 text-slate-700",children:[c.jsxs("span",{className:"font-mono text-slate-500 mr-1",children:["[",x.procedureCode,"]"]}),x.serviceName]}),c.jsx("td",{className:"py-3.5 px-4 text-slate-600",children:x.operatoryChair}),c.jsx("td",{className:"py-3.5 px-4 text-slate-600",children:x.doctorName}),c.jsxs("td",{className:"py-3.5 px-4 font-bold text-slate-900",children:["$",x.fee]}),c.jsx("td",{className:"py-3.5 px-4",children:S(x.status)}),c.jsx("td",{className:"py-3.5 px-4",children:c.jsxs("select",{value:x.status,onChange:I=>r(x.id,I.target.value),className:"bg-surface-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700",children:[c.jsx("option",{value:"Scheduled",children:"Scheduled"}),c.jsx("option",{value:"In-Chair",children:"In-Chair"}),c.jsx("option",{value:"Completed",children:"Completed"}),c.jsx("option",{value:"Cancelled",children:"Cancelled"}),c.jsx("option",{value:"No-Show",children:"No-Show"})]})})]},x.id))})]})})]})},Gw=({onSelectPatient:s,onOpenAddPatient:e})=>{const{patients:t}=ti(),[r,o]=we.useState(""),[l,d]=we.useState(!1),h=t.filter(f=>{const m=r.toLowerCase(),v=f.firstName.toLowerCase().includes(m)||f.lastName.toLowerCase().includes(m)||f.phone.includes(m)||f.insurance.provider.toLowerCase().includes(m),_=!l||f.medicalAlerts.length>0;return v&&_});return c.jsxs("div",{className:"p-8 space-y-6 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-border shadow-elevation-1",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"p-3 bg-primary-50 text-primary-700 rounded-2xl",children:c.jsx(ch,{size:24})}),c.jsxs("div",{children:[c.jsx("h1",{className:"text-xl font-bold text-slate-900",children:"Master Patient Directory"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Manage clinical demographics, insurance policies, and clinical medical histories."})]})]}),c.jsxs("button",{onClick:e,className:"flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all",children:[c.jsx(Wl,{size:16}),c.jsx("span",{children:"Register New Patient"})]})]}),c.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 items-center justify-between",children:[c.jsxs("div",{className:"relative flex-1 w-full max-w-md",children:[c.jsx(Hl,{size:16,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),c.jsx("input",{type:"text",placeholder:"Search by name, phone, or insurance provider...",value:r,onChange:f=>o(f.target.value),className:"w-full bg-white border border-border rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600 shadow-sm"})]}),c.jsx("div",{className:"flex items-center gap-2",children:c.jsxs("button",{onClick:()=>d(!l),className:`flex items-center space-x-1.5 px-3 py-2 rounded-2xl text-xs font-semibold border transition-all ${l?"bg-rose-50 border-rose-300 text-rose-700 shadow-sm":"bg-white border-border text-slate-600 hover:bg-surface-50"}`,children:[c.jsx(tx,{size:14,className:l?"text-rose-600":"text-slate-400"}),c.jsxs("span",{children:["High Risk / Medical Alerts (",t.filter(f=>f.medicalAlerts.length>0).length,")"]})]})})]}),c.jsx("div",{className:"bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden",children:c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-b border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3.5 px-5",children:"Patient Name"}),c.jsx("th",{className:"py-3.5 px-5",children:"Contact Details"}),c.jsx("th",{className:"py-3.5 px-5",children:"Insurance Coverage"}),c.jsx("th",{className:"py-3.5 px-5",children:"Medical Alerts & Risk"}),c.jsx("th",{className:"py-3.5 px-5",children:"Account Balance"}),c.jsx("th",{className:"py-3.5 px-5",children:"Last Visit"}),c.jsx("th",{className:"py-3.5 px-5 text-right",children:"Actions"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:h.map(f=>c.jsxs("tr",{onClick:()=>s(f.id),className:"hover:bg-primary-50/30 cursor-pointer transition-colors group",children:[c.jsx("td",{className:"py-4 px-5",children:c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsxs("div",{className:"w-9 h-9 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-xs shadow-sm",children:[f.firstName[0],f.lastName[0]]}),c.jsxs("div",{children:[c.jsxs("span",{className:"font-bold text-sm text-slate-900 group-hover:text-primary-600 transition-colors",children:[f.firstName," ",f.lastName]}),c.jsxs("p",{className:"text-[11px] text-slate-500",children:["DOB: ",f.dateOfBirth," (",f.gender,")"]})]})]})}),c.jsxs("td",{className:"py-4 px-5 text-slate-600 space-y-0.5",children:[c.jsxs("div",{className:"flex items-center space-x-1.5 text-slate-800 font-medium",children:[c.jsx(j0,{size:12,className:"text-slate-400"}),c.jsx("span",{children:f.phone})]}),c.jsxs("div",{className:"flex items-center space-x-1.5 text-[11px] text-slate-500 truncate max-w-[170px]",children:[c.jsx(z0,{size:12,className:"text-slate-400"}),c.jsx("span",{className:"truncate",children:f.email})]})]}),c.jsxs("td",{className:"py-4 px-5",children:[c.jsxs("div",{className:"flex items-center space-x-1.5 font-medium text-slate-800",children:[c.jsx(Gl,{size:13,className:"text-primary-600 flex-shrink-0"}),c.jsx("span",{className:"truncate",children:f.insurance.provider})]}),c.jsxs("span",{className:"text-[11px] font-mono text-slate-400 block",children:["ID: ",f.insurance.policyNumber]})]}),c.jsx("td",{className:"py-4 px-5",children:f.medicalAlerts.length>0?c.jsx("div",{className:"flex flex-wrap gap-1 max-w-[200px]",children:f.medicalAlerts.map(m=>c.jsx("span",{className:"bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full",children:m},m))}):c.jsx("span",{className:"text-slate-400 text-[11px] italic",children:"No active alerts"})}),c.jsx("td",{className:"py-4 px-5 font-semibold",children:f.balance>0?c.jsxs("span",{className:"text-rose-600 font-bold",children:["$",f.balance," Due"]}):c.jsx("span",{className:"text-emerald-600 font-semibold",children:"$0.00 (Current)"})}),c.jsx("td",{className:"py-4 px-5 text-slate-500 font-mono text-[11px]",children:f.lastVisit||"First Visit"}),c.jsx("td",{className:"py-4 px-5 text-right",children:c.jsxs("div",{className:"inline-flex items-center text-primary-600 group-hover:translate-x-1 transition-transform",children:[c.jsx("span",{className:"text-xs font-bold mr-1",children:"Chart"}),c.jsx(ih,{size:16})]})})]},f.id))})]})})})]})},Ww=({isOpen:s,onClose:e,patient:t})=>{var P;const{addClinicalNote:r,services:o}=ti(),{currentUser:l}=On(),[d,h]=we.useState("#19 (Mandibular Left First Molar)"),[f,m]=we.useState(((P=o[0])==null?void 0:P.name)||"Periodic Oral Evaluation"),[v,_]=we.useState(""),[y,M]=we.useState(""),[b,T]=we.useState(""),[S,x]=we.useState("120/80 mmHg"),[I,C]=we.useState("72 bpm");if(!s)return null;const w=U=>{U.preventDefault(),r({patientId:t.id,doctorId:l.id,doctorName:l.name,date:new Date().toISOString().split("T")[0],toothNumber:d,procedureName:f,diagnosis:v||"Clinical assessment and preventive intervention",notes:y,treatmentPlanSummary:b,vitals:{bloodPressure:S,pulseRate:I},doctorSignature:`${l.name} (License verified)`}),e()},D=["Full Mouth / Preventive","#1 (Maxillary Right 3rd Molar)","#2 (Maxillary Right 2nd Molar)","#3 (Maxillary Right 1st Molar)","#8 (Maxillary Right Central Incisor)","#9 (Maxillary Left Central Incisor)","#14 (Maxillary Left 1st Molar)","#19 (Mandibular Left 1st Molar)","#20 (Mandibular Left 2nd Premolar)","#24 (Mandibular Left Central Incisor)","#25 (Mandibular Right Central Incisor)","#30 (Mandibular Right 1st Molar)","#31 (Mandibular Right 2nd Molar)","#32 (Mandibular Right 3rd Molar)"];return c.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn",children:c.jsxs("div",{className:"bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[92vh]",children:[c.jsxs("div",{className:"px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"p-2 rounded-xl bg-primary-100 text-primary-700",children:c.jsx(P0,{size:20})}),c.jsxs("div",{children:[c.jsx("h2",{className:"text-lg font-bold text-slate-900",children:"Add Clinical Doctor Note"}),c.jsxs("p",{className:"text-xs text-slate-500",children:["Patient: ",c.jsxs("span",{className:"font-semibold text-slate-800",children:[t.firstName," ",t.lastName]})]})]})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors",children:c.jsx(is,{size:20})})]}),c.jsxs("form",{onSubmit:w,className:"p-6 space-y-4 overflow-y-auto flex-1",children:[c.jsxs("div",{className:"p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100 grid grid-cols-2 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-[11px] font-bold uppercase tracking-wider text-sky-900 mb-1",children:"Blood Pressure"}),c.jsx("input",{type:"text",value:S,onChange:U=>x(U.target.value),placeholder:"120/80 mmHg",className:"w-full bg-white border border-sky-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-[11px] font-bold uppercase tracking-wider text-sky-900 mb-1",children:"Pulse / Heart Rate"}),c.jsx("input",{type:"text",value:I,onChange:U=>C(U.target.value),placeholder:"72 bpm",className:"w-full bg-white border border-sky-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"})]})]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Tooth Location / Arch"}),c.jsx("select",{value:d,onChange:U=>h(U.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",children:D.map(U=>c.jsx("option",{value:U,children:U},U))})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Clinical Procedure"}),c.jsx("select",{value:f,onChange:U=>m(U.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",children:o.map(U=>c.jsxs("option",{value:`${U.name} (${U.code})`,children:["[",U.code,"] ",U.name]},U.id))})]})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Clinical Diagnosis & Assessment"}),c.jsx("input",{type:"text",required:!0,value:v,onChange:U=>_(U.target.value),placeholder:"e.g. Recurrent secondary caries on distal margin, Class II restoration failure...",className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Operative Notes & Anesthesia Protocol"}),c.jsx("textarea",{rows:4,required:!0,value:y,onChange:U=>M(U.target.value),placeholder:"Detail local anesthetic delivered (agent, epi concentration, carpules), isolation method, caries excavation, bonding system, restorative material, occlusion verification, and patient post-op tolerance...",className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 font-mono"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Next Visit / Treatment Plan Recommendations"}),c.jsx("input",{type:"text",value:b,onChange:U=>T(U.target.value),placeholder:"e.g. Follow up in 2 weeks for core build-up and crown prep on tooth #19.",className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{className:"p-3 bg-surface-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs",children:[c.jsxs("div",{className:"flex items-center space-x-2 text-emerald-700",children:[c.jsx(rh,{size:16}),c.jsx("span",{className:"font-semibold",children:"Electronic Doctor Signature Verification"})]}),c.jsx("span",{className:"font-mono text-slate-700 font-bold",children:l.name})]}),c.jsxs("div",{className:"pt-3 border-t border-border flex items-center justify-end space-x-3",children:[c.jsx("button",{type:"button",onClick:e,className:"px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl",children:"Cancel"}),c.jsx("button",{type:"submit",className:"px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25",children:"Sign & Lock Clinical Note"})]})]})]})})},Xw=({patientId:s,onBack:e,onBookAppointment:t})=>{const{patients:r,clinicalNotes:o,appointments:l,invoices:d}=ti(),{currentUser:h}=On(),[f,m]=we.useState("notes"),[v,_]=we.useState(!1),[y,M]=we.useState(19),b=r.find(D=>D.id===s)||r[0];if(!b)return c.jsx("div",{className:"p-8",children:"Patient not found."});const T=o.filter(D=>D.patientId===b.id).sort((D,P)=>P.signedAt.localeCompare(D.signedAt)),S=l.filter(D=>D.patientId===b.id).sort((D,P)=>P.date.localeCompare(D.date)),x=d.filter(D=>D.patientId===b.id),I=h.permissions.canWriteDoctorNotes||h.role==="DOCTOR_ADMIN",C=Array.from({length:16},(D,P)=>P+1),w=Array.from({length:16},(D,P)=>32-P);return c.jsxs("div",{className:"p-8 space-y-6 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsxs("button",{onClick:e,className:"flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-2xl border border-border transition-all shadow-sm",children:[c.jsx(Qv,{size:16}),c.jsx("span",{children:"Back to Directory"})]}),c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsxs("button",{onClick:()=>t(b.id),className:"flex items-center space-x-1.5 bg-white hover:bg-surface-50 text-slate-800 border border-border px-4 py-2 rounded-2xl text-xs font-bold shadow-sm transition-all",children:[c.jsx($a,{size:15}),c.jsx("span",{children:"Schedule Visit"})]}),I&&c.jsxs("button",{onClick:()=>_(!0),className:"flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/25 transition-all",children:[c.jsx(qs,{size:15}),c.jsx("span",{children:"Add Clinical Note"})]})]})]}),c.jsxs("div",{className:"bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-5",children:[c.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center justify-between gap-4",children:[c.jsxs("div",{className:"flex items-start space-x-4",children:[c.jsxs("div",{className:"w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 text-white font-black text-2xl flex items-center justify-center shadow-md flex-shrink-0",children:[b.firstName[0],b.lastName[0]]}),c.jsxs("div",{children:[c.jsxs("div",{className:"flex items-center gap-2.5 flex-wrap",children:[c.jsxs("h1",{className:"text-2xl font-extrabold text-slate-900",children:[b.firstName," ",b.lastName]}),c.jsx(Un,{variant:b.status==="Active"?"success":"neutral",dot:!0,children:b.status}),c.jsxs("span",{className:"text-xs font-mono bg-surface-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200",children:["ID: ",b.id]})]}),c.jsxs("div",{className:"flex items-center gap-4 text-xs text-slate-500 mt-1.5 flex-wrap",children:[c.jsxs("span",{children:["DOB: ",b.dateOfBirth]}),c.jsxs("span",{children:["Gender: ",b.gender]}),c.jsxs("span",{className:"flex items-center gap-1",children:[c.jsx(j0,{size:12,className:"text-slate-400"})," ",b.phone]}),c.jsxs("span",{className:"flex items-center gap-1",children:[c.jsx(z0,{size:12,className:"text-slate-400"})," ",b.email]})]})]})]}),c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsxs("div",{className:"p-3 bg-surface-50 border border-border rounded-2xl text-right",children:[c.jsx("span",{className:"text-[10px] uppercase font-bold text-slate-500 block",children:"Account Balance"}),c.jsxs("span",{className:`text-lg font-black ${b.balance>0?"text-rose-600":"text-emerald-600"}`,children:["$",b.balance.toFixed(2)]})]}),c.jsxs("div",{className:"p-3 bg-primary-50/60 border border-primary-100 rounded-2xl max-w-[200px]",children:[c.jsxs("span",{className:"text-[10px] uppercase font-bold text-primary-700 block flex items-center gap-1",children:[c.jsx(Gl,{size:11})," ",b.insurance.provider]}),c.jsx("span",{className:"text-xs font-mono font-semibold text-slate-800 truncate block",children:b.insurance.policyNumber})]})]})]}),b.medicalAlerts.length>0&&c.jsxs("div",{className:"p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center space-x-3 text-rose-800 text-xs animate-pulse",children:[c.jsx(tx,{size:18,className:"text-rose-600 flex-shrink-0"}),c.jsxs("div",{className:"flex-1",children:[c.jsx("span",{className:"font-bold mr-2",children:"CRITICAL MEDICAL ALERTS:"}),c.jsx("div",{className:"inline-flex flex-wrap gap-1.5 align-middle",children:b.medicalAlerts.map(D=>c.jsxs("span",{className:"bg-white text-rose-700 font-bold px-2 py-0.5 rounded-md border border-rose-300 shadow-sm",children:["⚠️ ",D]},D))})]})]})]}),c.jsx("div",{className:"flex items-center space-x-2 border-b border-border",children:[{id:"notes",label:"Doctor Clinical Notes",icon:P0,count:T.length},{id:"chart",label:"Odontogram / Dental Chart",icon:s_},{id:"appointments",label:"Visit History",icon:$a,count:S.length},{id:"billing",label:"Billing & Invoices",icon:na,count:x.length}].map(D=>{const P=D.icon,U=f===D.id;return c.jsxs("button",{onClick:()=>m(D.id),className:`flex items-center space-x-2 px-4 py-3 text-xs font-bold transition-all border-b-2 ${U?"border-primary-600 text-primary-600":"border-transparent text-slate-500 hover:text-slate-900"}`,children:[c.jsx(P,{size:16}),c.jsx("span",{children:D.label}),D.count!==void 0&&c.jsx("span",{className:`text-[10px] px-1.5 py-0.2 rounded-full ${U?"bg-primary-100 text-primary-700":"bg-slate-100 text-slate-500"}`,children:D.count})]},D.id)})}),f==="notes"&&c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsxs("h3",{className:"text-sm font-bold text-slate-900 flex items-center gap-2",children:[c.jsx(oh,{size:16,className:"text-primary-600"}),"Chronological Clinical Progress Notes (",T.length,")"]}),I&&c.jsxs("button",{onClick:()=>_(!0),className:"text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1",children:[c.jsx(qs,{size:14})," New Progress Note"]})]}),T.length===0?c.jsx("div",{className:"bg-white rounded-3xl p-10 text-center border border-border text-slate-400 text-xs",children:"No clinical notes recorded yet for this patient."}):T.map(D=>c.jsxs("div",{className:"bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-4",children:[c.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border",children:[c.jsxs("div",{className:"flex items-center space-x-2.5",children:[c.jsx("span",{className:"font-mono text-xs font-bold bg-primary-50 text-primary-700 px-2.5 py-1 rounded-xl border border-primary-200",children:D.date}),c.jsx("span",{className:"text-xs font-bold text-slate-900",children:D.procedureName}),D.toothNumber&&c.jsx("span",{className:"text-[11px] font-semibold text-slate-500 bg-surface-100 px-2 py-0.5 rounded-lg",children:D.toothNumber})]}),D.vitals&&c.jsxs("div",{className:"flex items-center gap-3 text-xs text-sky-800 bg-sky-50 px-3 py-1 rounded-xl border border-sky-100",children:[c.jsx(k0,{size:14,className:"text-sky-600"}),c.jsxs("span",{children:["BP: ",D.vitals.bloodPressure||"N/A"]}),c.jsxs("span",{children:["Pulse: ",D.vitals.pulseRate||"N/A"]})]})]}),c.jsxs("div",{children:[c.jsx("h4",{className:"text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1",children:"Diagnosis & Clinical Findings"}),c.jsx("p",{className:"text-xs font-semibold text-slate-800 bg-surface-50 p-2.5 rounded-xl border border-slate-200/60",children:D.diagnosis})]}),c.jsxs("div",{children:[c.jsx("h4",{className:"text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1",children:"Operative Narrative & Clinical Protocol"}),c.jsx("p",{className:"text-xs text-slate-700 leading-relaxed font-mono bg-surface-50/50 p-3.5 rounded-xl border border-slate-200/60 whitespace-pre-wrap",children:D.notes})]}),D.treatmentPlanSummary&&c.jsxs("div",{className:"text-xs text-primary-900 bg-primary-50/50 p-3 rounded-xl border border-primary-100",children:[c.jsx("span",{className:"font-bold",children:"Next Steps & Treatment Plan: "}),D.treatmentPlanSummary]}),c.jsxs("div",{className:"pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100",children:[c.jsxs("div",{className:"flex items-center space-x-1.5 text-emerald-700",children:[c.jsx(rh,{size:15}),c.jsx("span",{className:"font-semibold",children:"Electronically Signed & Locked"})]}),c.jsxs("div",{className:"font-mono text-slate-700",children:[D.doctorSignature," • ",D.signedAt]})]})]},D.id))]}),f==="chart"&&c.jsxs("div",{className:"bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-6",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-base font-bold text-slate-900",children:"Universal Dental Odontogram"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Interactive 32-tooth dental arch chart. Click any tooth to review specific restorations and history."})]}),c.jsxs("div",{className:"space-y-2",children:[c.jsx("span",{className:"text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center",children:"Maxillary Arch (Upper #1 – #16)"}),c.jsx("div",{className:"grid grid-cols-8 sm:grid-cols-16 gap-1.5",children:C.map(D=>{const P=y===D;return c.jsxs("button",{onClick:()=>M(D),className:`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${P?"bg-primary-600 text-white border-primary-600 shadow-md scale-105":"bg-surface-50 border-slate-200 text-slate-700 hover:bg-slate-100"}`,children:[c.jsxs("span",{className:"text-[10px] font-mono font-bold",children:["#",D]}),c.jsx("span",{className:"text-sm",children:"🦷"})]},D)})})]}),c.jsxs("div",{className:"space-y-2 pt-4 border-t border-border",children:[c.jsx("span",{className:"text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center",children:"Mandibular Arch (Lower #32 – #17)"}),c.jsx("div",{className:"grid grid-cols-8 sm:grid-cols-16 gap-1.5",children:w.map(D=>{const P=y===D,U=D===19;return c.jsxs("button",{onClick:()=>M(D),className:`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${P?"bg-primary-600 text-white border-primary-600 shadow-md scale-105":U?"bg-amber-50 border-amber-300 text-amber-900":"bg-surface-50 border-slate-200 text-slate-700 hover:bg-slate-100"}`,children:[c.jsxs("span",{className:"text-[10px] font-mono font-bold",children:["#",D]}),c.jsx("span",{className:"text-sm",children:"🦷"}),U&&c.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-amber-500 mt-0.5"})]},D)})})]}),y&&c.jsxs("div",{className:"p-4 bg-surface-50 rounded-2xl border border-border flex items-center justify-between",children:[c.jsxs("div",{children:[c.jsxs("span",{className:"font-bold text-sm text-slate-900",children:["Tooth #",y," Selected"]}),c.jsx("p",{className:"text-xs text-slate-600 mt-0.5",children:y===19?"Restored with D2391 Resin Composite (Occlusal). Margin stable, no sensitivity.":"Healthy dentition; no active caries or existing restorations recorded."})]}),I&&c.jsxs("button",{onClick:()=>_(!0),className:"px-3 py-1.5 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-700",children:["Document Tooth #",y]})]})]}),f==="appointments"&&c.jsxs("div",{className:"bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden p-6 space-y-4",children:[c.jsx("h3",{className:"text-sm font-bold text-slate-900",children:"All Scheduled & Past Visits"}),c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3 px-4",children:"Date"}),c.jsx("th",{className:"py-3 px-4",children:"Time"}),c.jsx("th",{className:"py-3 px-4",children:"Procedure"}),c.jsx("th",{className:"py-3 px-4",children:"Provider"}),c.jsx("th",{className:"py-3 px-4",children:"Operatory"}),c.jsx("th",{className:"py-3 px-4",children:"Status"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:S.map(D=>c.jsxs("tr",{className:"hover:bg-surface-50",children:[c.jsx("td",{className:"py-3 px-4 font-bold text-slate-900",children:D.date}),c.jsxs("td",{className:"py-3 px-4 font-mono text-slate-600",children:[D.startTime," - ",D.endTime]}),c.jsxs("td",{className:"py-3 px-4 text-slate-800",children:["[",D.procedureCode,"] ",D.serviceName]}),c.jsx("td",{className:"py-3 px-4 text-slate-600",children:D.doctorName}),c.jsx("td",{className:"py-3 px-4 text-slate-600",children:D.operatoryChair}),c.jsx("td",{className:"py-3 px-4",children:c.jsx(Un,{variant:D.status==="Completed"?"success":D.status==="In-Chair"?"danger":"info",dot:!0,children:D.status})})]},D.id))})]})})]}),f==="billing"&&c.jsxs("div",{className:"bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden p-6 space-y-4",children:[c.jsx("h3",{className:"text-sm font-bold text-slate-900",children:"Invoices & Financial Ledger"}),c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3 px-4",children:"Invoice #"}),c.jsx("th",{className:"py-3 px-4",children:"Service"}),c.jsx("th",{className:"py-3 px-4",children:"Amount"}),c.jsx("th",{className:"py-3 px-4",children:"Paid"}),c.jsx("th",{className:"py-3 px-4",children:"Balance"}),c.jsx("th",{className:"py-3 px-4",children:"Status"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:x.map(D=>c.jsxs("tr",{className:"hover:bg-surface-50",children:[c.jsx("td",{className:"py-3 px-4 font-mono font-bold text-slate-900",children:D.invoiceNumber}),c.jsx("td",{className:"py-3 px-4 text-slate-800",children:D.serviceName}),c.jsxs("td",{className:"py-3 px-4 font-bold text-slate-900",children:["$",D.amount]}),c.jsxs("td",{className:"py-3 px-4 text-emerald-600 font-semibold",children:["$",D.amountPaid]}),c.jsxs("td",{className:"py-3 px-4 font-bold text-rose-600",children:["$",D.balance]}),c.jsx("td",{className:"py-3 px-4",children:c.jsx(Un,{variant:D.status==="Paid"?"success":D.status==="Pending"?"warning":"danger",dot:!0,children:D.status})})]},D.id))})]})})]}),c.jsx(Ww,{isOpen:v,onClose:()=>_(!1),patient:b})]})},$w=()=>{const{invoices:s,appointments:e,markInvoicePaid:t}=ti(),{currentUser:r,currentTenant:o}=On(),[l,d]=we.useState("All"),[h,f]=we.useState(""),m=new Date().toISOString().split("T")[0],v=e.filter(P=>P.date===m),_=v.reduce((P,U)=>P+U.fee,0);s.filter(P=>P.date===m).filter(P=>P.status==="Paid").reduce((P,U)=>P+U.amountPaid,0);const M=s.reduce((P,U)=>P+U.amount,0),b=s.reduce((P,U)=>P+U.amountPaid,0),T=s.filter(P=>P.status!=="Paid").reduce((P,U)=>P+U.balance,0),S=M>0?Math.round(b/M*100):100,x=[{month:"Apr",billed:14200,collected:13800},{month:"May",billed:16500,collected:15900},{month:"Jun",billed:18900,collected:17400},{month:"Jul",billed:21300,collected:20100},{month:"Aug",billed:24800,collected:23200},{month:"Sep (Current)",billed:27400,collected:25100}],I=Math.max(...x.map(P=>P.billed)),C=[{category:"Restorative (Crowns & Fillings)",amount:12400,pct:45,color:"bg-primary-600"},{category:"Endodontics (Root Canals)",amount:6200,pct:23,color:"bg-indigo-600"},{category:"Preventive & Hygiene Cleanings",amount:4800,pct:18,color:"bg-emerald-600"},{category:"Periodontics & Scaling",amount:2400,pct:9,color:"bg-amber-600"},{category:"Oral Surgery & Consultations",amount:1600,pct:5,color:"bg-sky-600"}],w=s.filter(P=>{const U=l==="All"||P.status===l,B=h.toLowerCase(),L=P.patientName.toLowerCase().includes(B)||P.invoiceNumber.toLowerCase().includes(B)||P.serviceName.toLowerCase().includes(B);return U&&L}),D=()=>{const P=["Invoice Number","Patient","Service","Amount","Amount Paid","Balance","Date","Status"],U=w.map(j=>[j.invoiceNumber,`"${j.patientName}"`,`"${j.serviceName}"`,j.amount,j.amountPaid,j.balance,j.date,j.status]),B="data:text/csv;charset=utf-8,"+[P.join(","),...U.map(j=>j.join(","))].join(`
`),L=encodeURI(B),N=document.createElement("a");N.setAttribute("href",L),N.setAttribute("download",`Dentrix_Revenue_${(o==null?void 0:o.slug)||"clinic"}.csv`),document.body.appendChild(N),N.click(),document.body.removeChild(N)};return c.jsxs("div",{className:"p-8 space-y-8 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"p-3 bg-primary-50 text-primary-700 rounded-2xl",children:c.jsx(na,{size:24})}),c.jsxs("div",{children:[c.jsx("h1",{className:"text-xl font-bold text-slate-900",children:"Financials & Revenue Tracking"}),c.jsxs("p",{className:"text-xs text-slate-500",children:["Clinic: ",c.jsx("span",{className:"font-semibold text-slate-800",children:o==null?void 0:o.name})," • Real-time collections and ledger"]})]})]}),c.jsxs("button",{onClick:D,className:"flex items-center space-x-2 bg-surface-50 hover:bg-surface-100 text-slate-700 border border-border px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm",children:[c.jsx(r_,{size:16}),c.jsx("span",{children:"Export Financials (CSV)"})]})]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",children:[c.jsx(vn,{title:"Today's Production Billed",value:`$${_.toLocaleString()}`,subtitle:`${v.length} procedures today`,icon:$a,iconBgColor:"bg-primary-50",iconColor:"text-primary-600"}),c.jsx(vn,{title:"Total Collections Received",value:`$${b.toLocaleString()}`,trend:{value:"14.2%",isPositive:!0},icon:Q0,iconBgColor:"bg-emerald-50",iconColor:"text-emerald-600"}),c.jsx(vn,{title:"Pending Accounts Receivable",value:`$${T.toLocaleString()}`,subtitle:"Awaiting patient or insurance",icon:M0,iconBgColor:"bg-amber-50",iconColor:"text-amber-600"}),c.jsx(vn,{title:"Overall Collection Rate",value:`${S}%`,subtitle:"Target threshold: >95%",icon:i_,iconBgColor:"bg-sky-50",iconColor:"text-sky-600"})]}),c.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[c.jsxs("div",{className:"lg:col-span-2 bg-white rounded-3xl p-6 border border-border shadow-elevation-1 flex flex-col justify-between",children:[c.jsxs("div",{className:"flex items-center justify-between mb-6",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-base font-bold text-slate-900",children:"Month-over-Month Clinical Revenue"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Gross Billed vs Collected Collections"})]}),c.jsxs("div",{className:"flex items-center space-x-4 text-xs",children:[c.jsxs("div",{className:"flex items-center space-x-1.5",children:[c.jsx("span",{className:"w-3 h-3 rounded-full bg-primary-600"}),c.jsx("span",{className:"font-semibold text-slate-700",children:"Gross Billed"})]}),c.jsxs("div",{className:"flex items-center space-x-1.5",children:[c.jsx("span",{className:"w-3 h-3 rounded-full bg-emerald-500"}),c.jsx("span",{className:"font-semibold text-slate-700",children:"Collected"})]})]})]}),c.jsx("div",{className:"flex items-end justify-between h-56 pt-6 pb-2 px-4 border-b border-border gap-4",children:x.map(P=>{const U=Math.round(P.billed/I*100),B=Math.round(P.collected/I*100);return c.jsxs("div",{className:"flex-1 flex flex-col items-center gap-2 group",children:[c.jsxs("div",{className:"w-full flex items-end justify-center gap-1.5 h-44",children:[c.jsx("div",{className:"w-5 bg-primary-600 rounded-t-lg transition-all duration-300 group-hover:brightness-110 relative",style:{height:`${U}%`},title:`Billed: $${P.billed}`}),c.jsx("div",{className:"w-5 bg-emerald-500 rounded-t-lg transition-all duration-300 group-hover:brightness-110 relative",style:{height:`${B}%`},title:`Collected: $${P.collected}`})]}),c.jsx("span",{className:"text-[11px] font-bold text-slate-600 truncate max-w-[65px]",children:P.month})]},P.month)})}),c.jsxs("div",{className:"pt-3 flex items-center justify-between text-xs text-slate-500",children:[c.jsx("span",{children:"Average monthly growth: +9.6%"}),c.jsx("span",{className:"font-bold text-slate-900",children:"Current Month: $27,400"})]})]}),c.jsxs("div",{className:"bg-white rounded-3xl p-6 border border-border shadow-elevation-1 flex flex-col justify-between",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-base font-bold text-slate-900 mb-1",children:"Production by Specialty"}),c.jsx("p",{className:"text-xs text-slate-500 mb-5",children:"CDT procedure categorization breakdown"}),c.jsx("div",{className:"space-y-4",children:C.map(P=>c.jsxs("div",{className:"space-y-1",children:[c.jsxs("div",{className:"flex items-center justify-between text-xs font-semibold",children:[c.jsx("span",{className:"text-slate-700 truncate pr-2",children:P.category}),c.jsxs("span",{className:"text-slate-900 font-bold",children:["$",P.amount.toLocaleString()]})]}),c.jsx("div",{className:"w-full h-2 bg-surface-100 rounded-full overflow-hidden",children:c.jsx("div",{className:`h-full ${P.color} rounded-full`,style:{width:`${P.pct}%`}})})]},P.category))})]}),c.jsxs("div",{className:"mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-slate-600 font-semibold",children:[c.jsx("span",{children:"Leading Revenue Driver:"}),c.jsx("span",{className:"text-primary-700 font-bold",children:"Crown & Restorative"})]})]})]}),c.jsxs("div",{className:"bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-4",children:[c.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3",children:[c.jsxs("div",{children:[c.jsx("h2",{className:"text-base font-bold text-slate-900",children:"Patient Billing & Invoice Ledger"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Track paid, pending, and overdue clinical charges"})]}),c.jsx("div",{className:"flex items-center gap-1.5 bg-surface-50 p-1 rounded-2xl border border-border",children:["All","Paid","Pending","Overdue"].map(P=>c.jsx("button",{onClick:()=>d(P),className:`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${l===P?"bg-white text-slate-900 shadow-sm border border-slate-200":"text-slate-500 hover:text-slate-800"}`,children:P},P))})]}),c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3 px-4",children:"Invoice #"}),c.jsx("th",{className:"py-3 px-4",children:"Patient"}),c.jsx("th",{className:"py-3 px-4",children:"Procedure / Service"}),c.jsx("th",{className:"py-3 px-4",children:"Billed Amount"}),c.jsx("th",{className:"py-3 px-4",children:"Paid"}),c.jsx("th",{className:"py-3 px-4",children:"Outstanding"}),c.jsx("th",{className:"py-3 px-4",children:"Date"}),c.jsx("th",{className:"py-3 px-4",children:"Status"}),c.jsx("th",{className:"py-3 px-4 text-right",children:"Settlement"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:w.map(P=>c.jsxs("tr",{className:"hover:bg-surface-50/60",children:[c.jsx("td",{className:"py-3.5 px-4 font-mono font-bold text-slate-900",children:P.invoiceNumber}),c.jsx("td",{className:"py-3.5 px-4 font-bold text-slate-800",children:P.patientName}),c.jsx("td",{className:"py-3.5 px-4 text-slate-600",children:P.serviceName}),c.jsxs("td",{className:"py-3.5 px-4 font-bold text-slate-900",children:["$",P.amount]}),c.jsxs("td",{className:"py-3.5 px-4 text-emerald-600 font-semibold",children:["$",P.amountPaid]}),c.jsxs("td",{className:"py-3.5 px-4 font-bold text-rose-600",children:["$",P.balance]}),c.jsx("td",{className:"py-3.5 px-4 text-slate-500 font-mono",children:P.date}),c.jsx("td",{className:"py-3.5 px-4",children:c.jsx(Un,{variant:P.status==="Paid"?"success":P.status==="Pending"?"warning":"danger",dot:!0,children:P.status})}),c.jsx("td",{className:"py-3.5 px-4 text-right",children:P.status!=="Paid"?c.jsx("button",{onClick:()=>t(P.id,"Credit Card"),className:"px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-sm transition-all",children:"Mark Paid"}):c.jsxs("span",{className:"text-[11px] font-semibold text-emerald-700 flex items-center justify-end gap-1",children:[c.jsx(rh,{size:13})," ",P.paymentMethod||"Paid"]})})]},P.id))})]})})]})]})},qw=({onOpenAddStaff:s})=>{const{allUsers:e,currentTenant:t,updateUserPermissions:r,toggleStaffStatus:o}=On(),l=e.filter(h=>h.tenantId===(t==null?void 0:t.id)&&h.role!=="SUPER_ADMIN"),d=[{key:"canManageAppointments",label:"Appointments"},{key:"canManagePatients",label:"Patients"},{key:"canWriteDoctorNotes",label:"Doctor Notes"},{key:"canViewRevenue",label:"Revenue Reports"},{key:"canManageServices",label:"Services Catalog"},{key:"canManageStaff",label:"Staff Admin"}];return c.jsxs("div",{className:"p-8 space-y-6 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"p-3 bg-primary-50 text-primary-700 rounded-2xl",children:c.jsx(lh,{size:24})}),c.jsxs("div",{children:[c.jsx("h1",{className:"text-xl font-bold text-slate-900",children:"Clinic Staff Management"}),c.jsxs("p",{className:"text-xs text-slate-500",children:["Manage providers, hygienists, front desk coordinators, and role scopes for ",t==null?void 0:t.name,"."]})]})]}),c.jsxs("button",{onClick:s,className:"flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all",children:[c.jsx(Wl,{size:16}),c.jsx("span",{children:"Invite Clinic Staff"})]})]}),c.jsx("div",{className:"bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden",children:c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsxs("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-b border-border",children:[c.jsxs("tr",{children:[c.jsx("th",{className:"py-3.5 px-5",children:"Staff Member"}),c.jsx("th",{className:"py-3.5 px-5",children:"Role & Title"}),c.jsx("th",{className:"py-3.5 px-5",children:"Contact Details"}),c.jsx("th",{className:"py-3.5 px-5 text-center",colSpan:6,children:"Permissions Matrix (Click to Toggle)"}),c.jsx("th",{className:"py-3.5 px-5 text-right",children:"Status"})]}),c.jsxs("tr",{className:"border-t border-slate-200/70 text-[10px] text-slate-400 bg-surface-50/50",children:[c.jsx("th",{colSpan:3}),d.map(h=>c.jsx("th",{className:"py-1 px-2 text-center truncate max-w-[80px]",children:h.label},h.key)),c.jsx("th",{})]})]}),c.jsx("tbody",{className:"divide-y divide-border",children:l.map(h=>{const f=h.role==="DOCTOR_ADMIN";return c.jsxs("tr",{className:"hover:bg-surface-50/60",children:[c.jsx("td",{className:"py-4 px-5",children:c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"w-9 h-9 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-xs shadow-sm",children:h.name.split(" ").map(m=>m[0]).join("").substring(0,2)}),c.jsxs("div",{children:[c.jsx("span",{className:"font-bold text-sm text-slate-900 block",children:h.name}),c.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:["Joined ",h.joinedAt]})]})]})}),c.jsxs("td",{className:"py-4 px-5",children:[c.jsx("span",{className:"font-semibold text-slate-800 block",children:h.title}),c.jsx("span",{className:`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${f?"bg-primary-100 text-primary-800":"bg-slate-100 text-slate-700"}`,children:h.role.replace("_"," ")})]}),c.jsxs("td",{className:"py-4 px-5 space-y-0.5",children:[c.jsx("div",{className:"text-slate-800 font-medium",children:h.email}),c.jsx("div",{className:"text-slate-400 text-[11px]",children:h.phone||"—"})]}),d.map(m=>{const v=h.permissions[m.key];return c.jsx("td",{className:"py-4 px-2 text-center",children:c.jsx("button",{disabled:f,onClick:()=>r(h.id,{[m.key]:!v}),className:`w-6 h-6 rounded-lg mx-auto inline-flex items-center justify-center transition-all ${v?"bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-sm":"bg-slate-100 text-slate-300 border border-slate-200 hover:border-slate-400"} ${f?"cursor-not-allowed opacity-80":"cursor-pointer hover:scale-110"}`,title:f?"Doctor Admin holds mandatory platform rights":`Toggle ${m.label}`,children:v?c.jsx(n_,{size:14,strokeWidth:3}):c.jsx(is,{size:12})})},m.key)}),c.jsx("td",{className:"py-4 px-5 text-right",children:c.jsx("button",{onClick:()=>o(h.id),className:`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${h.status==="active"?"bg-white text-rose-600 border-rose-200 hover:bg-rose-50":"bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"}`,children:h.status==="active"?"Deactivate":"Activate"})})]},h.id)})})]})})})]})},Yw=({onOpenAddService:s})=>{const{services:e,toggleServiceActive:t}=ti(),{currentTenant:r}=On(),[o,l]=we.useState(""),[d,h]=we.useState("All"),f=["All","Preventive","Restorative","Endodontics","Periodontics","Oral Surgery","Orthodontics"],m=e.filter(v=>{const _=d==="All"||v.category===d,y=o.toLowerCase(),M=v.name.toLowerCase().includes(y)||v.code.toLowerCase().includes(y)||v.description.toLowerCase().includes(y);return _&&M});return c.jsxs("div",{className:"p-8 space-y-6 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"p-3 bg-primary-50 text-primary-700 rounded-2xl",children:c.jsx(W0,{size:24})}),c.jsxs("div",{children:[c.jsx("h1",{className:"text-xl font-bold text-slate-900",children:"Dental Services & Fee Schedule"}),c.jsxs("p",{className:"text-xs text-slate-500",children:["Configure ADA CDT procedure codes, clinical duration, and base fees for ",r==null?void 0:r.name,"."]})]})]}),c.jsxs("button",{onClick:s,className:"flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all",children:[c.jsx(qs,{size:16}),c.jsx("span",{children:"Add Dental Procedure"})]})]}),c.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 items-center justify-between",children:[c.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full",children:f.map(v=>c.jsx("button",{onClick:()=>h(v),className:`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${d===v?"bg-primary-600 text-white shadow-sm":"bg-white border border-border text-slate-600 hover:bg-surface-50"}`,children:v},v))}),c.jsxs("div",{className:"relative w-full sm:w-64",children:[c.jsx(Hl,{size:15,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),c.jsx("input",{type:"text",placeholder:"Search CDT code or procedure...",value:o,onChange:v=>l(v.target.value),className:"w-full bg-white border border-border rounded-2xl pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600 shadow-sm"})]})]}),c.jsx("div",{className:"bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden",children:c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-b border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3.5 px-5",children:"CDT Code"}),c.jsx("th",{className:"py-3.5 px-5",children:"Procedure Name & Details"}),c.jsx("th",{className:"py-3.5 px-5",children:"Category"}),c.jsx("th",{className:"py-3.5 px-5",children:"Standard Duration"}),c.jsx("th",{className:"py-3.5 px-5",children:"Base Fee"}),c.jsx("th",{className:"py-3.5 px-5",children:"Status"}),c.jsx("th",{className:"py-3.5 px-5 text-right",children:"Toggle Active"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:m.map(v=>c.jsxs("tr",{className:"hover:bg-surface-50/60",children:[c.jsx("td",{className:"py-4 px-5",children:c.jsx("span",{className:"font-mono font-black text-sm text-primary-700 bg-primary-50 px-2.5 py-1 rounded-xl border border-primary-200",children:v.code})}),c.jsxs("td",{className:"py-4 px-5 max-w-sm",children:[c.jsx("span",{className:"font-bold text-sm text-slate-900 block",children:v.name}),c.jsx("p",{className:"text-[11px] text-slate-500 line-clamp-1 mt-0.5",children:v.description})]}),c.jsx("td",{className:"py-4 px-5",children:c.jsx("span",{className:"font-semibold px-2.5 py-0.5 rounded-full bg-surface-100 text-slate-700 border border-slate-200",children:v.category})}),c.jsx("td",{className:"py-4 px-5",children:c.jsxs("div",{className:"flex items-center space-x-1 font-semibold text-slate-700",children:[c.jsx(sh,{size:13,className:"text-slate-400"}),c.jsxs("span",{children:[v.durationMinutes," minutes"]})]})}),c.jsx("td",{className:"py-4 px-5",children:c.jsxs("span",{className:"font-black text-sm text-slate-900",children:["$",v.basePrice.toLocaleString()]})}),c.jsx("td",{className:"py-4 px-5",children:c.jsx(Un,{variant:v.isActive?"success":"neutral",dot:!0,children:v.isActive?"Active":"Archived"})}),c.jsx("td",{className:"py-4 px-5 text-right",children:c.jsx("button",{onClick:()=>t(v.id),className:`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${v.isActive?"bg-white text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200":"bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"}`,children:v.isActive?"Deactivate":"Enable"})})]},v.id))})]})})})]})},Kw=({onOpenOnboardModal:s})=>{const{allTenants:e,toggleTenantStatus:t}=On(),{systemHealth:r,allAppointments:o,allPatients:l}=ti(),[d,h]=we.useState(""),f=e.filter(m=>{const v=d.toLowerCase();return m.name.toLowerCase().includes(v)||m.slug.toLowerCase().includes(v)||m.doctorAdminName.toLowerCase().includes(v)});return c.jsxs("div",{className:"p-8 space-y-8 max-w-7xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"p-3 bg-amber-50 text-amber-700 rounded-2xl",children:c.jsx($s,{size:24})}),c.jsxs("div",{children:[c.jsx("h1",{className:"text-xl font-bold text-slate-900",children:"Multi-Tenant Platform Console"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Provision clinic database partitions, assign doctor owners, and oversee system health."})]})]}),c.jsxs("button",{onClick:s,className:"flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-amber-600/20 transition-all",children:[c.jsx(qs,{size:16}),c.jsx("span",{children:"Provision New Clinic Tenant"})]})]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",children:[c.jsx(vn,{title:"Total Provisioned Clinics",value:e.length,subtitle:`${e.filter(m=>m.status==="active").length} Active tenants`,icon:$s,iconBgColor:"bg-amber-50",iconColor:"text-amber-700"}),c.jsx(vn,{title:"DB Connection Pools",value:`${r.databasePools.active}/${r.databasePools.max}`,subtitle:`${r.databasePools.idle} Idle pools ready`,icon:ah,iconBgColor:"bg-sky-50",iconColor:"text-sky-700"}),c.jsx(vn,{title:"Platform Storage Usage",value:`${r.storageUsedGb} GB`,subtitle:"PostgreSQL logical partitions",icon:I0,iconBgColor:"bg-indigo-50",iconColor:"text-indigo-700"}),c.jsx(vn,{title:"Platform High Availability",value:`${r.uptimePercent}%`,subtitle:"Zero-downtime SLA",icon:pd,iconBgColor:"bg-emerald-50",iconColor:"text-emerald-700"})]}),c.jsxs("div",{className:"bg-white rounded-3xl border border-border shadow-elevation-1 p-6 space-y-4",children:[c.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3",children:[c.jsxs("div",{children:[c.jsx("h2",{className:"text-base font-bold text-slate-900",children:"Clinic Tenant Directory"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Live multi-tenant partitions with isolated database storage quotas"})]}),c.jsxs("div",{className:"relative w-full sm:w-72",children:[c.jsx(Hl,{size:15,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),c.jsx("input",{type:"text",placeholder:"Search by clinic name or doctor...",value:d,onChange:m=>h(m.target.value),className:"w-full bg-surface-50 border border-border rounded-2xl pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"})]})]}),c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-left text-xs",children:[c.jsx("thead",{className:"text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border",children:c.jsxs("tr",{children:[c.jsx("th",{className:"py-3.5 px-4",children:"Clinic Organization"}),c.jsx("th",{className:"py-3.5 px-4",children:"Subdomain / Tenant ID"}),c.jsx("th",{className:"py-3.5 px-4",children:"Doctor Admin"}),c.jsx("th",{className:"py-3.5 px-4",children:"Storage Allocation"}),c.jsx("th",{className:"py-3.5 px-4",children:"Subscription Tier"}),c.jsx("th",{className:"py-3.5 px-4",children:"Status"}),c.jsx("th",{className:"py-3.5 px-4 text-right",children:"Lifecycle Actions"})]})}),c.jsx("tbody",{className:"divide-y divide-border",children:f.map(m=>c.jsxs("tr",{className:"hover:bg-surface-50/60",children:[c.jsxs("td",{className:"py-4 px-4",children:[c.jsx("span",{className:"font-bold text-sm text-slate-900 block",children:m.name}),c.jsx("span",{className:"text-[11px] text-slate-400",children:m.address})]}),c.jsxs("td",{className:"py-4 px-4",children:[c.jsxs("span",{className:"font-mono font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-lg border border-primary-100",children:[m.slug,".dentrix.io"]}),c.jsxs("span",{className:"text-[10px] text-slate-400 block mt-0.5",children:["ID: ",m.id]})]}),c.jsxs("td",{className:"py-4 px-4",children:[c.jsx("span",{className:"font-semibold text-slate-800 block",children:m.doctorAdminName}),c.jsx("span",{className:"text-[11px] text-slate-400",children:m.doctorAdminEmail})]}),c.jsxs("td",{className:"py-4 px-4",children:[c.jsxs("span",{className:"font-mono text-slate-700 font-semibold block",children:[m.storageMb," MB"]}),c.jsx("div",{className:"w-24 h-1.5 bg-surface-200 rounded-full mt-1 overflow-hidden",children:c.jsx("div",{className:"h-full bg-primary-600 rounded-full",style:{width:`${Math.min(100,m.storageMb/2e3*100)}%`}})})]}),c.jsx("td",{className:"py-4 px-4",children:c.jsx("span",{className:"font-bold text-[11px] px-2.5 py-0.5 rounded-full bg-surface-100 text-slate-700 border border-slate-200",children:m.plan})}),c.jsx("td",{className:"py-4 px-4",children:c.jsx(Un,{variant:m.status==="active"?"success":"danger",dot:!0,children:m.status.toUpperCase()})}),c.jsx("td",{className:"py-4 px-4 text-right",children:c.jsx("button",{onClick:()=>t(m.id),className:`text-[11px] font-bold px-3 py-1 rounded-xl border transition-all ${m.status==="active"?"bg-white text-rose-600 border-rose-200 hover:bg-rose-50":"bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"}`,children:m.status==="active"?"Suspend Tenant":"Activate Tenant"})})]},m.id))})]})})]})]})},Jw=({isOpen:s,onClose:e,initialDate:t,initialPatientId:r})=>{var ee,J,ce;const{patients:o,services:l,addAppointment:d}=ti(),{allUsers:h,currentTenant:f}=On(),m=h.filter(Y=>(Y.role==="DOCTOR_ADMIN"||Y.title.toLowerCase().includes("hygienist")||Y.title.toLowerCase().includes("surgeon")||Y.title.toLowerCase().includes("doctor"))&&(!Y.tenantId||Y.tenantId===(f==null?void 0:f.id))),[v,_]=we.useState(r||((ee=o[0])==null?void 0:ee.id)||""),[y,M]=we.useState(((J=l[0])==null?void 0:J.id)||""),[b,T]=we.useState(((ce=m[0])==null?void 0:ce.id)||""),[S,x]=we.useState(t||new Date().toISOString().split("T")[0]),[I,C]=we.useState("10:00"),[w,D]=we.useState("Chair 1 - Hygiene"),[P,U]=we.useState("");if(!s)return null;const B=l.find(Y=>Y.id===y)||l[0],L=o.find(Y=>Y.id===v)||o[0],N=m.find(Y=>Y.id===b)||m[0],j=Y=>{if(Y.preventDefault(),!L||!B)return;const[G,Z]=I.split(":").map(Number),O=G*60+Z+((B==null?void 0:B.durationMinutes)||45),oe=Math.floor(O/60),de=O%60,z=`${String(oe).padStart(2,"0")}:${String(de).padStart(2,"0")}`;d({patientId:L.id,patientName:`${L.firstName} ${L.lastName}`,patientPhone:L.phone,doctorId:N?N.id:"doc_1",doctorName:N?N.name:"Dr. Sarah Vance, DDS",serviceId:B.id,serviceName:B.name,procedureCode:B.code,date:S,startTime:I,endTime:z,durationMinutes:B.durationMinutes,operatoryChair:w,status:"Scheduled",notes:P,fee:B.basePrice}),e()};return c.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn",children:c.jsxs("div",{className:"bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]",children:[c.jsxs("div",{className:"px-6 py-5 border-b border-border flex items-center justify-between bg-surface-50",children:[c.jsxs("div",{children:[c.jsx("h2",{className:"text-lg font-bold text-slate-900",children:"Schedule New Appointment"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Assign patient, procedure code, operatory chair, and provider."})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-slate-700 hover:bg-surface-200/60 rounded-full transition-colors",children:c.jsx(is,{size:20})})]}),c.jsxs("form",{onSubmit:j,className:"p-6 space-y-4 overflow-y-auto flex-1",children:[c.jsxs("div",{children:[c.jsxs("label",{className:"block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5",children:[c.jsx(d_,{size:14,className:"text-primary-600"})," Patient"]}),c.jsx("select",{value:v,onChange:Y=>_(Y.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600",required:!0,children:o.map(Y=>c.jsxs("option",{value:Y.id,children:[Y.firstName," ",Y.lastName," — ",Y.phone," (",Y.insurance.provider,")"]},Y.id))})]}),c.jsxs("div",{children:[c.jsxs("label",{className:"block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5",children:[c.jsx(oh,{size:14,className:"text-primary-600"})," Dental Procedure (CDT Code)"]}),c.jsx("select",{value:y,onChange:Y=>M(Y.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600",required:!0,children:l.map(Y=>c.jsxs("option",{value:Y.id,children:["[",Y.code,"] ",Y.name," — ",Y.durationMinutes,"m ($",Y.basePrice,")"]},Y.id))}),B&&c.jsxs("div",{className:"mt-2 p-3 bg-primary-50/70 rounded-xl border border-primary-100 flex items-center justify-between text-xs text-primary-900",children:[c.jsxs("span",{children:[c.jsx("strong",{children:"Category:"})," ",B.category]}),c.jsxs("span",{children:[c.jsx("strong",{children:"Standard Duration:"})," ",B.durationMinutes," min"]}),c.jsxs("span",{className:"font-bold flex items-center",children:[c.jsx(na,{size:13,className:"-mr-0.5"}),B.basePrice]})]})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1.5",children:"Assigned Provider"}),c.jsx("select",{value:b,onChange:Y=>T(Y.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600",children:m.map(Y=>c.jsxs("option",{value:Y.id,children:[Y.name," (",Y.title,")"]},Y.id))})]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-3",children:[c.jsxs("div",{children:[c.jsxs("label",{className:"block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5",children:[c.jsx($a,{size:14,className:"text-slate-500"})," Date"]}),c.jsx("input",{type:"date",value:S,onChange:Y=>x(Y.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",required:!0})]}),c.jsxs("div",{children:[c.jsxs("label",{className:"block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5",children:[c.jsx(sh,{size:14,className:"text-slate-500"})," Start Time"]}),c.jsx("input",{type:"time",value:I,onChange:Y=>C(Y.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",required:!0})]}),c.jsxs("div",{children:[c.jsxs("label",{className:"block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5",children:[c.jsx(Ol,{size:14,className:"text-slate-500"})," Operatory Chair"]}),c.jsxs("select",{value:w,onChange:Y=>D(Y.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",children:[c.jsx("option",{value:"Chair 1 - Hygiene",children:"Chair 1 - Hygiene"}),c.jsx("option",{value:"Chair 2 - Surgery",children:"Chair 2 - Surgery"}),c.jsx("option",{value:"Chair 3 - General",children:"Chair 3 - General"})]})]})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1.5",children:"Clinical Notes / Chief Complaint"}),c.jsx("textarea",{rows:2,value:P,onChange:Y=>U(Y.target.value),placeholder:"e.g. Sensitivity on upper left quadrant, routine cleaning...",className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"})]}),c.jsxs("div",{className:"pt-4 border-t border-border flex items-center justify-end space-x-3",children:[c.jsx("button",{type:"button",onClick:e,className:"px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-surface-100 rounded-xl transition-colors",children:"Cancel"}),c.jsx("button",{type:"submit",className:"px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25 transition-all",children:"Confirm Appointment"})]})]})]})})},Zw=({isOpen:s,onClose:e})=>{const{addPatient:t}=ti(),[r,o]=we.useState({firstName:"",lastName:"",email:"",phone:"",dateOfBirth:"1990-01-01",gender:"Female",address:"",insuranceProvider:"Delta Dental Premier",policyNumber:"",groupNumber:"",emergencyName:"",emergencyPhone:"",emergencyRelationship:"Spouse",selectedAlerts:[],balance:0}),l=["Penicillin Allergy","Latex Sensitivity","Hypertension","Diabetes Type II","Pre-Medication Required (Amoxicillin)","Anticoagulant Therapy (Warfarin)","Asthma","Pregnancy (2nd Trimester)"];if(!s)return null;const d=f=>{o(m=>({...m,selectedAlerts:m.selectedAlerts.includes(f)?m.selectedAlerts.filter(v=>v!==f):[...m.selectedAlerts,f]}))},h=f=>{f.preventDefault(),t({firstName:r.firstName,lastName:r.lastName,email:r.email,phone:r.phone,dateOfBirth:r.dateOfBirth,gender:r.gender,address:r.address,insurance:{provider:r.insuranceProvider,policyNumber:r.policyNumber||`POL-${Math.floor(1e5+Math.random()*9e5)}`,groupNumber:r.groupNumber||"GRP-101"},emergencyContact:{name:r.emergencyName,phone:r.emergencyPhone,relationship:r.emergencyRelationship},medicalAlerts:r.selectedAlerts,balance:r.balance,status:"Active"}),e()};return c.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn",children:c.jsxs("div",{className:"bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]",children:[c.jsxs("div",{className:"px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50",children:[c.jsxs("div",{className:"flex items-center space-x-2.5",children:[c.jsx("div",{className:"p-2 rounded-xl bg-primary-100 text-primary-700",children:c.jsx(Wl,{size:20})}),c.jsxs("div",{children:[c.jsx("h2",{className:"text-lg font-bold text-slate-900",children:"New Patient Registration"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Register clinical demographics, insurance coverage, and medical alerts."})]})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors",children:c.jsx(is,{size:20})})]}),c.jsxs("form",{onSubmit:h,className:"p-6 space-y-5 overflow-y-auto flex-1",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-primary-700 mb-3 flex items-center gap-1.5",children:"General Demographics"}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3.5",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"First Name"}),c.jsx("input",{type:"text",required:!0,placeholder:"e.g. Eleanor",value:r.firstName,onChange:f=>o({...r,firstName:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Last Name"}),c.jsx("input",{type:"text",required:!0,placeholder:"e.g. Vance",value:r.lastName,onChange:f=>o({...r,lastName:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Phone Number"}),c.jsx("input",{type:"tel",required:!0,placeholder:"(512) 555-0100",value:r.phone,onChange:f=>o({...r,phone:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Email Address"}),c.jsx("input",{type:"email",required:!0,placeholder:"patient@email.com",value:r.email,onChange:f=>o({...r,email:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Date of Birth"}),c.jsx("input",{type:"date",required:!0,value:r.dateOfBirth,onChange:f=>o({...r,dateOfBirth:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Gender"}),c.jsxs("select",{value:r.gender,onChange:f=>o({...r,gender:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",children:[c.jsx("option",{value:"Female",children:"Female"}),c.jsx("option",{value:"Male",children:"Male"}),c.jsx("option",{value:"Other",children:"Other"})]})]}),c.jsxs("div",{className:"sm:col-span-2",children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Residential Address"}),c.jsx("input",{type:"text",placeholder:"Street address, city, state, zip",value:r.address,onChange:f=>o({...r,address:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]})]})]}),c.jsxs("div",{className:"pt-2",children:[c.jsxs("h3",{className:"text-xs font-bold uppercase tracking-wider text-primary-700 mb-3 flex items-center gap-1.5",children:[c.jsx(Gl,{size:14})," Insurance Provider Information"]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Insurance Carrier"}),c.jsx("input",{type:"text",placeholder:"e.g. Delta Dental / Cigna",value:r.insuranceProvider,onChange:f=>o({...r,insuranceProvider:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Policy / Member ID"}),c.jsx("input",{type:"text",placeholder:"POL-99210",value:r.policyNumber,onChange:f=>o({...r,policyNumber:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Group Number"}),c.jsx("input",{type:"text",placeholder:"GRP-402",value:r.groupNumber,onChange:f=>o({...r,groupNumber:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]})]})]}),c.jsxs("div",{className:"pt-2",children:[c.jsxs("h3",{className:"text-xs font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1.5",children:[c.jsx(k0,{size:14})," Critical Medical Alerts & Allergies"]}),c.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2",children:l.map(f=>{const m=r.selectedAlerts.includes(f);return c.jsxs("button",{type:"button",onClick:()=>d(f),className:`text-left p-2 rounded-xl text-[11px] font-semibold border transition-all ${m?"bg-rose-50 border-rose-300 text-rose-700 shadow-sm":"bg-surface-50 border-border text-slate-600 hover:bg-slate-100"}`,children:[m?"✓ ":"+ "," ",f]},f)})})]}),c.jsxs("div",{className:"pt-2",children:[c.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-slate-700 mb-3",children:"Emergency Contact"}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Contact Name"}),c.jsx("input",{type:"text",placeholder:"Full name",value:r.emergencyName,onChange:f=>o({...r,emergencyName:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Phone"}),c.jsx("input",{type:"tel",placeholder:"(512) 555-0199",value:r.emergencyPhone,onChange:f=>o({...r,emergencyPhone:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Relationship"}),c.jsx("input",{type:"text",placeholder:"Spouse / Parent",value:r.emergencyRelationship,onChange:f=>o({...r,emergencyRelationship:f.target.value}),className:"w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]})]})]}),c.jsxs("div",{className:"pt-4 border-t border-border flex items-center justify-end space-x-3",children:[c.jsx("button",{type:"button",onClick:e,className:"px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl",children:"Cancel"}),c.jsx("button",{type:"submit",className:"px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25",children:"Register Patient"})]})]})]})})},Qw=({isOpen:s,onClose:e})=>{const{addService:t}=ti(),[r,o]=we.useState("D"),[l,d]=we.useState(""),[h,f]=we.useState("Preventive"),[m,v]=we.useState(45),[_,y]=we.useState(120),[M,b]=we.useState("");if(!s)return null;const T=x=>{x.preventDefault(),t({code:r.trim().toUpperCase(),name:l.trim(),category:h,durationMinutes:m,basePrice:_,description:M.trim(),isActive:!0}),e()},S=["Preventive","Restorative","Endodontics","Periodontics","Oral Surgery","Orthodontics"];return c.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn",children:c.jsxs("div",{className:"bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col",children:[c.jsxs("div",{className:"px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50",children:[c.jsxs("div",{className:"flex items-center space-x-2.5",children:[c.jsx("div",{className:"p-2 rounded-xl bg-primary-100 text-primary-700",children:c.jsx(K0,{size:20})}),c.jsxs("div",{children:[c.jsx("h2",{className:"text-lg font-bold text-slate-900",children:"Add Dental Procedure"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Register ADA CDT code, standard clinical duration, and base fee."})]})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors",children:c.jsx(is,{size:20})})]}),c.jsxs("form",{onSubmit:T,className:"p-6 space-y-4",children:[c.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"CDT Procedure Code"}),c.jsx("input",{type:"text",required:!0,placeholder:"e.g. D2392",value:r,onChange:x=>o(x.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-primary-600 uppercase"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Category"}),c.jsx("select",{value:h,onChange:x=>f(x.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",children:S.map(x=>c.jsx("option",{value:x,children:x},x))})]})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Procedure Name"}),c.jsx("input",{type:"text",required:!0,placeholder:"e.g. Resin Composite - 2 Surfaces (Posterior)",value:l,onChange:x=>d(x.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[c.jsxs("div",{children:[c.jsxs("label",{className:"block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1",children:[c.jsx(sh,{size:13,className:"text-slate-500"})," Duration (Minutes)"]}),c.jsx("input",{type:"number",min:"15",step:"15",required:!0,value:m,onChange:x=>v(Number(x.target.value)),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsxs("label",{className:"block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1",children:[c.jsx(na,{size:13,className:"text-slate-500"})," Base Price ($ USD)"]}),c.jsx("input",{type:"number",min:"0",step:"5",required:!0,value:_,onChange:x=>y(Number(x.target.value)),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Clinical Description"}),c.jsx("textarea",{rows:2,placeholder:"Brief description of clinical indications...",value:M,onChange:x=>b(x.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{className:"pt-3 border-t border-border flex items-center justify-end space-x-3",children:[c.jsx("button",{type:"button",onClick:e,className:"px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl",children:"Cancel"}),c.jsx("button",{type:"submit",className:"px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25",children:"Add to Catalog"})]})]})]})})},eE=({isOpen:s,onClose:e})=>{const{addStaffMember:t,currentTenant:r}=On(),[o,l]=we.useState(""),[d,h]=we.useState(""),[f,m]=we.useState("Front Desk Receptionist"),[v,_]=we.useState(""),[y,M]=we.useState("STAFF"),[b,T]=we.useState({canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!1,canViewRevenue:!1,canManageServices:!1,canManageStaff:!1});if(!s)return null;const S=C=>{T(w=>({...w,[C]:!w[C]}))},x=C=>{M(C),C==="DOCTOR_ADMIN"?(T({canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!0,canViewRevenue:!0,canManageServices:!0,canManageStaff:!0}),m("Associate Dental Surgeon")):(T({canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!1,canViewRevenue:!1,canManageServices:!1,canManageStaff:!1}),m("Front Desk Receptionist"))},I=C=>{C.preventDefault(),t({tenantId:(r==null?void 0:r.id)||"tenant_apex",name:o.trim(),email:d.trim(),role:y,title:f.trim(),phone:v.trim(),permissions:b,status:"active"}),e()};return c.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn",children:c.jsxs("div",{className:"bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col",children:[c.jsxs("div",{className:"px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50",children:[c.jsxs("div",{className:"flex items-center space-x-2.5",children:[c.jsx("div",{className:"p-2 rounded-xl bg-primary-100 text-primary-700",children:c.jsx(Wl,{size:20})}),c.jsxs("div",{children:[c.jsx("h2",{className:"text-lg font-bold text-slate-900",children:"Invite Clinic Staff Member"}),c.jsxs("p",{className:"text-xs text-slate-500",children:["Clinic: ",c.jsx("span",{className:"font-semibold text-slate-800",children:r==null?void 0:r.name})]})]})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors",children:c.jsx(is,{size:20})})]}),c.jsxs("form",{onSubmit:I,className:"p-6 space-y-4",children:[c.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Full Name"}),c.jsx("input",{type:"text",required:!0,placeholder:"e.g. Jessica Miller",value:o,onChange:C=>l(C.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Work Email"}),c.jsx("input",{type:"email",required:!0,placeholder:"jessica@clinic.com",value:d,onChange:C=>h(C.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]})]}),c.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Clinic Role"}),c.jsxs("select",{value:y,onChange:C=>x(C.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",children:[c.jsx("option",{value:"STAFF",children:"Staff (Scoped)"}),c.jsx("option",{value:"DOCTOR_ADMIN",children:"Doctor Admin (Full Rights)"})]})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Clinical Title"}),c.jsx("input",{type:"text",required:!0,placeholder:"e.g. Dental Assistant",value:f,onChange:C=>m(C.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Phone Number"}),c.jsx("input",{type:"tel",placeholder:"(512) 555-0144",value:v,onChange:C=>_(C.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{className:"pt-2",children:[c.jsxs("label",{className:"block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5",children:[c.jsx(Gl,{size:14,className:"text-primary-600"})," Permission Scope"]}),c.jsx("div",{className:"space-y-2 bg-surface-50 p-3.5 rounded-2xl border border-border",children:[{key:"canManageAppointments",label:"Manage Appointments (Book, Edit, Cancel)"},{key:"canManagePatients",label:"Access & Edit Patient Demographics"},{key:"canWriteDoctorNotes",label:"Sign & Append Clinical Doctor Notes"},{key:"canViewRevenue",label:"View Financial & Revenue Reports"},{key:"canManageServices",label:"Configure Dental Services & Pricing"},{key:"canManageStaff",label:"Invite & Manage Other Staff Members"}].map(({key:C,label:w})=>{const D=b[C];return c.jsxs("label",{className:"flex items-center justify-between text-xs text-slate-700 cursor-pointer select-none py-1 hover:text-slate-900",children:[c.jsx("span",{children:w}),c.jsx("input",{type:"checkbox",checked:D,onChange:()=>S(C),className:"w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500 cursor-pointer"})]},C)})})]}),c.jsxs("div",{className:"pt-3 border-t border-border flex items-center justify-end space-x-3",children:[c.jsx("button",{type:"button",onClick:e,className:"px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl",children:"Cancel"}),c.jsx("button",{type:"submit",className:"px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25",children:"Send Staff Invite"})]})]})]})})},tE=({isOpen:s,onClose:e})=>{const{addTenant:t}=On(),[r,o]=we.useState(""),[l,d]=we.useState(""),[h,f]=we.useState(""),[m,v]=we.useState(""),[_,y]=we.useState(""),[M,b]=we.useState("Professional"),[T,S]=we.useState(""),[x,I]=we.useState("");if(!s)return null;const C=D=>{const P=D.target.value;o(P),d(P.toLowerCase().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-").slice(0,30))},w=D=>{D.preventDefault();const P=`tenant_${Date.now()}`,U={id:P,name:r.trim(),slug:l.trim()||"clinic",address:h.trim(),phone:m.trim(),email:_.trim(),status:"active",doctorAdminName:T.trim(),doctorAdminEmail:x.trim(),storageMb:120,plan:M,createdAt:new Date().toISOString().split("T")[0]},B={id:`user_doc_${Date.now()}`,tenantId:P,name:T.trim(),email:x.trim(),role:"DOCTOR_ADMIN",title:"Doctor Admin & Clinic Owner",phone:m.trim(),permissions:{canManageAppointments:!0,canManagePatients:!0,canWriteDoctorNotes:!0,canViewRevenue:!0,canManageServices:!0,canManageStaff:!0},status:"active",joinedAt:new Date().toISOString().split("T")[0]};t(U,B),e()};return c.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn",children:c.jsxs("div",{className:"bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]",children:[c.jsxs("div",{className:"px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50",children:[c.jsxs("div",{className:"flex items-center space-x-2.5",children:[c.jsx("div",{className:"p-2 rounded-xl bg-amber-100 text-amber-800",children:c.jsx($s,{size:20})}),c.jsxs("div",{children:[c.jsx("h2",{className:"text-lg font-bold text-slate-900",children:"Provision New Dental Tenant"}),c.jsx("p",{className:"text-xs text-slate-500",children:"Allocate database schema partitioning & establish Doctor Admin credentials."})]})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors",children:c.jsx(is,{size:20})})]}),c.jsxs("form",{onSubmit:w,className:"p-6 space-y-4 overflow-y-auto flex-1",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-slate-700 mb-2",children:"Clinic Organization Profile"}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Clinic Legal Name"}),c.jsx("input",{type:"text",required:!0,placeholder:"e.g. Cedar Valley Smiles",value:r,onChange:C,className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Tenant URI Subdomain Slug"}),c.jsxs("div",{className:"flex items-center bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs",children:[c.jsx("input",{type:"text",required:!0,value:l,onChange:D=>d(D.target.value),className:"bg-transparent text-primary-700 font-mono font-bold focus:outline-none w-full"}),c.jsx("span",{className:"text-slate-400",children:".dentrix.io"})]})]}),c.jsxs("div",{className:"sm:col-span-2",children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Clinic Physical Address"}),c.jsx("input",{type:"text",required:!0,placeholder:"Street, City, State, ZIP",value:h,onChange:D=>f(D.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Main Clinic Phone"}),c.jsx("input",{type:"tel",required:!0,placeholder:"(512) 555-0100",value:m,onChange:D=>v(D.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Billing & Tier Plan"}),c.jsxs("select",{value:M,onChange:D=>b(D.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600",children:[c.jsx("option",{value:"Starter",children:"Starter (1-2 Chairs)"}),c.jsx("option",{value:"Professional",children:"Professional (3-6 Chairs)"}),c.jsx("option",{value:"Enterprise",children:"Enterprise (Multi-Location)"})]})]})]})]}),c.jsxs("div",{className:"pt-2",children:[c.jsxs("h3",{className:"text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5",children:[c.jsx(lh,{size:14,className:"text-primary-600"})," Tenant Owner (Doctor Admin)"]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Doctor Full Name"}),c.jsx("input",{type:"text",required:!0,placeholder:"e.g. Dr. Emily Chen, DDS",value:T,onChange:D=>S(D.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs font-semibold text-slate-700 mb-1",children:"Doctor Admin Email"}),c.jsx("input",{type:"email",required:!0,placeholder:"dr.chen@clinic.com",value:x,onChange:D=>I(D.target.value),className:"w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"})]})]})]}),c.jsxs("div",{className:"p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center space-x-2 text-xs text-amber-900",children:[c.jsx(ah,{size:16,className:"text-amber-700 flex-shrink-0"}),c.jsx("span",{children:"Provisions isolated tenant partition with strict RLS and dedicated encryption key."})]}),c.jsxs("div",{className:"pt-3 border-t border-border flex items-center justify-end space-x-3",children:[c.jsx("button",{type:"button",onClick:e,className:"px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl",children:"Cancel"}),c.jsx("button",{type:"submit",className:"px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md shadow-amber-600/25",children:"Provision Tenant"})]})]})]})})},nE=()=>{const{currentUser:s}=On(),[e,t]=we.useState("dashboard"),[r,o]=we.useState(null),[l,d]=we.useState(!1),[h,f]=we.useState(void 0),[m,v]=we.useState(!1),[_,y]=we.useState(!1),[M,b]=we.useState(!1),[T,S]=we.useState(!1),x=D=>{o(D)},I=D=>{f(D),d(!0)},C=()=>{f(void 0),d(!0)},w=D=>{t(D),o(null)};return c.jsxs("div",{className:"flex h-screen w-screen overflow-hidden bg-[#F8F9FA] text-slate-800",children:[c.jsx(Bw,{currentRoute:e,onNavigate:w}),c.jsxs("div",{className:"flex-1 flex flex-col min-w-0 overflow-hidden",children:[c.jsx(jw,{onQuickBook:C}),c.jsx("main",{className:"flex-1 overflow-y-auto",children:r?c.jsx(Xw,{patientId:r,onBack:()=>o(null),onBookAppointment:I}):c.jsxs(c.Fragment,{children:[e==="dashboard"&&c.jsx(Vw,{onNavigate:w,onBookAppointment:C,onSelectPatient:x}),e==="appointments"&&c.jsx(Hw,{onBookAppointment:C,onSelectPatient:x}),e==="patients"&&c.jsx(Gw,{onSelectPatient:x,onOpenAddPatient:()=>v(!0)}),e==="revenue"&&c.jsx($w,{}),e==="staff"&&c.jsx(qw,{onOpenAddStaff:()=>b(!0)}),e==="services"&&c.jsx(Yw,{onOpenAddService:()=>y(!0)}),e==="tenants"&&c.jsx(Kw,{onOpenOnboardModal:()=>S(!0)})]})})]}),c.jsx(Jw,{isOpen:l,onClose:()=>d(!1),initialPatientId:h}),c.jsx(Zw,{isOpen:m,onClose:()=>v(!1)}),c.jsx(Qw,{isOpen:_,onClose:()=>y(!1)}),c.jsx(eE,{isOpen:M,onClose:()=>b(!1)}),c.jsx(tE,{isOpen:T,onClose:()=>S(!1)})]})},iE=()=>c.jsx(jv,{children:c.jsx(Vv,{children:c.jsx(nE,{})})});Lv.createRoot(document.getElementById("root")).render(c.jsx(Tv.StrictMode,{children:c.jsx(iE,{})}));
