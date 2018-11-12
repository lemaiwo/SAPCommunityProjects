sap.ui.define([
	"sap/ui/base/ManagedObject",
	"../service/UI5LabService",
	"../service/ABAPGitService",
	"sap/ui/model/base/ManagedObjectModel",
	"../model/Project",
	"../model/Group"
], function (ManagedObect, UI5LabService, ABAPGitService, ManagedObjectModel, Project, Group) {
	"use strict";
	return ManagedObect.extend('be.wl.open.sap.central.state.Centraltate', {
		metadata: {
			properties: {},
			aggregations: {
				projects: {
					type: 'be.wl.open.sap.central.model.Project',
					multiple: true
				},
				groups: {
					type: 'be.wl.open.sap.central.model.Group',
					multiple: true
				}
			},
			events: {}
		},
		init: function () {
			this.UI5LabService = new UI5LabService();
			this.ABAPGitService = new ABAPGitService();
			this.getAllLibraries();
		},
		getAllLibraries: function () {
			Promise.all([this.ABAPGitService.getLibraries(), this.UI5LabService.getLibraries()]).then(this.addLibraries.bind(this));
		},
		addLibraries: function (aLibs) {
			this.allProjects = [];
			var aLibraries = aLibs[0].concat(aLibs[1]);
			aLibraries = aLibraries.filter(function (oLibrary) {
				return oLibrary;
			});
			var aProjects = aLibraries.map(function (oLibrary, idx) {
				for (var sLibname in oLibrary) {
					var oLib = oLibrary[sLibname];
					var oProject = oLib && oLib.name ? this.convertUI5LibraryToProject(sLibname, oLib) : this.convertABAPLibraryToProject(sLibname,
						oLib);
				}
				this.allProjects.push(oProject);
				return oProject;
			}.bind(this));
			this.addProjectsToGroup(this.sortProjects(aProjects));
		},
		addProjectsToGroup:function(aProjects){
			var oGroup = new Group();
			this.addGroup(oGroup);
			aProjects.forEach(function (oProject, idx) {
				oGroup.addProject(oProject);
				if (idx % 4 === 4 - 1) {
					this.addGroup(oGroup);
					oGroup = new Group();
				}
			}.bind(this));
			if ((aProjects.length + 1) % 4 !== 0) {
				this.addGroup(oGroup);
			}
		},
		filterProjects:function(sSearch){
			this.removeAllGroups();
			var aFilteredProjects = this.allProjects.filter(function(oProject){
				return oProject.getName().toUpperCase().indexOf(sSearch.toUpperCase())>-1;
			});
			this.addProjectsToGroup(this.sortProjects(aFilteredProjects));
		},
		sortProjects:function(aProjects){
			return aProjects.sort(function (a, b) {
				var nameA = a.getName().toUpperCase(); // ignore upper and lowercase
				var nameB = b.getName().toUpperCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
		},
		convertUI5LibraryToProject: function (sLibname, oLib) {
			var oProject = new Project({
				name: oLib.name,
				namespace: sLibname,
				description: oLib.description,
				documentation: oLib.documentation,
				icon: oLib.icon,
				license: oLib.license,
				source: oLib.source,
				avatar: ""
			});
			this.addProject(oProject);
			return oProject;
		},
		convertABAPLibraryToProject: function (sLibname, oLib) {
			var oProject = new Project({
				name: oLib.repo.name,
				namespace: sLibname,
				description: oLib.repo.description,
				documentation: oLib.repo.url,
				license: oLib.repo.license.name,
				source: oLib.repo.url,
				avatar: oLib.repo.owner.avatar_url,
				createby:oLib.repo.owner.login,
				profile:oLib.repo.owner.html_url
			});
			this.addProject(oProject);
			return oProject;
		},
		getModel: function () {
			if (!this.model) {
				this.model = new ManagedObjectModel(this);
				//this.model.setData(this);
			}
			return this.model;
		}
	});
});