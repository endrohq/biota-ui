"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[308],{86237:function(t,e,n){n.d(e,{F:function(){return s},s:function(){return r}});var i=n(57218),o=n(16441),a=n(84917);function r(t){let e=(0,a.Y0)(t);if(e.length>31)throw Error("bytes32 string must be less than 32 bytes");return(0,o.Dv)((0,o.zo)([e,i.R]).slice(0,32))}function s(t){let e=(0,o.lE)(t);if(32!==e.length)throw Error("invalid bytes32 - not 32 bytes long");if(0!==e[31])throw Error("invalid bytes32 string - no null terminator");let n=31;for(;0===e[n-1];)n--;return(0,a.ZN)(e.slice(0,n))}},93308:function(t,e,n){n.r(e),n.d(e,{default:function(){return T},useProposalContext:function(){return N}});var i=n(85893),o=n(23125),a=n(67294),r=n(9196),s=n(53405),c=n(68209),u=n(86237),l=n(86501),f=n(81074),p=n(32802),d=n(48005);let N=()=>{let t=(0,a.useContext)(O);if(!t)throw Error("useProposalContext must be used within a ProposalProvider");return t},O=(0,a.createContext)({proposal:void 0});function T(t){let{proposalId:e,children:n}=t,{proposal:N,loading:T}=function(t){let{signer:e}=(0,p.aF)(),{getJsonFile:n}=(0,f.y)(),[i,o]=(0,a.useState)(!0),[N,O]=(0,a.useState)();async function T(){try{let i=new c.CH(d.w.address,d.w.abi,e),a=await i.getProposalById(u.s(t)),l=(0,s.a)(a);if(null==l?void 0:l.cid){let t=await n(l.cid,r.Y1.PROPOSAL),e=(0,s.F)(t);O({...l,...e}),o(!1)}}catch(t){console.error(t),l.ZP.error("Something went wrong. Please reload the page.")}}return(0,a.useEffect)(()=>{T()},[]),(0,a.useMemo)(()=>({loading:i,proposal:N}),[i,N])}(e);return(0,i.jsx)(O.Provider,{value:{proposal:N},children:T?(0,i.jsx)(o._,{}):n})}},81074:function(t,e,n){n.d(e,{y:function(){return a}});var i=n(9196),o=n(96810);function a(){function t(){return new o.xk({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAyYWUxYTE5NzMxRDI1OWU4ZDFkOTRDMzFhNTY2NTljMzE3QzFFZTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY2ODgyMjk5OTQsIm5hbWUiOiJoYXNoZ3JhcGgifQ.SFAL05NK16Vy75XmaclVHHy-tEPweI7AS4_AaX3ONLQ"})}async function e(e,n,o,a){let s=await t(),c=[r(JSON.stringify({name:e,creator:n,description:o,image:"https://bafybeibv3qve4co27gkgapqwftkmzcxgscbp4il7rwiyj2al4vl36hzfcu.ipfs.w3s.link/nft-placeholder.png",checksum:"ff32974d2a8cfeb8deb2437556b53296021bfe02d466f449d52b583a6e8fbcef",type:"image/png",format:"HIP412@2.0.0",properties:{location:a}}),"".concat(i.Y1.METADATA,".json"))];return s.put(c)}async function n(e){let n=await t(),{images:o,forest:a,...s}=e,c=[r(JSON.stringify(s),"".concat(i.Y1.PROPOSAL,".json")),r(JSON.stringify({title:s.title}),"".concat(i.Y1.METADATA,".json"))];return o&&c.push(...o.map(t=>new File([t],"images/".concat(t.name)))),n.put(c)}async function a(e){let n=await t();return n.put([r(JSON.stringify(e),"".concat(i.Y1.OBJECTION,".json"))])}function r(t,e){return new File([new Blob([t])],e,{type:"application/json",lastModified:new Date().getTime()})}async function s(e,n){let i=await t(),o=await (null==i?void 0:i.get(e)),a=await (null==o?void 0:o.files()),r="".concat(n,".json"),s=null==a?void 0:a.find(t=>t.name===r);if(!s)return;let u=new TextDecoder,l="";return await c(s,t=>l+=u.decode(t)),{...JSON.parse(l),cid:e}}async function c(t,e){let n=t.stream().getReader();for(;;){let{done:t,value:i}=await n.read();if(t)break;e(i)}}let u=(t,e)=>"https://dweb.link/ipfs/".concat(t,"/").concat(e);return{getJsonFile:s,uploadForest:e,getImageUrls:async function(e){let n=await t(),i=await n.get(e),o=await (null==i?void 0:i.files()),a=null==o?void 0:o.filter(t=>t.name.startsWith("images/"));return(null==a?void 0:a.map(t=>u(e,t.name)))||[]},uploadProposal:n,uploadObjection:a}}},9196:function(t,e,n){var i,o,a,r,s,c,u;n.d(e,{WD:function(){return o},Y1:function(){return a},dz:function(){return i}}),(s=i||(i={}))[s.FOR=0]="FOR",s[s.AGAINST=1]="AGAINST",s[s.ABSTAIN=2]="ABSTAIN",(c=o||(o={})).MOBILITY="mobility",c.SPATIAL_PLANNING="spatial-planning",c.CONFLICT_OF_INTEREST="conflict-of-interest",c.DE_PAVING="de-paving",c.PROCEDURE="procedure",c.CONSTRUCTION_PHASE="construction-phase",c.IMPACT_ON_CLIMATE="impact-on-climate",c.SAFETY="safety",c.VISUAL_IMPACT="visual-impact",c.PRIVACY="privacy",c.NUISANCE="nuisance",c.MATERIAL_USAGE="material-usage",c.FOREST_COMPENSATION="forest-compensation",c.HEALTH="health",c.ENERGY_CONSUMPTION="energy-consumption",c.PLANNING_CONTEXT="planning-context",c.ENVIRONMENTAL_IMPACT_REPORT="environmental-impact-report",c.WATER="water",c.AIR_QUALITY="air-quality",c.ECOLOGY="ecology",c.NOISE_POLLUTION="noise-pollution",c.LIGHT_POLLUTION="light-pollution",c.ODOR_NUISANCE="odor-nuisance",(u=a||(a={})).OBJECTION="objection",u.METADATA="metadata",u.PROPOSAL="proposal",(r||(r={})).PROPOSAL="proposal"},53405:function(t,e,n){function i(t){if(t)return{id:t.id,cid:t.cid,author:t.author,forestTokenId:t.forestTokenId,abstainVotes:Number(t.abstainVotes),againstVotes:Number(t.againstVotes),forVotes:Number(t.forVotes),startTimestamp:new Date(1e3*Number(t.startTimestamp)),endTimestamp:new Date(1e3*Number(t.endTimestamp))}}function o(t){if(t)return{title:null==t?void 0:t.title,description:null==t?void 0:t.description}}n.d(e,{F:function(){return o},a:function(){return i}})}}]);