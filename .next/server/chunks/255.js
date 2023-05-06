"use strict";
exports.id = 255;
exports.ids = [255];
exports.modules = {

/***/ 212:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/GreaterThan.95fbe6d8.png","height":352,"width":343,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAeFBMVEUoHBQiGxYiGhUgGhYeGRYdGRYcGBYbGBYaGBYaFxYcGBYcGRYcGBYbGBYYFxcYFxYcGBYaGBYZFxYcGBYdGBYdGRYcGBYdGRYcGBYcGBYcGBYcGBYcGBYdGRYcGBYdGRYcGBYcGBYcGBYcGBYcGBYcGBYcGBYcGBY+xDZDAAAAKHRSTlMAAAAAAAAAAAAAAQICAgICAwMDBCItLjI+Q1BSWVtcYZKZrLK3vcjQt6WUYQAAAEhJREFUeNoNy0UWgDAMBcAPNAlSoLi73f+GZD1vYIkLB8+Alkm4tAzqrnsMOUVC0h5vz4hJ6v0blJrzmSMl2lbh3Am0Z5UfmB+E+gO1jHrgvwAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 6421:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);
axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const AddEditAssetNotes = (props)=>{
    const [note, setNote] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.payload.note);
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].put("http://localhost:3001/asset/notes", {
                id: props.payload.id,
                note
            }, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.created) {
                props.closeModal();
            } else {
                {
                    props.payload.id > 0 ? alert("There has been an issue editing this Note, please try again.") : alert("There has been an issue creating this Note, please try again.");
                }
            }
        } catch (err) {
            {
                props.payload.id > 0 ? alert("There has been an issue editing this Note, please try again.") : alert("There has been an issue creating this Note, please try again.");
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: props.payload.id > 0 ? "Edit Notes" : "Add Note"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "note",
                        children: "Notes:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                        id: "note",
                        rows: 10,
                        className: "mb-2 rounded-sm bg-blue-200",
                        value: note,
                        onChange: (e)=>setNote(e.target.value)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: submitHandler,
                                children: "Submit"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddEditAssetNotes);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 940:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_3__]);
axios__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const AddAsset = (props)=>{
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const submitHandler = async (e)=>{
        e.preventDefault();
        if (name.length > 0) {
            try {
                const response = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].post("http://localhost:3001/asset", {
                    parentId: props.payload.parentId,
                    propertyId: currentProperty,
                    name: name
                }, {
                    headers: {
                        Authorisation: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data.created) {
                    props.closeModal();
                } else {
                    alert("There has been an issue creating this Asset, please try again.");
                }
            } catch (err) {
                alert("There has been an issue creating this Asset, please try again.");
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: [
                    "Create New Component of ",
                    props.payload.parentName
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "name",
                        children: "Component Name:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "name",
                        type: "text",
                        className: "mb-2 rounded-sm bg-blue-200",
                        onChange: (e)=>setName(e.target.value),
                        value: name
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: submitHandler,
                                children: "Submit"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddAsset);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2042:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9648);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3052);
/* harmony import */ var _error_retrieveError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1819);
/* harmony import */ var _modal_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6255);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_3__, _modal_modal__WEBPACK_IMPORTED_MODULE_6__]);
([axios__WEBPACK_IMPORTED_MODULE_3__, _modal_modal__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const CreateJob = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [noData, setNoData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const userId = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.user.value.id);
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const [typeOptions, setTypeOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [selectedType, setSelectedType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [urgencyOptions, setUrgencyOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [selectedUrgency, setSelectedUrgency] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [reqCompDate, setReqCompDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("0000-00-00 00:00:00");
    const [compNow, setCompNow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("No");
    const [viewModal, setViewModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [modalType, setModalType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [modalPayload, setModalPayload] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setLoading(true);
        setError(false);
        setNoData(false);
        getEnums();
    }, []);
    const getEnums = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].get(`http://localhost:3001/enums/create-job`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            setTypeOptions(response.data.types);
            setSelectedType(response.data.types[0].value);
            setUrgencyOptions(response.data.urgency);
            setSelectedUrgency(response.data.urgency[0].value);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].post("http://localhost:3001/jobs", {
                propertyNumber: currentProperty,
                assetNumber: props.assetId,
                type: selectedType,
                title: title,
                description: description,
                urgency: selectedUrgency,
                reqCompDate: reqCompDate,
                reporter: userId
            }, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.created && compNow == "No") {
                props.closeModal();
            } else if (response.data.created && compNow == "Yes") {
                setModalPayload(response.data.jobId);
                setModalType("updateJob");
                setViewModal(true);
            }
        } catch (err) {
            alert("There has been an issue creating this Job, please try again.");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}) : noData ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: "There is no data"
            }) : error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_retrieveError__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    viewModal ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_modal_modal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        modalType: modalType,
                        payload: modalPayload,
                        fullSize: true,
                        closeModal: ()=>[
                                setViewModal(false),
                                props.closeModal()
                            ]
                    }) : "",
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                                children: "Create New Job"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "type",
                                        children: "Job Type:"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                                        id: "type",
                                        className: "mb-2 rounded-sm bg-blue-200",
                                        onChange: (e)=>setSelectedType(e.target.value),
                                        children: typeOptions.map((typeOption)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: typeOption.value,
                                                children: typeOption.value
                                            }, typeOption.value))
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "title",
                                        children: "Title:"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        id: "title",
                                        type: "text",
                                        className: "mb-2 rounded-sm bg-blue-200",
                                        onChange: (e)=>setTitle(e.target.value)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "description",
                                        children: "Job Description:"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                        id: "description",
                                        rows: 5,
                                        className: "mb-2 rounded-sm bg-blue-200 resize-none",
                                        onChange: (e)=>setDescription(e.target.value)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "type",
                                        children: "Urgency:"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                                        id: "type",
                                        className: "mb-2 rounded-sm bg-blue-200",
                                        onChange: (e)=>setSelectedUrgency(e.target.value),
                                        children: urgencyOptions.map((urgencyOption)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: urgencyOption.value,
                                                children: urgencyOption.value
                                            }, urgencyOption.value))
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        children: "Would you like to update and/or complete this Job immediately?"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-row justify-start items-center pl-2 gap-3 py-1",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "no",
                                                children: "No"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "radio",
                                                id: "no",
                                                name: "comp_immediately",
                                                value: "No",
                                                checked: compNow == "No",
                                                onChange: ()=>setCompNow("No")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-row justify-start items-center pl-2 gap-3 py-1",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "yes",
                                                children: "Yes"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "radio",
                                                id: "yes",
                                                name: "comp_immediately",
                                                value: "Yes",
                                                checked: compNow == "Yes",
                                                onChange: ()=>setCompNow("Yes")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                                onClick: props.closeModal,
                                                children: "Cancel"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                                onClick: submitHandler,
                                                children: "Submit"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            ";"
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateJob);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4633:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);
axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const DeleteAsset = (props)=>{
    const submitHandler = async (e, deleteType)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"]["delete"]("http://localhost:3001/asset", {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    id: props.payload.id,
                    deleteType
                }
            });
            if (response.data.deleted) {
                props.closeModal();
            } else {
                alert("There has been an issue deleting this Asset, please try again.");
            }
        } catch (err) {
            alert("There has been an issue deleting this Asset, please try again.");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: [
                    "Delete ",
                    props.payload.name,
                    " and all child components"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-center items-center px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "px-10 font-semibold text-center mb-10",
                        children: "You are about to delete this Asset/Component, this will also delete all child components."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "px-10 font-semibold text-center",
                        children: "Please select if you would like to delete all Jobs linked with the Assets that are deleted."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-red-600 h-8 px-4 min-w-fit border-2 border-red-600 hover:border-transparent hover:text-white w-32",
                                onClick: (e)=>submitHandler(e, "asset"),
                                children: "Delete Assets"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-red-600 h-8 px-4 border-2 border-red-600 hover:border-transparent hover:text-white",
                                onClick: (e)=>submitHandler(e, "assetAndJobs"),
                                children: "Delete Assets and Linked Jobs"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteAsset);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5826:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const RenameAsset = (props)=>{
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const submitHandler = async (e)=>{
        e.preventDefault();
        if (name.length > 0) {
            try {
                const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].put("http://localhost:3001/asset", {
                    id: props.payload.id,
                    name: name
                }, {
                    headers: {
                        Authorisation: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data.created) {
                    props.closeModal();
                } else {
                    alert("There has been an issue creating this Property, please try again.");
                }
            } catch (err) {
                alert("There has been an issue creating this Property, please try again.");
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: [
                    "Rename ",
                    props.payload.oldName
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "name",
                        children: "New Component Name:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "name",
                        type: "text",
                        className: "mb-2 rounded-sm bg-blue-200",
                        onChange: (e)=>setName(e.target.value),
                        value: name
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: submitHandler,
                                children: "Submit"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RenameAsset);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4649:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var _public_GreaterThan_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(212);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const SparesUsed = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [noData, setNoData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const [sparesFullList, setSparesFullList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [sparesFiltered, setSparesFiltered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [sparesUsed, setSparesUsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [chosenFilter, setChosenFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [showRes, setShowRes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [numResults, setNumResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setLoading(true);
        setError(false);
        setNoData(false);
        setSparesUsed(props.payload.sparesUsed);
        getHandler();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        filterResults();
    }, [
        sparesFullList,
        chosenFilter,
        searchTerm
    ]);
    const getHandler = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`http://localhost:3001/spares-for-use/${currentProperty}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            setNumResults(response.data.spares.length);
            if (response.data.spares.length === 0) {
                setNoData(true);
            } else {
                setSparesFullList(response.data.spares);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const filterResults = ()=>{
        let fList = [];
        if (searchTerm.length === 0) {
            sparesFullList.forEach((spare)=>{
                fList.push({
                    ...spare,
                    num_used: 0
                });
            });
        } else if (chosenFilter === 0) {
            sparesFullList.forEach((spare)=>{
                if (spare.part_no.toLowerCase().includes(searchTerm.toLowerCase())) {
                    fList.push({
                        ...spare,
                        num_used: 0
                    });
                }
            });
        } else {
            sparesFullList.forEach((spare)=>{
                if (spare.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    fList.push({
                        ...spare,
                        num_used: 0
                    });
                }
            });
        }
        setSparesFiltered(fList);
        setNumResults(fList.length);
    };
    const usedInputHandler = (inputValue, index)=>{
        let updatedSparesFiltered = [
            ...sparesFiltered
        ];
        updatedSparesFiltered[index].num_used = inputValue;
        setSparesFiltered(updatedSparesFiltered);
    };
    const removeUsedHandler = (e, id)=>{
        e.preventDefault();
        // change spares used to have 0 of this item
        const i = sparesUsed.findIndex((x)=>x.id === id);
        const filtered = sparesUsed.filter((item)=>item.id != id);
        setSparesUsed(()=>[
                ...filtered,
                {
                    id: sparesUsed[i].id,
                    name: sparesUsed[i].name,
                    part_no: sparesUsed[i].part_no,
                    num_used: 0
                }
            ]);
    };
    const usedInputClick = (index, e)=>{
        e.preventDefault();
        const spareToUpdate = sparesFiltered[index];
        const indexOfMatch = sparesUsed.findIndex((x)=>x.id === spareToUpdate.id);
        if (indexOfMatch != -1) {
            const filtered = sparesUsed.filter((item)=>item.id != spareToUpdate.id);
            setSparesUsed((prev)=>[
                    ...filtered,
                    {
                        id: spareToUpdate.id,
                        part_no: spareToUpdate.part_no,
                        name: spareToUpdate.name,
                        num_used: prev[indexOfMatch].num_used + spareToUpdate.num_used
                    }
                ]);
        } else {
            setSparesUsed((prev)=>[
                    ...prev,
                    {
                        id: spareToUpdate.id,
                        part_no: spareToUpdate.part_no,
                        name: spareToUpdate.name,
                        num_used: spareToUpdate.num_used
                    }
                ]);
        }
        const filteredFilterList = sparesFiltered.filter((item)=>item.id != spareToUpdate.id);
        const filterListUnordered = [
            ...filteredFilterList,
            {
                id: spareToUpdate.id,
                part_no: spareToUpdate.part_no,
                name: spareToUpdate.name,
                num_used: 0
            }
        ];
        filterListUnordered.sort((a, b)=>b.part_no.localeCompare(a.part_no));
        setSparesFiltered(filterListUnordered);
    };
    const SubmitHandler = (e)=>{
        e.preventDefault();
        props.passbackDetails(sparesUsed);
        props.closeModal();
    };
    let showSparesUsed;
    if (sparesUsed === undefined || sparesUsed.length === 0) {
        showSparesUsed = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "None"
        });
    } else {
        showSparesUsed = sparesUsed.map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `flex flex-row border-2 border-blue-600 rounded-md mb-2 w-fit px-2 ${i.num_used < 1 ? "hidden" : ""}`,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mr-4",
                        children: i.part_no
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mr-4",
                        children: i.name
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mr-4",
                        children: [
                            props.payload.type === "delivery" ? "Quantity Ordered:" : "Quantity Used:",
                            " ",
                            i.num_used
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: (e)=>{
                            removeUsedHandler(e, i.id);
                        },
                        children: "❌"
                    })
                ]
            }, i.id));
    }
    const showSparesFiltered = sparesFiltered.map((i, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "mr-4",
                    children: i.part_no
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "mr-4",
                    children: i.name
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    type: "number",
                    min: "0",
                    className: "rounded-sm bg-blue-200 my-1 border-2 border-blue-600",
                    value: i.num_used,
                    onChange: (e)=>usedInputHandler(parseInt(e.target.value), index)
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    className: "text-green-600 text-xl ml-4",
                    onClick: (e)=>usedInputClick(index, e),
                    children: "✚"
                })
            ]
        }, Math.random()));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: props.payload.type === "delivery" ? "Add to Delivery" : "Spares Used"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "searchInput",
                        className: "mb-2",
                        children: "Spares Search"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row mb-5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                id: "selectBy",
                                className: "rounded-sm bg-blue-200 mr-2",
                                value: chosenFilter,
                                onChange: (e)=>setChosenFilter(parseInt(e.target.value)),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: 0,
                                        children: "Part Number / ID"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: 1,
                                        children: "Part Name"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                id: "searchInput",
                                type: "text",
                                className: "rounded-sm bg-blue-200 w-full",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value)
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "ml-2 rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent",
                                onClick: (e)=>[
                                        e.preventDefault(),
                                        setSearchTerm("")
                                    ],
                                children: "Clear"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: props.payload.type === "delivery" ? "Items Ordered:" : "Spares Used:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mb-5 mt-1",
                        children: showSparesUsed
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mb-5",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: "Search Results"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-row items-center hover:text-blue-600 icon-filter hover:cursor-pointer select-none",
                                onClick: ()=>setShowRes(!showRes),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        className: `mr-1 h-5 w-5 font-bold text-2xl duration-150 ${showRes ? "rotate-90" : null}`,
                                        src: _public_GreaterThan_png__WEBPACK_IMPORTED_MODULE_3__/* ["default"].src */ .Z.src
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            numResults,
                                            " Results"
                                        ]
                                    })
                                ]
                            }),
                            showRes ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: showSparesFiltered
                            }) : null
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: (e)=>[
                                        e.preventDefault(),
                                        props.closeModal()
                                    ],
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: (e)=>SubmitHandler(e),
                                children: "Submit"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SparesUsed);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3860:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3052);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _error_retrieveError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1819);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modal_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6255);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__, _modal_modal__WEBPACK_IMPORTED_MODULE_7__]);
([axios__WEBPACK_IMPORTED_MODULE_2__, _modal_modal__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const UpdateJob = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [noData, setNoData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const params = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const [statusOptions, setStatusOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [notes, setNotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [sparesUsed, setSparesUsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [time, setTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [completed, setCompleted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [loggedTimeId, setLoggedTimeId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [loggedTimeNum, setLoggedTimeNum] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [loggedTimeDetails, setLoggedTimeDetails] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [viewModal, setViewModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setLoading(true);
        setError(false);
        setNoData(false);
        getJobUpdate();
    }, []);
    let idToSearch = 0;
    if (params.asPath.split("/")[2] === undefined) {
        idToSearch = props.jobId;
    } else {
        idToSearch = parseInt(params.asPath.split("/")[2]);
    }
    const getJobUpdate = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`http://localhost:3001/jobs/update/${currentProperty}/${idToSearch}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.jobDetails === 0) {
                setNoData(true);
            } else {
                setStatusOptions(response.data.statusOptions);
                setUsers(response.data.users);
                if (response.data.usedSpares) {
                    setSparesUsed(response.data.usedSpares);
                }
                if (response.data.timeDetails) {
                    setLoggedTimeDetails(response.data.timeDetails);
                    let totalTime = 0;
                    response.data.timeDetails.forEach((detail)=>{
                        totalTime += detail.time;
                    });
                    setTime(totalTime);
                }
                const data = response.data.jobDetails[0];
                setId(data.id);
                setStatus(data.status);
                if (data.description === null) {
                    setDescription("");
                } else {
                    setDescription(data.description);
                }
                if (data.notes === null) {
                    setNotes("");
                } else {
                    setNotes(data.notes);
                }
                setCompleted(data.completed);
                setNoData(false);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const addSparesHandler = (spares)=>{
        setSparesUsed(spares);
    };
    const addTimeHandler = (e)=>{
        e.preventDefault();
        if (loggedTimeId > 0 && loggedTimeNum > 0) {
            let totalTime = 0;
            loggedTimeDetails.forEach((detail)=>{
                totalTime += detail.time;
            });
            setTime(totalTime + loggedTimeNum);
            const indexOfMatch = loggedTimeDetails.findIndex((x)=>x.id === loggedTimeId);
            if (indexOfMatch != -1) {
                setLoggedTimeDetails((prev)=>{
                    const filtered = prev.filter((item)=>item.id != loggedTimeId);
                    return [
                        ...filtered,
                        {
                            id: loggedTimeId,
                            time: prev[indexOfMatch].time + loggedTimeNum
                        }
                    ];
                });
            } else {
                setLoggedTimeDetails((prev)=>[
                        ...prev,
                        {
                            id: loggedTimeId,
                            time: loggedTimeNum
                        }
                    ]);
            }
            setLoggedTimeId(0);
            setLoggedTimeNum(0);
        }
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        if ((status === "Attended - Fixed" || status === "Attended - Found no Issues") && completed !== 1) {
            if (confirm("You are about to Complete this Job, once completed the only editable section will be the Notes, are you sure you want to continue") === true) {
                submitFull(true);
            }
        } else if (completed !== 1) {
            submitFull(false);
        } else {
            submitNotes();
        }
    };
    const submitFull = async (complete)=>{
        const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].put("http://localhost:3001/jobs/update", {
            id: id,
            status: status,
            description: description,
            notes: notes,
            logged_time: time,
            logged_time_details: loggedTimeDetails,
            complete,
            sparesUsed,
            propertyId: currentProperty
        }, {
            headers: {
                Authorisation: "Bearer " + localStorage.getItem("token")
            }
        });
        if (response.data.created) {
            props.closeModal();
        } else {
            alert("There has been an issue updating this Job, please try again.");
        }
    };
    const submitNotes = async ()=>{
        const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].put("http://localhost:3001/jobs/notes", {
            id: id,
            notes: notes
        }, {
            headers: {
                Authorisation: "Bearer " + localStorage.getItem("token")
            }
        });
        if (response.data.created) {
            props.closeModal();
        } else {
            alert("There has been an issue updating this Job, please try again.");
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}) : noData ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "There is no data"
        }) : error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_retrieveError__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                viewModal ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_modal_modal__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    modalType: "sparesUsed",
                    payload: {
                        sparesUsed,
                        type: "used"
                    },
                    fullSize: true,
                    passbackDeatails: addSparesHandler,
                    closeModal: ()=>setViewModal(false)
                }) : "",
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "h-full w-full rounded-lg relative border-4 border-blue-200",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                            className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                            children: "Update Job"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                            children: [
                                completed !== 1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            htmlFor: "status",
                                            children: "Current Status:"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                                            id: "status",
                                            className: "mb-2 rounded-sm bg-blue-200",
                                            onChange: (e)=>setStatus(e.target.value),
                                            value: status,
                                            children: statusOptions.map((statusOption)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                    value: statusOption.value,
                                                    children: statusOption.value
                                                }, statusOption.value))
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            htmlFor: "description",
                                            children: "Description:"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                            id: "description",
                                            rows: 5,
                                            className: "mb-2 rounded-sm bg-blue-200 resize-none",
                                            onChange: (e)=>setDescription(e.target.value),
                                            value: description
                                        })
                                    ]
                                }) : null,
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    htmlFor: "notes",
                                    children: "Notes:"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                    id: "notes",
                                    rows: 5,
                                    className: "mb-2 rounded-sm bg-blue-200 resize-none",
                                    onChange: (e)=>setNotes(e.target.value),
                                    value: notes
                                }),
                                completed !== 1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 my-2 border-2 border-blue-600",
                                            onClick: (e)=>[
                                                    e.preventDefault(),
                                                    setViewModal(true)
                                                ],
                                            children: "Log Spares Used"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: sparesUsed.map((spare)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: `flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2 ${spare.num_used < 1 ? "hidden" : ""}`,
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "mr-4",
                                                            children: spare.part_no
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "mr-4",
                                                            children: spare.name
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                "Quantity Used: ",
                                                                spare.num_used
                                                            ]
                                                        })
                                                    ]
                                                }, spare.id))
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            htmlFor: "time",
                                            children: "Logged Time (mins):"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex flex-row",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                    className: "bg-blue-200",
                                                    value: loggedTimeId,
                                                    onChange: (e)=>setLoggedTimeId(parseInt(e.target.value)),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                            value: 0
                                                        }, "0"),
                                                        users.map((user)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                value: user.id,
                                                                children: user.first_name + " " + user.last_name
                                                            }, user.id))
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    className: "ml-4 bg-blue-200",
                                                    type: "number",
                                                    min: "0",
                                                    value: loggedTimeNum,
                                                    onChange: (e)=>setLoggedTimeNum(parseInt(e.target.value))
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    className: "text-green-600 text-xl ml-4",
                                                    onClick: addTimeHandler,
                                                    children: "✚"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: loggedTimeDetails.map((pair)=>{
                                                const data = users.find((x)=>x.id === pair.id);
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "mr-4",
                                                            children: data?.first_name + " " + data?.last_name
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "mr-4",
                                                            children: [
                                                                pair.time,
                                                                " mins"
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            onClick: ()=>{
                                                                setLoggedTimeDetails((prev)=>prev.filter((item)=>item.id != pair.id));
                                                                setTime((prev)=>prev - pair.time);
                                                            },
                                                            children: "❌"
                                                        })
                                                    ]
                                                }, pair.id);
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "text-center mb-2",
                                            children: "Note: A job must be set to 'Attended - Found no Issues' or 'Attended - Fixed' in order to complete the job"
                                        })
                                    ]
                                }) : null,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                            onClick: props.closeModal,
                                            children: "Cancel"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                            onClick: submitHandler,
                                            children: (status === "Attended - Fixed" || status === "Attended - Found no Issues") && completed !== 1 ? "Complete" : "Update"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UpdateJob);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6255:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _settings_createUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2908);
/* harmony import */ var _properties_addEditProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3160);
/* harmony import */ var _properties_assignUsers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5698);
/* harmony import */ var _assets_rename__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5826);
/* harmony import */ var _assets_delete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4633);
/* harmony import */ var _assets_create__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(940);
/* harmony import */ var _assets_createJob__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2042);
/* harmony import */ var _jobs_update__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3860);
/* harmony import */ var _jobs_sparesUsed__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4649);
/* harmony import */ var _spares_sparesManagement_addEditSparesNote__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2055);
/* harmony import */ var _spares_sparesManagement_deleteSparesNote__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1700);
/* harmony import */ var _spares_sparesManagement_suppliers_addEditSupplier__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5217);
/* harmony import */ var _spares_sparesManagement_suppliers_deleteSupplier__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5210);
/* harmony import */ var _spares_addEditSparesItem__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(911);
/* harmony import */ var _spares_deleteSparesItem__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3051);
/* harmony import */ var _spares_adjustSparesStock__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(4217);
/* harmony import */ var _assets_addEditAssetNotes__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(6421);
/* harmony import */ var _spares_sparesManagement_deliveries_addEditDelivery__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(335);
/* harmony import */ var _spares_sparesManagement_deliveries_viewExtraItems__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(1987);
/* harmony import */ var _spares_sparesManagement_deliveries_deleteDelivery__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(9953);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_settings_createUser__WEBPACK_IMPORTED_MODULE_1__, _properties_addEditProperty__WEBPACK_IMPORTED_MODULE_2__, _properties_assignUsers__WEBPACK_IMPORTED_MODULE_3__, _assets_rename__WEBPACK_IMPORTED_MODULE_4__, _assets_delete__WEBPACK_IMPORTED_MODULE_5__, _assets_create__WEBPACK_IMPORTED_MODULE_6__, _assets_createJob__WEBPACK_IMPORTED_MODULE_7__, _jobs_update__WEBPACK_IMPORTED_MODULE_8__, _jobs_sparesUsed__WEBPACK_IMPORTED_MODULE_9__, _spares_sparesManagement_addEditSparesNote__WEBPACK_IMPORTED_MODULE_10__, _spares_sparesManagement_deleteSparesNote__WEBPACK_IMPORTED_MODULE_11__, _spares_sparesManagement_suppliers_addEditSupplier__WEBPACK_IMPORTED_MODULE_12__, _spares_sparesManagement_suppliers_deleteSupplier__WEBPACK_IMPORTED_MODULE_13__, _spares_addEditSparesItem__WEBPACK_IMPORTED_MODULE_14__, _spares_deleteSparesItem__WEBPACK_IMPORTED_MODULE_15__, _spares_adjustSparesStock__WEBPACK_IMPORTED_MODULE_16__, _assets_addEditAssetNotes__WEBPACK_IMPORTED_MODULE_17__, _spares_sparesManagement_deliveries_addEditDelivery__WEBPACK_IMPORTED_MODULE_18__, _spares_sparesManagement_deliveries_deleteDelivery__WEBPACK_IMPORTED_MODULE_20__]);
([_settings_createUser__WEBPACK_IMPORTED_MODULE_1__, _properties_addEditProperty__WEBPACK_IMPORTED_MODULE_2__, _properties_assignUsers__WEBPACK_IMPORTED_MODULE_3__, _assets_rename__WEBPACK_IMPORTED_MODULE_4__, _assets_delete__WEBPACK_IMPORTED_MODULE_5__, _assets_create__WEBPACK_IMPORTED_MODULE_6__, _assets_createJob__WEBPACK_IMPORTED_MODULE_7__, _jobs_update__WEBPACK_IMPORTED_MODULE_8__, _jobs_sparesUsed__WEBPACK_IMPORTED_MODULE_9__, _spares_sparesManagement_addEditSparesNote__WEBPACK_IMPORTED_MODULE_10__, _spares_sparesManagement_deleteSparesNote__WEBPACK_IMPORTED_MODULE_11__, _spares_sparesManagement_suppliers_addEditSupplier__WEBPACK_IMPORTED_MODULE_12__, _spares_sparesManagement_suppliers_deleteSupplier__WEBPACK_IMPORTED_MODULE_13__, _spares_addEditSparesItem__WEBPACK_IMPORTED_MODULE_14__, _spares_deleteSparesItem__WEBPACK_IMPORTED_MODULE_15__, _spares_adjustSparesStock__WEBPACK_IMPORTED_MODULE_16__, _assets_addEditAssetNotes__WEBPACK_IMPORTED_MODULE_17__, _spares_sparesManagement_deliveries_addEditDelivery__WEBPACK_IMPORTED_MODULE_18__, _spares_sparesManagement_deliveries_deleteDelivery__WEBPACK_IMPORTED_MODULE_20__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





















const ModalBase = (props)=>{
    const modalToDisplay = (modalType)=>{
        switch(modalType){
            // Property
            case "addEditProperty":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_properties_addEditProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    propertyNumber: props.payload
                });
            case "assignUsers":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_properties_assignUsers__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    propertyNumber: props.payload
                });
            // Asset
            case "addAsset":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_create__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "renameAsset":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_rename__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "addEditAssetNotes":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_addEditAssetNotes__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "deleteAsset":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_delete__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            // Job
            case "createJob":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_createJob__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    assetId: props.payload.assetId
                });
            case "updateJob":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_jobs_update__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    jobId: props.payload
                });
            //Spare
            case "sparesUsed":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_jobs_sparesUsed__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload,
                    passbackDetails: props.passbackDeatails
                });
            case "addEditDelivery":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_sparesManagement_deliveries_addEditDelivery__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "deleteDelivery":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_sparesManagement_deliveries_deleteDelivery__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "viewExtraSpares":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_sparesManagement_deliveries_viewExtraItems__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "addEditSupplier":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_sparesManagement_suppliers_addEditSupplier__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "deleteSupplier":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_sparesManagement_suppliers_deleteSupplier__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "addEditSparesItem":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_addEditSparesItem__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "adjustSparesStock":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_adjustSparesStock__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "deleteSparesItem":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_deleteSparesItem__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "addEditSparesNote":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_sparesManagement_addEditSparesNote__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            case "deleteSparesNote":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_spares_sparesManagement_deleteSparesNote__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                    closeModal: props.closeModal,
                    payload: props.payload
                });
            // Settings
            case "createUser":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_settings_createUser__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                    closeModal: props.closeModal
                });
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: props.fullSize ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "fixed left-0 top-0 h-screen w-screen bg-black opacity-70 z-40 ",
                    onClick: props.closeModal
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "absolute top-0 mx-auto rounded-lg left-0 right-0 h-full w-full bg-blue-50 z-50 ",
                    children: modalToDisplay(props.modalType)
                })
            ]
        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "fixed left-0 top-0 h-screen w-screen bg-black opacity-70 z-40 ",
                    onClick: props.closeModal
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "fixed top-0 mx-auto mt-10 rounded-lg left-0 right-0 h-5/6 w-4/5 lg:w-3/5 bg-blue-50 z-50 ",
                    children: modalToDisplay(props.modalType)
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalBase); // Modal layout
 /* 
<div className="h-full w-full rounded-lg relative border-4 border-blue-200">
    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Title Here</h1>
    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">

        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="mb-2 rounded-sm bg-blue-200" />

        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32">Cancel</button>
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32">Submit</button>
        </div>
    </form>
</div>
 */ 

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3160:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3052);
/* harmony import */ var _error_retrieveError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1819);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const AddEditProperty = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.propertyNumber);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const typeOptions = [
        "Factory",
        "Commercial",
        "Power station",
        "Misc"
    ];
    const [type, setType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(typeOptions[0]);
    const [address, setAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [city, setCity] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [county, setCounty] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [postcode, setPostcode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.propertyNumber > 0) {
            setLoading(true);
            setError(false);
            getPropertyHandler();
        } else {
            setLoading(false);
        }
    }, []);
    const getPropertyHandler = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`http://localhost:3001/properties/${props.propertyNumber}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            const data = response.data[0];
            setId(parseInt(data.id));
            setName(data.name);
            setType(data.type);
            setAddress(data.address);
            setCity(data.city);
            setCounty(data.county);
            setPostcode(data.postcode);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].put("http://localhost:3001/properties", {
                id: id,
                name: name,
                type: type,
                address: address,
                city: city,
                county: county,
                postcode: postcode
            }, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.created) {
                props.closeModal();
            } else {
                {
                    props.propertyNumber > 0 ? alert("There has been an issue editing this Property, please try again.") : alert("There has been an issue creating this Property, please try again.");
                }
            }
        } catch (err) {
            {
                props.propertyNumber > 0 ? alert("There has been an issue editing this Property, please try again.") : alert("There has been an issue creating this Property, please try again.");
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}) : error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_retrieveError__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "h-full w-full rounded-lg relative border-4 border-blue-200",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                    children: props.propertyNumber > 0 ? "Edit " + name : "Add Property"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                    className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Property Name:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: name,
                            onChange: (e)=>setName(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "type",
                            children: "Property Type:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                            id: "type",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: type,
                            onChange: (e)=>setType(e.target.value),
                            defaultValue: type,
                            children: typeOptions.map((typeOption)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: typeOption,
                                    children: typeOption
                                }, typeOption))
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "address",
                            children: "Address:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "address",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: address,
                            onChange: (e)=>setAddress(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "city",
                            children: "City: "
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "city",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: city,
                            onChange: (e)=>setCity(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "county",
                            children: "County:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "county",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: county,
                            onChange: (e)=>setCounty(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "postcode",
                            children: "Postcode:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "postcode",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: postcode,
                            onChange: (e)=>setPostcode(e.target.value)
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: props.closeModal,
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: submitHandler,
                                    children: "Submit"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddEditProperty);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5698:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3052);
/* harmony import */ var _error_retrieveError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1819);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const AssignUsers = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [noData, setNoData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [assignedUsers, setAssignedUsers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setLoading(true);
        setError(false);
        setNoData(false);
        getUsersForAssign();
    }, []);
    const getUsersForAssign = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`http://localhost:3001/properties/users-for-assigning/${props.propertyNumber}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setUsers(response.data);
                let alreadyAssigned = [
                    ...assignedUsers
                ];
                response.data.map((user)=>{
                    if (user.assigned == true) {
                        alreadyAssigned.push(user.id);
                    }
                });
                setAssignedUsers(alreadyAssigned);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const inputChangeHandler = (id)=>{
        if (assignedUsers.includes(id)) {
            const newArr = assignedUsers.filter((user)=>user != id);
            setAssignedUsers(newArr);
        } else {
            setAssignedUsers([
                ...assignedUsers,
                id
            ]);
        }
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].put("http://localhost:3001/properties/assign-users", {
                propertyNo: props.propertyNumber,
                assignedUsers
            }, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.created) {
                props.closeModal();
            } else {
                alert("There has been an issue Assigning Users to this Property, please try again.");
            }
        } catch (err) {
            alert("There has been an issue Assigning Users to this Property, please try again.");
        }
    };
    const inputs = users.map((user)=>{
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            className: "grid overflow-hidden grid-cols-10 grid-rows-1 border-b-2 mb-2",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "box col-start-1 col-end-9",
                    children: user.first_name + " " + user.last_name
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    type: "checkbox",
                    defaultChecked: assignedUsers.includes(user.id),
                    value: user.id,
                    className: "box col-start-9 col-end-10",
                    onChange: ()=>inputChangeHandler(user.id)
                })
            ]
        }, user.username);
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}) : noData ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "There is no data"
        }) : error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_retrieveError__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "h-full w-full rounded-lg relative border-4 border-blue-200",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                    children: "Assign Users"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                    className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                    children: [
                        noData ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: "There are no users"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "w-full flex flex-col justify-start pt-2 ",
                            children: inputs
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: props.closeModal,
                                    children: "Cancel"
                                }),
                                noData ? "" : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: submitHandler,
                                    children: "Submit"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssignUsers);
/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "h-full w-full rounded-lg relative border-4 border-blue-600",
    children: [
        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
            className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200 border-b-4 border-blue-600",
            children: "Title Here"
        }),
        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
            className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                    htmlFor: "username",
                    children: "Username"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    id: "username",
                    type: "text",
                    className: "mb-2 rounded-sm bg-blue-200"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full border-t-4 border-blue-600 bg-blue-200",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent w-32",
                            children: "Cancel"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent w-32",
                            children: "Submit"
                        })
                    ]
                })
            ]
        })
    ]
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2908:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_3__]);
axios__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const CreateUser = (props)=>{
    const authLevel = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.user.value.authority);
    const [authOptions, setAuthOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        ""
    ]);
    const [auth, setAuth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(authLevel == 4 ? "Admin" : "Engineer");
    const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [first, setFirst] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [last, setLast] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [retyped, setRetyped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (authLevel == 4) {
            setAuthOptions([
                "Admin",
                "Manager",
                "Engineer",
                "Staff"
            ]);
        } else {
            setAuthOptions([
                "Engineer",
                "Staff"
            ]);
        }
    }, []);
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].post("http://localhost:3001/users", {
                username: username,
                first: first,
                last: last,
                password: password,
                auth: auth
            }, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.created) {
                props.closeModal();
            } else {
                alert("There has been an issue creating this User, please try again.");
            }
        } catch (err) {
            alert("There has been an issue creating this User, please try again.");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: "Create New User"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "username",
                        children: "Username:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "username",
                        type: "text",
                        className: "mb-2 rounded-sm bg-blue-200",
                        onChange: (e)=>setUsername(e.target.value)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "firstname",
                        children: "First Name:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "firstname",
                        type: "text",
                        className: "mb-2 rounded-sm bg-blue-200",
                        onChange: (e)=>setFirst(e.target.value)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "lastname",
                        children: "Last Name:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "lastname",
                        type: "text",
                        className: "mb-2 rounded-sm bg-blue-200",
                        onChange: (e)=>setLast(e.target.value)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "password",
                        children: "Password:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "password",
                        type: "password",
                        className: "mb-2 rounded-sm bg-blue-200",
                        onChange: (e)=>setPassword(e.target.value)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "retypepassword",
                        children: "Re-Enter Password:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "retypepassword",
                        type: "password",
                        className: "mb-2 rounded-sm bg-blue-200",
                        onChange: (e)=>setRetyped(e.target.value)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "auth",
                        children: "User Authority Level:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                        id: "auth",
                        className: "mb-2 rounded-sm bg-blue-200",
                        onChange: (e)=>setAuth(e.target.value),
                        defaultValue: auth,
                        children: authOptions.map((authOption)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                value: authOption,
                                children: authOption
                            }, authOption))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: submitHandler,
                                children: "Submit"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateUser);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 911:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9648);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3052);
/* harmony import */ var _error_retrieveError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1819);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_3__]);
axios__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const AddEditSparesItem = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const [partNo, setPartNo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [manPartNo, setManPartNo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [manName, setManName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [notes, setNotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [location, setLocation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [quantRemaining, setQuantRemaining] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [supplier, setSupplier] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [cost, setCost] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);
    const getHandler = async ()=>{
        try {
            const spare = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].get(`http://localhost:3001/spares/${props.payload.id}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            const s = spare.data[0];
            setPartNo(s.part_no);
            setManPartNo(s.man_part_no);
            setName(s.name);
            setManName(s.man_name);
            setDescription(s.description);
            setNotes(s.notes);
            setLocation(s.location);
            setQuantRemaining(s.quant_remain);
            setSupplier(s.supplier);
            setCost(s.cost);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].put("http://localhost:3001/spares/add-edit", {
                partNo,
                manPartNo,
                name,
                manName,
                description,
                notes,
                location,
                quantRemaining,
                supplier,
                cost,
                propertyId: currentProperty,
                id: props.payload.id
            }, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.created) {
                props.closeModal();
            } else {
                {
                    props.payload?.name && props.payload?.name.length > 0 ? alert("There has been an issue editing this Spares Item, please try again.") : alert("There has been an issue creating this Spares Item, please try again.");
                }
            }
        } catch (err) {
            {
                props.payload?.name && props.payload?.name.length > 0 ? alert("There has been an issue editing this Spares Item, please try again.") : alert("There has been an issue creating this Spares Item, please try again.");
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}) : error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_retrieveError__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "h-full w-full rounded-lg relative border-4 border-blue-200",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                    children: props.payload.name.length > 0 ? props.payload.name : "Add Spares Item"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                    className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Part Number:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: partNo,
                            onChange: (e)=>setPartNo(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Manufacturers Part Number:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: manPartNo,
                            onChange: (e)=>setManPartNo(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Item Name:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: name,
                            onChange: (e)=>setName(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Manufacturers Item Name:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: manName,
                            onChange: (e)=>setManName(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Description:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                            id: "name",
                            rows: 4,
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: description,
                            onChange: (e)=>setDescription(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Notes:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                            id: "name",
                            rows: 4,
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: notes,
                            onChange: (e)=>setNotes(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Location:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: location,
                            onChange: (e)=>setLocation(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Quantity in Stock:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "number",
                            min: 0,
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: quantRemaining,
                            onChange: (e)=>setQuantRemaining(parseInt(e.target.value))
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Supplier:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: supplier,
                            onChange: (e)=>setSupplier(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Cost per Item:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "number",
                            min: 0,
                            className: "mb-6 rounded-sm bg-blue-200",
                            value: cost,
                            onChange: (e)=>setCost(parseInt(e.target.value))
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: props.closeModal,
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: submitHandler,
                                    children: "Submit"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddEditSparesItem);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4217:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);
axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const AdjustSparesStock = (props)=>{
    const [diff, setDiff] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [newStock, setNewStock] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.payload.quantityRemaining);
    const changeDiff = (updatedDiff)=>{
        if (Number.isNaN(updatedDiff)) {
            console.log("NaN");
            setDiff(0);
            setNewStock(props.payload.quantityRemaining);
        } else if (updatedDiff !== diff) {
            setDiff(updatedDiff);
            setNewStock(props.payload.quantityRemaining + updatedDiff);
        }
    };
    const changeUpdated = (updated)=>{
        if (updated !== newStock) {
            setDiff(updated - props.payload.quantityRemaining);
            setNewStock(updated);
        }
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        if (newStock >= 0) {
            try {
                const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].put("http://localhost:3001/spares/adjust-stock", {
                    id: props.payload.id,
                    newStock
                }, {
                    headers: {
                        Authorisation: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data.created) {
                    props.closeModal();
                } else {
                    alert("There has been an issue adjusting this stock level, please try again.");
                }
            } catch (err) {
                alert("There has been an issue adjusting this stock level, please try again.");
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: [
                    "Adjust Stock level for ",
                    props.payload.name
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-start items-center px-4 pt-10 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: "Current Stock level"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mb-4 rounded-sm text-xl font-semibold bg-transparent text-center w-28 h-10",
                        children: props.payload.quantityRemaining
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "difference",
                        children: "Difference"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "difference",
                        type: "number",
                        className: "mb-4 rounded-sm text-xl font-semibold bg-transparent text-center w-28 h-10",
                        value: diff,
                        onChange: (e)=>changeDiff(parseInt(e.target.value))
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: "stock",
                        children: "New Stock Level"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        id: "stock",
                        type: "number",
                        className: "mb-4 rounded-sm text-xl font-semibold bg-transparent text-center w-28 h-10",
                        value: newStock,
                        onChange: (e)=>changeUpdated(parseInt(e.target.value))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: (e)=>[
                                        e.preventDefault(),
                                        props.closeModal
                                    ],
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: (e)=>submitHandler(e),
                                children: "Submit"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdjustSparesStock);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3051:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);
axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const DeleteSparesItem = (props)=>{
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"]["delete"]("http://localhost:3001/spares/spares-item", {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    id: props.payload.id
                }
            });
            if (response.data.deleted) {
                props.closeModal();
            } else {
                alert("There has been an issue deleting this Spares Item, please try again.");
            }
        } catch (err) {
            alert("There has been an issue deleting this Spares Item, please try again.");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: "Delete Spares Item"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-center items-center px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-10 font-semibold text-center mb-10",
                        children: [
                            "Name: ",
                            props.payload.name
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "px-10 font-semibold text-center mb-10",
                        children: "You are about to delete this spares Item, please click delete to confirm."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-red-600 h-8 px-4 min-w-fit border-2 border-red-600 hover:border-transparent hover:text-white w-32",
                                onClick: (e)=>submitHandler(e),
                                children: "Delete"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteSparesItem);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2055:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _error_retrieveError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1819);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3052);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);
axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const AddEditSparesNote = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [note, setNote] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [count, setcount] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const noteId = props.payload.id;
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (props.payload.id > 0) {
            setError(false);
            setLoading(true);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);
    const getHandler = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`http://localhost:3001/spares/note/${props.payload?.id}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            setTitle(response.data[0].title);
            setNote(response.data[0].content);
            setcount(response.data[0].content.length);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        if (title.length > 0 && note.length > 0) {
            try {
                const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].put("http://localhost:3001/spares/notes", {
                    propertyId: currentProperty,
                    title,
                    note,
                    noteId
                }, {
                    headers: {
                        Authorisation: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data.created) {
                    props.closeModal();
                } else {
                    {
                        props.payload.id > 0 ? alert("There has been an issue editing this Note, please try again.") : alert("There has been an issue creating this Note, please try again.");
                    }
                }
            } catch (err) {
                {
                    props.payload.id > 0 ? alert("There has been an issue editing this Note, please try again.") : alert("There has been an issue creating this Note, please try again.");
                }
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}) : error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_retrieveError__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "h-full w-full rounded-lg relative border-4 border-blue-200",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                    children: props.payload.title.length > 0 ? props.payload.title : "Add Note"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                    className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "text-center",
                            children: "This note will be visible to anyone who visits the Spares Management Page"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "title",
                            children: "Title:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "title",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: title,
                            onChange: (e)=>setTitle(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "note",
                            children: "Note:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                            id: "note",
                            className: "my-2 rounded-sm bg-blue-200",
                            rows: 12,
                            maxLength: 1000,
                            value: note,
                            onChange: (e)=>[
                                    setNote(e.target.value),
                                    setcount(e.target.value.length)
                                ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-center",
                            children: [
                                count,
                                " / 1000 Charachters"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: props.closeModal,
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: (e)=>submitHandler(e),
                                    children: "Submit"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddEditSparesNote);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1700:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);
axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const DeleteSparesNote = (props)=>{
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"]["delete"]("http://localhost:3001/spares/note", {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    id: props.payload.id
                }
            });
            if (response.data.deleted) {
                props.closeModal();
            } else {
                alert("There has been an issue deleting this Note, please try again.");
            }
        } catch (err) {
            alert("There has been an issue deleting this Note, please try again.");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: "Delete Note"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-center items-center px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-10 font-semibold text-center mb-10",
                        children: [
                            "Title: ",
                            props.payload.title
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "px-10 font-semibold text-center mb-10",
                        children: "You are about to delete this Note, please click delete to confirm."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-red-600 h-8 px-4 min-w-fit border-2 border-red-600 hover:border-transparent hover:text-white w-32",
                                onClick: (e)=>submitHandler(e),
                                children: "Delete"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteSparesNote);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 335:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9648);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3052);
/* harmony import */ var _error_retrieveError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1819);
/* harmony import */ var _modal_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6255);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_3__, _modal_modal__WEBPACK_IMPORTED_MODULE_6__]);
([axios__WEBPACK_IMPORTED_MODULE_3__, _modal_modal__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const AddEditDelivery = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const [suppliersList, setSuppliersList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [supplier, setSupplier] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [courier, setCourier] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [placed, setPlaced] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [due, setDue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [arrived, setArrived] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [contents, setContents] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [viewModal, setViewModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandlerFull();
        } else {
            setLoading(true);
            setError(false);
            getHandlerLimited();
        }
    }, []);
    const getHandlerLimited = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].get(`http://localhost:3001/spares/suppliers/${currentProperty}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            setSuppliersList(response.data);
            setSupplier(response.data[0].id);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const getHandlerFull = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].get(`http://localhost:3001/spares/deliveries/${currentProperty}/${props.payload.id}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            const suppliers = response.data.suppliers;
            setSuppliersList(suppliers);
            const delivery = response.data.deliverywithContents[0];
            setId(delivery.id);
            setName(delivery.name);
            setSupplier(delivery.supplier);
            setCourier(delivery.courier);
            setPlaced(delivery.placed);
            setDue(delivery.due);
            setArrived(delivery.arrived);
            formatContents(delivery.contents);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    // todo adjust architecture of used spares to use quantity so that the following function can be removed
    // This is a stop gap function required due to tight coupling but incorrect typings of the used spares modal helper
    const formatContents = (deliveryItems)=>{
        const adjustedContentsArr = [];
        deliveryItems.forEach((deliveryItem)=>{
            adjustedContentsArr.push({
                id: deliveryItem.spare_id,
                part_no: deliveryItem.part_no,
                name: deliveryItem.name,
                num_used: deliveryItem.quantity
            });
        });
        setContents(adjustedContentsArr);
    };
    const addSparesHandler = (spares)=>{
        setContents(spares);
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        const contentsRemovedNone = contents.filter((item)=>item.num_used > 0);
        if (contentsRemovedNone.length > 0) {
            try {
                const response = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].put("http://localhost:3001/spares/delivery/add-edit", {
                    id,
                    name,
                    supplier,
                    courier,
                    placed,
                    due,
                    arrived,
                    contents: contentsRemovedNone,
                    propertyId: currentProperty,
                    deliveryId: props.payload.id
                }, {
                    headers: {
                        Authorisation: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data.created) {
                    props.closeModal();
                } else {
                    {
                        props.payload?.name && props.payload?.name.length > 0 ? alert("There has been an issue editing this Delivery, please try again.") : alert("There has been an issue creating this Delivery, please try again.");
                    }
                }
            } catch (err) {
                {
                    props.payload?.name && props.payload?.name.length > 0 ? alert("There has been an issue editing this Delivery, please try again.") : alert("There has been an issue creating this Delivery, please try again.");
                }
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}) : error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_retrieveError__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                viewModal ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_modal_modal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    modalType: "sparesUsed",
                    payload: {
                        sparesUsed: contents,
                        type: "delivery"
                    },
                    fullSize: true,
                    passbackDeatails: addSparesHandler,
                    closeModal: ()=>setViewModal(false)
                }) : "",
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "h-full w-full rounded-lg relative border-4 border-blue-200",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                            className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                            children: props.payload.name.length > 0 ? props.payload.name : "Add Delivery"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    htmlFor: "name",
                                    children: "Delivery Name:"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    id: "name",
                                    type: "text",
                                    className: "mb-2 rounded-sm bg-blue-200",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value)
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    htmlFor: "supplier",
                                    children: "Supplier:"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                                    id: "supplier",
                                    className: "mb-2 rounded-sm bg-blue-200",
                                    value: supplier,
                                    onChange: (e)=>setSupplier(parseInt(e.target.value)),
                                    children: suppliersList?.map((i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: i.id,
                                            children: i.name
                                        }, "supplier_" + i.id))
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    htmlFor: "courier",
                                    children: "Courier:"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    id: "courier",
                                    type: "text",
                                    className: "mb-2 rounded-sm bg-blue-200",
                                    value: courier,
                                    onChange: (e)=>setCourier(e.target.value)
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    htmlFor: "placed",
                                    children: "Placed:"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    id: "placed",
                                    type: "date",
                                    className: "mb-2 rounded-sm bg-blue-200",
                                    value: placed,
                                    onChange: (e)=>setPlaced(e.target.value)
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    htmlFor: "due",
                                    children: "Due:"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    id: "due",
                                    type: "date",
                                    className: "mb-2 rounded-sm bg-blue-200",
                                    value: due,
                                    onChange: (e)=>setDue(e.target.value)
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 my-2 border-2 border-blue-600",
                                    onClick: (e)=>[
                                            e.preventDefault(),
                                            setViewModal(true)
                                        ],
                                    children: "Add Spares to Delivery"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: contents.map((spare)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: `flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2 ${spare.num_used < 1 ? "hidden" : ""}`,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "mr-4",
                                                    children: spare.part_no
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "mr-4",
                                                    children: spare.name
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        "Quantity Ordered: ",
                                                        spare.num_used
                                                    ]
                                                })
                                            ]
                                        }, spare.id))
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "rounded-md my-2 p-2 border-2 border-blue-600 w-full flex flex-row",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                            htmlFor: "arrived",
                                            className: "w-full",
                                            children: [
                                                "Delivery Arrived, Selecting this Will automatically add the Spares items to stock",
                                                " "
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            id: "arrived",
                                            type: "checkbox",
                                            className: "mx-2",
                                            onChange: ()=>setArrived((prev)=>!prev)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                            onClick: props.closeModal,
                                            children: "Cancel"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                            onClick: submitHandler,
                                            children: "Submit"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddEditDelivery);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9953:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);
axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const DeleteDelivery = (props)=>{
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"]["delete"]("http://localhost:3001/spares/delivery", {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    id: props.payload.id
                }
            });
            if (response.data.deleted) {
                props.closeModal();
            } else {
                alert("There has been an issue deleting this Delivery, please try again.");
            }
        } catch (err) {
            alert("There has been an issue deleting this Delivery, please try again.");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: [
                    "Delete ",
                    props.payload.name
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-center items-center px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-10 font-semibold text-center mb-10",
                        children: [
                            "You are about to delete ",
                            props.payload.name,
                            ", please click delete to confirm."
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-red-600 h-8 px-4 min-w-fit border-2 border-red-600 hover:border-transparent hover:text-white w-32",
                                onClick: (e)=>submitHandler(e),
                                children: "Delete"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteDelivery);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1987:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const ViewExtraItems = (props)=>{
    const items = props.payload.contents.map((i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex flex-row border-2 border-blue-600 rounded-md my-4 ml-4 w-fit px-2",
            children: i.part_no + " / " + i.name + " / Quantity: " + i.quantity
        }, "spares_item_" + i.spare_id));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: props.payload.name
            }),
            items,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                    onClick: props.closeModal,
                    children: "Close"
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewExtraItems);


/***/ }),

/***/ 5217:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _error_retrieveError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1819);
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3052);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9648);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_4__]);
axios__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const AddEditSupplier = (props)=>{
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [website, setWebsite] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [phone, setPhone] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [primContact, setPrimContact] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [primContactPhone, setPrimContactPhone] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [address, setAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [city, setCity] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [county, setCounty] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [postcode, setPostcode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [supplies, setSupplies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.payload && props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);
    const getHandler = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_4__["default"].get(`http://localhost:3001/spares/supplier/${props.payload?.id}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            const supply = response.data[0];
            if (supply.length === 0) {
                setError(true);
            } else {
                setName(supply.name);
                setWebsite(supply.website);
                setPhone(supply.phone);
                setPrimContact(supply.prim_contact);
                setPrimContactPhone(supply.prim_contact_phone);
                setAddress(supply.address);
                setCity(supply.city);
                setCounty(supply.county);
                setPostcode(supply.postcode);
                setSupplies(supply.supplies);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    const submitHandler = async (e)=>{
        e.preventDefault();
        if (name.length > 0) {
            try {
                const response = await axios__WEBPACK_IMPORTED_MODULE_4__["default"].put("http://localhost:3001/spares/supplier", {
                    propertyId: currentProperty,
                    id: props.payload.id,
                    name,
                    website,
                    phone,
                    primContact,
                    primContactPhone,
                    address,
                    city,
                    county,
                    postcode,
                    supplies
                }, {
                    headers: {
                        Authorisation: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data.created) {
                    props.closeModal();
                } else {
                    {
                        props.payload.id > 0 ? alert("There has been an issue editing this Note, please try again.") : alert("There has been an issue creating this Note, please try again.");
                    }
                }
            } catch (err) {
                {
                    props.payload.id > 0 ? alert("There has been an issue editing this Note, please try again.") : alert("There has been an issue creating this Note, please try again.");
                }
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loading_loading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}) : error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_retrieveError__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "h-full w-full rounded-lg relative border-4 border-blue-200",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                    children: props.payload.name.length > 0 ? "Edit " + props.payload.name : "Add Supplier"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                    className: "flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Name:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "name",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: name,
                            onChange: (e)=>setName(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "website",
                            children: "Website:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "website",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            maxLength: 100,
                            value: website,
                            onChange: (e)=>setWebsite(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "phone",
                            children: "Phone:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "phone",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: phone,
                            onChange: (e)=>setPhone(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "primContact",
                            children: "Primary Contact:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "primContact",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: primContact,
                            onChange: (e)=>setPrimContact(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "primContactPhone",
                            children: "Primary Contact Phone:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "primContactPhone",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: primContactPhone,
                            onChange: (e)=>setPrimContactPhone(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "address",
                            children: "Address:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "address",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: address,
                            onChange: (e)=>setAddress(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "city",
                            children: "City:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "city",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: city,
                            onChange: (e)=>setCity(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "county",
                            children: "County:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "county",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: county,
                            onChange: (e)=>setCounty(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "postcode",
                            children: "Postcode:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "postcode",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            value: postcode,
                            onChange: (e)=>setPostcode(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "supplies",
                            children: "Supplies:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            id: "supplies",
                            type: "text",
                            className: "mb-2 rounded-sm bg-blue-200",
                            maxLength: 100,
                            value: supplies,
                            onChange: (e)=>setSupplies(e.target.value)
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: props.closeModal,
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                    onClick: (e)=>submitHandler(e),
                                    children: "Submit"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddEditSupplier);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5210:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);
axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const DeleteSupplier = (props)=>{
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"]["delete"]("http://localhost:3001/spares/supplier", {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    id: props.payload.id
                }
            });
            if (response.data.deleted) {
                props.closeModal();
            } else {
                alert("There has been an issue deleting this Supplier, please try again.");
            }
        } catch (err) {
            alert("There has been an issue deleting this Supplier, please try again.");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-full w-full rounded-lg relative border-4 border-blue-200",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                className: "w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200",
                children: [
                    "Delete ",
                    props.payload.name
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "flex flex-col justify-center items-center px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-10 font-semibold text-center mb-10",
                        children: [
                            "You are about to delete ",
                            props.payload.name,
                            ", please click delete to confirm."
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 w-32",
                                onClick: props.closeModal,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "rounded-3xl bg-blue-50 hover:bg-red-600 h-8 px-4 min-w-fit border-2 border-red-600 hover:border-transparent hover:text-white w-32",
                                onClick: (e)=>submitHandler(e),
                                children: "Delete"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteSupplier);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;