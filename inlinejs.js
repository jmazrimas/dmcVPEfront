

$( document ).ready(function() {
    

	var userEditListener = function(event) {
		// console.log('event')
		// console.log(event)

		updateGroupInputValue(event.currentTarget);
	}

	//On changes, re-write variable value
	var updateGroupInputValue = function(group) {
		group = $(group)
		var inputs = group.find('input')
		var jsonInputs = []

		for (var i=0; i<inputs.length; i++) {
			var inputPair = {}
			inputPair[inputs[i].id] = inputs[i].value
			jsonInputs.push(inputPair)
		}

		console.log(jsonInputs)
	}

	//Listen all all "tagged" groups
	$(".userEditGroup").click(userEditListener).keyup(userEditListener);

});