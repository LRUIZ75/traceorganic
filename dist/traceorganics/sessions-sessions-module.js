(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sessions-sessions-module"],{

/***/ "5S2Q":
/*!**************************************************!*\
  !*** ./src/app/routes/sessions/404.component.ts ***!
  \**************************************************/
/*! exports provided: Error404Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error404Component", function() { return Error404Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_components_error_code_error_code_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/components/error-code/error-code.component */ "6NLr");


class Error404Component {
}
Error404Component.ɵfac = function Error404Component_Factory(t) { return new (t || Error404Component)(); };
Error404Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Error404Component, selectors: [["app-error-404"]], decls: 1, vars: 2, consts: [["code", "404", 3, "title", "message"]], template: function Error404Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "error-code", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", "Page not found!")("message", "This is not the web page you are looking for.");
    } }, directives: [_shared_components_error_code_error_code_component__WEBPACK_IMPORTED_MODULE_1__["ErrorCodeComponent"]], encapsulation: 2 });


/***/ }),

/***/ "M4MW":
/*!**************************************************!*\
  !*** ./src/app/routes/sessions/403.component.ts ***!
  \**************************************************/
/*! exports provided: Error403Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error403Component", function() { return Error403Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_components_error_code_error_code_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/components/error-code/error-code.component */ "6NLr");


class Error403Component {
}
Error403Component.ɵfac = function Error403Component_Factory(t) { return new (t || Error403Component)(); };
Error403Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Error403Component, selectors: [["app-error-403"]], decls: 1, vars: 2, consts: [["code", "403", 3, "title", "message"]], template: function Error403Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "error-code", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", "Permission denied!")("message", "You do not have permission to access the requested data.");
    } }, directives: [_shared_components_error_code_error_code_component__WEBPACK_IMPORTED_MODULE_1__["ErrorCodeComponent"]], encapsulation: 2 });


/***/ }),

/***/ "WV3b":
/*!************************************************************!*\
  !*** ./src/app/routes/sessions/sessions-routing.module.ts ***!
  \************************************************************/
/*! exports provided: SessionsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionsRoutingModule", function() { return SessionsRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _403_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./403.component */ "M4MW");
/* harmony import */ var _404_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./404.component */ "5S2Q");
/* harmony import */ var _500_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./500.component */ "yL6a");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






const routes = [
    {
        path: '403',
        component: _403_component__WEBPACK_IMPORTED_MODULE_1__["Error403Component"],
        data: { title: '403 Forbidden', titleI18n: '403 Forbidden' },
    },
    {
        path: '404',
        component: _404_component__WEBPACK_IMPORTED_MODULE_2__["Error404Component"],
        data: { title: '404 Not Found', titleI18n: '404 Not Found' },
    },
    {
        path: '500',
        component: _500_component__WEBPACK_IMPORTED_MODULE_3__["Error500Component"],
        data: { title: '500 Error', titleI18n: '500 Error' },
    },
];
class SessionsRoutingModule {
}
SessionsRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: SessionsRoutingModule });
SessionsRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ factory: function SessionsRoutingModule_Factory(t) { return new (t || SessionsRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](SessionsRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "mYi2":
/*!****************************************************!*\
  !*** ./src/app/routes/sessions/sessions.module.ts ***!
  \****************************************************/
/*! exports provided: SessionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionsModule", function() { return SessionsModule; });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/shared.module */ "PCNd");
/* harmony import */ var _sessions_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sessions-routing.module */ "WV3b");
/* harmony import */ var _403_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./403.component */ "M4MW");
/* harmony import */ var _404_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./404.component */ "5S2Q");
/* harmony import */ var _500_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./500.component */ "yL6a");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






const COMPONENTS = [_404_component__WEBPACK_IMPORTED_MODULE_3__["Error404Component"], _403_component__WEBPACK_IMPORTED_MODULE_2__["Error403Component"], _500_component__WEBPACK_IMPORTED_MODULE_4__["Error500Component"]];
const COMPONENTS_DYNAMIC = [];
class SessionsModule {
}
SessionsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: SessionsModule });
SessionsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ factory: function SessionsModule_Factory(t) { return new (t || SessionsModule)(); }, imports: [[_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"], _sessions_routing_module__WEBPACK_IMPORTED_MODULE_1__["SessionsRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](SessionsModule, { declarations: [_404_component__WEBPACK_IMPORTED_MODULE_3__["Error404Component"], _403_component__WEBPACK_IMPORTED_MODULE_2__["Error403Component"], _500_component__WEBPACK_IMPORTED_MODULE_4__["Error500Component"]], imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"], _sessions_routing_module__WEBPACK_IMPORTED_MODULE_1__["SessionsRoutingModule"]] }); })();


/***/ }),

/***/ "yL6a":
/*!**************************************************!*\
  !*** ./src/app/routes/sessions/500.component.ts ***!
  \**************************************************/
/*! exports provided: Error500Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error500Component", function() { return Error500Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_components_error_code_error_code_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/components/error-code/error-code.component */ "6NLr");


class Error500Component {
}
Error500Component.ɵfac = function Error500Component_Factory(t) { return new (t || Error500Component)(); };
Error500Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Error500Component, selectors: [["app-error-500"]], decls: 1, vars: 2, consts: [["code", "500", 3, "title", "message"]], template: function Error500Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "error-code", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", "Server went wrong!")("message", "Just kidding, looks like we have an internal issue, please try refreshing.");
    } }, directives: [_shared_components_error_code_error_code_component__WEBPACK_IMPORTED_MODULE_1__["ErrorCodeComponent"]], encapsulation: 2 });


/***/ })

}]);
//# sourceMappingURL=sessions-sessions-module.js.map