// fetchXrayData.js

async function fetchXrayData()
{
    try
    {
        // X-RAY FLUX (Flares)
        // Source: GOES Satellite (Primary)
        let xrayRes = await fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json');

        // This returns an ARRAY of objects. 
        // Example: [{time_tag: "2024...", flux: 1.2e-6}, ...]
        let xrayData = await xrayRes.json();
        
        return xrayData;
    }
    catch (error)
    {
        console.error(error);
        console.log("COMMUNICATION ERROR: Unable to contact NOAA satellites.");
        return []; // Return empty array so code doesn't crash
    }
}

function getFlareClass(flux)
{
    // Scientific notation conversion for display
    if (flux < 1e-7)
    {
        return "A-Class (Quiet)";
    }
    
    if (flux < 1e-6)
    {
        return "B-Class (Normal)";
    }
    
    if (flux < 1e-5)
    {
        return "C-Class (Active)";
    }
    
    if (flux < 1e-4)
    {
        return "M-Class (FLARE!)";
    }

    return "X-CLASS (MAJOR EVENT)";
}

async function runSolarApp()
{
    // get the raw list
    let theData = await fetchXrayData();
    
    // safety check: Did we get data?
    if (theData.length > 0)
    {
        // get the very last item in the array (Latest Data)
        let latestReading = theData[theData.length - 1];

        // extract the 'flux' number
        let currentFlux = latestReading.flux;

        // run it through our classifier
        let status = getFlareClass(currentFlux);

        console.log("-----------------------------");
        console.log("SPACE WEATHER COMMAND");
        
        console.log("Time: " + latestReading.time_tag);
        
        console.log("Current Flux: " + currentFlux);
        
        console.log("Status: " + status);
        
        console.log("-----------------------------");
    }
    else
    {
        console.log("No data received.");
    }
}

//runSolarApp();

//----//

/*

-----------------------------
SPACE WEATHER COMMAND
Time: 2026-02-18T20:48:00Z
Current Flux: 0.000002007629518629983
Status: C-Class (Active)
-----------------------------

*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

