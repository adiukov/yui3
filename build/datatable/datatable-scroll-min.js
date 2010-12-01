YUI.add("datatable-scroll",function(B){var L=B.Do,M=B.Node,J=B.Lang,O=B.UA,C=B.StyleSheet,F=B.ClassNameManager.getClassName,N="datatable",A=F(N,"hd"),E=F(N,"bd"),K=F(N,"liner"),I=F(N,"scrollable"),H='<div class="'+A+'"></div>',D='<div class="'+E+'"></div>',G="<table></table>";function P(){P.superclass.constructor.apply(this,arguments);}B.mix(P,{NS:"scroll",NAME:"dataTableScroll",ATTRS:{width:{value:undefined},height:{value:undefined},scroll:{value:"y"},COLOR_COLUMNFILLER:{value:"#f2f2f2",validator:J.isString,setter:function(Q){if(this._headerContainerNode){this._headerContainerNode.setStyle("backgroundColor",Q);}}}}});B.extend(P,B.Plugin.Base,{_parentTableNode:null,_parentTheadNode:null,_parentTbodyNode:null,_parentMsgNode:null,_parentContainer:null,_bodyContainerNode:null,_headerContainerNode:null,initializer:function(Q){var R=this.get("host");this._parentContainer=R.get("contentBox");this._parentContainer.addClass(I);this._setUpNodes();},_setUpNodes:function(){var Q=this.get("host");this.afterHostMethod("_addTableNode",this._setUpParentTableNode);this.afterHostMethod("_addTheadNode",this._setUpParentTheadNode);this.afterHostMethod("_addTbodyNode",this._setUpParentTbodyNode);this.afterHostMethod("_addMessageNode",this._setUpParentMessageNode);this.beforeHostMethod("renderUI",this._removeCaptionNode);this.afterHostMethod("renderUI",this.renderUI);this.afterHostMethod("syncUI",this.syncUI);if(this.get("scroll")!=="x"){this.afterHostMethod("_attachTheadThNode",this._attachTheadThNode);this.afterHostMethod("_attachTbodyTdNode",this._attachTbodyTdNode);}},_setUpParentTableNode:function(){this._parentTableNode=this.get("host")._tableNode;},_setUpParentTheadNode:function(){this._parentTheadNode=this.get("host")._theadNode;},_setUpParentTbodyNode:function(){this._parentTbodyNode=this.get("host")._tbodyNode;},_setUpParentMessageNode:function(){this._parentMsgNode=this.get("host")._msgNode;},renderUI:function(){this._createBodyContainer();this._createHeaderContainer();this._setContentBoxDimensions();},syncUI:function(){this._syncWidths();this._syncScroll();},_removeCaptionNode:function(){B.DataTable.Base.prototype.createCaption=function(Q){};B.DataTable.Base.prototype._uiSetCaption=function(Q){};},_syncWidths:function(){var R=M.all("#"+this._parentContainer.get("id")+" .yui3-datatable-hd table thead th"),S=M.one("#"+this._parentContainer.get("id")+" .yui3-datatable-bd table .yui3-datatable-data").get("firstChild").get("children"),T,W,Y,V,X,U,Q=O.ie;for(T=0,W=R.size();T<W;T++){X=R.item(T).get("firstChild");U=S.item(T).get("firstChild");if(!Q){Y=X.get("clientWidth");V=S.item(T).get("clientWidth");}else{Y=X.get("offsetWidth");V=S.item(T).get("offsetWidth");}if(Y>V){U.setStyle("width",(Y-20+"px"));}else{if(V>Y){X.setStyle("width",(V-20+"px"));}}}if(Q&&this.get("scroll")==="y"&&this._bodyContainerNode.get("scrollHeight")>this._bodyContainerNode.get("offsetHeight")){this._headerContainerNode.setStyle("width",this._parentContainer.get("offsetWidth")+15+"px");}},_attachTheadThNode:function(R){var Q=R.column.get("width")||"auto";if(Q!=="auto"){R.th.get("firstChild").setStyles({"width":Q,"overflow":"hidden"});}return R;},_attachTbodyTdNode:function(R){var Q=R.column.get("width")||"auto";if(Q!=="auto"){R.td.get("firstChild").setStyles({"width":Q,"overflow":"hidden"});}return R;},_createBodyContainer:function(){var R=M.create(D),Q=B.bind("_onScroll",this);this._bodyContainerNode=R;this._setStylesForTbody();R.appendChild(this._parentTableNode);this._parentContainer.appendChild(R);R.on("scroll",Q);},_createHeaderContainer:function(){var R=M.create(H),Q=M.create(G);this._headerContainerNode=R;this._setStylesForThead();Q.appendChild(this._parentTheadNode);R.appendChild(Q);this._parentContainer.prepend(R);},_setStylesForTbody:function(){var R=this.get("scroll"),Q=this.get("width")||"",T=this.get("height")||"",S=this._bodyContainerNode,U={"width":"","height":T};if(R==="x"){U["overflowY"]="hidden";U["width"]=Q;}else{if(R==="y"){U["overflowX"]="hidden";}else{U["width"]=Q;}}S.setStyles(U);return S;},_setStylesForThead:function(){var R=this.get("scroll"),Q=this.get("width")||"",S=this._headerContainerNode;S.setStyles({"width":Q,"overflow":"hidden"});},_setContentBoxDimensions:function(){if(this.get("scroll")==="y"||(!this.get("width"))){this._parentContainer.setStyle("width","auto");}},_onScroll:function(){this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));},_syncScroll:function(){this._syncScrollX();this._syncScrollY();this._syncScrollOverhang();if(O.opera){this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));if(!this.get("width")){document.body.style+="";}}},_syncScrollY:function(){var Q=this._parentTbodyNode,S=this._bodyContainerNode,R;if(!this.get("width")){R=(S.get("scrollHeight")>S.get("clientHeight"))?(Q.get("parentNode").get("clientWidth")+19)+"px":(Q.get("parentNode").get("clientWidth")+2)+"px";this._parentContainer.setStyle("width",R);}},_syncScrollX:function(){var Q=this._parentTbodyNode,S=this._bodyContainerNode,R;this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));if(!this.get("height")&&(O.ie)){R=(S.get("scrollWidth")>S.get("offsetWidth"))?(Q.get("parentNode").get("offsetHeight")+18)+"px":Q.get("parentNode").get("offsetHeight")+"px";S.setStyle("height",R);}if(Q.get("rows").length===0){this._parentMsgNode.get("parentNode").setStyle("width",this._parentTheadNode.get("parentNode").get("offsetWidth")+"px");}else{this._parentMsgNode.get("parentNode").setStyle("width","");}},_syncScrollOverhang:function(){var Q=this._bodyContainerNode,R=1;if((Q.get("scrollHeight")>Q.get("clientHeight"))||(Q.get("scrollWidth")>Q.get("clientWidth"))){R=18;}this._setOverhangValue(R);},_setOverhangValue:function(R){var T=this.get("host"),V=T.get("columnset").get("definitions"),Q=V.length,U=R+"px solid "+this.get("COLOR_COLUMNFILLER"),S=M.all("#"+this._parentContainer.get("id")+" ."+A+" table thead th");S.item(Q-1).setStyle("borderRight",U);
}});B.namespace("Plugin").DataTableScroll=P;},"@VERSION@",{requires:["plugin","datatable-base","stylesheet"]});