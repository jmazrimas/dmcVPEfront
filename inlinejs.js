

$( document ).ready(function() {
    

	var userEditListener = function(event) {
		// console.log('event')
		// console.log(event)

		updateGroupInputValue(event.currentTarget);
	}

	//On changes, re-write variable value
	var updateGroupInputValue = function(group) {
		group = $(group)
		console.log(group.find('input'))
	}

	//Listen all all "tagged" groups
	$(".userEditGroup").click(userEditListener).keyup(userEditListener);

});