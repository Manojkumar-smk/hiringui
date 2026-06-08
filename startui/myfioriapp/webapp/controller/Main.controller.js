sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend(
      "anubhav.start.myfioriapp.controller.Main",
      {
        onInit: function () {
          this.getView().setModel(new sap.ui.model.json.JSONModel({
            text: "",
            result: ""
          }));
        },

        startWorkflow: function () {
          this._startInstance( );
        },

        _startInstance: function () {
          var model = this.getView().getModel();
          //var contextJson = JSON.parse(text);
          $.ajax({
            url: this._getWorkflowRuntimeBaseURL() + "/workflow-instances",
            method: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({
              "definitionId": "us10.48a14a1atrial.warehousemanagement.massOrderProcessing",
              "context": {
                "customerid": this.getView().byId("textInput").getValue()
              }
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
      }
    );
  }
);
