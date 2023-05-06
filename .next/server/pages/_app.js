(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2013:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/CompanyLogo.a7dba463.png","height":128,"width":128,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA0ElEQVR42mMAAbb890GmTe88GWAg970NEPsygABz/vuQsFlvN0bPe3uCAQiy177mYMj5EAZUEAKkfRnMgDqBksdTl7/56zXhnT8D7ycF6eL3vkDJcKAiWwYY8Ox/55+09M1/u/Z32QyCnxSy1rzhYICBe/9vMzEwfJIESuaAFAEV+zEgOUgNaFymSOH7KqAiKaBkQMqyN39B1gId7gFU8CEOiOuBirLu/7/FxAAEUUAHgxwO9EAgUMF7GaBkPFCROgMQgIBp4ztPoGQQAwMDAwAuEWFFyTbw2AAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 5625:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _store_userSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1649);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_4__]);
axios__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const Login = (props)=>{
    const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [warning, setWarning] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        checkLogin();
    }, []);
    const checkLogin = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_4__["default"].get("http://localhost:3001/check-auth", {
                headers: {
                    "Content-Type": "application/json",
                    Authorisation: "Bearer " + localStorage.getItem("token")
                },
                withCredentials: true
            });
            const user = response.data.user;
            dispatch((0,_store_userSlice__WEBPACK_IMPORTED_MODULE_3__/* .setUser */ .av)({
                username: user.username,
                first: user.first_name,
                last: user.last_name,
                authority: user.authority,
                id: user.id
            }));
            props.loginHandler();
        } catch (err) {}
    };
    const loginHandler = async (e)=>{
        e.preventDefault();
        if (username.length > 0 && password.length > 7) {
            try {
                const response = await axios__WEBPACK_IMPORTED_MODULE_4__["default"].post("http://localhost:3001/users/login", {
                    username: username,
                    password: password
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                if (response.data.response.passedValidation) {
                    const user = response.data.response.user;
                    dispatch((0,_store_userSlice__WEBPACK_IMPORTED_MODULE_3__/* .setUser */ .av)({
                        username: user.username,
                        first: user.first,
                        last: user.last,
                        authority: user.authority,
                        id: user.id
                    }));
                    setWarning(false);
                    localStorage.setItem("token", response.data.response.token);
                    props.refreshExpiry();
                    props.loginHandler();
                } else {
                    setPassword("");
                    setWarning(true);
                }
            } catch (err) {
                setPassword("");
                setWarning(true);
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "container mx-auto h-screen w-screen flex flex-col justify-center items-center",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
            className: "rounded-xl w-8/12 md:w-1/2 lg:w-1/3 mx-auto bg-gray-200 font-bold flex flex-col justify-center px-4 space-y-4 border-2 border-blue-600 p-5",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                    htmlFor: "usernameLogin",
                    className: " ",
                    children: "Username"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    type: "text",
                    name: "username",
                    id: "usernameLogin",
                    onChange: (e)=>setUsername(e.target.value),
                    className: "rounded-sm"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                    htmlFor: "passwordLogin",
                    children: "Password"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    type: "password",
                    name: "password",
                    id: "passwordLogin",
                    value: password,
                    onChange: (e)=>setPassword(e.target.value),
                    className: "rounded-sm"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    type: "submit",
                    onClick: loginHandler,
                    className: "rounded-3xl bg-gray-200 hover:bg-blue-600 h-8 w-1/3 mx-auto px-2 border-2 border-blue-600 hover:border-transparent",
                    children: "Login"
                }),
                warning ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "text-center text-red-600",
                    children: "There has been a problem logging in, please try again"
                }) : null
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9405:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_userSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1649);
/* harmony import */ var _store_propertySlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8256);
/* harmony import */ var _public_CompanyLogo_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2013);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_8__]);
axios__WEBPACK_IMPORTED_MODULE_8__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









const NavBar = (props)=>{
    const userId = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.user.value.id);
    const currentProperty = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.currentProperty.value.currentProperty);
    const [availProps, setAvailProps] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const userDetails = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.user.value);
    const name = userDetails.first + " " + userDetails.last;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const currentRoute = router.pathname;
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        retrieveProperty();
    }, []);
    const retrieveProperty = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_8__["default"].get(`http://localhost:3001/properties/last-property/${userId}`, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.length === 0) {
                alert("You are not assigned to any Properties, please speak to your Line Manager");
            } else {
                setAvailProps(response.data);
                let hasSelectedProp = false;
                response.data.forEach((property)=>{
                    if (property.lastProperty == true) {
                        dispatch((0,_store_propertySlice__WEBPACK_IMPORTED_MODULE_6__/* .setCurrentProperty */ .y4)({
                            currentProperty: property.id
                        }));
                        hasSelectedProp = true;
                    }
                });
                if (hasSelectedProp === false) {
                    dispatch((0,_store_propertySlice__WEBPACK_IMPORTED_MODULE_6__/* .setCurrentProperty */ .y4)({
                        currentProperty: response.data[0].id
                    }));
                }
            }
        } catch (err) {
            alert("There has been an error whilst attempting to retrive your assigned properties, please try again");
        }
    };
    const changedProperty = async (newPropIdString)=>{
        try {
            const newPropId = parseInt(newPropIdString);
            const response = await axios__WEBPACK_IMPORTED_MODULE_8__["default"].put("http://localhost:3001/properties/Last-property", {
                userId: userId,
                propertyId: newPropId
            }, {
                headers: {
                    Authorisation: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.created) {
                dispatch((0,_store_propertySlice__WEBPACK_IMPORTED_MODULE_6__/* .setCurrentProperty */ .y4)({
                    currentProperty: newPropId
                }));
            } else {
                alert("There has been an issue changing property, please try again.");
            }
        } catch (err) {
            alert("There has been an issue changing property, please try again.");
        }
    };
    const logoutProcess = ()=>{
        dispatch((0,_store_userSlice__WEBPACK_IMPORTED_MODULE_5__/* .setUser */ .av)({
            username: "",
            first: "",
            last: "",
            authority: 0,
            id: 0
        }));
        localStorage.removeItem("token");
        localStorage.removeItem("expiryDate");
        props.logoutHandler();
    };
    const propertySelection = availProps.map((p)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
            value: p.id,
            className: "text-blue-600",
            children: p.name
        }, p.id));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed left-0 top-0 h-screen w-52 z-30 bg-gray-200 border-r-2 border-gray-300 flex flex-col pt-4 px-4",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "w-32 h-32 mx-auto mb-2",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    src: _public_CompanyLogo_png__WEBPACK_IMPORTED_MODULE_7__/* ["default"].src */ .Z.src
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "w-32 h-8 mx-auto mb-6 text-center font-bold text-2xl text-blue-600",
                children: "UpTime"
            }),
            availProps && availProps.length > 1 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                value: currentProperty,
                onChange: (e)=>changedProperty(e.target.value),
                className: "w-32 h-8 mx-auto mb-6 text-blue-600 border-b-2 border-blue-600",
                children: propertySelection
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "w-32 h-8 mx-auto mb-6 text-blue-600 border-b-2 border-blue-600",
                children: availProps[0] && availProps[0].name
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                href: "/properties",
                className: "mb-2 w-32 mx-auto hover:text-blue-600 " + (currentRoute.includes("properties") ? "text-blue-600" : ""),
                children: "Properties"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                href: "/jobs",
                className: "mb-2 w-32 mx-auto hover:text-blue-600 " + (currentRoute.includes("jobs") ? "text-blue-600" : ""),
                children: "Jobs"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                href: "/assets",
                className: "mb-2 w-32 mx-auto hover:text-blue-600 " + (currentRoute.includes("assets") ? "text-blue-600" : ""),
                children: "Assets"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                href: "/spares",
                className: "mb-2 w-32 mx-auto hover:text-blue-600 " + (currentRoute.includes("spares") ? "text-blue-600" : ""),
                children: "Spares"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                href: "/settings",
                className: "mb-2 w-32 mx-auto hover:text-blue-600 " + (currentRoute.includes("settings") ? "text-blue-600" : ""),
                children: "Settings"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute left-0 bottom-0 h-24 w-52 ",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "w-32 h-8 mx-auto mb-2",
                        children: name
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: logoutProcess,
                        className: "w-32 h-8 mx-auto mb-2",
                        children: "Logout"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavBar);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "y4": () => (/* binding */ setCurrentProperty)
/* harmony export */ });
/* unused harmony export CurrentPropertySlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    value: {
        currentProperty: 0
    }
};
const CurrentPropertySlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "currentProperty",
    initialState,
    reducers: {
        setCurrentProperty: (state, action)=>{
            state.value.currentProperty = action.payload.currentProperty;
        }
    }
});
const { setCurrentProperty  } = CurrentPropertySlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CurrentPropertySlice.reducer);


/***/ }),

/***/ 4853:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _propertySlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8256);
/* harmony import */ var _userSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);



const store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({
    reducer: {
        user: _userSlice__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP,
        currentProperty: _propertySlice__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP
    }
});


/***/ }),

/***/ 1649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "av": () => (/* binding */ setUser)
/* harmony export */ });
/* unused harmony export UserSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    value: {
        username: "",
        first: "",
        last: "",
        authority: 0,
        id: 0
    }
};
const UserSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.value.username = action.payload.username;
            state.value.first = action.payload.first;
            state.value.last = action.payload.last;
            state.value.authority = action.payload.authority;
            state.value.id = action.payload.id;
        }
    }
});
const { setUser  } = UserSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserSlice.reducer);


/***/ }),

/***/ 3847:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4853);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_navigation_navbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9405);
/* harmony import */ var _components_login_login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5625);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4298);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_navigation_navbar__WEBPACK_IMPORTED_MODULE_6__, _components_login_login__WEBPACK_IMPORTED_MODULE_7__]);
([_components_navigation_navbar__WEBPACK_IMPORTED_MODULE_6__, _components_login_login__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









function App({ Component , pageProps  }) {
    const [loggedIn, setLoggedIn] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const loginHandler = ()=>{
        setLoggedIn(true);
    };
    const logoutHandler = ()=>{
        setLoggedIn(false);
    };
    const forceLogoutHandler = ()=>{
        if (loggedIn) {
            let expiry = localStorage.getItem("expiryDate");
            if (expiry) {
                if (Date.now() < parseInt(expiry)) {
                    refreshExpiry();
                } else {
                    logoutHandler();
                }
            }
        }
        return null;
    };
    const refreshExpiry = ()=>{
        if (localStorage.getItem("expiryDate")) {
            localStorage.removeItem("expiryDate");
        }
        const remainingMilliseconds = 30 * 60 * 1000;
        const expiryDate = new Date().getTime() + remainingMilliseconds;
        localStorage.setItem("expiryDate", expiryDate.toString());
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "UpTime"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "apple-touch-icon",
                        sizes: "120x120",
                        href: "/apple-touch-icon.png"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "icon",
                        type: "image/png",
                        sizes: "32x32",
                        href: "/favicon-32x32.png"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "icon",
                        type: "image/png",
                        sizes: "16x16",
                        href: "/favicon-16x16.png"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "manifest",
                        href: "/site.webmanifest"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "mask-icon",
                        href: "/safari-pinned-tab.svg",
                        color: "#5bbad5"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "msapplication-TileColor",
                        content: "#da532c"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "theme-color",
                        content: "#ffffff"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "description",
                        content: "A Maintenance Management System"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_script__WEBPACK_IMPORTED_MODULE_8___default()), {
                src: "https://kit.fontawesome.com/5e0bf4683d.js",
                crossOrigin: "anonymous"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                className: "h-screen font-sans bg-gray-100",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_redux__WEBPACK_IMPORTED_MODULE_3__.Provider, {
                    store: _components_store_store__WEBPACK_IMPORTED_MODULE_2__/* .store */ .h,
                    children: [
                        forceLogoutHandler(),
                        loggedIn ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_navigation_navbar__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    logoutHandler: logoutHandler
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "pl-52 h-screen",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                                        ...pageProps
                                    })
                                })
                            ]
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_login_login__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                            loginHandler: loginHandler,
                            refreshExpiry: refreshExpiry
                        })
                    ]
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 4298:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(3573)


/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [210,676,664], () => (__webpack_exec__(3847)));
module.exports = __webpack_exports__;

})();