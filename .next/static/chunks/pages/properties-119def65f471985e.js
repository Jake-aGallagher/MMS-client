(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[322],{9583:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/properties",function(){return t(6950)}])},1129:function(e,r,t){"use strict";t.d(r,{Z:function(){return S}});var s=t(5893),n=t(7294),i=t(1664),a=t.n(i),c=t(9603),l=t(9417);let o=(e,r,t)=>(0,s.jsx)(a(),{href:r+t,className:"border-b-2 border-black hover:text-blue-600 hover:border-blue-600",children:e}),d=e=>"00/00/00"===e?"":e,u=e=>(0,s.jsx)("a",{className:"border-b-2 border-black hover:text-blue-600 hover:border-blue-600",href:"https://"+e,target:"_blank",rel:"noreferrer",children:e}),h=e=>1===e?(0,s.jsx)("div",{children:"✔"}):(0,s.jsx)("div",{children:"❌"}),m=e=>1===e?(0,s.jsx)("div",{children:"✔"}):null,x=e=>{switch(e){case 4:return"Admin";case 3:return"Manager";case 2:return"Engineer";default:return"Staff"}},f=(e,r)=>0===e?(0,s.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,s.jsx)(c.G,{icon:l.g82,className:"mr-1 w-5 text-red-600"})," ",e]}):0===r||e/r>1?(0,s.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,s.jsx)(c.G,{icon:l.LEp,className:"mr-1 w-5 text-green-500"})," ",e]}):(0,s.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,s.jsx)(c.G,{icon:l.ik8,className:"mr-1 w-5 text-yellow-500"})," ",e]}),j=(e,r,t,n)=>{if(n)return(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>n(e,r,t),children:(0,s.jsx)(c.G,{icon:l.Yai,className:"mr-1 w-5"})})},p=(e,r,t)=>{if(e.length<5){let n=e.map(e=>(0,s.jsx)("li",{children:e.part_no+" / "+e.name+" / Quantity: "+e.quantity},"contentsItem"+e.spare_id));return(0,s.jsx)("ul",{children:n})}if(t)return(0,s.jsx)("button",{onClick:()=>t(e,r),children:"\uD83D\uDD0D"})},b=(e,r,t)=>{if(t)return(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>t(e,r),children:(0,s.jsx)(c.G,{icon:l.Yai,className:"mr-1 w-5"})})},g=(e,r,t,n)=>n&&1!=t?(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>n(e,r),children:(0,s.jsx)(c.G,{icon:l.Yai,className:"mr-1 w-5"})}):void 0,y=(e,r,t)=>{if(t)return(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>t(e,r),children:(0,s.jsx)(c.G,{icon:l.g82,className:"mr-1 w-5 text-red-600"})})},v=(e,r,t,n)=>n&&1!=t?(0,s.jsx)("div",{className:"flex flex-row justify-center items-center hover:cursor-pointer select-none",onClick:()=>n(e,r),children:(0,s.jsx)(c.G,{icon:l.g82,className:"mr-1 w-5 text-red-600"})}):void 0;var N=t(3052);let k=e=>{let r=e=>e.map(e=>(0,s.jsx)("option",{value:e.id,children:e.name},e.id+"_searchOption")),t=r=>{e.setSearchType(r.target.value),e.setSearchTerm("")};return(()=>{let n=e.headers.filter(e=>!0===e.search);return(0,s.jsxs)("div",{className:"flex flex-col w-max my-4 ml-10 rounded-sm",children:[(0,s.jsx)("select",{className:"mb-2",value:""!=e.searchType?e.searchType:n[0].name,onChange:t,children:r(n)}),(0,s.jsx)("input",{className:"bg-blue-200 rounded-sm",value:e.searchTerm,onChange:r=>e.setSearchTerm(r.target.value)})]})})()},w=e=>{let r=e.data,[t,i]=(0,n.useState)(),[a,c]=(0,n.useState)(),[l,w]=(0,n.useState)({col:e.config.headers[0].id,dir:"DSC"}),[S,C]=(0,n.useState)(""),[P,_]=(0,n.useState)(""),[T,D]=(0,n.useState)(!0);(0,n.useEffect)(()=>{I(l.col,l.dir)},[]),(0,n.useEffect)(()=>{E()},[P]),(0,n.useEffect)(()=>{I(l.col,l.dir)},[t]);let E=()=>{if(P.length>0){let e=r.filter(e=>e[S].toUpperCase().includes(P.toUpperCase()));i(e)}else i(r)},G=e=>{e===l.col?"DSC"===l.dir?(w({col:l.col,dir:"ASC"}),I(l.col,"ASC")):(w({col:l.col,dir:"DSC"}),I(l.col,"DSC")):(w({col:e,dir:"DSC"}),I(e,"DSC"))},I=(r,s)=>{let n=t||e.data;n.length>0&&("DSC"===s?n.sort((e,t)=>t[r]>e[r]?1:t[r]<e[r]?-1:0):n.sort((e,t)=>e[r]>t[r]?1:e[r]<t[r]?-1:0)),c(n),D(!1)},A=e.config.headers.map(e=>e.order?(0,s.jsx)("th",{className:"border-2 border-solid border-gray-500 px-2 cursor-pointer select-none",onClick:()=>G(e.id),children:(0,s.jsxs)("div",{className:" flex flex-row justify-center items-center",children:[e.name,l.col!=e.id?null:"ASC"===l.dir?(0,s.jsx)("div",{className:"ml-2 text-2xl",children:"↓"}):(0,s.jsx)("div",{className:"ml-2 text-2xl",children:"↑"})]})},"head."+e.id):(0,s.jsx)("th",{className:"border-2 border-solid border-gray-500 px-2 select-none",children:e.name},"head."+e.id)),F=r=>{let t=e.config.headers.map(t=>{let n=null;switch(t.type){case"string":default:n=r[t.id];break;case"link":n=o(r[t.id],e.config.linkColPrefix,r[t.id]);break;case"linkWithName":n=o(r[t.nameParam],e.config.linkColPrefix,r[t.id]);break;case"url":n=u(r[t.id]);break;case"date":n=d(r[t.id]);break;case"authSwitch":n=x(r[t.id]);break;case"completed":n=h(r[t.id]);break;case"arrived":n=m(r[t.id]);break;case"contents":n=p(r[t.id],r[t.functionNamePointer],e.viewTooManyItems);break;case"remaining_stock":n=f(r[t.id],r[t.avgUsagePointer]);break;case"adjust_stock":n=j(r[t.functionIdPointer],r[t.functionNamePointer],r[t.quantRemainPonter],e.adjustStockFunction);break;case"edit":n=b(r[t.functionIdPointer],r[t.functionNamePointer],e.editFunction);break;case"editWithHide":n=g(r[t.functionIdPointer],r[t.functionNamePointer],r[t.hidePointer],e.editFunction);break;case"delete":n=y(r[t.functionIdPointer],r[t.functionNamePointer],e.deleteFunction);break;case"deleteWithHide":n=v(r[t.functionIdPointer],r[t.functionNamePointer],r[t.hidePointer],e.deleteFunction)}return(0,s.jsx)("td",{className:"border border-solid border-gray-500 px-2 text-center p-2",children:n},"cell."+t.id)});return t};return(0,s.jsx)("div",{children:T?(0,s.jsx)(N.Z,{}):(0,s.jsxs)(s.Fragment,{children:[e.config.searchable&&e.config.headers.length>0?(0,s.jsx)(k,{headers:e.config.headers,searchType:S,searchTerm:P,setSearchType:C,setSearchTerm:_}):null,(0,s.jsxs)("table",{className:"min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ",children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{className:"bg-gray-200",children:A})}),(0,s.jsx)("tbody",{children:(()=>{if(a&&(null==a?void 0:a.length)>0){let r=a.map(r=>(0,s.jsx)("tr",{children:F(r)},"body"+r[e.config.headers[0].id]));return r}})()})]})]})})};var S=w},6950:function(e,r,t){"use strict";t.r(r);var s=t(5893),n=t(7294),i=t(6154),a=t(1819),c=t(3052),l=t(2879),o=t(1129);let d={headers:[{id:"id",name:"Property Number",type:"link",search:!0,order:!0},{id:"name",name:"Name",type:"string",search:!0,order:!0},{id:"type",name:"Type",type:"string",search:!0,order:!0},{id:"address",name:"Address",type:"string",search:!0,order:!0},{id:"city",name:"City",type:"date",search:!0,order:!0},{id:"county",name:"County",type:"string",search:!0,order:!0},{id:"postcode",name:"Postcode",type:"string",search:!0,order:!0}],searchable:!0,linkColPrefix:"/properties/"},u=()=>{let[e,r]=(0,n.useState)(!0),[t,u]=(0,n.useState)(!1),[h,m]=(0,n.useState)([]),[x,f]=(0,n.useState)(!1),[j,p]=(0,n.useState)("");(0,n.useEffect)(()=>{b()},[]);let b=()=>{r(!0),u(!1),g()},g=async()=>{try{let e=await i.Z.get("http://localhost:3001/properties/all-properties",{headers:{Authorisation:"Bearer "+localStorage.getItem("token")}});m(e.data),r(!1)}catch(t){u(!0),r(!1)}};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100",children:[(0,s.jsx)("div",{className:"fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center",children:(0,s.jsxs)("button",{onClick:()=>[f(!0),p("addEditProperty")],className:"ml-8 hover:text-blue-600 flex flex-row items-center",children:[(0,s.jsx)("div",{className:"text-2xl mr-1 pb-1",children:"+"}),"Add Property"]})}),x?(0,s.jsx)(l.Z,{modalType:j,payload:0,closeModal:()=>[f(!1),b()]}):null,e?(0,s.jsx)(c.Z,{}):0===h.length?(0,s.jsx)("div",{children:"There is no data"}):t?(0,s.jsx)(a.Z,{}):(0,s.jsx)(o.Z,{config:d,data:h})]})})};r.default=u}},function(e){e.O(0,[976,603,879,774,888,179],function(){return e(e.s=9583)}),_N_E=e.O()}]);