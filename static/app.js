// Create metadata function for 
function metadata(table) {
    d3.json("../samples.json").then((data) => {
        var metadata = data.metadata;
        var demographic = metadata.filter(value => value.id == table);
        var variableResult = demographic[0];
        var PANEL = d3.select("#sample-metadata");
        //console.log(metadata)
        PANEL.html("");
        Object.entries(variableResult).forEach(([key, value])=> {
        // PANEL.append("h6").text(key, value);
        PANEL.append("h6").text(`${key}:${value}`);
        });
    });
}


// Fetch new data each time a new sample is selected
function optionChanged(newSample) {
    metadata(newSample)
}

// Read data.json
d3.json("../samples.json").then((data) => {

    // Create Data 
    var data = data.samples;

    // Verify Data 
    console.log(data)

    // Sort Data 
    var data =  data.sort(function(a, b){
        return b.sample_values - a.sample_values
    });

    // Create Data Variables
    var samp = data[0].sample_values.slice(0,10)
    var samp1 =  data[0].otu_ids.slice(0,10)

    // Create Data Lables
    lables = samp1.slice(0, 10).map(otu => `OTU ${otu}`).reverse();

    console.log(lables)
    // Create Initial Bar Chart data
    var data1 = [
    {
        type: "bar",
        x: samp,
        y: lables,
        orientation:'h',
        marker: {
            color: 'rgba(255,153,51,0.6)',
            width: 100
        }
        
    }];

    // Create Initial Layout
    var layout = {
        font:{
            family: 'Raleway, sans-serif'
        },
        yaxis: {
        categoryPercentage: 1.0,
        barPercentage: 1.0
    },
        width: 1000,
        height: 500,  
    };
    // Create Initial Bar Chart
    Plotly.newPlot('bar', data1, layout);
})

// Read data.json
d3.json("../samples.json").then((data) => {

    // Create Data Variable
    var data = data.samples;

    // Verify Data
    console.log(data)
    
    // Sort bubble Chart Data
    var data =  data.sort(function(a, b){
        return b.sample_values - a.sample_values
    });

    // Create Data Bubble Chart Data
    var data2 = [
    {
        type: "bubble", 
        mode: "markers",
        x: data[0].otu_ids,
        y: data[0].sample_values,
        marker: {
            size:data[0].sample_values,
            color:data[0].otu_ids
        }
    }
    ];

    // Create Initial Bubble Chart
    Plotly.newPlot('bubble', data2);
})


// Create init Function
function init() {

    // Reference to dropdown select element 
    var selector = d3.select('#selDataset');

    // Read in file
    d3.json("../samples.json").then(function(data) {

        // Display data in console
        console.log(data.names);

        // Create variables for data
        var names = data.names

        // Update Table
        names.forEach((table) => {
            selector
            .append("option")
            .text(table)
            .property("value", table);
    });

    // Create Intial Sample
    var initial_sample = names[0];
    
    // Set Intital sample
    metadata(initial_sample)

    
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", getData);

    // This function is called when a dropdown menu item is selected
    function getData() {

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    // Initialize x and y arrays
    var x = [];
    var y = [];

        // Create response to Drop Down Selection 
        for (i = 0; i < dataset.length; i++) {
            var entry = dataset[i];
            var samp = data.samples;
            var samp1 = samp[entry].sample_values.slice(0,10);
            var samp2 = samp[entry].otu_ids.map(otu => `OTU ${otu}`).slice(0,10).reverse();
                x = samp1
                y = samp2

                // Verify Sample
                console.log(samp1, samp2)

                // Restyle Bar Chart
                Plotly.restyle("bar", "x",[x]);
                Plotly.restyle("bar", "y",[y]);
        
        
        };
        // Create response to Drop Down Selection 
        for (j = 0; j < dataset.length; j++) {
            var entry = dataset[j];
            var samp = data.samples
            var samp11 = samp[entry].sample_values
            var samp22 = samp[entry].otu_ids
                x = samp11
                y = samp22

                // Verify Sample
                console.log(samp11, samp22)

                // Restyle Bubble Chart
                Plotly.restyle("bubble", "x",[x]);
                Plotly.restyle("bubble", "y",[y]);
        };
        
    }

// Call Data Change
getData(data)

});

}

// Initialize init Function
init();
