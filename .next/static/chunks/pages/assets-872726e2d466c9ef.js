(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[742],{8265:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/assets",function(){return t(3428)}])},3428:function(e,r,t){"use strict";t.r(r);var l=t(5893),s=t(7294),a=t(9473),n=t(1664),o=t.n(n),d=t(212),i=t(6154),c=t(2879),u=t(3052),h=t(1819),x=t(9603),m=t(9417);let b=()=>{let[e,r]=(0,s.useState)(!0),[t,n]=(0,s.useState)(!1),b=(0,a.v9)(e=>e.currentProperty.value.currentProperty),[f,v]=(0,s.useState)([]),[p,g]=(0,s.useState)([]),[j,N]=(0,s.useState)(!1),[w,y]=(0,s.useState)(!1),[k,C]=(0,s.useState)(""),[_,A]=(0,s.useState)({});(0,s.useEffect)(()=>{r(!0),n(!1),S()},[b]);let S=async()=>{try{let e=await i.Z.get("http://localhost:3001/asset-tree/".concat(b),{headers:{Authorisation:"Bearer "+localStorage.getItem("token")}});v(e.data),r(!1)}catch(t){n(!0),r(!1)}},E=e=>{if(p.includes(e)){let r=p.filter(r=>r!=e);g(r)}else g(r=>[...r,e])},T=f.map(e=>{let r=e=>(0,l.jsxs)("div",{className:"pl-5 mt-2 flex flex-col",children:[(0,l.jsxs)("div",{className:"rounded-lg px-2 h-8 flex flex-row items-center relative hover:outline-blue-600 hover:outline-2 hover:outline",children:[(0,l.jsxs)("div",{onClick:()=>E(e.id),className:"flex flex-row items-center select-none  ".concat(Array.isArray(e.children)&&e.children.length>0?"cursor-pointer hover:text-blue-600 icon-filter":"cursor-default"),children:[Array.isArray(e.children)&&e.children.length>0?(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("button",{className:"mr-1 h-5 w-5 font-bold text-2xl duration-150 ".concat(p.includes(e.id)?"rotate-90":null),children:(0,l.jsx)("img",{src:d.Z.src})})}):(0,l.jsx)(l.Fragment,{children:"\xa0\xa0\xa0\xa0\xa0"}),e.name]}),j?(0,l.jsxs)("div",{className:"absolute right-2 flex flex-row",children:[(0,l.jsx)("button",{onClick:()=>[y(!0),C("renameAsset"),A({id:e.id,oldName:e.name})],className:"rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent",children:"Rename"}),(0,l.jsx)("button",{onClick:()=>[y(!0),C("addAsset"),A({parentId:e.id,parentName:e.name})],className:"rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent",children:"+ Add Child Component"}),0!=e.parentId?(0,l.jsx)("button",{onClick:()=>[y(!0),C("deleteAsset"),A({id:e.id,name:e.name})],className:"rounded-xl ml-5 text-sm hover:font-medium hover:text-white bg-sky-50 hover:bg-red-600 h-6 px-3 border-2 border-red-600 hover:border-transparent",children:"Delete"}):(0,l.jsx)("div",{className:"w-16 ml-6"})]}):(0,l.jsxs)("div",{className:"absolute right-2",children:[0!=e.parentId?(0,l.jsx)("button",{className:"rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent",children:(0,l.jsx)(o(),{href:"/assets/"+e.id,children:"View Component Details"})}):null,(0,l.jsx)("button",{onClick:()=>[y(!0),C("createJob"),A({assetId:e.id})],className:"rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent",children:"Create Job"})]})]}),Array.isArray(e.children)&&p.includes(e.id)?e.children.map(e=>r(e)):null]},e.id);return r(e)});return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100",children:[(0,l.jsx)("div",{className:"fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center",children:(0,l.jsxs)("button",{className:"ml-8 hover:text-blue-600 flex flex-row items-center",onClick:()=>N(e=>!e),children:[j?(0,l.jsx)(x.G,{icon:m.klh,className:"mr-1 w-3"}):(0,l.jsx)(x.G,{icon:m.TzT,className:"mr-1 w-3"}),j?"Switch to Work Mode":"Switch to Edit Mode"]})}),w?(0,l.jsx)(c.Z,{modalType:k,payload:_,closeModal:()=>[y(!1),C(""),A(""),S()]}):"",e?(0,l.jsx)(u.Z,{}):0===f.length?(0,l.jsx)("div",{children:"There is no data"}):t?(0,l.jsx)(h.Z,{}):(0,l.jsx)("div",{className:"ml-5",children:T})]})})};r.default=b}},function(e){e.O(0,[976,603,879,774,888,179],function(){return e(e.s=8265)}),_N_E=e.O()}]);