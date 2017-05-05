fs = require('fs');
var constants = fs.readFileSync('./constants.json');
var constantsJSON = JSON.parse(constants);

function formatCategories(constantsJSON) {
  var groupedCats = {}

  for (var i=0; i<constantsJSON.length; i++) {
    var name = constantsJSON[i].name
    var breakPoint = name.indexOf("::")
    var category = name.substring(0,breakPoint)
    constantsJSON[i].name = name.substring(breakPoint+3,name.length)

    if (!groupedCats[category] && category.length > 0) {
      groupedCats[category] = [constantsJSON[i]]
    } else if (groupedCats[category] && category.length > 0) {
      groupedCats[category].push(constantsJSON[i])
    }

  }

  return groupedCats;

}
