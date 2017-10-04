```json
{
    "site": {
        // This will be the name of the Top directory for scraper
        "name": "DOWBenefits",
        "scraper": {
            // Every `url` to fetch for hosting, and what `filename` to save it under
            "urls": [
                    {
                    "url": "https://dowbenefits.ehr.com/ESS/home/Login.aspx",
                    "filename": "Login.aspx"
                    },
                    {
                    "url": "https://dowbenefits.ehr.com/ESS/Client/Home/DowChemSetPassword.aspx",
                    "filename": "DowChemSetPassword.aspx"
                    }
             ]

        },
        // Hosting server section
        "server": {
            "listen-host": "0.0.0.0",
            "listen-port": 8000,
             // you can have a custom JS shim (.jsm) for every hosted scraped page
            "shims": [
                          { 
                              "filename": "Login.aspx", 
                              "shim": "Login.jsm" 
                          },
                          {  
                              "filename": "DowChemSetPassword.aspx",
                              "shim": "DowChemSetPassword.jsm"
                          }
            ],
            // Relative links on pages that are not fully qualified by a http(s)://<host>[:port]/
            // will be prepended by this remap, and fetched from the host
            "remap-host": "https://dowbenefits.ehr.com/ESS"
        }
    }
}
```
