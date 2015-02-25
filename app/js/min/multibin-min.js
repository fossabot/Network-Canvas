var MultiBin=function e(o){var t,i=!1,n={},a;n.options={targetEl:$(".container"),edgeType:"Dyad",variable:{label:"multibin_variable",values:["Variable 1"]},filter:void 0,heading:"Default Heading",subheading:"Default Subheading."};var l=!1;extend(n.options,o);var s=function(){n.destroy()},d=function(e){e.preventDefault();var o=a,t={to:o};extend(t,n.options.criteria);var i=network.getEdges(t)[0],l={};$.each(n.options.followup.questions,function(e){var o=$("#"+n.options.followup.questions[e].variable).val();l[n.options.followup.questions[e].variable]=o}),extend(i,l),network.updateEdge(i.id,i),$.each(n.options.followup.questions,function(e){$("#"+n.options.followup.questions[e].variable).val("")}),$(".followup").hide(),$(".black-overlay").hide()},r=function(){$("#"+n.options.followup.variable).val(""),$(".followup").hide(),$(".black-overlay").hide()},c=function(e){e.stopPropagation(),e.target!==e.currentTarget&&l===!0&&($(".container").children().removeClass("invisible"),$(".copy").removeClass("node-bin-active"),$(".copy").addClass("node-bin-static"),$(".copy").children("h1, p").show(),$(".copy").removeClass("copy"),$(".draggable").draggable({cursor:"pointer",revert:"invalid",disabled:!1,start:function(){if(i===!1){var e={stage:session.currentStage(),timestamp:new Date};t=new CustomEvent("log",{detail:{eventType:"taskComprehended",eventObject:e}}),window.dispatchEvent(t),i=!0}}}),l=!1)},p=function(e){if(e.stopPropagation(),l===!1){if($(".draggable").draggable({cursor:"pointer",revert:"invalid",disabled:!0,start:function(){if(i===!1){var e={stage:session.currentStage(),timestamp:new Date};t=new CustomEvent("log",{detail:{eventType:"taskComprehended",eventObject:e}}),window.dispatchEvent(t),i=!0}}}),!$(this).hasClass(".node-bin-active")){$(".container").children().not(this).addClass("invisible");var o=$(this).offset(),n=$(this);n.offset(o),n.addClass("node-bin-active copy"),n.removeClass("node-bin-static"),n.children("h1, p").hide(),n.children(".active-node-list").children(".node-item").css({top:0,left:20,opacity:0}),setTimeout(function(){n.addClass("node-bin-active"),$.each($(".active-node-list").children(),function(e,o){setTimeout(function(){$(o).transition({left:0,opacity:1})},20*e)})},100)}l=!0}},u=function(e){e.stopPropagation();var o=$(this),t=$(this).parent().parent().data("index");if($(this).parent().hasClass("active-node-list")){var i=network.getEdges({from:network.getNodes({type_t0:"Ego"})[0].id,to:o.data("node-id"),type:n.options.edgeType})[0].id,a={};a[n.options.variable.label]="","undefined"!=typeof n.options.followup&&$.each(n.options.followup.questions,function(e,o){a[o.variable]=void 0}),network.updateEdge(i,a),$(this).fadeOut(400,function(){$(this).appendTo(".node-bucket"),$(this).css("display","");var e="people";1===$(".c"+t).children(".active-node-list").children().length&&(e="person"),$(".c"+t).children("p").html(0===$(".c"+t).children(".active-node-list").children().length?"(Empty)":$(".c"+t).children(".active-node-list").children().length+" "+e+".")})}};return n.destroy=function(){notify("Destroying multiBin.",0),window.removeEventListener("changeStageStart",s,!1),$(".node-bin-static").off("click",p),$(".node-item").off("click",u),$(".content").off("click",c),$(".followup-submit").off("click",d),$(".followup-cancel").off("click",r)},n.init=function(){if(n.options.targetEl.append("<h1>"+n.options.heading+"</h1>"),n.options.targetEl.append('<p class="lead">'+n.options.subheading+"</p>"),n.options.targetEl.append('<div class="node-bucket"></div>'),"undefined"!=typeof n.options.followup){if($("body").append('<div class="followup overlay"><form class="followup-form"></form></div>'),"undefined"!=typeof n.options.followup.linked&&n.options.followup.linked===!0){var e=!0;$.each(n.options.followup.questions,function(o,t){$(".followup").children("form").append("<h2>"+t.prompt+'</h2><div class="row form-group"><input type="number" class="form-control '+t.variable+'" id="'+t.variable+'" required></div>'),e&&$("#"+t.variable).change(function(){$("#"+n.options.followup.questions[o+1].variable).val()>$("#"+t.variable).val()&&$("#"+n.options.followup.questions[o+1].variable).val($("#"+t.variable).val()),$("#"+n.options.followup.questions[o+1].variable).attr("max",$("#"+t.variable).val())}),e=!e})}else $.each(n.options.followup.questions,function(e,o){$(".followup").children("form").append("<h2>"+o.prompt+'</h2><div class="row form-group"><input type="text" class="form-control '+o.variable+'" id="'+o.variable+'" required></div>')});$(".followup").children("form").append('<div class="row form-group"><button type="submit" class="btn btn-primary btn-block followup-submit">Continue</button></div>'),"undefined"!=typeof n.options.followup.cancel&&$(".overlay").children().last(".form-group").prepend('<button type="submit" class="btn btn-warning btn-block followup-cancel">'+n.options.followup.cancel+"</button>")}for(var o=Math.floor(.66*n.options.variable.values.length),l=$(".container").outerWidth()/o,v=l;2*v>$(".container").height()-300;)v=.98*v;var f=network.getEdges(n.options.criteria,n.options.filter);$.each(n.options.variable.values,function(e,o){var t=$('<div class="node-bin node-bin-static c'+e+'" data-index="'+e+'"><h1>'+o+'</h1><p class="lead">(Empty)</p><div class="active-node-list"></div></div>');t.data("index",e),n.options.targetEl.append(t),$(".c"+e).droppable({accept:".draggable",drop:function(o,t){var i=t.draggable,l=$(this);if("undefined"!=typeof n.options.followup&&n.options.followup.trigger.indexOf(n.options.variable.values[e])>=0)$(".followup").show(),$(".black-overlay").show(),$("#"+n.options.followup.questions[0].variable).focus(),a=$(i).data("node-id");else if("undefined"!=typeof n.options.followup){console.log("removing followup properties.");var s=$(i).data("node-id"),d={to:s};extend(d,n.options.criteria);var r=network.getEdges(d)[0],c={};$.each(n.options.followup.questions,function(e){c[n.options.followup.questions[e].variable]=void 0}),extend(r,c),network.updateEdge(r.id,r),$.each(n.options.followup.questions,function(e){$("#"+n.options.followup.questions[e].variable).val("")})}$(i).appendTo(l.children(".active-node-list"));var p={};p[n.options.variable.label]=n.options.variable.values[e];var u=network.getEdges({from:network.getNodes({type_t0:"Ego"})[0].id,to:$(i).data("node-id"),type:n.options.edgeType})[0].id;console.log(p),console.log(u),network.updateEdge(u,p);var v="people";1===$(".c"+e+" .active-node-list").children().length&&(v="person"),$(".c"+e+" p").html($(".c"+e+" .active-node-list").children().length+" "+v+".");var f=$(".c"+e);f.transition({scale:1.2},200,"ease"),setTimeout(function(){f.transition({background:f.data("oldBg")},200,"ease"),f.transition({scale:1},200,"ease")},0)},over:function(){$(this).data("oldBg",$(this).css("background-color")),$(this).stop().transition({background:"rgba(255, 193, 0, 1.0)"},400,"ease")},out:function(){$(this).stop().transition({background:$(this).data("oldBg")},500,"ease")}})}),$(".node-bin").css({width:v-20,height:v-20}),$(".node-bin h1").css({marginTop:v/3}),$.each($(".node-bin"),function(e,o){var t=$(o).offset();$(o).data("oldPos",t),$(o).css(t)}),$(".node-bin").css({position:"absolute"}),$.each(f,function(e,o){var t=network.getEdges({from:network.getNodes({type_t0:"Ego"})[0].id,type:"Dyad",to:o.to})[0];if(void 0!==o[n.options.variable.label]&&""!==o[n.options.variable.label]){e=n.options.variable.values.indexOf(o[n.options.variable.label]),$(".c"+e).children(".active-node-list").append('<div class="node-item draggable" data-node-id="'+o.to+'">'+t.nname_t0+"</div>");var i="people";1===$(".c"+e).children(".active-node-list").children().length&&(i="person"),$(".c"+e).children("p").html(0===$(".c"+e).children(".active-node-list").children().length?"(Empty)":$(".c"+e).children(".active-node-list").children().length+" "+i+".")}else $(".node-bucket").append('<div class="node-item draggable" data-node-id="'+o.to+'">'+t.nname_t0+"</div>")}),$(".draggable").draggable({cursor:"pointer",revert:"invalid",disabled:!1,start:function(){if(i===!1){var e={stage:session.currentStage(),timestamp:new Date};t=new CustomEvent("log",{detail:{eventType:"taskComprehended",eventObject:e}}),window.dispatchEvent(t),i=!0}}}),window.addEventListener("changeStageStart",s,!1),$(".node-bin-static").on("click",p),$(".node-item").on("click",u),$(".content").on("click",c),$(".followup-form").on("submit",d),$(".followup-cancel").on("click",r)},n.init(),n};