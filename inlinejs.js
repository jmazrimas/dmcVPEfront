var userEditListener = function(event) {
	updateGroupInputValue(event.currentTarget);
}

//On changes, re-write variable value
var updateGroupInputValue = function(group) {
	group = $(group)

	var groupTitle = group.find('h3')[0].innerText+"inputList";
	var inputString = returnGroupedInputs(group);

}

var returnGroupedInputs = function(group) {
	var inputs = group.find('input')
	var jsonInputs = []

	for (var i=0; i<inputs.length; i++) {
		var inputPair = {}
		if (!$(inputs[i]).hasClass('addedInput')) {
			inputPair[inputs[i].id] = inputs[i].value
			jsonInputs.push(inputPair)	
		} else if ($(inputs[i]).hasClass('addedInputValue')){
			var addedInputName = $(inputs[i]).closest('.item').find('.addedInput')[0].value
			inputPair[addedInputName] = inputs[i].value
			jsonInputs.push(inputPair)	
		}
	}

	console.log(JSON.stringify(jsonInputs))
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

	//Listen on remove buttons
	$("button.removeInput").click(function(event){
		var inputToRemove = event.target.closest('div.item');
		inputToRemove.remove();
	});

	//Listen on add buttons
	$("button.addInput").click(function(event){
		inputTemplate.clone().insertAfter(event.target);
	});

	buildInputTemplate($("#vpe").find(".item").first().clone());

});