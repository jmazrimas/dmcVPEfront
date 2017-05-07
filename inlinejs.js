

$( document ).ready(function() {
    

	var userEditListener = function(event) {
		updateGroupInputValue(event.currentTarget);
	}

	//On changes, re-write variable value
	var updateGroupInputValue = function(group) {
		group = $(group)

		var groupTitle = group.find('h3')[0].innerText+"inputList";
		var inputString = returnGroupedInputs(group);

		console.log(groupTitle)
		console.log(inputString)

	}

	var returnGroupedInputs = function(group) {
		var inputs = group.find('input')
		var jsonInputs = []

		for (var i=0; i<inputs.length; i++) {
			var inputPair = {}
			inputPair[inputs[i].id] = inputs[i].value
			jsonInputs.push(inputPair)
		}

		return (JSON.stringify(jsonInputs))
	}

	//Listen all all "tagged" groups
	$(".userEditGroup").click(userEditListener).keyup(userEditListener);
	$("button.removeInput").click(function(event){
		var inputToRemove = event.target.closest('div.item');
		inputToRemove.remove();
	});

});