JSON to HTML Table
==================

This is a simple script to convert JSON data to standard HTML table in the simplest and fastest way.

##How to use?
There's only one function in this library and accept four parameter that only the first one is required.

    function ConvertJsonToTable(parsedJson, tableId, tableClassName, linkText)

Simply call `ConvertJsonToTable` method and fill the `parsedJson` parameter.  

##Example

This is an example of using this library:  

    //Example data, Object 
    var objectArray = [{
        "Total": "34",
        "Version": "1.0.4",
        "Office": "New York"
    }, {
        "Total": "67",
        "Version": "1.1.0",
        "Office": "Paris"
    }];
    
    //Example data, Array
    var stringArray = ["New York", "Berlin", "Paris", "Marrakech", "Moscow"];
    
    //Example data, nested Object. This data will create nested table also.
    var nestedTable = [{
        key1: "val1",
        key2: "val2",
        key3: {
            tableId: "tblIdNested1",
            tableClassName: "clsNested",
            linkText: "Download",
            data: [{
                subkey1: "subval1",
                subkey2: "subval2",
                subkey3: "subval3"
            }]
        }
    }];
    
Code sample to create a HTML table from JSON:
    
    //Only first parameter is required
    var jsonHtmlTable = ConvertJsonToTable(objectArray, 'jsonTable', null, 'Download');
