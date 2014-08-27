var tableData;
for (var i = 0; i < data.report_data.length; i ++) {
  tableData += "<tr><td>"+data.report_data[i].pickup_first_name+" "+data.report_data[i].pickup_last_name+"</td>"+
  "<td>"+data.report_data[i].section+"</td>"+
  "<td>"+data.report_data[i].ticket_count+"</td>"+
  "<td>"+data.report_data[i].group_code+"</td></tr>";
};

$('#tableData').html(tableData);
