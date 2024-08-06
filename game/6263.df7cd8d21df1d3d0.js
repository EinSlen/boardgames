"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6263],{6263:(Te,H,F)=>{F.d(H,{O:()=>X});var A=F(467),B={};!function T(M,E,c,g){var b=!!(M.Worker&&M.Blob&&M.Promise&&M.OffscreenCanvas&&M.OffscreenCanvasRenderingContext2D&&M.HTMLCanvasElement&&M.HTMLCanvasElement.prototype.transferControlToOffscreen&&M.URL&&M.URL.createObjectURL),m="function"==typeof Path2D&&"function"==typeof DOMMatrix,I=function(){if(!M.OffscreenCanvas)return!1;var r=new OffscreenCanvas(1,1),e=r.getContext("2d");e.fillRect(0,0,1,1);var a=r.transferToImageBitmap();try{e.createPattern(a,"no-repeat")}catch{return!1}return!0}();function R(){}function j(r){var e=E.exports.Promise,a=void 0!==e?e:M.Promise;return"function"==typeof a?new a(r):(r(R,R),null)}var e,a,r,n,o,L,z=function(r,e){return{transform:function(a){if(r)return a;if(e.has(a))return e.get(a);var n=new OffscreenCanvas(a.width,a.height);return n.getContext("2d").drawImage(a,0,0),e.set(a,n),n},clear:function(){e.clear()}}}(I,new Map),D=(r=Math.floor(16.666666666666668),n={},o=0,"function"==typeof requestAnimationFrame&&"function"==typeof cancelAnimationFrame?(e=function(i){var l=Math.random();return n[l]=requestAnimationFrame(function t(s){o===s||o+r-1<s?(o=s,delete n[l],i()):n[l]=requestAnimationFrame(t)}),l},a=function(i){n[i]&&cancelAnimationFrame(n[i])}):(e=function(i){return setTimeout(i,r)},a=function(i){return clearTimeout(i)}),{frame:e,cancel:a}),Y=function(){var r,e,a={};return function(){if(r)return r;if(!c&&b){var o=["var CONFETTI, SIZE = {}, module = {};","("+T.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join("\n");try{r=new Worker(URL.createObjectURL(new Blob([o])))}catch(i){return void 0!==typeof console&&"function"==typeof console.warn&&console.warn("\u{1f38a} Could not load worker",i),null}!function n(o){function i(l,t){o.postMessage({options:l||{},callback:t})}o.init=function(t){var s=t.transferControlToOffscreen();o.postMessage({canvas:s},[s])},o.fire=function(t,s,d){if(e)return i(t,null),e;var f=Math.random().toString(36).slice(2);return e=j(function(h){function v(y){y.data.callback===f&&(delete a[f],o.removeEventListener("message",v),e=null,z.clear(),d(),h())}o.addEventListener("message",v),i(t,f),a[f]=v.bind(null,{data:{callback:f}})})},o.reset=function(){for(var t in o.postMessage({reset:!0}),a)a[t](),delete a[t]}}(r)}return r}}(),ee={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function p(r,e,a){return function re(r,e){return e?e(r):r}(r&&function ae(r){return null!=r}(r[e])?r[e]:ee[e],a)}function te(r){return r<0?0:Math.floor(r)}function ne(r,e){return Math.floor(Math.random()*(e-r))+r}function N(r){return parseInt(r,16)}function oe(r){return r.map(ie)}function ie(r){var e=String(r).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:N(e.substring(0,2)),g:N(e.substring(2,4)),b:N(e.substring(4,6))}}function se(r){r.width=document.documentElement.clientWidth,r.height=document.documentElement.clientHeight}function ue(r){var e=r.getBoundingClientRect();r.width=e.width,r.height=e.height}function he(r){var e=r.angle*(Math.PI/180),a=r.spread*(Math.PI/180);return{x:r.x,y:r.y,wobble:10*Math.random(),wobbleSpeed:Math.min(.11,.1*Math.random()+.05),velocity:.5*r.startVelocity+Math.random()*r.startVelocity,angle2D:-e+(.5*a-Math.random()*a),tiltAngle:(.5*Math.random()+.25)*Math.PI,color:r.color,shape:r.shape,tick:0,totalTicks:r.ticks,decay:r.decay,drift:r.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:3*r.gravity,ovalScalar:.6,scalar:r.scalar,flat:r.flat}}function W(r,e){var h,a=!r,n=!!p(e||{},"resize"),o=!1,i=p(e,"disableForReducedMotion",Boolean),t=b&&p(e||{},"useWorker")?Y():null,s=a?se:ue,d=!(!r||!t||!r.__confetti_initialized),f="function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion)").matches;function v(u,w,C){for(var P=p(u,"particleCount",te),x=p(u,"angle",Number),O=p(u,"spread",Number),S=p(u,"startVelocity",Number),ye=p(u,"decay",Number),Me=p(u,"gravity",Number),be=p(u,"drift",Number),U=p(u,"colors",oe),we=p(u,"ticks",Number),G=p(u,"shapes"),Ce=p(u,"scalar"),Pe=!!p(u,"flat"),Z=function le(r){var e=p(r,"origin",Object);return e.x=p(e,"x",Number),e.y=p(e,"y",Number),e}(u),K=P,V=[],Se=r.width*Z.x,xe=r.height*Z.y;K--;)V.push(he({x:Se,y:xe,angle:x,spread:O,startVelocity:S,color:U[K%U.length],shape:G[ne(0,G.length)],ticks:we,decay:ye,gravity:Me,drift:be,scalar:Ce,flat:Pe}));return h?h.addFettis(V):(h=function ve(r,e,a,n,o){var t,s,i=e.slice(),l=r.getContext("2d"),d=j(function(f){function h(){t=s=null,l.clearRect(0,0,n.width,n.height),z.clear(),o(),f()}t=D.frame(function v(){c&&!(n.width===g.width&&n.height===g.height)&&(n.width=r.width=g.width,n.height=r.height=g.height),!n.width&&!n.height&&(a(r),n.width=r.width,n.height=r.height),l.clearRect(0,0,n.width,n.height),(i=i.filter(function(y){return function fe(r,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var a=e.tick++/e.totalTicks,n=e.x+e.random*e.tiltCos,o=e.y+e.random*e.tiltSin,i=e.wobbleX+e.random*e.tiltCos,l=e.wobbleY+e.random*e.tiltSin;if(r.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-a)+")",r.beginPath(),m&&"path"===e.shape.type&&"string"==typeof e.shape.path&&Array.isArray(e.shape.matrix))r.fill(function me(r,e,a,n,o,i,l){var t=new Path2D(r),s=new Path2D;s.addPath(t,new DOMMatrix(e));var d=new Path2D;return d.addPath(s,new DOMMatrix([Math.cos(l)*o,Math.sin(l)*o,-Math.sin(l)*i,Math.cos(l)*i,a,n])),d}(e.shape.path,e.shape.matrix,e.x,e.y,.1*Math.abs(i-n),.1*Math.abs(l-o),Math.PI/10*e.wobble));else if("bitmap"===e.shape.type){var t=Math.PI/10*e.wobble,s=.1*Math.abs(i-n),d=.1*Math.abs(l-o),f=e.shape.bitmap.width*e.scalar,h=e.shape.bitmap.height*e.scalar,v=new DOMMatrix([Math.cos(t)*s,Math.sin(t)*s,-Math.sin(t)*d,Math.cos(t)*d,e.x,e.y]);v.multiplySelf(new DOMMatrix(e.shape.matrix));var y=r.createPattern(z.transform(e.shape.bitmap),"no-repeat");y.setTransform(v),r.globalAlpha=1-a,r.fillStyle=y,r.fillRect(e.x-f/2,e.y-h/2,f,h),r.globalAlpha=1}else if("circle"===e.shape)r.ellipse?r.ellipse(e.x,e.y,Math.abs(i-n)*e.ovalScalar,Math.abs(l-o)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):function de(r,e,a,n,o,i,l,t,s){r.save(),r.translate(e,a),r.rotate(i),r.scale(n,o),r.arc(0,0,1,l,t,s),r.restore()}(r,e.x,e.y,Math.abs(i-n)*e.ovalScalar,Math.abs(l-o)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if("star"===e.shape)for(var u=Math.PI/2*3,w=4*e.scalar,C=8*e.scalar,P=e.x,x=e.y,O=5,S=Math.PI/O;O--;)P=e.x+Math.cos(u)*C,x=e.y+Math.sin(u)*C,r.lineTo(P,x),u+=S,P=e.x+Math.cos(u)*w,x=e.y+Math.sin(u)*w,r.lineTo(P,x),u+=S;else r.moveTo(Math.floor(e.x),Math.floor(e.y)),r.lineTo(Math.floor(e.wobbleX),Math.floor(o)),r.lineTo(Math.floor(i),Math.floor(l)),r.lineTo(Math.floor(n),Math.floor(e.wobbleY));return r.closePath(),r.fill(),e.tick<e.totalTicks}(l,y)})).length?t=D.frame(v):h()}),s=h});return{addFettis:function(f){return i=i.concat(f),d},canvas:r,promise:d,reset:function(){t&&D.cancel(t),s&&s()}}}(r,V,s,w,C),h.promise)}function y(u){var w=i||p(u,"disableForReducedMotion",Boolean),C=p(u,"zIndex",Number);if(w&&f)return j(function(S){S()});a&&h?r=h.canvas:a&&!r&&(r=function ce(r){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=r,e}(C),document.body.appendChild(r)),n&&!d&&s(r);var P={width:r.width,height:r.height};function x(){if(t){var S={getBoundingClientRect:function(){if(!a)return r.getBoundingClientRect()}};return s(S),void t.postMessage({resize:{width:S.width,height:S.height}})}P.width=P.height=null}function O(){h=null,n&&(o=!1,M.removeEventListener("resize",x)),a&&r&&(document.body.contains(r)&&document.body.removeChild(r),r=null,d=!1)}return t&&!d&&t.init(r),d=!0,t&&(r.__confetti_initialized=!0),n&&!o&&(o=!0,M.addEventListener("resize",x,!1)),t?t.fire(u,P,O):v(u,P,O)}return y.reset=function(){t&&t.reset(),h&&h.reset()},y}function J(){return L||(L=W(null,{useWorker:!0,resize:!0})),L}E.exports=function(){return J().apply(this,arguments)},E.exports.reset=function(){J().reset()},E.exports.create=W,E.exports.shapeFromPath=function pe(r){if(!m)throw new Error("path confetti are not supported in this browser");var e,a;"string"==typeof r?e=r:(e=r.path,a=r.matrix);var n=new Path2D(e),i=document.createElement("canvas").getContext("2d");if(!a){for(var h,v,l=1e3,t=l,s=l,d=0,f=0,y=0;y<l;y+=2)for(var u=0;u<l;u+=2)i.isPointInPath(n,y,u,"nonzero")&&(t=Math.min(t,y),s=Math.min(s,u),d=Math.max(d,y),f=Math.max(f,u));h=d-t,v=f-s;var C=Math.min(10/h,10/v);a=[C,0,0,C,-Math.round(h/2+t)*C,-Math.round(v/2+s)*C]}return{type:"path",path:e,matrix:a}},E.exports.shapeFromText=function ge(r){var e,a=1,n="#000000",o='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';"string"==typeof r?e=r:(e=r.text,a="scalar"in r?r.scalar:a,o="fontFamily"in r?r.fontFamily:o,n="color"in r?r.color:n);var i=10*a,l=i+"px "+o,t=new OffscreenCanvas(i,i),s=t.getContext("2d");s.font=l;var d=s.measureText(e),f=Math.ceil(d.actualBoundingBoxRight+d.actualBoundingBoxLeft),h=Math.ceil(d.actualBoundingBoxAscent+d.actualBoundingBoxDescent),y=d.actualBoundingBoxLeft+2,u=d.actualBoundingBoxAscent+2;f+=4,h+=4,(s=(t=new OffscreenCanvas(f,h)).getContext("2d")).font=l,s.fillStyle=n,s.fillText(e,y,u);var w=1/a;return{type:"bitmap",bitmap:t.transferToImageBitmap(),matrix:[w,0,0,w,-f*w/2,-h*w/2]}}}(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),B,!1);var $=B.exports.create,k=F(3953),Q=F(7604),_=F(8397),q=F(8821);let X=(()=>{var T;class M{constructor(c,g,b){this.alertController=c,this.toastService=g,this.pointsService=b}showStartGamePopup(){var c=this;return(0,A.A)(function*(){return new Promise(function(){var g=(0,A.A)(function*(b){yield(yield c.alertController.create({header:"Qui commence ?",inputs:[{name:"player",type:"radio",label:"Joueur",value:"Joueur",checked:!0},{name:"computer",type:"radio",label:"Ordinateur",value:"Ordinateur"}],buttons:[{text:"Commencer",handler:I=>{b(I)}}]})).present()});return function(b){return g.apply(this,arguments)}}())})()}showGameResultPopup(c,g,b){var m=this;return(0,A.A)(function*(){const I=c.includes("player")?"\u{1f389}":"computer"===c?"\u{1f4a9}":"bomb"===c?"\u{1f4a3}":"\u274c";if(yield(yield m.alertController.create({header:"player"===c?"Bien jou\xe9, Joueur ! Vous avez gagn\xe9.":"computer"===c?"D\xe9sol\xe9, vous avez perdu contre l'ordinateur.":"player1"===c?"Bien jou\xe9, Joueur 1 ! Vous avez gagn\xe9.":"player2"===c?"Bien jou\xe9, Joueur 2 ! Vous avez gagn\xe9.":"bomb"===c?"D\xe9sol\xe9, vous avez perdu":"Match nul.",message:`${I}`,buttons:[{text:"RECOMMENCER",handler:()=>{m.promptDifficultySelection(b)}}]})).present(),c.includes("player"))switch(m.launchConfetti(),g){case"facile":m.pointsService.addPoints(10),m.toastService.show("Points ont \xe9t\xe9 ajout\xe9es","success",10);break;case"medium":m.toastService.show("Points ont \xe9t\xe9 ajout\xe9es","success",20),m.pointsService.addPoints(20);break;case"expert":m.toastService.show("Points ont \xe9t\xe9 ajout\xe9es","success",30),m.pointsService.addPoints(30);break;default:m.toastService.show("Points ont \xe9t\xe9 ajout\xe9es","success"),m.pointsService.addPoints(10)}})()}showGameResultPong(c,g){var b=this;return(0,A.A)(function*(){const m=c.includes("player")?"\u{1f389}":"computer"===c?"\u{1f4a9}":"\u274c";yield(yield b.alertController.create({header:"player"===c?"Bien jou\xe9, Joueur ! Vous avez gagn\xe9.":"computer"===c?"D\xe9sol\xe9, vous avez perdu contre l'ordinateur.":"player1"===c?"Bien jou\xe9, Joueur 1 ! Vous avez gagn\xe9.":"player2"===c?"Bien jou\xe9, Joueur 2 ! Vous avez gagn\xe9.":"Match nul.",message:`${m}`,buttons:[{text:"RECOMMENCER",handler:R=>{g(R)}}]})).present(),c.includes("player")&&(b.launchConfetti(),b.toastService.show("Points ont \xe9t\xe9 ajout\xe9es","success"))})()}promptGameModeSelection(c){var g=this;return(0,A.A)(function*(){yield(yield g.alertController.create({header:"Choisissez le mode de jeu",inputs:[{name:"mode",type:"radio",label:"Joueur contre Joueur",value:"pvp",checked:!0},{name:"mode",type:"radio",label:"Joueur contre Ordinateur",value:"pvc"}],buttons:[{text:"Annuler",role:"cancel"},{text:"OK",handler:m=>{"pvc"===m?g.promptDifficultySelection(I=>c("pvc",I)):c("pvp")}}]})).present()})()}promptDifficultySelection(c){var g=this;return(0,A.A)(function*(){yield(yield g.alertController.create({header:"Choisissez la difficult\xe9",inputs:[{name:"difficulty",type:"radio",label:"Facile",value:"facile",checked:!0},{name:"difficulty",type:"radio",label:"Moyen",value:"medium"},{name:"difficulty",type:"radio",label:"Expert",value:"expert"}],buttons:[{text:"Annuler",role:"cancel"},{text:"OK",handler:m=>{c(m)}}]})).present()})()}launchConfetti(){$(void 0,{resize:!0,useWorker:!0})({particleCount:100,spread:70,origin:{y:.6}})}}return(T=M).\u0275fac=function(c){return new(c||T)(k.KVO(Q.hG),k.KVO(_.f),k.KVO(q.D))},T.\u0275prov=k.jDH({token:T,factory:T.\u0275fac,providedIn:"root"}),M})()}}]);