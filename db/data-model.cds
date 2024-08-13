namespace my.parking;

using {cuid} from '@sap/cds/common';

type VehicalNumber : String @assert.format: '^[A-Z]{2}-[0-9]{2}-[A-Z]{1,2}-[0-9]{1,4}$';

entity PlotNOs {
  key plot_NO           : String;
      inBoundOroutBound : String;
      available         : Boolean;
      reserved:Boolean;
      vehical           : Association to VehicalDeatils;
     
}

entity VehicalDeatils {
  key vehicalNo    : String;
      driverName   : String;
      phone        : Integer64;
      vehicalType  : String;
      assignedDate : String;
      unassignedDate : String;
      plotNo       : Association to PlotNOs

}

entity Allotment : cuid {
  vehicalDetails : Association to VehicalDeatils;
  plotNo         : Association to PlotNOs;
  assignedDate   : DateTime
}

entity History : cuid {
  vehicalNo      : String;
  driverName     : String;
  phone          : Integer64;
  vehicalType    : String;
  assignedDate   : String;
  unassignedDate : String;
  plotNo         : Association to PlotNOs
}

entity Reservation {
  key vehicalNo     : String;
      driverName    : String;
      phone         : Integer64;
      vehicalType   : String;
      estimatedTime : String;
      notify        : String;
      notifySuper   :String;
      status        :Boolean;
      plotNo        : Association to PlotNOs
}

entity Message : cuid {
  user    : String;
  message : String;
 
}
