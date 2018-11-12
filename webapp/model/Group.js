sap.ui.define([
	"sap/ui/base/ManagedObject"
], function (ManagedObect) {
	"use strict";
	return ManagedObect.extend('be.wl.open.sap.central.model.Group', {
		metadata: {
			properties: {
			},
			aggregations: {
				projects: {
					type: 'be.wl.open.sap.central.model.Project',
					multiple: true
				}
			},
			events: {
			}
		},

		init: function () {
		}

	});
});