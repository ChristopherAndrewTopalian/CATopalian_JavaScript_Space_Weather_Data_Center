// fetchXrayData.js

// THE DATA FETCHER (The Worker)
// gets the data and brings it back
async function fetchXrayData()
{
    try
    {
        let response = await fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json');
        
        // if the internet is down or NOAA is broken, throw error
        if (!response.ok)
        {
            throw new Error("NOAA Connection Failed");
        }

        let data = await response.json();
        
        // return the whole array so the main app can use it
        return data; 
    } 
    catch (error)
    {
        console.error("Fetch Error:", error);
        return null; // return null so we know it failed
    }
}

// THE MATH HELPER (The Calculator) 
function formatFlareRating(flux)
{
    if (flux <= 0)
    {
        return "---";
    }

    if (flux >= 1e-4)
    {
        return "X" + (flux / 1e-4).toFixed(2); // show 2 decimals for precision
    }

    if (flux >= 1e-5)
    {
        return "M" + (flux / 1e-5).toFixed(1);
    }

    if (flux >= 1e-6)
    {
        return "C" + (flux / 1e-6).toFixed(1);
    }

    if (flux >= 1e-7)
    {
        return "B" + (flux / 1e-7).toFixed(1);
    }

    return "A" + (flux / 1e-8).toFixed(1);
}

// THE COLOR HELPER (The Artist)
function getFlareColor(flux)
{
    if (flux >= 1e-4)
    {
        // X-Class (Danger)
        return "red";
    }
    
    if (flux >= 1e-5)
    {
        // M-Class (Warning)
        return "orange";
    }
    
    if (flux >= 1e-6)
    {
        // C-Class (Active)
        return "yellow";
    }
    
    // B/A-Class (Quiet)
    return "lime";
}

// THE MAIN APP (The Control Center)
async function runSolarApp()
{
    // get the data
    let xrayData = await fetchXrayData();

    // check if we actually got it
    if (!xrayData)
    {
        console.log("System Offline");
        return;
    }

    // process the NEWEST reading (Last item in array)
    let latestReading = xrayData[xrayData.length - 1];

    let currentFlux = latestReading.flux;

    // calculate the Stats
    let ratingString = formatFlareRating(currentFlux); // e.g., "M1.4"
    
    let colorCode = getFlareColor(currentFlux); // e.g., "orange"

    console.log("Current Status:", ratingString);
    
    console.log("System Color:", colorCode);
}

// start the engine
// runSolarApp();

//----//

/*

// example 1
Current Status: C1.4
System Color: yellow

// example 2
Current Status: B5.6
System Color: lime

*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

