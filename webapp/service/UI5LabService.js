sap.ui.define([
	"./CoreService",
	"sap/ui/model/odata/ODataUtils"
], function (CoreService, ODataUtils) {
	"use strict";

	var UI5LabService = CoreService.extend("be.wl.open.sap.central.service.UI5LabService", {
		_aLibraries: [],
		constructor: function (model) {
			CoreService.call(this, model);
		},
		getLibraries: function () {
			return this.http("/browser/libraries.json").get().then(function (response) {
				var aLibRequests = response.libraries.map(function (sLibrary) {
					return this.getLibraryDetails(sLibrary);
				}.bind(this));
				return Promise.all(aLibRequests);
			}.bind(this));
		},
		getLibraryDetails: function (sLibrary) {
			sLibrary = sLibrary.split(".").join("/");
			return this.http("/browser/test-resources/" + sLibrary + "/index.json").get().catch(function (error) {
				return false;
			});
		}
	});
	return UI5LabService;
});