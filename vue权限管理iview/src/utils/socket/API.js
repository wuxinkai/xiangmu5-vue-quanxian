import  { connect } from './socket'
//
export default {
  // qwertyu:function () {
  //   return connect('/topic/action_SpringEquipHealthCount2View_countEquipHealth2')
  // },
  // asdf:function(){
  //   return connect('/topic/action_SpringEquipHealthBadIndexTop5View_equipHeanthBadIndexTop5')
  // },
  // ws_SpringEquipmentHealthTo3DView_calculateEquipmentHealth:function (callback) {
  //   return connect("/topic/action_SpringEquipmentHealthTo3DView_calculateEquipmentHealth",'/app/ws_SpringEquipmentHealthTo3DView_calculateEquipmentHealth',callback)
  // },
  ws_GetGraphDataWS_getGraphData:function(callback,params) {
    return connect("/topic/greetings",'/app/ws_GetGraphDataWS_getGraphData',callback,params)
  }
}
