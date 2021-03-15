(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-module"],{

/***/ "7KUl":
/*!******************************************************************!*\
  !*** ./src/app/routes/settings/gsettings/gsettings.component.ts ***!
  \******************************************************************/
/*! exports provided: SettingsGsettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsGsettingsComponent", function() { return SettingsGsettingsComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _shared_utils_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/utils/colors */ "r7EH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_components_page_header_page_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/components/page-header/page-header.component */ "tgey");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _ng_matero_extensions_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-matero/extensions/tooltip */ "SnOn");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _ng_matero_extensions_data_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-matero/extensions/data-grid */ "hGDI");








function SettingsGsettingsComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Agregar nuevo registro!");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function SettingsGsettingsComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Editar registro selecconado!");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function SettingsGsettingsComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Eliminar registro selecconado!");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class SettingsGsettingsComponent {
    constructor() {
        this.columns = [
            { header: 'Nombre', field: 'name' },
            { header: 'Peso', field: 'weight' },
            { header: 'Género', field: 'gender' },
            { header: 'Móvil', field: 'mobile', hide: true },
            { header: 'Ciudad', field: 'city' },
        ];
        this.list = [{
                "name": "Luis",
                "weight": "170 lb",
                "gender": "masc",
                "mobile": "",
                "city": "MGA"
            },
            {
                "name": "Sugeyli",
                "weight": "130 lb",
                "gender": "fem",
                "mobile": "",
                "city": "MGA"
            },
            {
                "name": "Danilo",
                "weight": "165 lb",
                "gender": "masc",
                "mobile": "77425296",
                "city": "MGA"
            }
        ];
        this.multiSelectable = false;
        this.hideRowSelectionCheckbox = true;
        this.rowSelectable = true;
        this.rowSelected = this.list.slice(0);
        this.rowSelectionFormatter = {
            disabled: data => data.name === 'Boron',
            hideCheckbox: data => data.name === 'John',
        };
        this.rowHover = true;
        this.rowStriped = true;
        this.addButtonColor = _shared_utils_colors__WEBPACK_IMPORTED_MODULE_1__["MAT_COLORS"].red[100];
        this.positionOptions = ['after', 'before', 'above', 'below', 'left', 'right'];
        this.position = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](this.positionOptions[2]);
    }
    ngOnInit() {
        this.selectedName = this.rowSelected[0].name;
        console.log(this.addButtonColor);
    }
    onRowSelection(e) {
        this.rowSelected = e;
        this.selectedName = this.rowSelected[0].name;
        //console.log(e);
    }
}
SettingsGsettingsComponent.ɵfac = function SettingsGsettingsComponent_Factory(t) { return new (t || SettingsGsettingsComponent)(); };
SettingsGsettingsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SettingsGsettingsComponent, selectors: [["app-settings-gsettings"]], decls: 20, vars: 15, consts: [["mat-mini-fab", "", "color", "primary", 3, "mtxTooltip", "mtxTooltipPosition"], ["tooltipAdd", ""], ["mat-mini-fab", "", "color", "accent", 3, "mtxTooltip", "mtxTooltipPosition"], ["tooltipEdit", ""], ["mat-mini-fab", "", "color", "warn", 3, "mtxTooltip", "mtxTooltipPosition"], ["tooltipDelete", ""], [3, "data", "columns", "multiSelectable", "hideRowSelectionCheckbox", "rowSelectable", "rowSelected", "rowSelectionFormatter", "rowHover", "rowStriped", "rowSelectionChange", "cellSelectionChange"]], template: function SettingsGsettingsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "page-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u00A0\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SettingsGsettingsComponent_ng_template_5_Template, 2, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, SettingsGsettingsComponent_ng_template_10_Template, 2, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "\n\u00A0\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "delete");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, SettingsGsettingsComponent_ng_template_16_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "mtx-grid", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("rowSelectionChange", function SettingsGsettingsComponent_Template_mtx_grid_rowSelectionChange_19_listener($event) { return ctx.onRowSelection($event); })("cellSelectionChange", function SettingsGsettingsComponent_Template_mtx_grid_cellSelectionChange_19_listener($event) { return ctx.onRowSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](11);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mtxTooltip", _r0)("mtxTooltipPosition", ctx.position.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mtxTooltip", _r2)("mtxTooltipPosition", ctx.position.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mtxTooltip", _r4)("mtxTooltipPosition", ctx.position.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", ctx.list)("columns", ctx.columns)("multiSelectable", ctx.multiSelectable)("hideRowSelectionCheckbox", ctx.hideRowSelectionCheckbox)("rowSelectable", ctx.rowSelectable)("rowSelected", ctx.rowSelected)("rowSelectionFormatter", ctx.rowSelectionFormatter)("rowHover", ctx.rowHover)("rowStriped", ctx.rowStriped);
    } }, directives: [_shared_components_page_header_page_header_component__WEBPACK_IMPORTED_MODULE_3__["PageHeaderComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _ng_matero_extensions_tooltip__WEBPACK_IMPORTED_MODULE_5__["MtxTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIcon"], _ng_matero_extensions_data_grid__WEBPACK_IMPORTED_MODULE_7__["MtxGridComponent"]], styles: [".mat-checkbox[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    margin-right: 1rem;\r\n    margin-bottom: 1rem;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdzZXR0aW5ncy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixtQkFBbUI7RUFDckIiLCJmaWxlIjoiZ3NldHRpbmdzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWNoZWNrYm94IHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi1yaWdodDogMXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgfSJdfQ== */"] });


/***/ }),

/***/ "ELyV":
/*!************************************************************!*\
  !*** ./src/app/routes/settings/settings-routing.module.ts ***!
  \************************************************************/
/*! exports provided: SettingsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsRoutingModule", function() { return SettingsRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _gsettings_gsettings_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gsettings/gsettings.component */ "7KUl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [{ path: 'gsettings', component: _gsettings_gsettings_component__WEBPACK_IMPORTED_MODULE_1__["SettingsGsettingsComponent"] }
];
class SettingsRoutingModule {
}
SettingsRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: SettingsRoutingModule });
SettingsRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function SettingsRoutingModule_Factory(t) { return new (t || SettingsRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SettingsRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "NZL8":
/*!****************************************************!*\
  !*** ./src/app/routes/settings/settings.module.ts ***!
  \****************************************************/
/*! exports provided: SettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/shared.module */ "PCNd");
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings-routing.module */ "ELyV");
/* harmony import */ var _gsettings_gsettings_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gsettings/gsettings.component */ "7KUl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




const COMPONENTS = [_gsettings_gsettings_component__WEBPACK_IMPORTED_MODULE_2__["SettingsGsettingsComponent"]];
const COMPONENTS_DYNAMIC = [];
class SettingsModule {
}
SettingsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SettingsModule });
SettingsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function SettingsModule_Factory(t) { return new (t || SettingsModule)(); }, imports: [[
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"],
            _settings_routing_module__WEBPACK_IMPORTED_MODULE_1__["SettingsRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SettingsModule, { declarations: [_gsettings_gsettings_component__WEBPACK_IMPORTED_MODULE_2__["SettingsGsettingsComponent"]], imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"],
        _settings_routing_module__WEBPACK_IMPORTED_MODULE_1__["SettingsRoutingModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=settings-settings-module.js.map