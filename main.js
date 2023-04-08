/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var t={662:t=>{var e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},i=function(){function t(i){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e(this,t),!(i instanceof Node))throw"Can't initialize VanillaTilt because "+i+" is not a Node.";this.width=null,this.height=null,this.clientWidth=null,this.clientHeight=null,this.left=null,this.top=null,this.gammazero=null,this.betazero=null,this.lastgammazero=null,this.lastbetazero=null,this.transitionTimeout=null,this.updateCall=null,this.event=null,this.updateBind=this.update.bind(this),this.resetBind=this.reset.bind(this),this.element=i,this.settings=this.extendSettings(s),this.reverse=this.settings.reverse?-1:1,this.resetToStart=t.isSettingTrue(this.settings["reset-to-start"]),this.glare=t.isSettingTrue(this.settings.glare),this.glarePrerender=t.isSettingTrue(this.settings["glare-prerender"]),this.fullPageListening=t.isSettingTrue(this.settings["full-page-listening"]),this.gyroscope=t.isSettingTrue(this.settings.gyroscope),this.gyroscopeSamples=this.settings.gyroscopeSamples,this.elementListener=this.getElementListener(),this.glare&&this.prepareGlare(),this.fullPageListening&&this.updateClientSize(),this.addEventListeners(),this.reset(),!1===this.resetToStart&&(this.settings.startX=0,this.settings.startY=0)}return t.isSettingTrue=function(t){return""===t||!0===t||1===t},t.prototype.getElementListener=function(){if(this.fullPageListening)return window.document;if("string"==typeof this.settings["mouse-event-element"]){var t=document.querySelector(this.settings["mouse-event-element"]);if(t)return t}return this.settings["mouse-event-element"]instanceof Node?this.settings["mouse-event-element"]:this.element},t.prototype.addEventListeners=function(){this.onMouseEnterBind=this.onMouseEnter.bind(this),this.onMouseMoveBind=this.onMouseMove.bind(this),this.onMouseLeaveBind=this.onMouseLeave.bind(this),this.onWindowResizeBind=this.onWindowResize.bind(this),this.onDeviceOrientationBind=this.onDeviceOrientation.bind(this),this.elementListener.addEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.addEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.addEventListener("mousemove",this.onMouseMoveBind),(this.glare||this.fullPageListening)&&window.addEventListener("resize",this.onWindowResizeBind),this.gyroscope&&window.addEventListener("deviceorientation",this.onDeviceOrientationBind)},t.prototype.removeEventListeners=function(){this.elementListener.removeEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.removeEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.removeEventListener("mousemove",this.onMouseMoveBind),this.gyroscope&&window.removeEventListener("deviceorientation",this.onDeviceOrientationBind),(this.glare||this.fullPageListening)&&window.removeEventListener("resize",this.onWindowResizeBind)},t.prototype.destroy=function(){clearTimeout(this.transitionTimeout),null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.reset(),this.removeEventListeners(),this.element.vanillaTilt=null,delete this.element.vanillaTilt,this.element=null},t.prototype.onDeviceOrientation=function(t){if(null!==t.gamma&&null!==t.beta){this.updateElementPosition(),this.gyroscopeSamples>0&&(this.lastgammazero=this.gammazero,this.lastbetazero=this.betazero,null===this.gammazero?(this.gammazero=t.gamma,this.betazero=t.beta):(this.gammazero=(t.gamma+this.lastgammazero)/2,this.betazero=(t.beta+this.lastbetazero)/2),this.gyroscopeSamples-=1);var e=this.settings.gyroscopeMaxAngleX-this.settings.gyroscopeMinAngleX,i=this.settings.gyroscopeMaxAngleY-this.settings.gyroscopeMinAngleY,s=e/this.width,n=i/this.height,o=(t.gamma-(this.settings.gyroscopeMinAngleX+this.gammazero))/s,r=(t.beta-(this.settings.gyroscopeMinAngleY+this.betazero))/n;null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.event={clientX:o+this.left,clientY:r+this.top},this.updateCall=requestAnimationFrame(this.updateBind)}},t.prototype.onMouseEnter=function(){this.updateElementPosition(),this.element.style.willChange="transform",this.setTransition()},t.prototype.onMouseMove=function(t){null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.event=t,this.updateCall=requestAnimationFrame(this.updateBind)},t.prototype.onMouseLeave=function(){this.setTransition(),this.settings.reset&&requestAnimationFrame(this.resetBind)},t.prototype.reset=function(){this.onMouseEnter(),this.fullPageListening?this.event={clientX:(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.clientWidth,clientY:(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.clientHeight}:this.event={clientX:this.left+(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.width,clientY:this.top+(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.height};var t=this.settings.scale;this.settings.scale=1,this.update(),this.settings.scale=t,this.resetGlare()},t.prototype.resetGlare=function(){this.glare&&(this.glareElement.style.transform="rotate(180deg) translate(-50%, -50%)",this.glareElement.style.opacity="0")},t.prototype.getValues=function(){var t=void 0,e=void 0;return this.fullPageListening?(t=this.event.clientX/this.clientWidth,e=this.event.clientY/this.clientHeight):(t=(this.event.clientX-this.left)/this.width,e=(this.event.clientY-this.top)/this.height),t=Math.min(Math.max(t,0),1),e=Math.min(Math.max(e,0),1),{tiltX:(this.reverse*(this.settings.max-t*this.settings.max*2)).toFixed(2),tiltY:(this.reverse*(e*this.settings.max*2-this.settings.max)).toFixed(2),percentageX:100*t,percentageY:100*e,angle:Math.atan2(this.event.clientX-(this.left+this.width/2),-(this.event.clientY-(this.top+this.height/2)))*(180/Math.PI)}},t.prototype.updateElementPosition=function(){var t=this.element.getBoundingClientRect();this.width=this.element.offsetWidth,this.height=this.element.offsetHeight,this.left=t.left,this.top=t.top},t.prototype.update=function(){var t=this.getValues();this.element.style.transform="perspective("+this.settings.perspective+"px) rotateX("+("x"===this.settings.axis?0:t.tiltY)+"deg) rotateY("+("y"===this.settings.axis?0:t.tiltX)+"deg) scale3d("+this.settings.scale+", "+this.settings.scale+", "+this.settings.scale+")",this.glare&&(this.glareElement.style.transform="rotate("+t.angle+"deg) translate(-50%, -50%)",this.glareElement.style.opacity=""+t.percentageY*this.settings["max-glare"]/100),this.element.dispatchEvent(new CustomEvent("tiltChange",{detail:t})),this.updateCall=null},t.prototype.prepareGlare=function(){if(!this.glarePrerender){var t=document.createElement("div");t.classList.add("js-tilt-glare");var e=document.createElement("div");e.classList.add("js-tilt-glare-inner"),t.appendChild(e),this.element.appendChild(t)}this.glareElementWrapper=this.element.querySelector(".js-tilt-glare"),this.glareElement=this.element.querySelector(".js-tilt-glare-inner"),this.glarePrerender||(Object.assign(this.glareElementWrapper.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden","pointer-events":"none","border-radius":"inherit"}),Object.assign(this.glareElement.style,{position:"absolute",top:"50%",left:"50%","pointer-events":"none","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"}),this.updateGlareSize())},t.prototype.updateGlareSize=function(){if(this.glare){var t=2*(this.element.offsetWidth>this.element.offsetHeight?this.element.offsetWidth:this.element.offsetHeight);Object.assign(this.glareElement.style,{width:t+"px",height:t+"px"})}},t.prototype.updateClientSize=function(){this.clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},t.prototype.onWindowResize=function(){this.updateGlareSize(),this.updateClientSize()},t.prototype.setTransition=function(){var t=this;clearTimeout(this.transitionTimeout),this.element.style.transition=this.settings.speed+"ms "+this.settings.easing,this.glare&&(this.glareElement.style.transition="opacity "+this.settings.speed+"ms "+this.settings.easing),this.transitionTimeout=setTimeout((function(){t.element.style.transition="",t.glare&&(t.glareElement.style.transition="")}),this.settings.speed)},t.prototype.extendSettings=function(t){var e={reverse:!1,max:15,startX:0,startY:0,perspective:1e3,easing:"cubic-bezier(.03,.98,.52,.99)",scale:1,speed:300,transition:!0,axis:null,glare:!1,"max-glare":1,"glare-prerender":!1,"full-page-listening":!1,"mouse-event-element":null,reset:!0,"reset-to-start":!0,gyroscope:!0,gyroscopeMinAngleX:-45,gyroscopeMaxAngleX:45,gyroscopeMinAngleY:-45,gyroscopeMaxAngleY:45,gyroscopeSamples:10},i={};for(var s in e)if(s in t)i[s]=t[s];else if(this.element.hasAttribute("data-tilt-"+s)){var n=this.element.getAttribute("data-tilt-"+s);try{i[s]=JSON.parse(n)}catch(t){i[s]=n}}else i[s]=e[s];return i},t.init=function(e,i){e instanceof Node&&(e=[e]),e instanceof NodeList&&(e=[].slice.call(e)),e instanceof Array&&e.forEach((function(e){"vanillaTilt"in e||(e.vanillaTilt=new t(e,i))}))},t}();"undefined"!=typeof document&&(window.VanillaTilt=i,i.init(document.querySelectorAll("[data-tilt]"))),t.exports=i}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,i),o.exports}(()=>{const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class o{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}}const r=t=>new o("string"==typeof t?t:t+"",void 0,s),a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(i,t,s)},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t;var d;const c=window,h=c.trustedTypes,p=h?h.emptyScript:"",g=c.reactiveElementPolyfillSupport,m={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:u};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=f){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:m).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:m;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var b;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==g||g({ReactiveElement:v}),(null!==(d=c.reactiveElementVersions)&&void 0!==d?d:c.reactiveElementVersions=[]).push("1.6.1");const x=window,w=x.trustedTypes,y=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,k=`lit$${(Math.random()+"").slice(9)}$`,_="?"+k,$=`<${_}>`,E=document,A=(t="")=>E.createComment(t),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,j=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,C=/-->/g,T=/>/g,L=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),M=/'/g,P=/"/g,R=/^(?:script|style|textarea|title)$/i,I=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),N=I(1),U=(I(2),Symbol.for("lit-noChange")),B=Symbol.for("lit-nothing"),H=new WeakMap,X=E.createTreeWalker(E,129,null,!1),O=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=S;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===S?"!--"===l[1]?r=C:void 0!==l[1]?r=T:void 0!==l[2]?(R.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=L):void 0!==l[3]&&(r=L):r===L?">"===l[0]?(r=null!=n?n:S,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?L:'"'===l[3]?P:M):r===P||r===M?r=L:r===C||r===T?r=S:(r=L,n=void 0);const h=r===L&&t[e+1].startsWith("/>")?" ":"";o+=r===S?i+$:d>=0?(s.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+k+h):i+k+(-2===d?(s.push(void 0),e):h)}const a=o+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(a):a,s]};class D{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,d]=O(t,e);if(this.el=D.createElement(l,i),X.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=X.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(k)){const i=d[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(k),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?V:"@"===e[1]?Z:q})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(R.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],A()),X.nextNode(),a.push({type:2,index:++n});s.append(t[e],A())}}}else if(8===s.nodeType)if(s.data===_)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function W(t,e,i=t,s){var n,o,r,a;if(e===U)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const d=z(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=W(t,l._$AS(t,e.values),l,s)),e}class F{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);X.currentNode=n;let o=X.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new Y(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new K(o,this,t)),this.u.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(o=X.nextNode(),r++)}return n}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{constructor(t,e,i,s){var n;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),z(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==U&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>j(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==B&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=D.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(i);else{const t=new F(n,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=H.get(t.strings);return void 0===e&&H.set(t.strings,e=new D(t)),e}k(t){j(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Y(this.O(A()),this.O(A()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,i,s,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=W(this,t,e,0),o=!z(t)||t!==this._$AH&&t!==U,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=W(this,s[i+r],e,r),a===U&&(a=this._$AH[r]),o||(o=!z(a)||a!==this._$AH[r]),a===B?t=B:t!==B&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}const J=w?w.emptyScript:"";class V extends q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==B?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class Z extends q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=W(this,t,e,0))&&void 0!==i?i:B)===U)return;const s=this._$AH,n=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==B&&(s===B||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const Q=x.litHtmlPolyfillSupport;var tt,et;null==Q||Q(D,Y),(null!==(b=x.litHtmlVersions)&&void 0!==b?b:x.litHtmlVersions=[]).push("2.6.1");class it extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new Y(e.insertBefore(A(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return U}}it.finalized=!0,it._$litElement$=!0,null===(tt=globalThis.litElementHydrateSupport)||void 0===tt||tt.call(globalThis,{LitElement:it});const st=globalThis.litElementPolyfillSupport;var nt;null==st||st({LitElement:it}),(null!==(et=globalThis.litElementVersions)&&void 0!==et?et:globalThis.litElementVersions=[]).push("3.2.2"),null===(nt=window.HTMLSlotElement)||void 0===nt||nt.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");var ot=i(662);const rt="#000000",at="#f5f5f5",lt="#e5e5e5",dt="#f5f5f5",ct="#939caa",ht="#F073C8",pt="#7e04e8",gt="#ffffff",mt="#f6f6f6",ut="#edeff1",ft="#a8a8a9",vt="linear-gradient(90deg, #f073c8 0%, #ff6a95 99%)",bt="linear-gradient(90deg, #ffffff 0%, #f6f6f6 99%)",xt=a`
  .intro-section {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    position: relative;
  }

  .details-intro-sec {
    width: 60%;
    flex: 1;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .btn-open-contact {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }

  .download-resume {
    margin-left: 1rem;
    color: ${r(rt)};
    text-decoration: none;
    text-decoration: underline;
  }

  .intro-abme {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    margin: auto;
  }

  .settat {
    display: flex;
    top: 0;
    left: 0;
  }

  .contact-wraper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
  }
  .intro-text {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #insideShadow{
    margin: 0;
  }

  .intro-text p{
    color: ${r(rt)};
    letter-spacing: 1px;
    line-height: 2em;
    text-align: center;
  }

  #settat {
    background: url(../.././sourcefile/settat.svg) no-repeat;
    background-size: cover;
    background-position: center;
    width: 30px;
    height: 40px;
    margin-bottom: 1rem;
  }

  .intro-img-abme {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pfp {
    width: 200px;
    filter: drop-shadow(10px 20px 0px lightGray);
  }

  .socialmedia-warp {
    margin-left: 6rem;
  }
  
  @media (max-width: 980px) {
    .contact-wraper {
      align-items: flex-start;
      width: 90%;
    }
    .details-intro-sec{
      width: 90%;
    }
    #insideShadow{
      font-size: 3rem;
    }
    .intro-text p {
      font-size: 2rem;
      text-align: left;
    }
    
      .socialmedia-warp {
        margin-left: 15rem;
      }


  }
  
`;let wt=xt;window.addEventListener("resize",(()=>{wt=xt})),customElements.define("cn-animationtext",class extends it{constructor(){super(),this.animationText='["Kreativitet", "Problemlösning", "Systemutveckling", "Visualisering"]'}updated(){this.#t()}static properties={animationText:{type:String}};render(){return N`
      <style>
        ${this.animationTextCss()}
      </style>

      <h1 id="animated-textt">
        <span
          id="txt-rotate"
          data-period="500"
          data-rotate=${this.animationText}
        ></span>
      </h1>
    `}animationTextCss(){return a`
      #animated-textt {
        opacity: 0;
        color: var(--blueblackCC);
        animation: deley 0.3s fade;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      /* .DeveloperS {
        font-weight: 400;
        margin-bottom: 2rem;
        color: var(--meddleblackCC);
      }
      .DeveloperS span {
        color: var(--blueblackCC);
      } */

      #txt-rotate {
        border-right: 4px solid red;
      }
    `}#t(){var t=function(t,e,i){this.toRotate=e,this.el=t,this.loopNum=0,this.period=parseInt(i,10)||1e3,this.txt="",this.tick(),this.isDeleting=!1};t.prototype.tick=function(){var t=this.loopNum%this.toRotate.length,e=this.toRotate[t];this.isDeleting?this.txt=e.substring(0,this.txt.length-1):this.txt=e.substring(0,this.txt.length+1),this.el.innerHTML='<span class="wrap">'+this.txt+"</span>";var i=this,s=200-100*Math.random();this.isDeleting&&(s/=2),this.isDeleting||this.txt!==e?this.isDeleting&&""===this.txt&&(this.isDeleting=!1,this.loopNum++,s=200):(s=this.period,this.isDeleting=!0),setTimeout((function(){i.tick()}),s)},setTimeout((()=>{var e=this.shadowRoot.getElementById("txt-rotate");this.shadowRoot.getElementById("animated-textt").style.cssText="opacity: 1; transition: 0.3s; animation: deley 0.5s fade-in";var i=e.getAttribute("data-rotate"),s=e.getAttribute("data-period");i&&new t(e,JSON.parse(i),s)}),0)}});const yt=a`
  .socialmedia {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .btnGithub,
  .btnIn {
    padding: 0.4rem 2rem;
    font-size: 1.2rem;
    transition: 0.3s;
    opacity: 0.6;
  }
  .btnGithub img {
    width: 26px;
  }
  .btnIn img {
    width: 26px;
  }

  .btnGithub:hover,
  .btnIn:hover {
    opacity: 1;
    transition: 0.2s;
  }

  @media (max-width: 980px) {
    .btnIn {
      font-size: 2rem; 
    }

    .btnIn img {
      width: 60px;
    }

    .btnGithub img {
      width: 60px;
    }

  }
`;let kt=yt;window.addEventListener("resize",(()=>{kt=yt})),customElements.define("cn-socialmedia",class extends it{constructor(){super()}render(){return N`
      <style>
        ${kt}
      </style>
      <div class="socialmedia">
        <a
          href="https://www.linkedin.com/in/khabib-6176181aa/"
          target="_blank"
          class="btnIn rellax"
          data-rellax-speed="-2"
          ><img src="./sourcefile/icons/linkedin.svg"
        /></a>
        <a
          href="https://github.com/khabbib"
          target="_blank"
          class="btnGithub rellax"
          data-rellax-speed="-2"
          ><img src="./sourcefile/icons/github.svg"
        /></a>
      </div>
    `}});const _t=a`
  .specialbtn {
    width: 100%;
    height: 1px;
    display: flex;
    justify-content: start;
    align-items: center;  
  }

  .expand {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: red;
    transform: 0.3s;
  }

  .transferBtn {
    position: fixed !important;
    transition: 0.3s;
    margin-left: -25%;
    border-radius: 50px;
    z-index: 1;
    transition: all 1s cubic-bezier(0.68, -0.85, 0.265, 2);
  }

  .btnWorks {
    position: absolute;
    background: linear-gradient(90deg, #f073c8 0%, #ff6a95 99%);
    padding: 12px 20px;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-decoration: none;
    transition: all 0.3s;
    color: white;
  }


  .btnWorks .btn-vct {
    margin-left: -10px;
    width: 20px;
    opacity: 0;
    transition: 0.2s;
  }

  .btnWorks:hover {
    border-radius: 50px !important;
    background: linear-gradient(90deg, #f073c8 0%, #ff6a95 99%);
    transition: 0.1s;
  }

  .btnWorks:hover > .btn-vct {
    transition: 0.3s;
    opacity: 1;
    margin-left: 10px;
  }

  @media (max-width: 980px) {
   
    .btnWorks {
      padding: 26px 34px;
      font-size: 2rem;
      border-radius: 10px;
    }

    .btnWorks .btn-vct {
      width: 40px;
    }
  }
`;let $t=_t;window.addEventListener("resize",(()=>{$t=_t})),customElements.define("cn-specialbutton",class extends it{static get styles(){return $t}constructor(){super(),this.buttonName="Works",this.radius="border-radius: 5px;",this.background=`${vt}`,this.textColor=`${gt}`}static properties={buttonName:{type:String},background:{type:String},textColor:{type:String},direction:{type:String},radius:{type:String}};render(){return N`

      <div class="specialbtn" id="btnWraper">
        <a
          href="#works"
          id="btn"
          style="background: ${this.background}; ${this.radius}; color: ${this.textColor};"
          class="animework btnWorks"
          >${"left"===this.direction?N`
                <svg
                  style="transform: rotate(180deg); fill: ${this.textColor}; opacity: 1;;"
                  class="btn-vct"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style="enable-background:new 0 0 512 512;"
                  xml:space="preserve"
                >
                  <path
                    class="st0"
                    d="M502.6,278.6c12.5-12.5,12.5-32.8,0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l73.4,73.4H32
           c-17.7,0-32,14.3-32,32s14.3,32,32,32h370.7l-73.4,73.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0L502.6,278.6L502.6,278.6z"
                  />
                </svg>
                ${this.buttonName}
              `:N` ${this.buttonName}
                <svg
                  style="fill: ${this.textColor};"
                  class="btn-vct"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style="enable-background:new 0 0 512 512;"
                  xml:space="preserve"
                >
                  <path
                    class="st0"
                    d="M502.6,278.6c12.5-12.5,12.5-32.8,0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l73.4,73.4H32
               c-17.7,0-32,14.3-32,32s14.3,32,32,32h370.7l-73.4,73.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0L502.6,278.6L502.6,278.6z"
                  />
                </svg>`}
        </a>
      </div>
    `}});const Et=a`
  .scroll {
    position: absolute;
    bottom: 10px;
    left: 10%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .text-scroll {
    color: ${r(rt)};
    letter-spacing: 1px;
    line-height: 2em;
    transform: rotate(90deg);
  }
  .scroll-i img {
    width: 35px;
    margin-top: 50px;
    animation: scroll 1s cubic-bezier(0.65, -0.55, 0.25, 1.5) infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateY(0);
    }

    40% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`;customElements.define("cn-scroll-down",class extends it{constructor(){super()}render(){return N`
        <style>
            ${Et}
        </style>
        <div class="scroll">
          <p class="text-scroll">Skrolla ner</p>
          <a class="scroll-i" href="#about"
            ><img src=".././sourcefile/scroll.png" alt="scroll"
          /></a>
        </div>
    `}}),customElements.define("cn-about",class extends it{constructor(){super(),this.Rellax=null}static get styles(){return a`
      ${wt}
      `}updated(){this.#e()}render(){return N`
      <div class="intro-section">
        <div class="details-intro-sec">
        <!-- 
        <div class="intro-img-abme ab-an" style="margin-right: 5%;">
        <img
        id="3d-active"
        data-tilt
        data-tilt-scale="1.1"
        data-tilt-max="50"
        data-tilt-speed="400"
        data-tilt-perspective="500"
        class="pfp"
        src="./sourcefile/resume/pic.jpg"
        alt="profile picture"
        />
        </div>
        
        -->
        <div class="contact-wraper">
          <!-- 
            <h3 id="insideShadow">Ett öga i</h3>
            <cn-animationtext></cn-animationtext>
            -->
            <h3 id="insideShadow">Hej :)</h3>
      
            <div class="intro-text">
              <p>
                Jag är en software engineer student och fullstack-utvecklare med
                flera års erfarenhet av att skapa och utveckla nya idéer och
                produkter från start till mål. Jag har en stark förmåga och är
                van att arbeta med flera plattformar och teknologier. Mitt CV ->
                <a
                  href="sourcefile/resume/cv.pdf"
                  target="_blank"
                  class="download-resume"
                  >PDF</a
                >
              </p>
            </div>
            <div class="btn-open-contact">
              <!-- special work btn -->
              <cn-specialbutton buttonName="Works" textColor=${gt}></cn-specialbutton>
              <!-- social media component -->
              <div class="socialmedia-warp">
                <cn-socialmedia></cn-socialmedia>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- scroll down
      <cn-scroll-down></cn-scroll-down>
      -->
    `}#e(){const t=this.shadowRoot.getElementById("3d-active");ot.init(t,{max:25,speed:400})}});const At=a`

.footer{
    border-top: 1px solid ${r(lt)};
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.bg-footer{
    width: 100%;
    margin: auto;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.intro-footer{
    width: 60%;
    margin: auto;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    position: relative;
}
.footer-text{
    width: 50%;
}

.footer-text h1{
    margin-bottom: 1rem;
}
/*  form */

.footer-contact{
    width: 45%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

}
.desc-footer-text{
    color: ${r(rt)};
    letter-spacing: 1px;
    line-height: 2em;
}

.contact{
    width: 100%;

}

/*  inputs */
.inputs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    width: auto;
    margin: auto;
    width: 90%;
}


.user-icon i{
    color: #999;
    font-size: 2rem;
    padding: 1rem;
}

/* inputs */

.inputs{
    width: 100%;
    padding-top: 30px;
    background: none;
    position: relative;
    outline: none;
}
.inputs input{
    padding: 1rem;
    border: 2px solid #eee;
    padding-top: 10px;
    font-size: 1rem;
    background: white;
    color: var(--whiteCC);
    outline: none;
    transition: 0.3s;
    width: 90%;
    margin: auto;
}

#msg{
    background: white;
    width: 90%;
    margin: auto;
    font-weight: 200;
    height: 10em;
    padding: 1rem;
    font-family: 'Raleway', sans-serif;
    font-size: 1rem;
    border: 2px solid #eee;
    outline: none;
}
.inputs input:hover,
.inputs input:active,
.inputs input:focus,
.inputs textarea:hover,
.inputs textarea:active,
.inputs textarea:focus{
    transition: 0.3s;
}

.inputs label{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}




.username label span{
    font-size: 1em;
    position: absolute;
    bottom: 17%;
    left: 2%;
    color: var(--whiteCC);
    /* color: ${r(rt)}; */
    font-weight: 300;
}
.password label span{
    font-size: 1em;
    position: absolute;
    top: 20%;
    left: 2%;
    font-weight: 300;
    color: var(--whiteCC);
}

.username input:focus + .label-name .content-name,
.username input:valid + .label-name .content-name{
    transform: translate(-20%, -180%);
    transition: 0.3s;
    font-weight: bolder;
    color: var(--lightPink);
    font-weight: 500;
    
}

.password textarea:focus + .label-psd .content-psd,
.password textarea:valid + .label-psd .content-psd{
    transform: translate(-10%, -210%);
    color: var(--lightPink);
    transition: 0.3s;
    font-weight: 600;
    font-weight: 500;
}


.frgP{
    font-size: 1em;
    text-decoration: none;
    font-weight: 600;
    color: #999;
    width: 100%;
    text-align: right;
    margin: 1rem 0 0 0;
}
.frgP:hover{
    color: #fb3684;
    text-decoration: underline;
}
.frgP:focus{
    color: #fb3684;
    text-decoration: underline;

}

/*  copy right 2020 */

.footer-developed{
    margin-bottom: 2rem;
    display: flex;
    width: 90%;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1em;
    color: ${r(rt)};
}


/*  button */

.btn-footer{
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btnFooter{
    background: ${r(lt)};
    color: ${r(rt)};
    border: none;
    outline: none;
    width: auto;
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
    font-size: 1em;
    font-weight: 600;


}
.btnFooter:hover,
.btnFooter:focus,
.btnFooter:active{
    background: ${r(at)};
    color: ${r(pt)};
    transition: 0.3s;
}

/* links footer */


.info-footer{
    
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.info-footer h1{
    color: ${r(rt)};
    margin: 1em 0;
}
.info-footer p{
    color: ${r(rt)};
    margin-bottom: 0.5em;
    margin-top: 1rem;

}
.btnGithub-footer{
    padding: 0.4rem 2rem;
    font-size: 1.2rem;
    color: ${r(rt)};
    transition: 0.3s;
}
.btnGithub-footer:hover{
    color: var(--blueblackCC);
    transition: 0.3s;
}

/* check box */

.checkRobot{
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: ${r(rt)};
    margin-top: 1rem;
    margin-bottom: 0;
}

.checkRobot h3{
    padding: 1rem;
    background: var(--whiteCC);
}
.checkInput{
    background: var(--whiteCC);
    padding: 1rem;
    width: 15%;
    margin-left: 1rem;
    border: none;
    outline: none;
    color: var(--blueblackCC);
    font-size: 1em;
    text-align: center;
}


.succeed_form{
    margin: 1rem;
    padding: 0.5rem 1rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    background: lightgreen;
    color: white;
    border-radius: 5px;
}

.error_form{
    margin: 1rem;
    padding: 0.5rem 1rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    background: lightcoral;
}


@media (max-width: 980px) {
    .footer {
        height: 90vh;
        position: relative;
      }
      .bg-footer {
        height: auto;
        width: 90%;
      }
      .intro-footer {
        width: 100%;
        flex-direction: column;
        height: auto;
      }
      .footer-text {
        width: 90%;
        margin: auto;
      }
      .footer-contact {
        width: 100%;
        margin: auto;
      }

      .footer-developed {
        position: absolute;
        width: 100%;
        margin: auto;
        bottom: 1rem;
        left: 0;
        align-items: center;
        text-align: center;
        /* margin-bottom: 100px; */
      }
      .footer-developed p {
        text-align: center;
        font-size: 2rem;
        width: 100%;
      }
      .info-footer p {
        color: ${r(rt)};
        text-decoration: none;
        font-size: 2rem;
      }

      .desc-footer-text {
        font-size: 2rem;
      }
      .footer-text h1 {
        font-size: 3rem;
      }

      .inputs input {
        font-size: 2rem;
        padding: 1rem;
      }

      .username label span {
        font-size: 2rem;
      }

      #msg {
        color: ${r(dt)};
        font-size: 2rem;
        padding: 1rem;
      }
      .password label span {
        font-size: 2rem;
      }

      .btnFooter {
        font-size: 2rem;
        margin-right: 60px;
      }
    }


`;let zt=At;window.addEventListener("resize",(()=>{zt=At})),customElements.define("cn-footer",class extends it{static get styles(){return a`
      ${zt}
    `}constructor(){super()}render(){return N`
      <div id="footer" class="footer">
        <div class="bg-footer">
          <div class="intro-footer">
            <div class="footer-text fade-footer">
              <h1>Kontakta mig här!</h1>
              <p class="desc-footer-text">
                Jag skulle älska att höra från dig. <br />
                Om du är intresserad av att se några av mina tidigare <br />
                arbeten eller vill ha en personlig pratstund, <br />
                tveka inte att höra av dig till mig här eller på
                <span
                  style="text-decoration: underline; text-decoration-color: var(--pink);"
                >
                  habib.pakdel1121@gmail.com</span
                >
              </p>
            </div>
            <div class="footer-contact fade-footer">
              <form
                action="https://formspree.io/f/mnqowrdz"
                id="contact"
                class="contact"
                method="POST"
              >
                <div class="inputs-container">
                  <div class="username inputs">
                    <input id="username" name="_replyto" type="text" required />
                    <label for="name" class="label-name">
                      <span class="content-name">E-postadress</span>
                    </label>
                  </div>
                  <div class="password inputs">
                    <textarea
                      id="msg"
                      name="message"
                      type="message"
                      type="message"
                      required=""
                    ></textarea>
                    <label for="password" class="label-psd">
                      <span class="content-psd">Meddelande</span>
                    </label>
                  </div>
                </div>
                <div class="btn-footer">
                <cn-socialmedia></cn-socialmedia>

                  <button type="submit" class="btnFooter" id="Send">
                    Skicka
                  </button>
                </div>
                <div class="close">
                  <i
                    style="opacity: 0;"
                    id="close_msg"
                    class="fas fa-times"
                  ></i>
                </div>
                <p id="result-status"></p>
              </form>
              <div class="info-footer">
                <div class="links-footer">
                  <!-- Social media -->
                </div>
              </div>
            </div>
          </div>
          <div class="footer-developed">
            <p>Developed | 2023 &copy; khabib</p>
          </div>
        </div>
      </div>
    `}});const jt=a`
  .bg-ddd-prj {
    height: fit-content;
    padding: 5rem 00;
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .intro-ddd-prj {
    width: 100%;
    margin: auto;
  }
  .items-ddd-prj {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem;
    width: 100%;
    margin: auto;
  }
 
  #primary-title-sections {
    font-size: 3rem;
  }
  
  .each {
    border-radius: 5px;
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background: ${r(ut)};
    align-items: center;
    flex-direction: column;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .each:hover {
    background: ${r(gt)};
  }

  .detailes-ddd-prj {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .detailes-ddd-prj img {
    width: 50px;
    opacity: 0.8;
  }

  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${r(mt)};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .detailes-ddd-prj h1 {
    font-weight: 800;
    font-size: 1.5rem;
    color: ${r(ct)};
    border-radius: 5px;
    text-decoration: none;
    padding: 0 1rem;
  }


  @media (max-width: 980px) {
    
    .bg-ddd-prj {
      width: 80%;
      margin: auto;
      border-radius: 10px;
    }

    .items-ddd-prj {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
      gap: 2rem;
      width: 100%;
      margin: auto;
  }

  .each {
    height: 550px;
  }

  .detailes-ddd-prj img {
    width: 200px;
  }

  .circle {
    width: 300px;
    height: 300px;

  }

  .detailes-ddd-prj h1 {
    font-size: 3rem;
  }


    }
`;let St=jt;window.addEventListener("resize",(()=>{St=jt})),customElements.define("cn-services",class extends it{static get styles(){return a`
      ${St}
    `}constructor(){super()}galleryCategories=[{category:"UI/UX",img:"./sourcefile/services/uiux.png"},{category:"Software",img:"./sourcefile/services/web.png"},{category:"E-sport",img:"./sourcefile/services/e-sport.png"},{category:"Graphic",img:"./sourcefile/services/graphic.png"}];#i=null;set ic(t){this.#i=t,this.requestUpdate()}render(){return N`
      <div class="bg-ddd-prj">
        <div class="intro-ddd-prj">
          <div class="overline-primary-title-sections"></div>
          <h1 id="primary-title-sections">Tjänster</h1>
        </div>
        <div class="items-ddd-prj">
          ${this.galleryCategories.map((t=>N`
              <a
                @click=${()=>this.#i("gallery",t.category)}
                class="ui-intro-icon each rellax"
                data-rellax-mobile-speed="-0.1"
                data-rellax-speed="-0.5"
              >
                <div class="detailes-ddd-prj">
                  <div class="circle">
                    <img src="${t.img}">
                  </div>
                  <h1>${t.category}</h1>
                </div>
              </a>
            `))}
        </div>
      </div>
    `}});const Ct=a`
  .s-one {
    width: 60%;
  }


  #primary-title-sections {
    font-size: 3rem;
    color: ${r(rt)};
  }


  .intro-project {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;
    margin: 2rem 0;
  }


  .project-wraper {
    display: flex;
    background: ${r(ut)};
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40vh;
    gap: 2rem;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .project-wraper:hover {
    background: ${r(gt)};
  }

  .project-text {
    flex: 1;
    padding: 0 3rem 3rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    gap: 1rem;
  }

  .project-text h1 {
    font-size: 2rem;
    color: ${r(ct)};
  }
  
  .project-text p {
    font-size: 1rem;
    margin: 0;
    color: ${r(ct)};
  }

  .project-btns {
    padding: 1rem;
  }

  .project-img {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  
  .project-wraper:last-child .works-img {
    height: 100%;
    width: auto;
  }
  .works-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 15px;
    z-index: 1;
  }



@media (max-width: 980px) {
  .s-one {
    width: 80%;
    padding: 5rem 0;
  }

  .project-text {
    text-align: left;
    width: 90%;
    border-radius: 10px;
    background: ${r(ut)};
  }
  
  .project-img {
    border-radius: 10px;
    background: ${r(ut)};
    
  }

  .project-wraper {
    flex-direction: column-reverse;
    height: fit-content;
    background: transparent;

  }

  .project-btns {
    display: none;
  }

  #primary-title-sections{
    font-size: 3rem;
  }

  .project-wraper:last-child .works-img {
    width: 60%;
  }

  .works-img {
    width: 95%;
  }

  .project-text h1 {
    font-size: 3rem;
  }

  .project-text p {
    font-size: 1.5rem;
  }
}




`;let Tt=Ct;window.addEventListener("resize",(()=>{Tt=Ct})),customElements.define("cn-works",class extends it{static get styles(){return a`
      ${Tt}
    `}constructor(){super()}#s=null;set ic(t){this.#s=t,this.requestUpdate()}render(){const t=this.#s;if(!t)return;const e=t.getShowCases();return N`
      <section id="works" class="s-one">
        <div class="intro-text-s-one">
          <h1 id="primary-title-sections">Tidigare arbete</h1>
        </div>
        <div class="intro-project">
        ${e.map((e=>N`
            <div
            class="project-wraper"
            @click=${()=>t.getPageNavigator("work",e.navigateTo)}
            >
              <div class="project-text">
              <div>
                <h1>${e.title}</h1>
                <p>${e.description}</p>
              </div>
                <div class="project-btns">
                  <cn-specialbutton
                    buttonName="Läs mer om projektet"
                    textColor=${rt}
                    background=${bt}
                  ></cn-specialbutton>
                </div>
              </div>
              <div class="project-img">
                <img
                class="works-img"
                  src=${e.img}
                  draggable="false"
                  alt=""
                />
              </div>
            </div>
            `))}
          </div>
      </section>
    `}});const Lt=a`
:root {
  --z-distance: 8.519vw;
  --from-left: 1;
  --mobile-bkp: 650px;
}

.return-button {
  position: fixed;
  left: 5%;
  bottom: 10%;
  z-index: 5;
  width: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.slider {
  width: 100vw;
  height: 100%;
  display: flex;
  perspective: 1000px;
  transform-style: preserve-3d;
  overflow: hidden;
}
.slider::before,
.slider::after {
  content: "";
  left: -1vw;
  top: -1vh;
  display: block;
  position: absolute;
  width: 102vw;
  height: 102vh;
  background-position: center;
  background-size: cover;
  will-change: opacity;
  z-index: -1;
  box-shadow: 0 0 0 50vmax rgba(0, 0, 0, 0.7) inset;
}
.slider::before {
  background-image: var(--img-prev);
}
.slider::after {
  transition: opacity 0.7s;
  opacity: 0;
  background-image: var(--img-next);
}
.slider--bg-next::after {
  opacity: 1;
}
.slider__content {
  margin: auto;
  width: 65vw;
  height: 32.5vw;
  max-height: 60vh;
  will-change: transform;
  transform-style: preserve-3d;
  pointer-events: none;
  transform: translateZ(var(--z-distance));
}
.slider__images {
  border-radius: 15px;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  box-shadow: 0 0 5em #000;
}
.slider__images-item {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  will-change: transform;
  transition-timing-function: ease-in;
  visibility: hidden;
}
.slider__images-item img {
  display: block;
  position: relative;
  left: -1em;
  top: -1em;
  width: calc(100% + 1em * 2);
  height: calc(100% + 1em * 2);
  object-fit: cover;
  will-change: transform;
}
.slider__images-item--active {
  z-index: 20;
  visibility: visible;
}
.slider__images-item--subactive {
  z-index: 15;
  visibility: visible;
}
.slider__images-item--next {
  transform: translateX(100%);
}
.slider__images-item--prev {
  transform: translateX(-100%);
}
.slider__images-item--transit {
  transition: transform 0.7s, opacity 0.7s;
}
.slider__text {
  position: relative;
  height: 100%;
}
.slider__text-item {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  perspective: 1000px;
  transform-style: preserve-3d;
}
.slider__text-item > * {
  overflow: hidden;
  position: absolute;
}
.slider__text-item h3,
.slider__text-item p {
  transition: transform 0.35s ease-out;
  line-height: 1.5;
  overflow: hidden;
}
.slider__text-item h3 {
  background-color: rgba(255, 255, 255, 0.5);
}
.slider__text-item p {
  font-family: "Open Sans", sans-serif;
  padding: 1em;
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.slider__text-item h3::before,
.slider__text-item p::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 105%;
  height: 100%;
  transform: translateX(0);
  transition: transform 0.35s ease-out 0.28s;
}
.slider__text-item h3::before {
  background-color: #000;
}
.slider__text-item p::before {
  background-color: #fff;
}
.slider__text-item h3 {
  margin: 0;
  font-size: 2em;
  padding: 0 0.3em;
  position: relative;
  font-weight: 700;
  transform: translateX(-100%);
}
.slider__text-item p {
  margin: 0;
  transform: translateX(100%);
  font-weight: 200;
}
.slider__text-item-head {
  top: -0.5em;
  transform: translateZ(3em);
}
.slider__text-item-info {
  bottom: 0;
  right: 0;
  max-width: 75%;
  min-width: min-content;
  transform: translateZ(2em);
}
.slider__text-item--active h3,
.slider__text-item--active p {
  transform: translateX(0);
}
.slider__text-item--active h3::before {
  transform: translateX(102%);
}
.slider__text-item--active p::before {
  transform: translateX(-102%);
}
.slider__text-item--backwards h3::before,
.slider__text-item--backwards p::before {
  transition: transform 0.35s ease-in;
}
.slider__text-item--backwards h3,
.slider__text-item--backwards p {
  transition: transform 0.35s ease-in 0.35s;
}
.slider__nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.slider__nav-arrows {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.slider__nav-arrow {
  height: 100%;
  width: 50vw;
  text-indent: -9999px;
  white-space: nowrap;
}
.slider__nav-arrow--left {

  --arrow: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='0.2' stroke-opacity='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='11' stroke='white' stroke-width='0.2' stroke-opacity='0.8' fill='transparent'/%3E%3Cpath d='M19 12H5M12 5L5 12l7 7'/%3E%3C/svg%3E");
  cursor: var(--arrow) 40 40, auto;
}
.slider__nav-arrow--right {
  --arrow: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='0.2' stroke-opacity='1' stroke-linecap='round' stroke-linejoin='round' transform='scale(-1, 1)' %3E%3Ccircle cx='12' cy='12' r='11' stroke='white' stroke-width='0.2' stroke-opacity='0.8' fill='transparent'/%3E%3Cpath d='M19 12H5M12 5L5 12l7 7' /%3E%3C/svg%3E");

  
  cursor: var(--arrow) 40 40, auto;
}
.slider__nav-dots {
  margin-top: 80vh;
  display: inline-flex;
  position: relative;
  padding: 1em;
  pointer-events: none;
}

.slider__nav-dots::before {
  content: "";
  position: absolute;
  left: calc(3em / 2);
  top: calc(3em / 3);
  border-radius: 50%;
  width: calc(3em);
  height: calc(3em);
  background-color: rgba(255, 255, 255, 0.9);
  transition: transform 0.7s ease-out;
  transform: translateX(calc((3em + 1em * 1) * (var(--from-left) - 1)));
}

.slider__nav-dot {
  margin: 0 0.5em;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  cursor: crosshair;
  pointer-events: all;
  display: inline-block;
  transition: border-color 0.3s ease-out;
}
.slider__nav-dot:hover {
  border-color: rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.1);
}
.slider__nav-dot:active {
  border-color: rgba(255, 255, 255, 0.5);
}

@media only screen and (max-width: 650px) {
  .slider__content {
    width: 100vw;
    height: 90%;
  }

  .slider__text-item-info {
    bottom: 1vh;
    left: 0;
  }
  .slider__text-item-info p {
    padding: 1em 0.8em;
  }

  .slider__text-item-head {
    top: 0vh;
    left: 0vw;
    transform: translateZ(0);
  }
  .slider__text-item-head h3 {
    font-size: 2.5em;
  }

  .slider__images-item img {
    display: block;
    position: relative;
    left: -1em;
    top: -1em;
    width: calc(100% + 2em);
    height: calc(100% - 2em);
    object-fit: cover;
    will-change: transform;
  }


  .slider__nav-arrow {
    width: 10vw;
    height: 100%;
    position: relative;
    cursor: auto;
  }
  .slider__nav-arrow:active {
    filter: brightness(0.5);
  }
  .slider__nav-arrow::before {
    content: "";
    background-image: var(--arrow);
    background-size: cover;
    width: 8vw;
    height: 8vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .slider__nav-arrow--left {
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7) 0,
      transparent 100%
    );
  }
  .slider__nav-arrow--left:active {
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9) 0,
      transparent 100%
    );
  }
  .slider__nav-arrow--right {
    background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.7) 0,
      transparent 100%
    );
  }
  .slider__nav-arrow--right:active {
    background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.9) 0,
      transparent 100%
    );
  }

  .slider__nav-dot {
    background-color: rgba(0, 0, 0, 0.3);
    width: 1em;
    height: 1em;
  }

  .slider__nav-dots::before {
    content: "";
    position: absolute;
    left: calc(3em / 2);
    top: calc(3em / 3);
    border-radius: 50%;
    width: calc(1em);
    height: calc(1em);
    background-color: rgba(255, 255, 255, 0.9);
    transition: transform 0.7s ease-out;
    transform: translateX(calc((1em + 1em * 1) * (var(--from-left) - 1)));
  }

  .slider__nav-arrows {
    height: 100%;
  }

  .return-button {
    left: 2%;
    bottom: 5%;
  }
}


`;customElements.define("cn-bild",class extends it{static styles=Lt;constructor(){super()}updated(){null!==this.#s&&this.#n()}firstUpdated(){null!==this.#s&&(this.shadowRoot.querySelectorAll(".slider__text-item")[0].classList.add("slider__text-item--active"),this.shadowRoot.querySelectorAll(".slider__images-item")[0].classList.add("slider__images-item--active"),this.shadowRoot.querySelectorAll(".slider__nav-dot")[0].classList.add("slider__nav-dot--active"))}#s=null;set ic(t){this.#s=t,this.requestUpdate()}render(){const t=this.#s;if(null===t)return;const e=t.from,i=t.imgs;return N`
    <div class="slider" id="slider" style="--img-prev:url(${this.#s.imgs[0].src});"> 
  <div class="slider__content" id="slider-content">
    <div class="slider__images">
    ${i.map(((t,e)=>N`
        <div class="slider__images-item" data-id="${e+1}"> 
          <img src="${t.src}" alt="${null==t.description?"":t.description}"/>
        </div>
      `))}
      </div>
    <div class="slider__text">
      ${i.map(((t,e)=>N`
          <div class="slider__text-item" data-id="${e+1}">
            <div class="slider__text-item-head">
              <h3>${null!==t.title?t.title:""}</h3>
            </div>
            <div class="slider__text-item-info">
              <p>${null==t.description?"":t.description}</p>
            </div>
          </div>
        `))}
    </div>
  </div>
  <div class="slider__nav">
    <div class="slider__nav-arrows">
      <div class="slider__nav-arrow slider__nav-arrow--left" id="left">to left</div>
      <div class="slider__nav-arrow slider__nav-arrow--right" id="right">to right</div>
    </div>
    <div class="slider__nav-dots" id="slider-dots">
     ${i.map(((t,e)=>N`
            <div class="slider__nav-dot" data-id="${e+1}"></div>
          `))}
    </div>
  </div>
</div>


  
      <!-- return button -->
      <div class="return-button">
      <cn-specialbutton
        @click=${()=>{"home"===e&&this.#s.getPageNavigator("home",null),this.#s.getPageNavigator("gallery",e)}}
        buttonName=${""}
        color="#333"
        raduis="border-radius: 25px;"
        direction="left"
      ></cn-specialbutton>
    </div>
    
    
    
    `}#n(){const t=this.shadowRoot.getElementById("slider"),e=new class{#o;larg;constructor(t,e,i){this.#o=e,this.larg=i;const s=this.IMG_CLASS="slider__images-item",n=this.TEXT_CLASS="slider__text-item",o=this.ACTIVE_IMG_CLASS=`${s}--active`,r=this.ACTIVE_TEXT_CLASS=`${n}--active`;this.el=t,this.contentEl=e.getElementById("slider-content"),this.onMouseMove=this.onMouseMove.bind(this),this.activeImg=t.getElementsByClassName(o),this.activeText=t.getElementsByClassName(r),this.images=t.getElementsByTagName("img"),e.getElementById("slider-dots").addEventListener("click",this.onDotClick.bind(this)),e.getElementById("left").addEventListener("click",this.prev.bind(this)),e.getElementById("right").addEventListener("click",this.next.bind(this)),window.addEventListener("resize",this.onResize.bind(this)),this.onResize(),this.length=this.images.length,this.lastX=this.lastY=this.targetX=this.targetY=0}onResize(){const t=getComputedStyle(document.documentElement),e=t.getPropertyValue("--mobile-bkp"),i=this.isMobile=matchMedia(`only screen and (max-width: ${e})`).matches;this.halfWidth=innerWidth/2,this.halfHeight=innerHeight/2,this.zDistance=t.getPropertyValue("--z-distance"),i||this.mouseWatched?i&&this.mouseWatched&&(this.mouseWatched=!1,this.el.removeEventListener("mousemove",this.onMouseMove),this.contentEl.style.setProperty("transform","none")):(this.mouseWatched=!0,this.el.addEventListener("mousemove",this.onMouseMove),this.el.style.setProperty("--img-prev",`url(${this.images[+this.activeImg[0].dataset.id-1].src})`),this.contentEl.style.setProperty("transform",`translateZ(${this.zDistance})`))}getMouseCoefficients({pageX:t,pageY:e}={}){const i=this.halfWidth,s=this.halfHeight;return{xCoeff:((t||this.targetX)-i)/i,yCoeff:(s-(e||this.targetY))/s}}onMouseMove({pageX:t,pageY:e}){this.targetX=t,this.targetY=e,this.animationRunning||(this.animationRunning=!0,this.runAnimation())}runAnimation(){if(this.animationStopped)return void(this.animationRunning=!1);const t=function({x:t,y:e},{x:i,y:s}){return{x:t+=.1*(i-t),y:e+=.1*(s-e)}}({x:this.lastX,y:this.lastY},{x:this.targetX,y:this.targetY}),{xCoeff:e,yCoeff:i}=this.getMouseCoefficients({pageX:t.x,pageY:t.y});this.lastX=t.x,this.lastY=t.y,this.positionImage({xCoeff:e,yCoeff:i}),this.contentEl.style.setProperty("transform",`\n          translateZ(${this.zDistance})\n          rotateX(${10*i}deg)\n          rotateY(${10*e}deg)\n        `),this.reachedFinalPoint?this.animationRunning=!1:requestAnimationFrame(this.runAnimation.bind(this))}get reachedFinalPoint(){const t=~~this.lastX,e=~~this.lastY,i=this.targetX,s=this.targetY;return!(t!=i&&t-1!=i&&t+1!=i||e!=s&&e-1!=s&&e+1!=s)}positionImage({xCoeff:t,yCoeff:e}){this.activeImg[0].children[0].style.setProperty("transform",`\n          translateX(${1*-t}em)\n          translateY(${1*e}em)\n        `)}onDotClick({target:t}){if(this.inTransit)return;const e=t.closest(".slider__nav-dot");if(!e)return;const i=e.dataset.id;this.activeImg[0].dataset.id!=i&&this.startTransition(i)}transitionItem(t){function e(t){t.stopPropagation(),p.classList.remove(h),i.inTransit=!1,this.className=r,this.removeEventListener("transitionend",e)}const i=this,s=this.el,n=this.activeImg[0],o=n.dataset.id,r=this.IMG_CLASS,a=this.TEXT_CLASS,l=this.ACTIVE_IMG_CLASS,d=this.ACTIVE_TEXT_CLASS,c=`${r}--subactive`,h=`${r}--transit`,p=s.querySelector(`.${r}[data-id='${t}']`),g=s.querySelector(`.${a}[data-id='${t}']`);let m="",u="";this.animationStopped=!0,g.classList.add(d),s.style.setProperty("--from-left",t),n.classList.remove(l),n.classList.add(c),o<t?(m=`${r}--next`,u=`${r}--prev`):(m=`${r}--prev`,u=`${r}--next`),p.classList.add(m),requestAnimationFrame((()=>{p.classList.add(h,l),p.classList.remove(m),this.animationStopped=!1,this.positionImage(this.getMouseCoefficients()),n.classList.add(h,u),n.addEventListener("transitionend",e)})),this.isMobile||this.switchBackgroundImage(t)}startTransition(t){if(this.inTransit)return;const e=this.activeText[0],i=`${this.TEXT_CLASS}--backwards`,s=this;this.inTransit=!0,e.classList.add(i),e.classList.remove(this.ACTIVE_TEXT_CLASS),e.addEventListener("transitionend",(function e(i){i.pseudoElement||(i.stopPropagation(),requestAnimationFrame((()=>{s.transitionItem(t)})),this.removeEventListener("transitionend",e))})),requestAnimationFrame((()=>{e.classList.remove(i)}))}next(){if(this.inTransit)return;let t=+this.activeImg[0].dataset.id+1;t>this.length&&(t=1),this.startTransition(t)}prev(){if(this.inTransit)return;let t=+this.activeImg[0].dataset.id-1;t<1&&(t=this.length),this.startTransition(t)}switchBackgroundImage(t){const e="slider--bg-next",i=this.el,s=`url(${this.images[+t-1].src})`;i.style.setProperty("--img-next",s),i.addEventListener("transitionend",(function t(i){i.target===this&&(this.style.setProperty("--img-prev",s),this.classList.remove(e),this.removeEventListener("transitionend",t))})),i.classList.add(e)}}(t,this.shadowRoot);let i=0;function s(){clearTimeout(i),this.removeEventListener("touchstart",s),this.removeEventListener("mousemove",s)}t.addEventListener("mousemove",s),t.addEventListener("touchstart",s),i=setTimeout((function t(){requestAnimationFrame((()=>{e.next()})),i=setTimeout(t,5e3)}),2e3)}});class Mt extends it{static styles=a`
  cn-works{
    display: flex;
    justify-content: center;
  }

  `;constructor(){super()}#r=[{title:"JetStream - a flight booking desktop + web app",description:"An all in one desktop and web application for booking flights. The app is built...",img:"./sourcefile/web/jetstream/showCase.png",navigateTo:"Flight Booking System",link:""},{title:"Magazine - Utställningen Unga Forskare",description:"En utställning som visar upp forskningsprojekt som gjorts av studenter i högstadiet.",img:"./sourcefile/gfx/uuf/magazine_2.PNG",navigateTo:"UUF",link:""},{title:"Online booking system",description:"Ett fulländat flygbokningssystem för privatpersoner på desktop och webben",img:"./sourcefile/web/obs/showCase_2.png",navigateTo:"Online Booking System",link:""},{title:"Skanetrafik + Spotify",description:"Trafik applikation tillsammans med Spotify för att kunna lyssna på musik under resan",img:"./sourcefile/web/skonetrafik_spotify/showCase.png",navigateTo:"Trafikverket-Spotify",link:""},{title:"Orbitz - en utbildningsapplikation",description:"En utbildningsapplikation till högstadietsstudenter för att utförska och lära sig om olika planeterna i solsystemet.",img:"./sourcefile/web/orbitz/showCase.png",navigateTo:"Orbitz",link:""},{title:"Restaurant Finder & Delivery app prototype.",description:"Ett prototype för en restaurang sök och leverans app.",img:"./sourcefile/uiux/mockups/showCase.png",navigateTo:"Food Delivery App",link:""}];#i=null;set ic(t){this.#i=t,this.requestUpdate()}render(){const t={getPageNavigator:this.#i.bind(this),getShowCases:()=>this.#r};return N`
        <cn-about></cn-about>
        <cn-bild></cn-bild>
        <cn-services .ic=${this.#i.bind(this)}></cn-services>
        <cn-works .ic=${t}></cn-works>
        <cn-footer></cn-footer>
    `}}customElements.define("cn-overview",Mt);const Pt=a`
:host {
    display: block;
}
.header-container{

    position: fixed;
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
   width: 60%;

   left: 0;
    right: 0;
    margin: auto;
    z-index: 5;
}

.header-dtl{
    width: 100%;
    margin: auto;
    display: flex;
    transition: 0.2s ease-in-out;

    
}

.logo-container {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.logo-cont{
    display: flex;
    align-items: center;
    text-decoration: none;
}

.logoTl{
    transition: 0.2s ;
    margin: 0;
    font-size: 1.2em;
    font-weight: 700;
    color: ${r(rt)};
    transition: 0.5s cubic-bezier(0.68, -0.85, 0.165, 2);
}
.logoUtl{
    font-size: 0.8rem;
    margin-top: -4px;
    letter-spacing: 1px;
    transition: 0.5s cubic-bezier(0.68, -0.85, 0.165, 2);

}
.logo{
    cursor: pointer;
    width: 50px;
    height: 50px;
}
.logo:hover{
    filter: blur(1px);
}

.toggle-menu{
    flex: 1;
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
}
.toggle-menu #tglBtn {
    background: #ffffff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    margin-left: -40px;
    cursor: pointer;
}

#tglBtn div {
    margin-right: 10px;
}
.toggle-menu div:hover{
    filter: blur(1px);
}
.tglline{
    margin: 3px;
    background: ${r(ft)};
    width: 28px;
    height: 4px;
    border-radius: 50px;
}
.shorterline{
    width: 25px;
}
.lilshort{
    width: 30px;
}
.menu-container{
    position: absolute;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    visibility: hidden;
    right: 10vh;
    top: 10vh;
    width: 0;
    height: 0;
    opacity: 0;
    background: ${r(gt)};
    transition: 0.3s;
    border-radius: 5px;
    overflow: hidden;
}
.menu-open{
    width: 20vh;
    height: fit-content;
    top: 5vh;
    right: 5vh;
    visibility: visible;
    overflow: hidden;
    transition: 0.3s;
    opacity: 1;
}

.screen{
    display: flex;
    top: 0;
    right: 0;
    position: absolute;
    width: 10px;
    height: 10px;
    background: none;
    /* backdrop-filter: blur(10px); */
    transition: 0.2s;
}
.screendspd{
    width: 120vw;
    height: 100vh;
    border-radius: 0;
    transition: 0.2s;
}

.menu-link{
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding:0.8rem;
    border-bottom: 1px solid ${r(lt)};
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    color: ${r(rt)};
    transition: 0.2s;

}

.menu-link:hover{
    font-weight: 900;
}



@media(max-width: 980px) {
    .header-container {
        width: 90%;
    }
    #logotext {
        display: none;
        font-size: 2rem;
    }
    .logo{
        cursor: pointer;
        width: 80px;
        height: 80px;
    }

    .toggle-menu #tglBtn {
        width: 80px;
        height: 80px;
    }

    .tglline{
        margin: 4px;
        background: ${r(ft)};
        width: 48px;
        height: 7px;
        border-radius: 50px;
    }
    .shorterline{
        width: 35px;
    }
    .lilshort{
        width: 40px;
    }

    .menu-open{
        width: 100%;
        height: 50vh;
        top: 6vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        left: 0;
        visibility: visible;
        overflow: hidden;
        transition: 0.3s;
        opacity: 1;
    }
    .menu-link {
        margin: 1rem;
        font-size: 3rem;
        height: auto;
    }



}

@media only screen and (max-width: 600px) {
    .header-container {
        width: 95%;
    }

}

`;let Rt=Pt;window.addEventListener("resize",(()=>{Rt=Pt}));class It extends it{static styles=a`
    ${Rt}
    `;constructor(){super()}#s=null;set ic(t){this.#s=t,this.requestUpdate()}updated(){this.#a()}render(){console.log("updating...");const t=this.#s;if(null!==t)return N`
      <div class="header-container">
        <div id="screen" class="screen"></div>
        <div class="header-dtl">
          <div class="logo-container">
            <a href="" @click=${()=>t("home",null)} class="logo-cont">
              <img
                draggable="false"
                class="logo"
                id="blackl"
                src="./sourcefile/logoDark.png"
                alt="logo"
              />
              <div class="text-logo">
                <h1 id="logotext" class="logoTl">Portfolio</h1>
              </div>
            </a>
          </div>
          
          <div class="toggle-menu">
            <div id="tglBtn">
              <div class="tglline"></div>
              <div class="tglline shorterline"></div>
              <div class="tglline lilshort"></div>
            </div>
          </div>
        </div>

        <div id="menu-container" class="menu-container">
            <a href="home" class="menu-link">Om mig</a>
            <a href="works" class="menu-link">Arbete</a>
            <a href="footer" class="menu-link">Kontaka mig</a>
        </div>


      </div>
    `}#a(){var t=this.shadowRoot.getElementById("tglBtn"),e=this.shadowRoot.getElementById("menu-container"),i=this.shadowRoot.querySelectorAll(".menu-link"),s=this.shadowRoot.getElementById("screen"),n=!0;s.addEventListener("click",(()=>{e.classList.remove("menu-open"),s.classList.remove("screendspd"),n=!0})),this.shadowRoot.addEventListener("click",(t=>{if("Om mig"==t.target.innerHTML||"Arbete"==t.target.innerHTML||"Kontaka mig"==t.target.innerHTML){i.forEach((t=>{t.classList.remove("active")})),t.target.classList.add("active"),t.target.style.cssText="",e.classList.remove("menu-open"),s.classList.remove("screendspd"),n=!0,t.preventDefault();const o=t.target.getAttribute("href"),r=document.getElementById(o);r&&r.scrollIntoView({behavior:"smooth"})}})),t.addEventListener("click",(()=>{1==n?(e.classList.add("menu-open"),s.classList.add("screendspd"),t.style.cssText="z-index: 5;",n=!1):0==n&&(s.classList.remove("screendspd"),e.classList.remove("menu-open"),t.style.cssText="z-index: 1;",n=!0)}))}}customElements.define("cn-header",It);const Nt=a`
  .animated-things .shapes {
    position: absolute;
    border-radius: 5px;
    overflow: hidden;
    width: 20px;
    height: 20px;
    background: #edeff1;
    z-index: 1;
  }

  .shape1 {
    width: 200px !important;
    height: 200px !important;
    border-radius: 20px !important;
    opacity: 1;
    animation: shapeAroundHomw 10s infinite;
    top: 10%;
    left: 10%;
  }

  @keyframes change-shape {
    0% {
      opacity: 0.1;
      transform: scale(1);
      border-radius: 50%;
    }
    25% {
      opacity: 0.2;
      transform: skewX(-20deg) skewY(0deg) rotate(45deg) scale(1.2);
      border-radius: 0%;
    }
    50% {
      opacity: 0.15;
      transform: skewX(-20deg) skewY(0deg) rotate(180deg) scale(1);
      border-radius: 50%;
    }
    75% {
      transform: skewX(-20deg) skewY(0deg) rotate(135deg) scale(1.2);
      border-radius: 0%;
      opacity: 0.1;
    }
    100% {
      transform: skewX(-20deg) skewY(0deg) rotate(180deg) scale(1);
      border-radius: 50%;
      opacity: 0.2;
    }
  }
  
  .shape2 {
    animation: shapeAroundHomw 7s infinite;
    right: 2%;
    bottom: 5%;
  }
  .shape3 {
    width: 100px !important;
    height: 100px !important;
    border-radius: 20px !important;
    animation: shapeAroundHomw 5s infinite;
    top: 50%;
    left: 30%;
  }
  .shape4 {
    animation: shapeAroundHomw 5s infinite;
    right: 30%;
    top: 10%;
  }
  .shape5 {
    animation: shapeAroundHomw 7s infinite;
    bottom: 10%;
  }
  .shape6 {
    animation: shapeAroundHomw 8s infinite;
    top: 0;
    right: 2%;
  }
  .shape7 {
    opacity: 0.5;
    animation: shapeAroundHomw 9s infinite;
    top: 30%;
    right: 8%;
  }
  .shape8 {
    animation: shapeAroundHomw 8s infinite;
    top: 70%;
    right: 50%;
  }

  @keyframes shapeAroundHomw {
    0% {
      transform: translateX(-20px);
    }
    50% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(-20px);
    }
  }

  @keyframes bigOne {
    0% {
      transform: translateX(-200px);
    }
    50% {
      transform: translateX(200px);
    }
    100% {
      transform: translateX(-200px);
    }
  }
`;customElements.define("cn-animation",class extends it{constructor(){super()}render(){return N`
         <style>${Nt}</style>
            <div class="animated-things">
                <div class="shapes shape1" style="transform: rotate(45deg);" data-rellax-speed="10" ></div>
                <div class="shapes shape2" data-rellax-speed="10" ></div>
                <div class="shapes shape3" data-rellax-speed="5" ></div>
                <div class="shapes shape4" data-rellax-speed="7" ></div>
                <div class="shapes shape5" data-rellax-speed="1" ></div>
                <div class="shapes shape6" data-rellax-speed="-2" ></div>
                <div class="shapes shape7" data-rellax-speed="8" ></div>
                <div class="shapes shape8" data-rellax-speed="6" ></div>
            </div>
        
        `}}),customElements.define("cn-imagebox",class extends it{constructor(){super()}#s=null;set ic(t){this.#s=t}render(){const t=this.#s;if(null===t)return;const e=t.img,i=t.workType,s=t.description;return N`
      <style>
        .first-project {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 10px;
        }
        img {
          width: 100%;
        }
        .overlay-each-project {
          cursor: pointer;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: fit-content;
          background-color: ${r(mt)};
          transition: 0.5s ease;
          padding: 1rem 1rem 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          opacity: 0;
        }

        .first-project:hover .overlay-each-project {
          opacity: 1;
        }

        h3 {
          color: ${r(ct)};
          font-size: 1.5rem;
          font-weight: 500;
          margin: 0;
        }

        p {
          color: ${r(ft)};
          font-size: 1rem;
          font-weight: 300;
        }
      </style>
      <div class="first-project">
        <img draggable="false" id="uiproject" src=${e} />
        <div class="overlay-each-project">
        <h3>${i}</h3>
          <p>- ${s}</p>
        </div>
      </div>
    `}});const Ut=a`
.project-intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 5rem 0;
    padding-bottom: 2rem;
}

.each-project-img-intro{
    height: 100%;
    padding: 1rem;
    background: ${r(ut)};
    /* backdrop-filter: blur(5px); */
    /* backdrop-filter: blur(5px); */
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    margin: auto;
    transition: all 0.8s 0.1s cubic-bezier(0.79, -0.01, 0, 0.99);

}

.each-project-detailes{
    margin: auto;
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    
}


.each-project-line{
    color: var(--blueblackCC);
    margin-bottom: 1rem;
}
.each-project-line span{
    color: var(--yellowCC);
}
.each-project-title{
    color: var(--darkPink);
    font-weight: 600;
    word-spacing: 10px;
    font-size: 30px;
    margin-bottom: 1rem;

}

.each-project-desc{
    width: 40%;
    color: var(--bgCC);
    line-height: 25px;
    word-spacing: 5px;
}

.x{
    width: 100%;
}

.forms{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem; 
}

.each-form{
    height: 100%;
    margin: auto;
    width: 400px;
    border-radius: 5px;
    cursor: pointer;
}


.change-view-imgbox{
    border-radius: 50%;
    position: absolute;
    z-index: -1;
    width: 40px;
    height: 40px;
    background: ${r(gt)};
    transition: all 3s cubic-bezier(0.68, -0.85, 0.265, 2);
}

.change-view-imgbox-active {
    position: absolute;
    border-radius: 0;
    margin-left: -10%;
    margin-top: -10%;
    scale: 2;
    width: 10vw;
    height: 10vh;
    transform-style: preserve-3d;
    transition: all 0.8s 0.1s cubic-bezier(0.79, -0.01, 0, 0.99);
    z-index: 2;
}

@media (max-width: 980px) {
    .each-project-img-intro{
        width: 80%;
        background: none;
        margin: 3rem 0;
    }

    .each-project-detailes{
        width: 80%;
        margin-bottom: 3rem;
        border-bottom: 1px solid ${r(dt)};
        
    }
    .each-project-line {
        font-size: 1.5rem;
    }

    .each-project-title {
        font-size: 3rem;
    }
    .each-project-desc {
        width: 100%;   
        font-size: 2rem;
        line-height: 3rem;
    }

    .project-intro{
        padding: 2rem 0;
    }

    .overlay-each-project{
        background-color: ${r(gt)};
        padding: 0;
    }


    .forms {
    grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
    gap: 2rem;
    }
    .each-form {
        width: 100%;
    }
}

`;let Bt=Ut;window.addEventListener("resize",(()=>{Bt=Ut})),customElements.define("cn-gallery",class extends it{constructor(){super()}static get styles(){return a`
    .return-button {
      position: fixed;
      left: 5%;
      bottom: 10%;
      width: 100%;
    }
    ${Bt}
    `}#s=null;set ic(t){this.#s=t}render(){const t=this.#s;if(null===t)return;const e=t.collectionName,i=t.title,s=t.description,n=t.getImages();return N`
        <div class="project-intro">
            <div class="each-project-detailes">
                <p class="each-project-line"><span>&#x02014&#x02014&#x02014&#x02014</span> ${e}</p>
                <h1 class="each-project-title"> ${i}</h1>
                <p class="each-project-desc">${s}</p>
            </div>
            <div class="each-project-img-intro">
                <div class="forms">
                    ${n.map(((t,i)=>N`
                        <div
                          @click=${()=>{"E-sport"!==e&&this.#n(i,t.workType)}}
                          class="each-form"
                        >
                          <cn-imagebox .ic=${t}></cn-imagebox>
                          <div id="${i}" class="change-view-imgbox"></div>
                        </div>
                      `))}
        </div>
        </div>
    </div>

    <!-- return button -->
    <div class="return-button">
      <cn-specialbutton
        @click=${()=>t.pageConfig("home",null)}
        buttonName=${""}
        color="#333"
        raduis="border-radius: 25px;"
        direction="left"
      ></cn-specialbutton>
    </div>
        `}#n(t,e){const i=this.shadowRoot.getElementById(t),s=this.shadowRoot.querySelector(".each-project-img-intro");this.shadowRoot.querySelectorAll(".each-form"),i.classList.contains("change-view-imgbox")?(s.classList.add("x"),i.classList.remove("change-view-imgbox"),i.classList.add("change-view-imgbox-active")):(s.classList.remove("x"),i.classList.remove("change-view-imgbox-active"),i.classList.add("change-view-imgbox")),setTimeout((()=>{this.#s.pageConfig("work",e)}),1e3)}});const Ht=a`

.work-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.section-one {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;
    position: relative;
}

.section-one .intro-title {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.section-one .intro-title .content-title {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    z-index: 2;
    padding: 20% 0 0 20%;
}
.section-one .intro-title .btn-title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -10%;
    left: 0;
    z-index: 2;
    
}

.section-one .intro-title h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 5rem;
    font-weight: 900;
    color: ${r(ct)};
}

.section-one .intro-title a {
    text-decoration: none; 
    font-size: 1.2rem;
    padding: 0.6rem 4rem;
    border-radius: 5px;
    background: ${r(ht)};
    color: #eee;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.section-one .intro-title a:hover {
    border-radius: 50px;
}

.section-one .intro-images {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.section-one .intro-images .imgs-container {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: auto;
    top: -2;
    right: -2;
}

.section-one .intro-images .behind {
    position: absolute;
    right: 0;
    width: 100vw;
    z-index: 0;
    -webkit-filter: blur(50px);
    -moz-filter: blur(50px);
    -o-filter: blur(50px);
    -ms-filter: blur(50px);
    filter: blur(50px);
    transition: all 0.3s ease-in-out;
        user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

.section-one .intro-images .front {
    border-radius: 10px;
    position: absolute;
    z-index: 1;
    margin: auto;
    height: auto;
    width: 60%;
    top: 50%; 
    right: 10%; 
    transform: translate(-15%, -50%);
    transition: all 0.3s ease-in-out;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

.section-one .intro-images .navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 2;
}
.section-one .intro-images .navigator a {
    text-decoration: none;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    background: #eee;
    color: #333;
    border: none;
    z-index: 2;
    cursor: pointer;
}
.section-one .intro-images:hover .navigator a {
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
}

.section-one::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(-60deg, rgba(244, 249, 255, 0) 30%, ${r(mt)} 0%);
    z-index: 1;
}






/* Section two */

.section-two {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem;
    width: 90%;
}

.section-two .paragraphs {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-top: 1px solid black;
    padding: 0 2rem;
}


.section-two .paragraphs .paragraph {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
}



/*  Media  */

@media (max-width: 980px) {

    .section-one {
        flex-direction: column;
    }
    

    .section-one .intro-title {
        position: absolute;
        top: 0;
        left: 0;
        flex: none;
        padding: 0;
        justify-content: flex-start;
    }

    .section-one .intro-title h1 {
        font-size: 5rem;
    }

    .return-button {
        z-index: 4;
    }

    .section-one .intro-images {
        overflow: none;
        width: 100%;
        height: 50%;
    }

    .section-one .intro-images .imgs-container {
        width: 100%;
    }

    .section-one::before {
        content: none;
    }

    .section-one .intro-images .front {
        width: 130%;
        border-radius: 10px; 
        position: unset;
        margin: auto;
        height: auto;
        top: 50%;
        transform: translate(-12%, 0%);
    }

    .section-one .intro-title .btn-title {
        bottom: 0;
    }

    .section-one .intro-images .navigator {
        width: 100%;
    }
    .section-one .intro-images .navigator a {
        opacity: 0.8;
    }

    /* section two */

    .section-two {
        padding: 2rem;
    }
    
    .section-two .paragraphs {
        position: relative;
        flex-direction: column;
        border-top: 1px solid black;
        padding: 0;
    }

    .section-one .intro-title .content-title {
        height: 50%;
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: relative;
        z-index: 2;
        padding: 10% 0 0 0;
    }

}




`;let Xt=Ht;window.addEventListener("resize",(()=>{Xt=Ht})),customElements.define("cn-work",class extends it{static styles=Xt;constructor(){super()}updated(){if(null!==this.#s){const t=this.#s.titles;(t[0].title.startsWith("Grafisk ansvarig")||t[0].title.startsWith("Restaurant Finder"))&&this.#l()}}#s=null;set ic(t){this.#s=t}render(){const t=this.#s;if(null===t)return;const e=t.titles,i=[];i.push(e[1]),i.push(e[2]);const s=t.getBild(),n=t.link;return N`
      <style>
        .return-button {
          position: fixed;
          left: 5%;
          bottom: 10%;
          width: 100%;
        }
      </style>
      <div class="work-container">
      ${e[0].title.startsWith("Grafisk ansvarig")||e[0].title.startsWith("Restaurant Finder")?N`
            <div class="section-one">
            <div class="intro-title">
              <div class="content-title">
                <h1 class="title">${e[0].title}</h1>
              </div>
              ${null!==n&&""!==n?N`<div class="btn-title">
                <a
                  href=${n}
                  target="_blank"
                  class="intro-button"
                >
                  Product</a
                >
              </div>`:""}
            </div>
            <div class="intro-images">
              ${s.imgs.map((t=>N`
                  <div class="imgs-container">
                    <img class="behind" src=${t.src} alt="" />
                    <img class="front" src=${t.src} alt="" />
                  </div>
                `))}
              <div class="navigator">
                <a class="prev" href="#">Prev</a>
                <a class="next" href="#">Next</a>
              </div>
            </div>
          </div>
      `:N`
          <div style="height: 90vh;">
            <cn-bild .ic=${s}></cn-bild>
          </div>
         `}
        

        <!-- two parallel paragraphs -->
        <div class="section-two">
          <div class="paragraphs">
            <div class="top-line"></div>
            ${i.map((t=>N`
                <div class="paragraph">
                  <div>
                    <h1 class="title">${t.title}</h1>
                  </div>
                  <div class="details">
                    <p style="line-height: 1.5rem">${t.description}</p>
                  </div>
                </div>
              `))}
          </div>
        </div>
      </div>

      ${e[0].title.startsWith("Grafisk ansvarig")||e[0].title.startsWith("Restaurant Finder")?N`
          <div class="return-button">
            <cn-specialbutton
              @click=${()=>s.getPageNavigator("gallery",s.from)}
              buttonName=${""}
              color="#333"
              raduis="border-radius: 25px;"
              direction="left"
            ></cn-specialbutton>
          </div>
          `:""}

      <!-- footer -->
      <cn-footer></cn-footer>
    `}#l(){const t=this.shadowRoot.querySelector(".prev"),e=this.shadowRoot.querySelector(".next");var i=this.shadowRoot.querySelectorAll(".imgs-container");let s,n=1;const o=()=>{for(let t=0;t<i.length;t++)i[t].style.display="none";i[n-1].style.display="flex",s=setTimeout((()=>{n++,n>i.length&&(n=1),o()}),4e3)};t.addEventListener("click",(()=>{n--,n<1&&(n=i.length),clearTimeout(s),o()})),e.addEventListener("click",(()=>{n++,n>i.length&&(n=1),clearTimeout(s),o()})),o()}});const Ot=a`
      
  .carousel {
    position: relative;
    z-index: 1;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
  }
  
  .carousel-item {
    --items: 6;
    --width: clamp(150px, 100vw, 1200px);
    --height: clamp(200px, 100vw, 400px);
    --x: calc(var(--active) * 400%);
    --y: calc(var(--active) * 100%);
    --rot: calc(var(--active) * 0deg);
    --opacity: calc(var(--zIndex) / var(--items) * 3 - 2);
    overflow: hidden;
    position: absolute;
    z-index: var(--zIndex);
    width: var(--width);
    height: var(--height);
    margin: calc(var(--height) * -0.5) 0 0 calc(var(--width) * -0.5);
    border-radius: 10px;
    top: 50%;
    left: 50%;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    transform-origin: 0% 100%;
    box-shadow: 0 10px 50px 10px rgba(0, 0, 0, 0.5);
    background: black;
    pointer-events: all;
    transform: translate(var(--x), var(--y)) rotate(var(--rot));
    transition: transform 0.8s cubic-bezier(0, 0.02, 0, 1);
  }
  .carousel-item .carousel-box {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.8s cubic-bezier(0, 0.02, 0, 1);
    opacity: var(--opacity);
    font-family: "Orelo-sw-db", serif;
  }
  .carousel-item .carousel-box:before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5));
  }
  .carousel-item .title {
    position: absolute;
    z-index: 1;
    color: #fff;
    bottom: 20px;
    left: 20px;
    transition: opacity 0.8s cubic-bezier(0, 0.02, 0, 1);
    font-size: clamp(20px, 3vw, 30px);
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }
  .carousel-item .num {
    position: absolute;
    z-index: 1;
    color: #fff;
    top: 10px;
    left: 20px;
    transition: opacity 0.8s cubic-bezier(0, 0.02, 0, 1);
    font-size: clamp(20px, 10vw, 80px);
  }
  .carousel-item img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
       object-fit: cover;
    pointer-events: none;
  }
  
  .layout {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .layout:before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 90px;
    width: 10px;
    height: 100%;
    border: 1px solid #fff;
    border-top: none;
    border-bottom: none;
    opacity: 0.15;
  }
  .layout .box {
    position: absolute;
    bottom: 0;
    color: #fff;
    transform-origin: 0% 10%;
    transform: rotate(-90deg);
    font-size: 9px;
    line-height: 1.4;
    text-transform: uppercase;
    opacity: 0.4;
  }
  
  .logo {
    position: absolute;
    z-index: 2;
    top: 28px;
    right: 28px;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Orelo-sw-db", serif;
    pointer-events: all;
    color: black;
    text-decoration: none;
    font-size: 20px;
    overflow: hidden;
    padding-bottom: 0.1em;
  }
  
  .social {
    position: absolute;
    z-index: 10;
    bottom: 20px;
    right: 25px;
    color: #fff;
    opacity: 0.4;
  }
  .social a {
    display: inline-block;
    margin-left: 3px;
  }
  .social svg {
    --fill: #fff;
    width: 35px;
    height: 35px;
  }
  
  .cursor {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    --size: 40px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin: calc(var(--size) * -0.5) 0 0 calc(var(--size) * -0.5);
    transition: transform 0.85s cubic-bezier(0, 0.02, 0, 1);
    display: none;
    pointer-events: none;
  }
  @media (pointer: fine) {
    .cursor {
      display: block;
    }
  }
  
  .cursor2 {
    --size: 2px;
    transition-duration: 0.7s;
  }
  

`;customElements.define("cn-slidshow",class extends it{static styles=Ot;constructor(){super()}updated(){this.#n()}#s=null;set ic(t){this.#s=t}render(){return N`
      <div class="carousel">
        ${this.#s.map((t=>N`
            <div class="carousel-item">
              <div class="carousel-box">
                <div class="title">${t.description}</div>
                <img src=${t.img} />
              </div>
            </div>
          `))}
      </div>

      <div class="cursor"></div>
      <div class="cursor cursor2"></div>
    `}#n(){console.log("operation");let t=6,e=0,i=0,s=!1;const n=this.shadowRoot.querySelectorAll(".carousel-item"),o=this.shadowRoot.querySelectorAll(".cursor"),r=()=>{t=Math.max(0,Math.min(t,100)),i=Math.floor(t/100*(n.length-1)),70===t?i=3:90===t&&(i=4),console.log(t,i,n.length),n.forEach(((t,e)=>((t,e,i)=>{const s=((t,e)=>t.map(((i,s)=>e===s?t.length:t.length-Math.abs(e-s))))([...n],i)[e];t.style.setProperty("--zIndex",s),t.style.setProperty("--active",(e-i)/n.length)})(t,e,i)))};r(),n.forEach(((e,i)=>{e.addEventListener("click",(()=>{t=i/n.length*100+10,r()}))}));const a=i=>{if("mousemove"===i.type&&o.forEach((t=>{t.style.transform=`translate(${i.clientX}px, ${i.clientY}px)`})),!s)return;const n=i.clientX||i.touches&&i.touches[0].clientX||0;t+=-.1*(n-e),e=n,r()},l=t=>{s=!0,e=t.clientX||t.touches&&t.touches[0].clientX||0},d=()=>{s=!1};this.shadowRoot.addEventListener("mousewheel",(e=>{const i=.02*e.deltaY;t+=i,r()})),this.shadowRoot.addEventListener("mousedown",l),this.shadowRoot.addEventListener("mousemove",a),this.shadowRoot.addEventListener("mouseup",d),this.shadowRoot.addEventListener("touchstart",l),this.shadowRoot.addEventListener("touchmove",a),this.shadowRoot.addEventListener("touchend",d)}});const Dt=a`
  body {
    background-color: #ffe53b;
    background-image: linear-gradient(147deg, #ffe53b 0%, #fd3838 74%);
    min-height: 100vh;
    font-family: "Fira Sans", sans-serif;
    display: flex;
  }

  .blog-slider {
    width: 95%;
    position: relative;
    max-width: 800px;
    margin: auto;
    background: #fff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 25px;
    border-radius: 25px;
    height: 400px;
    transition: all 0.3s;

    @media screen and (max-width: 992px) {
      max-width: 680px;
      height: 400px;
    }

    @media screen and (max-width: 768px) {
      min-height: 500px;
      height: auto;
      margin: 180px auto;
    }

    @media screen and (max-height: 500px) and (min-width: 992px) {
      height: 350px;
    }

    &__item {
      display: flex;
      align-items: center;

      @media screen and (max-width: 768px) {
        flex-direction: column;
      }

      &.swiper-slide-active {
        .blog-slider__img {
          img {
            opacity: 1;
            transition-delay: 0.3s;
          }
        }
        .blog-slider__content {
          > * {
            opacity: 1;
            transform: none;

            @for $i from 0 to 15 {
              &:nth-child(#{$i + 1}) {
                transition-delay: $i * 0.1 + 0.3s;
              }
            }
          }
        }
      }
    }

    &__img {
      // width: 40%;
      width: 300px;
      flex-shrink: 0;
      height: 300px;
      background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
      box-shadow: 4px 13px 30px 1px rgba(252, 56, 56, 0.2);
      border-radius: 20px;
      transform: translateX(-80px);

      overflow: hidden;

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
        border-radius: 20px;
        opacity: 0.8;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        opacity: 0;
        border-radius: 20px;
        transition: all 0.3s;
      }

      @media screen and (max-width: 992px) {
        // width: 45%;
      }
      @media screen and (max-width: 768px) {
        transform: translateY(-50%);
        width: 90%;
      }
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-height: 500px) and (min-width: 992px) {
        height: 270px;
      }
    }

    &__content {
      // width: 60%;
      padding-right: 25px;
      @media screen and (max-width: 992px) {
        // width: 55%;
      }
      @media screen and (max-width: 768px) {
        margin-top: -80px;
        text-align: center;
        padding: 0 30px;
      }

      @media screen and (max-width: 576px) {
        padding: 0;
      }
      > * {
        opacity: 0;
        transform: translateY(25px);
        transition: all 0.4s;
      }
    }

    &__code {
      color: #7b7992;
      margin-bottom: 15px;
      display: block;
      font-weight: 500;
    }

    &__title {
      font-size: 24px;
      font-weight: 700;
      color: #0d0925;
      margin-bottom: 20px;
    }

    &__text {
      color: #4e4a67;
      margin-bottom: 30px;
      line-height: 1.5em;
    }

    &__button {
      display: inline-flex;
      background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
      padding: 15px 35px;
      border-radius: 50px;
      color: #fff;
      box-shadow: 0px 14px 80px rgba(252, 56, 56, 0.4);
      text-decoration: none;
      font-weight: 500;
      justify-content: center;
      text-align: center;
      letter-spacing: 1px;
      @media screen and (max-width: 576px) {
        width: 100%;
      }
    }
    .swiper-container-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-custom,
    .swiper-pagination-fraction {
      bottom: 10px;
      left: 0;
      width: 100%;
    }
    &__pagination {
      position: absolute;
      z-index: 21;
      right: 20px;
      width: 11px !important;
      text-align: center;
      left: auto !important;
      top: 50%;
      bottom: auto !important;
      transform: translateY(-50%);
      @media screen and (max-width: 768px) {
        transform: translateX(-50%);
        left: 50% !important;
        top: 205px;
        width: 100% !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 8px 0;
        @media screen and (max-width: 768px) {
          margin: 0 5px;
        }
      }

      .swiper-pagination-bullet {
        width: 11px;
        height: 11px;
        display: block;
        border-radius: 10px;
        background: #062744;
        opacity: 0.2;
        transition: all 0.3s;
        &-active {
          opacity: 1;
          background: #fd3838;
          height: 30px;
          box-shadow: 0px 0px 20px rgba(252, 56, 56, 0.3);

          @media screen and (max-width: 768px) {
            height: 11px;
            width: 30px;
          }
        }
      }
    }
  }
`;customElements.define("cn-slid-text",class extends it{static styles=Dt;constructor(){super()}updated(){this.#n()}#d="";set ic(t){this.#d=t}render(){return N`
      <div class="blog-slider">
        <div class="blog-slider__wrp swiper-wrapper">
          <div class="blog-slider__item swiper-slide">
            <div class="blog-slider__img">
              <img
                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                alt=""
              />
            </div>
            <div class="blog-slider__content">
              <span class="blog-slider__code">26 December 2019</span>
              <div class="blog-slider__title">Lorem Ipsum Dolor</div>
              <div class="blog-slider__text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Recusandae voluptate repellendus magni illo ea animi?
              </div>
              <a href="#" class="blog-slider__button">READ MORE</a>
            </div>
          </div>
          <div class="blog-slider__item swiper-slide">
            <div class="blog-slider__img">
              <img
                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp"
                alt=""
              />
            </div>
            <div class="blog-slider__content">
              <span class="blog-slider__code">26 December 2019</span>
              <div class="blog-slider__title">Lorem Ipsum Dolor2</div>
              <div class="blog-slider__text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Recusandae voluptate repellendus magni illo ea animi?
              </div>
              <a href="#" class="blog-slider__button">READ MORE</a>
            </div>
          </div>

          <div class="blog-slider__item swiper-slide">
            <div class="blog-slider__img">
              <img
                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp"
                alt=""
              />
            </div>
            <div class="blog-slider__content">
              <span class="blog-slider__code">26 December 2019</span>
              <div class="blog-slider__title">Lorem Ipsum Dolor</div>
              <div class="blog-slider__text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Recusandae voluptate repellendus magni illo ea animi?
              </div>
              <a href="#" class="blog-slider__button">READ MORE</a>
            </div>
          </div>
        </div>
        <div class="blog-slider__pagination"></div>
      </div>
    `}#n(){new Swiper(".blog-slider",{spaceBetween:30,effect:"fade",loop:!0,mousewheel:{invert:!1},pagination:{el:".blog-slider__pagination",clickable:!0}})}});const Wt=a`
  
  .intro-bg {
      height: 80vh;
      width: 100vw;
      position: relative;
      overflow: hidden;  
      display: flex;
      justify-content: center;
  }
  
  .bg{
    background: rgb(68, 9, 73);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    opacity: 0.8;
  }
  
  .intro-bg img {
    position: absolute;
    top: 30%;
    width: 50%;
    animation: bgAnime 5s infinite;
  
  }
  
  @keyframes bgAnime {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2%);
    }
    100% {
      transform: translateY(0%);
    }
    
  }
  
  
  .intro-bg .info-header {
    position: absolute;
    top: 0;
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5vh;
    z-index: 4;
  }
  
  .title {
    position: absolute;
    font-weight: 600;
    top: 35%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    z-index: 4;
  }
  
  .title h1 {
    font-size: 4rem;
    color: white;
  
  }
  .title a{
      font-size: 1rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    background: rgb(192, 24, 130);
    text-decoration: none;
    color: rgb(255, 255, 255);
  }
  
  .info-header p {
    font-size: 1.2rem;
    color: rgb(255, 255, 255);
  }
  
  
  .imgs{
    width:  100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5rem 0;
    gap: 3rem;
    background: #ecf0f2;
  }
  
  .imgs img:nth-child(4) {
    margin-bottom: -5rem;
  }
  
  .imgs img:nth-child(5) {
    border-top: 5rem solid #dc7d07;
  }
  
  .imgs img {
    width: 100%;
  }
  
  
  .info {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #ecf0f2;
  }
  
  .info h1 {
    width: 90%;
    margin-left: 5%;
    font-size: 6rem;
  }
  
  
  
  .footer-info {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  
  .om-mig {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  
  
  
  .mellan-leg {
    width: 80%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4rem;
  }

  .mellan-leg a {
    text-decoration: underline;
    color: rgb(192, 24, 130);
    font-size: 1.2rem;
  }
  
  
  /*
  
    Anställa mig  
  
  */
  
  
  
  .footer {
    margin-top: -5rem;
    border-top: 4px solid rgb(192, 24, 130);
    width: 100%;
    height: 30vh;
    background: #ecf0f2;
    display: flex;
    justify-content: center;
    align-items: center;
  
  }
  
  .footer .content {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  
  .s-one {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  
  .s-one h1 {
    font-size: 2rem;
  
  }
  
  .s-one p {
    font-size: 1.2rem;
  
  }
  
  
  
  .s-two {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  
  
  
  @media (max-width: 980px) {
  
    .info-header p {
        font-size: 2rem;
    }
  
    .intro-bg img {
      width: 100%;
    }
  
    .title h1 {
      padding: 0 1rem;
      font-size: 6rem;
      text-align: center;
    }
    
      .info {
        padding: 1rem 1rem 0 1rem;
      }
  
    .info h1 {
      width: 100%;
      font-size: 6rem;
    }
    cn-specialbutton {
        width: 100%;
    }
  
    .imgs {
      gap: 1rem;
    }
  
    .imgs img:nth-child(4) {
      margin-bottom: -16px;
    }
    .imgs img:nth-child(5) {
      border-top: 10px solid #dc7d07;
    }
  
    .mellan-leg {
        padding: 2rem 0;
      height: 40vh;
    }
  
    .footer-info {
      width: 90%;
    }
  
    .om-mig {
      width: 90%;
    }

    .mellan-leg h1 {
        font-size: 4rem;
        margin: 2px;
    }

    .mellan-leg p {
        font-size: 2rem;
    }

    .mellan-leg a {
        font-size: 2rem;
    }

  
    .footer {
        padding-top: 5rem;
      height: 40vh;
    }
   
    .footer .content {
      flex-direction: column;
      gap: 0;
      padding-bottom: 4rem;
    }
    .s-one {
      flex: 1;
      width: 100%;
      justify-content: center;
      padding-top: 1rem;
    }
  
    .s-two {
      width: 100%;
      justify-content: center;
      align-items: flex-start;
    }
    

    .s-one h1 {
        font-size: 5rem;

    }

    .s-one p {
        font-size: 2rem;
    }

    .s-two {
        align-items: center;
    }

  }

`;let Ft=Wt;window.addEventListener("resize",(()=>{Ft=Wt})),customElements.define("cn-catalogue",class extends it{static get styles(){return a`
      ${Ft}
    `}constructor(){super()}#s=null;set ic(t){this.#s=t,this.requestUpdate()}render(){const t=this.#s;if(null===t)return;t.from;const e=t.imgs;return N`
      <div class="intro-bg">
        <div class="info-header">
          <p>Utställningen Unga Forskare</p>
          <p>2023</p>
        </div>
        <div class="title">
          <h1>Final katalog 2023</h1>
          <cn-specialbutton @click=${()=>window.open("https://ungaforskare.se/wp-content/uploads/2023/04/katalog-uug-2023.pdf","_blank")} buttonName="See Katalogen"></cn-specialbutton>
        </div>
        <img
          src="./sourcefile/gfx/uuf/mockups/single-katalog.png"
          alt=""
        />
        <div class="bg"></div>
      </div>

      <div class="info">
        <h1>Overview of catalogue</h1>
      </div>

      <div class="imgs">
          ${e.map(((t,e)=>N`
                ${5===e?this.#c():""}
                <img src="${t.src}" alt="final katalog" />
            `))}
       
      </div>

      <div class="footer">
        <div class="content">
          <div class="s-one">
            <h1 class="ttl-ft">Anställ mig nu!</h1>
            <p class="utl-ft">
              Jag har den erfarenheten, utbildningen och kompetensen för att
              kunna bidra till din projekt.
            </p>
            <cn-socialmedia></cn-socialmedia>

          </div>
          <div class="s-two">
              <cn-specialbutton buttonName="Hire me"></cn-specialbutton>
            </div>
        </div>
      </div>
    `}#c(){return N`
    <div class="mellan-leg">
    <div class="footer-info">
      <h1>Unga forskare</h1>
      <p>
        Utställningen Unga Forskare, SM i forskning, är Sveriges största
        vetenskapsmässa och tävling för gymnasieprojekt inom
        naturvetenskap, teknik och matematik.
      </p>
      <a href="https://ungaforskare.se/">Läs mer...</a>
    </div>
    <div class="om-mig">
      <h1>Mer om mitt ansvarig</h1>
      <p>
        Final katalog 2023 var en viktigt del av utställningen unga
        forskare. Jag var ansvarig för att ta upp ett nytt koncept för
        katalogen och skapa en ny design för den. Jag har även skapat
        andra typ av material för utställningen så som annonser,
        affischer, flayer, banners, diplomer och mera.
      </p>
    </div>
  </div>
    
    `}});class Yt extends it{static styles=a`
    section {
      width: 100vw;
      height: 60vh;
    }
  `;constructor(){super()}#h="home";#p=null;render(){return N`
      <section>${this.#g()}</section>
    `}#g(){if("home"===this.#h)return this.#m();if("gallery"===this.#h)switch(window.scrollY=0,this.#p){case"Software":const t={pageConfig:this.#i.bind(this),collectionName:"Web & Desktop Applications",title:"Webb & Desktop",description:"Jag har arbetat med olika webb- och desktopsapplikationer tidigare. Här är några exempel på dem.",getImages:()=>[{workType:"Online Booking System",description:"Online Booking System",img:"./sourcefile/web/obs/gallery.png"},{workType:"Flight Booking System",description:"Book flight tickets and manage your bookings",img:"./sourcefile/web/jetstream/gallery.png"},{workType:"Orbitz",description:"Solarsystem Exploraton Desktop App",img:"./sourcefile/web/orbitz/gallery.png"},{workType:"Trafikverket-Spotify",description:"Trafikverket-Spotify Desktop App",img:"./sourcefile/web/skonetrafik_spotify/gallery.png"}]};return N`<cn-gallery .ic=${t}></cn-gallery>`;case"UI/UX":const e={pageConfig:this.#i.bind(this),collectionName:"UI/UX",title:"UI/UX",description:"Jag har arbetat med UI & UX protyping tidigare. Här är några exempel på dem.",getImages:()=>[{workType:"Food Delivery App",description:"Mobile App",img:"./sourcefile/uiux/gallery.png"}]};return N`<cn-gallery .ic=${e}></cn-gallery>`;case"E-sport":const i={from:"Home",getPageNavigator:this.#i.bind(this),imgs:[{src:"./sourcefile/gfx/e-sport/youtube/snl.png",title:"Sunlesskhan - YouTube",description:"Make rocket league videos - Over 2M subscribers"},{src:"./sourcefile/gfx/e-sport/youtube/Deezzyy.png",title:"Deezzyy - YouTube",description:"Play video games"},{src:"./sourcefile/gfx/e-sport/youtube/heart.png",title:"Heart Break Kelby - YouTube",description:"Make vlog videos"},{src:"./sourcefile/gfx/e-sport/youtube/pakdel.png",title:"Pakdel Studio - YouTube",description:"Make gfx tutorial videos"},{src:"./sourcefile/gfx/e-sport/twitter/codspx.png",title:"CodspX gaming - Team",description:"Compete in gaming tournaments"},{src:"./sourcefile/gfx/e-sport/twitter/fibeon.png",title:"Fibeon Esport - Team",description:"Compete in rocket leagues tournaments"},{src:"./sourcefile/gfx/e-sport/twitter/rlraderz.png",title:"Rlraderz - Player",description:"Rocket league player"},{src:"./sourcefile/gfx/e-sport/twitter/victario.png",title:"Victario GFX - Studio",description:"Make gfx for gaming"},{src:"./sourcefile/gfx/e-sport/twitch/revamp.png",title:"Revamp - Twitch",description:"Full twitch design - overlay, panels, emotes"},{src:"./sourcefile/gfx/e-sport/twitch/stream.png",title:"Stream - Twitch",description:"Stream window design"},{src:"./sourcefile/gfx/e-sport/twitch/PANEL.png",title:"Panel - Twitch",description:"Panel design"}]};return N`
          <div style="height: 100vh;">
          <cn-bild .ic=${i}></cn-bild>
          </div>
          `;case"Graphic":const s={pageConfig:this.#i.bind(this),collectionName:"Graphic",title:"Graphic",description:"Jag har arbetat med grafisk design tidigare. Här är några exempel på dem.",getImages:()=>[{workType:"Catalogue Design",description:"Catalogue and magazine design",img:"./sourcefile/gfx/uuf/mockups/gallery.jpg"},{workType:"Logo Design",description:"Some of my logo designs",img:"./sourcefile/gfx/logo/gallery.jpg"},{workType:"UUF",description:"Utställningen Unga Forskare",img:"./sourcefile/gfx/uuf/gallery.jpg"}]};return N`<cn-gallery .ic=${s}></cn-gallery>`;case"Home":return this.#m()}if("work"===this.#h)switch(console.log(this.#p),this.#p){case"Online Booking System":return N`<cn-work .ic=${{getBild:()=>({from:"Software",getPageNavigator:this.#i.bind(this),imgs:[{src:"./sourcefile/web/obs/table2.PNG",title:null,description:null},{src:"./sourcefile/web/obs/table.PNG",title:null,description:null},{src:"./sourcefile/web/obs/user-dash.PNG",title:null,description:null},{src:"./sourcefile/web/obs/admin-dash.PNG",title:null,description:null},{src:"./sourcefile/web/obs/edit-admin.PNG",title:null,description:null}]}),titles:[{title:"Online Booking System",description:"Ett fulländat flygbokningssystem för privatpersoner på desktop och webben"},{title:"En fullständig bokningssystem till tvättstuga, frisör, massage, etc.",description:"Målet med denna applikation var att skapa en enkel och användarvänlig bokningssystem för vardagliga verksamheter. \n Genom JetStreams flygapplikation kan användare både intuitivt och tillfredsställande navigera sig genom flygvärldens alla resmöjligheter. Här sker smidig bokning genom designade gränssnitt och en interaktiv världskarta som tillåter användaren att boka och se sina önskade flygrutter."},{title:"Technologier",description:"Jag valde att använda mig av JavaScript, MongoDb, EJS layout och node js för att skapa denna applikation. Jag valde javascript för att det är ett språk jag är bekväm med och jag har använt det i flera projekt tidigare. Jag valde MongoDb för att det är ett NoSQL-databas som är lätt att använda och lätt att lära sig. Jag valde EJS layout för att det är ett enkelt sätt att skapa en layout som kan återanvändas i flera sidor. Jag valde node js för att det är ett enkelt sätt att skapa en server och det är lätt att lära sig."}],link:"https://bookningsystem.cyclic.app/"}}></cn-work>`;case"Food Delivery App":return N`<cn-work .ic=${{getBild:()=>({from:"UI/UX",getPageNavigator:this.#i.bind(this),imgs:[{src:"./sourcefile/uiux/mockups/front.png",title:null,description:null},{src:"./sourcefile/uiux/mockups/map.png",title:null,description:null},{src:"./sourcefile/uiux/mockups/map-setting.png",title:null,description:null},{src:"./sourcefile/uiux/mockups/map-detail.png",title:null,description:null},{src:"./sourcefile/uiux/mockups/meny.png",title:null,description:null},{src:"./sourcefile/uiux/mockups/final-step.png",title:null,description:null},{src:"./sourcefile/uiux/mockups/payment.png",title:null,description:null},{src:"./sourcefile/uiux/mockups/profile.png",title:null,description:null}]}),titles:[{title:"Restaurant Finder & Delivery app prototype.",description:"Ett prototype för en restaurang sök och leverans app."},{title:"Om prototypen",description:"Med detta prototyp har jag försökt skapa en enkel och användarvänlig app för att hitta restauranger och beställa mat. Designen spelade stor roll eftersom det är en app som används för att beställa mat. Jag valde att använda mig av en enkel och minimalistisk design för att göra det enkelt för användaren att navigera sig genom appen. Jag valde att använda mig av vit bakgrund och färgat detaljer för att göra det lättare för användaren att läsa och navigera sig."},{title:"Technologier & färgschema",description:"Jag valde att använda mig av Adobe XD för att skapa denna prototyp. Färgerna jag valde var vit, svart, grå, grön, lila och blå. Jag valde dessa färger för att de är enkla färger och gör designen lysande och unikt."}],link:null}}></cn-work>`;case"Orbitz":return N`<cn-work .ic=${{getBild:()=>({from:"Software",getPageNavigator:this.#i.bind(this),imgs:[{src:"./sourcefile/web/orbitz/orbitz.png",title:null,description:null},{src:"./sourcefile/web/orbitz/quiz.png",title:null,description:null},{src:"./sourcefile/web/orbitz/quiz_win.png",title:null,description:null},{src:"./sourcefile/web/orbitz/pop_up.png",title:null,description:null}]}),titles:[{title:"An educational app for students.",description:"The goal of this app is to educate students about the solar system and the planets in it. The app is designed to be fun and interactive for students to learn about the solar system."},{title:"About the project",description:"This project is build by collaborating of 3 team and 7 people. We did incrimental development and used agile methodology to develop this app. We divided in 3 team product owner, developer and tester and we used scrum to manage the project. We used Trello to manage the project and we had daily stand up meeting to discuss the progress of the project. We used github to manage the code and we had weekly code review to make sure the code is clean and readable. We used Figma to design the app and we had weekly design review to make sure the design is consistent and user friendly. We also changed the role between teh product owner, developer and tester after each sprint to make sure everyone has the same understanding of the project."},{title:"Technologies",description:"Java, javaFx and java swing is used to create this app. We integrate a fake API to get the data about the planets."}],link:null}}></cn-work>`;case"Flight Booking System":return N`<cn-work .ic=${{getBild:()=>({from:"Software",getPageNavigator:this.#i.bind(this),imgs:[{src:"./sourcefile/web/jetstream/userdashboard.png",title:null,description:null},{src:"./sourcefile/web/jetstream/purchase.png",title:null,description:null},{src:"./sourcefile/web/jetstream/payment.png",title:null,description:null},{src:"./sourcefile/web/jetstream/my-ticket.png",title:null,description:null},{src:"./sourcefile/web/jetstream/history.png",title:null,description:null},{src:"./sourcefile/web/jetstream/games.png",title:null,description:null},{src:"./sourcefile/web/jetstream/admin-dash.png",title:null,description:null},{src:"./sourcefile/web/jetstream/map-search.png",title:null,description:null}]}),titles:[{title:"All in one - Flight Booking System",description:"A fully featured flight booking system for private persons on desktop and web"},{title:"About the project",description:"This project was build by a grupp of 4 students (Kasper, Khabib, Sossio and Obed) \n \nThe goal of this application was to create a simple and user-friendly booking system for everyone. \n Through JetStreams flight application, users can both intuitively and satisfactorily navigate through the world of all flight possibilities. Here, smooth booking is done through designed interfaces and an interactive world map that allows the user to book and see their desired flight routes. Forther more the application provides intertaining features such as games and a chat system."},{title:"Technologies",description:"We chose to use Java for the backend and JavaScript for the frontend. We chose Java for the backend because it is a language that is easy to maintaine the system and isolate the front-end from the back-end. We chose JavaScript for the frontend because it is a language that is used alot in front-end and for web development. Other technologies such as postgresSql for the database is used to store the data."}],link:null}}></cn-work>`;case"Trafikverket-Spotify":return N`<cn-work .ic=${{getBild:()=>({from:"Software",getPageNavigator:this.#i.bind(this),imgs:[{src:"./sourcefile/web/skonetrafik_spotify/Home.png",title:null,description:null},{src:"./sourcefile/web/skonetrafik_spotify/showCase.png",title:null,description:null},{src:"./sourcefile/web/skonetrafik_spotify/playlist.png",title:null,description:null},{src:"./sourcefile/web/skonetrafik_spotify/playlist2.png",title:null,description:null}]}),titles:[{title:"Trafikverket + Spotify",description:"A project to create a playlist based on the travel time in Sweden"},{title:"About the project",description:"This project was build by a grupp of 5 students under the course Web services. We created a brand new API that is based on the Trafikverket API and Spotify API in one. The goal of this project was to create a new API that is based on the Trafikverket API and Spotify API in one. The API is used to create a playlist based on the travel time in Sweden. The API is used by a web application that is created by the same group."},{title:"Technologies",description:"We chose to use Java and javaline to develop the API and we used JavaScript ES6 to develop the web application (front-end). We chose Java and javaline to develop the API because it is a language that is easy to maintaine the system and isolate the front-end from the back-end."}],link:null}}></cn-work>`;case"UUF":return N`
         
          <cn-work .ic=${{getBild:()=>({from:"Graphic",getPageNavigator:this.#i.bind(this),imgs:[{src:"./sourcefile/gfx/uuf/imgs/katalog.png",title:null,description:null},{src:"./sourcefile/gfx/uuf/imgs/anons_finalen.png",title:null,description:null},{src:"./sourcefile/gfx/uuf/imgs/affisch-gym.png",title:null,description:null},{src:"./sourcefile/gfx/uuf/imgs/affisch-gym-2.png",title:null,description:null},{src:"./sourcefile/gfx/uuf/imgs/affisch-vatten.png",title:null,description:null},{src:"./sourcefile/gfx/uuf/imgs/pin.png",title:null,description:null},{src:"./sourcefile/gfx/uuf/imgs/tid-kvar.png",title:null,description:null}]}),titles:[{title:"Grafisk ansvarig på Utställningen Unga Forskare",description:"Description"},{title:"Om mitt arbete",description:"Som grafisk ansvarig jobbade jag på Utställning Unga Forskare. Mitt ansvar är att säkerställa att alla grafiska material var färdiga, från design till tryck, för den årliga utställningen. Jag skapar katalog, broscher, flayer, annonser för att rekrytera deltagare och besökare till utställningen. Jag är stolt över min förmåga att levererade allt grafisk material på tid, samtidigt som jag säkerställde en hög standard för kvalitet och kreativitet."},{title:"Technologier",description:"Jag valde att använda mig av Adobe tryck programvaror och Affinity programvaror såsom Adobe InDesign, Affinity Publisher och andra programvaror för att redigera och göra illustrationer på mitt arbete."}],link:"https://ungaforskare.se/wp-content/uploads/2023/04/katalog-uug-2023.pdf"}}></cn-work>
          
          `;case"Logo Design":const t={from:"Graphic",getPageNavigator:this.#i.bind(this),imgs:[{src:"./sourcefile/gfx/logo/LIGHTSOUT2.png",title:"Lights out - logo",description:"Computer and electronic company"},{src:"./sourcefile/gfx/logo/DEEZZYY.png",title:"Deezzyy - logo",description:"Streamer and content creator"},{src:"./sourcefile/gfx/logo/DIGNITY.png",title:"Dignity - logo",description:"Turnament and event team for eSport"},{src:"./sourcefile/gfx/logo/LIKAMEDIA.png",title:"Lika media - logo",description:"Media company"},{src:"./sourcefile/gfx/logo/ZAFARFAZE.png",title:"Zafar Faze - logo",description:"Clothing brand"},{src:"./sourcefile/gfx/logo/MAHEDOOZ.png",title:"Mahe Dooz - logo",description:"Clothing brand"}]};return N`
          <div style="height: 100vh;">
          <cn-bild .ic=${t}></cn-bild>
          </div>
          `;case"Catalogue Design":const e={from:"Graphic",getPageNavigator:this.#i.bind(this),imgs:[{src:"../dist/sourcefile/gfx/uuf/mockups/combination-cover.jpg",title:null,description:null},{src:"../dist/sourcefile/gfx/uuf/mockups/project-list.jpg",title:null,description:null},{src:"../dist/sourcefile/gfx/uuf/mockups/project-list-overview.jpg",title:null,description:null},{src:"../dist/sourcefile/gfx/uuf/mockups/roxane-overview.jpg",title:null,description:null},{src:"../dist/sourcefile/gfx/uuf/mockups/roxane.jpg",title:null,description:null},{src:"../dist/sourcefile/gfx/uuf/mockups/jurylistan-overview.jpg",title:null,description:null},{src:"../dist/sourcefile/gfx/uuf/mockups/jurylistan.jpg",title:null,description:null},{src:"../dist/sourcefile/gfx/uuf/mockups/ericsson-overview.jpg",title:null,description:null},{src:"../dist/sourcefile/gfx/uuf/mockups/ericsson.jpg",title:null,description:null}]};return N`
          <cn-catalogue .ic=${e}></cn-catalogue>
          `}}#i=(t,e)=>{this.#h=t,this.#p=e,window.scrollTo(0,0),this.requestUpdate()};#m(){return N`
    <cn-header .ic=${this.#i.bind(this)}></cn-header>
    <cn-animation></cn-animation>
    <cn-overview
      .ic=${this.#i.bind(this)}
    ></cn-overview>`}}customElements.define("cn-app",Yt)})()})();