(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[347],{9277:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/spares/sparesManagement",function(){return t(2664)}])},1129:function(e,r,t){"use strict";t.d(r,{Z:function(){return S}});var s=t(5893),a=t(7294),l=t(1664),n=t.n(l),i=t(9603),o=t(9417);let c=(e,r,t)=>(0,s.jsx)(n(),{href:r+t,className:"border-b-2 border-black hover:text-blue-600 hover:border-blue-600",children:e}),d=e=>"00/00/00"===e?"":e,u=e=>(0,s.jsx)("a",{className:"border-b-2 border-black hover:text-blue-600 hover:border-blue-600",href:"https://"+e,target:"_blank",rel:"noreferrer",children:e}),h=e=>1===e?(0,s.jsx)("div",{children:"✔"}):(0,s.jsx)("div",{children:"❌"}),m=e=>1===e?(0,s.jsx)("div",{children:"✔"}):null,x=e=>{switch(e){case 4:return"Admin";case 3:return"Manager";case 2:return"Engineer";default:return"Staff"}},b=(e,r)=>0===e?(0,s.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,s.jsx)(i.G,{icon:o.g82,className:"mr-1 w-5 text-red-600"})," ",e]}):0===r||e/r>1?(0,s.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,s.jsx)(i.G,{icon:o.LEp,className:"mr-1 w-5 text-green-500"})," ",e]}):(0,s.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,s.jsx)(i.G,{icon:o.ik8,className:"mr-1 w-5 text-yellow-500"})," ",e]}),f=(e,r,t,a)=>{if(a)return(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>a(e,r,t),children:(0,s.jsx)(i.G,{icon:o.Yai,className:"mr-1 w-5"})})},p=(e,r,t)=>{if(e.length<5){let a=e.map(e=>(0,s.jsx)("li",{children:e.part_no+" / "+e.name+" / Quantity: "+e.quantity},"contentsItem"+e.spare_id));return(0,s.jsx)("ul",{children:a})}if(t)return(0,s.jsx)("button",{onClick:()=>t(e,r),children:"\uD83D\uDD0D"})},g=(e,r,t)=>{if(t)return(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>t(e,r),children:(0,s.jsx)(i.G,{icon:o.Yai,className:"mr-1 w-5"})})},j=(e,r,t,a)=>a&&1!=t?(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>a(e,r),children:(0,s.jsx)(i.G,{icon:o.Yai,className:"mr-1 w-5"})}):void 0,v=(e,r,t)=>{if(t)return(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>t(e,r),children:(0,s.jsx)(i.G,{icon:o.g82,className:"mr-1 w-5 text-red-600"})})},N=(e,r,t,a)=>a&&1!=t?(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>a(e,r),children:(0,s.jsx)(i.G,{icon:o.g82,className:"mr-1 w-5 text-red-600"})}):void 0;var y=t(3052);let w=e=>{let r=e=>e.map(e=>(0,s.jsx)("option",{value:e.id,children:e.name},e.id+"_searchOption")),t=r=>{e.setSearchType(r.target.value),e.setSearchTerm("")};return(()=>{let a=e.headers.filter(e=>!0===e.search);return(0,s.jsxs)("div",{className:"flex flex-col w-max my-4 ml-10 rounded-sm",children:[(0,s.jsx)("select",{className:"mb-2",value:""!=e.searchType?e.searchType:a[0].name,onChange:t,children:r(a)}),(0,s.jsx)("input",{className:"bg-blue-200 rounded-sm",value:e.searchTerm,onChange:r=>e.setSearchTerm(r.target.value)})]})})()},k=e=>{let r=e.data,[t,l]=(0,a.useState)(),[n,i]=(0,a.useState)(),[o,k]=(0,a.useState)({col:e.config.headers[0].id,dir:"DSC"}),[S,C]=(0,a.useState)(""),[P,_]=(0,a.useState)(""),[A,D]=(0,a.useState)(!0);(0,a.useEffect)(()=>{G(o.col,o.dir)},[]),(0,a.useEffect)(()=>{E()},[P]),(0,a.useEffect)(()=>{G(o.col,o.dir)},[t]);let E=()=>{if(P.length>0){let e=r.filter(e=>e[S].toUpperCase().includes(P.toUpperCase()));l(e)}else l(r)},T=e=>{e===o.col?"DSC"===o.dir?(k({col:o.col,dir:"ASC"}),G(o.col,"ASC")):(k({col:o.col,dir:"DSC"}),G(o.col,"DSC")):(k({col:e,dir:"DSC"}),G(e,"DSC"))},G=(r,s)=>{let a=t||e.data;a.length>0&&("DSC"===s?a.sort((e,t)=>t[r]>e[r]?1:t[r]<e[r]?-1:0):a.sort((e,t)=>e[r]>t[r]?1:e[r]<t[r]?-1:0)),i(a),D(!1)},M=e.config.headers.map(e=>e.order?(0,s.jsx)("th",{className:"border-2 border-solid border-gray-500 px-2 cursor-pointer select-none",onClick:()=>T(e.id),children:(0,s.jsxs)("div",{className:" flex flex-row justify-center items-center",children:[e.name,o.col!=e.id?null:"ASC"===o.dir?(0,s.jsx)("div",{className:"ml-2 text-2xl",children:"↓"}):(0,s.jsx)("div",{className:"ml-2 text-2xl",children:"↑"})]})},"head."+e.id):(0,s.jsx)("th",{className:"border-2 border-solid border-gray-500 px-2 select-none",children:e.name},"head."+e.id)),Z=r=>{let t=e.config.headers.map(t=>{let a=null;switch(t.type){case"string":default:a=r[t.id];break;case"link":a=c(r[t.id],e.config.linkColPrefix,r[t.id]);break;case"linkWithName":a=c(r[t.nameParam],e.config.linkColPrefix,r[t.id]);break;case"url":a=u(r[t.id]);break;case"date":a=d(r[t.id]);break;case"authSwitch":a=x(r[t.id]);break;case"completed":a=h(r[t.id]);break;case"arrived":a=m(r[t.id]);break;case"contents":a=p(r[t.id],r[t.functionNamePointer],e.viewTooManyItems);break;case"remaining_stock":a=b(r[t.id],r[t.avgUsagePointer]);break;case"adjust_stock":a=f(r[t.functionIdPointer],r[t.functionNamePointer],r[t.quantRemainPonter],e.adjustStockFunction);break;case"edit":a=g(r[t.functionIdPointer],r[t.functionNamePointer],e.editFunction);break;case"editWithHide":a=j(r[t.functionIdPointer],r[t.functionNamePointer],r[t.hidePointer],e.editFunction);break;case"delete":a=v(r[t.functionIdPointer],r[t.functionNamePointer],e.deleteFunction);break;case"deleteWithHide":a=N(r[t.functionIdPointer],r[t.functionNamePointer],r[t.hidePointer],e.deleteFunction)}return(0,s.jsx)("td",{className:"border border-solid border-gray-500 px-2 text-center p-2",children:a},"cell."+t.id)});return t};return(0,s.jsx)("div",{children:A?(0,s.jsx)(y.Z,{}):(0,s.jsxs)(s.Fragment,{children:[e.config.searchable&&e.config.headers.length>0?(0,s.jsx)(w,{headers:e.config.headers,searchType:S,searchTerm:P,setSearchType:C,setSearchTerm:_}):null,(0,s.jsxs)("table",{className:"min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ",children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{className:"bg-gray-200",children:M})}),(0,s.jsx)("tbody",{children:(()=>{if(n&&(null==n?void 0:n.length)>0){let r=n.map(r=>(0,s.jsx)("tr",{children:Z(r)},"body"+r[e.config.headers[0].id]));return r}})()})]})]})})};var S=k},2664:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return j}});var s=t(5893),a=t(1664),l=t.n(a),n=t(6154),i=t(7294),o=t(9473),c=t(212),d=t(1129);let u={headers:[{id:"id",name:"Part Number",type:"linkWithName",nameParam:"part_no",search:!0,order:!0},{id:"name",name:"Name",type:"string",search:!0,order:!0},{id:"supplier",name:"Supplier",type:"string",search:!0,order:!0},{id:"quant_remain",name:"Quantity Remaining",type:"string",search:!0,order:!0},{id:"monthly_usage",name:"AVG Monthly Usage",type:"string",search:!0,order:!0}],searchable:!1,linkColPrefix:"/spares/"},h={headers:[{id:"id",name:"Part Number",type:"linkWithName",nameParam:"part_no",search:!0,order:!0},{id:"name",name:"Name",type:"string",search:!0,order:!0},{id:"supplier",name:"Supplier",type:"string",search:!0,order:!0},{id:"monthly_usage",name:"AVG Monthly Usage",type:"string",search:!0,order:!0}],searchable:!1,linkColPrefix:"/spares/"},m=()=>{let e=(0,o.v9)(e=>e.currentProperty.value.currentProperty),[r,t]=(0,i.useState)(0),[a,l]=(0,i.useState)([]),[m,x]=(0,i.useState)(!1),[b,f]=(0,i.useState)(0),[p,g]=(0,i.useState)([]),[j,v]=(0,i.useState)(!1);(0,i.useEffect)(()=>{N()},[e]);let N=async()=>{try{let r=await n.Z.get("http://localhost:3001/spares/warnings/".concat(e),{headers:{Authorisation:"Bearer "+localStorage.getItem("token")}});l(r.data.warningsArray),g(r.data.outArray),t(r.data.warningsArray.length),f(r.data.outArray.length)}catch(s){}};return(0,s.jsx)("div",{className:"px-10 pt-5",children:(0,s.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-lg",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-2",children:"Current Stock Warnings:"}),(0,s.jsxs)("button",{className:"flex flex-row items-center hover:text-blue-600 select-none ",onClick:()=>x(e=>!e),children:[(0,s.jsx)("img",{className:"h-5 w-5 mr-1 duration-150 icon-filter ".concat(m?"rotate-90":null),src:c.Z.src}),(0,s.jsxs)("div",{className:"text-yellow-600 text-lg font-semibold",children:[r," Low Stock"]})]}),m?(0,s.jsx)(d.Z,{config:u,data:a}):null,(0,s.jsxs)("button",{className:"flex flex-row items-center hover:text-blue-600 select-none ",onClick:()=>v(e=>!e),children:[(0,s.jsx)("img",{className:"h-5 w-5 mr-1 duration-150 icon-filter ".concat(j?"rotate-90":null),src:c.Z.src}),(0,s.jsxs)("div",{className:"text-red-800 text-lg font-semibold",children:[b," Out of Stock"]})]}),j?(0,s.jsx)(d.Z,{config:h,data:p}):null]})})};var x=t(2879);let b=()=>{let e=(0,o.v9)(e=>e.currentProperty.value.currentProperty),[r,t]=(0,i.useState)(!1),[a,l]=(0,i.useState)(0),[d,u]=(0,i.useState)([]),[h,m]=(0,i.useState)(0),[b,f]=(0,i.useState)(!1),[p,g]=(0,i.useState)(""),[j,v]=(0,i.useState)({id:0,title:""});(0,i.useEffect)(()=>{N()},[e]);let N=()=>{y()},y=async()=>{try{let r=await n.Z.get("http://localhost:3001/spares/notes/".concat(e),{headers:{Authorisation:"Bearer "+localStorage.getItem("token")}});u(r.data),l(r.data.length)}catch(t){alert("There has been an error retrieving you Notes")}},w=d.map(e=>(0,s.jsxs)("div",{className:"flex flex-row rounded-md pl-6 mt-1 hover:outline-2 hover:outline hover:outline-blue-600 p-1",children:[(0,s.jsx)("div",{className:"mr-5",children:e.title}),(0,s.jsxs)("div",{className:"flex flex-row justify-end ml-auto",children:[(0,s.jsx)("div",{children:e.created_date}),(0,s.jsx)("button",{onClick:()=>m(e.id),className:"rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent",children:"View"}),(0,s.jsx)("button",{onClick:()=>[f(!0),g("addEditSparesNote"),v({id:e.id,title:e.title})],className:"rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent",children:"Edit"}),(0,s.jsx)("button",{onClick:()=>[f(!0),g("deleteSparesNote"),v({id:e.id,title:e.title})],className:"rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-red-600 h-6 px-3 border-2 border-red-600 hover:text-white hover:border-transparent",children:"Delete"})]})]},e.id+"title"));return(0,s.jsxs)(s.Fragment,{children:[b?(0,s.jsx)(x.Z,{modalType:p,payload:j,closeModal:()=>[f(!1),g(""),v({id:0,title:""}),N()]}):null,(0,s.jsx)("div",{className:"px-10 p-5",children:(0,s.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-lg",children:[(0,s.jsxs)("h2",{className:"text-xl font-semibold mb-2",children:["Notes",(0,s.jsx)("button",{onClick:()=>[f(!0),g("addEditSparesNote"),v({id:0,title:""})],className:"rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent",children:"Add Note"})]}),(0,s.jsxs)("button",{className:"flex flex-row items-center hover:text-blue-600 icon-filter select-none",onClick:()=>t(e=>!e),children:[(0,s.jsx)("img",{className:"h-5 w-5 mr-1 duration-150 ".concat(r?"rotate-90":null),src:c.Z.src}),(0,s.jsxs)("div",{children:[a," Saved Note",1===a?null:"s"]})]}),r?d.length>0?(0,s.jsx)("div",{className:"w-max",children:w}):(0,s.jsx)("div",{children:"No Notes Available"}):null,h>0?(()=>{let e=d.find(e=>e.id===h);if(e)return(0,s.jsxs)("div",{className:"flex flex-col mt-4 ml-6 bg-blue-200 p-4 rounded-xl",children:[(0,s.jsxs)("div",{className:"flex flex-row mb-2 font-semibold",children:[(0,s.jsx)("div",{className:"mr-5",children:e.title}),(0,s.jsx)("div",{children:e.created_date}),(0,s.jsx)("button",{className:"rounded-xl ml-auto text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent",onClick:()=>m(0),children:"Close Note"})]}),(0,s.jsx)("div",{children:e.content})]})})():null]})})]})};var f=t(9603),p=t(9417);let g=()=>(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100",children:[(0,s.jsx)("div",{className:"fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center",children:(0,s.jsxs)(l(),{href:"/spares",className:"ml-8 hover:text-blue-600 flex flex-row items-center",children:[(0,s.jsx)(f.G,{icon:p.acZ,className:"mr-1 w-3"}),(0,s.jsx)("p",{children:"Return to Spares"})]})}),(0,s.jsxs)("div",{className:"bg-gray-100",children:[(0,s.jsx)(m,{}),(0,s.jsx)("div",{className:"px-10 pt-5",children:(0,s.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-lg",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-2",children:"Deliveries"}),(0,s.jsx)("p",{className:"",children:"Add deliveries, manage scheduled deliveries and confirm when deliveries have arrived to automatically update current stock levels with the newly arrived items"}),(0,s.jsx)("button",{className:"rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent",children:(0,s.jsx)(l(),{href:"/spares/sparesManagement/deliveries",children:"Manage Deliveries"})})]})}),(0,s.jsx)("div",{className:"px-10 pt-5",children:(0,s.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-lg",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-2",children:"Suppliers"}),(0,s.jsx)("p",{className:"",children:"Manage info about suppliers and the spares they supply"}),(0,s.jsx)("button",{className:"rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent",children:(0,s.jsx)(l(),{href:"/spares/sparesManagement/suppliers",children:"Manage Suppliers info"})})]})}),(0,s.jsx)(b,{})]})]})});var j=g}},function(e){e.O(0,[976,603,879,774,888,179],function(){return e(e.s=9277)}),_N_E=e.O()}]);