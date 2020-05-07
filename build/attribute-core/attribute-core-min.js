YUI.add("attribute-core",function(t,e){t.State=function(){this.data={}},t.State.prototype={add:function(t,e,i){var a=this.data[t];a||(a=this.data[t]={}),a[e]=i},addAll:function(t,e){var i,a=this.data[t];for(i in a||(a=this.data[t]={}),e)e.hasOwnProperty(i)&&(a[i]=e[i])},remove:function(t,e){var i=this.data[t];i&&delete i[e]},removeAll:function(e,i){var a;i?t.each(i,function(t,i){this.remove(e,"string"==typeof i?i:t)},this):(a=this.data,e in a&&delete a[e])},get:function(t,e){var i=this.data[t];if(i)return i[e]},getAll:function(t,e){var i,a,s=this.data[t];if(e)a=s;else if(s)for(i in a={},s)s.hasOwnProperty(i)&&(a[i]=s[i]);return a}};var i,a=t.Object,s=t.Lang,r=".",n="value",l="lazyAdd",d="added",h="_bypassProxy",u="initValue",o="lazy";function f(t,e,i){this._yuievt=null,this._initAttrHost(t,e,i)}f.INVALID_VALUE={},i=f.INVALID_VALUE,f._ATTR_CFG=["setter","getter","validator",n,"valueFn","writeOnce","readOnly",l,h],f.protectAttrs=function(e){if(e)for(var i in e=t.merge(e))e.hasOwnProperty(i)&&(e[i]=t.merge(e[i]));return e},f.prototype={_initAttrHost:function(e,i,a){this._state=new t.State,this._initAttrs(e,i,a)},addAttr:function(t,e,i){var a,s,r,h=this._state,u=h.data;return l in(e=e||{})&&(i=e[l]),s=h.get(t,d),i&&!s?h.data[t]={lazy:e,added:!0}:s&&!e.isLazyAdd||((r=n in e)&&(a=e.value,e.value=undefined),e.added=!0,e.initializing=!0,u[t]=e,r&&this.set(t,a),e.initializing=!1),this},attrAdded:function(t){return!!this._state.get(t,d)},get:function(t){return this._getAttr(t)},_isLazyAttr:function(t){return this._state.get(t,o)},_addLazyAttr:function(t,e){var i=this._state;(e=e||i.get(t,o))&&(i.data[t].lazy=undefined,e.isLazyAdd=!0,this.addAttr(t,e))},set:function(t,e,i){return this._setAttr(t,e,i)},_set:function(t,e,i){return this._setAttr(t,e,i,!0)},_setAttr:function(e,i,s,n){var l,d,h,u,o,f,_,c,A,g,y,v=!0,O=this._state,p=this._stateProxy,V=this._tCfgs;if(-1!==e.indexOf(r)&&(h=e,e=(u=e.split(r)).shift()),V&&V[e]&&this._addOutOfOrder(e,V[e]),(l=O.data[e]||{}).lazy&&(l=l.lazy,this._addLazyAttr(e,l)),d=l.value===undefined,p&&e in p&&!l._bypassProxy&&(d=!1),f=l.writeOnce,_=l.initializing,d||n||(f&&(v=!1),l.readOnly&&(v=!1)),_||n||"initOnly"!==f||(v=!1),v){if(d||(o=this.get(e)),u){for(A=c=[o].reduce(function(t,e){return Object.keys(e).forEach(function(i){t[i]=e[i]}),t},{}),g=u.length-1,y=0;y<g&&A;y++)A=A[u[y]];A&&delete A[u[g]],(i=a.setValue(t.clone(c),u,i))===undefined&&(v=!1)}v&&(!this._fireAttrChange||_?this._setAttrVal(e,h,o,i,s,l):this._fireAttrChange(e,h,o,i,s,l))}return this},_addOutOfOrder:function(t,e){var i={};i[t]=e,delete this._tCfgs[t],this._addAttrs(i,this._tVals)},_getAttr:function(t){var e,i,s,n,l=t,d=this._tCfgs;return-1!==t.indexOf(r)&&(t=(e=t.split(r)).shift()),d&&d[t]&&this._addOutOfOrder(t,d[t]),(n=this._state.data[t]||{}).lazy&&(n=n.lazy,this._addLazyAttr(t,n)),s=this._getStateVal(t,n),(i=n.getter)&&!i.call&&(i=this[i]),s=i?i.call(this,s,l):s,s=e?a.getValue(s,e):s},_getStateVal:function(t,e){var i=this._stateProxy;return e||(e=this._state.getAll(t)||{}),i&&t in i&&!e._bypassProxy?i[t]:e.value},_setStateVal:function(t,e){var i=this._stateProxy;i&&t in i&&!this._state.get(t,h)?i[t]=e:this._state.add(t,n,e)},_setAttrVal:function(t,e,a,r,n,l){var d,h,o=!0,f=l||this._state.data[t]||{},_=f.validator,c=f.setter,A=f.initializing,g=this._getStateVal(t,f),y=e||t;return _&&(_.call||(_=this[_]),_&&!(h=_.call(this,r,y,n))&&A&&(r=f.defaultValue,h=!0)),!_||h?(c&&(c.call||(c=this[c]),c&&((d=c.call(this,r,y,n))===i?A?r=f.defaultValue:o=!1:d!==undefined&&(r=d))),o&&(e||r!==g||s.isObject(r)?(u in f||(f.initValue=r),this._setStateVal(t,r)):o=!1)):o=!1,o},setAttrs:function(t,e){return this._setAttrs(t,e)},_setAttrs:function(t,e){var i;for(i in t)t.hasOwnProperty(i)&&this.set(i,t[i],e);return this},getAttrs:function(t){return this._getAttrs(t)},_getAttrs:function(t){var e,i,s,r={},n=!0===t;for(t&&!n||(t=a.keys(this._state.data)),i=0,s=t.length;i<s;i++)e=t[i],n&&this._getStateVal(e)==this._state.get(e,u)||(r[e]=this.get(e));return r},addAttrs:function(t,e,i){return t&&(this._tCfgs=t,this._tVals=e?this._normAttrVals(e):null,this._addAttrs(t,this._tVals,i),this._tCfgs=this._tVals=null),this},_addAttrs:function(t,e,i){var a,s,r,n=this._tCfgs,l=this._tVals;for(a in t)t.hasOwnProperty(a)&&((s=t[a]).defaultValue=s.value,(r=this._getAttrInitVal(a,s,l))!==undefined&&(s.value=r),n[a]&&(n[a]=undefined),this.addAttr(a,s,i))},_protectAttrs:f.protectAttrs,_normAttrVals:function(t){var e,i,a,s,n,l;if(!t)return null;for(l in e={},t)t.hasOwnProperty(l)&&(-1!==l.indexOf(r)?(s=(a=l.split(r)).shift(),(n=(i=i||{})[s]=i[s]||[])[n.length]={path:a,value:t[l]}):e[l]=t[l]);return{simple:e,complex:i}},_getAttrInitVal:function(t,e,i){var s,r,n,l,d,h,u,o=e.value,f=e.valueFn,_=!1,c=e.readOnly;if(!c&&i&&(s=i.simple)&&s.hasOwnProperty(t)&&(o=s[t],_=!0),f&&!_&&(f.call||(f=this[f]),f&&(o=f.call(this,t))),!c&&i&&(r=i.complex)&&r.hasOwnProperty(t)&&o!==undefined&&null!==o)for(n=0,l=(u=r[t]).length;n<l;++n)d=u[n].path,h=u[n].value,a.setValue(o,d,h);return o},_initAttrs:function(e,i,a){e=e||this.constructor.ATTRS;var s=t.Base,r=t.BaseCore,n=s&&t.instanceOf(this,s),l=!n&&r&&t.instanceOf(this,r);!e||n||l||this.addAttrs(t.AttributeCore.protectAttrs(e),i,a)}},t.AttributeCore=f},"@VERSION@",{requires:["oop"]});