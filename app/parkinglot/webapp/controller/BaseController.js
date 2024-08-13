sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment"
    ],
    function(BaseController,Fragment) {
      "use strict";
 
      return BaseController.extend("com.app.parkinglot.controller.BaseController", {
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },
        createData: function(oModel, oPayload, sPath){
            return new Promise((resolve, reject) => {
                oModel.create(sPath, oPayload, {
                    refreshAfterChange: true,
                    success: function(oSuccessData){
                        resolve(oSuccessData);
                    },
                    error: function(oErrorData){
                        reject(oErrorData)
                    }
                })
            })
        },

      
deleteData: function(oModel, sPath, ID){
            return new Promise((resolve, reject) => {
                oModel.remove(`${sPath}/${ID}`, {
                    success: function(oSuccessData){
                        resolve(oSuccessData);
                    },
                    error: function(oErrorData){
                        reject(oErrorData)
                    }
                })
            })            
        },
 
 
      //  for fragment loading
 
        loadFragment: async function (sFragmentName) {
            const oFragment = await Fragment.load({
                id: this.getView().getId(),
                name: `com.app.parkinglot.fragments.${sFragmentName}`,
                controller: this
            });
            this.getView().addDependent(oFragment);
            return oFragment
        },
 
        // for page navigation
 
        navigation:function(nav){
          this.getOwnerComponent().getRouter().navTo(`${nav}`)
       
        }
 
      });
    }
  );