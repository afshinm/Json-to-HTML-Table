/**
 * JavaScript format string function
 * 
 */
String.prototype.format = function()
{
  var args = arguments;

  return this.replace(/{(\d+)}/g, function(match, number)
  {
    return typeof args[number] != 'undefined' ? args[number] :
                                                '{' + number + '}';
  });
};


/**
 * Convert json to html table
 * 
 * @author Afshin Mehrabani <afshin dot meh at gmail dot com>
 * 
 * @param parsedJson object Json parsed data
 * @param containerId string Table id 
 * @param tableClassName string Table css class name
 * 
 * @return string Converted json to html table
 */
function ConvertJsonToTable(parsedJson, containerId, tableClassName)
{
    //Patterns for table thead & tbody
    var tbl = '<table border="1" cellpadding="1" cellspacing="1" id="' + containerId + '" class="' + tableClassName + '">{0}{1}</table>';
    var th = '<thead>{0}</thead>';
    var tb = '<tbody>{0}</tbody>';
    var tr = '<tr>{0}</tr>';
    var link = '<a href="{0}">{0}</a>';
    var italic = '<i>{0}</i>';
    var thRow = '<th>{0}</th>';
    var tdRow = '<td>{0}</td>';
    var thCon = '';
    var tbCon = '';
    var trCon = '';

    if (parsedJson)
    {
        var isStringArray = typeof(parsedJson[0]) == 'string';
        var headers;

        // Create table headers from Json data
        if(isStringArray) // If data is a simple string array we create a single table header
        {
            thCon += thRow.format('value');
        }
        else
        {
            headers = array_keys(parsedJson[0]);    // headers are automatically calcuted 

            for (i = 0; i < headers.length; i++)
            {
                thCon += thRow.format(headers[i]);
            }
        }
        th = th.format(tr.format(thCon));
        
        // Create table rows from Json data
        if(isStringArray)
        {
            for (i = 0; i < parsedJson.length; i++)
            {
                tbCon += tdRow.format(parsedJson[i]);
                trCon += tr.format(tbCon);
                tbCon = '';
            }
        }
        else
        {
            var regExp = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);

            for (i = 0; i < parsedJson.length; i++)
            {
                for (j = 0; j < headers.length; j++)
                {
                    var value = parsedJson[i][headers[j]];
                    var isUrl = regExp.test(value);

                    if(isUrl)   // If value is URL we auto-create a link
                        tbCon += tdRow.format(link.format(value));
                    else
                    {
                        if(value)
                            tbCon += tdRow.format(value);
                        else    // If value == null we format it like PhpMyAdmin NULL values
                            tbCon += tdRow.format(italic.format(value).toUpperCase());
                    }
                }
                trCon += tr.format(tbCon);
                tbCon = '';
            }
        }
        tb = tb.format(trCon);

        tbl = tbl.format(th, tb);
        return tbl;
    }

    return null;
}

/**
 * Return just the keys from the input array, optionally only for the specified search_value
 * version: 1109.2015
 *  discuss at: http://phpjs.org/functions/array_keys
 *  +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 *  +      input by: Brett Zamir (http://brett-zamir.me)
 *  +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 *  +   improved by: jd
 *  +   improved by: Brett Zamir (http://brett-zamir.me)
 *  +   input by: P
 *  +   bugfixed by: Brett Zamir (http://brett-zamir.me)
 *  *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
 *  *     returns 1: {0: 'firstname', 1: 'surname'}
 */
function array_keys(input, search_value, argStrict)
{
    var search = typeof search_value !== 'undefined', tmp_arr = [], strict = !!argStrict, include = true, key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.keys(search_value, argStrict);
    }
 
    for (key in input)
    {
        if (input.hasOwnProperty(key))
        {
            include = true;
            if (search)
            {
                if (strict && input[key] !== search_value)
                    include = false;
                else if (input[key] != search_value)
                    include = false;
            } 
            if (include)
                tmp_arr[tmp_arr.length] = key;
        }
    }
    return tmp_arr;
}