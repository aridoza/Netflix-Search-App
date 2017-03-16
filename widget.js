$(document).ready( () => {

  //Initializing OAuth.js
  // OAuth.initialize();


  // let url = "../data/employees.json";
  // let url = "http://netflixroulette.net/api/api.php?title=";
  let url = "https://netflixroulette.net/api/api.php?";
  let searchTitle = document.querySelector('.searchInput');
  const searchButton = document.querySelector('.searchButton');
  const searchSelection = document.querySelector('.searchType');
  const dataDiv = document.querySelector('.entry');


  // When user clicks the search button, search the API for a match according to search parameters
  searchButton.addEventListener('click', () => {

    // //Move the search fields and returned data up on the page
    // document.querySelector('.search-content-container').style.paddingTop = "-30px";

    let type = searchSelection.value;
    url += type + "=";

    //Title: returns one object
    //Director: returns array of one or more objects
    //Actor: returns array of one or more objects

    //Reference to the input text field
    let searchData = searchTitle.value;
    if (searchData) {
      let searchText = searchData.split(" ");
      // console.log(searchText);
      // make each word after the first all lowercase
      for (let i = 1; i < searchText.length; i += 1) {
        searchText[i] = searchText[i].toLowerCase();
      }
      // console.log("Lowercased search text: ", searchText);

      for (let i = 0; i < searchText.length; i += 1) {
        if(i < searchText.length - 1) {
          url += searchText[i] + "%20";
        } else {
          url += searchText[i];
        }
      }
      // console.log(url);
    }
    $.get(url, function(response) {
      // console.log(response);

      //if it's an actor or director:
      // console.log(response[0]);
      // console.log("Total items: ", response.length);

      // Handlebars data:
      let theTemplateScript = $('#address-template').html();

      let theTemplate = Handlebars.compile(theTemplateScript);

      // Check if user is searching by title and map single item returned
      if (type === "title") {
            let movieData = {
          'poster': response.poster,
          'title': response.show_title,
          'summary': response.summary,
          'year': response.release_year
        }

        let theCompiledHtml = theTemplate(movieData);

        $('.content-placeholder').html(theCompiledHtml);

      } else if (type === "actor" || type === "director") {
        let actorData = response;
        let actorCollection = [];
        for (let i = 0; i < actorData.length; i += 1) {
          let actorProps = {
            'poster': actorData[i].poster,
            'title': actorData[i].show_title,
            'summary': actorData[i].summary,
            'year': actorData[i].release_year
          }
          actorCollection.push(actorProps);
        }
        console.log("All the actor properties: ",actorCollection);
        let theCompiledHTML = theTemplate(actorCollection);

        $('.content-placeholder').html(theCompiledHTML);
      } else {
        console.log("No Response ");
        $('.return-data-container').html("<h3>No 'flix found. Please try again.</h3>");
      }

      // End Handlebars data
      // $('#ajax').html(response.show_title);
    });


    url = "https://netflixroulette.net/api/api.php?"
  });



  // $.getJSON(url, function (response) {
  //   let statusHTML = '<ul class="bulleted">';
  //   $.each(response, function (index, employee) {
  //     if (employee.inoffice === true) {
  //       statusHTML +='<li class="in">';
  //     } else {
  //       statusHTML +='<li class="out">';
  //     }
  //     statusHTML += employee.name + '</li>';
  //   });
  //   statusHTML += '</ul>';
  //   $('#employeeList').html(statusHTML);
  // });  // end getJSON

  // $.getJSON(url, function (response) {
  //   $('#ajax').html(response.category);
  // });


}); // end ready
