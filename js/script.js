console.log('js');

console.log(key);
  //////////////////////////////////////////////////////////////////////////
//remember to add libraries=places in the line below
  //////////////////////////////////////////////////////////////////////////
var script = '<script src="https://maps.googleapis.com/maps/api/js?key='+ key +'&callback=initMap&libraries=places&v=weekly" async defer></script>';
console.log(script);



$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$('.main2, .main3, .details').hide();

$('.block').click(function(){
  $('.main2').show();
  $('.main3').show();
  $('.block').hide();
});

$('.top').click(function(){
  $('.main2').hide();
  $('.main3').hide();
  $('.block').show();
});

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}


$('.submit').click(function(){
  $('.main2').hide();
  $('.main3').hide();
  $('.main1').hide();
  $('.viewMore').hide();
  $('.details').show();
});

$('.logo').click(function(){
  $('.main2').hide();
  $('.main3').hide();
  $('.main1').show();
  $('.viewMore').show();
  $('.details').hide();
});





function initMap() {
var days, heads;
// date calculation
$('#startDate').datepicker({
  dateFormat : 'yy-mm-dd',
  changeMonth : true,
  minDate :new Date(),
  maxDate : '+1y',
  onSelect : function(date){
    var selectDate = new Date(date);
    var msecInADay  = 86400000;
    var stDate = new Date(selectDate.getTime() + msecInADay);

    $('#endDate').datepicker('option', 'minDate', stDate);
    var enDate = new Date(selectDate.getTime() + 10 * msecInADay);

    $('#endDate').datepicker('option', 'maxDate', enDate);

  }

});

$('#endDate').datepicker({
  dateFormat : 'yy-mm-dd',
  changeMonth : true
});

$('#calculateDays').click(function(){
  days = dateDiff();
  $('#days').val(days);
  heads = parseInt($('#heads').val());
  console.log(days,heads);
  filterVehicles(days, heads);
  granttotal(days)
});

function filterVehicles(d,h){
  console.log(d, h);
  var i;
  for (i = 0; i < vehicles.length; i++) {
    console.log(vehicles[i].minDays,vehicles[i].maxDays,vehicles[i].minPeople, vehicles[i].maxPeople);
    if ((d >= vehicles[i].minDays)&& (d <= vehicles[i].maxDays) && (h >= vehicles[i].minPeople) && (h <= vehicles[i].maxPeople)){
      console.log(vehicles[i].name, vehicles[i].color);
      displayCards(i);
    }
  }
}


function dateDiff(){
var start = $(startDate).datepicker('getDate');
var end = $(endDate).datepicker('getDate');

var days = (end-start)/1000/60/60/24; //to get human readable days
return (days);

}



//////////////////////////////////////////////////////////////////////////
    //from autocomplete
    var start = new google.maps.places.Autocomplete(
         document.getElementById("start"),
         {
           types: ["(cities)"]

         }
       );//autocomplete start_address

    var end = new google.maps.places.Autocomplete(
         document.getElementById("end"),
         {
           types: ["(cities)"]

         }
       );//autocomplete end_address
////////////////////////////////////////////////////////////////////////

//directions distance and duration
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();

//
//callilng map from directions
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 6,
  center: { lat: 41.85, lng: -87.65 },
  mapTypeId : 'satellite'

});//map

   directionsRenderer.setMap(map);


document.getElementById("submit").addEventListener("click", () => {
  calculateAndDisplayRoute(directionsService, directionsRenderer);
});
}


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
const waypts = [];
const checkboxArray = document.getElementById("waypoints");

for (let i = 0; i < checkboxArray.length; i++) {
  if (checkboxArray.options[i].selected) {
    waypts.push({
      location: checkboxArray[i].value,
      stopover: true,
    });
  }
}

directionsService.route(
  {
    origin: document.getElementById("start").value,
    destination: document.getElementById("end").value,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING,
  },
  (response, status) => {
    if (status === "OK") {
      console.log(response);
      directionsRenderer.setDirections(response);
      const route = response.routes[0];
      const summaryPanel = document.getElementById("directions-panel");

      summaryPanel.innerHTML = "";

      // For each route, display summary information.
      for (let i = 0; i < route.legs.length; i++) {
        const routeSegment = i + 1;
        summaryPanel.innerHTML +=
          "<b>Route Segment: " + routeSegment + "</b><br>";
        summaryPanel.innerHTML += route.legs[i].start_address + " to ";
        summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
        summaryPanel.innerHTML +=
          route.legs[i].distance.text + " and it takes " + route.legs[i].duration.text + " to reach."+ "<br><br>";
      }

    } else {
      window.alert("Directions request failed due to " + status);
    }
  }
);
}


$('#start,#end').click(function(){
$(this).val('');
})



$(document).ready(function(){
  $('body').append(script);
});

// $('#submit').click(function(){
//   $('.main2').show();
//   $('.main3').show();
// });










// // // ==========================================================
// // // Declaration of an array of objects
// // // ==========================================================
var vehicles = [
      {
        id : 101,
        name : 'Volkswagon Kombi 2020',
        color : 'Yellow',
        rent : 200,
        gas : 17,
        minDays : 2,
        maxDays : 15,
        minPeople : 2,
        maxPeople : 6,
        photo : 'id_buzz_concept_7399-2.jpg',
        description : 'The Kombi, Aussie coastal royalty. It’s a rule firmly established in Aussie coastal living ' +
        'if you want to drag everyone’s eyes from their flat whites, their beach-reads, or even the incoming swell,' +
        'all you need is to cruise past in a Kombi. And that’s because the Kombi is timeless, unimprovable, at least,  ' +
        'we thought it was unimprovable.',
        tagWords : ['kombi', 'vw', 'van', '', 'wichianmat landrace','thailand', 'siam', 'europe','north america','19th century']

      },
      {
        id : 102,
        name : 'Nissan Leaf 2020',
        color : 'White',
        rent : 144,
        gas : 9.7,
        minDays : 3,
        maxDays : 10,
        minPeople : 1,
        maxPeople : 5,
        photo : '2020-Nissan-Nissan-LEAF-SV-Plus-2-source-e1578666326115.jpg',
        description : 'Get the best of both worlds with instant acceleration and surprising power alongside an effortless, ' +
        'quiet drive performance — all with zero exhaust emissions. ' +
        'Command the road with every twist and turn, as LEAF’s low centre of gravity ensures ultra-smooth handling.  ' +
        'Its a driving experience unlike any other.',
        tagWords : ['leaf', 'nissan', 'car', 'hatchback', '5 seater','japan', 'white', 'europe','north america','19th century']

      },
      {
        id : 103,
        name : 'BMW i3 2020',
        color : 'blue',
        rent : 129,
        gas : 8.5,
        minDays : 1,
        maxDays : 10,
        minPeople : 1,
        maxPeople : 2,
        photo : 'BMW_i3.jpg',
        description : 'Get in and experience the future at your fingertips. The BMW i3 is full of innovative  ' +
        'technologies it can use to confidently master your day-to-day life. It connects you to the  ' +
        'outside world, updates you about whats going on, keeps you organised, and takes you  ' +
        'as far as you want to go. It is always ready for the road and to explore new avenues. With ' +
        'style and a trend-setting design for electrifying driving pleasure.',
        tagWords : ['BMW', 'i3', 'car', 'hatchback', '2 seater','euro', 'blue', 'europe','north america','19th century']

      },

      {
        id : 104,
        name : 'Harley Davidson Livewire 2019',
        color : 'orange',
        rent : 109,
        gas : 3.7,
        minDays : 1,
        maxDays : 5,
        minPeople : 1,
        maxPeople : 1,
        photo : '19_HD LiveWire_8.jpg',
        description : 'The Harley-Davidson LiveWire is an electric motorcycle by Harley-Davidson,  ' +
        'their first electric vehicle. Harley-Davidson says the maximum speed is 95 mph with claimed 105 hp motor.' +
        'The LiveWire, released in 2019, targets a different type of customer ' +
        ' than their classic V-twin powered motorcycles.',
        tagWords : ['Harley', 'davidson', 'motorcycle', 'livewire', 'orange','torque', '2 wheels', 'europe','north america','19th century']

      },


];
//
//
//
//
// // // // ==========================================================
// // // // Function call to display all items
// // // // ==========================================================
// $('input[type=checkbox]').prop('checked',false);
// allCats(); //displays all items on home page
//
// $('#refresh').click(function(){
//   cats.sort(function(a,b){
//    var itemA = a.id, itemB = b.id;
//    if (itemA < itemB){
//      return -1;
//    }
//    if (itemA > itemB){
//      return 1;
//    }
//    console.log(cats);
//  });
//  $('input[type=checkbox]').prop('checked',false);
//  allCats();//displays all items on home page
// });
// //   $('input[type=checkbox]').prop('checked',false);
// //   allCats();
// // });
// //
//
//
// // // ==========================================================
// // // Display items as per user's input - breed filter call
// // // ==========================================================
//
// $('#showChoice').click(function(){
//   var inputArray = [];
//
//   // read input of users and store
//   var persian = $('#persian:checked').val();
//   var ragDoll = $('#ragDoll:checked').val();
//   var maineCoon = $('#maineCoon:checked').val();
//   var siamese = $('#siamese:checked').val();
//
//   //push user's choice into an array
//   if (persian === 'checked') {
//         inputArray.push('Persian');
//         console.log(inputArray);
//   }
//
//   if (maineCoon === 'checked') {
//         inputArray.push('Maine Coon');
//         console.log(inputArray);
//   }
//
//   if (siamese === 'checked') {
//         inputArray.push('Siamese');
//         console.log(inputArray);
//   }
//
//    if (ragDoll === 'checked'){
//       inputArray.push('Rag Doll');
//       console.log(inputArray);
//   }
//
//   //call the function to filter user's choice
//   filteredCats(inputArray);
//
// });//showChoice click function
//
//
//
// // ==========================================================
// // Behaviour filter call
// // ==========================================================
//
// $('#showSelection').click(function(){
//   $('input[type=checkbox]').prop('checked',false);
//   var behaviour = $('#behaviour').val();
//   console.log(behaviour);
//   filteredBehaviour(behaviour);
// });
//
//
// // // ==========================================================
// // // Sort by selection
// // // ==========================================================
// // $('#sortBtn').change(function(){
// //   $('input[type=checkbox]').prop('checked',false);
// //   var sortType = ($('#sortBtn').val()).toLowerCase();
// //   console.log(sortType);
// //
// //   if ((sortType === 'name') || (sortType === 'color') ||(sortType === 'breed') || (sortType === 'behaviouraz')) {
// //    sortByAscending(sortType);//calling function
// //   }
// //
// //   if ((sortType === 'nameza') || (sortType === 'colorza') ||(sortType === 'breedza') || (sortType === 'behaviourza')) {
// //    sortByDescending(sortType);//calling function
// //   }
// //
// //
// //   recursive function
// //   cats.sort(function(a,b){
// //     // compare 2 consecutive objects' name property
// //     var itemA = a.name.toLowerCase(), itemB = b.name.toLowerCase();
// //     if (itemA < itemB){
// //       return -1; //false
// //     }
// //     if (itemA > itemB){
// //       return 1; //true
// //     }
// //
// //   });
// //   console.log(cats);
// //
// // }); //sortBtn.change()
// //
// // //function definition
// // function sortByAscending(dummySortType){
// //   console.log(dummySortType);
// //   cats.sort(function(a,b){
// //     // compare 2 consecutive objects' name property
// //
// //     switch (dummySortType){
// //       case 'name':
// //             console.log('name');
// //             var itemA = a.name.toLowerCase(), itemB = b.name.toLowerCase();
// //             break;
// //       case 'breed':
// //             console.log('breed');
// //             var itemA = a.breed.toLowerCase(), itemB = b.breed.toLowerCase();
// //             break;
// //       case 'color':
// //             console.log('color');
// //             var itemA = a.color.toLowerCase(), itemB = b.color.toLowerCase();
// //             break;
// //       case 'behaviouraz':
// //             console.log('behaviour');
// //             var itemA = a.behaviour.toLowerCase(), itemB = b.behaviour.toLowerCase();
// //             break;
// //       default :
// //             console.log('not matching');
// //     }//switch
// //
// //     if (itemA < itemB){
// //       return -1; //false
// //     }
// //     if (itemA > itemB){
// //       return 1; //true
// //     }
// //
// //   });//cats.sort()
// //       console.log(cats);
// //       allCats();
// //
// // }//sortBySelection
// //
// // //function definition
// // function sortByDescending(dummySortType){
// //   console.log(dummySortType);
// //   cats.sort(function(a,b){
// //     // compare 2 consecutive objects' name property
// //
// //     switch (dummySortType){
// //       case 'nameza':
// //             console.log('name');
// //             var itemA = a.name.toLowerCase(), itemB = b.name.toLowerCase();
// //             break;
// //       case 'breedza':
// //             console.log('breed');
// //             var itemA = a.breed.toLowerCase(), itemB = b.breed.toLowerCase();
// //             break;
// //       case 'colorza':
// //             console.log('color');
// //             var itemA = a.color.toLowerCase(), itemB = b.color.toLowerCase();
// //             break;
// //       case 'behaviourza':
// //             console.log('behaviour');
// //             var itemA = a.behaviour.toLowerCase(), itemB = b.behaviour.toLowerCase();
// //             break;
// //       default :
// //             console.log('not matching');
// //     }//switch
// //
// //     if (itemA > itemB){
// //       return -1; //false
// //     }
// //     if (itemA < itemB){
// //       return 1; //true
// //     }
// //
// //   });//cats.sort()
// //       console.log(cats);
// //       allCats();
// //
// // }//sortBySelection
// //
//
// //
// //
// // // ==========================================================
// // // Function to display all items
// // // ==========================================================
// //
// // function allCats(){
// //
// //   var i = 0;
// //   $('#result').text(' ');
// //   for (i = 0 ; i < cats.length; i++){
// //
// //     own style
// //     $('#result').append('<div class="row clearfix border border-danger m-2 p-2">' +
// //
// //                         '<div class="col-md-6">' +
// //                           '<h1>' + cats[i].name +   '</h1>' +
// //                           '<h2>' + cats[i].breed + '</h2>' +
// //                            '<h3>' + cats[i].color + '</h3>' +
// //                            '<h5>' + cats[i].behaviour + '</h5>' +
// //
// //                         '</div>' +
// //
// //                         '<div class="col-md-6">' +
// //                           '<img src="images/' + cats[i].photo + '" alt=" ' + cats[i].breed + '" class="img-thumbnail" > ' +
// //                         '</div>' +
// //
// //                         '</div>'
// //     ); //append ends here
// //
// //
// //     //bootstrap cards to $display
// //     displayCards(i);
// //     cardModal();
// //   } //end of for loop
// //   } //end of allCats function
// //
// //
//
// // // ==========================================================
// // // Modal
// // // ==========================================================
//
//   function cardModal(){
//
//     $('.moreDetails').click(function(){
//       $('#imageCat').text(' '); //clearing the content
//       console.log(this.id);
//       var breed = '';
//       var i=0;
//       for (i = 0; i < cats.length; i++) {
//         console.log(parseInt(this.id), cats[i].id);
//         if (parseInt(this.id) === cats[i].id) {
//           breed = cats[i].breed;
//           console.log(breed);
//           console.log(cats[i].id, cats[i].name, cats[i].breed);
//             $('#exampleModalLabel').text(cats[i].breed);
//             //append will keep  adding to existing content, so clear if you want
//             //or else use html to replace existing content
//             $('#imageCat').append('<img class="img-fluid" src="images/' + cats[i].photo + '" alt="' + cats[i].breed + '"/>');
//
//
//         } //end of if statement
//
//
//       }//end of for statement
//       console.log(breed);
//       catCarousel(breed);
//
//
//
//
//
//     }); // end of moreDetails click event
//
//   } //cardModal
//
//
//
// // // ==========================================================
// // // Carousel
// // // ==========================================================
//
//   function catCarousel(catBreed){
//     var breedArray = [];
//     $('#imageCat').text('');
//     for (i = 0; i < cats.length; i++) {
//
//       if (cats[i].breed === catBreed) {
//         breedArray.push(cats[i].photo);
//         // console.log(cats[i].description);
//         $('#imageCat').append('<p class="text-danger lead">' + cats[i].description + '<p>' );
//       } //end of if
//     } //end of for
//
//     console.log(breedArray);
//     $('#imageCat').append(
//       '  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' +
//       '  <ol class="carousel-indicators">' +
//       '    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>' +
//       '    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>' +
//       '    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>' +
//       '  </ol>' +
//       '  <div class="carousel-inner">' +
//       '    <div class="carousel-item active">' +
//       '      <img class="d-block w-100" src="images/' + breedArray[0] + '" alt="First slide">' +
//       '    </div>' +
//       '    <div class="carousel-item">' +
//       '      <img class="d-block w-100" src="images/' + breedArray[1] + '"alt="Second slide">' +
//       '    </div>' +
//       '    <div class="carousel-item">' +
//       '      <img class="d-block w-100" src="images/' + breedArray[2] + '" alt="Third slide">' +
//       '    </div>' +
//       '  </div>' +
//       '  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' +
//       '    <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
//       '    <span class="sr-only">Previous</span>' +
//       '  </a>' +
//       '  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">' +
//       '    <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
//       '    <span class="sr-only">Next</span>' +
//       '  </a>' +
//       '</div>'); //end of imageCat html
//
//   } //end of catCarousel
//
//
// //
// // // ==========================================================
// // // Filter by cat type
// // // ==========================================================
//
// function filteredCats(catBreed){
//   console.log(catBreed);
//   var i,j;
//   $('#result').text(' ');
//   for(i = 0 ; i < cats.length; i++) {
//     for (j = 0 ; j < catBreed.length; j++){
//       if (catBreed[j] === cats[i].breed) {
//         displayCards(i);
//         cardModal();
//       }//if
//     }//for j
//   }//for i
// }//filteredCats
//
//
// // // ==========================================================
// // // Filter by cat behaviour
// // // ==========================================================
//
// function filteredBehaviour(catBehaviour){
//   console.log(catBehaviour);
//   var i,j;
//   $('#result').text(' ');
//   for(i = 0 ; i < cats.length; i++) {
//     for (j = 0 ; j < catBehaviour.length; j++){
//       console.log(catBehaviour[j], cats[i].behaviour)
//       if (catBehaviour[j] === cats[i].behaviour) {
//         displayCards(i);
//         cardModal();
//
//       }//if
//
//     }//for j
//   }//for i
// }//filteredBehaviour
//
// // // ==========================================================
// // // Filter by word
// // // ==========================================================
// function filterByWord(word){
//   console.log(word);
//   var i,j;
//   $('#result').text('');
//   for (i = 0 ; i < cats.length; i++){
//     for (j = 0; j < cats[i].tagWords.length; j++){
//
//       if (word.toLowerCase() === cats[i].tagWords[j]){
//         displayCards(i);
//         cardModal();
//       }//if
//     }//for j
//   }//for i
// }//filterByWord
// //
// // // ==========================================================
// // // Display cards
// // // ==========================================================
//




// {
//   id : 103,
//   name : 'BMW',
//   color : 'blue',
//   rent : 129,
//   gas : 8.5,
//   minDays : 1,
//   maxDays : 10,
//   minPeople : 1,
//   maxPeople : 2,
//   photo : 'BMW_i3.jpg',
//   description : 'Get in and experience the future at your fingertips. The BMW i3 is full of innovative  ' +
//   'technologies it can use to confidently master your day-to-day life. It connects you to the  ' +
//   'outside world, updates you about whats going on, keeps you organised, and takes you  ' +
//   'as far as you want to go. It is always ready for the road and to explore new avenues. With ' +
//   'style and a trend-setting design for electrifying driving pleasure.',
//   tagWords : ['BMW', 'i3', 'car', 'hatchback', '2 seater','euro', 'blue', 'europe','north america','19th century']
//
// },





// //
function displayCards(j){
  //access properties of objects using index number
  $('#result').append( '<div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 text-center">' +
                          '<div class="card text-danger" >' +
                             '<img src="images/' + vehicles[j].photo + '" class="card-img-top" alt="' + vehicles[j].name + '">' +
                            //  '<div class="card-body">' +
                            //   '<h1 class="card-title">'+ cats[j].breed + '</h1>' +
                              '<p class="card-text text-dark">Name : ' + ' ' + '<span class="text-primary">' + vehicles[j].name + '</span> <br></p>' +
                               '<p class="card-text text-dark">Color : ' + ' ' + '<span class="text-primary">' + vehicles[j].color + '</span> <br></p>' +
                               '<p class="card-text text-dark">Price NZD $' + ' ' + '<span class="text-primary">' + vehicles[j].rent + '</span> <br></p>' +
                            //    '<p class="card-text text-dark">Behaviour : ' + ' ' + '<span class="text-primary">' + cats[j].behaviour + '</span> <br></p>' +
                            //
                            //   '<button id="' + cats[j].id + '" type="button" class="btn btn-primary moreDetails" data-toggle="modal" data-target="#exampleModal">More'+ " " + cats[j].breed + '</button>' +
                            // '</div>' +
                          '</div>' +
                      '</div>'
                  ); //append ends here


  }; //displayCards
// //
// //
// //
// // }); //document.ready()
//
//



function granttotal(d,r){

  var totalrent = r * d
  console.log(d);
  console.log(r);
  console.log(totalrent);
  
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("open");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
