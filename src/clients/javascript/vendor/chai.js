(function(){function a(b){var c=a.modules[b];if(!c){throw new Error('failed to require "'+b+'"')}if(!("exports" in c)&&typeof c.definition==="function"){c.client=c.component=true;c.definition.call(this,c.exports={},c);delete c.definition}return c.exports}a.loader="component";a.helper={};a.helper.semVerSort=function(j,h){var c=j.version.split(".");var f=h.version.split(".");for(var e=0;e<c.length;++e){var d=parseInt(c[e],10);var l=parseInt(f[e],10);if(d===l){var k=c[e].substr((""+d).length);var g=f[e].substr((""+l).length);if(k===""&&g!==""){return 1}if(k!==""&&g===""){return -1}if(k!==""&&g!==""){return k>g?1:-1}continue}else{if(d>l){return 1}else{return -1}}}return 0};a.latest=function(e,n){function h(i){throw new Error('failed to find latest module of "'+i+'"')}var d=/(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;var o=/(.*)~(.*)/;if(!o.test(e)){h(e)}var j=Object.keys(a.modules);var l=[];var g=[];for(var k=0;k<j.length;k++){var c=j[k];if(new RegExp(e+"@").test(c)){var m=c.substr(e.length+1);var b=d.exec(c);if(b!=null){l.push({version:m,name:c})}else{g.push({version:m,name:c})}}}if(l.concat(g).length===0){h(e)}if(l.length>0){var f=l.sort(a.helper.semVerSort).pop().name;if(n===true){return f}return a(f)}var f=g.sort(function(p,i){return p.name>i.name})[0].name;if(n===true){return f}return a(f)};a.modules={};a.register=function(b,c){a.modules[b]={definition:c}};a.define=function(c,b){a.modules[c]={exports:b}};a.register("chaijs~assertion-error@1.0.0",function(c,e){
/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */
;
/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */
;function b(){var h=[].slice.call(arguments);function f(i,j){Object.keys(j).forEach(function(k){if(!~h.indexOf(k)){i[k]=j[k]}})}return function g(){var j=[].slice.call(arguments),l=0,k={};for(;l<j.length;l++){f(k,j[l])}return k}}
/*!
 * Primary Exports
 */
;e.exports=d;function d(i,f,j){var k=b("name","message","stack","constructor","toJSON"),h=k(f||{});this.message=i||"Unspecified AssertionError";this.showDiff=false;for(var g in h){this[g]=h[g]}j=j||arguments.callee;if(j&&Error.captureStackTrace){Error.captureStackTrace(this,j)}}
/*!
 * Inherit from Error.prototype
 */
;d.prototype=Object.create(Error.prototype);
/*!
 * Statically set name
 */
;d.prototype.name="AssertionError";
/*!
 * Ensure correct constructor
 */
;d.prototype.constructor=d;d.prototype.toJSON=function(f){var h=b("constructor","toJSON","stack"),g=h({name:this.name},this);if(false!==f&&this.stack){g.stack=this.stack}return g}});a.register("chaijs~type-detect@0.1.1",function(c,d){
/*!
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;
/*!
 * Primary Exports
 */
;var c=d.exports=f;
/*!
 * Detectable javascript natives
 */
;var b={"[object Array]":"array","[object RegExp]":"regexp","[object Function]":"function","[object Arguments]":"arguments","[object Date]":"date"};function f(g){var h=Object.prototype.toString.call(g);if(b[h]){return b[h]}if(g===null){return"null"}if(g===undefined){return"undefined"}if(g===Object(g)){return"object"}return typeof g}c.Library=e;function e(){this.tests={}}e.prototype.of=f;e.prototype.define=function(g,h){if(arguments.length===1){return this.tests[g]}this.tests[g]=h;return this};e.prototype.test=function(h,g){if(g===f(h)){return true}var i=this.tests[g];if(i&&"regexp"===f(i)){return i.test(h)}else{if(i&&"function"===f(i)){return i(h)}else{throw new ReferenceError('Type test "'+g+'" not defined or invalid.')}}}});a.register("chaijs~deep-eql@0.1.3",function(h,d){
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;
/*!
 * Module dependencies
 */
;var k=a("chaijs~type-detect@0.1.1");
/*!
 * Buffer.isBuffer browser shim
 */
;var g;try{g=a("buffer").Buffer}catch(j){g={};g.isBuffer=function(){return false}}
/*!
 * Primary Export
 */
;d.exports=o;function o(t,s,r){if(b(t,s)){return true}else{if("date"===k(t)){return c(t,s)}else{if("regexp"===k(t)){return q(t,s)}else{if(g.isBuffer(t)){return i(t,s)}else{if("arguments"===k(t)){return f(t,s,r)}else{if(!n(t,s)){return false}else{if(("object"!==k(t)&&"object"!==k(s))&&("array"!==k(t)&&"array"!==k(s))){return b(t,s)}else{return m(t,s,r)}}}}}}}}
/*!
 * Strict (egal) equality test. Ensures that NaN always
 * equals NaN and `-0` does not equal `+0`.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} equal match
 */
;function b(s,r){if(s===r){return s!==0||1/s===1/r}return s!==s&&r!==r}
/*!
 * Compare the types of two given objects and
 * return if they are equal. Note that an Array
 * has a type of `array` (not `object`) and arguments
 * have a type of `arguments` (not `array`/`object`).
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */
;function n(s,r){return k(s)===k(r)}
/*!
 * Compare two Date objects by asserting that
 * the time values are equal using `saveValue`.
 *
 * @param {Date} a
 * @param {Date} b
 * @return {Boolean} result
 */
;function c(s,r){if("date"!==k(r)){return false}return b(s.getTime(),r.getTime())}
/*!
 * Compare two regular expressions by converting them
 * to string and checking for `sameValue`.
 *
 * @param {RegExp} a
 * @param {RegExp} b
 * @return {Boolean} result
 */
;function q(s,r){if("regexp"!==k(r)){return false}return b(s.toString(),r.toString())}
/*!
 * Assert deep equality of two `arguments` objects.
 * Unfortunately, these must be sliced to arrays
 * prior to test to ensure no bad behavior.
 *
 * @param {Arguments} a
 * @param {Arguments} b
 * @param {Array} memoize (optional)
 * @return {Boolean} result
 */
;function f(t,s,r){if("arguments"!==k(s)){return false}t=[].slice.call(t);s=[].slice.call(s);return o(t,s,r)}
/*!
 * Get enumerable properties of a given object.
 *
 * @param {Object} a
 * @return {Array} property names
 */
;function e(r){var t=[];for(var s in r){t.push(s)}return t}
/*!
 * Simple equality for flat iterable objects
 * such as Arrays or Node.js buffers.
 *
 * @param {Iterable} a
 * @param {Iterable} b
 * @return {Boolean} result
 */
;function p(s,r){if(s.length!==r.length){return false}var u=0;var t=true;for(;u<s.length;u++){if(s[u]!==r[u]){t=false;break}}return t}
/*!
 * Extension to `iterableEqual` specifically
 * for Node.js Buffers.
 *
 * @param {Buffer} a
 * @param {Mixed} b
 * @return {Boolean} result
 */
;function i(s,r){if(!g.isBuffer(r)){return false}return p(s,r)}
/*!
 * Block for `objectEqual` ensuring non-existing
 * values don't get in.
 *
 * @param {Mixed} object
 * @return {Boolean} result
 */
;function l(r){return r!==null&&r!==undefined}
/*!
 * Recursively check the equality of two objects.
 * Once basic sameness has been established it will
 * defer to `deepEqual` for each enumerable key
 * in the object.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */
;function m(t,s,r){if(!l(t)||!l(s)){return false}if(t.prototype!==s.prototype){return false}var w;if(r){for(w=0;w<r.length;w++){if((r[w][0]===t&&r[w][1]===s)||(r[w][0]===s&&r[w][1]===t)){return true}}}else{r=[]}try{var y=e(t);var x=e(s)}catch(v){return false}y.sort();x.sort();if(!p(y,x)){return false}r.push([t,s]);var u;for(w=y.length-1;w>=0;w--){u=y[w];if(!o(t[u],s[u],r)){return false}}return true}});a.register("chai",function(b,c){c.exports=a("chai/lib/chai.js")});a.register("chai/lib/chai.js",function(f,c){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;var k=[],f=c.exports={};
/*!
 * Chai version
 */
;f.version="2.3.0";
/*!
 * Assertion Error
 */
;f.AssertionError=a("chaijs~assertion-error@1.0.0");
/*!
 * Utils for plugins (not exported)
 */
;var g=a("chai/lib/chai/utils/index.js");f.use=function(l){if(!~k.indexOf(l)){l(this,g);k.push(l)}return this};
/*!
 * Utility Functions
 */
;f.util=g;
/*!
 * Configuration
 */
;var d=a("chai/lib/chai/config.js");f.config=d;
/*!
 * Primary `Assertion` prototype
 */
;var j=a("chai/lib/chai/assertion.js");f.use(j);
/*!
 * Core Assertions
 */
;var e=a("chai/lib/chai/core/assertions.js");f.use(e);
/*!
 * Expect interface
 */
;var i=a("chai/lib/chai/interface/expect.js");f.use(i);
/*!
 * Should interface
 */
;var h=a("chai/lib/chai/interface/should.js");f.use(h);
/*!
 * Assert interface
 */
;var b=a("chai/lib/chai/interface/assert.js");f.use(b)});a.register("chai/lib/chai/assertion.js",function(b,d){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;var c=a("chai/lib/chai/config.js");d.exports=function(f,h){
/*!
   * Module dependencies.
   */
;var i=f.AssertionError,g=h.flag;
/*!
   * Module export.
   */
;f.Assertion=e;
/*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * @api private
   */
;function e(k,l,j){g(this,"ssfi",j||arguments.callee);g(this,"object",k);g(this,"message",l)}Object.defineProperty(e,"includeStack",{get:function(){console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");return c.includeStack},set:function(j){console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");c.includeStack=j}});Object.defineProperty(e,"showDiff",{get:function(){console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");return c.showDiff},set:function(j){console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");c.showDiff=j}});e.addProperty=function(j,k){h.addProperty(this.prototype,j,k)};e.addMethod=function(j,k){h.addMethod(this.prototype,j,k)};e.addChainableMethod=function(k,l,j){h.addChainableMethod(this.prototype,k,l,j)};e.overwriteProperty=function(j,k){h.overwriteProperty(this.prototype,j,k)};e.overwriteMethod=function(j,k){h.overwriteMethod(this.prototype,j,k)};e.overwriteChainableMethod=function(k,l,j){h.overwriteChainableMethod(this.prototype,k,l,j)};
/*!
   * ### .assert(expression, message, negateMessage, expected, actual)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String or Function} message or function that returns message to display if expression fails
   * @param {String or Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
   * @api private
   */
;e.prototype.assert=function(o,p,n,m,k,j){var l=h.test(this,arguments);if(true!==j){j=false}if(true!==c.showDiff){j=false}if(!l){var p=h.getMessage(this,arguments),q=h.getActual(this,arguments);throw new i(p,{actual:q,expected:m,showDiff:j},(c.includeStack)?this.assert:g(this,"ssfi"))}};
/*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */
;Object.defineProperty(e.prototype,"_obj",{get:function(){return g(this,"object")},set:function(j){g(this,"object",j)}})}});a.register("chai/lib/chai/config.js",function(b,c){c.exports={includeStack:false,showDiff:true,truncateThreshold:40}});a.register("chai/lib/chai/core/assertions.js",function(b,c){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(f,C){var x=f.Assertion,v=Object.prototype.toString,w=C.flag;["to","be","been","is","and","has","have","with","that","which","at","of","same"].forEach(function(D){x.addProperty(D,function(){return this})});x.addProperty("not",function(){w(this,"negate",true)});x.addProperty("deep",function(){w(this,"deep",true)});x.addProperty("any",function(){w(this,"any",true);w(this,"all",false)});x.addProperty("all",function(){w(this,"all",true);w(this,"any",false)});function t(D,G){if(G){w(this,"message",G)}D=D.toLowerCase();var F=w(this,"object"),E=~["a","e","i","o","u"].indexOf(D.charAt(0))?"an ":"a ";this.assert(D===C.type(F),"expected #{this} to be "+E+D,"expected #{this} not to be "+E+D)}x.addChainableMethod("an",t);x.addChainableMethod("a",t);function A(){w(this,"contains",true)}function e(J,I){if(I){w(this,"message",I)}var H=w(this,"object");var F=false;if(C.type(H)==="array"&&C.type(J)==="object"){for(var E in H){if(C.eql(H[E],J)){F=true;break}}}else{if(C.type(J)==="object"){if(!w(this,"negate")){for(var D in J){new x(H).property(D,J[D])}return}var G={};for(var D in J){G[D]=H[D]}F=C.eql(G,J)}else{F=H&&~H.indexOf(J)}}this.assert(F,"expected #{this} to include "+C.inspect(J),"expected #{this} to not include "+C.inspect(J))}x.addChainableMethod("include",e,A);x.addChainableMethod("contain",e,A);x.addChainableMethod("contains",e,A);x.addChainableMethod("includes",e,A);x.addProperty("ok",function(){this.assert(w(this,"object"),"expected #{this} to be truthy","expected #{this} to be falsy")});x.addProperty("true",function(){this.assert(true===w(this,"object"),"expected #{this} to be true","expected #{this} to be false",this.negate?false:true)});x.addProperty("false",function(){this.assert(false===w(this,"object"),"expected #{this} to be false","expected #{this} to be true",this.negate?true:false)});x.addProperty("null",function(){this.assert(null===w(this,"object"),"expected #{this} to be null","expected #{this} not to be null")});x.addProperty("undefined",function(){this.assert(undefined===w(this,"object"),"expected #{this} to be undefined","expected #{this} not to be undefined")});x.addProperty("exist",function(){this.assert(null!=w(this,"object"),"expected #{this} to exist","expected #{this} to not exist")});x.addProperty("empty",function(){var E=w(this,"object"),D=E;if(Array.isArray(E)||"string"===typeof object){D=E.length}else{if(typeof E==="object"){D=Object.keys(E).length}}this.assert(!D,"expected #{this} to be empty","expected #{this} not to be empty")});function d(){var E=w(this,"object"),D=Object.prototype.toString.call(E);this.assert("[object Arguments]"===D,"expected #{this} to be arguments but got "+D,"expected #{this} to not be arguments")}x.addProperty("arguments",d);x.addProperty("Arguments",d);function j(F,E){if(E){w(this,"message",E)}var D=w(this,"object");if(w(this,"deep")){return this.eql(F)}else{this.assert(F===D,"expected #{this} to equal #{exp}","expected #{this} to not equal #{exp}",F,this._obj,true)}}x.addMethod("equal",j);x.addMethod("equals",j);x.addMethod("eq",j);function m(D,E){if(E){w(this,"message",E)}this.assert(C.eql(D,w(this,"object")),"expected #{this} to deeply equal #{exp}","expected #{this} to not deeply equal #{exp}",D,this._obj,true)}x.addMethod("eql",m);x.addMethod("eqls",m);function q(G,F){if(F){w(this,"message",F)}var E=w(this,"object");if(w(this,"doLength")){new x(E,F).to.have.property("length");var D=E.length;this.assert(D>G,"expected #{this} to have a length above #{exp} but got #{act}","expected #{this} to not have a length above #{exp}",G,D)}else{this.assert(E>G,"expected #{this} to be above "+G,"expected #{this} to be at most "+G)}}x.addMethod("above",q);x.addMethod("gt",q);x.addMethod("greaterThan",q);function u(G,F){if(F){w(this,"message",F)}var E=w(this,"object");if(w(this,"doLength")){new x(E,F).to.have.property("length");var D=E.length;this.assert(D>=G,"expected #{this} to have a length at least #{exp} but got #{act}","expected #{this} to have a length below #{exp}",G,D)}else{this.assert(E>=G,"expected #{this} to be at least "+G,"expected #{this} to be below "+G)}}x.addMethod("least",u);x.addMethod("gte",u);function i(G,F){if(F){w(this,"message",F)}var E=w(this,"object");if(w(this,"doLength")){new x(E,F).to.have.property("length");var D=E.length;this.assert(D<G,"expected #{this} to have a length below #{exp} but got #{act}","expected #{this} to not have a length below #{exp}",G,D)}else{this.assert(E<G,"expected #{this} to be below "+G,"expected #{this} to be at least "+G)}}x.addMethod("below",i);x.addMethod("lt",i);x.addMethod("lessThan",i);function r(G,F){if(F){w(this,"message",F)}var E=w(this,"object");if(w(this,"doLength")){new x(E,F).to.have.property("length");var D=E.length;this.assert(D<=G,"expected #{this} to have a length at most #{exp} but got #{act}","expected #{this} to have a length above #{exp}",G,D)}else{this.assert(E<=G,"expected #{this} to be at most "+G,"expected #{this} to be above "+G)}}x.addMethod("most",r);x.addMethod("lte",r);x.addMethod("within",function(I,F,H){if(H){w(this,"message",H)}var G=w(this,"object"),E=I+".."+F;if(w(this,"doLength")){new x(G,H).to.have.property("length");var D=G.length;this.assert(D>=I&&D<=F,"expected #{this} to have a length within "+E,"expected #{this} to not have a length within "+E)}else{this.assert(G>=I&&G<=F,"expected #{this} to be within "+E,"expected #{this} to not be within "+E)}});function n(E,F){if(F){w(this,"message",F)}var D=C.getName(E);this.assert(w(this,"object") instanceof E,"expected #{this} to be an instance of "+D,"expected #{this} to not be an instance of "+D)}x.addMethod("instanceof",n);x.addMethod("instanceOf",n);x.addMethod("property",function(E,F,G){if(G){w(this,"message",G)}var J=!!w(this,"deep"),D=J?"deep property ":"property ",H=w(this,"negate"),I=w(this,"object"),K=J?C.getPathInfo(E,I):null,M=J?K.exists:C.hasProperty(E,I),L=J?K.value:I[E];if(H&&undefined!==F){if(undefined===L){G=(G!=null)?G+": ":"";throw new Error(G+C.inspect(I)+" has no "+D+C.inspect(E))}}else{this.assert(M,"expected #{this} to have a "+D+C.inspect(E),"expected #{this} to not have "+D+C.inspect(E))}if(undefined!==F){this.assert(F===L,"expected #{this} to have a "+D+C.inspect(E)+" of #{exp}, but got #{act}","expected #{this} to not have a "+D+C.inspect(E)+" of #{act}",F,L)}w(this,"object",L)});function k(D,F){if(F){w(this,"message",F)}var E=w(this,"object");this.assert(E.hasOwnProperty(D),"expected #{this} to have own property "+C.inspect(D),"expected #{this} to not have own property "+C.inspect(D))}x.addMethod("ownProperty",k);x.addMethod("haveOwnProperty",k);function z(D,G,H){if(typeof G==="string"){H=G;G=null}if(H){w(this,"message",H)}var F=w(this,"object");var E=Object.getOwnPropertyDescriptor(Object(F),D);if(E&&G){this.assert(C.eql(G,E),"expected the own property descriptor for "+C.inspect(D)+" on #{this} to match "+C.inspect(G)+", got "+C.inspect(E),"expected the own property descriptor for "+C.inspect(D)+" on #{this} to not match "+C.inspect(G),G,E,true)}else{this.assert(E,"expected #{this} to have an own property descriptor for "+C.inspect(D),"expected #{this} to not have an own property descriptor for "+C.inspect(D))}w(this,"object",E)}x.addMethod("ownPropertyDescriptor",z);x.addMethod("haveOwnPropertyDescriptor",z);function h(){w(this,"doLength",true)}function l(G,F){if(F){w(this,"message",F)}var E=w(this,"object");new x(E,F).to.have.property("length");var D=E.length;this.assert(D==G,"expected #{this} to have a length of #{exp} but got #{act}","expected #{this} to not have a length of #{act}",G,D)}x.addChainableMethod("length",l,h);x.addMethod("lengthOf",l);x.addMethod("match",function(D,F){if(F){w(this,"message",F)}var E=w(this,"object");this.assert(D.exec(E),"expected #{this} to match "+D,"expected #{this} not to match "+D)});x.addMethod("string",function(F,E){if(E){w(this,"message",E)}var D=w(this,"object");new x(D,E).is.a("string");this.assert(~D.indexOf(F),"expected #{this} to contain "+C.inspect(F),"expected #{this} to not contain "+C.inspect(F))});function y(O){var E=w(this,"object"),J,K=true,I="keys must be given single argument of Array|Object|String, or multiple String arguments";switch(C.type(O)){case"array":if(arguments.length>1){throw (new Error(I))}break;case"object":if(arguments.length>1){throw (new Error(I))}O=Object.keys(O);break;default:O=Array.prototype.slice.call(arguments)}if(!O.length){throw new Error("keys required")}var N=Object.keys(E),G=O,H=O.length,F=w(this,"any"),L=w(this,"all");if(!F&&!L){L=true}if(F){var D=G.filter(function(P){return ~N.indexOf(P)});K=D.length>0}if(L){K=O.every(function(P){return ~N.indexOf(P)});if(!w(this,"negate")&&!w(this,"contains")){K=K&&O.length==N.length}}if(H>1){O=O.map(function(P){return C.inspect(P)});var M=O.pop();if(L){J=O.join(", ")+", and "+M}if(F){J=O.join(", ")+", or "+M}}else{J=C.inspect(O[0])}J=(H>1?"keys ":"key ")+J;J=(w(this,"contains")?"contain ":"have ")+J;this.assert(K,"expected #{this} to "+J,"expected #{this} to not "+J,G.slice(0).sort(),N.sort(),true)}x.addMethod("keys",y);x.addMethod("key",y);function g(F,K,E){if(E){w(this,"message",E)}var I=w(this,"object");new x(I,E).is.a("function");var M=false,G=null,D=null,L=null;if(arguments.length===0){K=null;F=null}else{if(F&&(F instanceof RegExp||"string"===typeof F)){K=F;F=null}else{if(F&&F instanceof Error){G=F;F=null;K=null}else{if(typeof F==="function"){D=F.prototype.name||F.name;if(D==="Error"&&F!==Error){D=(new F()).name}}else{F=null}}}}try{I()}catch(H){if(G){this.assert(H===G,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}",(G instanceof Error?G.toString():G),(H instanceof Error?H.toString():H));w(this,"object",H);return this}if(F){this.assert(H instanceof F,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp} but #{act} was thrown",D,(H instanceof Error?H.toString():H));if(!K){w(this,"object",H);return this}}var O="object"===C.type(H)&&"message" in H?H.message:""+H;if((O!=null)&&K&&K instanceof RegExp){this.assert(K.exec(O),"expected #{this} to throw error matching #{exp} but got #{act}","expected #{this} to throw error not matching #{exp}",K,O);w(this,"object",H);return this}else{if((O!=null)&&K&&"string"===typeof K){this.assert(~O.indexOf(K),"expected #{this} to throw error including #{exp} but got #{act}","expected #{this} to throw error not including #{act}",K,O);w(this,"object",H);return this}else{M=true;L=H}}}var N="",J=D!==null?D:G?"#{exp}":"an error";if(M){N=" but #{act} was thrown"}this.assert(M===true,"expected #{this} to throw "+J+N,"expected #{this} to not throw "+J+N,(G instanceof Error?G.toString():G),(L instanceof Error?L.toString():L));w(this,"object",L)}x.addMethod("throw",g);x.addMethod("throws",g);x.addMethod("Throw",g);x.addMethod("respondTo",function(H,G){if(G){w(this,"message",G)}var F=w(this,"object"),D=w(this,"itself"),E=("function"===C.type(F)&&!D)?F.prototype[H]:F[H];this.assert("function"===typeof E,"expected #{this} to respond to "+C.inspect(H),"expected #{this} to not respond to "+C.inspect(H))});x.addProperty("itself",function(){w(this,"itself",true)});x.addMethod("satisfy",function(F,G){if(G){w(this,"message",G)}var E=w(this,"object");var D=F(E);this.assert(D,"expected #{this} to satisfy "+C.objDisplay(F),"expected #{this} to not satisfy"+C.objDisplay(F),this.negate?false:true,D)});x.addMethod("closeTo",function(D,G,F){if(F){w(this,"message",F)}var E=w(this,"object");new x(E,F).is.a("number");if(C.type(D)!=="number"||C.type(G)!=="number"){throw new Error("the arguments to closeTo must be numbers")}this.assert(Math.abs(E-D)<=G,"expected #{this} to be close to "+D+" +/- "+G,"expected #{this} not to be close to "+D+" +/- "+G)});function p(F,D,E){return F.every(function(G){if(!E){return D.indexOf(G)!==-1}return D.some(function(H){return E(G,H)})})}x.addMethod("members",function(F,G){if(G){w(this,"message",G)}var E=w(this,"object");new x(E).to.be.an("array");new x(F).to.be.an("array");var D=w(this,"deep")?C.eql:undefined;if(w(this,"contains")){return this.assert(p(F,E,D),"expected #{this} to be a superset of #{act}","expected #{this} to not be a superset of #{act}",E,F)}this.assert(p(E,F,D)&&p(F,E,D),"expected #{this} to have the same members as #{act}","expected #{this} to not have the same members as #{act}",E,F)});function s(E,H,G){if(G){w(this,"message",G)}var F=w(this,"object");new x(E,G).to.have.property(H);new x(F).is.a("function");var D=E[H];F();this.assert(D!==E[H],"expected ."+H+" to change","expected ."+H+" to not change")}x.addChainableMethod("change",s);x.addChainableMethod("changes",s);function B(E,H,G){if(G){w(this,"message",G)}var F=w(this,"object");new x(E,G).to.have.property(H);new x(F).is.a("function");var D=E[H];F();this.assert(E[H]-D>0,"expected ."+H+" to increase","expected ."+H+" to not increase")}x.addChainableMethod("increase",B);x.addChainableMethod("increases",B);function o(E,H,G){if(G){w(this,"message",G)}var F=w(this,"object");new x(E,G).to.have.property(H);new x(F).is.a("function");var D=E[H];F();this.assert(E[H]-D<0,"expected ."+H+" to decrease","expected ."+H+" to not decrease")}x.addChainableMethod("decrease",o);x.addChainableMethod("decreases",o)}});a.register("chai/lib/chai/interface/assert.js",function(b,c){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(h,g){
/*!
   * Chai dependencies.
   */
;var d=h.Assertion,f=g.flag;
/*!
   * Module export.
   */
;var e=h.assert=function(l,k){var j=new d(null,null,h.assert);j.assert(l,k,"[ negation message unavailable ]")};e.fail=function(m,l,k,j){k=k||"assert.fail()";throw new h.AssertionError(k,{actual:m,expected:l,operator:j},e.fail)};e.ok=function(k,j){new d(k,j).is.ok};e.notOk=function(k,j){new d(k,j).is.not.ok};e.equal=function(j,l,k){var m=new d(j,k,e.equal);m.assert(l==f(m,"object"),"expected #{this} to equal #{exp}","expected #{this} to not equal #{act}",l,j)};e.notEqual=function(j,l,k){var m=new d(j,k,e.notEqual);m.assert(l!=f(m,"object"),"expected #{this} to not equal #{exp}","expected #{this} to equal #{act}",l,j)};e.strictEqual=function(j,l,k){new d(j,k).to.equal(l)};e.notStrictEqual=function(j,l,k){new d(j,k).to.not.equal(l)};e.deepEqual=function(j,l,k){new d(j,k).to.eql(l)};e.notDeepEqual=function(j,l,k){new d(j,k).to.not.eql(l)};e.isAbove=function(l,j,k){new d(l,k).to.be.above(j)};e.isBelow=function(l,j,k){new d(l,k).to.be.below(j)};e.isTrue=function(k,j){new d(k,j).is["true"]};e.isFalse=function(k,j){new d(k,j).is["false"]};e.isNull=function(k,j){new d(k,j).to.equal(null)};e.isNotNull=function(k,j){new d(k,j).to.not.equal(null)};e.isUndefined=function(k,j){new d(k,j).to.equal(undefined)};e.isDefined=function(k,j){new d(k,j).to.not.equal(undefined)};e.isFunction=function(k,j){new d(k,j).to.be.a("function")};e.isNotFunction=function(k,j){new d(k,j).to.not.be.a("function")};e.isObject=function(k,j){new d(k,j).to.be.a("object")};e.isNotObject=function(k,j){new d(k,j).to.not.be.a("object")};e.isArray=function(k,j){new d(k,j).to.be.an("array")};e.isNotArray=function(k,j){new d(k,j).to.not.be.an("array")};e.isString=function(k,j){new d(k,j).to.be.a("string")};e.isNotString=function(k,j){new d(k,j).to.not.be.a("string")};e.isNumber=function(k,j){new d(k,j).to.be.a("number")};e.isNotNumber=function(k,j){new d(k,j).to.not.be.a("number")};e.isBoolean=function(k,j){new d(k,j).to.be.a("boolean")};e.isNotBoolean=function(k,j){new d(k,j).to.not.be.a("boolean")};e.typeOf=function(l,j,k){new d(l,k).to.be.a(j)};e.notTypeOf=function(l,j,k){new d(l,k).to.not.be.a(j)};e.instanceOf=function(l,j,k){new d(l,k).to.be.instanceOf(j)};e.notInstanceOf=function(l,j,k){new d(l,k).to.not.be.instanceOf(j)};e.include=function(l,j,k){new d(l,k,e.include).include(j)};e.notInclude=function(l,j,k){new d(l,k,e.notInclude).not.include(j)};e.match=function(l,j,k){new d(l,k).to.match(j)};e.notMatch=function(l,j,k){new d(l,k).to.not.match(j)};e.property=function(j,l,k){new d(j,k).to.have.property(l)};e.notProperty=function(j,l,k){new d(j,k).to.not.have.property(l)};e.deepProperty=function(j,l,k){new d(j,k).to.have.deep.property(l)};e.notDeepProperty=function(j,l,k){new d(j,k).to.not.have.deep.property(l)};e.propertyVal=function(j,m,l,k){new d(j,k).to.have.property(m,l)};e.propertyNotVal=function(j,m,l,k){new d(j,k).to.not.have.property(m,l)};e.deepPropertyVal=function(j,m,l,k){new d(j,k).to.have.deep.property(m,l)};e.deepPropertyNotVal=function(j,m,l,k){new d(j,k).to.not.have.deep.property(m,l)};e.lengthOf=function(l,j,k){new d(l,k).to.have.length(j)};e.Throw=function(m,j,k,n){if("string"===typeof j||j instanceof RegExp){k=j;j=null}var l=new d(m,n).to.Throw(j,k);return f(l,"object")};e.doesNotThrow=function(k,j,l){if("string"===typeof j){l=j;j=null}new d(k,l).to.not.Throw(j)};e.operator=function(n,j,l,m){var k;switch(j){case"==":k=n==l;break;case"===":k=n===l;break;case">":k=n>l;break;case">=":k=n>=l;break;case"<":k=n<l;break;case"<=":k=n<=l;break;case"!=":k=n!=l;break;case"!==":k=n!==l;break;default:throw new Error('Invalid operator "'+j+'"')}var o=new d(k,m);o.assert(true===f(o,"object"),"expected "+g.inspect(n)+" to be "+j+" "+g.inspect(l),"expected "+g.inspect(n)+" to not be "+j+" "+g.inspect(l))};e.closeTo=function(j,l,m,k){new d(j,k).to.be.closeTo(l,m)};e.sameMembers=function(k,j,l){new d(k,l).to.have.same.members(j)};e.sameDeepMembers=function(k,j,l){new d(k,l).to.have.same.deep.members(j)};e.includeMembers=function(j,k,l){new d(j,l).to.include.members(k)};e.changes=function(j,k,l){new d(j).to.change(k,l)};e.doesNotChange=function(j,k,l){new d(j).to.not.change(k,l)};e.increases=function(j,k,l){new d(j).to.increase(k,l)};e.doesNotIncrease=function(j,k,l){new d(j).to.not.increase(k,l)};e.decreases=function(j,k,l){new d(j).to.decrease(k,l)};e.doesNotDecrease=function(j,k,l){new d(j).to.not.decrease(k,l)};
/*!
   * Undocumented / untested
   */
;e.ifError=function(k,j){new d(k,j).to.not.be.ok};
/*!
   * Aliases.
   */
(function i(k,j){e[j]=e[k];return i})("Throw","throw")("Throw","throws")}});a.register("chai/lib/chai/interface/expect.js",function(b,c){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(e,d){e.expect=function(g,f){return new e.Assertion(g,f)};e.expect.fail=function(i,h,g,f){g=g||"expect.fail()";throw new e.AssertionError(g,{actual:i,expected:h,operator:f},e.expect.fail)}}});a.register("chai/lib/chai/interface/should.js",function(b,c){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(f,e){var d=f.Assertion;function g(){function j(){if(this instanceof String||this instanceof Number||this instanceof Boolean){return new d(this.valueOf(),null,j)}return new d(this,null,j)}function i(k){Object.defineProperty(this,"should",{value:k,enumerable:true,configurable:true,writable:true})}Object.defineProperty(Object.prototype,"should",{set:i,get:j,configurable:true});var h={};h.fail=function(n,m,l,k){l=l||"should.fail()";throw new f.AssertionError(l,{actual:n,expected:m,operator:k},h.fail)};h.equal=function(l,k,m){new d(l,m).to.equal(k)};h.Throw=function(m,k,l,n){new d(m,n).to.Throw(k,l)};h.exist=function(l,k){new d(l,k).to.exist};h.not={};h.not.equal=function(l,k,m){new d(l,m).to.not.equal(k)};h.not.Throw=function(m,k,l,n){new d(m,n).to.not.Throw(k,l)};h.not.exist=function(l,k){new d(l,k).to.not.exist};h["throw"]=h.Throw;h.not["throw"]=h.not.Throw;return h}f.should=g;f.Should=g}});a.register("chai/lib/chai/utils/addChainableMethod.js",function(f,c){
/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;
/*!
 * Module dependencies
 */
;var g=a("chai/lib/chai/utils/transferFlags.js");var h=a("chai/lib/chai/utils/flag.js");var d=a("chai/lib/chai/config.js");
/*!
 * Module variables
 */
;var e="__proto__" in Object;var b=/^(?:length|name|arguments|caller)$/;var j=Function.prototype.call,i=Function.prototype.apply;c.exports=function(k,m,o,l){if(typeof l!=="function"){l=function(){}}var n={method:o,chainingBehavior:l};if(!k.__methods){k.__methods={}}k.__methods[m]=n;Object.defineProperty(k,m,{get:function(){n.chainingBehavior.call(this);var p=function p(){var t=h(this,"ssfi");if(t&&d.includeStack===false){h(this,"ssfi",p)}var s=n.method.apply(this,arguments);return s===undefined?this:s};if(e){var q=p.__proto__=Object.create(this);q.call=j;q.apply=i}else{var r=Object.getOwnPropertyNames(k);r.forEach(function(t){if(!b.test(t)){var s=Object.getOwnPropertyDescriptor(k,t);Object.defineProperty(p,t,s)}})}g(this,p);return p},configurable:true})}});a.register("chai/lib/chai/utils/addMethod.js",function(c,e){
/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;var d=a("chai/lib/chai/config.js");var b=a("chai/lib/chai/utils/flag.js");e.exports=function(f,g,h){f[g]=function(){var j=b(this,"ssfi");if(j&&d.includeStack===false){b(this,"ssfi",f[g])}var i=h.apply(this,arguments);return i===undefined?this:i}}});a.register("chai/lib/chai/utils/addProperty.js",function(b,c){
/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(e,f,d){Object.defineProperty(e,f,{get:function(){var g=d.call(this);return g===undefined?this:g},configurable:true})}});a.register("chai/lib/chai/utils/flag.js",function(b,c){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(g,e,f){var d=g.__flags||(g.__flags=Object.create(null));if(arguments.length===3){d[e]=f}else{return d[e]}}});a.register("chai/lib/chai/utils/getActual.js",function(b,c){
/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(e,d){return d.length>4?d[4]:e._obj}});a.register("chai/lib/chai/utils/getEnumerableProperties.js",function(b,c){
/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function d(g){var e=[];for(var f in g){e.push(f)}return e}});a.register("chai/lib/chai/utils/getMessage.js",function(d,e){
/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;
/*!
 * Module dependancies
 */
;var c=a("chai/lib/chai/utils/flag.js"),f=a("chai/lib/chai/utils/getActual.js"),g=a("chai/lib/chai/utils/inspect.js"),b=a("chai/lib/chai/utils/objDisplay.js");e.exports=function(k,h){var j=c(k,"negate"),n=c(k,"object"),i=h[3],o=f(k,h),m=j?h[2]:h[1],l=c(k,"message");if(typeof m==="function"){m=m()}m=m||"";m=m.replace(/#{this}/g,b(n)).replace(/#{act}/g,b(o)).replace(/#{exp}/g,b(i));return l?l+": "+m:m}});a.register("chai/lib/chai/utils/getName.js",function(b,c){
/*!
 * Chai - getName utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(e){if(e.name){return e.name}var d=/^\s?function ([^(]*)\(/.exec(e);return d&&d[1]?d[1]:""}});a.register("chai/lib/chai/utils/getPathValue.js",function(b,c){
/*!
 * Chai - getPathValue utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */
;var d=a("chai/lib/chai/utils/getPathInfo.js");c.exports=function(g,f){var e=d(g,f);return e.value}});a.register("chai/lib/chai/utils/getPathInfo.js",function(d,f){
/*!
 * Chai - getPathInfo utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;var c=a("chai/lib/chai/utils/hasProperty.js");f.exports=function g(l,k){var h=e(l),i=h[h.length-1];var j={parent:h.length>1?b(h,k,h.length-1):k,name:i.p||i.i,value:b(h,k)};j.exists=c(j.name,j.parent);return j};
/*!
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `_getPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be as near infinitely deep and nested
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */
;function e(i){var j=i.replace(/([^\\])\[/g,"$1.["),h=j.match(/(\\\.|[^.]+?)+/g);return h.map(function(l){var k=/^\[(\d+)\]$/,m=k.exec(l);if(m){return{i:parseFloat(m[1])}}else{return{p:l.replace(/\\([.\[\]])/g,"$1")}}})}
/*!
 * ## _getPathValue(parsed, obj)
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(parsed, obj);
 *
 * @param {Object} parsed definition from `parsePath`.
 * @param {Object} object to search against
 * @param {Number} object to search against
 * @returns {Object|Undefined} value
 * @api private
 */
;function b(j,q,m){var p=q,o;m=(m===undefined?j.length:m);for(var n=0,h=m;n<h;n++){var k=j[n];if(p){if("undefined"!==typeof k.p){p=p[k.p]}else{if("undefined"!==typeof k.i){p=p[k.i]}}if(n==(h-1)){o=p}}else{o=undefined}}return o}});a.register("chai/lib/chai/utils/hasProperty.js",function(c,d){
/*!
 * Chai - hasProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;var e=a("chai/lib/chai/utils/type.js");var f={number:Number,string:String};d.exports=function b(g,i){var h=e(i);if(h==="null"||h==="undefined"){return false}if(f[h]&&typeof i!=="object"){i=new f[h](i)}return g in i}});a.register("chai/lib/chai/utils/getProperties.js",function(b,c){
/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function d(f){var e=Object.getOwnPropertyNames(subject);function g(i){if(e.indexOf(i)===-1){e.push(i)}}var h=Object.getPrototypeOf(subject);while(h!==null){Object.getOwnPropertyNames(h).forEach(g);h=Object.getPrototypeOf(h)}return e}});a.register("chai/lib/chai/utils/index.js",function(b,c){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;
/*!
 * Main exports
 */
;var b=c.exports={};
/*!
 * test utility
 */
;b.test=a("chai/lib/chai/utils/test.js");
/*!
 * type utility
 */
;b.type=a("chai/lib/chai/utils/type.js");
/*!
 * message utility
 */
;b.getMessage=a("chai/lib/chai/utils/getMessage.js");
/*!
 * actual utility
 */
;b.getActual=a("chai/lib/chai/utils/getActual.js");
/*!
 * Inspect util
 */
;b.inspect=a("chai/lib/chai/utils/inspect.js");
/*!
 * Object Display util
 */
;b.objDisplay=a("chai/lib/chai/utils/objDisplay.js");
/*!
 * Flag utility
 */
;b.flag=a("chai/lib/chai/utils/flag.js");
/*!
 * Flag transferring utility
 */
;b.transferFlags=a("chai/lib/chai/utils/transferFlags.js");
/*!
 * Deep equal utility
 */
;b.eql=a("chaijs~deep-eql@0.1.3");
/*!
 * Deep path value
 */
;b.getPathValue=a("chai/lib/chai/utils/getPathValue.js");
/*!
 * Deep path info
 */
;b.getPathInfo=a("chai/lib/chai/utils/getPathInfo.js");
/*!
 * Check if a property exists
 */
;b.hasProperty=a("chai/lib/chai/utils/hasProperty.js");
/*!
 * Function name
 */
;b.getName=a("chai/lib/chai/utils/getName.js");
/*!
 * add Property
 */
;b.addProperty=a("chai/lib/chai/utils/addProperty.js");
/*!
 * add Method
 */
;b.addMethod=a("chai/lib/chai/utils/addMethod.js");
/*!
 * overwrite Property
 */
;b.overwriteProperty=a("chai/lib/chai/utils/overwriteProperty.js");
/*!
 * overwrite Method
 */
;b.overwriteMethod=a("chai/lib/chai/utils/overwriteMethod.js");
/*!
 * Add a chainable method
 */
;b.addChainableMethod=a("chai/lib/chai/utils/addChainableMethod.js");
/*!
 * Overwrite chainable method
 */
;b.overwriteChainableMethod=a("chai/lib/chai/utils/overwriteChainableMethod.js")});a.register("chai/lib/chai/utils/inspect.js",function(s,b){var j=a("chai/lib/chai/utils/getName.js");var l=a("chai/lib/chai/utils/getProperties.js");var c=a("chai/lib/chai/utils/getEnumerableProperties.js");b.exports=r;function r(w,v,x,u){var t={showHidden:v,seen:[],stylize:function(y){return y}};return e(t,w,(typeof x==="undefined"?2:x))}var k=function(t){if(typeof HTMLElement==="object"){return t instanceof HTMLElement}else{return t&&typeof t==="object"&&t.nodeType===1&&typeof t.nodeName==="string"}};function e(J,H,E){if(H&&typeof H.inspect==="function"&&H.inspect!==s.inspect&&!(H.constructor&&H.constructor.prototype===H)){var F=H.inspect(E);if(typeof F!=="string"){F=e(J,F,E)}return F}var C=i(J,H);if(C){return C}if(k(H)){if("outerHTML" in H){return H.outerHTML}else{try{if(document.xmlVersion){var t=new XMLSerializer();return t.serializeToString(H)}else{var G="http://www.w3.org/1999/xhtml";var w=document.createElementNS(G,"_");w.appendChild(H.cloneNode(false));html=w.innerHTML.replace("><",">"+H.innerHTML+"<");w.innerHTML="";return html}}catch(A){}}}var v=c(H);var I=J.showHidden?l(H):v;if(I.length===0||(n(H)&&((I.length===1&&I[0]==="stack")||(I.length===2&&I[0]==="description"&&I[1]==="stack")))){if(typeof H==="function"){var u=j(H);var B=u?": "+u:"";return J.stylize("[Function"+B+"]","special")}if(m(H)){return J.stylize(RegExp.prototype.toString.call(H),"regexp")}if(q(H)){return J.stylize(Date.prototype.toUTCString.call(H),"date")}if(n(H)){return f(H)}}var x="",D=false,z=["{","}"];if(h(H)){D=true;z=["[","]"]}if(typeof H==="function"){var u=j(H);var B=u?": "+u:"";x=" [Function"+B+"]"}if(m(H)){x=" "+RegExp.prototype.toString.call(H)}if(q(H)){x=" "+Date.prototype.toUTCString.call(H)}if(n(H)){return f(H)}if(I.length===0&&(!D||H.length==0)){return z[0]+x+z[1]}if(E<0){if(m(H)){return J.stylize(RegExp.prototype.toString.call(H),"regexp")}else{return J.stylize("[Object]","special")}}J.seen.push(H);var y;if(D){y=p(J,H,E,v,I)}else{y=I.map(function(K){return d(J,H,E,v,K,D)})}J.seen.pop();return o(y,x,z)}function i(t,u){switch(typeof u){case"undefined":return t.stylize("undefined","undefined");case"string":var v="'"+JSON.stringify(u).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(v,"string");case"number":if(u===0&&(1/u)===-Infinity){return t.stylize("-0","number")}return t.stylize(""+u,"number");case"boolean":return t.stylize(""+u,"boolean")}if(u===null){return t.stylize("null","null")}}function f(t){return"["+Error.prototype.toString.call(t)+"]"}function p(u,z,x,A,y){var v=[];for(var w=0,t=z.length;w<t;++w){if(Object.prototype.hasOwnProperty.call(z,String(w))){v.push(d(u,z,x,A,String(w),true))}else{v.push("")}}y.forEach(function(B){if(!B.match(/^\d+$/)){v.push(d(u,z,x,A,B,true))}});return v}function d(t,x,w,y,v,A){var u,z;if(x.__lookupGetter__){if(x.__lookupGetter__(v)){if(x.__lookupSetter__(v)){z=t.stylize("[Getter/Setter]","special")}else{z=t.stylize("[Getter]","special")}}else{if(x.__lookupSetter__(v)){z=t.stylize("[Setter]","special")}}}if(y.indexOf(v)<0){u="["+v+"]"}if(!z){if(t.seen.indexOf(x[v])<0){if(w===null){z=e(t,x[v],null)}else{z=e(t,x[v],w-1)}if(z.indexOf("\n")>-1){if(A){z=z.split("\n").map(function(B){return"  "+B}).join("\n").substr(2)}else{z="\n"+z.split("\n").map(function(B){return"   "+B}).join("\n")}}}else{z=t.stylize("[Circular]","special")}}if(typeof u==="undefined"){if(A&&v.match(/^\d+$/)){return z}u=JSON.stringify(""+v);if(u.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){u=u.substr(1,u.length-2);u=t.stylize(u,"name")}else{u=u.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");u=t.stylize(u,"string")}}return u+": "+z}function o(t,v,x){var w=0;var u=t.reduce(function(y,z){w++;if(z.indexOf("\n")>=0){w++}return y+z.length+1},0);if(u>60){return x[0]+(v===""?"":v+"\n ")+" "+t.join(",\n  ")+" "+x[1]}return x[0]+v+" "+t.join(", ")+" "+x[1]}function h(t){return Array.isArray(t)||(typeof t==="object"&&g(t)==="[object Array]")}function m(t){return typeof t==="object"&&g(t)==="[object RegExp]"}function q(t){return typeof t==="object"&&g(t)==="[object Date]"}function n(t){return typeof t==="object"&&g(t)==="[object Error]"}function g(t){return Object.prototype.toString.call(t)}});a.register("chai/lib/chai/utils/objDisplay.js",function(b,d){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;
/*!
 * Module dependancies
 */
;var e=a("chai/lib/chai/utils/inspect.js");var c=a("chai/lib/chai/config.js");d.exports=function(i){var j=e(i),f=Object.prototype.toString.call(i);if(c.truncateThreshold&&j.length>=c.truncateThreshold){if(f==="[object Function]"){return !i.name||i.name===""?"[Function]":"[Function: "+i.name+"]"}else{if(f==="[object Array]"){return"[ Array("+i.length+") ]"}else{if(f==="[object Object]"){var g=Object.keys(i),h=g.length>2?g.splice(0,2).join(", ")+", ...":g.join(", ");return"{ Object ("+h+") }"}else{return j}}}}else{return j}}});a.register("chai/lib/chai/utils/overwriteMethod.js",function(b,c){
/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(d,f,h){var e=d[f],g=function(){return this};if(e&&"function"===typeof e){g=e}d[f]=function(){var i=h(g).apply(this,arguments);return i===undefined?this:i}}});a.register("chai/lib/chai/utils/overwriteProperty.js",function(b,c){
/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(e,f,d){var g=Object.getOwnPropertyDescriptor(e,f),h=function(){};if(g&&"function"===typeof g.get){h=g.get}Object.defineProperty(e,f,{get:function(){var i=d(h).call(this);return i===undefined?this:i},configurable:true})}});a.register("chai/lib/chai/utils/overwriteChainableMethod.js",function(b,c){
/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(e,h,j,g){var i=e.__methods[h];var d=i.chainingBehavior;i.chainingBehavior=function(){var k=g(d).call(this);return k===undefined?this:k};var f=i.method;i.method=function(){var k=j(f).apply(this,arguments);return k===undefined?this:k}}});a.register("chai/lib/chai/utils/test.js",function(c,d){
/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;
/*!
 * Module dependancies
 */
;var b=a("chai/lib/chai/utils/flag.js");d.exports=function(h,e){var g=b(h,"negate"),f=e[0];return g?!f:f}});a.register("chai/lib/chai/utils/transferFlags.js",function(b,c){
/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;c.exports=function(e,h,d){var g=e.__flags||(e.__flags=Object.create(null));if(!h.__flags){h.__flags=Object.create(null)}d=arguments.length===3?d:true;for(var f in g){if(d||(f!=="object"&&f!=="ssfi"&&f!="message")){h.__flags[f]=g[f]}}}});a.register("chai/lib/chai/utils/type.js",function(c,d){
/*!
 * Chai - type utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
;
/*!
 * Detectable javascript natives
 */
;var b={"[object Arguments]":"arguments","[object Array]":"array","[object Date]":"date","[object Function]":"function","[object Number]":"number","[object RegExp]":"regexp","[object String]":"string"};d.exports=function(e){var f=Object.prototype.toString.call(e);if(b[f]){return b[f]}if(e===null){return"null"}if(e===undefined){return"undefined"}if(e===Object(e)){return"object"}return typeof e}});if(typeof exports=="object"){module.exports=a("chai")}else{if(typeof define=="function"&&define.amd){define("chai",[],function(){return a("chai")})}else{(this||window)["chai"]=a("chai")}}})();