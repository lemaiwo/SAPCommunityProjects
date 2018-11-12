sap.ui.define([
	"sap/ui/base/ManagedObject",
	"./MenuItem"
], function (ManagedObect,MenuItem) {
	"use strict";
	return ManagedObect.extend('be.wl.open.sap.central.model.Project', {
		metadata: {
			properties: {
				name:"string",
				namespace:"string",
				description:"string",
				documentation:"string",
				icon:"string",
				license:"string",
				source:"string",
				avatar:"string",
				createby:"string",
				profile:"string"
			},
			aggregations: {
			},
			events: {
			}
		},

		init: function () {
		}

	});
});