YUI.add("series-marker",function(e,r){e.MarkerSeries=e.Base.create("markerSeries",e.CartesianSeries,[e.Plots],{_setStyles:function(r){return r.marker||(r={marker:r}),r=this._parseMarkerStyles(r),e.MarkerSeries.superclass._mergeStyles.apply(this,[r,this._getDefaultStyles()])}},{ATTRS:{type:{value:"marker"}}})},"@VERSION@",{requires:["series-cartesian","series-plot-util"]});