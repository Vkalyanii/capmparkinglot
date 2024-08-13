
sap.ui.define([
    "./BaseController",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/core/format/DateFormat"
], function (Controller, Device, JSONModel, Popover, Button, library, MessageToast, Filter, FilterOperator, Fragment, DateFormat) {
    "use strict";

    var ButtonType = library.ButtonType,
        PlacementType = library.PlacementType;

    return Controller.extend("com.app.parkinglot.controller.MainPage", {

        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this);



            const oLocalModel = new JSONModel({

                vehicalDetails: {
                    vehicalNo: "",
                    driverName: "",
                    phone: 0,
                    vehicalType: "",
                    assignedDate: "",
                    unassignedDate: "",
                    plotNo_plot_NO: ""
                },
                plotNo: {
                    available: false,
                    reserved: false
                }
            });
            var oModel = new JSONModel(sap.ui.require.toUrl("com/app/parkinglot/model/data.json"));
            this.getView().setModel(oModel);
            var oModelV2 = this.getOwnerComponent().getModel("ModelV2");
            this.getView().byId("pageContainer").setModel(oModelV2);
            this.getView().byId("idIconTabBar").setModel(oModelV2);
            this.getView().byId("page2").setModel(oLocalModel, "localModel");

            var today = new Date();

            // Calculate tomorrow based on today
            var tomorrow = new Date(today);
            tomorrow.setDate(today.getDate());

            // Set the minimum date for the date picker
            var oDateTimePicker = this.getView().byId("idEstimatedTime");
            oDateTimePicker.setMinDate(tomorrow);

            // Set display format to show only date
            oDateTimePicker.setDisplayFormat("yyyy-MM-dd");

            var oDateTimePicker1 = this.getView().byId("idEstimatedTimeVe");
            oDateTimePicker1.setMinDate(tomorrow);

            // Set display format to show only date
            oDateTimePicker1.setDisplayFormat("yyyy-MM-dd");

            this.loadDataFromModel(oModelV2);
            // Device.media.attachHandler(this._handleMediaChange, this);
            // this._handleMediaChange();
            // if (!oModelV2) {
            //  // ModelV2 is not loaded yet, set up event listener for model events
            //  oView.attachEventOnce("modelContextChange", function () {
            //      oModelV2 = oView.getModel("ModelV2");
            //      if (oModelV2) {
            //          this.loadDataFromModel(oModelV2);
            //      } else {
            //          console.error("ModelV2 not found after modelContextChange event.");
            //          // Handle error scenario
            //      }
            //  }, this);
            // } else {
            //  // ModelV2 is already available
            //  this.loadDataFromModel(oModelV2);
            // }

        },
        onUserDetailsLoad: function (oEvent) {
            var oView = this.getView()
            const { id } = oEvent.getParameter("arguments");
            this.ID = id;

            var oModel = this.getView().getModel("ModelV2");

            // Accessing navigation array from oModels
            var navigationArray = oModel.getProperty("/navigation");

            // Log the navigation array to console for verification
            console.log("Navigation Array:", navigationArray);
            this.getView().byId("secondTitle").setText(`Welcome ${this.ID}`);
            this.getView().byId("idTextName").setText(`${this.ID}`);
            var isNaveen = false;
            if (this.ID === "Security") {
                isNaveen = true;
                this.getView().byId("flexBoxPage8").setVisible(!isNaveen);
                // this.getView().byId("idPage8").setVisible(isNaveen);
                this.getView().byId("flexBoxPageVendor").setVisible(!isNaveen);
                // this.getView().byId( "idNotification").setVisible(isNaveen)
                //oView.byId("vendor1").setVisible(false)
                oView.byId("image1vendor").setVisible(false)
                oView.byId("image2vendor").setVisible(false)
                oView.byId("image3vendor").setVisible(false)
                oView.byId("image4vendor").setVisible(false)
                oView.byId("image5vendor").setVisible(false)
                oView.byId("image6vendor").setVisible(false)
                oView.byId("image7vendor").setVisible(false)
            }
            else if (this.ID === "Vendor") {
                oView.byId("flexBoxPage8").setVisible(false)
                // oView.byId("idPage8").setVisible(false)
                oView.byId("flexBoxPageVendor").setVisible(true)
                oView.byId("idPieChart").setVisible(false)
                oView.byId("idpage2").setVisible(false)
                oView.byId("idAllSlots").setVisible(false)
                oView.byId("AllocatedSlotsTable").setVisible(false)
                oView.byId("idAllSlots1").setVisible(false)
                oView.byId("reservedSlotsTable").setVisible(false)
                oView.byId("HistoryTable").setVisible(false)
                // oView.byId("idpage9").setVisible(false)
                oView.byId("page8illustext").setVisible(false)
                // oView.byId("flexBoxPage8").setVisible(false)
                // oView.byId("image8security").setVisible(false)
            }
            else {
                this.getView().byId("flexBoxPage8").setVisible(!isNaveen);
                // this.getView().byId("idPage8").setVisible(isNaveen);
                this.getView().byId("flexBoxPageVendor").setVisible(isNaveen);
                // this.getView().byId( "idNotification").setVisible(isNaveen)

                oView.byId("image1vendor").setVisible(false)
                oView.byId("image2vendor").setVisible(false)
                oView.byId("image3vendor").setVisible(false)
                oView.byId("image4vendor").setVisible(false)
                oView.byId("image5vendor").setVisible(false)
                oView.byId("image6vendor").setVisible(false)
                oView.byId("image7vendor").setVisible(false)
                oView.byId("page8illustext").setVisible(false)
                oView.byId("image8security").setVisible(false)
            }



            // oObjectPage.bindElement(`${id}`);

        },
        // onVehicleNumberSubmit: function (oEvent) {
        //  var sVehicleNo = oEvent.getParameter("value");

        //  // Access your model to check if the vehicle number exists in VehicalDeatils
        //  var oModel = this.getView().byId("pageContainer").getModel("ModelV2");
        //  var oLocalModel = this.getView().byId("page2").getModel("localModel");

        //  // Retrieve all vehicle details from ModelV2 (assuming VehicalDeatils is a collection)
        //  oModel.read("/VehicalDeatils", {
        //      filters: [
        //          new Filter("vehicalNo", FilterOperator.EQ, sVehicleNo)
        //      ],
        //      success: function (oData) {
        //          var aVehicles = oData.results;
        //          if (aVehicles.length > 0) {
        //              // Assuming there's only one record with unique vehicalNo
        //              var oVehicle = aVehicles[0];
        //              // Set other fields based on the found vehicle
        //              oLocalModel.setProperty("/vehicalDetails/vehicalNo", oVehicle.vehicalNo);
        //              oLocalModel.setProperty("/vehicalDetails/driverName", oVehicle.driverName);
        //              oLocalModel.setProperty("/vehicalDetails/phone", oVehicle.phone);
        //              oLocalModel.setProperty("/vehicalDetails/vehicalType", oVehicle.vehicalType);
        //              oLocalModel.setProperty("/vehicalDetails/assignedDate", oVehicle.assignedDate);
        //              this.getView().byId("productInput").setValue(oVehicle.plotNo_plot_NO)
        //              // Set other fields as needed
        //          } else {
        //              // Handle case where vehicle number was not found
        //              sap.m.MessageToast.show("Vehicle number not found.");
        //              // Optionally clear other fields
        //              oLocalModel.setProperty("/vehicalDetails/vehicalNo", "");
        //              oLocalModel.setProperty("/vehicalDetails/driverName", "");
        //              oLocalModel.setProperty("/vehicalDetails/phone", "");
        //              oLocalModel.setProperty("/vehicalDetails/vehicalType", "");
        //              oLocalModel.setProperty("/vehicalDetails/assignedDate", "");
        //              // Clear other fields as needed
        //          }
        //      }.bind(this),
        //      error: function (oError) {
        //          sap.m.MessageToast.show("Error fetching vehicle details: " + oError.message);
        //      }
        //  });
        // },

        onVehicleNumberSubmit: function (oEvent) {
            const oView = this.getView()
            var oLocalModel = this.getView().byId("page2").getModel("localModel");
            var sVehicleNo = oEvent.getParameter("value");
            var oModel = this.getView().byId("pageContainer").getModel("ModelV2");
            //  var oLocalModel = this.getView().byId("page2").getModel("localModel");
            // Check if vehicle number exists in Reservation
            oModel.read("/Reservation('" + sVehicleNo + "')", {
                success: function (oData) {
                    this.updateFormFields(oData); // Function to update form fields
                }.bind(this),
                error: function () {
                    // If vehicle number not found in Reservation, fetch from VehicalDeatils

                    // oModel.read("/VehicalDeatils('" + sVehicleNo + "')", {
                    //  success: function(oData) {
                    //      this.updateFormFields(oData); // Function to update form fields
                    //  }.bind(this),
                    //  error: function() {
                    //      sap.m.MessageToast.show("Vehicle number not found."); // Handle vehicle not found
                    //  }
                    // });
                    oModel.read("/VehicalDeatils", {
                        filters: [
                            new Filter("vehicalNo", FilterOperator.EQ, sVehicleNo)
                        ],
                        success: function (oData) {
                            var aVehicles = oData.results;
                            if (aVehicles.length > 0) {
                                // Assuming there's only one record with unique vehicalNo
                                var oVehicle = aVehicles[0];
                                // Set other fields based on the found vehicle
                                oLocalModel.setProperty("/vehicalDetails/vehicalNo", oVehicle.vehicalNo);
                                oLocalModel.setProperty("/vehicalDetails/driverName", oVehicle.driverName);
                                oLocalModel.setProperty("/vehicalDetails/phone", oVehicle.phone);
                                oLocalModel.setProperty("/vehicalDetails/vehicalType", oVehicle.vehicalType);
                                oLocalModel.setProperty("/vehicalDetails/assignedDate", oVehicle.assignedDate);
                                oView.byId("idAlotProcess").setVisible(true);

                                oView.byId("idProcessType").setVisible(false);

                                oView.byId("idAlotProcess").setText(oVehicle.vehicalType);

                                oView.byId("productInput").setValue(oVehicle.plotNo_plot_NO)
                                // Set other fields as needed
                            } else {
                                // Handle case where vehicle number was not found
                                sap.m.MessageToast.show("Vehicle number not found.");
                                // Optionally clear other fields
                                oLocalModel.setProperty("/vehicalDetails/vehicalNo", "");
                                oLocalModel.setProperty("/vehicalDetails/driverName", "");
                                oLocalModel.setProperty("/vehicalDetails/phone", "");
                                // oLocalModel.setProperty("/vehicalDetails/vehicalType", "");
                                oLocalModel.setProperty("/vehicalDetails/assignedDate", "");
                                // Clear other fields as needed
                            }
                        }.bind(this),
                        error: function (oError) {
                            sap.m.MessageToast.show("Error fetching vehicle details: " + oError.message);
                        }
                    });

                }
            });
        },

        updateFormFields: function (oData) {
            var oLocalModel = this.getView().byId("page2").getModel("localModel");
            // Assuming local model for form binding

            // Update form fields based on retrieved data
            if (oData.vehicalNo) {
                oLocalModel.setProperty("/vehicalDetails/vehicalNo", oData.vehicalNo);
                oLocalModel.setProperty("/vehicalDetails/driverName", oData.driverName);
                oLocalModel.setProperty("/vehicalDetails/phone", oData.phone);
                // oLocalModel.setProperty("/vehicalDetails/vehicalType", oData.vehicalType);
                oLocalModel.setProperty("/vehicalDetails/assignedDate", oData.assignedDate);

                this.getView().byId("idAlotProcess").setVisible(true);

                this.getView().byId("idProcessType").setVisible(false);

                this.getView().byId("idAlotProcess").setText(oData.vehicalType);
                // Set plot number in productInput field if it exists in the data
                if (oData.plotNo_plot_NO) {
                    this.getView().byId("productInput").setValue(oData.plotNo_plot_NO);
                }
            } else {
                sap.m.MessageToast.show("Vehicle details not found."); // Handle case where data is not found
                // Optionally clear other fields
                oLocalModel.setProperty("/vehicalDetails/vehicalNo", "");
                oLocalModel.setProperty("/vehicalDetails/driverName", "");
                oLocalModel.setProperty("/vehicalDetails/phone", "");
                // oLocalModel.setProperty("/vehicalDetails/vehicalType", "");
                oLocalModel.setProperty("/vehicalDetails/assignedDate", "");
                this.getView().byId("productInput").setValue(""); // Clear product input field if needed
            }
        },
        onVehicleNumberSubmit1: function (oEvent) {
            const oView = this.getView();
            if (this.ID === "Kalyani") {
                var sVehicleNo = oView.byId("idVehicalNo1").getValue();
            }
            else {

                var sVehicleNo = oView.byId("idVehicalNoVe").getValue();

            }
            const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
            oModel.read("/Reservation('" + sVehicleNo + "')", {
                success: function (oData) {
                    if (oData.vehicalNo) {
                        console.log(oData.plotNo_plot_NO)
                        if (this.ID === "Kalyani") {

                            oView.byId("idProcessTypeResInput").setVisible(true);
                         
                            oView.byId("idProcessTypeRes").setVisible(false);
                            oView.byId("idProcessTypeResInput").setText(oData.vehicalType)
                            oView.byId("idDriverName").setValue(oData.driverName);
                            oView.byId("idPhone").setValue(oData.phone);
                            oView.byId("idEstimatedTime").setValue(oData.estimatedTime);

                            if (!(oData.plotNo_plot_NO === null)) {
                                oView.byId("idtext").setVisible(true);
                                oView.byId("idslot1").setVisible(false);
                                oView.byId("idtext").setText(oData.plotNo_plot_NO)
                            }
                            else {
                                oView.byId("idtext").setVisible(false);
                                oView.byId("idslot1").setVisible(true);
                            }
                            this.selectedPlotNo = oData.plotNo_plot_NO
                            oView.getProperty("text").setText(this.selectedPlotNo)

                        } else {
                            oView.byId("idDriverNameVe").setValue(oData.driverName);
                            oView.byId("idPhoneVe").setValue(oData.phone);
                            oView.byId("idEstimatedTimeVe").setValue(oData.estimatedTime);
                            this.selectedPlotNo = oData.plotNo_plot_NO

                        }


                    } else {
                        sap.m.MessageToast.show("Vehicle details not found."); // Handle case where data is not found
                        // Optionally clear other fields
                        oView.byId("idDriverName").setValue("");
                        oView.byId("idPhone").setValue("");
                        oView.byId("idEstimatedTime").setValue(); // Clear product input field if needed
                    }
                }.bind(this),
                error: function () {

                    sap.m.MessageToast.show("Vehicle details not found."); // Handle case where data is not found
                    // Optionally clear other fields
                    oView.byId("idVehicalNo1").setValue("");
                    oView.byId("idDriverName").setValue("");
                    oView.byId("idPhone").setValue("");
                    oView.byId("idEstimatedTime").setValue(); // Clear product input field if needed

                }
            });
        },
        checkVehicleNoVe: async function (oModel, sVehicalNo, sResrved) {
            return new Promise((resolve, reject) => {
                oModel.read("/VehicalDeatils", {
                    filters: [
                        new Filter("vehicalNo", FilterOperator.EQ, sVehicalNo),


                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkVehicleNo1Ve: async function (oModel, sVehicalNo, sResrved) {
            return new Promise((resolve, reject) => {
                oModel.read("/Reservation", {
                    filters: [
                        new Filter("vehicalNo", FilterOperator.EQ, sVehicalNo),


                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },

        clearVe: async function () {
            var oView = this.getView();
            oView.byId("idVehicalNo1").setValue();
            oView.byId("idDriverName").setValue();
            oView.byId("idPhone").setValue();
            oView.byId("idEstimatedTime").setValue();
            oView.byId("idSlot").setValue();

        },


        onAssignPress: async function () {
            var oView = this.getView();
            if (oView.byId("idProcessType").getVisible() === true) {
                var oSelect = oView.byId("idProcessType");
                var oSelectedItem = oSelect.getSelectedItem();
                var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
                console.log("Selected Text: " + sSelectedText);

            }
            else {

                var sSelectedText = oView.byId("idAlotProcess").getText();
            }
            var oDateFormat = DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd HH:mm:ss" // Define your desired pattern here
            });

            var currentDate = new Date(); // Current system date and time
            var formattedDateTime = oDateFormat.format(currentDate);

            const oPayload = this.getView().byId("page2").getModel("localModel").getProperty("/");
            oPayload.plotNo.available = false;
            const { driverName, phone, vehicalNo, vehicalType } = this.getView().byId("page2").getModel("localModel").getProperty("/").vehicalDetails;
            const oModel = this.getView().byId("pageContainer").getModel("ModelV2"); // Assuming "ModelV2" is your ODataModel
            const plotNo = this.getView().byId("productInput").getValue();
            oPayload.vehicalDetails.plotNo_plot_NO = plotNo
            oPayload.vehicalDetails.assignedDate = formattedDateTime;
            oPayload.vehicalDetails.vehicalType = sSelectedText;
            if (!(driverName && phone && vehicalNo && plotNo)) {
                MessageToast.show("Enter all details")
                return
            }
            //checking the inuput vehicle is number in format or not.
            var vehicalNoRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;
            if (!(vehicalNoRegex.test(vehicalNo))) {
                // MessageToast.show("please enter valid Vehicle Number")
                this.getView().byId("idMessageStrip88").setText(`please enter valid Vehicle Number`);
                this.getView().byId("idMessageStrip88").setVisible(true);
                return
            }

            var phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
            if (!(phoneRegex.test(oPayload.vehicalDetails.phone))) {
                // MessageToast.show("please enter valid PhoneNumber")
                this.getView().byId("idMessageStrip5").setText(`please enter valid PhoneNumber`);
                this.getView().byId("idMessageStrip5").setVisible(true);
                return
            }

            var oVehicleExist = await this.checkVehicleNo(oModel, oPayload.vehicalDetails.vehicalNo, oPayload.vehicalDetails.reserved)

            if (oVehicleExist) {
                // MessageToast.show("Vehicle already exsist")
                this.getView().byId("idMessageStrip6").setText(`Vehicle already exsist`);
                this.getView().byId("idMessageStrip6").setVisible(true);
                return
            };
            var oPlotExist = await this.checkVehicleNo(oModel, plotNo)
            if (oPlotExist) {
                MessageToast.show("Plot already Assigned")

                return
            };
            const plotAvailability = await this.checkPlotAvailability(oModel, plotNo);
            if (!plotAvailability) {
                // sap.m.MessageToast.show("Plot not available for assignment.");
                this.getView().byId("idMessageStrip7").setText(`Plot not available for assignment`);
                this.getView().byId("idMessageStrip7").setVisible(true);
                return;
            }

            try {
                // Assuming createData method sends a POST request

                await this.createData(oModel, oPayload.vehicalDetails, "/VehicalDeatils");


                //await this.createData(oModel, oPayload.vehicalDetails, "/History");

                this.getView().byId("idMessageStrip1").setText(` Mr.${driverName} your vehicle ${vehicalNo} is allocated to the ${plotNo} plot`);
                this.getView().byId("idMessageStrip1").setVisible(true);

                // MessageToast.show(`${vehicalNo} allocated to ${plotNo}`)
                oModel.update("/PlotNOs('" + plotNo + "')", oPayload.plotNo, {
                    success: function () {
                        oModel.refresh(true);
                    }.bind(this),
                    error: function (oError) {
                        sap.m.MessageBox.error("Failed to update book: " + oError.message);
                    }.bind(this)
                });
                var oVehicleExist1 = await this.checkVehicleNo1(oModel, oPayload.vehicalDetails.vehicalNo, oPayload.vehicalDetails.reserved)

                if (oVehicleExist1) {
                    await this.deleteData(oModel, "/Reservation", vehicalNo);

                };
                var text = vehicalNo + " allocated to" + plotNo;
                var utterance = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utterance);


//                 var vehicalNo = "वाहन नंबर"; // Replace with your dynamic vehicle number
// var plotNo = "प्लॉट नंबर"; // Replace with your dynamic plot number
// var text = vehicalNo + " को " + plotNo + " आवंटित किया गया है";
// var utterance = new SpeechSynthesisUtterance(text);
// utterance.lang = "hi-IN";
// speechSynthesis.speak(utterance);

            } catch (error) {
                console.error("Error:", error);
            }

            this.onPrintPress();
            this.onClearPress();
            var sMessage = `Hello, ${driverName} your vehicle with vehicle number:${vehicalNo}  is allocated to slot number:${plotNo}`
            oView.byId("idAlotProcess").setVisible(false);

            oView.byId("idProcessType").setVisible(true);
            this.onSms(phone, sMessage);


        },
        checkVehicleNo: async function (oModel, sVehicalNo, sResrved) {
            return new Promise((resolve, reject) => {
                oModel.read("/VehicalDeatils", {
                    filters: [
                        new Filter("vehicalNo", FilterOperator.EQ, sVehicalNo),


                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkVehicleNo1: async function (oModel, sVehicalNo, sResrved) {
            return new Promise((resolve, reject) => {
                oModel.read("/Reservation", {
                    filters: [
                        new Filter("vehicalNo", FilterOperator.EQ, sVehicalNo),
                        new Filter("status", FilterOperator.EQ, true)


                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkVehicleNo2: async function (oModel, sVehicalNo, oPayload, oPlot) {

            return new Promise((resolve, reject) => {
                oModel.read("/Reservation", {
                    filters: [
                        new Filter("vehicalNo", FilterOperator.EQ, sVehicalNo),
                        new Filter("status", FilterOperator.EQ, false)


                    ],
                    success: function (oData) {

                        oModel.update("/Reservation('" + sVehicalNo + "')", oPayload.reserve, {
                            success: function () {

                            }.bind(this),
                            error: function (oError) {
                                sap.m.MessageBox.error("Failed to update book: " + oError.message);
                            }.bind(this)
                        });
                        oModel.update("/PlotNOs('" + oPlot + "')", oPayload.plotNo, {
                            success: function () {

                            }.bind(this),
                            error: function (oError) {
                                sap.m.MessageBox.error("Failed to update book: " + oError.message);
                            }.bind(this)
                        });
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkStatus: async function (oModel, sVehicalNo, oPayload, oPlot) {

            return new Promise((resolve, reject) => {
                oModel.read("/Reservation", {
                    filters: [
                        new Filter("vehicalNo", FilterOperator.EQ, sVehicalNo),
                        new Filter("status", FilterOperator.EQ, false),
                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkPlot: async function (oModel, plotNo) {
            return new Promise((resolve, reject) => {
                oModel.read("/VehicalDeatils", {
                    filters: [
                        new Filter("plotNo_plot_NO", FilterOperator.EQ, plotNo),

                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkPlotAvailability: async function (oModel, plotNo) {
            return new Promise((resolve, reject) => {
                oModel.read("/PlotNOs('" + plotNo + "')", {
                    success: function (oData) {
                        resolve(oData.available);
                    },
                    error: function (oError) {
                        reject("Error checking plot availability: " + oError.message);
                    }
                });
            });
        },
        checkPlotEmpty: async function (oModel, sVehicalNo) {
            return new Promise((resolve, reject) => {
                oModel.read("/VehicalDeatils", {
                    filters: [
                        new Filter("vehicalNo", FilterOperator.EQ, sVehicalNo),

                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        onValueHelpRequest: function (oEvent) {


            var sInputValue = oEvent.getSource().getValue(),
                oView = this.getView();
            console.log(sInputValue)

            if (!this._pValueHelpDialog) {
                this._pValueHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.app.parkinglot.fragments.ValueHelpDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pValueHelpDialog.then(function (oDialog) {
                // Access the binding context of the fragment and set the model
                oDialog.setModel(this.getView().getModel("ModelV2"));
                // Create a filter for the binding
                oDialog.getBinding("items").filter([new Filter("plot_NO", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open(sInputValue);
            }.bind(this));
        },
        onValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("plot_NO", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpClose: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectedItem) {
                return;
            }

            this.byId("productInput").setValue(oSelectedItem.getTitle());
        },
        // onUnAssignPress:async function(){
        //  var oDateFormat = DateFormat.getDateTimeInstance({
        //      pattern: "yyyy-MM-dd HH:mm:ss" // Define your desired pattern here
        //  });

        //  var currentDate = new Date(); // Current system date and time
        //  var formattedDateTime = oDateFormat.format(currentDate);
        //  console.log(typeof(formattedDateTime));
        //  const oVehicalNo = this.getView().byId("idVehicalNo").getValue();
        //  const oPayload = new JSONModel( {
        //      unassignedDate: formattedDateTime
        //  });
        //  const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
        //  try {await this.updateData(oModel, oVehicalNo, oPayload, "/History");
        //      await this.deleteData(oModel, "/VehicalDeatils",oVehicalNo );

        //  } catch (error) {
        //      console.error("Error:", error);
        //  }
        // },
        onUnAssignPress: async function () {

            const oView = this.getView();
            const oPayload = this.getView().byId("page2").getModel("localModel").getProperty("/");
            const { driverName, phone, vehicalNo, vehicalType } = this.getView().byId("page2").getModel("localModel").getProperty("/").vehicalDetails;
            oPayload.plotNo.available = true

            oPayload.vehicalDetails.vehicalType =oView.byId("idAlotProcess").getText()

            const plotNo = this.getView().byId("productInput").getValue();
            oPayload.vehicalDetails.plotNo_plot_NO = plotNo
            if (!(driverName && phone && vehicalNo && plotNo)) {
                MessageToast.show("Enter all details")
                return
            }

            const oDateFormat = DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd HH:mm:ss"
            });
            const currentDate = new Date();
            const formattedDateTime = oDateFormat.format(currentDate);
            oPayload.vehicalDetails.unassignedDate = formattedDateTime

            const oVehicalNo = this.getView().byId("idVehicalNo").getValue();
            const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
            var oVehicleExist = await this.checkVehicleNo(oModel, oPayload.vehicalDetails.vehicalNo, oPayload.vehicalDetails.reserved)

            if (!oVehicleExist) {
                MessageToast.show("Vehicle was not yet Allocated")
                return
            };
            var oFilter = new Filter("vehicalNo", FilterOperator.EQ, oVehicalNo);

            try {
                await this.createData(oModel, oPayload.vehicalDetails, "/History");
                oModel.update("/PlotNOs('" + plotNo + "')", oPayload.plotNo, {
                    success: function () {


                    }.bind(this),
                    error: function (oError) {

                        sap.m.MessageBox.error(`${vehicalNo} is not yet assigned.`);
                    }.bind(this)
                });

                await this.deleteData(oModel, "/VehicalDeatils", oVehicalNo);
                // MessageToast.show(`${vehicalNo} is leaving from plot No ${plotNo}`);

                this.getView().byId("idMessageStrip").setText(`${vehicalNo} is leaving from plot No ${plotNo}`);
                this.getView().byId("idMessageStrip").setVisible(true);




                // Find the corresponding history record to update
                // const aHistoryRecords = await oModel.read("/History", {
                //  filters: [
                //      new Filter("vehicalNo", FilterOperator.EQ, oVehicalNo)
                //  ]
                // });

                // if (aHistoryRecords.length > 0) {
                //  const oHistoryRecord = aHistoryRecords[0];
                //  oHistoryRecord.unassignedDate = formattedDateTime;

                //  // Update the record in the backend
                //  await oModel.update(`/History('${oHistoryRecord.ID}')`, oHistoryRecord);
                //  await this.deleteData(oModel, "/VehicalDeatils",oVehicalNo );
                //  MessageToast.show("Unassign operation successful");
                // } else {
                //  MessageToast.show("No history record found for the vehicle");
                // }

                var text = oVehicalNo + " is leaving from plot No" + plotNo;
                var utterance = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utterance);

            } catch (error) {
                console.error("Error updating history record:", error);
                MessageToast.show("Not in Allocated Slots");
            }
            this.onClearPress();
            var sMessage = `Hello, ${driverName} your vehicle with vehicle number:${vehicalNo}  is un assigned for slot number:${plotNo}`
            this.onSms(phone, sMessage);
            oView.byId("idProcessType").setVisible(true);
            oView.byId("idAlotProcess").setVisible(false)

        },
        registerBtn: async function () {
            if (this.ID === "Kalyani") {
                var oView=this.getView();
                if (oView.byId("idProcessTypeRes").getVisible()) {
                    // Get the Select control
                    var oSelect = oView.byId("idProcessTypeRes");
 
                    // Get the selected key
                    // var sSelectedKey = oSelect.getSelectedKey();
                    // console.log("Selected Key: " + sSelectedKey);
 
                    // Alternatively, get the selected item and its text
                    var oSelectedItem = oSelect.getSelectedItem();
                    var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
                    console.log("Selected Text: " + sSelectedText);
                   
                }
                else {
                    var sSelectedText = oView.byId("idProcessTypeResInput").getText()
                   
                }

                const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
                var oView = this.getView();
                var oVehicalNo = oView.byId("idVehicalNo1").getValue();
                var oDriverName = oView.byId("idDriverName").getValue();
                var oPhone = parseInt(oView.byId("idPhone").getValue());
                //var oVehicaltype=oView.byId("").getValue();
                var oPlot = this.selectedPlotNo;
                //var oPlot=oView.byId("idSlot").getText();
                var oestimatedTime = oView.byId("idEstimatedTime").getValue();
                if (!(oVehicalNo && oDriverName && oPhone && oPlot && oestimatedTime)) {
                    // MessageToast.show("Please enter all Details")
                    this.getView().byId("idMessageStrip8").setType("Warning")
                    this.getView().byId("idMessageStrip8").setText("Please enter all Details")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }

                var vehicalNoRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;
                if (!(vehicalNoRegex.test(oVehicalNo))) {
                    // MessageToast.show("please enter valid Vehical Number")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Please enter valid Vehicle Number")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }
                var phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                if (!(phoneRegex.test(oPhone))) {
                    // MessageToast.show("please enter valid PhoneNumber")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("please enter valid PhoneNumber")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }
                console.log(typeof (oestimatedTime))
                const oLocalModel1 = new JSONModel({
                    reserve: {
                        vehicalNo: oVehicalNo,
                        driverName: oDriverName,
                        phone: oPhone,
                        estimatedTime: oestimatedTime,
                        notify: "",
                        notifySuper: "",
                        status: true,
                        vehicalType:sSelectedText,
                        plotNo_plot_NO: oPlot
                    },
                    plotNo: {
                        reserved: true
                    }
                });
                this.getView().byId("page8").setModel(oLocalModel1, "localModel");

                const oPayload = this.getView().byId("page8").getModel("localModel").getProperty("/");
                oPayload.reserve.notify = `The Plot ${oPlot} is Pre-booked by ${oDriverName} for the vehicle ${oVehicalNo} for the estimated Date and Time: ${oestimatedTime}`
                var oVehicleExist = await this.checkVehicleNo(oModel, oPayload.reserve.vehicalNo)

                if (oVehicleExist) {
                    // MessageToast.show("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                };
                var oPlotExist = await this.checkVehicleNo(oModel, oPlot)
                if (oPlotExist) {
                    // MessageToast.show("Plot already Assigned")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Plot already Assigned")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                };

                var oVehicleExist2 = await this.checkStatus(oModel, oPayload.reserve.vehicalNo, oPayload, oPlot)
                if (oVehicleExist2) {
                    await this.checkVehicleNo2(oModel, oPayload.reserve.vehicalNo, oPayload, oPlot)
                    this.getView().byId("idMessageStrip8").setType("Information")
                    this.getView().byId("idMessageStrip8").setText(`${oVehicalNo} requested to assign a Slot with ${oPlot}`)
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    var sMessage = `Hello, ${oDriverName} your vehicle with vehicle number:${oVehicalNo} is successfully reserved to slot number:${oPlot}, Please try to come before estimated time:${oestimatedTime}`
                    this.onSms(oPhone, sMessage);
                    this.clear();
                    return
                }
                var oVehicleExist1 = await this.checkVehicleNo1(oModel, oPayload.reserve.vehicalNo)

                if (oVehicleExist1) {
                    // MessageToast.show("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return

                };
                try {
                    // Assuming createData method sends a POST request

                    await this.createData(oModel, oPayload.reserve, "/Reservation");
                    oModel.update("/PlotNOs('" + oPlot + "')", oPayload.plotNo, {
                        success: function () {

                        }.bind(this),
                        error: function (oError) {
                            sap.m.MessageBox.error("Failed to update book: " + oError.message);
                        }.bind(this)
                    });
                    // MessageToast.show(`${oVehicalNo} requested to assign a Slot with ${oPlot}`)
                    this.getView().byId("idMessageStrip8").setType("Information")
                    this.getView().byId("idMessageStrip8").setText(`${oVehicalNo} is assigned to Slot with ${oPlot}`)
                    this.getView().byId("idMessageStrip8").setVisible(true)




                } catch (error) {
                    console.error("Error:", error);
                }


                var sMessage = `Hello, ${oDriverName} your vehicle with vehicle number:${oVehicalNo} is successfully reserved to slot number:${oPlot}, Please try to come before estimated time:${oestimatedTime}`
                this.getView().byId("idProcessTypeRes").setVisible(true);
               
                this.getView().byId("idProcessTypeResInput").setVisible(false);
                this.onSms(oPhone, sMessage);



                this.clear();

                // oPayload.vehicalDetails.reserved = true;
                // oPayload.vehicalDetails.estimatedTime = this.getView().byId("idEstimatedTime").getValue();
                // const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
                // await this.createData(oModel, oPayload.vehicalDetails, "/VehicalDeatils");

            } else {
                const oModel = this.getView().getModel("ModelV2");
                var oView = this.getView();

                // Get the Select control
                var oSelect = oView.byId("idProcessTypeResVendor");
                var oSelectedItem = oSelect.getSelectedItem();
                var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
                console.log("Selected Text: " + sSelectedText);

                var oVehicalNo = oView.byId("idVehicalNoVe").getValue();
                var oDriverName = oView.byId("idDriverNameVe").getValue();
                var oPhone = parseInt(oView.byId("idPhoneVe").getValue());
                //var oVehicaltype=oView.byId("").getValue();
                //var oPlot = this.selectedPlotNo;
                //var oPlot=oView.byId("idSlot").getText();
                var oestimatedTime = oView.byId("idEstimatedTimeVe").getValue();
                if (!(oVehicalNo && oDriverName && oPhone && oestimatedTime)) {
                    MessageToast.show("Please enter all Details")
                    this.getView().byId("idMessageStrip8").setType("Warning")
                    this.getView().byId("idMessageStrip8").setText("Please enter all Details")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }

                var vehicalNoRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;
                if (!(vehicalNoRegex.test(oVehicalNo))) {
                    // MessageToast.show("please enter valid Vehical Number")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Please enter valid Vehicle Number")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }
                var phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                if (!(phoneRegex.test(oPhone))) {
                    // MessageToast.show("please enter valid PhoneNumber")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("please enter valid PhoneNumber")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }
                console.log(typeof (oestimatedTime))
                const oLocalModel1 = new JSONModel({
                    reserve: {
                        vehicalNo: oVehicalNo,
                        driverName: oDriverName,
                        phone: oPhone,
                        estimatedTime: oestimatedTime,
                        notifySuper: "",
                        status: false,
                        vehicalType:sSelectedText

                    },
                    // plotNo:{
                    //  reserved:true
                    // }
                });
                this.getView().setModel(oLocalModel1, "localModel");

                const oPayload = this.getView().getModel("localModel").getProperty("/");
                oPayload.reserve.notifySuper = `Hey! I am ${oDriverName}, requesting a slot for vehical number: ${oVehicalNo} for the estimated Date and Time: ${oestimatedTime}`
                var oVehicleExist = await this.checkVehicleNoVe(oModel, oPayload.reserve.vehicalNo)

                if (oVehicleExist) {
                    // MessageToast.show("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                };
                // var oPlotExist = await this.checkVehicleNo(oModel, oPlot)
                // if (oPlotExist) {
                //  // MessageToast.show("Plot already Assigned")
                //  this.getView().byId("idMessageStrip8").setType("Error")
                //  this.getView().byId("idMessageStrip8").setText("Plot already Assigned")
                //  this.getView().byId("idMessageStrip8").setVisible(true)


                //  return
                // };
                var oVehicleExist1 = await this.checkVehicleNo1Ve(oModel, oPayload.reserve.vehicalNo)

                if (oVehicleExist1) {
                    MessageToast.show("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return

                };
                try {
                    // Assuming createData method sends a POST request

                    await this.createData(oModel, oPayload.reserve, "/Reservation");
                    // oModel.update("/PlotNOs('" + oPlot + "')", oPayload.plotNo, {
                    //  success: function () {

                    //  }.bind(this),
                    //  error: function (oError) {
                    //      sap.m.MessageBox.error("Failed to update book: " + oError.message);
                    //  }.bind(this)
                    // });
                    // MessageToast.show(`${oVehicalNo} requested to assign a Slot with ${oPlot}`)
                    this.getView().byId("idMessageStrip8").setType("Information")
                    this.getView().byId("idMessageStrip8").setText(`${oVehicalNo} requested to assign a Slot`)
                    this.getView().byId("idMessageStrip8").setVisible(true)




                } catch (error) {
                    console.error("Error:", error);
                }

                this.clearVe();

                // oPayload.vehicalDetails.reserved = true;
                // oPayload.vehicalDetails.estimatedTime = this.getView().byId("idEstimatedTime").getValue();
                // const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
                // await this.createData(oModel, oPayload.vehicalDetails, "/VehicalDeatils");
                var sMessage = `Dear ${oDriverName},We inform you that your vehicle with license plate number ${oVehicalNo} is requested for parking slot number for estimated time:${oestimatedTime}. After conforming your requst you will get SMS with the slot number.`
                this.onSms(oPhone, sMessage);


            }
        },
        unRegister: async function () {
            const oLocalModel1 = new JSONModel({
                plotNo: {
                    reserved: false
                }
            });
            this.getView().byId("page8").setModel(oLocalModel1, "localModel");

            const oPayload = this.getView().byId("page8").getModel("localModel").getProperty("/");
            console.log(this.selectedPlotNo)
            if (this.ID === "Kalyani") {
                var oVehicalNo = this.getView().byId("idVehicalNo1").getValue();
                var oDriverName = this.getView().byId("idDriverName").getValue();
                var oPhoneNumber = this.getView().byId("idPhone").getValue();
                var oestimatedTime = this.getView().byId("idEstimatedTime").getValue();
            }
            else {
                var oVehicalNo = this.getView().byId("idVehicalNoVe").getValue();
                var oDriverName = this.getView().byId("idDriverNameVe").getValue();
                var oPhoneNumber = this.getView().byId("idPhoneVe").getValue();
                var oestimatedTime = this.getView().byId("idEstimatedTimeVe").getValue();
            }


            // var oVehicalNo=this.getView().byId("idVehicalNo1").getValue();

            if (!(oVehicalNo && oDriverName && oPhoneNumber && oestimatedTime)) {
                this.getView().byId("idMessageStrip8").setType("Warning")
                this.getView().byId("idMessageStrip8").setText("Enter all the Details")
                this.getView().byId("idMessageStrip8").setVisible(true)
                return
            }


            const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
            if (this.ID === "Kalyani") {
                await oModel.update("/PlotNOs('" + this.selectedPlotNo + "')", oPayload.plotNo, {
                    success: function () {

                    }.bind(this),
                    error: function (oError) {
                        sap.m.MessageBox.error("Failed to update book: " + oError.message);
                    }.bind(this)
                });
            }
            await this.deleteData(oModel, "/Reservation", oVehicalNo);
            this.getView().byId("idMessageStrip8").setType("Information")
            this.getView().byId("idMessageStrip8").setText(`${oVehicalNo} is unregistered for the requested ${this.selectedPlotNo}`)
            this.getView().byId("idMessageStrip8").setVisible(true)

            this.getView().byId("idProcessTypeRes").setVisible(true);
           
            this.getView().byId("idProcessTypeResInput").setVisible(false);
            this.getView().byId("idtext").setVisible(false);
            this.getView().byId("idslot1").setVisible(true);
            var sMessage = `Dear ${oDriverName},We regret to inform you that your vehicle with license plate number ${oVehicalNo} is unreserved for parking slot number ${this.selectedPlotNo}. Unfortunately, you did not arrive at the estimated time of ${oestimatedTime}.`
            this.onSms(oPhoneNumber, sMessage);
            this.clear();


        },
        onPlotSelectChange: function (oEvent) {
            var selectedItem = oEvent.getParameter("selectedItem");
            if (selectedItem) {
                var selectedPlotNo = selectedItem.getProperty("text");
                console.log("Selected plot number:", selectedPlotNo);
                // Store selected plot number in a variable accessible in registerBtn function
                this.selectedPlotNo = selectedPlotNo;

            }

        },

        loadDataFromModel: function (oModelV2) {
            var oView = this.getView().byId("page1");
            var oPieModel = new JSONModel({
                PlotCounts: []
            });

            oView.setModel(oPieModel, "PieModel");

            oModelV2.read("/PlotNOs", {
                success: function (oData, oResponse) {
                    var aPlotNOs = oData.results;
                    var oCounts = {
                        Available: 0,
                        "Not Available": 0,
                        Reserved: 0
                    };

                    aPlotNOs.forEach(function (plot) {
                        if (plot.available && !plot.reserved) {
                            oCounts.Available++;
                        }
                        else if (plot.reserved) {
                            oCounts.Reserved++;
                        }
                        else {
                            oCounts["Not Available"]++;
                        }
                    });

                    var aData = [];
                    for (var key in oCounts) {
                        if (oCounts.hasOwnProperty(key)) {
                            aData.push({
                                status: key,
                                count: oCounts[key]
                            });
                        }
                    }

                    oPieModel.setData({
                        PlotCounts: aData
                    });
                },
                error: function (oError) {
                    console.error("Error reading PlotNOs:", oError);
                    // Handle error scenario
                }
            });
        },


        onItemSelect: function (oEvent) {

            var oItem = oEvent.getParameter("item");
            this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
        },
        statusTextFormatter: function (bStatus) {
            return bStatus ? "Empty" : "Not Empty"; // Modify as per your requirement
        },

        _handleMediaChange: function () {
            var rangeName = Device.media.getCurrentRange("StdExt").name;

            switch (rangeName) {
                // Shell Desktop
                case "LargeDesktop":
                    this.byId("productName").setVisible(true);
                    this.byId("secondTitle").setVisible(true);
                    this.byId("searchField").setVisible(true);
                    this.byId("spacer").setVisible(true);
                    this.byId("searchButton").setVisible(false);
                    MessageToast.show("Screen width is corresponding to Large Desktop");
                    break;

                // Tablet - Landscape
                case "Desktop":
                    this.byId("productName").setVisible(true);
                    this.byId("secondTitle").setVisible(false);
                    this.byId("searchField").setVisible(true);
                    this.byId("spacer").setVisible(true);
                    this.byId("searchButton").setVisible(false);
                    MessageToast.show("Screen width is corresponding to Desktop");
                    break;

                // Tablet - Portrait
                case "Tablet":
                    this.byId("productName").setVisible(true);
                    this.byId("secondTitle").setVisible(true);
                    this.byId("searchButton").setVisible(true);
                    this.byId("searchField").setVisible(false);
                    this.byId("spacer").setVisible(false);
                    MessageToast.show("Screen width is corresponding to Tablet");
                    break;

                case "Phone":
                    this.byId("searchButton").setVisible(true);
                    this.byId("searchField").setVisible(false);
                    this.byId("spacer").setVisible(false);
                    this.byId("productName").setVisible(false);
                    this.byId("secondTitle").setVisible(false);
                    MessageToast.show("Screen width is corresponding to Phone");
                    break;
                default:
                    break;
            }
        },
        onExit: function () {
            Device.media.detachHandler(this._handleMediaChange, this);
        },
        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            var bSideExpanded = oToolPage.getSideExpanded();

            this._setToggleButtonTooltip(bSideExpanded);

            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        _setToggleButtonTooltip: function (bLarge) {
            var oToggleButton = this.byId('sideNavigationToggleButton');
            if (bLarge) {
                oToggleButton.setTooltip('Large Size Navigation');
            } else {
                oToggleButton.setTooltip('Small Size Navigation');
            }
        },
        onClearPress: function () {
            var oView = this.getView();
            oView.byId("idVehicalNo").setValue();
            oView.byId("drivername").setValue();
            oView.byId("phonenumber").setValue();
            // oView.byId("vehicletype").setValue();
            oView.byId("productInput").setValue();
        },


        onReserveAssign: async function () {
            var obj = this.byId("reservedSlotsTable").getSelectedItem().getBindingContext().getObject();
            console.log(obj)
        },
        clear: async function () {
            var oView = this.getView();
            oView.byId("idVehicalNo1").setValue();
            oView.byId("idDriverName").setValue();
            oView.byId("idPhone").setValue();
            oView.byId("idEstimatedTime").setValue();
            oView.byId("idSlot").setValue();

        },
        onSubmit1: function (event) {
            var sQuery = event.getParameter("value");
            var oTable = this.byId("AllocatedSlotsTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                var oFilter = new sap.ui.model.Filter([
                    new Filter("plotNo_plot_NO", FilterOperator.Contains, sQuery),
                    new Filter("vehicalNo", FilterOperator.Contains, sQuery),
                    new Filter("driverName", FilterOperator.Contains, sQuery)
                ], false);
                oBinding.filter(oFilter);
            }
        },
        onSearch: function (event) {
            // const aFilters = [];
            // const sQuery = oEvent.getSource().getValue();
            // if (sQuery && sQuery.length > 0) {
            //  const filter = new Filter("fileName", FilterOperator.Contains, sQuery);
            //  aFilters.push(filter);
            // }


            // const oTable = this.byId("AllocatedSlotsTable");
            // const oBinding = oTable.getBinding("items");
            // oBinding.filter(aFilters, "Application");

            var sQuery = event.getSource().getValue();
            var oTable = this.byId("AllocatedSlotsTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                var oFilter = new sap.ui.model.Filter([
                    new Filter("plotNo_plot_NO", FilterOperator.Contains, sQuery),
                    new Filter("vehicalNo", FilterOperator.Contains, sQuery),
                    new Filter("driverName", FilterOperator.Contains, sQuery),
                    new Filter("vehicalType", FilterOperator.Contains, sQuery)
                ], false);
                oBinding.filter(oFilter);
            }
        },
        onSearch1: function (event) {
            var sQuery = event.getSource().getValue();
            var oTable = this.byId("idTableAllSlotsTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                var oFilter = new sap.ui.model.Filter([
                    new Filter("plotNo_plot_NO", FilterOperator.Contains, sQuery),
                    new Filter("vehicalNo", FilterOperator.Contains, sQuery),
                    new Filter("driverName", FilterOperator.Contains, sQuery),
                    new Filter("vehicalType", FilterOperator.Contains, sQuery)
                ], false);
                oBinding.filter(oFilter);
            }
        },
        onSearch2: function (event) {
            var sQuery = event.getSource().getValue();
            var oTable = this.byId("reservedSlotsTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                var oFilter = new sap.ui.model.Filter([
                    new Filter("plotNo_plot_NO", FilterOperator.Contains, sQuery),
                    new Filter("vehicalNo", FilterOperator.Contains, sQuery),
                    new Filter("driverName", FilterOperator.Contains, sQuery),
                    new Filter("vehicalType", FilterOperator.Contains, sQuery)

                ], false);
                oBinding.filter(oFilter);
            }
        },
        onSearch3: function (event) {
            var sQuery = event.getSource().getValue();
            var oTable = this.byId("HistoryTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                var oFilter = new sap.ui.model.Filter([
                    new Filter("plotNo_plot_NO", FilterOperator.Contains, sQuery),
                    new Filter("vehicalNo", FilterOperator.Contains, sQuery),
                    new Filter("driverName", FilterOperator.Contains, sQuery),
                    new Filter("vehicalType", FilterOperator.Contains, sQuery)

                ], false);
                oBinding.filter(oFilter);
            }
        },
        onButPress: function () {

            if (this.getView().byId("idShowFilter").getText() === "ShowFilter") {
                this.getView().byId("idonSearch").setVisible(true)
                this.getView().byId("idShowFilter").setText("HideFilter")
            }
            else {
                this.getView().byId("idonSearch").setVisible(false)
                this.getView().byId("idShowFilter").setText("ShowFilter")
            }
        },
        onNotificationPress: async function () {

            if (!this.oNotification) {
                this.oNotification = await this.loadFragment("Notification")
            }
            this.oNotification.open();
            var oModelV2 = this.getOwnerComponent().getModel("ModelV2");
            this.getView().byId("idNotificationDialog").setModel(oModelV2);
            if (this.ID === "Security") {
                this.getView().byId("idSecurityNotify").setVisible(true)
            }
            else {
                this.getView().byId("idSupervisorNotify").setVisible(true)
            }
        },
        onCloseNotification: function () {
            if (this.oNotification.isOpen()) {
                this.oNotification.close()
            }
        },
        onPost: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            MessageToast.show("Posted new feed entry: " + sValue);
            return;
        },  onPrintPress: function () {
            // Fetch values from the view
            //    const oPayload = this.getView().byId("page2").getModel("localModel").getProperty("/").vehicalDetails;
          var oView = this.getView();
          if (oView.byId("idProcessType").getVisible() === true) {
              var oSelect = oView.byId("idProcessType");
 
              // Get the selected key
              // var sSelectedKey = oSelect.getSelectedKey();
              // console.log("Selected Key: " + sSelectedKey);
 
              // Alternatively, get the selected item and its text
              var oSelectedItem = oSelect.getSelectedItem();
              var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
              console.log("Selected Text: " + sSelectedText);
            //   var oSelectVehicalType = oView.byId("idVehicleType")
            //   var oSelectedItemVT = oSelectVehicalType.getSelectedItem();
            //   var sSelectedTextVT = oSelectedItemVT ? oSelectedItemVT.getText() : null;
          }
          else {
            //   var sSelectedTextVT = oView.byId("idAlotVehicle").getText();
              var sSelectedText = oView.byId("idAlotProcess").getText();
          }
          var vehicleNo = this.getView().byId("idVehicalNo").getValue();
              var driverName = this.getView().byId("drivername").getValue();
              var phoneNumber = this.getView().byId("phonenumber").getValue();
              var slotNo = this.getView().byId("productInput").getValue();
       
            // Create a new window for printing
            var printWindow = window.open('', '', 'height=600,width=800');
       
            // Write HTML content to the print window
            printWindow.document.write('<html><head><title>Print Receipt</title>');
            printWindow.document.write('<style>');
            printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
            printWindow.document.write('.details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }');
            printWindow.document.write('.details-table th, .details-table td { border: 1px solid #000; padding: 8px; text-align: left; }');
            printWindow.document.write('.details-table th { background-color: #f2f2f2; }');
            printWindow.document.write('.qr-code { text-align: center; margin-top: 20px; }');
            printWindow.document.write('</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<div class="print-container">');
            printWindow.document.write('<h1>Parking-Slot Assigned Details Slip:</h1>');
            printWindow.document.write('</div>');
            printWindow.document.write('<table class="details-table">');
            printWindow.document.write('<tr><th>Property</th><th>Details</th><th>QR Code</th></tr>');
            printWindow.document.write('<tr><td>Vehicle Number</td><td>' + vehicleNo  + '</td><td rowspan="6"><div id="qrcode"></div></td></tr>');
            printWindow.document.write('<tr><td>Parking Slot Number</td><td>' + slotNo + '</td></tr>');
            printWindow.document.write('<tr><td>Driver Name</td><td>' + driverName+ '</td></tr>');
            printWindow.document.write('<tr><td>Driver Phone Number</td><td>' + phoneNumber + '</td></tr>');
            printWindow.document.write('<tr><td>Delivery Type</td><td>' + sSelectedText + '</td></tr>');
            // printWindow.document.write('<tr><td>Vehicle Type</td><td>' + sSelectedTextVT + '</td></tr>');
            printWindow.document.write('</table>');
       
            // Close document and initiate QR code generation
            printWindow.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>');
            printWindow.document.write('<script>');
            printWindow.document.write('setTimeout(function() {');
            printWindow.document.write('new QRCode(document.getElementById("qrcode"), {');
            printWindow.document.write('text: "Vehicle Number: ' + vehicleNo + '\\nDriver Name: ' + driverName + '\\nSlot Number: ' + slotNo + '",');
            printWindow.document.write('width: 100,');
            printWindow.document.write('height: 100');
            printWindow.document.write('});');
            printWindow.document.write('}, 1000);'); // Adjust the timeout for QR code rendering
            printWindow.document.write('</script>');
       
            // Close document
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
       
            // Wait for QR code to be fully rendered before printing
            setTimeout(function() {
                printWindow.print();
            }, 1500); // Timeout to ensure the QR code is rendered before printing
      },

        onPrint: function () {
            var oTable = this.byId("HistoryTable");
            var aItems = oTable.getItems();

            if (aItems.length === 0) {
                MessageToast.show("No data available to export.");
                return;
            }

            var aData = [];

            // Push column headers as the first row
            var aHeaders = [
                "Slot Number",
                "Vehicle Number",
                "Driver Name",
                "Driver Ph.no",
                "Vehicle In Time",
                "Vehicle Out Time"
            ];
            aData.push(aHeaders);

            // Iterate through table items and collect data
            aItems.forEach(function (oItem) {
                var oCells = oItem.getCells();
                var rowData = [];
                oCells.forEach(function (oCell) {
                    rowData.push(oCell.getText());
                });
                aData.push(rowData);
            });

            // Prepare Excel workbook
            var oSheet = XLSX.utils.aoa_to_sheet(aData);
            var oWorkbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(oWorkbook, oSheet, "History");

            // Generate and download the Excel file
            XLSX.writeFile(oWorkbook, "history.xlsx");
        },
      

        onEdit: function (oEvent) {
            // var oButton = oEvent.getSource();
            // var oText = oButton.getText();
            // var Table = oButton.getParent();
            // var oModel = this.getView().getModel();


            // if (oText === 'Edit') {
            //  oButton.setText("Submit");
            //  var ocell1 = oButton.getParent().getCells()[0].setEditable(true);
            //  //var ocell2 = oButton.getParent().getCells()[6].setEditable(true);
            // } else {
            //  oButton.setText("Edit");
            //  var ocell1 = oButton.getParent().getCells()[0].setEditable(false);
            //  //var ocell2 = oButton.getParent().getCells()[6].setEditable(false);
            //  var value1 = oButton.getParent().getCells()[0].getValue();
            //  var value2 = oButton.getParent().getCells()[6].getValue();
            //  var id = oButton.getParent().getCells()[0].getText();

            //  oModel.update("/Products(" + id + ")", { Rating: value1, Price: value2 }, {
            //      success: function (oData) {
            //          sap.m.MessageBox.success("Succesfully Updated");
            //          oModel.refresh(true);
            //      },
            //      error: function (oError) {
            //          sap.m.MessageBox.error("Error while Updating data");

            //      }

            //  })
            // }
            var oTable = this.byId("AllocatedSlotsTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0) {
                sap.m.MessageToast.show("Please select an item to edit.");
                return;
            }

            aSelectedItems.forEach(function (oItem) {
                var aCells = oItem.getCells();
                aCells.forEach(function (oCell) {
                    var aVBoxItems = oCell.getItems();
                    aVBoxItems[0].setVisible(false); // Hide Text
                    aVBoxItems[1].setVisible(true)
                    // Show Input
                });
            });
            this.byId("editButton").setVisible(false);
            this.byId("saveButton").setVisible(true);
            this.byId("cancelButton").setVisible(true);

        },
        onCancel: function () {
            var oTable = this.byId("AllocatedSlotsTable");
            var aSelectedItems = oTable.getSelectedItems();

            aSelectedItems.forEach(function (oItem) {
                var aCells = oItem.getCells();
                aCells.forEach(function (oCell) {
                    var aVBoxItems = oCell.getItems();
                    aVBoxItems[0].setVisible(true); // Show Text
                    aVBoxItems[1].setVisible(false); // Hide Input
                });
            });

            this.byId("editButton").setVisible(true);
            this.byId("saveButton").setVisible(false);
            this.byId("cancelButton").setVisible(false);
        },

        onSave: function () {
            const oView = this.getView();
            const oTable = this.byId("AllocatedSlotsTable");
            const aSelectedItems = oTable.getSelectedItems();
            const oSelected = oTable.getSelectedItem();

            if (oSelected) {
                const oContext = oSelected.getBindingContext().getObject();
                const sVehicle = oContext.vehicalNo;

                const sDriverMobile = oContext.phone;
                const sDriverName = oContext.driverName;
                var sOldSlotNumber = oContext.plotNo_plot_NO;
                var sAssign = oContext.assignedDate;

                // Assuming the user selects a new slot number from somewhere
                const oSelect = oSelected.getCells()[0].getItems()[1]; // Assuming the Select is the second item in the first cell
                const sSlotNumber = oSelect.getSelectedKey(); // Get selected slot number

                // Create a record in history (assuming this is what you want to do)
                const oNewUpdate = {
                    vehicalNo: sVehicle,
                    driverName: sDriverName,
                    phone: sDriverMobile,
                    assignedDate: sAssign,
                    plotNo: {
                        plot_NO: sSlotNumber
                    }
                };

                // Update VDetails record
                const oDataModel = this.getOwnerComponent().getModel("ModelV2");
                oDataModel.update("/VehicalDeatils('" + sVehicle + "')", oNewUpdate, {
                    success: function () {
                        // Update old Parkinglot to empty (parkingType: true -> false)
                        const updatedParkingLot = {
                            available: true // Assuming true represents empty parking
                        };
                        oDataModel.update("/PlotNOs('" + sOldSlotNumber + "')", updatedParkingLot, {
                            success: function () {
                                // Update new Parkinglot to occupied (parkingType: false -> true)
                                const updatedNewParkingLot = {
                                    available: false // Assuming false represents occupied parking
                                };
                                oDataModel.update("/PlotNOs('" + sSlotNumber + "')", updatedNewParkingLot, {
                                    success: function () {
                                        // Refresh table binding or do other necessary actions
                                        oTable.getBinding("items").refresh();
                                        sap.m.MessageBox.success("Slot updated successfully");
                                    },
                                    error: function (oError) {
                                        sap.m.MessageBox.error("Failed to update new slot: " + oError.message);
                                    }
                                });
                            },
                            error: function (oError) {
                                sap.m.MessageBox.error("Failed to update old slot: " + oError.message);
                            }
                        });
                    },
                    error: function (oError) {
                        sap.m.MessageBox.error("Failed to update VDetails: " + oError.message);
                    }
                });
            }

            // Additional UI updates or actions after saving
            aSelectedItems.forEach(function (oItem) {
                var aCells = oItem.getCells();
                aCells.forEach(function (oCell) {
                    var aVBoxItems = oCell.getItems();
                    aVBoxItems[0].setVisible(true); // Hide Text
                    aVBoxItems[1].setVisible(false); // Show Input
                });
            });
            this.byId("editButton").setVisible(true);
            this.byId("saveButton").setVisible(false);
            this.byId("cancelButton").setVisible(false);
        },
        onNotificationPress: async function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover) {
                this._pPopover = this.loadFragment("Notification").then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
            // if (!this.oNotification) {
            //  this.oNotification = await this.loadFragment("Notification")
            // }
            // this.oNotification.open();
            var oModelV2 = this.getOwnerComponent().getModel("ModelV2");
            this.getView().byId("idNotificationDialog").setModel(oModelV2);
            if (this.ID === "Naveen") {
                this.getView().byId("idSecurityNotify").setVisible(true)
            }
            else {
                this.getView().byId("idSupervisorNotify").setVisible(true)
            }
        },
        onCloseNotification: function () {
            var oPopover = this.byId("idNotificationDialog");
            oPopover.close();
        },
        // loading of userdetails fragment

        onAvatarPressed: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover1) {
                this._pPopover1 = this.loadFragment("UserDetails").then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover1.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
            this.detaild();

        },
        detaild: function () {
            if (this.ID === "Security") {
                this.getView().byId("userTitle").setText("Simba");
                this.getView().byId("email").setText("security@gmail.com")
                this.getView().byId("phone").setText("9014132395")
                this.getView().byId("userRole").setText(`Role: ${this.ID}`)
            }
            else if (this.ID === "Vendor") {
                this.getView().byId("userTitle").setText("Vendor");
                this.getView().byId("email").setText("vendor@gmail.com")
                this.getView().byId("phone").setText("9987655534")
                this.getView().byId("userRole").setText(`Role: ${this.ID}`)
            }
            else {
                this.getView().byId("userTitle").setText("Kalyani");
                this.getView().byId("email").setText("supervisor@gmail.com")
                this.getView().byId("phone").setText("9014132395")
                this.getView().byId("userRole").setText(`Role: ${this.ID}`)
            }
        },

        onCloseUserDetails: function () {
            var oPopover = this.byId("idUserDetailsDialog");
            oPopover.close();

        },
        onModel: async function () {
            var oModel = this.getView().getModel("ModelV2");
            var supervisorCount = 0;
            var securityCount = 0;
            var availableCount = 0;
            var assignedCount = 0;
            var reservedCount = 0;
            var that = this;
            await oModel.read("/Reservation", {
                success: function (oData) {
                    var t = oData.results;
                    for (let i = 0; i < t.length; i++) {
                        if (t[i].notify) {
                            securityCount++;
                        }
                        else if (t[i].notifySuper) {
                            supervisorCount++;
                        }
                        const element = t[i].notify;
                        console.log(securityCount);

                    }

                    console.log(t);
                    if (that.ID === "Kalyani") {
                        that.byId("idbadge").setValue(supervisorCount);
                    }
                    else if (that.ID === "Security") {
                        that.byId("idbadge").setValue(securityCount);
                    }
                },
                error: function () {
                }
            })
            oModel.refresh();

            await oModel.read("/Reservation", {
                success: function (oData) {
                    var t = oData.results;
                    for (let i = 0; i < t.length; i++) {
                        if (t[i].notify) {
                            securityCount++;
                        }
                        else if (t[i].notifySuper) {
                            supervisorCount++;
                        }
                        const element = t[i].notify;
                        console.log(securityCount);

                    }

                    console.log(t);
                    if (that.ID === "Kalyani") {
                        that.byId("idbadge").setValue(supervisorCount);
                    }
                    else if (that.ID === "Security") {
                        that.byId("idbadge").setValue(securityCount);
                    }
                },
                error: function () {
                }
            })
            await oModel.read("/PlotNOs", {
                success: function (oData) {
                    var array = oData.results
                    var allSlotCount = array.length;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].available === true && array[i].reserved === false) {
                            availableCount++
                        }
                        else if (array[i].available === false) {
                            assignedCount++
                        }

                        else {
                            reservedCount++
                        }
                    }
                    that.byId("idIconTab").setCount(allSlotCount);
                    that.byId("idavailableslots").setCount(availableCount);
                    that.byId("idassignedslots").setCount(assignedCount);
                    that.byId("idreservedslots").setCount(reservedCount);


                },
                error: function () {
                }
            })
            oModel.refresh();
        },
        onBeforeRendering: function () {
            this.onModel();
        },
        onAfterRendering: function () {
            this.onModel();
        }
    });
});
