/* global console, network, extend, notify, session */
/* exported MultiBin */
var MultiBin = function MultiBin(options) {

	//global vars
	var log;
	var taskComprehended = false;
	var multiBin = {}, followup;
	multiBin.options = {
		targetEl: $('.container'),
		edgeType: 'Dyad',
		variable: {
			label:'multibin_variable',
			values: [
			'Variable 1',
			]
		},
		filter: undefined,
		heading: "Default Heading",
		subheading: "Default Subheading."
	};

	var open = false;
	extend(multiBin.options, options);

	var stageChangeHandler = function() {
	multiBin.destroy();
	};

	var followupHandler = function(e) {
		e.preventDefault();
		// Handle the followup data

		// First, retrieve the relevant values

		var nodeid = followup;

		// Next, get the edge we will be storing on
		var criteria = {
			to:nodeid
		};

		extend(criteria, multiBin.options.criteria);
		var edge = network.getEdges(criteria)[0];

		// Create an empty object for storing the new properties in
		var followupProperties = {};

		// Assign a new property according to the variable name(s)
		$.each(multiBin.options.followup.questions, function(index) {
			var followupVal = $("#"+multiBin.options.followup.questions[index].variable).val();
			followupProperties[multiBin.options.followup.questions[index].variable] = followupVal;
		});

		// Update the edge
		extend(edge, followupProperties);
		network.updateEdge(edge.id, edge);

		// Clean up
		$.each(multiBin.options.followup.questions, function(index) {
			$("#"+multiBin.options.followup.questions[index].variable).val("");
		});


		$('.followup').hide();
		$('.black-overlay').hide();
	};

	var followupCancelHandler = function() {

		// Clean up
		$("#"+multiBin.options.followup.variable).val("");
		$('.followup').hide();
		$('.black-overlay').hide();
	};

	var backgroundClickHandler = function(e) {
		e.stopPropagation();
		if (e.target !== e.currentTarget) {

			if (open === true) {
				$('.container').children().removeClass('invisible');
				$('.copy').removeClass('node-bin-active');
				$('.copy').addClass('node-bin-static');
				$('.copy').children('h1, p').show();
				$('.copy').removeClass('copy');
				$(".draggable").draggable({ cursor: "pointer", revert: "invalid", disabled: false, start: function(){
					if (taskComprehended === false) {
						var eventProperties = {
							stage: session.currentStage(),
							timestamp: new Date()
						};
						log = new CustomEvent('log', {"detail":{'eventType': 'taskComprehended', 'eventObject':eventProperties}});
						window.dispatchEvent(log);
						taskComprehended = true;
					}
				}});
				open = false;
			}

		}

	};

	var nodeBinClickHandler = function(e) {
		e.stopPropagation();
		if (open === false) {

			$(".draggable").draggable({ cursor: "pointer", revert: "invalid", disabled: true, start: function() {
				if (taskComprehended === false) {
					var eventProperties = {
						stage: session.currentStage(),
						timestamp: new Date()
					};
					log = new CustomEvent('log', {"detail":{'eventType': 'taskComprehended', 'eventObject':eventProperties}});
					window.dispatchEvent(log);
					taskComprehended = true;
				}
			}});
			if(!$(this).hasClass('.node-bin-active')) {
				$('.container').children().not(this).addClass('invisible');
				var position = $(this).offset();
				var nodeBinDetails = $(this);
				nodeBinDetails.offset(position);
				nodeBinDetails.addClass('node-bin-active copy');
				nodeBinDetails.removeClass('node-bin-static');
				nodeBinDetails.children('h1, p').hide();

			// $('.content').append(nodeBinDetails);
			nodeBinDetails.children('.active-node-list').children('.node-item').css({top:0,left:20,opacity:0});

			setTimeout(function(){
				nodeBinDetails.addClass('node-bin-active');
				$.each($('.active-node-list').children(), function(index,value) {
					setTimeout(function(){
						$(value).transition({left:0,opacity:1});
					},20*index);
				});
			},100);
		}

		open = true;
	}

	};

	var nodeClickHandler = function(e) {
		e.stopPropagation();
		var el = $(this);
		var id = $(this).parent().parent().data('index');

		  // has the node been clicked while in the bucket or while in a bin?
		  if ($(this).parent().hasClass('active-node-list')) {
			// it has been clicked while in a bin.
			var edgeID = network.getEdges({from:network.getNodes({type_t0:'Ego'})[0].id,to:el.data('node-id'), type:multiBin.options.edgeType})[0].id;
			var properties = {};
			// make the values null when a node has been taken out of a bin
			properties[multiBin.options.variable.label] = '';

			// dont forget followups
			if(typeof multiBin.options.followup !== 'undefined') {
				$.each(multiBin.options.followup.questions, function(index, value) {
						properties[value.variable] = undefined;
				});
			}
			network.updateEdge(edgeID,properties);
			$(this).fadeOut(400, function() {
				$(this).appendTo('.node-bucket');
				$(this).css('display', '');
				var noun = "people";
				if ($('.c'+id).children('.active-node-list').children().length === 1) {
					noun = "person";
				}
				if ($('.c'+id).children('.active-node-list').children().length === 0) {
					$('.c'+id).children('p').html('(Empty)');
				} else {
					$('.c'+id).children('p').html($('.c'+id).children('.active-node-list').children().length+' '+noun+'.');
				}

			});

		}

	};

	multiBin.destroy = function() {
		// Event Listeners
		notify("Destroying multiBin.",0);
		window.removeEventListener('changeStageStart', stageChangeHandler, false);
		$('.node-bin-static').off("click", nodeBinClickHandler);
		$('.node-item').off("click", nodeClickHandler);
		$('.content').off("click", backgroundClickHandler);
		$('.followup-submit').off('click', followupHandler);
		$('.followup-cancel').off('click', followupCancelHandler);

	};

	multiBin.init = function() {
		// Add header and subheader
		multiBin.options.targetEl.append('<h1>'+multiBin.options.heading+'</h1>');
		multiBin.options.targetEl.append('<p class="lead">'+multiBin.options.subheading+'</p>');

		// Add node bucket
		multiBin.options.targetEl.append('<div class="node-bucket"></div>');

		// Create the followup dialog, if it exists
		if(typeof multiBin.options.followup !== 'undefined') {
			$('body').append('<div class="followup overlay"><form class="followup-form"></form></div>');

			if(typeof multiBin.options.followup.linked !== 'undefined' && multiBin.options.followup.linked === true) {
				var first = true;

				$.each(multiBin.options.followup.questions, function(index, value) {
						$('.followup').children('form').append('<h2>'+value.prompt+'</h2><div class="row form-group"><input type="number" class="form-control '+value.variable+'" id="'+value.variable+'" required></div>');

					if (first) {
						$('#'+value.variable).change(function() {
							if ($('#'+multiBin.options.followup.questions[(index+1)].variable).val() > $('#'+value.variable).val()) {
								$('#'+multiBin.options.followup.questions[(index+1)].variable).val($('#'+value.variable).val());
							}
							$('#'+multiBin.options.followup.questions[(index+1)].variable).attr('max', $('#'+value.variable).val());

						});
					}


					first = !first;
				});
			} else {
				$.each(multiBin.options.followup.questions, function(index, value) {
					$('.followup').children('form').append('<h2>'+value.prompt+'</h2><div class="row form-group"><input type="text" class="form-control '+value.variable+'" id="'+value.variable+'" required></div>');
				});
			}



			$('.followup').children('form').append('<div class="row form-group"><button type="submit" class="btn btn-primary btn-block followup-submit">Continue</button></div>');

			// Add cancel button if required
			if (typeof multiBin.options.followup.cancel !== 'undefined') {
				$('.overlay').children().last('.form-group').prepend('<button type="submit" class="btn btn-warning btn-block followup-cancel">'+multiBin.options.followup.cancel+'</button>');
			}

		}

		var number = Math.floor(multiBin.options.variable.values.length*0.66);
		var itemSizeW = $('.container').outerWidth()/number;


		var itemSize = itemSizeW;
		while(itemSize*2 > $('.container').height()-300) {
			itemSize = itemSize*0.98;
		}

		// get all edges
		var edges = network.getEdges(multiBin.options.criteria, multiBin.options.filter);
		// var newLine = false;
		// One of these for each bin. One bin for each variable value.
		$.each(multiBin.options.variable.values, function(index, value){

			// if (index+1>number && newLine === false) {
			// 	multiBin.options.targetEl.append('<br>');
			// 	newLine = true;
			// }
			var newBin = $('<div class="node-bin node-bin-static c'+index+'" data-index="'+index+'"><h1>'+value+'</h1><p class="lead">(Empty)</p><div class="active-node-list"></div></div>');
			newBin.data('index', index);
			multiBin.options.targetEl.append(newBin);
			$(".c"+index).droppable({ accept: ".draggable",
				drop: function(event, ui) {
					var dropped = ui.draggable;
					var droppedOn = $(this);

			  		// Check if the node has been dropped into a bin that triggers the followup
				  	if(typeof multiBin.options.followup !== "undefined" && multiBin.options.followup.trigger.indexOf(multiBin.options.variable.values[index]) >=0 ) {
				  		$('.followup').show();
						$('.black-overlay').show();
				  		$("#"+multiBin.options.followup.questions[0].variable).focus();
				  		followup = $(dropped).data('node-id');
				  	} else if (typeof multiBin.options.followup !== "undefined") {
						console.log('removing followup properties.');
				  		// Here we need to remove any previously set value for the followup variable, if it exists.
						var nodeid = $(dropped).data('node-id');

						// Next, get the edge we will be storing on
						var criteria = {
							to:nodeid
						};

						extend(criteria, multiBin.options.criteria);
						var edge = network.getEdges(criteria)[0];

						// Create an empty object for storing the new properties in
						var followupProperties = {};

						// Assign a new property according to the variable name(s)
						$.each(multiBin.options.followup.questions, function(index) {
							followupProperties[multiBin.options.followup.questions[index].variable] = undefined;
						});

						// Update the edge
						extend(edge, followupProperties);
						network.updateEdge(edge.id, edge);

						// Clean up
						$.each(multiBin.options.followup.questions, function(index) {
							$("#"+multiBin.options.followup.questions[index].variable).val("");
						});

				  	}

					$(dropped).appendTo(droppedOn.children('.active-node-list'));
					var properties = {};
					properties[multiBin.options.variable.label] = multiBin.options.variable.values[index];
					// Add the attribute
					var edgeID = network.getEdges({from:network.getNodes({type_t0:'Ego'})[0].id,to:$(dropped).data('node-id'), type:multiBin.options.edgeType})[0].id;
					console.log(properties);
					console.log(edgeID);
					network.updateEdge(edgeID,properties);

					var noun = "people";
					if ($(".c"+index+" .active-node-list").children().length === 1) {
					  	noun = "person";
					}
					$(".c"+index+" p").html($(".c"+index+" .active-node-list").children().length+' '+noun+'.');

					var el = $(".c"+index);
						// var origBg = el.css('background-color');
						el.transition({scale:1.2}, 200, 'ease');
						setTimeout(function(){
							el.transition({background:el.data('oldBg')}, 200, 'ease');
							el.transition({ scale:1}, 200, 'ease');
						}, 0);
					},
				over: function() {
						$(this).data('oldBg', $(this).css('background-color'));
						$(this).stop().transition({background:'rgba(255, 193, 0, 1.0)'}, 400, 'ease');

				},
				out: function() {
						$(this).stop().transition({background:$(this).data('oldBg')}, 500, 'ease');
				}
			});

		});

		// $('.node-bin').css({width:itemSize*0.60-20,height:itemSize*0.60-20});
		$('.node-bin').css({width:itemSize-20,height:itemSize-20});
		// $('.node-bin').css({width:itemSize,height:itemSize});

		$('.node-bin h1').css({marginTop: itemSize/3});

		$.each($('.node-bin'), function(index, value) {
			var oldPos = $(value).offset();
			$(value).data('oldPos', oldPos);
			$(value).css(oldPos);

		});

		$('.node-bin').css({position:'absolute'});

		// Add edges to bucket or to bins if they already have variable value.
		$.each(edges, function(index,value) {

			// We need the dyad edge so we know the nname for other types of edges
			var dyadEdge = network.getEdges({from:network.getNodes({type_t0:'Ego'})[0].id, type:"Dyad", to:value.to})[0];
			if (value[multiBin.options.variable.label] !== undefined && value[multiBin.options.variable.label] !== "") {
				index = multiBin.options.variable.values.indexOf(value[multiBin.options.variable.label]);
				$('.c'+index).children('.active-node-list').append('<div class="node-item draggable" data-node-id="'+value.to+'">'+dyadEdge.nname_t0+'</div>');
				var noun = "people";
				if ($('.c'+index).children('.active-node-list').children().length === 1) {
					noun = "person";
				}
				if ($('.c'+index).children('.active-node-list').children().length === 0) {
					$('.c'+index).children('p').html('(Empty)');
				} else {
					$('.c'+index).children('p').html($('.c'+index).children('.active-node-list').children().length+' '+noun+'.');
				}
			} else {
				$('.node-bucket').append('<div class="node-item draggable" data-node-id="'+value.to+'">'+dyadEdge.nname_t0+'</div>');
			}

		});
		$(".draggable").draggable({ cursor: "pointer", revert: "invalid", disabled: false , start: function(){
			if (taskComprehended === false) {
				var eventProperties = {
					stage: session.currentStage(),
					timestamp: new Date()
				};
				log = new CustomEvent('log', {"detail":{'eventType': 'taskComprehended', 'eventObject':eventProperties}});
				window.dispatchEvent(log);
				taskComprehended = true;
			}
		}});

		// Event Listeners
		window.addEventListener('changeStageStart', stageChangeHandler, false);
		$('.node-bin-static').on("click", nodeBinClickHandler);
		$('.node-item').on("click", nodeClickHandler);
		$('.content').on("click", backgroundClickHandler);
		$('.followup-form').on('submit', followupHandler);
		$('.followup-cancel').on('click', followupCancelHandler);

	};

multiBin.init();

return multiBin;
};
