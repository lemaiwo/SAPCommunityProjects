sap.ui.define([
	"sap/ui/base/ManagedObject",
	"./MenuItem"
], function (ManagedObect,MenuItem) {
	"use strict";
	return ManagedObect.extend('be.wl.open.sap.central.Menu', {
		metadata: {
			properties: {
			},
			aggregations: {
				items: { type: 'be.wl.open.sap.central.MenuItem', multiple : true}
			},
			events: {
			},
		},

		init: function () {
			this.addItem(new MenuItem({title:"Flora A",description:"test dsecr"}));
			this.addItem(new MenuItem({title:"Flora B",description:"test dsecr"}));
			this.addItem(new MenuItem({title:"Flora C",description:"test dsecr"}));
			this.addItem(new MenuItem({title:"Flora Likert",description:"test dsecr"}));
			this.addItem(new MenuItem({title:"Flora Vets",description:"test dsecr"}));
		}

	});
});