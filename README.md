## Annoucement: We have developed a full-featured table library that supports JSON input as well. Please use [Grid.js](https://gridjs.io) instead.

JSON to HTML Table
==================

This is a simple script to convert JSON data to standard HTML table in the simplest and fastest way.

## How to use
There's only one function in this library and accept four parameter that only the first one is required.
    
```javascript
    function ConvertJsonToTable(parsedJson, tableId, tableClassName, linkText)
```
    
Simply call `ConvertJsonToTable` method and fill the `parsedJson` parameter.  

## Example

This is an example of using this library:  

```javascript
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
```

Code sample to create a HTML table from JSON:

```javascript
    //Only first parameter is required
    var jsonHtmlTable = ConvertJsonToTable(objectArray, 'jsonTable', null, 'Download');
```

Code sample explaned:
 - First parameter is JSON data
 - table HTML id attribute will be **jsonTable**
 - table HTML class attribute will not be added
 - **Download** text will be displayed instead of the link itself

## Contributors
[Afshin Mehrabani](https://github.com/afshinm) (@afshinmeh)  
[Sgissinger](https://github.com/sgissinger) 

## Contributing

This is a open-source project. Fork the project, complete the code and send pull request.

## License

    Copyright (C) 2012 Afshin Mehrabani (afshin.meh@gmail.com)
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
    documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
    and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions 
    of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
    CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
    IN THE SOFTWARE.

