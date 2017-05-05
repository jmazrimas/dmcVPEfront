  fs = require('fs');
handlebars = require('handlebars');
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

function makeGroupedCatsCollection(groupedCats) {
  categoryCollection = []
  for (var k in groupedCats) {
    if (groupedCats.hasOwnProperty(k)) {
       categoryCollection.push({category: k, items: groupedCats[k]});
    }
  }
  return categoryCollection;
}

var source = fs.readFileSync('./template.handlebars', 'utf-8');
var cssRaw = fs.readFileSync('./vpe.css', 'utf-8');
var template = handlebars.compile(source);
var groupedCats = formatCategories(constantsJSON);
var data = {vpeData: makeGroupedCatsCollection(groupedCats)};
var result = template(data);
var style = "<style>"+cssRaw+"</style>"
// var complete = style+result
var complete = "<link rel=\"stylesheet\" type=\"text/css\" href=\"vpe.css\">"+"<link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/bootstrap.css\">"+result

fs.writeFile('index.html', complete, function(err){
  if (err) {
    console.log('an error occurred')
  } else {
    console.log('wrote file')
  }
})
