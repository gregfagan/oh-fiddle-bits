(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{19:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),a=t(18),i=t.n(a),c=(t(34),t(1)),u=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  display: flex;\n\n  /* Grow down */\n  flex-flow: column;\n\n  /* Grow and shrink without a basis */\n  flex: 1 1 0;\n\n  /* Prevent child elements from pushing out the size of this one */\n  overflow: hidden;\n"]);var l=c.b.div(u),s=g(["\n  flex-flow: ",";\n"]),f=g(["\n  background: #111;\n  flex: 0 0 auto;\n  flex-flow: ",";\n  align-items: center;\n"]),p=g(["\n  display: block;\n  user-select: none;\n  cursor: ",";\n  padding: ",";\n  outline: none;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n  font-weight: bold;\n  color: ",";\n  background: ",";\n  flex-grow: ","\n    ",";\n"]),h=g(["\n      border-",": 5px solid transparent;\n      border-",": 5px solid red;\n    "]);function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,n){return(d=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function v(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,n){return!n||"object"!==y(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function m(e){return(m=Object.getPrototypeOf||function(e){return e.__proto__})(e)}function g(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function w(e){return encodeURI("#"+e.replace(" ","-"))}var O=Object(c.b)(l)(s,function(e){return e.portrait?"column-reverse":"row"}),j=Object(c.b)(l.withComponent("nav"))(f,function(e){return e.portrait?"row":"column"}),P=l.withComponent("main"),E=c.b.a.attrs({rel:"internal",href:function(e){return e.render&&w(e.children)}})(p,function(e){return e.render?"pointer":"default"},function(e){return e.portrait?"1em":"1em 3em"},function(e){return e.render?"white":"#222"},function(e){return e.selected&&"#222"},function(e){return e.portrait?1:0},function(e){return e.selected&&Object(c.a)(h,e.portrait?"top":"right",e.portrait?"bottom":"left")});function k(){return window.innerWidth<window.innerHeight}var S=function(e){function n(){var e,t,r;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return b(r,(t=r=b(this,(e=m(n)).call.apply(e,[this].concat(a))),r.state={portrait:k()},t))}var t,r,a;return t=n,(r=[{key:"componentDidMount",value:function(){var e=this;window.onhashchange=function(){return e.forceUpdate()},window.onresize=function(){return e.orient()}}},{key:"orient",value:function(){var e=k();e!==this.state.portrait&&this.setState({portrait:e})}},{key:"render",value:function(){var e,n=this.state.portrait,t=this.props.children,r=window.location.hash,a=o.a.Children.toArray(t).map(function(t,a){var i=t.props,c=i.children,u=i.render,l=r?r===w(c):0===a;return l&&u&&(e=u()),o.a.cloneElement(t,{portrait:n,selected:l})});return o.a.createElement(O,{portrait:n},o.a.createElement(j,{portrait:n},a),o.a.createElement(P,null,e))}}])&&v(t.prototype,r),a&&v(t,a),function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");d(e.prototype,n&&n.prototype),n&&d(e,n)}(n,e),n}(r.Component),x=C(["\n  align-items: center;\n  padding: 2em;\n"]),q=C(["\n  background: orange;\n  border: none;\n  padding: 10px;\n  cursor: pointer;\n"]);function C(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var T=l.withComponent("figure"),_=Object(c.b)(l)(x),M=function(e){var n=e.display,t=e.controls;return o.a.createElement(o.a.Fragment,null,o.a.createElement(T,null,n),o.a.createElement(_,null,t))},F=(c.b.button(q),t(14)),R=t(4),z=window.AudioContext||window.webkitAudioContext,A=Math.log(2),I=function(){for(var e=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],n=[],t=0;t<=8;t++)for(var r=0;r<e.length;r++){var o=e[r];n.push(o+t)}return n}(),U=I.indexOf("A4"),W=440;function D(e,n){return Math.floor(Math.log(e/n)/A*1200)}function B(e,n){return e*Math.pow(2,n/1200)}function G(e,n){for(var t=-1,r=0,o=8;o<=1e3;o++){for(var a=0,i=0;i<1024;i++)a+=(e[i]-128)/128*((e[i+o]-128)/128);var c=a/(1024+o);if(c>r&&(r=c,t=o),c>.9)break}return r>.0025?n/t:void 0}var L=t(5),H=t.n(L);function J(){var e;return e=H.a.mark(function e(){var n,t,r,o;return H.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=new z,(t=n.createAnalyser()).fftSize=2048,r=new Uint8Array(t.fftSize),n.suspend(),e.next=7,navigator.mediaDevices.getUserMedia({audio:!0});case 7:return o=e.sent,n.createMediaStreamSource(o).connect(t),e.abrupt("return",{start:function(){return n.resume()},stop:function(){return n.suspend()},destroy:function(){return n.close()},samplePitch:function(){return t.getByteTimeDomainData(r),G(r,n.sampleRate)}});case 11:case"end":return e.stop()}},e,this)}),(J=function(){var n=this,t=arguments;return new Promise(function(r,o){var a=e.apply(n,t);function i(e,n){try{var t=a[e](n),i=t.value}catch(e){return void o(e)}t.done?r(i):Promise.resolve(i).then(c,u)}function c(e){i("next",e)}function u(e){i("throw",e)}c()})}).apply(this,arguments)}var N=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  display: block;\n  width: 100%;\n  height: 100%;\n  touch-action: none;\n"]);function Q(e){return(Q="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function X(e,n){return(X=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function V(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function $(e,n){return!n||"object"!==Q(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function K(e){return(K=Object.getPrototypeOf||function(e){return e.__proto__})(e)}function Y(e,n,t){return n*(1-e)+t*e}var Z=.5,ee=c.b.canvas.attrs({"touch-action":"none"})(N);var ne=function(e){function n(){var e,t,r;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return $(r,(t=r=$(this,(e=K(n)).call.apply(e,[this].concat(a))),r.canvasEl=null,r.snapRefId=null,r.state={panning:!1,panStart:null,startFrequency:0,snapStart:null,snapToFrequency:0},r.setCanvasRef=function(e){r.canvasEl=e,r.props.measureRef(e)},r.startPanning=function(e){var n=r.props.frequency;r.snapRafId&&(cancelAnimationFrame(r.snapRafId),r.snapRafId=void 0),r.setState({panning:!0,panStart:e.nativeEvent.clientX,startFrequency:n})},r.pan=function(e){var n=r.state,t=n.panning,o=n.panStart,a=n.startFrequency,i=r.props,c=i.onFrequencyChange,u=i.pixelsPerCent;t&&c(B(a,-(e.nativeEvent.clientX-o)/u))},r.stopPanning=function(){r.state.panning&&r.setState(function(e,n){var t,r,o=n.frequency,a=(t=D(o,W),r=Math.round(t/100),U+r),i=B(W,100*(a-U));return{panning:!1,snapStart:performance.now(),startFrequency:o,snapToFrequency:i}},r.snap)},r.snap=function(){var e=r.state,n=e.panning,t=e.snapStart,o=e.startFrequency,a=e.snapToFrequency,i=r.props.onFrequencyChange;if(!n){var c=Math.min((performance.now()-t)/(1e3*Z),1);if(c<1){var u=D(a,o);i(B(o,Object(R.a)(c)*u)),r.snapRafId=requestAnimationFrame(r.snap)}else i(a)}},t))}var t,r,a;return t=n,(r=[{key:"componentDidUpdate",value:function(){this.renderGraphics()}},{key:"render",value:function(){var e=this.props.onFrequencyChange;return o.a.createElement(ee,{innerRef:this.setCanvasRef,onPointerDown:e&&this.startPanning,onPointerUp:e&&this.stopPanning,onPointerCancel:e&&this.stopPanning,onPointerOut:e&&this.stopPanning,onPointerMove:e&&this.pan})}},{key:"renderGraphics",value:function(){var e=this.canvasEl,n=this.props;if(e){var t,r,o=e.getContext("2d"),a=n.frequency,i=void 0===a?0:a,c=n.contentRect,u=n.pixelsPerCent,l=c.bounds.width,s=(t=c.bounds,r=window.devicePixelRatio,{width:Math.round(r*t.right)-Math.round(r*t.left),height:Math.round(r*t.bottom)-Math.round(r*t.top)}),f=s.width,p=s.height;e.width=f,e.height=p,o.fillStyle="white",o.fillRect(0,0,f,p);var h=.5*f,y=.5*p,d=7*window.devicePixelRatio;o.strokeStyle="rgba(255, 0, 0, 0.75)",o.lineWidth=d,o.beginPath(),o.moveTo(h,y),o.lineTo(h,p),o.closePath(),o.stroke();var v=l/u,b=f/v,m=D(i,W),g=Math.floor((m+50)/100),w=U+g,O=m-100*g;o.textAlign="center",o.fillStyle="gray",o.strokeStyle="gray";for(var j=Math.ceil(v/200)+1,P=-j;P<=j;P++){o.lineWidth=d/2;var E=h-(O+100*P)*b;o.beginPath(),o.moveTo(E,.67*p),o.lineTo(E,p),o.closePath(),o.stroke();var k=I[w-P],S=0===P?Object(R.b)(1-Math.abs(O/50)):0,x=Y(S,.1,.2)*p,q=Y(S,.64,.44)*p;if(o.font="bold ".concat(x,"px sans-serif"),o.fillText(k,E,q),u>1.75&&(o.lineWidth=d/3,P!==-j))for(var C=1;C<=9;C++){var T=E+10*C*b;o.beginPath(),o.moveTo(T,.9*p),o.lineTo(T,p),o.closePath(),o.stroke()}}var _=Math.min(.26*p,.1*f),M=.25*_;o.font="bold ".concat(_,"px sans-serif"),o.fillStyle="black",o.textAlign="left",o.textBaseline="top",o.fillText(i.toFixed(1),M,M)}}}])&&V(t.prototype,r),a&&V(t,a),function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");X(e.prototype,n&&n.prototype),n&&X(e,n)}(n,e),n}(r.Component);ne.defaultProps={pixelsPerCent:3};var te=Object(F.withContentRect)("bounds")(ne);function re(){return(re=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var oe=o.a.createElement("path",{d:"M276.02 303.939h.453l-.453-8.959C276.02 171.362 376.382 71 500 71s223.98 100.362 223.98 223.98l-.453 8.959h.453v250.857h-.906c-4.507 119.543-102.955 215.02-223.527 215.02-120.572 0-219.02-95.477-223.527-215.02V303.939z",fill:"#fff"}),ae=o.a.createElement("path",{d:"M764.264 545.494a27.257 27.257 0 0 1-.315-4.137c0-14.93 12.121-27.051 27.051-27.051 14.93 0 27.051 12.121 27.051 27.051v.514C817.773 717.172 675.366 859.408 500 859.408c-175.537 0-318.051-142.514-318.051-318.051l.001-.175c.094-14.849 12.178-26.876 27.05-26.876 14.93 0 27.051 12.121 27.051 27.051 0 1.406-.108 2.788-.315 4.137C237.951 689.46 355.514 805.653 500 805.653c144.487 0 262.05-116.194 264.264-260.159zM410.348 895.125h179.304c14.93 0 27.051 12.121 27.051 27.051 0 14.929-12.121 27.051-27.051 27.051H410.348c-14.93 0-27.051-12.122-27.051-27.051 0-14.93 12.121-27.051 27.051-27.051z",fill:"#fff"}),ie=function(e){return o.a.createElement("svg",re({viewBox:"0 0 1000 1000",fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:1.414},e),oe,ae)},ce=(t.p,de(["\n  height: 100%;\n  path {\n    fill: ",";\n  }\n"])),ue=de(["\n  align-items: center;\n  justify-content: center;\n"]);function le(e){return(le="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function se(e,n){return(se=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function fe(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function pe(e,n){return!n||"object"!==le(n)&&"function"!==typeof n?ye(e):n}function he(e){return(he=Object.getPrototypeOf||function(e){return e.__proto__})(e)}function ye(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function de(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var ve=Object(c.b)(function(e){e.on;var n=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,["on"]);return o.a.createElement(ie,n)})(ce,function(e){return e.on?"white":"black"}),be=Object(c.b)(l)(ue),me=function(e){function n(){var e,t,r;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return pe(r,(t=r=pe(this,(e=he(n)).call.apply(e,[this].concat(a))),r.rafId=null,r.analyser=null,r.state={tuning:!1,frequency:void 0,error:void 0},r.toggleTuner=function(){r.setState(function(e){return{tuning:!e.tuning}})},r.sample=function(){var e=ye(ye(r)),n=e.analyser,t=e.sample,o=n.samplePitch();void 0!==o&&r.setState({frequency:o}),r.rafId=requestAnimationFrame(t)},t))}var t,r,a;return t=n,(r=[{key:"componentDidUpdate",value:function(e,n){var t=this,r=this.analyser,o=this.state.tuning;o!==n.tuning&&(r?o?this.startTuner():this.stopTuner():function(){return J.apply(this,arguments)}().then(function(e){t.analyser=e,t.startTuner()}).catch(function(e){console.error(e),t.setState({error:e})}))}},{key:"componentWillUnmount",value:function(){var e=this.analyser,n=this.rafId;e&&e.destroy(),n&&cancelAnimationFrame(n)}},{key:"startTuner",value:function(){this.analyser.start(),this.rafId=requestAnimationFrame(this.sample)}},{key:"stopTuner",value:function(){this.analyser.stop(),cancelAnimationFrame(this.rafId)}},{key:"render",value:function(){var e=this.state,n=e.error,t=e.tuning,r=e.frequency;return n?o.a.createElement(be,null,"error: no microphone"):o.a.createElement(M,{display:o.a.createElement(te,{frequency:r,pixelsPerCent:3}),controls:o.a.createElement(ve,{on:t,onClick:this.toggleTuner})})}}])&&fe(t.prototype,r),a&&fe(t,a),function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");se(e.prototype,n&&n.prototype),n&&se(e,n)}(n,e),n}(r.PureComponent),ge=Oe(["\n  height: 100%;\n  stroke: ",";\n  fill: transparent;\n  stroke-width: 0.6;\n"]),we=Oe(["\n  transition: 0.15s transform, 0.05s stroke-width;\n  transform: ",";\n  stroke-width: ",";\n"]);function Oe(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var je,Pe=2*Math.PI,Ee=c.b.svg(ge,function(e){return e.on?"white":"black"}),ke=c.b.path.attrs({d:(je=3,"\nM ".concat(-Pe," 0\nQ ").concat(1.5*-Math.PI," ").concat(je," ").concat(-Math.PI," 0\nT 0 0\nT ").concat(Math.PI," 0\nT ").concat(Pe," 0\n"))})(we,function(e){return e.on?"scale(1, 1)":"scale(100, 1)"},function(e){return e.on?.75:.45}),Se=function(e){var n=e.on,t=e.frequency,r=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,["on","frequency"]);return o.a.createElement(Ee,Object.assign({viewBox:"0 0 10 10",on:n,frequency:t},r),o.a.createElement("circle",{cx:"5",cy:"5",r:"4.5"}),o.a.createElement("svg",{x:.7,y:1,width:8.6,height:8,viewBox:"".concat(-1.9*Math.PI," -1 ").concat(3.8*Math.PI," 2")},o.a.createElement(ke,{on:n,frequency:t})))};function xe(e){return(xe="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function qe(e,n){return(qe=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function Ce(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Te(e,n){return!n||"object"!==xe(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function _e(e){return(_e=Object.getPrototypeOf||function(e){return e.__proto__})(e)}var Me=function(e){function n(){var e,t,r;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return Te(r,(t=r=Te(this,(e=_e(n)).call.apply(e,[this].concat(a))),r.generator=null,r.state={frequency:440,playing:!1},r.toggleTone=function(){r.setState(function(e){return{playing:!e.playing}})},r.setFrequency=function(e){r.setState({frequency:e})},t))}var t,r,a;return t=n,(r=[{key:"componentDidUpdate",value:function(e,n){var t,r,o=this.generator,a=this.state,i=a.frequency;a.playing!==n.playing&&(o||(t=new z,(r=t.createOscillator()).start(),r.connect(t.destination),t.suspend(),(o={setFrequency:function(e){return r.frequency.value=e},start:function(){return t.resume()},stop:function(){return t.suspend()},destroy:function(){return t.close()}}).setFrequency(i),this.generator=o),n.playing?o.stop():o.start()),o&&i!==n.frequency&&o.setFrequency(i)}},{key:"componentWillUnmount",value:function(){var e=this.generator;e&&e.destroy()}},{key:"render",value:function(){var e=this.state,n=e.playing,t=e.frequency;return o.a.createElement(M,{display:o.a.createElement(te,{frequency:t,onFrequencyChange:this.setFrequency,pixelsPerCent:1.4}),controls:o.a.createElement(Se,{on:n,frequency:t,onClick:this.toggleTone})})}}])&&Ce(t.prototype,r),a&&Ce(t,a),function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");qe(e.prototype,n&&n.prototype),n&&qe(e,n)}(n,e),n}(r.Component),Fe=ze(["\n  padding: 1em;\n"]),Re=ze(["\n  font-weight: normal;\n  font-size: 1.5em;\n"]);function ze(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var Ae=c.b.header(Fe),Ie=c.b.h1(Re),Ue=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function We(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(o.a.createElement(function(e){var n=e.extraOptions;return o.a.createElement(o.a.Fragment,null,o.a.createElement(Ae,null,o.a.createElement(Ie,null,"oh fiddle bits!")),o.a.createElement(S,null,o.a.createElement(E,{render:function(){return o.a.createElement(me,null)}},"tune"),o.a.createElement(E,{render:function(){return o.a.createElement(Me,null)}},"tone"),o.a.createElement(E,null,"beat"),n))},null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL(".",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat(".","/service-worker.js");Ue?(function(e){fetch(e).then(function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):We(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):We(e)})}}()},34:function(e,n,t){},48:function(e,n,t){t(47),e.exports=t(19)}},[[48,0,1]]]);
//# sourceMappingURL=main.14999269.chunk.js.map