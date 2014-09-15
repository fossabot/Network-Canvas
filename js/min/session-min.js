var Session=function e(t){var n={},a=0,i=$("#content");window.dataStore={},n.id=0,n.userData={};var o;n.stages=["intro.html","namegen1.html","namegen2.html","namegen3.html","namegen4.html","listselect1.html","namegen5.html","namegenmod6.html","listselect2.html","namegen7.html","namegenmod8.html","multibin1.html","multibin2.html"];var s;return n.options={fnBeforeStageChange:function(e,t){var n=new CustomEvent("changeStageStart",{detail:{oldStage:e,newStage:t}});window.dispatchEvent(n)},fnAfterStageChange:function(e,t){var n=new CustomEvent("changeStageEnd",{detail:{oldStage:e,newStage:t}});window.dispatchEvent(n)}},n.init=function(){notify("Session initialising.",1),extend(n.options,t),window.addEventListener("changeStageStart",function(){$(".loader").transition({opacity:1})},!1),window.addEventListener("changeStageEnd",function(){$(".loader").transition({opacity:0})},!1),window.dataStore=new IOInterface,localStorage.getObject("activeSession")!==!1?(n.id=localStorage.getObject("activeSession"),notify("Existing session found (session id: "+n.id+"). Loading.",3),window.dataStore.init(n.id),window.dataStore.load(n.updateUserData)):(notify("No existing session found. Creating new session.",3),n.id=window.dataStore.init()),n.registerData("session"),History.Adapter.bind(window,"statechange",function(){});var e=History.getState();n.goToStage(e.data.stage?e.data.stage:0),window.addEventListener("unsavedChanges",function(){n.saveManager()},!1);var a=menu.addMenu("Session","hi-icon-cog");menu.addItem(a,"Load Data by ID","icon-user",function(){return!0}),menu.addItem(a,"Reset Session","icon-globe",n.reset),menu.addItem(a,"Download Data","icon-briefcase",function(){return!0}),menu.addItem(a,"Sync with Server","icon-cloud",n.saveData)},n.reset=function(){notify("Resetting session.",2),localStorage.removeItem("activeSession"),localStorage.removeItem("nodes"),localStorage.removeItem("edges"),localStorage.removeItem("session"),localStorage.removeItem("log"),n.id=0,n.currentStage=0,window.dataStore.save(n.userData),History.pushState({stage:0},null,"?stage=0"),location.reload()},n.saveManager=function(){clearTimeout(s),s=setTimeout(n.saveData,3e3)},n.updateUserData=function(e){notify("Updating user data.",2),notify("Using the following to update:",1),notify(e,1),notify("session.userData is:",1),notify(n.userData,1),extend(n.userData,e),notify("Combined output is:",0),notify(n.userData,0);var t=new Event("newDataLoaded");window.dispatchEvent(t);var a=new Event("unsavedChanges");window.dispatchEvent(a)},n.returnSessionID=function(){return n.id},n.saveData=function(){window.dataStore.save(n.userData),o=new Date},n.goToStage=function(e){if("undefined"==typeof e||"undefined"==typeof n.stages[e])return!1;notify("Session is moving to stage "+e,3),n.options.fnBeforeStageChange(a,e);var t=e;i.transition({opacity:"0"},400,"easeInSine").promise().done(function(){i.load("stages/"+n.stages[e],function(){i.transition({opacity:"1"},400,"easeInSine")})});var o=a;a=t,History.pushState({stage:e},null,"?stage="+e),n.options.fnAfterStageChange(o,a);var s=new Event("unsavedChanges");window.dispatchEvent(s)},n.nextStage=function(){n.goToStage(a+1)},n.prevStage=function(){n.goToStage(a-1)},n.addStage=function(){},n.registerData=function(e,t){notify('A script requested a data store be registered with the key "'+e+'".',2),void 0===n.userData[e]?(notify('Key named "'+e+'" was not already registered. Creating.',1),n.userData[e]=t?[]:{}):notify("A data store with this key already existed. Returning a pointer.",1);var a=new Event("unsavedChanges");return window.dispatchEvent(a),n.userData[e]},n.addData=function(e,t,a){a||(a=!1),a===!0?n.userData[e].push(t):extend(n.userData[e],t),notify("Adding data to key '"+e+"'.",2),notify(t,1);var i=new Event("unsavedChanges");window.dispatchEvent(i)},n.returnData=function(e){return e&&"undefined"!=typeof n.userData[e]?n.userData[e]:n.userData},n.init(),n};
//# sourceMappingURL=./session-min.js.map