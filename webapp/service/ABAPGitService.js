sap.ui.define([
	"./CoreService",
	"sap/ui/model/odata/ODataUtils"
], function (CoreService, ODataUtils) {
	"use strict";

	var ABAPGitService = CoreService.extend("be.wl.open.sap.central.service.ABAPGitService", {
		_aLibraries: [],
		constructor: function (model) {
			CoreService.call(this, model);
		},
		getLibraries: function () {
			return this.http("/generated.json").get().then(function (oResult) {
				var aFormattedResult = [];
				for (var oProject in oResult) {
					var oFormattedProject = {};
					oFormattedProject[oProject] = oResult[oProject];
					aFormattedResult.push(oFormattedProject);
				}
				return aFormattedResult;
			});
		}
	});
	return ABAPGitService;
});