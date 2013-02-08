/**
 * JavaScript format string function
 */
String.prototype.format = function () {
    "use strict";
    var args = arguments;

    return this.replace(/\{(\d+)\}/g, function (match, number) {
        return args[number] !== undefined ? args[number] :
                                          '{' + number + '}';
    });
};

// from: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
    Object.keys = (function () {
        "use strict";
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            var result = [],
                prop,
                i;

            if ((typeof obj !== 'object' && typeof obj !== 'function') || obj === null) {
                throw new TypeError('Object.keys called on non-object');
            }

            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i += 1) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}

/**
 * Convert a Javascript Oject array or String array to an HTML table
 * JSON parsing has to be made before function call
 * It allows use of other JSON parsing methods like jQuery.parseJSON
 * http(s)://, ftp://, file:// and javascript:; links are automatically computed
 *
 * JSON data samples that should be parsed and then can be converted to an HTML table
 *     var objectArray = '[{"Total":"34","Version":"1.0.4","Office":"New York"},{"Total":"67","Version":"1.1.0","Office":"Paris"}]';
 *     var stringArray = '["New York","Berlin","Paris","Marrakech","Moscow"]';
 *     var nestedTable = '[{ key1: "val1", key2: "val2", key3: { tableId: "tblIdNested1", tableClassName: "clsNested", linkText: "Download", data: [{ subkey1: "subval1", subkey2: "subval2", subkey3: "subval3" }] } }]'; 
 *
 * Code sample to create a HTML table Javascript String
 *     var jsonHtmlTable = ConvertJsonToTable(eval(dataString), 'jsonTable', null, 'Download');
 *
 * Code sample explaned
 *  - eval is used to parse a JSON dataString
 *  - table HTML id attribute will be 'jsonTable'
 *  - table HTML class attribute will not be added
 *  - 'Download' text will be displayed instead of the link itself
 *
 * @author Afshin Mehrabani <afshin dot meh at gmail dot com>
 * 
 * @param parsedJson object Parsed JSON data
 * @param tableId string Optional table id 
 * @param tableClassName string Optional table css class name
 * @param linkText string Optional text replacement for link pattern
 * 
 * @return string Converted JSON to HTML table
 */
function ConvertJsonToTable(parsedJson, tableId, tableClassName, linkText) {
    "use strict";
    if (parsedJson) {
        var
            // Patterns for links and NULL value
            italic = '<i>{0}</i>',
            link = linkText ? '<a href="{0}">' + linkText + '</a>' :
                              '<a href="{0}">{0}</a>',

            // Pattern for table
            idMarkup = tableId ? ' id="' + tableId + '"' :
                                     '',

            classMarkup = tableClassName ? ' class="' + tableClassName + '"' :
                                           '',

            tbl = '<table border="1" cellpadding="1" cellspacing="1"' + idMarkup + classMarkup + '>{0}{1}</table>',

            //Patterns for table content
            th = '<thead>{0}</thead>',
            tb = '<tbody>{0}</tbody>',
            tr = '<tr>{0}</tr>',
            thRow = '<th>{0}</th>',
            tdRow = '<td>{0}</td>',
            thCon = '',
            tbCon = '',
            trCon = '',

            isStringArray = typeof (parsedJson[0]) === 'string' || parsedJson[0] instanceof String,
            headers,
            urlRegExp = new RegExp(/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig),
            javascriptRegExp = new RegExp(/(^javascript:[\s\S]*;$)/ig),
            i, j, value, isUrl; // we don't wanna use global variables

        // Create table headers from JSON data
        // If JSON data is a simple string array we create a single table header
        if (isStringArray) {
            thCon += thRow.format('value');
        } else {
            // If JSON data is an object array, headers are automatically computed
            // XXX: what about string objects (new String("foo"))?
            if (typeof (parsedJson[0]) === 'object') {
                headers = Object.keys(parsedJson[0]);

                for (i = 0; i < headers.length; i += 1) {
                    thCon += thRow.format(headers[i]);
                }
            }
        }
        th = th.format(tr.format(thCon));

        // Create table rows from Json data
        if (isStringArray) {
            for (i = 0; i < parsedJson.length; i += 1) {
                tbCon += tdRow.format(parsedJson[i]);
                trCon += tr.format(tbCon);
                tbCon = '';
            }
        } else {
            if (headers) {
                for (i = 0; i < parsedJson.length; i += 1) {
                    for (j = 0; j < headers.length; j += 1) {
                        value = parsedJson[i][headers[j]];
                        isUrl = urlRegExp.test(value) || javascriptRegExp.test(value);

                        if (isUrl) { // If value is URL we auto-create a link
                            tbCon += tdRow.format(link.format(value));
                        } else {
                            if (value) {
                                if (typeof (value) === 'object') {
                                    //for supporting nested tables
                                    tbCon += tdRow.format(ConvertJsonToTable.call({}, value.data, value.tableId, value.tableClassName, value.linkText));
                                } else {
                                    tbCon += tdRow.format(value);
                                }
                            } else { // If value == null we format it like PhpMyAdmin NULL values
                                tbCon += tdRow.format(italic.format(value).toUpperCase());
                            }
                        }
                    }
                    trCon += tr.format(tbCon);
                    tbCon = '';
                }
            }
        }
        tb = tb.format(trCon);
        tbl = tbl.format(th, tb);

        return tbl;
    }
    return null;
}
