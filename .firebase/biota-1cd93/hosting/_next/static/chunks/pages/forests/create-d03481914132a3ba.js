(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[839],{79041:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/forests/create",function(){return n(94690)}])},12874:function(e,t,n){"use strict";n.d(t,{X:function(){return r}});var i=n(85893);n(67294);var a=n(31248);function r(e){return(0,i.jsx)(a.J,{...e,children:(0,i.jsx)("path",{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"})})}},38618:function(e,t,n){"use strict";var i=n(85893),a=n(23125),r=n(86010),o=n(67294),l=n(82082);t.Z=function(e){let{value:t="",onChange:n,wrapperClassName:c,className:s,isValid:u=!0,validator:d,validatorWaitFor:f=750,icon:h,loading:p,tabIndex:m,disabled:N,inputRef:g,...x}=e,[y,w]=o.useState(!1),b=d&&(0,l.N)(d,f);async function T(e){let{currentTarget:{value:t}}=e;"function"==typeof n&&(n(t),"function"==typeof b&&await b(t))}return(0,i.jsxs)("div",{className:(0,r.Z)("leading-11 m-0 flex h-9 rounded border border-gray-200 p-0 align-middle shadow-none transition-all duration-300",{"ring-1":y,"hover:border-blue-300 hover:shadow-blue-300":!y&&u,"border-blue-300 shadow-blue-300":y&&u,"border-red-300 hover:shadow-red-300":!y&&!u,"border-red-300 ring-red-300 shadow-red-300":y&&!u,"bg-gray-100 hover:!border-gray-300 hover:!shadow-none opacity-70":N},c),onFocus:function(){w(!0)},onBlur:function(){w(!1)},children:[h&&(0,i.jsx)("div",{className:"flex h-full items-center pl-3",children:h}),(0,i.jsx)("input",{value:t,onChange:T,tabIndex:m,className:(0,r.Z)("leading-11 h-full w-full rounded-full border-0 p-0 px-3 text-gray-600 outline-none transition-all duration-300 ease-in",{"cursor-not-allowed":N},s),disabled:N,ref:g,autoComplete:"off",role:"textbox",...x}),p&&(0,i.jsx)("div",{className:"flex h-full items-center",children:(0,i.jsx)(a._,{className:"float-right ml-2 mr-4"})})]})}},9599:function(e,t,n){"use strict";n.d(t,{B:function(){return m}});var i=n(85893),a=n(23125),r=n(14710),o=n(87592),l=n(1449),c=n(86010),s=n(67294),u=n(85198),d=n(73772);let f={longitude:4.4775362,latitude:51.0258761},h={"line-width":1,"line-color":"rgba(0, 255, 0, 0.75)","line-dasharray":[3,3]},p={"fill-color":"rgba(0, 255, 0, 0.05)"};function m(e){let{onChange:t,positions:n=[],height:m=375,mode:N="read-only",theme:g="dark",rounded:x=!0,zoom:y=12}=e,[w,b]=(0,s.useState)(),[T,v]=(0,s.useState)();return(0,s.useEffect)(()=>{"editable"===N&&(v(new d.DrawPolygonMode),b(f))},[]),(0,s.useEffect)(()=>{if("read-only"===N&&(0,r.i)(n)){let e=(0,l.uf)(n||[]),t=(0,o.Z)(e);(0,r.i)(t)&&b({latitude:(t[1]+t[3])/2||f.latitude,longitude:(t[0]+t[2])/2||f.longitude,maxLongitude:t[2],minLongitude:t[0],maxLatitude:t[3],minLatitude:t[1]})}},[n,N]),(0,i.jsx)("div",{style:{height:m},className:"w-full",children:w?(0,i.jsxs)(u.default,{zoom:y,height:"100%",width:"100%",className:(0,c.Z)(x&&"rounded"),...w,mapboxApiAccessToken:"pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pwY3owbGFxMDVwNTNxcXdwMms2OWtzbiJ9.1PPVl0VLUQgqrosrI2nUhg",mapStyle:"mapbox://styles/mapbox/".concat(g,"-v11"),onViewportChange:b,children:["editable"===N&&(0,i.jsx)(d.Editor,{clickRadius:13,mode:T,selectable:"editable"===N,features:n||[],onUpdate:e=>{let{data:n}=e;null==t||t(n)}}),"read-only"===N&&(null==n?void 0:n.map((e,t)=>(0,i.jsxs)(u.Source,{id:"source-".concat(t),type:"geojson",data:e,children:[(0,i.jsx)(u.Layer,{paint:h,id:"line-".concat(t),type:"line"}),(0,i.jsx)(u.Layer,{paint:p,id:"polygon-".concat(t),type:"fill"})]},t)))]}):(0,i.jsx)("div",{className:"flex h-full w-full items-center justify-center",children:(0,i.jsx)(a._,{className:"text-gray-500"})})})}},82082:function(e,t,n){"use strict";n.d(t,{N:function(){return a}});var i=n(67294);let a=(e,t)=>{let n=(0,i.useRef)(),a=(0,i.useRef)(e);return(0,i.useEffect)(()=>{a.current=e},[t]),(0,i.useCallback)(function(){for(var e=arguments.length,i=Array(e),r=0;r<e;r++)i[r]=arguments[r];n.current&&(clearTimeout(n.current),n.current=null),n.current=setTimeout(()=>{var e;return null===(e=a.current)||void 0===e?void 0:e.call(a,...i)},t)},[])}},98518:function(e,t,n){"use strict";n.d(t,{N:function(){return o}});var i=n(87866);let a=i._q.fromString("3030020100300706052b8104000a042204209e09fd6bf996a6a4ca7ff0e67dffb16fbf8828a21b89dfa735866999fdc4b12f"),r=i.hX.fromString("0.0.14271926");function o(){return{accountId:r,privateKey:a,client:function(){let e=i.KU.forTestnet();return e.setOperator(r,a),e}()}}},81074:function(e,t,n){"use strict";n.d(t,{y:function(){return r}});var i=n(9196),a=n(96810);function r(){function e(){return new a.xk({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAyYWUxYTE5NzMxRDI1OWU4ZDFkOTRDMzFhNTY2NTljMzE3QzFFZTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY2ODgyMjk5OTQsIm5hbWUiOiJoYXNoZ3JhcGgifQ.SFAL05NK16Vy75XmaclVHHy-tEPweI7AS4_AaX3ONLQ"})}async function t(t,n,a,r){let l=await e(),c=[o(JSON.stringify({name:t,creator:n,description:a,image:"https://bafybeibv3qve4co27gkgapqwftkmzcxgscbp4il7rwiyj2al4vl36hzfcu.ipfs.w3s.link/nft-placeholder.png",checksum:"ff32974d2a8cfeb8deb2437556b53296021bfe02d466f449d52b583a6e8fbcef",type:"image/png",format:"HIP412@2.0.0",properties:{location:r}}),"".concat(i.Y1.METADATA,".json"))];return l.put(c)}async function n(t){let n=await e(),{images:a,forest:r,...l}=t,c=[o(JSON.stringify(l),"".concat(i.Y1.PROPOSAL,".json")),o(JSON.stringify({title:l.title}),"".concat(i.Y1.METADATA,".json"))];return a&&c.push(...a.map(e=>new File([e],"images/".concat(e.name)))),n.put(c)}async function r(t){let n=await e();return n.put([o(JSON.stringify(t),"".concat(i.Y1.OBJECTION,".json"))])}function o(e,t){return new File([new Blob([e])],t,{type:"application/json",lastModified:new Date().getTime()})}async function l(t,n){let i=await e(),a=await (null==i?void 0:i.get(t)),r=await (null==a?void 0:a.files()),o="".concat(n,".json"),l=null==r?void 0:r.find(e=>e.name===o);if(!l)return;let s=new TextDecoder,u="";return await c(l,e=>u+=s.decode(e)),{...JSON.parse(u),cid:t}}async function c(e,t){let n=e.stream().getReader();for(;;){let{done:e,value:i}=await n.read();if(e)break;t(i)}}let s=(e,t)=>"https://dweb.link/ipfs/".concat(e,"/").concat(t);return{getJsonFile:l,uploadForest:t,getImageUrls:async function(t){let n=await e(),i=await n.get(t),a=await (null==i?void 0:i.files()),r=null==a?void 0:a.filter(e=>e.name.startsWith("images/"));return(null==r?void 0:r.map(e=>s(t,e.name)))||[]},uploadProposal:n,uploadObjection:r}}},94690:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var i=n(85893),a=n(65037),r=n(87866),o=n(75125),l=n(38618),c=n(12874),s=n(41664),u=n.n(s);function d(e){let{href:t}=e;return(0,i.jsxs)(u(),{className:"mb-2 flex items-center space-x-1 text-sm text-gray-500 transition-all duration-500 hover:text-gray-900",href:t,children:[(0,i.jsx)(c.X,{}),(0,i.jsx)("span",{children:"Back"})]})}var f=n(9599),h=n(22784),p=n(44292),m=n(11163),N=n(67294),g=n(98518),x=n(81074),y=n(48764).Buffer;function w(){let{uploadForest:e}=(0,x.y)(),t=(0,m.useRouter)(),[n,a]=(0,N.useState)(!1),{client:c,privateKey:s}=(0,g.N)(),[u,w]=(0,N.useState)(""),[b,T]=(0,N.useState)([]);async function v(){let n=await e(u,"Mechelen","Forest: ".concat(u),b),i=new r.iG(20),a=[y.from("ipfs://".concat(n,"/metadata.json"))],o=new r.fc().setTokenId("0.0.14909792").setMetadata(a).setMaxTransactionFee(i).freezeWith(c),l=await o.sign(s),d=await l.execute(c);await d.getReceipt(c),t.push(p.cE)}return(0,N.useEffect)(()=>{n&&v().then(()=>a(!1))},[n]),(0,i.jsxs)("div",{className:"flex h-full items-center",children:[(0,i.jsx)("div",{className:"flex h-full w-4/12 flex-col space-y-10 rounded bg-white p-20",children:(0,i.jsxs)("div",{className:"w-full space-y-10",children:[(0,i.jsx)(d,{href:p.cE}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{children:"Location"}),(0,i.jsx)(h.n,{className:"text-sm text-gray-700",children:"Pinpoint the location where the incident is happening"})]}),(0,i.jsxs)("div",{className:"space-y-1",children:[(0,i.jsx)("label",{className:"text-sm",htmlFor:"title",children:"Location Name"}),(0,i.jsx)(l.Z,{name:"title",placeholder:"Zennebeemden",value:u,onChange:e=>w(e)})]}),(0,i.jsx)("div",{className:"!mt-10 flex justify-end space-y-1 border-t border-gray-100 pt-10",children:(0,i.jsx)(o.z,{fullSize:!0,disabled:(null==b?void 0:b.length)===0,loading:n,onClick:()=>a(!0),className:"px-6 py-2",variant:"primary",children:"Save"})})]})}),(0,i.jsx)("div",{className:"flex h-full w-8/12",children:(0,i.jsx)(f.B,{theme:"dark",positions:b,height:"100%",rounded:!1,mode:"editable",zoom:13,onChange:e=>T(e)})})]})}function b(){return(0,i.jsx)(a.W,{withWidth:!1,withTopPadding:!1,children:(0,i.jsx)(w,{})})}},9196:function(e,t,n){"use strict";var i,a,r,o,l,c,s;n.d(t,{WD:function(){return a},Y1:function(){return r},dz:function(){return i}}),(l=i||(i={}))[l.FOR=0]="FOR",l[l.AGAINST=1]="AGAINST",l[l.ABSTAIN=2]="ABSTAIN",(c=a||(a={})).MOBILITY="mobility",c.SPATIAL_PLANNING="spatial-planning",c.CONFLICT_OF_INTEREST="conflict-of-interest",c.DE_PAVING="de-paving",c.PROCEDURE="procedure",c.CONSTRUCTION_PHASE="construction-phase",c.IMPACT_ON_CLIMATE="impact-on-climate",c.SAFETY="safety",c.VISUAL_IMPACT="visual-impact",c.PRIVACY="privacy",c.NUISANCE="nuisance",c.MATERIAL_USAGE="material-usage",c.FOREST_COMPENSATION="forest-compensation",c.HEALTH="health",c.ENERGY_CONSUMPTION="energy-consumption",c.PLANNING_CONTEXT="planning-context",c.ENVIRONMENTAL_IMPACT_REPORT="environmental-impact-report",c.WATER="water",c.AIR_QUALITY="air-quality",c.ECOLOGY="ecology",c.NOISE_POLLUTION="noise-pollution",c.LIGHT_POLLUTION="light-pollution",c.ODOR_NUISANCE="odor-nuisance",(s=r||(r={})).OBJECTION="objection",s.METADATA="metadata",s.PROPOSAL="proposal",(o||(o={})).PROPOSAL="proposal"},71231:function(){},89214:function(){},85568:function(){}},function(e){e.O(0,[169,714,634,715,765,866,635,810,204,37,774,888,179],function(){return e(e.s=79041)}),_N_E=e.O()}]);