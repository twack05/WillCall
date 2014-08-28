var setData = function() {
  // Set up the data for the Will Call Table
  var tableData;
  for (var i = 0; i < data.report_data.length; i ++) {
    tableData += "<tr><td>"+data.report_data[i].pickup_first_name+" "+data.report_data[i].pickup_last_name+"</td>"+
    "<td>"+data.report_data[i].section+"</td>"+
    "<td>"+data.report_data[i].ticket_count+"</td>"+
    "<td>"+data.report_data[i].group_code+"</td>"+
    "<td><input type='button' value='View Tickets' id='ticket"+i+"'></input></td></tr>";

    $('#tableData').html(tableData);

  // Set up the data for the Tickets table
    var ticketData;
     for (ticket in data.report_data[i].tickets) {
        ticketData += "<tr class='ticket"+i+" hidden'><td>"+data.report_data[i].tickets[ticket].id+"</td>"+
              "<td>"+data.report_data[i].tickets[ticket].event_name+"</td>"+
              "<td>"+data.report_data[i].tickets[ticket].showtime_id+"</td>"+
              "<td>"+data.report_data[i].tickets[ticket].title+"</td>"+
              "<td id='status'>"+data.report_data[i].tickets[ticket].status+"</td>"+
              "<td><input type='button' value='Check In' class='check-in' id='"+i+","+data.report_data[i].tickets[ticket].id+"'></input></td></tr>";

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
    var params = this.id.split(',');
    for (var i = 0; i < data.report_data[params[0]].tickets.length; i++)
    if (data.report_data[params[0]].tickets[i].id == params[1]) {
      data.report_data[params[0]].tickets[i].status = "seated";
    }
    // Update chart and table with new information
    drawChart();
    $('#myChart').css("height", "300px");
    $('#myChart').css("width", "300px");
    $(this).closest('tr').children('#status').text('seated');
  });
};

$(document).ready(function(){
  setData();
  setJquery();
  setCheckIn();
  $('#ticketHead').hide();
  $('.ticketData').hide();
});


