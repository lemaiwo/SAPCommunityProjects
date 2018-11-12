/*global history */
sap.ui.define([
		"be/wl/open/sap/central/controller/BaseController",
		"sap/ui/model/base/ManagedObjectModel",
		"sap/ui/Device",
		"../../state/CentralState"
	], function (BaseController, ManagedObjectModel,Device,CentralState) {
		"use strict";

		return BaseController.extend("be.wl.open.sap.central.controller.start.Start", {


			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
			 * @public
			 */
			onInit : function () {
				this.CentralState = new CentralState();
				this.setModel(this.CentralState.getModel(),"start");
				this.getRouter().getRoute("start").attachPatternMatched(this._onStartMatched, this);
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Event handler for navigating back.
			 * We navigate back in the browser historz
			 * @public
			 */
			onNavBack : function() {
				history.go(-1);
			},

			/* =========================================================== */
			/* begin: internal methods                                     */
			/* =========================================================== */

			_getMenu:function(){
				
			},
			_onStartMatched :  function() {
				//Set the layout property of the FCL control to 'OneColumn'
				// this.getModel("appView").setProperty("/layout", "OneColumn");
			},

			/**
			 * Shows the selected item on the detail page
			 * On phones a additional history entry is created
			 * @param {sap.m.ObjectListItem} oItem selected Item
			 * @private
			 */
			_showDetail : function (oItem) {
				var bReplace = !Device.system.phone;
				// set the layout property of FCL control to show two columns
				this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
				this.getRouter().navTo("object", {}, bReplace);
			},
			onSearch:function(oEvent){
				this.CentralState.filterProjects(oEvent.getParameter("query"));
			}

		});

	}
);