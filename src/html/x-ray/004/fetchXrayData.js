// fetchXrayData.js

async function fetchXrayData()
{
    try
    {
        let xrayRes = await fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json');

        let xrayData = await xrayRes.json();
        
        return xrayData;
    }
    catch(error)
    {
        console.error(error);
    
        console.log("COMMUNICATION ERROR: Unable to contact NOAA satellites.");
    }
}

async function showXrayData()
{
    let result = await fetchXrayData();
    
    console.log(result);
}

// showXrayData();

//----//

/*

[
  {
    time_tag: '2026-02-18T14:32:00Z',
    satellite: 18,
    flux: 9.003696455067711e-9,
    observed_flux: 8.622438230077023e-8,
    electron_correction: 7.722068318116726e-8,
    electron_contaminaton: true,
    energy: '0.05-0.4nm'
  },
  {
    time_tag: '2026-02-18T14:32:00Z',
    satellite: 18,
    flux: 4.389029868434591e-7,
    observed_flux: 5.116717147757299e-7,
    electron_correction: 7.276873503769821e-8,
    electron_contaminaton: false,
    energy: '0.1-0.8nm'
  },
  ... (many more lines)
];

*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

