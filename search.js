$('#search').keyup(function() {
    searchTable($(this).val());
});

function searchTable(inputVal) {
  var table = $('#myTable');
  table.find('tr').each(function(index, row)
  {
    var allCells = $(row).find('td');
    if(allCells.length > 0) {
      var found = false;

      allCells.each(function(index, td) {
        var regExp = new RegExp(inputVal, 'i');

        if(regExp.test($(td).text())) {
          found = true;
          return false;
        }
      });
    found == true? $(row).show() : $(row).hide();
    }
  });
}
