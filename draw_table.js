var tableData;
for (var i = 0; i < data.report_data.length; i ++) {
  tableData += "<tr><td>"+data.report_data[i].pickup_first_name+" "+data.report_data[i].pickup_last_name+"</td>"+
  "<td>"+data.report_data[i].section+"</td>"+
  "<td>"+data.report_data[i].ticket_count+"</td>"+
  "<td>"+data.report_data[i].group_code+"</td>"+
  "<td><input type='button' value='View Tickets' id='ticket"+i+"'></input></td></tr>";

  $('#tableData').html(tableData);

  var ticketData;
   for (ticket in data.report_data[i].tickets) {
      ticketData += "<tr class='ticket"+i+" hidden'><td>"+data.report_data[i].tickets[ticket].event_name+"</td>"+
            "<td>"+data.report_data[i].tickets[ticket].title+"</td>"+
            "<td>"+data.report_data[i].tickets[ticket].status+"</td></tr>";

            $('.ticketData').html(ticketData);
        };
};

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

$(document).ready(function(){
  $('#ticketHead').hide();
  $('.ticketData').hide();
});


