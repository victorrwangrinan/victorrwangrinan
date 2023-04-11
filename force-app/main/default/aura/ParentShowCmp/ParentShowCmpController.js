({
    init:function(component, event, helper){
        var datalist = [
            { id: 1, name: 'Billy Simonns', age: 40, email: 'billy@salesforce.com' },
            { id: 2, name: 'Kelsey Denesik', age: 35, email: 'kelsey@salesforce.com' },
            { id: 3, name: 'Kyle Ruecker', age: 50, email: 'kyle@salesforce.com' },
            {
                id: 4,
                name: 'Krystina Kerluke',
                age: 37,
                email: 'krystina@salesforce.com',
            },
        ];
        var columns = [
            { label: 'Name', fieldName: 'name' },
            {
                label: 'Age',
                fieldName: 'age',
                type: 'number',
                sortable: true,
                cellAttributes: { alignment: 'left' },
            },
            { label: 'Email', fieldName: 'email', type: 'email' },
        ];

    	component.set('v.tabledata',datalist);
        component.set('v.columns',columns);

        console.log('--->'+component.get("v.tabledata"));
    },
    
    download: function (component) { 
        var htmlStr='<!DOCTYPE html>'+
                    '<html>'+
                    '<head>'+
                    '<meta charset="utf-8">'+
                    '<meta name="DC.description" content="Document HTML example to convert in DOCX">'+
                    '<meta name="author" content="Amal Amrani, amal.amrani@gmail.com">	'+
                    '</head>'+
                    '<body>'+
                    '<h1>Convert HTML to DOCX </h1>'+
                    '</body>'+
            '</html>';
        
            var converted = new Blob([htmlStr], {
                type: "application/octet-stream"
            });
    
            window.saveAs(converted, 'test.doc');
    },

    afterScriptsLoaded: function (component) { 
        var htmlStr='<!DOCTYPE html>'+
                    '<html>'+
                    '<head>'+
                    '<meta charset="utf-8">'+
                    '<meta name="DC.description" content="Document HTML example to convert in DOCX">'+
                    '<meta name="author" content="Amal Amrani, amal.amrani@gmail.com">	'+
                    '</head>'+
                    '<body>'+
                    '<h1>Convert HTML to DOCX </h1>'+
                    '</body>'+
                    '</html>';
                    var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
                    //window.saveAs(blob, "hello world.txt");
    }
})