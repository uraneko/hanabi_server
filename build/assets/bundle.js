(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return t(this.context.count)},getNextContextId(){return t(this.context.count++)}};function t(t){let n=String(t),r=n.length-1;return e.context.id+(r?String.fromCharCode(96+r):``)+n}function n(t){e.context=t}function r(){return{...e.context,id:e.getNextContextId(),count:0}}var i=(e,t)=>e===t,a=Symbol(`solid-proxy`),o=typeof Proxy==`function`,s=Symbol(`solid-track`),c={equals:i},l=null,u=Se,d=1,f=2,p={owned:null,cleanups:null,context:null,owner:null},m={},h=null,g=null,_=null,v=null,y=null,b=null,x=null,ee=0;function S(e,t){let n=y,r=h,i=e.length===0,a=t===void 0?r:t,o=i?p:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>D(()=>M(o)));h=o,y=null;try{return j(s,!0)}finally{y=n,h=r}}function C(e,t){t=t?Object.assign({},c,t):c;let n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0};return[he.bind(n),e=>(typeof e==`function`&&(e=g&&g.running&&g.sources.has(n)?e(n.tValue):e(n.value)),ge(n,e))]}function te(e,t,n){let r=ye(e,t,!0,d);_&&g&&g.running?b.push(r):_e(r)}function w(e,t,n){let r=ye(e,t,!1,d);_&&g&&g.running?b.push(r):_e(r)}function ne(e,t,n){u=we;let r=ye(e,t,!1,d),i=pe&&A(pe);i&&(r.suspense=i),(!n||!n.render)&&(r.user=!0),x?x.push(r):_e(r)}function T(e,t,n){n=n?Object.assign({},c,n):c;let r=ye(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,_&&g&&g.running?(r.tState=d,b.push(r)):_e(r),he.bind(r)}function re(e){return e&&typeof e==`object`&&`then`in e}function ie(t,n,r){let i,a,o;typeof n==`function`?(i=t,a=n,o=r||{}):(i=!0,a=t,o=n||{});let s=null,c=m,l=null,u=!1,d=!1,f=`initialValue`in o,p=typeof i==`function`&&T(i),_=new Set,[v,b]=(o.storage||C)(o.initialValue),[x,ee]=C(void 0),[S,w]=C(void 0,{equals:!1}),[ne,ie]=C(f?`ready`:`unresolved`);e.context&&(l=e.getNextContextId(),o.ssrLoadFrom===`initial`?c=o.initialValue:e.load&&e.has(l)&&(c=e.load(l)));function E(e,t,n,r){return s===e&&(s=null,r!==void 0&&(f=!0),(e===c||t===c)&&o.onHydrated&&queueMicrotask(()=>o.onHydrated(r,{value:t})),c=m,g&&e&&u?(g.promises.delete(e),u=!1,j(()=>{g.running=!0,ae(t,n)},!1)):ae(t,n)),t}function ae(e,t){j(()=>{t===void 0&&b(()=>e),ie(t===void 0?f?`ready`:`unresolved`:`errored`),ee(t);for(let e of _.keys())e.decrement();_.clear()},!1)}function O(){let e=pe&&A(pe),t=v(),n=x();if(n!==void 0&&!s)throw n;return y&&!y.user&&e&&te(()=>{S(),s&&(e.resolved&&g&&u?g.promises.add(s):_.has(e)||(e.increment(),_.add(e)))}),t}function oe(e=!0){if(e!==!1&&d)return;d=!1;let t=p?p():i;if(u=g&&g.running,t==null||t===!1){E(s,D(v));return}g&&s&&g.promises.delete(s);let n,r=c===m?D(()=>{try{return a(t,{value:v(),refetching:e})}catch(e){n=e}}):c;if(n!==void 0){E(s,void 0,Oe(n),t);return}else if(!re(r))return E(s,r,void 0,t),r;return s=r,`v`in r?(r.s===1?E(s,r.v,void 0,t):E(s,void 0,Oe(r.v),t),r):(d=!0,queueMicrotask(()=>d=!1),j(()=>{ie(f?`refreshing`:`pending`),w()},!1),r.then(e=>E(r,e,void 0,t),e=>E(r,void 0,Oe(e),t)))}Object.defineProperties(O,{state:{get:()=>ne()},error:{get:()=>x()},loading:{get(){let e=ne();return e===`pending`||e===`refreshing`}},latest:{get(){if(!f)return O();let e=x();if(e&&!s)throw e;return v()}}});let ce=h;return p?te(()=>(ce=h,oe(!1))):oe(!1),[O,{refetch:e=>se(ce,()=>oe(e)),mutate:b}]}function E(e){return j(e,!1)}function D(e){if(!v&&y===null)return e();let t=y;y=null;try{return v?v.untrack(e):e()}finally{y=t}}function ae(e,t,n){let r=Array.isArray(e),i,a=n&&n.defer;return n=>{let o;if(r){o=Array(e.length);for(let t=0;t<e.length;t++)o[t]=e[t]()}else o=e();if(a)return a=!1,n;let s=D(()=>t(o,i,n));return i=o,s}}function O(e){return h===null||(h.cleanups===null?h.cleanups=[e]:h.cleanups.push(e)),e}function oe(){return h}function se(e,t){let n=h,r=y;h=e,y=null;try{return j(t,!0)}catch(e){Ae(e)}finally{h=n,y=r}}function ce(e){if(g&&g.running)return e(),g.done;let t=y,n=h;return Promise.resolve().then(()=>{y=t,h=n;let r;return(_||pe)&&(r=g||={sources:new Set,effects:[],promises:new Set,disposed:new Set,queue:new Set,running:!0},r.done||=new Promise(e=>r.resolve=e),r.running=!0),j(e,!1),y=h=null,r?r.done:void 0})}var[le,ue]=C(!1);function de(e){x.push.apply(x,e),e.length=0}function k(e,t){let n=Symbol(`context`);return{id:n,Provider:Me(n),defaultValue:e}}function A(e){let t;return h&&h.context&&(t=h.context[e.id])!==void 0?t:e.defaultValue}function fe(e){let t=T(e),n=T(()=>je(t()));return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var pe;function me(){return pe||=k()}function he(){let e=g&&g.running;if(this.sources&&(e?this.tState:this.state))if((e?this.tState:this.state)===d)_e(this);else{let e=b;b=null,j(()=>Te(this),!1),b=e}if(y){let e=this.observers?this.observers.length:0;y.sources?(y.sources.push(this),y.sourceSlots.push(e)):(y.sources=[this],y.sourceSlots=[e]),this.observers?(this.observers.push(y),this.observerSlots.push(y.sources.length-1)):(this.observers=[y],this.observerSlots=[y.sources.length-1])}return e&&g.sources.has(this)?this.tValue:this.value}function ge(e,t,n){let r=g&&g.running&&g.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(g){let r=g.running;(r||!n&&g.sources.has(e))&&(g.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&j(()=>{for(let t=0;t<e.observers.length;t+=1){let n=e.observers[t],r=g&&g.running;r&&g.disposed.has(n)||((r?!n.tState:!n.state)&&(n.pure?b.push(n):x.push(n),n.observers&&Ee(n)),r?n.tState=d:n.state=d)}if(b.length>1e6)throw b=[],Error()},!1)}return t}function _e(e){if(!e.fn)return;M(e);let t=ee;ve(e,g&&g.running&&g.sources.has(e)?e.tValue:e.value,t),g&&!g.running&&g.sources.has(e)&&queueMicrotask(()=>{j(()=>{g&&(g.running=!0),y=h=e,ve(e,e.tValue,t),y=h=null},!1)})}function ve(e,t,n){let r,i=h,a=y;y=h=e;try{r=e.fn(t)}catch(t){return e.pure&&(g&&g.running?(e.tState=d,e.tOwned&&e.tOwned.forEach(M),e.tOwned=void 0):(e.state=d,e.owned&&e.owned.forEach(M),e.owned=null)),e.updatedAt=n+1,Ae(t)}finally{y=a,h=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&`observers`in e?ge(e,r,!0):g&&g.running&&e.pure?(g.sources.has(e)||(e.value=r),g.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function ye(e,t,n,r=d,i){let a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:h,context:h?h.context:null,pure:n};if(g&&g.running&&(a.state=0,a.tState=r),h===null||h!==p&&(g&&g.running&&h.pure?h.tOwned?h.tOwned.push(a):h.tOwned=[a]:h.owned?h.owned.push(a):h.owned=[a]),v&&a.fn){let e=a.fn,[t,n]=C(void 0,{equals:!1}),r=v.factory(e,n);O(()=>r.dispose());let i,o=()=>ce(n).then(()=>{i&&=(i.dispose(),void 0)});a.fn=n=>(t(),g&&g.running?(i||=v.factory(e,o),i.track(n)):r.track(n))}return a}function be(e){let t=g&&g.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===f)return Te(e);if(e.suspense&&D(e.suspense.inFallback))return e.suspense.effects.push(e);let n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ee);){if(t&&g.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let t=e,i=n[r+1];for(;(t=t.owner)&&t!==i;)if(g.disposed.has(t))return}if((t?e.tState:e.state)===d)_e(e);else if((t?e.tState:e.state)===f){let t=b;b=null,j(()=>Te(e,n[0]),!1),b=t}}}function j(e,t){if(b)return e();let n=!1;t||(b=[]),x?n=!0:x=[],ee++;try{let t=e();return xe(n),t}catch(e){n||(x=null),b=null,Ae(e)}}function xe(e){if(b&&=(_&&g&&g.running?Ce(b):Se(b),null),e)return;let t;if(g){if(!g.promises.size&&!g.queue.size){let e=g.sources,n=g.disposed;x.push.apply(x,g.effects),t=g.resolve;for(let e of x)`tState`in e&&(e.state=e.tState),delete e.tState;g=null,j(()=>{for(let e of n)M(e);for(let t of e){if(t.value=t.tValue,t.owned)for(let e=0,n=t.owned.length;e<n;e++)M(t.owned[e]);t.tOwned&&(t.owned=t.tOwned),delete t.tValue,delete t.tOwned,t.tState=0}ue(!1)},!1)}else if(g.running){g.running=!1,g.effects.push.apply(g.effects,x),x=null,ue(!0);return}}let n=x;x=null,n.length&&j(()=>u(n),!1),t&&t()}function Se(e){for(let t=0;t<e.length;t++)be(e[t])}function Ce(e){for(let t=0;t<e.length;t++){let n=e[t],r=g.queue;r.has(n)||(r.add(n),_(()=>{r.delete(n),j(()=>{g.running=!0,be(n)},!1),g&&(g.running=!1)}))}}function we(t){let r,i=0;for(r=0;r<t.length;r++){let e=t[r];e.user?t[i++]=e:be(e)}if(e.context){if(e.count){e.effects||=[],e.effects.push(...t.slice(0,i));return}n()}for(e.effects&&(e.done||!e.count)&&(t=[...e.effects,...t],i+=e.effects.length,delete e.effects),r=0;r<i;r++)be(t[r])}function Te(e,t){let n=g&&g.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){let i=e.sources[r];if(i.sources){let e=n?i.tState:i.state;e===d?i!==t&&(!i.updatedAt||i.updatedAt<ee)&&be(i):e===f&&Te(i,t)}}}function Ee(e){let t=g&&g.running;for(let n=0;n<e.observers.length;n+=1){let r=e.observers[n];(t?!r.tState:!r.state)&&(t?r.tState=f:r.state=f,r.pure?b.push(r):x.push(r),r.observers&&Ee(r))}}function M(e){let t;if(e.sources)for(;e.sources.length;){let t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){let e=r.pop(),i=t.observerSlots.pop();n<r.length&&(e.sourceSlots[i]=n,r[n]=e,t.observerSlots[n]=i)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)M(e.tOwned[t]);delete e.tOwned}if(g&&g.running&&e.pure)De(e,!0);else if(e.owned){for(t=e.owned.length-1;t>=0;t--)M(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}g&&g.running?e.tState=0:e.state=0}function De(e,t){if(t||(e.tState=0,g.disposed.add(e)),e.owned)for(let t=0;t<e.owned.length;t++)De(e.owned[t])}function Oe(e){return e instanceof Error?e:Error(typeof e==`string`?e:`Unknown error`,{cause:e})}function ke(e,t,n){try{for(let n of t)n(e)}catch(e){Ae(e,n&&n.owner||null)}}function Ae(e,t=h){let n=l&&t&&t.context&&t.context[l],r=Oe(e);if(!n)throw r;x?x.push({fn(){ke(r,n,t)},state:d}):ke(r,n,t)}function je(e){if(typeof e==`function`&&!e.length)return je(e());if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let r=je(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function Me(e,t){return function(t){let n;return w(()=>n=D(()=>(h.context={...h.context,[e]:t.value},fe(()=>t.children))),void 0),n}}var Ne=Symbol(`fallback`);function Pe(e){for(let t=0;t<e.length;t++)e[t]()}function Fe(e,t,n={}){let r=[],i=[],a=[],o=0,c=t.length>1?[]:null;return O(()=>Pe(a)),()=>{let l=e()||[],u=l.length,d,f;return l[s],D(()=>{let e,t,s,m,h,g,_,v,y;if(u===0)o!==0&&(Pe(a),a=[],r=[],i=[],o=0,c&&=[]),n.fallback&&(r=[Ne],i[0]=S(e=>(a[0]=e,n.fallback())),o=1);else if(o===0){for(i=Array(u),f=0;f<u;f++)r[f]=l[f],i[f]=S(p);o=u}else{for(s=Array(u),m=Array(u),c&&(h=Array(u)),g=0,_=Math.min(o,u);g<_&&r[g]===l[g];g++);for(_=o-1,v=u-1;_>=g&&v>=g&&r[_]===l[v];_--,v--)s[v]=i[_],m[v]=a[_],c&&(h[v]=c[_]);for(e=new Map,t=Array(v+1),f=v;f>=g;f--)y=l[f],d=e.get(y),t[f]=d===void 0?-1:d,e.set(y,f);for(d=g;d<=_;d++)y=r[d],f=e.get(y),f!==void 0&&f!==-1?(s[f]=i[d],m[f]=a[d],c&&(h[f]=c[d]),f=t[f],e.set(y,f)):a[d]();for(f=g;f<u;f++)f in s?(i[f]=s[f],a[f]=m[f],c&&(c[f]=h[f],c[f](f))):i[f]=S(p);i=i.slice(0,o=u),r=l.slice(0)}return i});function p(e){if(a[f]=e,c){let[e,n]=C(f);return c[f]=n,t(l[f],e)}return t(l[f])}}}var Ie=!1;function N(t,i){if(Ie&&e.context){let a=e.context;n(r());let o=D(()=>t(i||{}));return n(a),o}return D(()=>t(i||{}))}function Le(){return!0}var Re={get(e,t,n){return t===a?n:e.get(t)},has(e,t){return t===a?!0:e.has(t)},set:Le,deleteProperty:Le,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Le,deleteProperty:Le}},ownKeys(e){return e.keys()}};function ze(e){return(e=typeof e==`function`?e():e)?e:{}}function Be(){for(let e=0,t=this.length;e<t;++e){let t=this[e]();if(t!==void 0)return t}}function Ve(...e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];t||=!!r&&a in r,e[n]=typeof r==`function`?(t=!0,T(r)):r}if(o&&t)return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){let r=ze(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in ze(e[n]))return!0;return!1},keys(){let t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(ze(e[n])));return[...new Set(t)]}},Re);let n={},r=Object.create(null);for(let t=e.length-1;t>=0;t--){let i=e[t];if(!i)continue;let a=Object.getOwnPropertyNames(i);for(let e=a.length-1;e>=0;e--){let t=a[e];if(t===`__proto__`||t===`constructor`)continue;let o=Object.getOwnPropertyDescriptor(i,t);if(!r[t])r[t]=o.get?{enumerable:!0,configurable:!0,get:Be.bind(n[t]=[o.get.bind(i)])}:o.value===void 0?void 0:o;else{let e=n[t];e&&(o.get?e.push(o.get.bind(i)):o.value!==void 0&&e.push(()=>o.value))}}}let i={},s=Object.keys(r);for(let e=s.length-1;e>=0;e--){let t=s[e],n=r[t];n&&n.get?Object.defineProperty(i,t,n):i[t]=n?n.value:void 0}return i}var He=e=>`Stale read from <${e}>.`;function Ue(e){let t=`fallback`in e&&{fallback:()=>e.fallback};return T(Fe(()=>e.each,e.children,t||void 0))}function We(e){let t=e.keyed,n=T(()=>e.when,void 0,void 0),r=t?n:T(n,void 0,{equals:(e,t)=>!e==!t});return T(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?D(()=>a(t?i:()=>{if(!D(r))throw He(`Show`);return n()})):a}return e.fallback},void 0,void 0)}function P(e){let t=fe(()=>e.children),n=T(()=>{let e=t(),n=Array.isArray(e)?e:[e],r=()=>void 0;for(let e=0;e<n.length;e++){let t=e,i=n[e],a=r,o=T(()=>a()?void 0:i.when,void 0,void 0),s=i.keyed?o:T(o,void 0,{equals:(e,t)=>!e==!t});r=()=>a()||(s()?[t,o,i]:void 0)}return r});return T(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a]=t,o=a.children;return typeof o==`function`&&o.length>0?D(()=>o(a.keyed?i():()=>{if(D(n)()?.[0]!==r)throw He(`Match`);return i()})):o},void 0,void 0)}function F(e){return e}var Ge;function Ke(){Ge&&[...Ge].forEach(e=>e())}var qe=k();function Je(t){let r=0,i,a,o,s,c,[l,u]=C(!1),d=me(),f={increment:()=>{++r===1&&u(!0)},decrement:()=>{--r===0&&u(!1)},inFallback:l,effects:[],resolved:!1},p=oe();if(e.context&&e.load){let t=e.getContextId(),r=e.load(t);if(r&&(typeof r!=`object`||r.s!==1?o=r:e.gather(t)),o&&o!==`$$f`){let[r,i]=C(void 0,{equals:!1});s=r,o.then(()=>{if(e.done)return i();e.gather(t),n(a),i(),n()},e=>{c=e,i()})}}let m=A(qe);m&&(i=m.register(f.inFallback));let h;return O(()=>h&&h()),N(d.Provider,{value:f,get children(){return T(()=>{if(c)throw c;if(a=e.context,s){s(),s=void 0;return}a&&o===`$$f`&&n();let r=T(()=>t.children);return T(e=>{let s=f.inFallback(),{showContent:c=!0,showFallback:l=!0}=i?i():{};if((!s||o&&o!==`$$f`)&&c)return f.resolved=!0,h&&h(),h=a=o=void 0,de(f.effects),r();if(l)return h?e:S(e=>(h=e,a&&=(n({id:a.id+`F`,count:0}),void 0),t.fallback),p)})})}})}var Ye=e=>T(()=>e());function Xe(e,t,n){let r=n.length,i=t.length,a=r,o=0,s=0,c=t[i-1].nextSibling,l=null;for(;o<i||s<a;){if(t[o]===n[s]){o++,s++;continue}for(;t[i-1]===n[a-1];)i--,a--;if(i===o){let t=a<r?s?n[s-1].nextSibling:n[a-s]:c;for(;s<a;)e.insertBefore(n[s++],t)}else if(a===s)for(;o<i;)(!l||!l.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[a-1]&&n[s]===t[i-1]){let r=t[--i].nextSibling;e.insertBefore(n[s++],t[o++].nextSibling),e.insertBefore(n[--a],r),t[i]=n[a]}else{if(!l){l=new Map;let e=s;for(;e<a;)l.set(n[e],e++)}let r=l.get(t[o]);if(r!=null)if(s<r&&r<a){let c=o,u=1,d;for(;++c<i&&c<a&&!((d=l.get(t[c]))==null||d!==r+u);)u++;if(u>r-s){let i=t[o];for(;s<r;)e.insertBefore(n[s++],i)}else e.replaceChild(n[s++],t[o++])}else o++;else t[o++].remove()}}}var Ze=`_$DX_DELEGATE`;function Qe(e,t,n,r={}){let i;return S(r=>{i=r,t===document?e():V(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=``}}function I(e,t,n,r){let i,a=()=>{let t=r?document.createElementNS(`http://www.w3.org/1998/Math/MathML`,`template`):document.createElement(`template`);return t.innerHTML=e,n?t.content.firstChild.firstChild:r?t.firstChild:t.content.firstChild},o=t?()=>D(()=>document.importNode(i||=a(),!0)):()=>(i||=a()).cloneNode(!0);return o.cloneNode=o,o}function $e(e,t=window.document){let n=t[Ze]||(t[Ze]=new Set);for(let r=0,i=e.length;r<i;r++){let i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,nt))}}function L(e,t,n){tt(e)||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function R(e,t){tt(e)||(t==null?e.removeAttribute(`class`):e.className=t)}function z(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){let r=n[0];e.addEventListener(t,n[0]=t=>r.call(e,n[1],t))}else e.addEventListener(t,n,typeof n!=`function`&&n)}function et(e,t,n){if(!t)return n?L(e,`style`):t;let r=e.style;if(typeof t==`string`)return r.cssText=t;typeof n==`string`&&(r.cssText=n=void 0),n||={},t||={};let i,a;for(a in n)t[a]??r.removeProperty(a),delete n[a];for(a in t)i=t[a],i!==n[a]&&(r.setProperty(a,i),n[a]=i);return n}function B(e,t,n){n==null?e.style.removeProperty(t):e.style.setProperty(t,n)}function V(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!=`function`)return rt(e,t,r,n);w(r=>rt(e,t(),r,n),r)}function tt(t){return!!e.context&&!e.done&&(!t||t.isConnected)}function nt(t){if(e.registry&&e.events&&e.events.find(([e,n])=>n===t))return;let n=t.target,r=`$$${t.type}`,i=t.target,a=t.currentTarget,o=e=>Object.defineProperty(t,`target`,{configurable:!0,value:e}),s=()=>{let e=n[r];if(e&&!n.disabled){let i=n[`${r}Data`];if(i===void 0?e.call(n,t):e.call(n,i,t),t.cancelBubble)return}return n.host&&typeof n.host!=`string`&&!n.host._$host&&n.contains(t.target)&&o(n.host),!0},c=()=>{for(;s()&&(n=n._$host||n.parentNode||n.host););};if(Object.defineProperty(t,`currentTarget`,{configurable:!0,get(){return n||document}}),e.registry&&!e.done&&(e.done=_$HY.done=!0),t.composedPath){let e=t.composedPath();o(e[0]);for(let t=0;t<e.length-2&&(n=e[t],s());t++){if(n._$host){n=n._$host,c();break}if(n.parentNode===a)break}}else c();o(i)}function rt(e,t,n,r,i){let a=tt(e);if(a){!n&&(n=[...e.childNodes]);let t=[];for(let e=0;e<n.length;e++){let r=n[e];r.nodeType===8&&r.data.slice(0,2)===`!$`?r.remove():t.push(r)}n=t}for(;typeof n==`function`;)n=n();if(t===n)return n;let o=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,o===`string`||o===`number`){if(a||o===`number`&&(t=t.toString(),t===n))return n;if(s){let i=n[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),n=ot(e,n,r,i)}else n=n!==``&&typeof n==`string`?e.firstChild.data=t:e.textContent=t}else if(t==null||o===`boolean`){if(a)return n;n=ot(e,n,r)}else if(o===`function`)return w(()=>{let i=t();for(;typeof i==`function`;)i=i();n=rt(e,i,n,r)}),()=>n;else if(Array.isArray(t)){let o=[],c=n&&Array.isArray(n);if(it(o,t,n,i))return w(()=>n=rt(e,o,n,r,!0)),()=>n;if(a){if(!o.length)return n;if(r===void 0)return n=[...e.childNodes];let t=o[0];if(t.parentNode!==e)return n;let i=[t];for(;(t=t.nextSibling)!==r;)i.push(t);return n=i}if(o.length===0){if(n=ot(e,n,r),s)return n}else c?n.length===0?at(e,o,r):Xe(e,n,o):(n&&ot(e),at(e,o));n=o}else if(t.nodeType){if(a&&t.parentNode)return n=s?[t]:t;if(Array.isArray(n)){if(s)return n=ot(e,n,r,t);ot(e,n,null,t)}else n==null||n===``||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}return n}function it(e,t,n,r){let i=!1;for(let a=0,o=t.length;a<o;a++){let o=t[a],s=n&&n[e.length],c;if(!(o==null||o===!0||o===!1))if((c=typeof o)==`object`&&o.nodeType)e.push(o);else if(Array.isArray(o))i=it(e,o,s)||i;else if(c===`function`)if(r){for(;typeof o==`function`;)o=o();i=it(e,Array.isArray(o)?o:[o],Array.isArray(s)?s:[s])||i}else e.push(o),i=!0;else{let t=String(o);s&&s.nodeType===3&&s.data===t?e.push(s):e.push(document.createTextNode(t))}}return i}function at(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function ot(e,t,n,r){if(n===void 0)return e.textContent=``;let i=r||document.createTextNode(``);if(t.length){let r=!1;for(let a=t.length-1;a>=0;a--){let o=t[a];if(i!==o){let t=o.parentNode===e;!r&&!a?t?e.replaceChild(i,o):e.insertBefore(i,n):t&&o.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}function st(){let e=new Set;function t(t){return e.add(t),()=>e.delete(t)}let n=!1;function r(t,r){if(n)return!(n=!1);let i={to:t,options:r,defaultPrevented:!1,preventDefault:()=>i.defaultPrevented=!0};for(let a of e)a.listener({...i,from:a.location,retry:e=>{e&&(n=!0),a.navigate(t,{...r,resolve:!1})}});return!i.defaultPrevented}return{subscribe:t,confirm:r}}var ct;function lt(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},``),ct=window.history.state._depth}lt();function ut(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function dt(e,t){let n=!1;return()=>{let r=ct;lt();let i=r==null?null:ct-r;if(n){n=!1;return}i&&t(i)?(n=!0,window.history.go(-i)):e()}}var ft=/^(?:[a-z0-9]+:)?\/\//i,pt=/^\/+|(\/)\/+$/g,mt=`http://sr`;function ht(e,t=!1){let n=e.replace(pt,`$1`);return n?t||/^[?#]/.test(n)?n:`/`+n:``}function gt(e,t,n){if(ft.test(t))return;let r=ht(e),i=n&&ht(n),a=``;return a=!i||t.startsWith(`/`)?r:i.toLowerCase().indexOf(r.toLowerCase())===0?i:r+i,(a||`/`)+ht(t,!a)}function _t(e,t){return ht(e).replace(/\/*(\*.*)?$/g,``)+ht(t)}function vt(e){let t={};return e.searchParams.forEach((e,n)=>{n in t?Array.isArray(t[n])?t[n].push(e):t[n]=[t[n],e]:t[n]=e}),t}function yt(e,t,n){let[r,i]=e.split(`/*`,2),a=r.split(`/`).filter(Boolean),o=a.length;return e=>{let r=e.split(`/`).filter(Boolean),s=r.length-o;if(s<0||s>0&&i===void 0&&!t)return null;let c={path:o?``:`/`,params:{}},l=e=>n===void 0?void 0:n[e];for(let e=0;e<o;e++){let t=a[e],n=t[0]===`:`,i=n?r[e]:r[e].toLowerCase(),o=n?t.slice(1):t.toLowerCase();if(n&&bt(i,l(o)))c.params[o]=i;else if(n||!bt(i,o))return null;c.path+=`/${i}`}if(i){let e=s?r.slice(-s).join(`/`):``;if(bt(e,l(i)))c.params[i]=e;else return null}return c}}function bt(e,t){let n=t=>t===e;return t===void 0?!0:typeof t==`string`?n(t):typeof t==`function`?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function xt(e){let[t,n]=e.pattern.split(`/*`,2),r=t.split(`/`).filter(Boolean);return r.reduce((e,t)=>e+(t.startsWith(`:`)?2:3),r.length-(n===void 0?0:1))}function St(e){let t=new Map,n=oe();return new Proxy({},{get(r,i){return t.has(i)||se(n,()=>t.set(i,T(()=>e()[i]))),t.get(i)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())},has(t,n){return n in e()}})}function Ct(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length),i=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)i.push(n+=t[1]),r=r.slice(t[0].length);return Ct(r).reduce((e,t)=>[...e,...i.map(e=>e+t)],[])}var wt=100,Tt=k(),Et=k();function Dt(e,t=``){let{component:n,preload:r,load:i,children:a,info:o}=e,s=!a||Array.isArray(a)&&!a.length,c={key:e,component:n,preload:r||i,info:o};return kt(e.path).reduce((n,r)=>{for(let i of Ct(r)){let a=_t(t,i),o=s?a:a.split(`/*`,1)[0];o=o.split(`/`).map(e=>e.startsWith(`:`)||e.startsWith(`*`)?e:encodeURIComponent(e)).join(`/`),n.push({...c,originalPath:r,pattern:o,matcher:yt(o,!s,e.matchFilters)})}return n},[])}function Ot(e,t=0){return{routes:e,score:xt(e[e.length-1])*1e4-t,matcher(t){let n=[];for(let r=e.length-1;r>=0;r--){let i=e[r],a=i.matcher(t);if(!a)return null;n.unshift({...a,route:i})}return n}}}function kt(e){return Array.isArray(e)?e:[e]}function At(e,t=``,n=[],r=[]){let i=kt(e);for(let e=0,a=i.length;e<a;e++){let a=i[e];if(a&&typeof a==`object`){a.hasOwnProperty(`path`)||(a.path=``);let e=Dt(a,t);for(let t of e){n.push(t);let e=Array.isArray(a.children)&&a.children.length===0;if(a.children&&!e)At(a.children,t.pattern,n,r);else{let e=Ot([...n],r.length);r.push(e)}n.pop()}}}return n.length?r:r.sort((e,t)=>t.score-e.score)}function jt(e,t){for(let n=0,r=e.length;n<r;n++){let r=e[n].matcher(t);if(r)return r}return[]}function Mt(e,t,n){let r=new URL(mt),i=T(t=>{let n=e();try{return new URL(n,r)}catch{return console.error(`Invalid path ${n}`),t}},r,{equals:(e,t)=>e.href===t.href}),a=T(()=>i().pathname),o=T(()=>i().search,!0),s=T(()=>i().hash),c=()=>``,l=ae(o,()=>vt(i()));return{get pathname(){return a()},get search(){return o()},get hash(){return s()},get state(){return t()},get key(){return c()},query:n?n(l):St(l)}}var Nt;function Pt(){return Nt}function Ft(e,t,n,r={}){let{signal:[i,a],utils:o={}}=e,s=o.parsePath||(e=>e),c=o.renderPath||(e=>e),l=o.beforeLeave||st(),u=gt(``,r.base||``);if(u===void 0)throw Error(`${u} is not a valid base path`);u&&!i().value&&a({value:u,replace:!0,scroll:!1});let[d,f]=C(!1),p,m=(e,t)=>{t.value===h()&&t.state===_()||(p===void 0&&f(!0),Nt=e,p=t,ce(()=>{p===t&&(g(p.value),v(p.state),Ke(),x[1](e=>e.filter(e=>e.pending)))}).finally(()=>{p===t&&E(()=>{Nt=void 0,e===`navigate`&&O(p),f(!1),p=void 0})}))},[h,g]=C(i().value),[_,v]=C(i().state),y=Mt(h,_,o.queryWrapper),b=[],x=C([]),ee=T(()=>typeof r.transformUrl==`function`?jt(t(),r.transformUrl(y.pathname)):jt(t(),y.pathname)),S=()=>{let e=ee(),t={};for(let n=0;n<e.length;n++)Object.assign(t,e[n].params);return t},te=o.paramsWrapper?o.paramsWrapper(S,t):St(S),ne={pattern:u,path:()=>u,outlet:()=>null,resolvePath(e){return gt(u,e)}};return w(ae(i,e=>m(`native`,e),{defer:!0})),{base:ne,location:y,params:te,isRouting:d,renderPath:c,parsePath:s,navigatorFactory:ie,matches:ee,beforeLeave:l,preloadRoute:oe,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:x};function re(e,t,n){D(()=>{if(typeof t==`number`){t&&(o.go?o.go(t):console.warn(`Router integration does not support relative routing`));return}let r=!t||t[0]===`?`,{replace:i,resolve:a,scroll:s,state:c}={replace:!1,resolve:!r,scroll:!0,...n},u=a?e.resolvePath(t):gt(r&&y.pathname||``,t);if(u===void 0)throw Error(`Path '${t}' is not a routable path`);if(b.length>=wt)throw Error(`Too many redirects`);let d=h();(u!==d||c!==_())&&l.confirm(u,n)&&(b.push({value:d,replace:i,scroll:s,state:_()}),m(`navigate`,{value:u,state:c}))})}function ie(e){return e=e||A(Et)||ne,(t,n)=>re(e,t,n)}function O(e){let t=b[0];t&&(a({...e,replace:t.replace,scroll:t.scroll}),b.length=0)}function oe(e,r){let i=jt(t(),e.pathname),a=Nt;Nt=`preload`;for(let t in i){let{route:a,params:o}=i[t];a.component&&a.component.preload&&a.component.preload();let{preload:s}=a;r&&s&&se(n(),()=>s({params:o,location:{pathname:e.pathname,search:e.search,hash:e.hash,query:vt(e),state:null,key:``},intent:`preload`}))}Nt=a}}function It(e,t,n,r){let{base:i,location:a,params:o}=e,{pattern:s,component:c,preload:l}=r().route,u=T(()=>r().path);c&&c.preload&&c.preload();let d=l?l({params:o,location:a,intent:Nt||`initial`}):void 0;return{parent:t,pattern:s,path:u,outlet:()=>c?N(c,{params:o,location:a,data:d,get children(){return n()}}):n(),resolvePath(e){return gt(i.path(),e,u())}}}var Lt=e=>t=>{let{base:n}=t,r=fe(()=>t.children),i=T(()=>At(r(),t.base||``)),a,o=Ft(e,i,()=>a,{base:n,singleFlight:t.singleFlight,transformUrl:t.transformUrl});return e.create&&e.create(o),N(Tt.Provider,{value:o,get children(){return N(Rt,{routerState:o,get root(){return t.root},get preload(){return t.rootPreload||t.rootLoad},get children(){return[Ye(()=>(a=oe())&&null),N(zt,{routerState:o,get branches(){return i()}})]}})}})};function Rt(e){let t=e.routerState.location,n=e.routerState.params,r=T(()=>e.preload&&D(()=>{e.preload({params:n,location:t,intent:Pt()||`initial`})}));return N(We,{get when(){return e.root},keyed:!0,get fallback(){return e.children},children:i=>N(i,{params:n,location:t,get data(){return r()},get children(){return e.children}})})}function zt(e){let t=[],n,r=T(ae(e.routerState.matches,(i,a,o)=>{let s=a&&i.length===a.length,c=[];for(let n=0,l=i.length;n<l;n++){let l=a&&a[n],u=i[n];o&&l&&u.route.key===l.route.key?c[n]=o[n]:(s=!1,t[n]&&t[n](),S(i=>{t[n]=i,c[n]=It(e.routerState,c[n-1]||e.routerState.base,Bt(()=>r()[n+1]),()=>{let t=e.routerState.matches();return t[n]??t[0]})}))}return t.splice(i.length).forEach(e=>e()),o&&s?o:(n=c[0],c)}));return Bt(()=>r()&&n)()}var Bt=e=>()=>N(We,{get when(){return e()},keyed:!0,children:e=>N(Et.Provider,{value:e,get children(){return e.outlet()}})}),Vt=e=>{let t=fe(()=>e.children);return Ve(e,{get children(){return t()}})};function Ht([e,t],n,r){return[n?()=>n(e()):e,r?e=>t(r(e)):t]}function Ut(t){let n=!1,r=e=>typeof e==`string`?{value:e}:e,i=Ht(C(r(t.get()),{equals:(e,t)=>e.value===t.value&&e.state===t.state}),void 0,r=>(!n&&t.set(r),e.registry&&!e.done&&(e.done=!0),r));return t.init&&O(t.init((e=t.get())=>{n=!0,i[1](r(e)),n=!1})),Lt({signal:i,create:t.create,utils:t.utils})}function Wt(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Gt(e,t){let n=e&&document.getElementById(e);n?n.scrollIntoView():t&&window.scrollTo(0,0)}var Kt=new Map;function qt({preload:e=!0,explicitLinks:t=!1,actionBase:n=`/_server`,transformUrl:r}={}){return i=>{let a=i.base.path(),o=i.navigatorFactory(i.base),s,c;function l(e){return e.namespaceURI===`http://www.w3.org/2000/svg`}function u(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;let n=e.composedPath().find(e=>e instanceof Node&&e.nodeName.toUpperCase()===`A`);if(!n||t&&!n.hasAttribute(`link`))return;let r=l(n),i=r?n.href.baseVal:n.href;if((r?n.target.baseVal:n.target)||!i&&!n.hasAttribute(`state`))return;let o=(n.getAttribute(`rel`)||``).split(/\s+/);if(n.hasAttribute(`download`)||o&&o.includes(`external`))return;let s=r?new URL(i,document.baseURI):new URL(i);if(!(s.origin!==window.location.origin||a&&s.pathname&&!s.pathname.toLowerCase().startsWith(a.toLowerCase())))return[n,s]}function d(e){let t=u(e);if(!t)return;let[n,r]=t,a=i.parsePath(r.pathname+r.search+r.hash),s=n.getAttribute(`state`);e.preventDefault(),o(a,{resolve:!1,replace:n.hasAttribute(`replace`),scroll:!n.hasAttribute(`noscroll`),state:s?JSON.parse(s):void 0})}function f(e){let t=u(e);if(!t)return;let[n,a]=t;r&&(a.pathname=r(a.pathname)),i.preloadRoute(a,n.getAttribute(`preload`)!==`false`)}function p(e){clearTimeout(s);let t=u(e);if(!t)return c=null;let[n,a]=t;c!==n&&(r&&(a.pathname=r(a.pathname)),s=setTimeout(()=>{i.preloadRoute(a,n.getAttribute(`preload`)!==`false`),c=n},20))}function m(e){if(e.defaultPrevented)return;let t=e.submitter&&e.submitter.hasAttribute(`formaction`)?e.submitter.getAttribute(`formaction`):e.target.getAttribute(`action`);if(!t)return;if(!t.startsWith(`https://action/`)){let e=new URL(t,mt);if(t=i.parsePath(e.pathname+e.search),!t.startsWith(n))return}if(e.target.method.toUpperCase()!==`POST`)throw Error(`Only POST forms are supported for Actions`);let r=Kt.get(t);if(r){e.preventDefault();let t=new FormData(e.target,e.submitter);r.call({r:i,f:e.target},e.target.enctype===`multipart/form-data`?t:new URLSearchParams(t))}}$e([`click`,`submit`]),document.addEventListener(`click`,d),e&&(document.addEventListener(`mousemove`,p,{passive:!0}),document.addEventListener(`focusin`,f,{passive:!0}),document.addEventListener(`touchstart`,f,{passive:!0})),document.addEventListener(`submit`,m),O(()=>{document.removeEventListener(`click`,d),e&&(document.removeEventListener(`mousemove`,p),document.removeEventListener(`focusin`,f),document.removeEventListener(`touchstart`,f)),document.removeEventListener(`submit`,m)})}}function Jt(e){let t=()=>{let e=window.location.pathname.replace(/^\/+/,`/`)+window.location.search,t=window.history.state&&window.history.state._depth&&Object.keys(window.history.state).length===1?void 0:window.history.state;return{value:e+window.location.hash,state:t}},n=st();return Ut({get:t,set({value:e,replace:t,scroll:n,state:r}){t?window.history.replaceState(ut(r),``,e):window.history.pushState(r,``,e),Gt(decodeURIComponent(window.location.hash.slice(1)),n),lt()},init:e=>Wt(window,`popstate`,dt(e,e=>{if(e)return!n.confirm(e);{let e=t();return!n.confirm(e.value,{state:e.state})}})),create:qt({preload:e.preload,explicitLinks:e.explicitLinks,actionBase:e.actionBase,transformUrl:e.transformUrl}),utils:{go:e=>window.history.go(e),beforeLeave:n}})(e)}function Yt(){return{paths_:null,props_:null,styles_:null,init_props(){return(this.props_===null||this.paths_===null)&&(this.props_={},this.paths_={}),this},init_styles(){return this.styles_===null&&(this.styles_={}),this},override(e,...t){if(t.length===0||Object.keys(e).length===0)return this;this.init_props();let n=Object.keys(this.props_).length;return Object.entries(e).forEach(([e,r])=>{let i=Xt(this.props_,e,r,n);if(i>n){t.forEach(e=>Zt(this.paths_,e,n)),n=i;return}t.forEach(e=>Zt(this.paths_,e,i))}),this},style(e){return Object.keys(e).length===0?this:(this.init_styles(),Object.entries(e).forEach(([e,t])=>{this.styles_[e]=t}),this)},parse(e){let t=H(e),n=t.style;return this.styles_!==null&&Object.entries(this.styles_).forEach(([e,t])=>n.setProperty(e,t)),this.props_!==null&&this.paths_!==null&&Object.entries(this.paths_).forEach(([e,n])=>{let r=Qt(this.props_,n);new Array(...t.querySelectorAll(e)).forEach(e=>{let t=e.style;r.forEach(([e,n])=>{t.setProperty(e,n)})})}),t},clear(){return[this.paths_,this.props_,this.styles_].forEach(e=>{if(e!==null)for(let t of Object.keys(e))Reflect.deleteProperty(e,t)}),this}}}function Xt(e,t,n,r){let i=e[t];return i===void 0?(e[t]={val:n,idx:r},r+1):(i.val,i.idx)}function Zt(e,t,n){let r=e[t];if(r===void 0){e[t]=n;return}W(r)===`Number`?r=[r,n]:r.push(n)}function Qt(e,t){let n=W(t);return Object.entries(e).filter(([e,r])=>{let i=r.idx;return n===`Number`?i===t:t.includes(i)}).map(([e,t])=>[e,t.val])}var $t=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="265.5744mm"
   height="258.60724mm"
   viewBox="0 0 265.57441 258.60727"
   version="1.1"
   id="svg1"
   inkscape:version="1.4.3 (0d15f75042, 2025-12-25)"
   sodipodi:docname="fallback.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#2a2b2f"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:zoom="0.54649117"
     inkscape:cx="753.90056"
     inkscape:cy="397.99362"
     inkscape:window-width="1920"
     inkscape:window-height="1080"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer1" />
  <defs
     id="defs1">
    <rect
       x="403.65251"
       y="294.25069"
       width="50.797919"
       height="35.619886"
       id="rect1" />
    <linearGradient
       id="linearGradient1"
       inkscape:collect="always">
      <stop
         style="stop-color:#b63e76;stop-opacity:1;"
         offset="0"
         id="stop1" />
      <stop
         style="stop-color:#e39091;stop-opacity:1;"
         offset="0.24453701"
         id="stop3" />
      <stop
         style="stop-color:#73caaa;stop-opacity:1;"
         offset="0.47508264"
         id="stop4" />
      <stop
         style="stop-color:#5a76d4;stop-opacity:1;"
         offset="0.71164858"
         id="stop5" />
      <stop
         style="stop-color:#8051c2;stop-opacity:1;"
         offset="0.85288382"
         id="stop6" />
      <stop
         style="stop-color:#bc81e6;stop-opacity:1;"
         offset="1"
         id="stop2" />
    </linearGradient>
    <linearGradient
       inkscape:collect="always"
       xlink:href="#linearGradient1"
       id="linearGradient2"
       x1="-10928.486"
       y1="5981.624"
       x2="26356.043"
       y2="5981.624"
       gradientUnits="userSpaceOnUse" />
  </defs>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(5304.5758,10092.13)">
    <path
       id="path1"
       style="fill:url(#linearGradient2);fill-rule:evenodd;stroke:#000000;stroke-width:10.7818"
       d="M -8485.9982 13561.959 C -8193.3048 14670.365 -7850.8238 15539.78 -7447.5367 15997.902 C -7246.3038 16074.123 -6959.3204 16115.815 -6631.2707 16118.541 C -7110.0237 15450.966 -7541.98 14747.534 -7922.2065 14013.016 C -8207.6766 13461.547 -8462.4935 12896.214 -8685.9644 12319.648 C -8650.8037 12774.515 -8583.4794 13192.805 -8485.9982 13561.959 z M -8478.865 9171.1059 C -8184.7114 10684.167 -7675.0091 12152.203 -6961.7534 13527.829 C -6515.152 14389.171 -5992.5671 15204.871 -5403.2603 15966.061 C -5391.8703 15963.146 -5380.4982 15960.215 -5369.1298 15957.213 C -4991.4429 15857.478 -4673.1455 15693.767 -4408.1947 15490.997 C -5014.924 14731.833 -5549.5914 13912.26 -6001.28 13042.72 C -7046.8564 11029.894 -7625.2732 8804.3349 -7693.4091 6537.1934 C -7693.624 6530.0438 -7693.8546 6522.8647 -7694.0593 6515.7154 C -8052.7496 7394.0852 -8311.6252 8296.0208 -8478.865 9171.1059 z M -6169.5536 9626.0793 C -5905.0776 10639.515 -5527.0776 11623.326 -5040.7296 12557.59 C -4653.4315 13301.582 -4200.7449 14006.093 -3690.5027 14663.511 C -3436.408 14219.683 -3317.5087 13746.456 -3303.9346 13367.649 C -3587.0743 12952.765 -3846.5166 12520.336 -4080.2766 12072.404 C -4239.7731 11766.776 -4386.719 11455.368 -4520.8577 11139.023 C -4913.5801 10620.151 -5326.7997 9916.8535 -5650.3799 8691.4818 C -5853.5902 7921.9409 -5819.5689 7106.3516 -5545.4553 6352.4391 C -5571.9729 5079.6426 -5411.7717 3813.0334 -5072.5053 2592.451 C -5616.9926 3101.7884 -6094.7869 3673.8917 -6509.5823 4285.9027 C -6604.2374 5023.4158 -6640.6371 5769.3473 -6617.5358 6516.838 C -6585.0003 7569.5948 -6434.0296 8612.6439 -6169.5536 9626.0793 z M -4390.6829 4686.2842 C -4050.2452 4390.2999 -3646.895 4133.1459 -3180.3067 3928.976 C -3027.4687 3169.4834 -2792.6916 2422.4712 -2475.7356 1702.0019 C -2331.5487 1374.252 -2171.3061 1054.527 -1996.043 743.83256 C -2546.3735 928.38018 -3059.0553 1164.0814 -3535.3796 1442.4697 C -3972.5893 2480.5758 -4259.8316 3572.8065 -4390.6829 4686.2842 z M -1990.6315 3561.808 C -1596.449 3490.4758 -1220.8448 3477.2399 -858.20474 3514.3355 C -762.98785 3204.5763 -650.0593 2898.8933 -519.43505 2598.8948 C -139.37036 1726.018 382.17993 923.10994 1015.4064 221.07956 C 529.02066 227.87714 30.943537 277.3708 -481.64154 367.55327 C -880.05392 923.02607 -1221.6827 1520.4773 -1497.5752 2150.4868 C -1699.0229 2610.4993 -1863.3805 3082.4142 -1990.6315 3561.808 z M 190.28054 3766.5245 C 520.90119 3891.5653 844.7018 4056.3881 1166.6187 4253.9333 C 1240.6986 3997.074 1330.7469 3743.8543 1436.8859 3495.8646 C 1921.6843 2363.1514 2721.0985 1383.9256 3722.4345 675.57313 C 3298.4287 519.35044 2868.7936 404.45482 2431.2575 329.17297 C 1588.1079 1077.2576 908.82875 2006.0065 458.7254 3047.3797 C 356.74596 3283.3225 267.26264 3523.364 190.28054 3766.5245 z M 2107.7303 4918.7385 C 2424.7901 5168.721 2744.7722 5443.6924 3072.5859 5737.0536 C 3107.9 5278.7689 3214.6942 4824.3799 3393.1865 4392.7574 C 3782.639 3450.9992 4492.2982 2661.5347 5383.7243 2168.5631 C 5564.0855 2068.8207 5750.0781 1982.0531 5940.2146 1908.3418 C 5589.9758 1645.532 5238.5418 1415.0154 4884.642 1215.6454 C 3783.2841 1818.5894 2903.5894 2786.962 2415.026 3944.2725 C 2281.4743 4260.6302 2179.1099 4587.0794 2107.7303 4918.7385 z M 4210.6626 6783.3351 C 4221.3073 6793.225 4232.0261 6803.0799 4242.695 6812.9898 C 5182.3486 7666.1522 6193.926 8672.9167 7512.695 9283.1355 C 7955.3719 9248.3474 8390.2878 9117.8586 8779.7567 8891.9925 C 9089.9477 8712.1024 9362.2355 8474.5745 9585.8458 8197.5678 L 8790.4643 7473.9474 C 8657.489 7652.0297 8491.0733 7808.799 8294.648 7931.5159 C 7339.1151 8528.4859 6099.1159 8164.0437 5524.6071 7220.9412 C 5173.1922 6644.0653 5114.144 5920.8489 5349.564 5289.63 C 5536.4287 4788.5998 5895.3018 4363.4316 6354.0187 4089.496 C 6847.4435 3794.8335 7433.5245 3689.0279 7995.8717 3773.1569 C 7785.479 3575.9006 7589.1763 3386.0556 7412.8307 3209.303 C 7251.3144 3045.1575 7089.9477 2888.2198 6928.6611 2738.3727 C 6559.2389 2810.3679 6200.4451 2940.6411 5868.833 3129.0397 C 5193.7999 3512.546 4659.6545 4119.8533 4371.4239 4841.222 C 4124.6253 5458.8968 4071.4008 6140.5742 4210.6626 6783.3351 z M 8790.4643 7473.9474 C 9206.6447 6916.5934 9288.8413 6146.1853 8886.3003 5522.8841 C 8448.8361 4845.5072 7526.4024 4585.5353 6839.1477 5050.0496 C 6292.9115 5419.2497 6085.185 6182.0366 6485.1371 6735.7345 C 6785.2581 7151.2253 7390.4852 7307.5849 7809.442 6970.9826 C 7884.8554 6910.3932 7947.3401 6833.9829 7994.0491 6749.5299 L 7445.6105 6250.6251 C 7366.7985 6290.4335 7297.8279 6205.3842 7293.1399 6133.6596 C 7290.2809 6089.9178 7302.0327 6048.0351 7324.3333 6010.506 C 7351.0781 5965.4981 7392.6691 5928.4909 7439.0777 5904.802 C 7603.2816 5820.9858 7801.9157 5881.7603 7925.8472 6008.0704 C 8128.8106 6214.9294 8124.162 6514.2769 7994.0491 6749.5299 L 8790.4643 7473.9474 z M 9585.8458 8197.5678 L 10381.734 8921.5483 C 10640.988 8610.7237 10854.986 8261.9278 11008.877 7884.2706 C 11193.29 7431.7121 11287.826 6948.9153 11292.826 6466.0176 C 10924.191 6220.388 10511.903 5914.5099 10088.282 5579.2048 C 10280.163 6180.2021 10261.459 6842.3054 10030.737 7435.8627 C 9923.1651 7712.6038 9770.8731 7968.3575 9585.8458 8197.5678 z M 10381.734 8921.5483 C 10091.846 9269.1017 9744.9537 9568.8919 9353.5353 9801.3953 C 9883.6135 9860.4497 10457.258 9852.1497 11082.725 9757.1871 C 11115.431 9720.8697 11144.566 9681.4973 11176.215 9644.2539 L 10381.734 8921.5483 z M 11176.215 9644.2539 L 11259.65 9720.1804 C 11491.815 9679.6457 11725.708 9636.2108 11972.337 9571.084 C 12189.727 9513.6782 12425.753 9447.427 12673.43 9374.3411 C 12781.191 9182.5101 12878.712 8984.578 12965.198 8781.2405 C 13196.976 8236.3072 13344.528 7663.9264 13408.099 7084.5949 C 13034.77 7128.3067 12683.675 7123.0756 12375.862 7036.71 C 12361.823 7033.0622 12347.447 7029.0087 12332.729 7024.5571 C 12278.401 7470.8911 12163.206 7911.6056 11987.038 8332.7556 C 11786.854 8811.3179 11509.694 9251.8384 11176.215 9644.2539 z M 14063.486 8932.1153 C 14500.909 8783.235 14935.712 8625.8931 15336.802 8469.2678 C 15500.371 7835.2708 15586.552 7186.1539 15595.529 6536.8466 C 15241.561 6642.577 14872.957 6757.8814 14506.357 6857.2248 C 14463.559 7562.0849 14316.089 8262.4206 14063.486 8932.1153 z M 16546.887 7941.5401 C 16587.396 7920.9474 16626.456 7900.5926 16663.959 7880.4968 C 16938.836 7638.5251 17027.509 7332.8529 17063.384 7041.0707 C 16964.332 6784.8051 16842.2 6639.2126 16671.178 6543.3862 C 16665.142 7010.9684 16623.717 7478.4716 16546.887 7941.5401 z M 20958.587 7136.1189 C 21257.099 7419.2073 21608.547 7641.1535 21989.703 7785.1416 C 22045.924 7184.7718 22065.109 6580.0048 22046.655 5974.2447 C 22009.302 4748.084 21817.181 3534.6205 21477.606 2362.8916 C 21119.946 2565.4379 20815.448 2836.8741 20576.92 3155.1481 C 20808.004 4082.3173 20940.664 5034.2921 20970.802 5994.6771 C 20982.766 6375.9173 20978.643 6756.6882 20958.587 7136.1189 z M 23052.624 7972.6031 C 23274.199 7968.9879 23498.354 7939.0294 23721.636 7880.0679 C 23871.285 7840.5505 24015.825 7789.279 24154.508 7727.4824 C 24201.003 7132.0787 24215.782 6533.2406 24198.402 5933.5339 C 24160.159 4613.9908 23965.745 3307.0772 23622.08 2040.2674 C 23257.444 1962.9806 22875.562 1949.8842 22495.457 2009.6513 C 22871.037 3288.495 23082.777 4614.1867 23122.528 5953.8893 C 23142.57 6629.3515 23119.034 7303.6045 23052.624 7972.6031 z M 25276.073 6859.859 C 25879.888 6116.0933 26150.021 5102.2265 25896.931 4143.7937 C 25730.008 3511.6718 25357.712 2987.7163 24869.873 2612.9749 C 25106.691 3694.9236 25242.685 4799.8582 25274.275 5913.1785 C 25283.238 6229.0744 25283.829 6544.7657 25276.073 6859.859 z "
       transform="matrix(-0.00165772,0.00627765,-0.00627763,-0.00165772,-5118.7577,-10001.859)" />
  </g>
</svg>
`;function H(e){let t=new DOMParser().parseFromString(e,`image/svg+xml`);if(W(t)===`Error`)return cn();let n=t.querySelector(`svg`);return n===null?cn():n}function en(e){return Object.fromEntries(e)}function tn(e){return e>127?!1:e>=48&&e<=57}function nn(e){return e>127?!1:e>=65&&e<=90||e>=97&&e<=122}function rn(e){return nn(e)||tn(e)}function an(e){if(e.constructor.name!==`String`)return!1;let t=e[Symbol.iterator](),n=t.next();for(;!n.done&&rn(n.value.charCodeAt(0));)n=t.next();return n.done??!1}function on(e){if(e.constructor.name!==`String`)return!1;let t=e[Symbol.iterator](),n=t.next();for(;!n.done&&n.value.charCodeAt(0)<=127;)n=t.next();return n.done??!1}function U(e){return e===void 0?``:e.constructor.name==`String`?` `+e:` `+e.join(` `)}function W(e){return e.constructor.name}function sn(e,t){return e.constructor.name===t}var cn=()=>Yt().style({width:`20px`,height:`20px`}).parse($t);H(`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M465.94 119.76l-73.7-73.7A47.68 47.68 0 00358.3 32H96a64 64 0 00-64 64v320a64 64 0 0064 64h320a64 64 0 0064-64V153.7a47.68 47.68 0 00-14.06-33.94zM120 112h176a8 8 0 018 8v48a8 8 0 01-8 8H120a8 8 0 01-8-8v-48a8 8 0 018-8zm139.75 319.91a80 80 0 1176.16-76.16 80.06 80.06 0 01-76.16 76.16z"/><circle cx="256" cy="352" r="48"/></svg>`),H(`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M480 128a64 64 0 00-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4zM32 416a64 64 0 0064 64h320a64 64 0 0064-64V179a3 3 0 00-3-3H35a3 3 0 00-3 3zm344-208a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24z"/></svg>`),H(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M73.8 141.9c-15.2 6-25.8 21.8-25.8 39.5v256c0 23.5 18.5 42.7 41.6 42.7h332.8c23.1 0 41.6-19.2 41.6-42.7v-256c0-23.7-18.5-42.7-41.6-42.7H179l171.8-71.3L336.7 32 73.8 141.9zM160 438c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64zm256-171.3h-32v-46.2h-44.8v46.2H96v-85.3h320v85.3z"/></svg>`),H(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M434 461.5l-26.6-69.1c-2.1-5.1-7-8.4-12.4-8.4-4.5 0-8.6 2.2-11.1 5.9s-3 8.4-1.4 12.5l26 69.1c2.1 5.1 7 8.5 12.5 8.5h.5c4.5 0 8.7-2.2 11.2-5.9 2.5-3.8 3-8.5 1.3-12.6zM117.6 384c-5.5 0-10.4 3.3-12.4 8.4l-26.6 69.1c-1.7 4.2-1.2 8.9 1.3 12.6 2.5 3.7 6.7 5.9 11.2 5.9h.5c5.5 0 10.4-3.3 12.5-8.5l26-69.1c1.7-4.1 1.2-8.8-1.4-12.5-2.4-3.7-6.6-5.9-11.1-5.9zM256.6 384h-1.1c-7.4 0-13.4 6-13.4 13.4v36.1c0 7.4 6 14.4 13.4 14.4h1.1c7.4 0 13.4-7 13.4-14.4v-36.1c0-7.4-6-13.4-13.4-13.4z"/><g><path d="M424 128H88c-4.4 0-8 3.6-8 8v176c0 4.4 3.6 8 8 8h336c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8z"/><path d="M448 80H63.9C46.3 80 32 94.3 32 111.9v224.2c0 17.6 14.3 31.9 31.9 31.9H448c17.7 0 32-14.3 32-32V112c0-17.7-14.3-32-32-32zm4 244c0 8.8-7.2 16-16 16H76c-8.8 0-16-7.2-16-16V124c0-8.8 7.2-16 16-16h364.6c3 0 5.9 1.2 8 3.3 2.1 2.1 3.3 5 3.3 8V324z"/></g><path d="M256 32c-13.4-.2-24.4 12.2-24.4 25.6h48.7c.1-13.4-10.9-25.8-24.3-25.6z"/></svg>`);var[ln,un]=C({name:void 0,address:void 0,access_token:void 0,config:void 0,pfp:void 0});function G(e){return{ctx:e??fn().user,inner(){return this.ctx()},is_logged_in(){let e=this.ctx();return e.name===void 0?!1:sn(e.name,`String`)?e.name.length!==0:!0},is_logged_out(){return this.ctx().name===``},is_non_init(){return this.ctx().name===void 0},access_token(){return this.ctx().access_token},address(){return this.ctx().address},name(){return this.ctx().name},config(){return this.ctx().config},pfp(){return this.ctx().pfp}}}var dn=k({user:ln,re_user:un});function fn(){return A(dn)}var pn={Box:`ER6dWq_Box`,CheckBox:`ER6dWq_CheckBox`,Content:`ER6dWq_Content`,Postman:`ER6dWq_Postman`,Text:`ER6dWq_Text`,TickMark:`ER6dWq_TickMark`},mn=I(`<input data-type=bool type=hidden>`),hn=I(`<span>`),gn=I(`<legend>`),_n=I(`<div><div style=background:transparent><div>`),vn={width:.6,height:.6,state:!1,tick:``,accent:`var(--blue)`},yn=e=>{let t=Ve(vn,e),n=()=>t.state,r=()=>t.accent,i=()=>t.tick,a=()=>t.width,o=()=>t.height,s=()=>t.legend,c=()=>t.name,[l,u]=C(n()),d=()=>u(e=>!l());return(()=>{var e=_n(),t=e.firstChild,n=t.firstChild;return z(e,`click`,d),V(e,N(We,{get when(){return c()!==void 0},get children(){var e=mn();return w(t=>{var n=pn.Postman,r=c();return n!==t.e&&R(e,t.e=n),r!==t.t&&L(e,`name`,t.t=r),t},{e:void 0,t:void 0}),w(()=>e.value=l()),e}}),t),V(n,N(We,{get when(){return i()!==``},get children(){var e=hn();return V(e,i),w(()=>R(e,pn.TickMark)),e}})),V(e,N(We,{get when(){return s()!==void 0},get children(){var e=gn();return V(e,s),w(t=>{var n=pn.Text,i=r();return n!==t.e&&R(e,t.e=n),i!==t.t&&B(e,`color`,t.t=i),t},{e:void 0,t:void 0}),e}}),null),w(i=>{var s=pn.CheckBox,c=pn.Box,u=`0.11em solid ${r()}`,d=`${a()+.19}rem`,f=`${o()+.19}rem`,p=l(),m=pn.Content,h=r(),g=`${a()}rem`,_=`${o()}rem`;return s!==i.e&&R(e,i.e=s),c!==i.t&&R(t,i.t=c),u!==i.a&&B(t,`border`,i.a=u),d!==i.o&&B(t,`width`,i.o=d),f!==i.i&&B(t,`height`,i.i=f),p!==i.n&&L(t,`box-state`,i.n=p),m!==i.s&&R(n,i.s=m),h!==i.h&&B(n,`background`,i.h=h),g!==i.r&&B(n,`width`,i.r=g),_!==i.d&&B(n,`height`,i.d=_),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0}),e})()},bn={Logo:`Pvekua_Logo`},xn=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="464.17731mm"
   height="280.61356mm"
   viewBox="0 0 464.1773 280.61356"
   version="1.1"
   id="svg1"
   sodipodi:docname="capra.svg"
   inkscape:version="1.4.3 (0d15f75042, 2025-12-25)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:zoom="0.31296124"
     inkscape:cx="659.82611"
     inkscape:cy="912.25353"
     inkscape:window-width="1920"
     inkscape:window-height="1080"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="g38" />
  <defs
     id="defs1">
    <rect
       x="1019.9519"
       y="653.23358"
       width="418.7486"
       height="360.73621"
       id="rect11" />
    <rect
       x="942.18433"
       y="-101.69609"
       width="442.67709"
       height="367.90054"
       id="rect10" />
    <rect
       x="376.87372"
       y="-110.66927"
       width="337.98993"
       height="314.06143"
       id="rect9" />
    <rect
       x="92.7229"
       y="388.83798"
       width="305.08826"
       height="264.3956"
       id="rect8" />
    <rect
       x="119.64245"
       y="137.58882"
       width="212.36536"
       height="515.64478"
       id="rect7" />
    <rect
       x="96.141991"
       y="155.46364"
       width="303.37881"
       height="495.22858"
       id="rect6" />
    <rect
       x="252.7411"
       y="314.56265"
       width="284.35822"
       height="233.03165"
       id="rect5" />
    <rect
       x="1628.5885"
       y="604.05829"
       width="76.987816"
       height="19.740465"
       id="rect4" />
    <rect
       x="1246.3828"
       y="433.76355"
       width="158.66028"
       height="109.79328"
       id="rect3" />
    <rect
       x="1103.3226"
       y="416.31293"
       width="286.121"
       height="181.53938"
       id="rect1" />
    <linearGradient
       id="linearGradient2">
      <stop
         style="stop-color:#f27e49;stop-opacity:1;"
         offset="0"
         id="stop1" />
      <stop
         style="stop-color:#46394e;stop-opacity:1;"
         offset="1"
         id="stop2" />
    </linearGradient>
    <linearGradient
       id="linearGradient38">
      <stop
         style="stop-color:#f23449;stop-opacity:1;"
         offset="0"
         id="stop38" />
      <stop
         style="stop-color:#46394e;stop-opacity:1;"
         offset="1"
         id="stop39" />
    </linearGradient>
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient39"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient6"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient7"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient8"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient9"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient10"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient11"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient12"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
    <linearGradient
       xlink:href="#linearGradient38"
       id="linearGradient13"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
    <linearGradient
       xlink:href="#linearGradient2"
       id="linearGradient14"
       gradientUnits="userSpaceOnUse"
       x1="101.4521"
       y1="99.864105"
       x2="109.87026"
       y2="160.49869" />
  </defs>
  <g
     id="layer1"
     transform="matrix(1.5873876,0,0,1.5873876,61.568369,-109.04508)">
    <g
       id="g38"
       style="fill:url(#linearGradient39)">
      <text
         xml:space="preserve"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:7.11162px;line-height:6.6;font-family:Dimnah;-inkscape-font-specification:Dimnah;text-align:center;writing-mode:lr-tb;direction:ltr;text-anchor:middle;fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.00983;stroke-linecap:round;stroke-linejoin:bevel;stroke-opacity:1"
         x="35.375378"
         y="128.26299"
         id="text2"><tspan
           sodipodi:role="line"
           id="tspan2"
           style="stroke-width:1.00984"
           x="35.375378"
           y="128.26299" /></text>
      <circle
         id="path10"
         style="fill:#c0006f;stroke:#000000;stroke-width:0.166678"
         cx="146.27028"
         cy="132.131"
         r="0" />
      <circle
         id="path11"
         style="fill:#c0006f;stroke:#000000;stroke-width:0.166678"
         cx="148.69461"
         cy="168.09171"
         r="0" />
      <circle
         id="path12"
         style="fill:#ca3c70;stroke:#000000;stroke-width:0.166678"
         cx="177.3519"
         cy="145.28326"
         r="0" />
      <circle
         id="path15"
         style="fill:#ca3c70;stroke:#000000;stroke-width:0.166678"
         cx="202.97227"
         cy="179.62547"
         r="0" />
      <text
         xml:space="preserve"
         transform="matrix(0.16667847,0,0,0.16667847,-38.785971,68.694678)"
         id="text4"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:18.6667px;line-height:1.3;font-family:carlito;-inkscape-font-specification:carlito;text-align:center;writing-mode:lr-tb;direction:ltr;white-space:pre;shape-inside:url(#rect4);display:inline;fill:#ab1243;fill-opacity:1;fill-rule:evenodd;stroke-width:15.1181;stroke-linecap:round;stroke-linejoin:bevel;stroke-dasharray:none" />
      <path
         id="text1"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:18.6667px;line-height:1.3;font-family:carlito;-inkscape-font-specification:carlito;text-align:center;writing-mode:lr-tb;direction:ltr;text-anchor:middle;white-space:pre;shape-inside:url(#rect1);display:inline;fill:#c35e76;fill-opacity:1;fill-rule:evenodd;stroke-width:47.6542;stroke-linecap:round;stroke-linejoin:bevel;stroke-dasharray:none"
         d="m 163.47523,129.02882 c -2.73349,0 -5.07032,0.8229 -7.01003,2.4689 -1.9402,1.64599 -3.57128,3.89465 -4.89377,6.74573 l -0.52918,-6.34855 c -0.0591,-0.76423 -0.26459,-1.30832 -0.61772,-1.63164 -0.32312,-0.3233 -0.89633,-0.48459 -1.71912,-0.48459 h -4.45311 v 43.11858 h 7.7598 v -27.24664 c 0.52869,-1.44026 1.1019,-2.71883 1.71913,-3.83574 0.61722,-1.1169 1.32297,-2.05787 2.11626,-2.82206 0.82328,-0.79362 1.73461,-1.38139 2.73397,-1.76347 0.53644,-0.21474 1.11304,-0.37344 1.72977,-0.47614 l -0.062,-0.10834 c 2.332,-2.24541 4.83622,-3.91477 7.51358,-5.00869 0.0977,-0.0407 0.19592,-0.0807 0.29459,-0.11985 l 0.13489,-1.25294 c -0.64673,-0.44085 -1.36649,-0.74931 -2.16027,-0.92568 -0.7933,-0.20578 -1.64609,-0.30876 -2.55694,-0.30876 z m 4.58226,2.48738 -0.48178,4.47868 c -0.0885,0.73481 -0.49969,1.10255 -1.23445,1.10255 -0.41165,0 -0.99985,-0.0738 -1.76411,-0.22083 -0.73478,-0.17635 -1.55759,-0.26425 -2.46891,-0.26425 -0.63269,0 -1.23154,0.0468 -1.79701,0.14087 l 1.32008,2.30951 c 0.23025,0.40304 0.53208,0.73457 0.90647,0.99365 0.37441,0.25913 0.82088,0.38819 1.33894,0.38819 0.66221,0 1.30942,-0.2303 1.9426,-0.6909 0.66222,-0.46059 1.44004,-0.96423 2.33201,-1.51122 0.89246,-0.54694 1.94357,-1.05059 3.15239,-1.51119 1.23782,-0.46059 2.74897,-0.69094 4.53388,-0.69094 2.67688,0 4.70705,0.8347 6.08856,2.5044 1.4105,1.64086 2.11577,4.10241 2.11577,7.38414 v 3.23825 c -4.77865,0.11509 -8.80897,0.56159 -12.09051,1.33882 -3.28203,0.74851 -5.94442,1.72746 -7.98812,2.93651 -2.04418,1.20905 -3.52678,2.59046 -4.44777,4.14497 -0.89247,1.52569 -1.33894,3.12371 -1.33894,4.79341 0,1.89994 0.30233,3.55512 0.90649,4.96574 0.63367,1.38179 1.48308,2.5475 2.54823,3.49747 1.09368,0.92119 2.34601,1.61213 3.75654,2.07274 1.43954,0.43181 2.9797,0.64793 4.62047,0.64793 1.58321,0 3.03727,-0.14426 4.36119,-0.43211 1.32442,-0.25907 2.56226,-0.662 3.7135,-1.20894 1.15174,-0.547 2.24542,-1.20906 3.28154,-1.98634 1.06515,-0.80602 2.1448,-1.71261 3.23897,-2.72015 l 0.94955,3.92915 c 0.1441,0.71967 0.41793,1.19497 0.82086,1.42527 0.40294,0.23029 0.97856,0.34519 1.72688,0.34519 h 3.36812 v -26.98791 c 0,-2.38932 -0.33086,-4.56285 -0.99307,-6.52042 -0.63319,-1.95751 -1.56869,-3.64157 -2.80653,-5.05214 -1.23784,-1.41061 -2.77799,-2.49026 -4.62048,-3.23872 -1.84247,-0.77728 -3.94423,-1.16552 -6.30476,-1.16552 -3.16303,0 -6.05808,0.52125 -8.6866,1.56415 z m 15.98444,22.40081 v 8.72254 c -0.83489,0.86363 -1.68431,1.65527 -2.54774,2.375 -0.8349,0.69088 -1.72735,1.28107 -2.67738,1.77044 -0.95001,0.46061 -1.95712,0.8205 -3.02226,1.07956 -1.06515,0.25913 -2.2309,0.38868 -3.49776,0.38868 -0.94953,0 -1.842,-0.11494 -2.6769,-0.34519 -0.83489,-0.25908 -1.55467,-0.63367 -2.1593,-1.12305 -0.60466,-0.51815 -1.09417,-1.16555 -1.46809,-1.94285 -0.34537,-0.806 -0.51806,-1.75612 -0.51806,-2.85 0,-1.1515 0.33086,-2.18766 0.99307,-3.10886 0.66221,-0.94998 1.72686,-1.7705 3.19544,-2.4614 1.49661,-0.69089 3.42519,-1.23806 5.78574,-1.6411 2.36053,-0.43182 5.22511,-0.71983 8.59324,-0.86377 z" />
      <text
         xml:space="preserve"
         transform="matrix(0.46666343,0,0,0.46666343,-102.77047,-56.706672)"
         id="text3"
         style="font-size:192px;line-height:1.3;font-family:crimson;-inkscape-font-specification:crimson;text-align:center;writing-mode:lr-tb;direction:ltr;white-space:pre;shape-inside:url(#rect5);shape-padding:0;display:inline;fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:0.428605;stroke-linecap:round;stroke-linejoin:round;paint-order:stroke markers fill"><tspan
           x="263.97589"
           y="482.4875"
           id="tspan3">cap</tspan></text>
    </g>
  </g>
</svg>
`,Sn=I(`<span>`),Cn=e=>{let t=()=>e.width??280,n=()=>e.height??120,r=H(xn);return r.classList.add(`capra_svg`),wn(r,t(),n()),(()=>{var e=Sn();return V(e,r),w(()=>R(e,bn.Logo)),e})()};function wn(e,t,n){let r=e.style;r.setProperty(`width`,t+`px`),r.setProperty(`height`,n+`px`)}var Tn={Splash:`yllh9a_Splash`},En=I(`<div>`),Dn=()=>(()=>{var e=En();return V(e,N(Cn,{width:340,height:160})),w(()=>R(e,Tn.Splash)),e})(),On={InputField:`AOGeNW_InputField`,InputLegend:`AOGeNW_InputLegend`,TextField:`AOGeNW_TextField`},kn=I(`<div><legend></legend><input>`);function An(e){return async t=>{if(t.length===0)return!0;let n=await fetch(`/auth/field?name=${e()}&value=${t}`);return n.ok?await n.text()!==`false`:!1}}var jn=e=>{let t=()=>e.ty??`str`,n=()=>e.name,r=()=>e.type??`text`,i=()=>e.value??null,a=()=>e.mandatory??!1,o=()=>s().blank_mandatory?()=>e.legend+Mn:s().bad_value?()=>e.legend+Nn:()=>e.legend,[s,c]=C({lights_up:!1,blank_mandatory:!1,bad_value:!1}),[l,u]=C(i),[d]=ie(l,An(n),{initialValue:!0}),f=e=>c(t=>{let n=e.target;if(n.value===l())return t;if(n.value.length===0)return u(``),t;u(n.value);let r=l().length===0;return console.log(d()),{lights_up:!r,blank_mandatory:a()&&r,bad_value:!r&&!d()}}),p=()=>c(e=>({lights_up:!0,blank_mandatory:!1,bad_value:!1})),m=e=>c(t=>{let n=e.target;u(n.value);let r=l().length===0;return{lights_up:!r,blank_mandatory:a()&&r,bad_value:!r&&!d()}}),h=e=>c(t=>(t.light_up||e.target.nextElementSibling.focus(),{lights_up:!0,blank_mandatory:!1,bad_value:!1}));return(()=>{var e=kn(),c=e.firstChild,l=c.nextSibling;return z(c,`click`,h),V(c,o),z(l,`input`,f),z(l,`blur`,m),z(l,`focus`,p),w(i=>{var o=On.TextField,u=s().lights_up,d=s().blank_mandatory,f=s().bad_value,p=On.InputLegend,m=r(),h=t(),g=`${On.InputField}${a()?` mandatory`:``}`,_=n();return o!==i.e&&R(e,i.e=o),u!==i.t&&L(e,`lights-up`,i.t=u),d!==i.a&&L(e,`blank-mandatory`,i.a=d),f!==i.o&&L(e,`bad-value`,i.o=f),p!==i.i&&R(c,i.i=p),m!==i.n&&L(l,`type`,i.n=m),h!==i.s&&L(l,`data-type`,i.s=h),g!==i.h&&R(l,i.h=g),_!==i.r&&L(l,`name`,i.r=_),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0}),w(()=>l.value=i()),e})()},Mn=` (this field is mandatory)`,Nn=` (this value is already taken)`,Pn={PasswordField:`l02iAW_PasswordField`,PswSwitch:`l02iAW_PswSwitch`},Fn=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 24 24"
   width="24"
   height="24"
   color="#595858"
   fill="none"
   version="1.1"
   id="svg5"
   sodipodi:docname="nosee.svg"
   inkscape:version="1.4.3 (0d15f75042, 2025-12-25)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs5" />
  <sodipodi:namedview
     id="namedview5"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:zoom="26.997662"
     inkscape:cx="10.59351"
     inkscape:cy="10.908352"
     inkscape:window-width="1920"
     inkscape:window-height="1080"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg5" />
  <path
     d="M19 19.1414C17.1962 20.9097 14.7255 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C14.7974 2 17.3265 3.14864 19.1414 5"
     stroke="#595858"
     stroke-width="1.5"
     stroke-linecap="round"
     stroke-linejoin="round"
     id="path1"
     style="stroke:#242423;stroke-opacity:1" />
  <path
     d="M8 15C8.91212 16.2144 10.3643 17 12 17C12.7111 17 13.3875 16.8515 14 16.5839"
     stroke="#595858"
     stroke-width="1.5"
     stroke-linecap="round"
     stroke-linejoin="round"
     id="path2"
     style="stroke:#242423;stroke-opacity:1" />
  <path
     d="M8.00897 9L8 9"
     stroke="#595858"
     stroke-width="1.5"
     stroke-linecap="round"
     stroke-linejoin="round"
     id="path3"
     style="stroke:#242423;stroke-opacity:1" />
  <path
     d="M22 15L22 15M22 18L22 18M22 21L22 21"
     stroke="#595858"
     stroke-width="1.5"
     stroke-linecap="round"
     stroke-linejoin="round"
     id="path4"
     style="stroke:#242423;stroke-opacity:1" />
  <circle
     cx="16"
     cy="10"
     r="3"
     stroke="#595858"
     stroke-width="1.5"
     stroke-linecap="round"
     stroke-linejoin="round"
     id="circle4"
     style="stroke:#242423;stroke-opacity:1" />
  <path
     d="M22 12C21.7927 11.6041 21.689 11.4062 21.552 11.2328C21.2015 10.7894 20.6784 10.4407 20.0558 10.2354C19.8124 10.1551 19.5416 10.1034 19 10"
     stroke="#595858"
     stroke-width="1.5"
     stroke-linecap="round"
     stroke-linejoin="round"
     id="path5"
     style="stroke:#242423;stroke-opacity:1" />
  <path
     style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#242423;stroke-width:1.03;stroke-linecap:round;stroke-linejoin:bevel;stroke-dasharray:none;stroke-opacity:1"
     d="M 1.6692014,22.06846 C 3.877351,20.002974 20.116505,4.4879105 22.227815,2.3166395"
     id="path8"
     sodipodi:nodetypes="cc" />
</svg>
`,In=I(`<div><button type=button>`),Ln=e=>{let t=()=>e.name,n=()=>e.mandatory,r=H(Fn),[i,a]=C(!1),o=e=>a(t=>{let n=e.currentTarget;console.log(n.firstElementChild.querySelector(`path#path8`));let r=n.firstElementChild.querySelector(`path#path8`).style;return t?r.removeProperty(`stroke`):r.setProperty(`stroke`,`none`),!t}),s=()=>e.legend;return(()=>{var e=In(),a=e.firstChild;return V(e,N(jn,{get type(){return i()?`text`:`password`},get name(){return t()},get legend(){return s()??`Password`},get mandatory(){return n()}}),a),z(a,`click`,o),V(a,r),w(t=>{var n=Pn.PasswordField,r=Pn.PswSwitch;return n!==t.e&&R(e,t.e=n),r!==t.t&&R(a,t.t=r),t},{e:void 0,t:void 0}),e})()},Rn={TextLine:`_72Q0HW_TextLine`},zn=I(`<span>`),Bn=e=>{let t=()=>e.children,n=()=>e.cls;return(()=>{var e=zn();return V(e,t),w(()=>R(e,` ${Rn.TextLine} ${U(n())}`)),e})()},Vn={Button:`s19keG_Button`,Catalyst:`s19keG_Catalyst`},Hn=I(`<button>`),Un=I(`<a>`),K=e=>{let t=()=>e.children,n=()=>e.link,r=()=>e.class,i=()=>e.call,a=()=>e.call_on_click??!1,o=()=>e.attrs,s=()=>e.style,c=Wn(t(),r(),i(),a(),n());return Gn(c,o()),Kn(c,s()),c};function Wn(e,t,n,r,i){return r?i===void 0?(()=>{var r=Hn();return z(r,`click`,n),V(r,e),w(()=>R(r,`${Vn.Button}${U(t)}`)),r})():(()=>{var r=Un();return z(r,`click`,n),L(r,`href`,i),V(r,e),w(()=>R(r,`${Vn.Catalyst}${U(t)}`)),r})():i===void 0?(()=>{var r=Hn();return z(r,`mousedown`,n),V(r,e),w(()=>R(r,`${Vn.Button}${U(t)}`)),r})():(()=>{var r=Un();return z(r,`mousedown`,n),L(r,`href`,i),V(r,e),w(()=>R(r,`${Vn.Catalyst}${U(t)}`)),r})()}function Gn(e,t){if(t!==void 0)for(let[n,r]of Object.entries(t))e.setAttribute(n,r)}function Kn(e,t){if(t===void 0)return;let n=e.style;for(let[e,r]of Object.entries(t))n.setProperty(e,r)}var qn={Separator:`n6GNJW_Separator`},Jn=I(`<span>`),Yn=()=>{let[e,t]=C(!1);return document.body.addEventListener(`mousemove`,e=>t(t=>{let n=document.querySelector(`.${qn.Separator}`);if(n==null)return t;let r=n.parentElement.getBoundingClientRect(),i=e.clientX,a=e.clientY;return i>=r.left&&i<=r.right&&a<=r.bottom&&a>=r.top})),(()=>{var t=Jn();return w(n=>{var r=qn.Separator,i=e();return r!==n.e&&R(t,n.e=r),i!==n.t&&L(t,`active`,n.t=i),n},{e:void 0,t:void 0}),t})()},Xn={WildContent:`qXYRSW_WildContent`,WildText:`qXYRSW_WildText`},Zn=I(`<div><span>`),Qn=e=>{let t=()=>e.text,n=()=>e.class;return(()=>{var e=Zn(),r=e.firstChild;return V(r,t),w(t=>{var i=`${Xn.WildText} ${U(n())}`,a=Xn.WildContent;return i!==t.e&&R(e,t.e=i),a!==t.t&&R(r,t.t=a),t},{e:void 0,t:void 0}),e})()},q={Form:`xPBFqq_Form`,FormTitle:`xPBFqq_FormTitle`,Note:`xPBFqq_Note`,SubmitButton:`xPBFqq_SubmitButton`,SwapButton:`xPBFqq_SwapButton`},$n=I(`<form>`),er=e=>{let t=()=>e.action,n=()=>e.method,r=()=>e.children,i=()=>e.target,a=()=>e.submit,o=()=>e.class;return(()=>{var e=$n();return z(e,`submit`,a()),V(e,r),w(r=>{var a=`${q.Form}${U(o())}`,s=t(),c=n(),l=i()??`_self`;return a!==r.e&&R(e,r.e=a),s!==r.t&&L(e,`action`,r.t=s),c!==r.a&&L(e,`method`,r.a=c),l!==r.o&&L(e,`target`,r.o=l),r},{e:void 0,t:void 0,a:void 0,o:void 0}),e})()};function tr(e){return new Array(...e.querySelectorAll(`input`)).filter(e=>e.hasAttribute(`name`))}function nr(e){let t=e.map(e=>e.name);return t.length===new Set(...t).size?Error(`duplicate input field names are not allowed`):null}function rr(e){return e.some(e=>e.classList.contains(`mandatory`)&&e.value.length===0)?Error(`mandatory field is empty`):null}function ir(e,t){return e===`bool`?[`true`,`yes`,`1`,`on`].includes(t):[`int`,`uint`,`float`].includes(e)?Number(t):t}function ar(e){let t=new Map;return e.forEach(e=>{if(e.value.length>0){let n=e.getAttribute(`data-type`)??`str`;t.set(e.name,ir(n,e.value))}}),t}async function or(e){e.preventDefault();let t=e.target;if(t.tagName!==`FORM`){let e=Error(`submit event target is not a form`);return window.alert(e),e}let n=t.action,r=tr(t),i=nr(r);return i===null?(i=rr(r),i===null?{map:ar(r),path:n}:(r.filter(e=>e.classList.contains(`mandatory`)&&e.value.length===0).reverse().forEach(e=>e.focus()),i)):(console.error(i),i)}var sr={Dialog:`P6b2uW_Dialog`},cr=I(`<div>`),lr=e=>{let t=fe(()=>e.children),n=()=>e.width,r=()=>e.height,i=()=>e.left,a=()=>e.top,o=()=>e.center??!1,s=()=>e.class,c=()=>e.overtakes??!1,l={};return n()!==void 0&&(l.width=`${n()}em`),r()!==void 0&&(l.height=`${r()}em`),a()!==void 0&&(l.top=`${a()}%`),i()!==void 0&&(l.left=`${i()}%`),o()&&n()!==void 0&&r()!==void 0&&(l[`margin-left`]=`-${Math.floor(n()/2)}em`,l[`margin-top`]=`-${Math.floor(r()/2)}em`),(()=>{var e=cr();return V(e,t),w(t=>{var n=`${sr.Dialog}${U(s())}`,r=l,i=c();return n!==t.e&&R(e,t.e=n),t.t=et(e,r,t.t),i!==t.a&&L(e,`overtakes-content`,t.a=i),t},{e:void 0,t:void 0,a:void 0}),e})()},ur={Branch:`-jetwW_Branch`,BranchName:`-jetwW_BranchName`,Leaf:`-jetwW_Leaf`,Tree:`-jetwW_Tree`},dr=I(`<div>`),fr=e=>(e.transform??pr)(e.data,null,e.ident??`5px`);function pr(e,t,n){t??=(()=>{var e=dr();return B(e,`--ident`,n),w(()=>R(e,ur.Tree)),e})();for(let n of e)if(W(n)===`Object`){let e=Object.keys(n);for(let r of e){let e=(()=>{var e=dr();return V(e,N(K,{get class(){return`${ur.BranchName} ${ur.Leaf}`},children:r})),w(()=>R(e,ur.Branch)),e})();pr(n[r],e),t.appendChild(e)}}else t.appendChild(N(K,{get class(){return ur.Leaf},children:n})());return t}var mr={Transient:`S8oQoq_Transient`},hr=I(`<div>`),gr=e=>{let t=()=>e.children,n=()=>e.timer;return(()=>{var e=hr();return V(e,t),w(t=>{var r=mr.Transient,i=n();return r!==t.e&&R(e,t.e=r),i!==t.t&&L(e,`timer`,t.t=i),t},{e:void 0,t:void 0}),e})()},_r=new MutationObserver(()=>{document.querySelectorAll(`[timer]`).forEach(async e=>await vr(e))});async function vr(e){let t=e.getAttribute(`timer`);t=Number(t),await new Promise(n=>setTimeout(()=>e.remove(),t))}function yr(){_r.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:[`timer`]})}var br=I(`<span>color copied!`);N(gr,{timer:1500,get children(){return br()}});var J={Greetings:`rYAGPW_Greetings`,Home:`rYAGPW_Home`,Plugin:`rYAGPW_Plugin`,PluginDepict:`rYAGPW_PluginDepict`,Plugins:`rYAGPW_Plugins`,PluginText:`rYAGPW_PluginText`,PluginTitle:`rYAGPW_PluginTitle`,"shakin'":`rYAGPW_shakin'`},xr=I(`<div>`),Sr=I(`<span><span></span><span>`),Cr=()=>(()=>{var e=xr();return V(e,N(Tr,{})),w(()=>R(e,J.Home)),e})();async function wr(){let e=G().config().plugins;if(e===void 0)throw Error(`no plugins in user config`);return Object.entries(e).map(e=>({name:e[0],...e[1]}))}var Tr=()=>{let e=G(),[t]=ie(wr),[n,r]=C(0);return N(P,{get children(){return[N(F,{get when(){return e.is_logged_in()},get children(){var e=xr();return V(e,N(Ue,{get each(){return t()},children:e=>N(Dr,{get icon(){return e.icon},get root(){return e.root},get depict(){return e.depict},get name(){return e.name},get accent(){return e.accent},get rtt(){return n()},re_rtt:r})})),w(()=>R(e,J.Plugins)),e}}),N(F,{when:!0,get children(){return N(Qn,{get class(){return J.Greetings},text:`welcome`})}})]}})};function Er(e){e.preventDefault(),document.body=document.createElement(`body`),console.log(G().config())}var Dr=e=>{let t=()=>e.rtt,n=()=>e.re_rtt,r=()=>e.name,i=()=>e.depict,a=()=>e.icon,o=()=>e.accent,s=()=>n()(e=>Math.abs(1-e));return N(K,{get link(){return e.root??`/`},get class(){return`${J.Plugin} ${t()==0?J.RightRtt:J.LeftRtt}`},get style(){return{"--accent":o()}},"on:mouseenter":s,call:Er,call_on_click:!0,get children(){return[Ye(()=>a()),(()=>{var e=Sr(),t=e.firstChild,n=t.nextSibling;return V(t,r),V(n,i),w(r=>{var i=J.PluginText,a=J.PluginTitle,o=J.PluginDepict;return i!==r.e&&R(e,r.e=i),a!==r.t&&R(t,r.t=a),o!==r.a&&R(n,r.a=o),r},{e:void 0,t:void 0,a:void 0}),e})()]}})},Or={Auth:`a-whjW_Auth`},[kr,Ar]=C({}),jr=k({colors:kr,re_colors:Ar});function Mr(){return A(jr)}function Nr(e){return{ctx:e??Mr(),overwrite_:!1,name_:null,name(e){return this.name_=e,this},overwrite(e){return this.overwrite_=e,this},register(e){let{colors:t,re_colors:n}=this.ctx,r=this.name_,i=this.overwrite_??!1;if(r===null)throw Error(`cannot register new colorscheme without a name`);if(!i&&t()[r]!==void 0)throw Error(`a colorscheme with the same name already exists. enable the overwrite flag if you want to, well, overwrite it`);n(t=>(t[r]=e,structuredClone(t)))},refresh(e){let{colors:t,re_colors:n}=this.ctx,r=t()[e];if(r===void 0)throw Error(`no such colorscheme is registered`);Pr(r)},contains(e){return this.ctx.colors()[e]!==void 0},load(e){if(!this.contains(e))return null;let t=this.ctx.colors()[e];return Ir(t.selectors,t.props)},load_all(){return Object.entries(this.ctx.colors())},update(e,t){if(!this.contains(e))throw Error(`no such colorscheme`);this.ctx.re_colors(n=>(n[e]=t,structuredClone(n)))},update_iter(...e){e.forEach(([e,t])=>this.update(e,t))},clear(){return this.name_=null,this.overwrite_=!1,this}}}function Pr(e){let t=Object.entries(e.props);Object.entries(e.selectors).map(([e,n])=>{Fr(e,t.filter(([e,t])=>W(n)===`Number`?n===t.idx:n.includes(t.idx)).map(([e,t])=>[e,t.value]))})}function Fr(e,t){document.querySelectorAll(e).forEach(e=>{let n=e.style;t.forEach(([e,t])=>n.setProperty(e,t))})}function Ir(e,t){return{selectors:e??{},props:t??{},pinned:!1,pin(e){return this.pinned=e,this},make(){return{selectors:this.selectors,props:this.props,pinned:this.pinned}},extend(e){let t=Object.keys(this.props).length,n=Object.entries(e.props_).map(([n,r])=>{let[i,a]=Lr(this.props,n,r,e.prefix_,t);return t=a,i}),r=n.map(([e,t])=>t.idx);r=r.length===1?r[0]:r;let i=e.selectors_.length===0?[`:root`]:e.selectors_;i=i.map(e=>[e,r]);for(let[e,t]of i)this.selectors[e]===void 0?this.selectors[e]=t:this.selectors[e].push(t);return n.forEach(([e,t])=>{this.props[e]===void 0&&(this.props[e]=t)}),this},mutate(){},reduce(){Reflect.deleteProperty(this,`prop`)},clear(){return this.selectors={},this.props={},this}}}function Lr(e,t,n,r,i){t=r?`--`+t:t;let a=e[t];if(a!==void 0&&a.value===n)return[a,i];let o=[t,{value:n,idx:i}];return i+=1,[o,i]}function Rr(){return{selectors_:[],props_:{},prefix_:!1,selectors(...e){return this.selectors_=e,this},selectors_mut(){return this.selectors_},props(e){return this.props_=e,this},props_mut(){return this.props_},prefix(e){return this.prefix_=e,this},clear(){this.prefix_=!1,this.props_={},this.selectors_=[]}}}var[zr,Br]=C(!0),Vr=k({content:zr,re_content:Br});function Hr(){return A(Vr)}var Ur=e=>{let{content:t,re_content:n}=Hr(),r=fe(()=>e.children);return ne(()=>r.toArray().forEach(e=>{e!==null&&e.setAttribute(`main-content`,t())})),r},Wr={Signin:`vwAKuW_Signin`},Gr=I(`<h4>Login`),Kr=I(`<span>New to capra?`),qr=I(`<span>Register.`);function Jr(e,t){t(t=>(Object.entries(e).forEach(e=>{t[e[0]]=e[1]}),structuredClone(t)))}async function Yr(e){let{user:t,re_user:n}=fn(),{colors:r,re_colors:i}=Mr(),a=await or(e);if(a.constructor.name===`Error`)return a;let{map:o,path:s}=a,c=JSON.stringify(en(o)),l=await fetch(s,{method:`PATCH`,credentials:`include`,headers:{"content-type":`application/json`,"content-length":`${c.length}`},body:c});if(!l.ok)throw Error(`login request failed`);n(await l.json()),Jr(t().config.colors,i);let u=()=>n(e=>({name:e.name,address:e.address,access_token:void 0,config:e.config,pfp:e.pfp}));await new Promise(e=>setTimeout(u,1200*1e3))}var Xr=e=>{let t=()=>e.swap_call;return N(er,{get class(){return Wr.Signin},action:`/auth/remembrance`,method:`post`,target:`_blank`,submit:Yr,get children(){return[(()=>{var e=Gr();return w(()=>R(e,q.FormTitle)),e})(),N(jn,{type:`text`,name:`user_name`,legend:`User Name or Email`,mandatory:!0}),N(Ln,{name:`user_pswd`,mandatory:!0}),N(yn,{name:`persist_session`,legend:`\xA0persist session`}),N(K,{type:`submit`,get class(){return q.SubmitButton},children:`Login`}),N(Yn,{}),N(Bn,{get children(){return[(()=>{var e=Kr();return w(()=>R(e,q.Note)),e})(),N(K,{get class(){return q.SwapButton},get call(){return t()},get children(){return qr()}})]}})]}})},Zr=I(`<h4>Register`),Qr=I(`<span>Already have an account?`),$r=I(`<span>Login.`);function ei(e){let t=Error();return e.length>24?(t.message=`password too long`,t.cause=`LengthFailure`,console.error(t),t):e.length<8?(t.message=`password too short`,t.cause=`LengthFailure`,console.error(t),t):on(e)?an(e)?(t.message=`password needs to have at least 1 symbol (non-alphanumeric char)`,t.cause=`TooLittleVariation`,console.error(t),t):null:(t.message=`password contains non ascii chars`,t.cause=`NonAsciiDetected`,console.error(t),t)}function ti(e,t){if(e!==t){let e=Error(`password verification mismatch`);return console.error(e),e}return null}async function ni(e){let t=await or(e);if(t.constructor.name===`Error`)return t;let{map:n,path:r}=t,i=n.get(`user_pswd`),a=ti(i,n.get(`verify_pswd`));if(a!==null||(a=ei(i),a!==null))return t;let o=JSON.stringify(en(n));console.log(o),(await fetch(r,{method:`PUT`,credentials:`include`,headers:{"content-type":`application/json`,"content-length":`${o.length}`},body:o})).ok}var ri=e=>{let t=()=>e.swap_call;return N(er,{action:`/auth/remembrance`,method:`post`,target:`_blank`,submit:ni,get children(){return[(()=>{var e=Zr();return w(()=>R(e,q.FormTitle)),e})(),N(jn,{type:`text`,name:`user_name`,legend:`User Name`,mandatory:!0}),N(jn,{type:`email`,name:`user_addr`,legend:`Address`}),N(Ln,{name:`user_pswd`,mandatory:!0}),N(Ln,{name:`verify_pswd`,legend:`Verify Password`,mandatory:!0}),N(yn,{name:`auto_login`,legend:`\xA0auto login`}),N(K,{get class(){return q.SubmitButton},children:`Register`}),N(Yn,{}),N(Bn,{get children(){return[(()=>{var e=Qr();return w(()=>R(e,q.Note)),e})(),N(K,{get class(){return q.SwapButton},get call(){return t()},get children(){return $r()}})]}})]}})},ii=I(`<div>`),[ai,oi]=C(0),si=k({form:ai,set_form:oi});function ci(){return A(si)}var li=()=>{let e=G(),{form:t,set_form:n}=ci(),r=()=>n(e=>Math.abs(1-e));return(()=>{var n=ii();return V(n,N(P,{get children(){return[N(F,{get when(){return e.is_logged_out()},get children(){return N(P,{get children(){return[N(F,{get when(){return t()==0},get children(){return N(Xr,{swap_call:r})}}),N(F,{get when(){return t()==1},get children(){return N(ri,{swap_call:r})}})]}})}}),N(F,{get when(){return e.is_logged_in()},get children(){return N(Qn,{text:`You are already logged-in.`})}})]}})),w(()=>R(n,Or.Auth)),n})()},Y={Chapter:`vVBevG_Chapter`,EntryKey:`vVBevG_EntryKey`,EntryVal:`vVBevG_EntryVal`,InfoEntry:`vVBevG_InfoEntry`,Pfp:`vVBevG_Pfp`,Section:`vVBevG_Section`,SectionContents:`vVBevG_SectionContents`,Title:`vVBevG_Title`,UserInfo:`vVBevG_UserInfo`},ui=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z"/><path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"/></svg>`,di=I(`<div>`),fi=I(`<div><span>Profile</span><div>`),pi=I(`<img>`),mi=I(`<span><span></span><span>`),hi=()=>{let e=G();return(()=>{var t=di();return V(t,N(gi,{get name(){return e.name()},get pfp(){return e.pfp()},get address(){return e.address()}})),w(()=>R(t,Y.Chapter)),t})()},gi=e=>{let t=()=>e.name,n=()=>e.pfp,r=()=>e.address;return(()=>{var e=fi(),i=e.firstChild,a=i.nextSibling;return V(a,N(_i,{get pfp(){return n()}}),null),V(a,N(vi,{get name(){return t()},get address(){return r()}}),null),w(t=>{var n=Y.Section,r=Y.Title,o=Y.SectionContents;return n!==t.e&&R(e,t.e=n),r!==t.t&&R(i,t.t=r),o!==t.a&&R(a,t.a=o),t},{e:void 0,t:void 0,a:void 0}),e})()},_i=e=>{let t=()=>e.pfp?(()=>{var t=pi();return w(()=>L(t,`src`,e.pfp)),t})():H(ui);return N(K,{get class(){return Y.Pfp},get children(){return t()}})},vi=e=>{let t=()=>e.name,n=()=>e.address??`-`;return(()=>{var e=di();return V(e,N(yi,{key:`user-name`,get val(){return t()}}),null),V(e,N(yi,{key:`email-address`,get val(){return n()}}),null),w(()=>R(e,Y.UserInfo)),e})()},yi=e=>{let t=()=>e.key,n=()=>e.val;return(()=>{var e=mi(),r=e.firstChild,i=r.nextSibling;return V(r,t),V(i,n),w(t=>{var n=Y.InfoEntry,a=Y.EntryKey,o=Y.EntryVal;return n!==t.e&&R(e,t.e=n),a!==t.t&&R(r,t.t=a),o!==t.a&&R(i,t.a=o),t},{e:void 0,t:void 0,a:void 0}),e})()},X={Address:`zh3Sha_Address`,ButtonGroup:`zh3Sha_ButtonGroup`,Chapter:`zh3Sha_Chapter`,Password:`zh3Sha_Password`,Section:`zh3Sha_Section`,SectionContents:`zh3Sha_SectionContents`,Title:`zh3Sha_Title`,Trigger:`zh3Sha_Trigger`},bi=I(`<div><div><span>Email-Address</span></div><div><span>Password`),xi=I(`<div>`),Si=I(`<h4>Password-Reset`),Ci=e=>{let t=()=>e.configs.expose_my_address,n=()=>e.configs.send_me_emails;return(()=>{var e=bi(),r=e.firstChild,i=r.firstChild,a=r.nextSibling,o=a.firstChild;return V(r,N(wi,{get send_me_emails(){return n()},get expose_my_address(){return t()}}),null),V(a,N(Ti,{}),null),w(t=>{var n=X.Chapter,s=X.Section,c=X.Title,l=X.Section,u=X.Title;return n!==t.e&&R(e,t.e=n),s!==t.t&&R(r,t.t=s),c!==t.a&&R(i,t.a=c),l!==t.o&&R(a,t.o=l),u!==t.i&&R(o,t.i=u),t},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),e})()},wi=e=>{let t=()=>e.send_me_emails,n=()=>e.expose_my_address;return(()=>{var e=xi();return V(e,N(yn,{name:`send_me_emails`,legend:`send me emails`,get state(){return t()}}),null),V(e,N(yn,{name:`unsecure_addr`,legend:`expose my address`,get state(){return n()}}),null),w(()=>R(e,`${X.SectionContents} ${X.Address}`)),e})()},Ti=()=>{let[e,t]=C(!1),n=e=>t(e=>!e);return(()=>{var t=xi();return V(t,N(P,{get children(){return[N(F,{get when(){return!e()},get children(){return N(K,{get class(){return X.Trigger},call:n,children:`Reset Password`})}}),N(F,{get when(){return e()},get children(){return N(er,{action:`/configs/reset-password`,method:`post`,target:`_blank`,submit:Ei,get children(){return[(()=>{var e=Si();return w(()=>R(e,X.FormTitle)),e})(),N(Ln,{legend:`Current pswd`,name:`old_pswd`,mandatory:!0}),N(Ln,{legend:`New pswd`,name:`new_pswd`,mandatory:!0}),N(Ln,{legend:`Confirm pswd`,name:`confirm_pswd`,mandatory:!0}),(()=>{var e=xi();return V(e,N(K,{type:`button`,get class(){return`${X.Trigger} ${X.FormOff}`},call:n,children:`Cancel`}),null),V(e,N(K,{get class(){return X.Trigger},type:`submit`,children:`Reset`}),null),w(()=>R(e,X.ButtonGroup)),e})()]}})}})]}})),w(()=>R(t,`${X.SectionContents} ${X.Password}`)),t})()};async function Ei(e){let t=await or(e);if(t.constructor.name===`Error`)return t;let{map:n,path:r}=t,i=n.get(`new_pswd`),a=Oi(i,n.get(`confirm_pswd`));if(a!==null||(a=Di(i),a!==null))return t;let o=JSON.stringify(en(n));console.log(o),(await fetch(r,{method:`PATCH`,credentials:`include`,headers:{"content-type":`application/json`,"content-length":`${o.length}`},body:o})).ok}function Di(e){let t=Error();return e.length>24?(t.message=`password too long`,t.cause=`LengthFailure`,console.error(t),t):e.length<8?(t.message=`password too short`,t.cause=`LengthFailure`,console.error(t),t):on(e)?an(e)?(t.message=`password needs to have at least 1 symbol (non-alphanumeric char)`,t.cause=`TooLittleVariation`,console.error(t),t):null:(t.message=`password contains non ascii chars`,t.cause=`NonAsciiDetected`,console.error(t),t)}function Oi(e,t){if(e!==t){let e=Error(`password verification mismatch`);return console.error(e),e}return null}var Z={Chapter:`uTMyta_Chapter`,DisablePlugin:`uTMyta_DisablePlugin`,PluginCard:`uTMyta_PluginCard`,PluginInfo:`uTMyta_PluginInfo`,PluginName:`uTMyta_PluginName`,Section:`uTMyta_Section`,SectionContents:`uTMyta_SectionContents`,Title:`uTMyta_Title`},ki=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm86.63 272L320 342.63l-64-64-64 64L169.37 320l64-64-64-64L192 169.37l64 64 64-64L342.63 192l-64 64z"/></svg>`,Ai=I(`<div>`),ji=I(`<div><span>Installed</span><div>`),Mi=I(`<div><div><span>`),Ni=e=>{let t=()=>Object.entries(e.configs).map(e=>({icon:e[1].icon,name:e[0],accent:e[1].accent}));return(()=>{var e=Ai();return V(e,N(Pi,{get plugins(){return t()}})),w(()=>R(e,Z.Chapter)),e})()},Pi=e=>{let t=()=>e.plugins;return(()=>{var e=ji(),n=e.firstChild,r=n.nextSibling;return V(r,N(Ue,{get each(){return t()},children:e=>N(Fi,{get name(){return e.name},get icon(){return e.icon},get accent(){return e.accent}})})),w(t=>{var i=Z.Section,a=Z.Title,o=Z.SectionContents;return i!==t.e&&R(e,t.e=i),a!==t.t&&R(n,t.t=a),o!==t.a&&R(r,t.a=o),t},{e:void 0,t:void 0,a:void 0}),e})()},Fi=e=>{let t=()=>e.name,n=()=>e.icon,r=()=>e.accent,i=H(ki);return(()=>{var e=Mi(),a=e.firstChild,o=a.firstChild;return V(a,n,o),V(o,t),V(e,N(K,{get class(){return Z.DisablePlugin},attrs:{title:`remove`},children:i}),null),w(t=>{var n=Z.PluginCard,i=`${r()}`,s=Z.PluginInfo,c=Z.PluginName;return n!==t.e&&R(e,t.e=n),i!==t.t&&B(e,`--accent`,t.t=i),s!==t.a&&R(a,t.a=s),c!==t.o&&R(o,t.o=c),t},{e:void 0,t:void 0,a:void 0,o:void 0}),e})()},Q={Chapter:`KP2g-q_Chapter`,ColorBox:`KP2g-q_ColorBox`,ColorschemeCard:`KP2g-q_ColorschemeCard`,PinSwitch:`KP2g-q_PinSwitch`,PropertyName:`KP2g-q_PropertyName`,PropertyText:`KP2g-q_PropertyText`,PropertyValue:`KP2g-q_PropertyValue`,SchemeColors:`KP2g-q_SchemeColors`,SchemeInfo:`KP2g-q_SchemeInfo`,SchemeName:`KP2g-q_SchemeName`,Section:`KP2g-q_Section`,SectionContents:`KP2g-q_SectionContents`,Switches:`KP2g-q_Switches`,Title:`KP2g-q_Title`},Ii=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M359.1 231.9h-.1c-.1-.1-.3-.4-.4-.6l-78.9-79.6c-5.8-6-14.2-10.2-23.6-10.2-11.8 0-22.2 6.2-27.7 16.3 0 0-3.4 5.1-12.6 19.8-1.6 2.6-1.6 6 .1 8.6l26.8 41.2c2.9 3.8 3.3 8 1.4 9.9l-.1.1c-2.3 2.3-5.9 1.5-9.8-1.4l-32.3-20.5c-3.8-2.4-8.7-1.2-11.1 2.5-21.9 35.1-46.8 74.7-71.2 114-1.6 2.5-1.6 5.7-.1 8.3l14.1 24.1c2.9 3.8 3.3 8 1.4 9.9l-.1.1c-2.3 2.3-5.9 1.5-9.8-1.4l-16.6-8.4c-3.7-1.9-8.2-.6-10.4 2.9-17.7 28.3-28 44.7-29.1 46.5-3 5.1-5 11.2-5 17.8 0 17.8 14.2 32.2 31.9 32.2 7.8 0 14.4-3.4 20.6-7.6L221 378.8c3.4-2.5 4.2-7.2 2-10.7L202.5 336c-2.9-3.8-3.3-8-1.4-9.9l.1-.1c2.3-2.3 5.9-1.5 9.8 1.4l37.4 25.6c2.8 1.9 6.5 1.9 9.3-.2 53-39.1 97.5-72.2 97.5-72.2 7.9-6 13-15.4 13-26 0-8.7-3.1-16.8-9.1-22.7zM446.9 131.2l-11.2-17.9c-2.2-3.8-7.1-5.1-10.9-2.9L365.4 147l47.3-78.9c2.2-3.8.9-8.8-2.9-11l-17.7-8c-3.9-2.3-8.8-.9-11 3l-57.6 108.3 28.6 28.8 91.8-46.8c3.9-2.2 5.3-7.2 3-11.2z"/></svg>`,Li=I(`<div>`),Ri=I(`<div><span>Colorschemes</span><div>`),zi=I(`<div><div><span></span><div></div></div><div>`),Bi=I(`<span>color copied!`),Vi=I(`<span>`);function Hi(e){let t=Object.entries(e).map(e=>[e[0].startsWith(`--`)?e[0].slice(2):e[0],e[1].value]);return Object.fromEntries(t)}var Ui=e=>{let{colors:t,re_colors:n}=Mr(),r=()=>Object.entries(t()).map(e=>({name:e[0],pinned:e[1].pinned,scheme:Hi(e[1].props)}));return(()=>{var e=Li();return V(e,N(Wi,{get schemes(){return r()}})),w(()=>R(e,Q.Chapter)),e})()},Wi=e=>{let t=()=>e.schemes;return(()=>{var e=Ri(),n=e.firstChild,r=n.nextSibling;return V(r,N(Ue,{get each(){return t()},children:e=>N(Gi,{get name(){return e.name},get scheme(){return e.scheme},get pinned(){return e.pinned}})})),w(t=>{var i=Q.Section,a=Q.Title,o=Q.SectionContents;return i!==t.e&&R(e,t.e=i),a!==t.t&&R(n,t.t=a),o!==t.a&&R(r,t.a=o),t},{e:void 0,t:void 0,a:void 0}),e})()},Gi=e=>{let{colors:t,re_colors:n}=Mr(),r=()=>e.name,i=()=>e.scheme,a=()=>e.pinned,o=H(Ii),[s,c]=C(a()),l=e=>{let i=e.currentTarget;c(e=>(i.classList.toggle(`Pinned`),n(t=>(console.log(t[r()]),t[r()]===void 0?t:(t[r()].pinned=!e,structuredClone(t)))),console.log(t()),!e))},u=`${Q.PinSwitch}${s()?` Pinned`:``}`;return(()=>{var e=zi(),t=e.firstChild,n=t.firstChild,a=n.nextSibling,s=t.nextSibling;return V(n,r),V(a,N(K,{class:u,call:l,attrs:{title:`is pinned?`},children:o})),V(s,N(Ue,{get each(){return Object.entries(i())},children:e=>N(Ji,{get prop(){return e[0]},get val(){return e[1]}})})),w(r=>{var i=Q.ColorschemeCard,o=Q.SchemeInfo,c=Q.SchemeName,l=Q.Switches,u=Q.SchemeColors;return i!==r.e&&R(e,r.e=i),o!==r.t&&R(t,r.t=o),c!==r.a&&R(n,r.a=c),l!==r.o&&R(a,r.o=l),u!==r.i&&R(s,r.i=u),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),e})()},Ki=N(gr,{timer:1500,get children(){return Bi()}});async function qi(e){let t=e.currentTarget,n=t.lastElementChild.style.getPropertyValue(`background`);await navigator.clipboard.writeText(n),t.appendChild(Ki())}var Ji=e=>{let t=()=>e.prop,n=()=>e.val;return N(K,{get class(){return Q.ColorBox},call:qi,get children(){return[(()=>{var e=Vi();return V(e,t),w(()=>R(e,Q.PropertyName)),e})(),N(P,{get children(){return[N(F,{get when(){return n().endsWith(`deg`)},get children(){var e=Vi();return V(e,n),w(()=>R(e,Q.PropertyText)),e}}),N(F,{when:!0,get children(){var e=Vi();return w(t=>{var r=Q.PropertyValue,i=`${n()}`;return r!==t.e&&R(e,t.e=r),i!==t.t&&B(e,`background`,t.t=i),t},{e:void 0,t:void 0}),e}})]}})]}})},Yi={Configs:`UUQ36G_Configs`,Contents:`UUQ36G_Contents`,Headers:`UUQ36G_Headers`,LeafWrapper:`UUQ36G_LeafWrapper`,Panic:`UUQ36G_Panic`},Xi=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M265.6 212.3c-10.5 0-18.5 4.4-24 13.2-5.5 8.8-9.1 22-10.8 39.6-.9 11.7 0 20.5 2.7 26.5s7.1 9 13.1 9c5.5 0 10.3-1.5 14.6-4.4 4.3-2.9 8.1-8.3 11.3-16.2l6.1-66c-2.2-.5-4.4-.9-6.5-1.2-2.3-.4-4.4-.5-6.5-.5z"/><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm127.8 201.9c-.9 21.4-7.6 39.9-20 55.6-12.4 15.6-31 23.4-55.6 23.4-8.2 0-15.3-2.2-21.2-6.6-6-4.4-10.2-10.7-12.6-18.8-4.1 8.3-9.4 14.5-15.7 18.6-6.3 4.1-13.7 6.2-22.2 6.2-15.1 0-26.6-5.8-34.6-17.3s-10.9-26.8-8.8-45.9c2.6-24.4 10-44 22.2-58.7 12.2-14.7 27-22 44.4-22 12.2 0 22.1 1.3 29.5 3.8 7.4 2.5 15.6 5.7 24.5 11l-.5-.1h.8l-7.7 83.4c-.5 8.5.1 14.6 1.7 17.8 1.7 3.2 3.9 4.9 6.7 4.9 11.3 0 20.4-5.1 27.2-15.6 6.8-10.5 10.6-23.6 11.4-39.6 1.6-33-5.1-58.7-20.2-77.1-15.1-18.4-38.3-27.7-69.7-27.7-30.5 0-54.8 9.9-72.8 29.8s-27.7 46.9-29.3 81.2c-1.7 33.4 5.6 59.8 21.9 79.1 16.3 19.4 39.7 29.1 70.3 29.1 8.5 0 17.3-.9 26.5-2.7 9.1-1.8 17.1-4.1 23.7-6.8l5.8 24.2c-6.8 4.1-15.4 7.3-25.9 9.6-10.5 2.3-20.7 3.4-30.7 3.4-40.8 0-72.3-12.1-94.3-36.4-22-24.2-32.2-57.4-30.5-99.6 1.8-41.8 14.9-74.9 39.1-99.4 24.3-24.5 56.5-36.7 96.7-36.7 39.5 0 69.8 11.6 90.7 34.7 21.2 23.2 30.8 54.9 29.2 95.2z"/></svg>`,Zi=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M345.14 480H274a18 18 0 01-18-18v-27.71a31.32 31.32 0 00-9.71-22.77c-7.78-7.59-19.08-11.8-30.89-11.51-21.36.5-39.4 19.3-39.4 41.06V462a18 18 0 01-18 18H87.62A55.62 55.62 0 0132 424.38V354a18 18 0 0118-18h27.71c9.16 0 18.07-3.92 25.09-11a42.06 42.06 0 0012.2-29.92C114.7 273.89 97.26 256 76.91 256H50a18 18 0 01-18-18v-70.38A55.62 55.62 0 0187.62 112h55.24a8 8 0 008-8v-6.48A65.53 65.53 0 01217.54 32c35.49.62 64.36 30.38 64.36 66.33V104a8 8 0 008 8h55.24A54.86 54.86 0 01400 166.86v55.24a8 8 0 008 8h5.66c36.58 0 66.34 29 66.34 64.64 0 36.61-29.39 66.4-65.52 66.4H408a8 8 0 00-8 8v56A54.86 54.86 0 01345.14 480z"/></svg>`,Qi=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zM76 256c0-48.1 18.7-93.3 52.7-127.3S207.9 76 256 76c48.1 0 93.3 18.7 127.3 52.7 32.2 32.2 50.7 74.5 52.6 119.7-8.8-10.3-24.2-24-43.8-24-27.5 0-41.7 25.7-51 42.7-1.4 2.5-2.7 4.9-3.9 7-11.4 19.2-27.3 30-42.5 28.9-13.4-.9-24.8-11.2-32.2-28.8-9.2-22.1-29.1-45.8-52.9-49.2-11.3-1.6-28.1.8-44.7 21.4-3.2 4-6.9 9.4-11.1 15.6-10.4 15.5-26.2 38.8-38.1 40.8-17.3 2.8-30.9-7.5-36.4-12.3-2.2-11.2-3.3-22.8-3.3-34.5z"/></svg>`,$i=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M378 324a69.78 69.78 0 00-48.83 19.91L202 272.41a69.68 69.68 0 000-32.82l127.13-71.5A69.76 69.76 0 10308.87 129l-130.13 73.2a70 70 0 100 107.56L308.87 383A70 70 0 10378 324z"/></svg>`,ea=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M440.88 129.37L288.16 40.62a64.14 64.14 0 00-64.33 0L71.12 129.37a4 4 0 000 6.9L254 243.85a4 4 0 004.06 0L440.9 136.27a4 4 0 00-.02-6.9zM256 152c-13.25 0-24-7.16-24-16s10.75-16 24-16 24 7.16 24 16-10.75 16-24 16zM238 270.81L54 163.48a4 4 0 00-6 3.46v173.92a48 48 0 0023.84 41.39L234 479.48a4 4 0 006-3.46V274.27a4 4 0 00-2-3.46zM96 368c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24zm96-32c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24zM458 163.51L274 271.56a4 4 0 00-2 3.45V476a4 4 0 006 3.46l162.15-97.23A48 48 0 00464 340.86V167a4 4 0 00-6-3.49zM320 424c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24zm0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24zm96 32c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24zm0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24z"/></svg>`,ta=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 176H272v.1h-32v-.1H32v48h11l5 21.5C64 313 88.5 336 144 336s96-17.4 96-90.5V224s1.5-16 16-16 16 16 16 16v21.8c0 73 42.1 90.2 97 90.2s79-25 95-90.2l5-21.8h11v-48z"/></svg>`,na=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M79.2 211.44c15.52-8.82 34.91-2.28 43.31 13.68l41.38 84.41a7 7 0 008.93 3.43 7 7 0 004.41-6.52V72c0-13.91 12.85-24 26.77-24s26 10.09 26 24v156.64A11.24 11.24 0 00240.79 240 11 11 0 00252 229V24c0-13.91 10.94-24 24.86-24S302 10.09 302 24v204.64A11.24 11.24 0 00312.79 240 11 11 0 00324 229V56c0-13.91 12.08-24 26-24s26 11.09 26 25v187.64A11.24 11.24 0 00386.79 256 11 11 0 00398 245V120c0-13.91 11.08-24 25-24s25.12 10.22 25 24v216c0 117.41-72 176-160 176h-16c-88 0-115.71-39.6-136-88L67.33 255c-6.66-18-3.64-34.75 11.87-43.56z"/></svg>`,ra=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M328.85 156.79a26.69 26.69 0 1018.88 7.81 26.6 26.6 0 00-18.88-7.81z"/><path d="M477.44 50.06a.29.29 0 010-.09 20.4 20.4 0 00-15.13-15.3c-29.8-7.27-76.68.48-128.63 21.28-52.36 21-101.42 52-134.58 85.22A320.7 320.7 0 00169.55 175c-22.33-1-42 2.18-58.57 9.41-57.74 25.41-74.23 90.44-78.62 117.14a25 25 0 0027.19 29h.13l64.32-7.02c.08.82.17 1.57.24 2.26a34.36 34.36 0 009.9 20.72l31.39 31.41a34.27 34.27 0 0020.71 9.91l2.15.23-7 64.24v.13A25 25 0 00206 480a25.25 25.25 0 004.15-.34C237 475.34 302 459.05 327.34 401c7.17-16.46 10.34-36.05 9.45-58.34a314.78 314.78 0 0033.95-29.55c33.43-33.26 64.53-81.92 85.31-133.52 20.69-51.36 28.48-98.59 21.39-129.53zM370.38 224.94a58.77 58.77 0 110-83.07 58.3 58.3 0 010 83.07z"/><path d="M161.93 386.44a16 16 0 00-11 2.67c-6.39 4.37-12.81 8.69-19.29 12.9-13.11 8.52-28.79-6.44-21-20l12.15-21a16 16 0 00-15.16-24.91A61.25 61.25 0 0072 353.56c-3.66 3.67-14.79 14.81-20.78 57.26A357.94 357.94 0 0048 447.59 16 16 0 0064 464h.4a359.87 359.87 0 0036.8-3.2c42.47-6 53.61-17.14 57.27-20.8a60.49 60.49 0 0017.39-35.74 16 16 0 00-13.93-17.82z"/></svg>`,ia=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M218.1 167.17c0 13 0 25.6 4.1 37.4-43.1 50.6-156.9 184.3-167.5 194.5a20.17 20.17 0 00-6.7 15c0 8.5 5.2 16.7 9.6 21.3 6.6 6.9 34.8 33 40 28 15.4-15 18.5-19 24.8-25.2 9.5-9.3-1-28.3 2.3-36s6.8-9.2 12.5-10.4 15.8 2.9 23.7 3c8.3.1 12.8-3.4 19-9.2 5-4.6 8.6-8.9 8.7-15.6.2-9-12.8-20.9-3.1-30.4s23.7 6.2 34 5 22.8-15.5 24.1-21.6-11.7-21.8-9.7-30.7c.7-3 6.8-10 11.4-11s25 6.9 29.6 5.9c5.6-1.2 12.1-7.1 17.4-10.4 15.5 6.7 29.6 9.4 47.7 9.4 68.5 0 124-53.4 124-119.2S408.5 48 340 48s-121.9 53.37-121.9 119.17zM400 144a32 32 0 11-32-32 32 32 0 0132 32z"/></svg>`,aa=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v160M336 256H176"/></svg>`,oa=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M204 240H68a36 36 0 01-36-36V68a36 36 0 0136-36h136a36 36 0 0136 36v136a36 36 0 01-36 36zM444 240H308a36 36 0 01-36-36V68a36 36 0 0136-36h136a36 36 0 0136 36v136a36 36 0 01-36 36zM204 480H68a36 36 0 01-36-36V308a36 36 0 0136-36h136a36 36 0 0136 36v136a36 36 0 01-36 36zM444 480H308a36 36 0 01-36-36V308a36 36 0 0136-36h136a36 36 0 0136 36v136a36 36 0 01-36 36z"/></svg>`,sa=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 777.85462 676.98789"
   width="777.85461"
   height="676.98785"
   color="#000000"
   fill="none"
   version="1.1"
   id="svg1"
   sodipodi:docname="up.svg"
   inkscape:version="1.4.3 (0d15f75042, 2025-12-25)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs1" />
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:zoom="1.1820437"
     inkscape:cx="384.08055"
     inkscape:cy="343.04992"
     inkscape:window-width="1920"
     inkscape:window-height="1080"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg1" />
  <path
     d="m 143.64518,457.71614 c 0,0 183.30612,-248.89175 248.89378,-248.89175 65.59183,0 248.89382,248.89382 248.89382,248.89382"
     stroke="currentColor"
     stroke-width="62.2235"
     stroke-linecap="round"
     stroke-linejoin="round"
     id="path1" />
</svg>
`,ca=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 777.85462 676.98789"
   width="777.85461"
   height="676.98785"
   color="#000000"
   fill="none"
   version="1.1"
   id="svg1"
   sodipodi:docname="down.svg"
   inkscape:version="1.4.3 (0d15f75042, 2025-12-25)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs1" />
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:zoom="1.1820437"
     inkscape:cx="384.08055"
     inkscape:cy="343.04992"
     inkscape:window-width="1920"
     inkscape:window-height="1080"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg1" />
  <path
     d="m 641.43278,208.82646 c 0,0 -183.30612,248.89175 -248.89378,248.89175 -65.59183,0 -248.89382,-248.89382 -248.89382,-248.89382"
     stroke="currentColor"
     stroke-width="62.2235"
     stroke-linecap="round"
     stroke-linejoin="round"
     id="path1" />
</svg>
`,la=I(`<div>`),ua=I(`<div><span>This section is a work-in-progress</span><span style=font-weight:bold>(˶ᵔ ᵕ ᵔ˶)`),da={account:H(Xi),plugins:H(Zi),colors:H(Qi),shared:H($i),main:H(ea),glasses:H(ta),relations:H(na),installed:H(ra),build:H(ra),security:H(ia),available:H(aa),manage:H(oa)},fa=e=>{let t=()=>e.text;return N(Qn,{get class(){return Yi.Panic},get text(){return t()}})},pa=()=>{let e=G();if(e.config()===void 0||!Object.hasOwn(e.config(),`headers`))return N(fa,{text:`no user configuration found. Are you surely logged-in?`});let t=()=>e.config().headers,n=()=>Object.fromEntries(Object.entries(e.config()).filter(e=>e[0]!==`headers`)),[r,i]=C(W(t()[0])===`String`?t()[0]:Object.keys(t()[0])[0]);return(()=>{var a=la();return V(a,N(P,{get children(){return[N(F,{get when(){return e.is_logged_in()},get children(){return[N(ma,{get headers(){return t()},updater:i}),N(ha,{get data(){return n()},get header(){return r()}})]}}),N(F,{get when(){return e.is_logged_out()},get children(){return N(Qn,{text:`You are not logged-in.`})}})]}})),w(t=>{var n=Yi.Configs,r=e.is_logged_in();return n!==t.e&&R(a,t.e=n),r!==t.t&&L(a,`auth-status`,t.t=r),t},{e:void 0,t:void 0}),a})()},ma=e=>{let t=()=>e.headers,n=()=>e.updater,r=e=>n()(t=>{let n=wa(e.target);return n.className.includes(`Tree`)?t:va(n)}),i=N(fr,{get data(){return t()},ident:`35px`});return ya(i,ba),ya(i,Sa),(()=>{var e=la();return z(e,`click`,r),V(e,i),w(()=>R(e,Yi.Headers)),e})()},ha=e=>{let t=()=>e.header,n=()=>_a(e.data,e.header);return(()=>{var e=la();return V(e,N(ga,{get configs(){return n()},get header(){return t()}})),w(()=>R(e,Yi.Contents)),e})()},ga=e=>{let t=()=>e.configs,n=()=>e.header;return N(P,{get children(){return[N(F,{get when(){return n()===`account`},get children(){return N(hi,{})}}),N(F,{get when(){return n()===`account/security`},get children(){return N(Ci,{get configs(){return t()}})}}),N(F,{get when(){return n()===`plugins`},get children(){return N(Ni,{get configs(){return t()}})}}),N(F,{get when(){return n()===`colors`},get children(){return N(Ui,{get configs(){return t()}})}}),N(F,{when:!0,get children(){return ua()}})]}})};function _a(e,t){return e[t]}function va(e){let t=``,n=e.parentElement;if(n.className.includes(`LeafWrapper`)&&(n=n.parentElement),n.tagName===`BODY`)throw Error(`reached dom root`);return n.className.includes(`Tree`)?t.length===0?e.textContent:t+`/`+e.textContent:(e.className.includes(`Leaf`)&&(e.className.includes(`BranchName`)||(t+=(t.length===0?``:`/`)+n.firstElementChild.children[1].textContent),t+=(t.length===0?``:`/`)+e.textContent),t)}function ya(e,t){let n=fe(()=>e);return ne(()=>{n.toArray().forEach(e=>{t(e)})}),n}function ba(e){new Array(...e.querySelectorAll(`[class*=Leaf]`)).forEach(e=>{let t=da[e.textContent]??cn(),n=(()=>{var n=la();return V(n,t,null),V(n,()=>e.cloneNode(!0),null),w(()=>R(n,Yi.LeafWrapper)),n})();e.replaceWith(n)})}var xa=Yt().style({fill:`none`,color:`var(--blue)`,height:`20px`}).override({"stroke-width":`160px`},`#path1`).parse(ca);Yt().style({fill:`none`,color:`var(--blue)`,height:`20px`}).override({"stroke-width":`160px`},`#path1`).parse(sa);function Sa(e){new Array(...e.querySelectorAll(`[class*=BranchName]`)).forEach(e=>{let t=xa.cloneNode(!0);t.classList.add(`down`);let n=e.parentElement;n.appendChild(t),n.addEventListener(`auxclick`,Ca),new Array(...n.parentElement.children).slice(1).forEach(e=>e.classList.toggle(`off`))})}function Ca(e){let t=e.currentTarget,n=t.parentElement;new Array(...n.children).slice(1).forEach(e=>e.classList.toggle(`off`));let r=t.lastElementChild;r.classList.toggle(`down`),r.classList.toggle(`up`)}function wa(e){if(W(e.className)!==`String`){for(;W(e.className)!==`String`||!e.className.includes(`LeafWrapper`);)e=e.parentElement;return e.children[1]}else if(e.className.includes(`LeafWrapper`))return e.children[1];return e}var Ta={Entry:`FR1X7a_Entry`,Sep:`FR1X7a_Sep`,UserMenu:`FR1X7a_UserMenu`},Ea=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 512 512"
   version="1.1"
   id="svg2"
   sodipodi:docname="logout2.svg"
   inkscape:version="1.4.2 (ebf0e940d0, 2025-05-08)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="namedview2"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:zoom="1.5769689"
     inkscape:cx="232.09082"
     inkscape:cy="253.33411"
     inkscape:window-width="1920"
     inkscape:window-height="1080"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg2" />
  <path
     d="m 192,277.4 c 44.71272,44.71272 189.7,0 189.7,0 0,0 -43.72964,23.88628 -43.6,44.7 0.0878,14.09472 15.805,29.9 29.9,29.9 45.25483,0 96,-50.74517 96,-96 0,-45.25483 -50.74701,-95.59134 -96,-96 -14.35602,-0.12964 -30.87036,15.54398 -31,29.9 -0.19028,21.07092 44.7,44.7 44.7,44.7 0,0 -144.98728,-44.71272 -189.7,0 -10.08806,10.08806 -10.08806,32.71194 0,42.8 z"
     id="path1"
     sodipodi:nodetypes="scssssscss" />
  <path
     d="M 255.7,421.3 C 211.6,421.3 170.2,404.1 139,372.9 107.8,341.7 90.7,300.2 90.7,256 c 0,-44.1 17.2,-85.7 48.3,-116.9 31.2,-31.2 72.6,-48.4 116.7,-48.4 44,0 75.28342,56.40726 116.5,48.2 14.00853,-2.78945 29.07932,-14.48771 30.3,-30.3 C 403.72068,92.787712 386.28552,79.255584 362.75157,66.376162 339.21762,53.49674 298.6,48 255.7,48 249.00248,48 242.37785,48.319226 235.84048,48.943288 130.61568,58.988123 48,148.00921 48,256 c 0,114.7 93.2,208 207.7,208 42.9,0 84.42371,-5.33637 119,-26.71983 12.42856,-7.68635 27.12084,-20.85271 27.7,-33.98017 0.57916,-13.12746 -16.2377,-27.41975 -30.2,-30.2 -41.21658,-8.20726 -72.5,48.2 -116.5,48.2 z m 192.304,-164.453 -0.849,-0.848 0.849,-0.849 0.848,0.849 z"
     id="path2"
     sodipodi:nodetypes="ssscsascssssazasccccc" />
</svg>
`,Da=I(`<span>| profile`),Oa=I(`<span>| people`),ka=I(`<span>| apps`),Aa=I(`<span>| logout`);async function ja(){let{user:e,re_user:t}=fn();(await fetch(`/auth/remembrance`,{method:`DELETE`,credentials:`include`,headers:{authorization:`Bearer<${e().access_token}>`}})).ok&&t(e=>({name:``,address:void 0,access_token:void 0,config:void 0,pfp:void 0}))}var Ma=()=>{let e=H(ra),t=H(Ea),n=H(ta),r=H(na);return N(lr,{get class(){return Ta.UserMenu},get children(){return[N(K,{get class(){return Ta.Entry},get children(){return[n,Da()]}}),N(K,{get class(){return Ta.Entry},get children(){return[r,Oa()]}}),N(K,{get class(){return Ta.Entry},get children(){return[e,ka()]}}),N(K,{link:`/`,get class(){return Ta.Entry},call:ja,get children(){return[t,Aa()]}})]}})},Na={Initialize:`jAvltG_Initialize`,Negotiate:`jAvltG_Negotiate`},Pa=I(`<div>`),Fa=I(`<span>negotiating an identity... ok`),Ia=I(`<span>negotiating an identity...`),La=()=>(()=>{var e=Pa();return V(e,N(Dn,{}),null),V(e,N(Ra,{}),null),w(()=>R(e,Na.Initialize)),e})(),Ra=()=>{let{user:e,re_user:t}=fn(),[n]=ie(e(),za);return ne(()=>{G(e).is_non_init()&&n()!==void 0&&t(n())}),N(Je,{get fallback(){return(()=>{var e=Ia();return w(()=>R(e,Na.Negotiate)),e})()},get children(){var e=Fa();return w(()=>R(e,Na.Negotiate)),e}})};async function za(e){if(e.name!==void 0)return e;let t=await fetch(`/auth/remembrance`,{method:`POST`,credentials:`include`});if(!t.ok)return e;if(t.headers.get(`content-length`)===`0`)return{name:e.name??``,address:e.address,access_token:e.access_token};let n=await t.json();return{name:n.name,address:n.address,access_token:n.access_token}}var Ba=I(`<div style=width:23rem;height:23rem;top:70%;left:105%;position:relative;background:var(--white)>`),Va=[`branch0`,{branch1:[`leaf0`,{leaf1:[`fallen0`,`fallen1`,{fallen2:[`soil0`,`soil1`],fallen3:[`soil2`,{soil3:[`roots0`,`roots1`]}]}]}]}],Ha=()=>(()=>{var e=Ba();return V(e,N(fr,{data:Va})),e})(),$={ContentItem:`_0AH76q_ContentItem`,Entry:`_0AH76q_Entry`,Menu:`_0AH76q_Menu`,Path:`_0AH76q_Path`},Ua=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 512 512"
   version="1.1"
   id="svg2"
   sodipodi:docname="login2.svg"
   inkscape:version="1.4.2 (ebf0e940d0, 2025-05-08)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="namedview2"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:zoom="1.5177548"
     inkscape:cx="279.68944"
     inkscape:cy="263.21774"
     inkscape:window-width="1920"
     inkscape:window-height="1080"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg2" />
  <path
     d="m 256,48 c -42.9,0 -84.2,13 -119.2,37.5 -34.2,24 -90.651518,58.53735 -75.1,96.1 5.639837,13.62229 28.257843,12.37671 43.9,5.4 15.64216,-6.97671 19.4,-33.9 33.5,-48 31.2,-31.2 72.7,-48.4 116.9,-48.4 44.2,0 85.7,17.2 116.9,48.4 31.2,31.2 48.4,72.7 48.4,116.9 0,44.1 -17.2,85.7 -48.4,116.9 -31.2,31.2 -72.7,48.4 -116.9,48.4 -44.1,0 -85.6,-17.2 -116.9,-48.4 -14,-14 -17.85276,-40.92762 -33.5,-47.9 -15.647241,-6.97238 -38.345627,-8.25208 -44,5.4 -15.55669,37.56051 40.9,72.1 75.1,96.1 C 171.8,451.1 213,464 256,464 370.7,464 464,370.7 464,256 464,141.3 370.7,48 256,48 Z"
     id="path1"
     sodipodi:nodetypes="scacssssssccacsss" />
  <path
     d="m 48,277.4 c 44.712719,44.71272 189.7,0 189.7,0 0,0 -43.72964,23.88628 -43.6,44.7 0.0878,14.09472 15.805,29.9 29.9,29.9 45.25483,0 96,-96 96,-96 0,0 -50.74701,-95.59134 -96,-96 -14.35602,-0.12964 -30.87036,15.54398 -31,29.9 -0.19028,21.07092 44.7,44.7 44.7,44.7 0,0 -144.987281,-44.71272 -189.7,0 -10.088057,10.08806 -10.088057,32.71194 0,42.8 z"
     id="path2"
     sodipodi:nodetypes="scsscsscss" />
</svg>
`,Wa=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 512 512"
   version="1.1"
   id="svg2"
   sodipodi:docname="register2.svg"
   inkscape:version="1.4.2 (ebf0e940d0, 2025-05-08)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="namedview2"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:zoom="0.78203884"
     inkscape:cx="330.54624"
     inkscape:cy="349.72688"
     inkscape:window-width="1920"
     inkscape:window-height="1080"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg2" />
  <path
     d="m 256,48 c -42.9,0 -84.2,13 -119.2,37.5 -34.2,24 -90.651518,58.53735 -75.1,96.1 5.639837,13.62229 28.257843,12.37671 43.9,5.4 15.64216,-6.97671 19.4,-33.9 33.5,-48 31.2,-31.2 72.7,-48.4 116.9,-48.4 44.2,0 85.7,17.2 116.9,48.4 31.2,31.2 48.4,72.7 48.4,116.9 0,44.1 -17.2,85.7 -48.4,116.9 -31.2,31.2 -72.7,48.4 -116.9,48.4 -44.1,0 -85.6,-17.2 -116.9,-48.4 -14,-14 -15.70286,-39.96963 -33.5,-47.9 -13.497343,-6.01439 -38.345627,-8.25208 -44,5.4 -15.55669,37.56051 40.9,72.1 75.1,96.1 C 171.8,451.1 213,464 256,464 370.7,464 464,370.7 464,256 464,141.3 370.7,48 256,48 Z"
     id="path1"
     sodipodi:nodetypes="scacsssssscaacsss" />
  <path
     d="m 234.01084,120 c -44.71272,44.71272 0,189.7 0,189.7 0,0 -23.88628,-43.72964 -44.7,-43.6 -14.09472,0.0878 -29.9,15.805 -29.9,29.9 0,45.25483 96,96 96,96 0,0 95.59134,-50.74701 96,-96 0.12964,-14.35602 -15.54398,-30.87036 -29.9,-31 -21.07092,-0.19028 -44.7,44.7 -44.7,44.7 0,0 44.71272,-144.98728 0,-189.7 -10.08806,-10.08806 -32.71194,-10.08806 -42.8,0 z"
     id="path2"
     sodipodi:nodetypes="scsscsscss" />
</svg>
`,Ga=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M220.8 406.1l4.8 14.8c.4 1.2 1.9 1.8 3 1.1l6.8-4.2c2.5-1.6 2.5-5.2 0-6.8l-11.5-7.2c-1.7-1-3.6.5-3.1 2.3zM286.6 421l4.9-15.2c.6-1.8-1.4-3.3-3-2.3l-11.9 7.4a4.02 4.02 0 0 0 0 6.8l7 4.4c1.2.7 2.6.1 3-1.1zM188.6 242.2c-3.9 3.5-9.6 6.4-15.7 8.5-1 .4-1.6 1.5-1.2 2.5l9.3 28.9 3.8 11.8c.4 1.2 1.9 1.8 3 1.1l7-4.3 36.6-22.5c3-1.9 2.3-6.5-1.2-7.3-14.3-3.3-26.5-9.8-36.2-18.5-1.6-1.4-3.9-1.5-5.4-.2zM192.6 310.8l-2 1.2 14.6 45.3c.4 1.2 1.9 1.8 3 1.1l27.2-16.9c2.5-1.6 2.5-5.2 0-6.8l-38.5-23.9c-1.4-.8-3-.8-4.3 0zM258.1 348.9c-1.3-.8-2.9-.8-4.2 0L212 374.5l-.1.1c-1 .8-1 2.4 0 3.2l.7.5 41.3 25.3c1.3.8 2.9.8 4.2 0l41.7-25.5.4-.3c1-.8 1-2.2 0-3l-42.1-25.9zM296.7 296.6l-38.5-23.9c-1.3-.8-2.9-.8-4.2 0l-38.5 23.9a4.02 4.02 0 0 0 0 6.8l38.5 23.9c1.3.8 2.9.8 4.2 0l38.5-23.9c2.5-1.5 2.5-5.2 0-6.8zM318.1 242.3c-9.7 8.7-22 15.1-36.2 18.5-3.5.8-4.2 5.4-1.2 7.3l36.6 22.5 7.4 4.6c1.1.7 2.6.2 3-1.1l4-12.4 9.8-30.3c-6.9-2.1-13.6-5.3-18-9.2-1.6-1.3-3.9-1.2-5.4.1zM232.4 442l1.6 5s7.5 19 22 19c15 0 22.2-19 22.2-19l1.6-4.8c.6-1.7-.1-3.7-1.7-4.6l-20-12.4c-1.3-.8-2.9-.8-4.2 0l-19.8 12.3c-1.6.8-2.3 2.7-1.7 4.5zM276.7 341.5l27.5 17.1c1.1.7 2.6.2 3-1.1l14.2-43.8c.3-.9-.1-1.8-.8-2.3l-1-.6c-1.3-.8-2.9-.8-4.2 0l-38.5 23.9c-2.8 1.6-2.8 5.3-.2 6.8z"/><path d="M376.1 168.2c-6.2 5.4-13.2 8.7-18 10.5-1.8.7-3.5-1.4-2.3-3l4-5.7c6.1-8.7 8.5-19.4 6.8-29.8C357.9 86.8 311.7 46 256 46c-55.7 0-101.9 41.2-110.6 94.7-1.7 10.5.8 21.2 6.9 29.8l4 5.6c1.2 1.6-.5 3.8-2.4 3-5.4-2.1-13.5-6.2-20.1-12.8-1.4-1.4-3.6-1.5-5.2-.4-10.2 7.3-16.8 19.1-16.8 32.5 0 22.1 17.9 40 40 40 11.3 0 28-4.7 36.6-12.3 1.5-1.3 3.8-1.3 5.3.1 15.2 13.4 36.6 20.2 62.1 20.2s47-6.8 62.1-20.2c1.5-1.3 3.8-1.4 5.3-.1 8.5 7.6 25.3 12.3 36.6 12.3 22.1 0 40-18 40-40.1 0-11.9-5.2-22.6-13.5-30-2.7-2.6-7.2-2.7-10.2-.1z"/></svg>`,Ka=I(`<div>`),qa=I(`<span>`),Ja=I(`<div><div>`),Ya=()=>{let e=G(),{form:t,set_form:n}=ci(),r=H(Ua);H(Ea);let i=H(Wa),a=H(Qi);H(ui);let o=H(Ga),s=()=>n(1),c=()=>n(0);return(()=>{var t=Ka();return V(t,N(Za,{get class(){return $.ContentItem},icon:a,text:`colors`,get dialog(){return N(eo,{})}}),null),V(t,N(P,{get children(){return[N(F,{get when(){return e.is_logged_out()},get children(){return[N(Xa,{link:`/auth`,call:c,icon:r,text:`login`}),N(Xa,{link:`/auth`,call:s,icon:i,text:`register`})]}}),N(F,{get when(){return e.is_logged_in()},get children(){return[N(Xa,{link:`/config`,icon:o,text:`configs`}),N(Za,{get class(){return $.ContentItem},get dialog(){return N(Ma,{})},get icon(){return N(_i,{get pfp(){return e.pfp()}})},get text(){return e.name()},show:!1,events:`click`})]}})]}}),null),w(()=>R(t,$.Menu)),t})()},Xa=e=>{let t=()=>e.icon,n=()=>e.text,r=()=>e.link,i=()=>e.call;return(()=>{var e=Ka();return V(e,N(K,{get link(){return r()},get call(){return i()},get class(){return $.Path},get children(){return[N(We,{get when(){return t()!==void 0},get children(){return t()}}),(()=>{var e=qa();return V(e,n),e})()]}})),w(()=>R(e,$.Entry)),e})()},Za=e=>{let t=()=>e.icon,n=()=>e.text,r=()=>e.call,i=()=>e.class,a=()=>e.dialog,[o,s]=C(!1),{content:c,re_content:l}=Hr(),u=()=>s(e=>!e);return(()=>{var e=Ja(),s=e.firstChild;return z(s,`mousedown`,u),V(s,N(K,{get call(){return r()},get class(){return $.Path},get children(){return[Ye(()=>t()),(()=>{var e=qa();return V(e,n),e})()]}})),V(e,N(We,{get when(){return o()},get children(){return a()}}),null),w(t=>{var n=$.ContentItem,r=`${$.Entry}${U(i())}`;return n!==t.e&&R(e,t.e=n),r!==t.t&&R(s,t.t=r),t},{e:void 0,t:void 0}),e})()},{content:Qa,re_content:$a}=Hr();new MutationObserver(()=>{document.querySelectorAll(`[overtakes-content='true']`).length===0?$a(!0):$a(!1)}).observe(document.body,{subtree:!0,childList:!0,attributeFilter:[`overtakes-content`],attributeOldValue:!0});var eo=()=>{let{colors:e,re_colors:t}=Mr(),n=Object.entries(e()).filter(e=>e[1].pinned).map(e=>e[0]);return N(lr,{get class(){return Ta.UserMenu},get children(){return N(Ue,{each:n,children:e=>N(to,{title:e})})}})},to=e=>{let t=()=>e.title,{colors:n,re_colors:r}=Mr();return N(K,{call:e=>{let t=e.currentTarget;t.firstElementChild;let n=t.textContent;Nr().refresh(n)},get class(){return Ta.Entry},style:{"justify-content":`center`},get children(){var e=qa();return V(e,t),e}})},no={Logo:`eSJJNa_Logo`,Page:`eSJJNa_Page`},ro=I(`<div>`);function io(){let e=Rr().props({red:`#A95525`,green:`#87a187`,blue:`#485d6c`,black:`black`,white:`#f0f8ff`,abstract:`#f0f8ff35`,opaque:`#a0c65578`,"grad-start":`rgb(204, 217, 208)`,"grad-end":`rgb(245, 244, 225)`,"grad-rotate":`328deg`}).prefix(!0),t=Rr().selectors(`svg.capra_svg`).props({cap:`var(--black)`,ra:`#649279`}).prefix(!0);return Ir().pin(!0).extend(e).extend(t).make()}function ao(){let e=Rr().props({opaque:`linear-gradient(132deg, #b574447a 0%, #502941 100%)`,abstract:`rgba(73, 126, 172, 0.21)`,black:`#e3e2e4`,white:`#1f212e`,blue:`#9e8776`,green:`#87a187`,red:`#A95525`,"grad-start":`#43001e`,"grad-end":`#000000`,"grad-rotate":`341deg`}).prefix(!0),t=Rr().props({cap:`var(--black)`,ra:`var(--blue)`}).selectors(`svg.capra_svg`).prefix(!0);return Ir().extend(e).extend(t).pin(!0).make()}var{colors:oo,re_colors:so}=Mr();Nr({colors:oo,re_colors:so}).name(`verdant`).register(io()),Nr({colors:oo,re_colors:so}).name(`black-star`).register(ao());var co=e=>{let t=()=>e.children;return(()=>{var e=ro();return V(e,N(K,{link:`/`,get class(){return no.Logo},get children(){return N(Cn,{width:140,height:60})}}),null),V(e,N(Ya,{}),null),V(e,N(Ur,{get children(){return t()}}),null),w(()=>R(e,no.Page)),e})()},lo=new MutationObserver(()=>{Nr().refresh(`verdant`),lo.disconnect()});lo.observe(document.body,{childList:!0,subtree:!0});var uo={App:`gPMrEW_App`,AppRoute:`gPMrEW_AppRoute`},fo=I(`<div>`);yr();var po=()=>{let{user:e,re_user:t}=fn(),n=G(e);return(()=>{var e=fo();return V(e,N(P,{get children(){return[N(F,{get when(){return n.is_non_init()},get children(){return N(La,{})}}),N(F,{get when(){return n.is_logged_out()||n.is_logged_in()},get children(){return N(co,{get children(){return N(Jt,{get children(){return[N(Vt,{path:`/`,component:Cr}),N(Vt,{path:`/auth`,component:li}),N(Vt,{path:`/config`,component:pa}),N(Vt,{path:`/*`,component:Dn}),N(Vt,{path:`/testing`,component:Ha})]}})}})}})]}})),w(()=>R(e,uo.App)),e})()};async function mo(){if(!document.hidden)return;let e=G();if(!e.is_logged_in())return;let t=JSON.stringify({name:e.name(),address:e.address(),access_token:e.access_token()});(await fetch(`auth/cache`,{method:`POST`,credentials:`include`,headers:{"content-type":`application/json`,"content-length":`${t.length}`},keepalive:!0,body:t})).ok}window.addEventListener(`visibilitychange`,mo),Qe(()=>N(po,{}),document.body);