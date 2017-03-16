var url = '/employees.php';
//data value is optional; a query string ex: employees.php?firstName=Dave&lastName=McFarland
var data = {
  firstName : "Dave",
  lastName : "McFarland"
};
//callback only run when ajax request is complete and successful
var callback = function (response) {
  //do something with the response
};
$.get(url, data, callback);
//Note: can also pass the variable values directly
