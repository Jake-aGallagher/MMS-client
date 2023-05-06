"use strict";
exports.id = 274;
exports.ids = [274];
exports.modules = {

/***/ 4350:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bo": () => (/* binding */ authorityType),
/* harmony export */   "D1": () => (/* binding */ remainingStockType),
/* harmony export */   "FE": () => (/* binding */ deleteType),
/* harmony export */   "FJ": () => (/* binding */ adjustStockType),
/* harmony export */   "Mg": () => (/* binding */ dateType),
/* harmony export */   "T2": () => (/* binding */ completedType),
/* harmony export */   "Tv": () => (/* binding */ contentsType),
/* harmony export */   "VV": () => (/* binding */ editWithHideType),
/* harmony export */   "Vo": () => (/* binding */ deleteWithHideType),
/* harmony export */   "Ye": () => (/* binding */ arrivedType),
/* harmony export */   "b": () => (/* binding */ editType),
/* harmony export */   "tj": () => (/* binding */ linkType),
/* harmony export */   "zc": () => (/* binding */ urlType)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4563);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__]);
_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const linkType = (name, linkColPrefix, link)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: linkColPrefix + link,
        className: "border-b-2 border-black hover:text-blue-600 hover:border-blue-600",
        children: name
    });
};
const dateType = (dateString)=>{
    return dateString === "00/00/00" ? "" : dateString;
};
const urlType = (urlString)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
        className: "border-b-2 border-black hover:text-blue-600 hover:border-blue-600",
        href: "https://" + urlString,
        target: "_blank",
        rel: "noreferrer",
        children: urlString
    });
};
const completedType = (completed)=>{
    return completed === 1 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: "✔"
    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: "❌"
    });
};
const arrivedType = (arrived)=>{
    return arrived === 1 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: "✔"
    }) : null;
};
const authorityType = (level)=>{
    switch(level){
        case 4:
            return "Admin";
        case 3:
            return "Manager";
        case 2:
            return "Engineer";
        default:
            return "Staff";
    }
};
const remainingStockType = (remainingStock, usage)=>{
    if (remainingStock === 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-row justify-center items-center",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faXmark,
                    className: "mr-1 w-5 text-red-600"
                }),
                " ",
                remainingStock
            ]
        });
    } else if (usage === 0 || remainingStock / usage > 1) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-row justify-center items-center",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faCheck,
                    className: "mr-1 w-5 text-green-500"
                }),
                " ",
                remainingStock
            ]
        });
    } else {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-row justify-center items-center",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faTriangleExclamation,
                    className: "mr-1 w-5 text-yellow-500"
                }),
                " ",
                remainingStock
            ]
        });
    }
};
const adjustStockType = (id, name, remaining_quantity, adjustStockFunction)=>{
    if (adjustStockFunction) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex flex-row justify-center items-center hover:cursor-pointer select-none",
            onClick: ()=>adjustStockFunction(id, name, remaining_quantity),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faPenToSquare,
                className: "mr-1 w-5"
            })
        });
    }
};
const contentsType = (contents, name, viewTooManyItems)=>{
    if (contents.length < 5) {
        const list = contents.map((i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: i.part_no + " / " + i.name + " / Quantity: " + i.quantity
            }, "contentsItem" + i.spare_id));
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
            children: list
        });
    } else if (viewTooManyItems) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
            onClick: ()=>viewTooManyItems(contents, name),
            children: "\uD83D\uDD0D"
        });
    }
};
const editType = (id, name, editFunction)=>{
    if (editFunction) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex flex-row justify-center items-center hover:cursor-pointer select-none",
            onClick: ()=>editFunction(id, name),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faPenToSquare,
                className: "mr-1 w-5"
            })
        });
    }
};
const editWithHideType = (id, name, hide, editFunction)=>{
    if (editFunction && hide != 1) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex flex-row justify-center items-center hover:cursor-pointer select-none",
            onClick: ()=>editFunction(id, name),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faPenToSquare,
                className: "mr-1 w-5"
            })
        });
    } else {
        return;
    }
};
const deleteType = (id, name, deleteFunction)=>{
    if (deleteFunction) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex flex-row justify-center items-center hover:cursor-pointer select-none",
            onClick: ()=>deleteFunction(id, name),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faXmark,
                className: "mr-1 w-5 text-red-600"
            })
        });
    }
};
const deleteWithHideType = (id, name, hide, deleteFunction)=>{
    if (deleteFunction && hide != 1) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex flex-row justify-center items-center hover:cursor-pointer select-none",
            onClick: ()=>deleteFunction(id, name),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faXmark,
                className: "mr-1 w-5 text-red-600"
            })
        });
    } else {
        return;
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const SearchBar = (props)=>{
    const buildSearchArea = ()=>{
        const searchableHeaders = props.headers.filter((item)=>item.search === true);
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col w-max my-4 ml-10 rounded-sm",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                    className: "mb-2",
                    value: props.searchType != "" ? props.searchType : searchableHeaders[0].name,
                    onChange: searchOptionHandler,
                    children: searchOptions(searchableHeaders)
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    className: "bg-blue-200 rounded-sm",
                    value: props.searchTerm,
                    onChange: (e)=>props.setSearchTerm(e.target.value)
                })
            ]
        });
    };
    const searchOptions = (options)=>{
        return options.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                value: item.id,
                children: item.name
            }, item.id + "_searchOption"));
    };
    const searchOptionHandler = (e)=>{
        props.setSearchType(e.target.value);
        props.setSearchTerm("");
    };
    return buildSearchArea();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBar);


/***/ }),

/***/ 7274:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4350);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3052);
/* harmony import */ var _searchBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8726);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__]);
_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const SortableTable = (props)=>{
    const unfilteredData = props.data;
    const [filteredData, setFilteredData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [sortedData, setSortedData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [currentSort, setCurrentSort] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        col: props.config.headers[0].id,
        dir: "DSC"
    });
    const [searchType, setSearchType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        sortData(currentSort.col, currentSort.dir);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        filterFunction();
    }, [
        searchTerm
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        sortData(currentSort.col, currentSort.dir);
    }, [
        filteredData
    ]);
    const filterFunction = ()=>{
        if (searchTerm.length > 0) {
            /// @ts-ignore
            const filtered = unfilteredData.filter((item)=>item[searchType].toUpperCase().includes(searchTerm.toUpperCase()));
            setFilteredData(filtered);
        } else {
            setFilteredData(unfilteredData);
        }
    };
    const sortFunction = (chosenSort)=>{
        if (chosenSort === currentSort.col) {
            if (currentSort.dir === "DSC") {
                setCurrentSort({
                    col: currentSort.col,
                    dir: "ASC"
                });
                sortData(currentSort.col, "ASC");
            } else {
                setCurrentSort({
                    col: currentSort.col,
                    dir: "DSC"
                });
                sortData(currentSort.col, "DSC");
            }
        } else {
            setCurrentSort({
                col: chosenSort,
                dir: "DSC"
            });
            sortData(chosenSort, "DSC");
        }
    };
    const sortData = (col, dir)=>{
        let unorderedData = filteredData ? filteredData : props.data;
        if (unorderedData.length > 0) {
            if (dir === "DSC") {
                /// @ts-ignore
                unorderedData.sort((a, b)=>b[col] > a[col] ? 1 : b[col] < a[col] ? -1 : 0);
            } else {
                /// @ts-ignore
                unorderedData.sort((a, b)=>a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0);
            }
        }
        setSortedData(unorderedData);
        setLoading(false);
    };
    const buildTableHead = props.config.headers.map((item)=>{
        if (item.order) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                className: "border-2 border-solid border-gray-500 px-2 cursor-pointer select-none",
                onClick: ()=>sortFunction(item.id),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: " flex flex-row justify-center items-center",
                    children: [
                        item.name,
                        currentSort.col != item.id ? null : currentSort.dir === "ASC" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "ml-2 text-2xl",
                            children: "↓"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "ml-2 text-2xl",
                            children: "↑"
                        })
                    ]
                })
            }, "head." + item.id);
        } else {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                className: "border-2 border-solid border-gray-500 px-2 select-none",
                children: item.name
            }, "head." + item.id);
        }
    });
    const buildTableBody = ()=>{
        if (sortedData && sortedData?.length > 0) {
            const table = sortedData.map((rowInfo)=>/// @ts-ignore
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                    children: buildTableRow(rowInfo)
                }, "body" + rowInfo[props.config.headers[0].id]));
            return table;
        } else return;
    };
    const buildTableRow = (rowInfo)=>{
        const rowData = props.config.headers.map((header)=>{
            let inner = null;
            switch(header.type){
                case "string":
                    inner = rowInfo[header.id];
                    break;
                case "link":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .linkType */ .tj)(rowInfo[header.id], props.config.linkColPrefix, rowInfo[header.id]);
                    break;
                case "linkWithName":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .linkType */ .tj)(rowInfo[header.nameParam], props.config.linkColPrefix, rowInfo[header.id]);
                    break;
                case "url":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .urlType */ .zc)(rowInfo[header.id]);
                    break;
                case "date":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .dateType */ .Mg)(rowInfo[header.id]);
                    break;
                case "authSwitch":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .authorityType */ .Bo)(rowInfo[header.id]);
                    break;
                case "completed":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .completedType */ .T2)(rowInfo[header.id]);
                    break;
                case "arrived":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .arrivedType */ .Ye)(rowInfo[header.id]);
                    break;
                case "contents":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .contentsType */ .Tv)(rowInfo[header.id], rowInfo[header.functionNamePointer], props.viewTooManyItems);
                    break;
                case "remaining_stock":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .remainingStockType */ .D1)(rowInfo[header.id], rowInfo[header.avgUsagePointer]);
                    break;
                case "adjust_stock":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .adjustStockType */ .FJ)(rowInfo[header.functionIdPointer], rowInfo[header.functionNamePointer], rowInfo[header.quantRemainPonter], props.adjustStockFunction);
                    break;
                case "edit":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .editType */ .b)(rowInfo[header.functionIdPointer], rowInfo[header.functionNamePointer], props.editFunction);
                    break;
                case "editWithHide":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .editWithHideType */ .VV)(rowInfo[header.functionIdPointer], rowInfo[header.functionNamePointer], rowInfo[header.hidePointer], props.editFunction);
                    break;
                case "delete":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .deleteType */ .FE)(rowInfo[header.functionIdPointer], rowInfo[header.functionNamePointer], props.deleteFunction);
                    break;
                case "deleteWithHide":
                    inner = (0,_rowTypeFunctions__WEBPACK_IMPORTED_MODULE_2__/* .deleteWithHideType */ .Vo)(rowInfo[header.functionIdPointer], rowInfo[header.functionNamePointer], rowInfo[header.hidePointer], props.deleteFunction);
                    break;
                default:
                    inner = rowInfo[header.id];
                    break;
            }
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                className: "border border-solid border-gray-500 px-2 text-center p-2",
                children: inner
            }, "cell." + header.id);
        });
        return rowData;
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                props.config.searchable && props.config.headers.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_searchBar__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    headers: props.config.headers,
                    searchType: searchType,
                    searchTerm: searchTerm,
                    setSearchType: setSearchType,
                    setSearchTerm: setSearchTerm
                }) : null,
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                    className: "min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                className: "bg-gray-200",
                                children: buildTableHead
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                            children: buildTableBody()
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SortableTable);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;