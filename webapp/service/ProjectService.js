sap.ui.define([
	"./CoreService",
	"sap/ui/model/odata/ODataUtils"
], function (CoreService, ODataUtils) {
	"use strict";

	var ProjectService = CoreService.extend("be.wl.open.sap.central.service.ProjectService", {
		constructor: function (model) {
			CoreService.call(this, model);
		}
	});
	ProjectService.prototype.getCategories = CoreService.prototype.http(
		"https://sapcommunityopensourceprojects.github.io/ProjectCategories/Categories.json").get;
	ProjectService.prototype.getProjectsForCategory = function (oCategory) {
		return this.http(oCategory.url).get().catch(function (error) {
			console.log(error);
		});
	};
	ProjectService.prototype.getRepo = function (sRepo) {
		return this.http("https://api.github.com/repos/" + sRepo).get();
	};
	ProjectService.prototype.getAllProjects = function () {
		return this.getCategories().then(function (aCategories) {
			return aCategories.map(function (oCategory) {
				return this.getProjectsForCategory(oCategory);
			}.bind(this));
		}.bind(this)).then(function (aPromises) {
			return Promise.all(aPromises);
		}).then(function (aCategories) {
			return aCategories.reduce(function (result, aCategory) {
				if (!Array.isArray(aCategory) && !aCategory.libraries) {
					for (var oProject in aCategory) {
						result.push(oProject);
					}
					return result;
				} else {
					return result.concat(aCategory.libraries);
				}
			}.bind(this), []);
		}.bind(this)).then(function(aRepos){
			return aRepos.map(function(sRepo){
				return this.getRepo(sRepo);
			}.bind(this));
		}.bind(this)).then(function (aPromises) {
			return Promise.all(aPromises);
		}).catch(function (error) {
			console.error(error);
		});
	};
	return ProjectService;
});