var userEditListener = function(event) {
	updateGroupInputValue(event.currentTarget);
}

//On changes, re-write variable value
var updateGroupInputValue = function(group) {
	group = $(group)

	var inputString = returnGroupedInputs(group);
	group.find("[type='hidden']").val(inputString);
	console.log(group.find("[type='hidden']"))

}

var returnGroupedInputs = function(group) {
	var inputs = group.find('input')
	var jsonInputs = []

	for (var i=0; i<inputs.length; i++) {
		var inputPair = {}
		if (!$(inputs[i]).hasClass('addedInput') && !$(inputs[i]).hasClass('json_inputs')) {
			inputName = inputs[i].id || $(inputs[i]).attr('input_tag')
			inputPair[inputName] = inputs[i].value
			jsonInputs.push(inputPair)	
		} else if ($(inputs[i]).hasClass('addedInputValue')){
			var addedInputName = $(inputs[i]).closest('.item').find('.addedInput')[0].value
			inputPair[addedInputName] = inputs[i].value
			jsonInputs.push(inputPair)	
		}
	}

	return (JSON.stringify(jsonInputs))
}

var inputTemplate;

var buildInputTemplate = function(exampleInput) {

	var title = exampleInput.find('.title');
	exampleInput.find('.unit').remove();
	exampleInput.find('.key').remove();
	exampleInput.find('.help').remove();
	exampleInput.find('input').attr("placeholder", "Value of Input");
	exampleInput.find('input').addClass('addedInput addedInputValue');

	$("<input class=\"addedInput\" placeholder=\"Name of Input\">").insertAfter(title);
	title.remove();

	inputTemplate = exampleInput;

}

$( document ).ready(function() {

	//Listen all all "tagged" groups
	$(".userEditGroup").click(userEditListener).keyup(userEditListener);

	//Listen on remove buttons and remove when clicked
	$("#vpe").click(function(event){
		var target = $(event.target);
		if (target.hasClass('removeInput')) {
			var inputToRemove = event.target.closest('div.item');
			inputToRemove.remove();
		}
	});

	//Listen on add buttons
	$("button.addInput").click(function(event){
		inputTemplate.clone().insertAfter(event.target);
	});

	buildInputTemplate($("#vpe").find(".item").first().clone());

});