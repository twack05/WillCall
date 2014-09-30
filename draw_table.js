var setData = function() {
  // Set up the data for the Will Call Table
  var tableData;
  for (var i = 0, length = data.report_data.length; i < length; i ++) {
    var willCallData = data.report_data[i];
    // Change nulls to N/A for display
    if (data.report_data[i].group_code == null) {
      data.report_data[i].group_code = "N/A";
    }
    tableData += "<tr><td><img class='icon' src='person.png'/></td>"+
    "<td>"+willCallData.pickup_first_name+" "+willCallData.pickup_last_name+"</td>"+
    "<td>"+willCallData.section+"</td>"+
    "<td>"+willCallData.ticket_count+"</td>"+
    "<td>"+willCallData.group_code+"</td>"+
    "<td><input type='button' class='btn' value='View Tickets' id='ticket"+i+"'></input></td></tr>";

    $('#tableData').html(tableData);

  // Set up the data for the Tickets table
    var ticketData;
    var tickets = willCallData.tickets;
     for (ticket in tickets) {
        ticketData += "<tr class='ticket"+i+" hidden'><td><img class='ticket' src='ticket.jpg'/></td>"+
              "<td>"+tickets[ticket].id+"</td>"+
              "<td>"+tickets[ticket].event_name+"</td>"+
              "<td>"+tickets[ticket].showtime_id+"</td>"+
              "<td>"+tickets[ticket].title+"</td>"+
              "<td id='status'>"+tickets[ticket].status+"</td>"+
              "<td><input type='button' value='Check In' class='check-in btn' id='"+i+","+tickets[ticket].id+"'></input></td></tr>";

        $('.ticketData').html(ticketData);

    };
  };
};

// Set up the jquery for the individual View Ticket buttons
var setJquery = function() {
    for (var i = 0, length = data.report_data.length; i < length; i ++) {
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

    var params = this.id.split(',');
    for (var i = 0, length = data.report_data[params[0]].tickets.length; i < length; i++)
    // Match the current ticket with its ticket id and change status to seated
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


