function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{htnc:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a("mrSG"),r=a("lJxs"),i=a("nYR2"),o=a("fXoL"),s=a("I/3d"),c=a("Vaw3"),u=function(){var e=function(){function e(t,a){_classCallCheck(this,e),this.afs=t,this.storage=a,this.imagesCollection=this.afs.collection("images")}return _createClass(e,[{key:"getAllImages",value:function(){return this.imagesCollection.snapshotChanges().pipe(Object(r.a)((function(e){return e.map((function(e){var t=e.payload.doc.data();return Object.assign({id:e.payload.doc.id},t)}))})))}},{key:"getOneImage",value:function(e){return this.afs.doc("images/".concat(e)).valueChanges()}},{key:"deleteImageById",value:function(e,t){return Object(n.__awaiter)(this,void 0,void 0,regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,this.deleteFileImg(t);case 3:return a.abrupt("return",this.imagesCollection.doc(e.id).delete());case 6:a.prev=6,a.t0=a.catch(0),console.log("Error:",a.t0);case 9:case"end":return a.stop()}}),a,this,[[0,6]])})))}},{key:"updateImage",value:function(e,t,a,n){var r=!1;return a?this.uploadImageAddImage(e,a)&&(this.deleteFileImg(n),r=!0):(this.imagesCollection.doc(t).update(e),r=!0),r}},{key:"addImage",value:function(e,t){return!!this.uploadImageAddImage(e,t)}},{key:"saveImage",value:function(e){var t={codigo:e.codigo,descripcion:e.descripcion,fileUrl:this.downloadURL,categoria:e.categoria,fecha:new Date};return e.id?this.imagesCollection.doc(e.id).update(t):this.imagesCollection.add(t)}},{key:"uploadImageAddImage",value:function(e,t){var a=this,n={data:!1,error:""};if(t){this.filePath="images/".concat(t.name);var r=this.storage.ref(this.filePath);return this.storage.upload(this.filePath,t).snapshotChanges().pipe(Object(i.a)((function(){r.getDownloadURL().subscribe((function(t){a.downloadURL=t,a.saveImage(e),n.data=!0}),(function(e){return n.error=e}))}))).subscribe(),n}}},{key:"deleteFileImg",value:function(e){return this.storage.storage.refFromURL(e).delete()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(o.ac(s.a),o.ac(c.a))},e.\u0275prov=o.Jb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()}}]);