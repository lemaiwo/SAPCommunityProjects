sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	"use strict";
	return Object.extend("be.wl.open.sap.central.state.model.BaseObject", {
		constructor: function (data) {
			if (data) {
				for (var field in data) {
					switch (typeof (data[field])) {
					case "object":
						if (data[field] && data[field]["results"]) {
							data[field] = data[field]["results"];
						} else if (data[field]) {
							this[field] = data[field];
						}
						break;
					default:
						this[field] = data[field];
					}

				}
			}
		},
		getModel: function () {
			if (!this.model) {
				this.model = new JSONModel(this, true);
				//this.model.setData(this);
			}
			return this.model;
		},
		updateModel: function (bHardRefresh) {
			if (this.model) {
				this.model.refresh(bHardRefresh ? true : false);
			}
		},
		getData: function () {
			var req = jQuery.extend({}, this);
			delete req["model"];
			return req;
		},
		isEmpty: function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop))
					return false;
			}
			return JSON.stringify(obj) === JSON.stringify({});
		}
	});
});