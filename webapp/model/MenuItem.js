sap.ui.define([
	"sap/ui/base/ManagedObject"
], function (ManagedObect) {
	"use strict";
	return ManagedObect.extend('be.wl.open.sap.central.MenuItem', {
		metadata: {
			properties: {
				title: 'string',
				description: 'string'
			},
			aggregations: {
			},
			events: {
			},
		},

		init: function () {}

	});
});