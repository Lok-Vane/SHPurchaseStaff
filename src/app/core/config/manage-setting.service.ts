import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageSettingService {

  constructor() { }

  public readonly baseUrl = 'api/sys/v1';

  public readonly buttoncreatebef = `${this.baseUrl}/btnregister/createbef`;
  public readonly buttoncreate = `${this.baseUrl}/btnregister/create`;
  public readonly buttonmodifybef = `${this.baseUrl}/btnregister/modifybef`;
  public readonly buttonmodify = `${this.baseUrl}/btnregister/modify`;
  public readonly buttondelete = `${this.baseUrl}/btnregister/delete`;
  public readonly buttonbatchdel = `${this.baseUrl}/btnregister/batchdel`;
  public readonly buttonsearch = `${this.baseUrl}/btnregister/search`;
  public readonly buttonfindbyid = `${this.baseUrl}/btnregister/findbyid`;
  public readonly buttonfindbycode = `${this.baseUrl}/btnregister/findbycode`;
  public readonly buttonunasgntomodule = `${this.baseUrl}/btnregister/unasgntomodule`;
  public readonly buttonasgntouser = `${this.baseUrl}/btnregister/asgntouser`;
  public readonly buttonunasgntoduty = `${this.baseUrl}/btnregister/unasgntoduty`;
  public readonly buttonunasgntopage = `${this.baseUrl}/btnregister/unasgntopage`;

  public readonly dutycreatebef = `${this.baseUrl}/duty/createbef`;
  public readonly dutycreate = `${this.baseUrl}/duty/create`;
  public readonly dutymodifybef = `${this.baseUrl}/duty/modifybef`;
  public readonly dutymodify = `${this.baseUrl}/duty/modify`;
  public readonly dutydelete = `${this.baseUrl}/duty/delete`;
  public readonly dutybatchdel = `${this.baseUrl}/duty/batchdel`;
  public readonly dutysearch = `${this.baseUrl}/duty/search`;
  public readonly dutyfindbyid = `${this.baseUrl}/duty/findbyid`;
  public readonly dutyfindbycode = `${this.baseUrl}/duty/findbycode`;
  public readonly dutyunasgntorole = `${this.baseUrl}/duty/unasgntorole`;

  public readonly dutyauthcreate = `${this.baseUrl}/dutyauth/create`;
  public readonly dutyauthdelete = `${this.baseUrl}/dutyauth/delete`;
  public readonly dutyauthbatchdel = `${this.baseUrl}/dutyauth/batchdel`;
  public readonly dutyauthsearch = `${this.baseUrl}/dutyauth/search`;

  public readonly dutymenucreate = `${this.baseUrl}/dutymenu/create`;
  public readonly dutymenudelete = `${this.baseUrl}/dutymenu/delete`;
  public readonly dutymenubatchdel = `${this.baseUrl}/dutymenu/batchdel`;
  public readonly dutymenusearch = `${this.baseUrl}/dutymenu/search`;
  public readonly dutymenutree = `${this.baseUrl}/dutymenu/menutree`; // 考虑停用

  public readonly funauthcreate = `${this.baseUrl}/funauthority/create`;
  public readonly funauthdelete = `${this.baseUrl}/funauthority/delete`;
  public readonly funauthbatchdel = `${this.baseUrl}/funauthority/batchdel`;
  public readonly funauthsearch = `${this.baseUrl}/funauthority/search`;

  public readonly menucreatebef = `${this.baseUrl}/menu/createbef`;
  public readonly menucreate = `${this.baseUrl}/menu/create`;
  public readonly menumodifybef = `${this.baseUrl}/menu/modifybef`;
  public readonly menumodify = `${this.baseUrl}/menu/modify`;
  public readonly menudelete = `${this.baseUrl}/menu/delete`;
  public readonly menubatchdel = `${this.baseUrl}/menu/batchdel`;
  public readonly menusearch = `${this.baseUrl}/menu/search`;
  public readonly menufindbyid = `${this.baseUrl}/menu/findbyid`;
  public readonly menufindbycode = `${this.baseUrl}/menu/findbycode`;
  public readonly menutree = `${this.baseUrl}/menu/menutree`;
  public readonly menuasgntoduty = `${this.baseUrl}/menu/asgntoduty`;
  public readonly menuasgntouser = `${this.baseUrl}/menu/asgntousertree`;

  public readonly modulecreatebef = `${this.baseUrl}/module/createbef`;
  public readonly modulecreate = `${this.baseUrl}/module/create`;
  public readonly modulemodifybef = `${this.baseUrl}/module/modifybef`;
  public readonly modulemodify = `${this.baseUrl}/module/modify`;
  public readonly moduledelete = `${this.baseUrl}/module/delete`;
  public readonly modulebatchdel = `${this.baseUrl}/module/batchdel`;
  public readonly modulesearch = `${this.baseUrl}/module/search`;
  public readonly modulefindbyid = `${this.baseUrl}/module/findbyid`;
  public readonly modulefindbycode = `${this.baseUrl}/module/findbycode`;

  public readonly modulecategorycreatebef = `${this.baseUrl}/modulecategory/createbef`;
  public readonly modulecategorycreate = `${this.baseUrl}/modulecategory/create`;
  public readonly modulecategorymodifybef = `${this.baseUrl}/modulecategory/modifybef`;
  public readonly modulecategorymodify = `${this.baseUrl}/modulecategory/modify`;
  public readonly modulecategorydelete = `${this.baseUrl}/modulecategory/delete`;
  public readonly modulecategorybatchdel = `${this.baseUrl}/modulecategory/batchdel`;
  public readonly modulecategorysearch = `${this.baseUrl}/modulecategory/search`;

  // organize
  public readonly organizecreatebef = `${this.baseUrl}/organize/createbef`;
  public readonly organizecreate = `${this.baseUrl}/organize/create`;
  public readonly organizemodifybef = `${this.baseUrl}/organize/modifybef`;
  public readonly organizemodify = `${this.baseUrl}/organize/modify`;
  public readonly organizedelete = `${this.baseUrl}/organize/delete`;
  public readonly organizebatchdel = `${this.baseUrl}/organize/batchdel`;
  public readonly organizesearch = `${this.baseUrl}/organize/search`;
  public readonly organizefindbyid = `${this.baseUrl}/organize/findbyid`;
  public readonly organizefindbycode = `${this.baseUrl}/organize/findbycode`;

  // orggroup
  public readonly orggroupcreatebef = `${this.baseUrl}/orggroup/createbef`;
  public readonly orggroupcreate = `${this.baseUrl}/orggroup/create`;
  public readonly orggroupmodifybef = `${this.baseUrl}/orggroup/modifybef`;
  public readonly orggroupmodify = `${this.baseUrl}/orggroup/modify`;
  public readonly orggroupdelete = `${this.baseUrl}/orggroup/delete`;
  public readonly orggroupbatchdel = `${this.baseUrl}/orggroup/batchdel`;
  public readonly orggroupsearch = `${this.baseUrl}/orggroup/search`;

  // pageview
  public readonly pageviewcreatebef = `${this.baseUrl}/pageview/createbef`;
  public readonly pageviewcreate = `${this.baseUrl}/pageview/create`;
  public readonly pageviewmodifybef = `${this.baseUrl}/pageview/modifybef`;
  public readonly pageviewmodify = `${this.baseUrl}/pageview/modify`;
  public readonly pageviewdelete = `${this.baseUrl}/pageview/delete`;
  public readonly pageviewbatchdel = `${this.baseUrl}/pageview/batchdel`;
  public readonly pageviewsearch = `${this.baseUrl}/pageview/search`;

  // pagebutton
  public readonly pagebuttoncreatebef = `${this.baseUrl}/pagebutton/createbef`;
  public readonly pagebuttoncreate = `${this.baseUrl}/pagebutton/create`;
  public readonly pagebuttonmodifybef = `${this.baseUrl}/pagebutton/modifybef`;
  public readonly pagebuttonmodify = `${this.baseUrl}/pagebutton/modify`;
  public readonly pagebuttondelete = `${this.baseUrl}/pagebutton/delete`;
  public readonly pagebuttonbatchdel = `${this.baseUrl}/pagebutton/batchdel`;
  public readonly pagebuttonsearch = `${this.baseUrl}/pagebutton/search`;

  // role
  public readonly rolecreatebef = `${this.baseUrl}/role/createbef`;
  public readonly rolecreate = `${this.baseUrl}/role/create`;
  public readonly rolebatchbuild = `${this.baseUrl}/role/batchbuild`;
  public readonly rolemodifybef = `${this.baseUrl}/role/modifybef`;
  public readonly rolemodify = `${this.baseUrl}/role/modify`;
  public readonly roledelete = `${this.baseUrl}/role/delete`;
  public readonly rolebatchdel = `${this.baseUrl}/role/batchdel`;
  public readonly rolesearch = `${this.baseUrl}/role/search`;
  public readonly roleunasgntoduty = `${this.baseUrl}/role/unasgntoduty`;
  public readonly roleunasgntouser = `${this.baseUrl}/role/unasgntouser`;

  // roletempldate
  public readonly roletemplatecreatebef = `${this.baseUrl}/roletemplate/createbef`;
  public readonly roletemplatecreate = `${this.baseUrl}/roletemplate/create`;
  public readonly roletemplatebatchbuild = `${this.baseUrl}/roletemplate/batchbuild`;
  public readonly roletemplatemodifybef = `${this.baseUrl}/roletemplate/modifybef`;
  public readonly roletemplatemodify = `${this.baseUrl}/roletemplate/modify`;
  public readonly roletemplatedelete = `${this.baseUrl}/roletemplate/delete`;
  public readonly roletemplatebatchdel = `${this.baseUrl}/roletemplate/batchdel`;
  public readonly roletemplatesearch = `${this.baseUrl}/roletemplate/search`;

  // roleduty
  public readonly roledutycreate = `${this.baseUrl}/roleduty/create`;
  public readonly roledutybatchdel = `${this.baseUrl}/roleduty/batchdel`;
  public readonly roledutysearch = `${this.baseUrl}/roleduty/search`;

  // user
  public readonly usercreatebef = `${this.baseUrl}/user/createbef`;
  public readonly usercreate = `${this.baseUrl}/user/create`;
  public readonly usermodifybef = `${this.baseUrl}/user/modifybef`;
  public readonly usermodify = `${this.baseUrl}/user/modify`;
  public readonly userdelete = `${this.baseUrl}/user/delete`;
  public readonly userbatchdel = `${this.baseUrl}/user/batchdel`;
  public readonly usersearch = `${this.baseUrl}/user/search`;
  public readonly userunasgntorole = `${this.baseUrl}/user/unasgntorole`;
  public readonly userresetpwd = `${this.baseUrl}/user/resetpwd`;

  // userrole
  public readonly userrolecreate = `${this.baseUrl}/userrole/create`;
  public readonly userrolebatchdel = `${this.baseUrl}/userrole/batchdel`;
  public readonly userrolesearch = `${this.baseUrl}/userrole/search`;
}
