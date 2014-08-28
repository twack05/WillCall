var setData = function() {
  // Set up the data for the Will Call Table
  var tableData;
  for (var i = 0; i < data.report_data.length; i ++) {
    // Change nulls to N/A for display
    if (data.report_data[i].group_code == null) {
      data.report_data[i].group_code = "N/A";
    }
    tableData += "<tr><td><img class='icon' src='person.png'/></td>"+
    "<td>"+data.report_data[i].pickup_first_name+" "+data.report_data[i].pickup_last_name+"</td>"+
    "<td>"+data.report_data[i].section+"</td>"+
    "<td>"+data.report_data[i].ticket_count+"</td>"+
    "<td>"+data.report_data[i].group_code+"</td>"+
    "<td><input type='button' class='btn' value='View Tickets' id='ticket"+i+"'></input></td></tr>";

    $('#tableData').html(tableData);

  // Set up the data for the Tickets table
    var ticketData;
     for (ticket in data.report_data[i].tickets) {
        ticketData += "<tr class='ticket"+i+" hidden'><td><img class='ticket' src='ticket.jpg'/></td>"+
              "<td>"+data.report_data[i].tickets[ticket].id+"</td>"+
              "<td>"+data.report_data[i].tickets[ticket].event_name+"</td>"+
              "<td>"+data.report_data[i].tickets[ticket].showtime_id+"</td>"+
              "<td>"+data.report_data[i].tickets[ticket].title+"</td>"+
              "<td id='status'>"+data.report_data[i].tickets[ticket].status+"</td>"+
              "<td><input type='button' value='Check In' class='check-in btn' id='"+i+","+data.report_data[i].tickets[ticket].id+"'></input></td></tr>";

        $('.ticketData').html(ticketData);

    };
  };
};

// Set up the jquery for the individual View Ticket buttons
var setJquery = function() {
    for (var i = 0; i < data.report_data.length; i ++) {
        $(".ticket"+i+"").hide();
          $("#ticket"+i+"").on('click', function(e){
            e.preventDefault();
            $('.ticketData').show();
            $(".hidden").hide();
            $('#ticketHead').show();
            $("."+this.id+"").show();

          });
    };
};

var setCheckIn = function(){
  $('.check-in').on('click', function(e){
    e.preventDefault();
    // In reality, this would be an AJAX call to patch the updated data to the API and re-render the view.
    // Something like $.ajax(
    //  type: "PATCH",
    //  url: "/tickets/:id",
    //  success: function () {
    //    re-render view
    //  }
    //  )
    // This could also be done with Backbone, by setting an event listener on the model - when the model
    // is updated, the view could automatically be re-rendered.
    var params = this.id.split(',');
    for (var i = 0; i < data.report_data[params[0]].tickets.length; i++)
    if (data.report_data[params[0]].tickets[i].id == params[1]) {
      data.report_data[params[0]].tickets[i].status = "seated";
    }
    // Update chart and table with new information
    drawChart();
    // Keep chart the same size
    $('#pieChart').attr("width", "600");
    $('#pieChart').attr("height", "600");
    $('#pieChart').css("height", "300px");
    $('#pieChart').css("width", "300px");
    // Update seat status
    $(this).closest('tr').children('#status').text('seated');
    $(this).parent().text("Enjoy the show!");
  });
};

$(document).ready(function(){
  setData();
  setJquery();
  setCheckIn();
  $('#ticketHead').hide();
  $('.ticketData').hide();
});


