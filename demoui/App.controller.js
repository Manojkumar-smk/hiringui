sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (BaseController) {
        "use strict";

        return BaseController.extend("bolo.controller.App", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    text: "",
                    result: ""
                }));
            },

            startWorkflow: function () {
                var token = this._fetchToken();
                this._startInstance(token);
            },

            _startInstance: function (token) {
                var model = this.getView().getModel();
                var text = model.getProperty("/text");
                //var contextJson = JSON.parse(text);
                $.ajax({
                    url: this._getWorkflowRuntimeBaseURL() + "/workflow-instances",
                    method: "POST",
                    async: false,
                    contentType: "application/json",
                     data: JSON.stringify({
                        "definitionId": "ANUBHAVTRAINING_BPA_ID",
                        "context": "ANUBHAVTRAINING BPA CONTEXT"
                    }),
                    success: function (result, xhr, data) {
                        model.setProperty("/result", JSON.stringify(result, null, 4));
                    }
                });

                
            },

            _getExternalServiceRuntimeBaseURL: function () {
                var sAppId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var sAppPath = sAppId.replaceAll(".", "/");
                var sAppModulePath = jQuery.sap.getModulePath(sAppPath);

                return sAppModulePath;
            },

            _getWorkflowRuntimeBaseURL: function () {

                return this._getExternalServiceRuntimeBaseURL() + "/sap_process_automation_service/workflow/rest/v1";
            },

 

        });
    }
);
