"use strict";(self["webpackChunkretter_chess_client"]=self["webpackChunkretter_chess_client"]||[]).push([[661],{9264:(e,t,n)=>{n.d(t,{W:()=>a});var s,a,o=function(e,t,n,s){function a(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function i(e){try{u(s.next(e))}catch(t){o(t)}}function l(e){try{u(s["throw"](e))}catch(t){o(t)}}function u(e){e.done?n(e.value):a(e.value).then(i,l)}u((s=s.apply(e,t||[])).next())}))};(function(e){e["Black"]="black",e["White"]="white"})(s||(s={})),function(e){class t{constructor(e){this._obj=e}static getInstance(e,n){return o(this,void 0,void 0,(function*(){return new t(yield e.getCloudObject(Object.assign(Object.assign({},n),{classId:"User"})))}))}signUp(e,t){return o(this,void 0,void 0,(function*(){return this._obj.call(Object.assign(Object.assign({},t),{method:"signUp",body:e})).then((e=>e.data))}))}signIn(e,t){return o(this,void 0,void 0,(function*(){return this._obj.call(Object.assign(Object.assign({},t),{method:"signIn",body:e})).then((e=>e.data))}))}joinGame(e,t){return o(this,void 0,void 0,(function*(){return this._obj.call(Object.assign(Object.assign({},t),{method:"joinGame",body:e})).then((e=>e.data))}))}leaveGame(e,t){return o(this,void 0,void 0,(function*(){return this._obj.call(Object.assign(Object.assign({},t),{method:"leaveGame",body:e})).then((e=>e.data))}))}}e.User=t;class n{constructor(e){this._obj=e}static getInstance(e,t){return o(this,void 0,void 0,(function*(){return new n(yield e.getCloudObject(Object.assign(Object.assign({},t),{classId:"Game"})))}))}join(e,t){return o(this,void 0,void 0,(function*(){return this._obj.call(Object.assign(Object.assign({},t),{method:"join",body:e})).then((e=>e.data))}))}play(e,t){return o(this,void 0,void 0,(function*(){return this._obj.call(Object.assign(Object.assign({},t),{method:"play",body:e})).then((e=>e.data))}))}leave(e,t){return o(this,void 0,void 0,(function*(){return this._obj.call(Object.assign(Object.assign({},t),{method:"leave",body:e})).then((e=>e.data))}))}}e.Game=n}(a||(a={}))},6661:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W});var s=n(3673);const a={class:"column q-pa-lg"},o={class:"row"},i=(0,s._)("div",{class:"text-h6"},"Sign Up",-1),l={class:"text-subtitle2"},u=(0,s.Uk)(" If you already have an account please "),r=(0,s.Uk)(".. ");function c(e,t,n,c,d,m){const h=(0,s.up)("q-card-section"),p=(0,s.up)("q-input"),v=(0,s.up)("q-btn"),b=(0,s.up)("q-form"),g=(0,s.up)("q-card"),f=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(f,{class:"row items-center justify-evenly"},{default:(0,s.w5)((()=>[(0,s._)("div",a,[(0,s._)("div",o,[(0,s.Wm)(g,{square:"",style:{width:"500px"}},{default:(0,s.w5)((()=>[(0,s.Wm)(h,null,{default:(0,s.w5)((()=>[i,(0,s._)("div",l,[u,(0,s._)("a",{href:"javascript:",onClick:t[0]||(t[0]=(...t)=>e.toSignIn&&e.toSignIn(...t))},"click"),r])])),_:1}),(0,s.Wm)(h,{class:"q-pt-none"},{default:(0,s.w5)((()=>[(0,s.Wm)(b,{onSubmit:e.onSubmit,onReset:e.onReset,class:"q-gutter-md",autofocus:!0},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{type:"text",modelValue:e.name,"onUpdate:modelValue":t[1]||(t[1]=t=>e.name=t),label:"Name","lazy-rules":"",rules:[e=>e&&e.length>0||"Please type your name"]},null,8,["modelValue","rules"]),(0,s.Wm)(p,{type:"email",modelValue:e.email,"onUpdate:modelValue":t[2]||(t[2]=t=>e.email=t),label:"Email","lazy-rules":"",rules:[e=>e&&e.length>0||"Please type your email"]},null,8,["modelValue","rules"]),(0,s.Wm)(p,{type:"password",modelValue:e.password,"onUpdate:modelValue":t[3]||(t[3]=t=>e.password=t),label:"Password","lazy-rules":"",rules:[e=>e&&e.length>0||"Please type your password"]},null,8,["modelValue","rules"]),(0,s._)("div",null,[(0,s.Wm)(v,{label:"Submit",type:"submit",color:"primary"}),(0,s.Wm)(v,{label:"Reset",type:"reset",color:"secondary",flat:"",class:"q-ml-sm"})])])),_:1},8,["onSubmit","onReset"])])),_:1})])),_:1})])])])),_:1})}var d=n(9264),m=n(1959),h=n(8825),p=n(9582),v=function(e,t,n,s){function a(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function i(e){try{u(s.next(e))}catch(t){o(t)}}function l(e){try{u(s["throw"](e))}catch(t){o(t)}}function u(e){e.done?n(e.value):a(e.value).then(i,l)}u((s=s.apply(e,t||[])).next())}))};const b=(0,s.aZ)({name:"PageSignUp",components:{},props:["rio","userProfile"],setup(e){const t=(0,h.Z)(),n=(0,p.tv)();t.loading.hide(),e.userProfile.online&&n.push("/");const s=(0,m.iH)(null),a=(0,m.iH)(null),o=(0,m.iH)(null);return{name:s,email:a,password:o,onSubmit(){var i,l;return v(this,void 0,void 0,(function*(){try{t.loading.show();const i=yield d.W.User.getInstance(e.rio);yield i.signUp({name:s.value,email:a.value,password:o.value}),n.push("/sign-in")}catch(u){t.loading.hide(),t.notify({color:"negative",message:(null===(l=null===(i=null===u||void 0===u?void 0:u.response)||void 0===i?void 0:i.body)||void 0===l?void 0:l.message)||"Something went wrong :("})}}))},onReset(){s.value=null,a.value=null,o.value=null},toSignIn(){n.push("/sign-in")}}}});var g=n(4260),f=n(4379),y=n(151),j=n(5589),w=n(5269),_=n(3037),O=n(6114),U=n(7518),I=n.n(U);const S=(0,g.Z)(b,[["render",c]]),W=S;I()(b,"components",{QPage:f.Z,QCard:y.Z,QCardSection:j.Z,QForm:w.Z,QInput:_.Z,QBtn:O.Z})}}]);