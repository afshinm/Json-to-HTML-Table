/**
 * JavaScript format string function
 * 
 */

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : '{' + number + '}'
    ;
  });
};

/**
 * Convert json to html table
 * 
 * @author Afshin Mehrabani <afshin dot meh at gmail dot com>
 * 
 * @param jsonData string Json data
 * @param keys array Keys for table header
 * @param containerId string Table id 
 * @param tableClassName string Table css class name
 * 
 * @return string Converted json to html table
 */
function ConvertJsonToTable(jsonData, keys, containerId, tableClassName) {
    //Patterns for table thead & tbody
    var tbl = "<table border='1' cellpadding='1' cellspacing='1' id='" + containerId + "' class='" + tableClassName + "'>{0}{1}</table>";
    var th = "<thead>{0}</thead>";
    var tb = "<tbody>{0}</tbody>";
    var tr = "<tr>{0}</tr>";
    var thRow = "<th>{0}</th>";
    var tdRow = "<td>{0}</td>";
    var thCon = "";
    var tbCon = "";
    var trCon = "";

    if (keys && jsonData) {

        //Creating all table headers
        for (i = 0; i < keys.length; i++) {
            thCon += thRow.format(eval(keys[i]));
        }
        th = th.format(tr.format(thCon));

        //Creating all table rows from Json data
        if (typeof(jsonData[0]) == "object") {
            for (i = 0; i < jsonData.length; i++) {
                for (j = 0; j < keys.length; j++) {
                    tbCon += tdRow.format(jsonData[i][keys[j]]);
                }
                trCon += tr.format(tbCon);
                tbCon = "";
            }
        }
        tb = tb.format(trCon);

        tbl = tbl.format(th, tb);
        return tbl;
    }

    return null;
}
