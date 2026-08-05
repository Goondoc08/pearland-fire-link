/* ============================================================
   PEARLAND FIRE LINK — LINK DATA
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD/FIX A LINK.
   No HTML or CSS knowledge required.

   To add a link, copy an existing block and change the values:

     { name: "Display Name",
       desc: "Short line under the name",
       url:  "https://example.com" },

   Optional flags you can add to any link:
     offsite: true  -> shows an "Off City WiFi" badge (won't load on the station network)
     app:  true     -> shows an "App" badge (native app, not a website)
     ios:  "url"    -> alternate URL used on iPhone/iPad
     android: "url" -> alternate URL used on Android
     scheme: "x://" -> tries to open an installed app first, then falls back to url

   After editing: save, commit, push. That's it.
   ============================================================ */

const LAST_UPDATED = "2026-08-04";   // bump when you do a review pass

const LINKS = [
  {
    category: "Response & Patient Care",
    accent: "224,54,44",
    icon: "siren",
    items: [
      {
        name: "EMS Protocols",
        desc: "Pearland FD protocols (AcidRemap)",
        url: "https://www.acidremap.com/customAppDownload.php?bundleID=PPPPearlandFD&platform=iOS",
        ios: "https://www.acidremap.com/customAppDownload.php?bundleID=PPPPearlandFD&platform=iOS",
        android: "https://www.acidremap.com/customAppDownload.php?bundleID=PPPPearlandFD&platform=android",
        pinned: true
      },
      {
        name: "Handtevy",
        desc: "Pediatric dosing — opens installed app",
        url: "https://handtevy.com/",
        scheme: "handtevy://",
        ios: "https://apps.apple.com/us/app/handtevy-mobile/id924905076",
        android: "https://play.google.com/store/apps/details?id=com.handtevy.handtevymobile",
        app: true,
        pinned: true
      },
      {
        // NOTE: "pulsara://" is a guess — unlike Handtevy, Pulsara's URL
        // scheme isn't publicly documented. The fallback means a wrong guess
        // still lands on the web login, but if an iPhone throws an "address
        // is invalid" alert, just delete the scheme line below.
        name: "Pulsara",
        desc: "Patient communication / alerts",
        url: "https://us-app.pulsara.com/user/login",
        scheme: "pulsara://",
        app: true,
        pinned: true
      },
      {
        name: "Responder360",
        desc: "Pre-plans & building info",
        url: "https://app.responder360.com/",
        pinned: true
      },
      {
        name: "ESO Suite",
        desc: "ePCR & reporting",
        url: "https://www.esosuite.net/Dashboard",
        pinned: true
      },
      {
        name: "PSTrax",
        desc: "Apparatus & equipment checkoffs",
        url: "https://app1.pstrax.com/sso-login.php",
        pinned: true
      },
      {
        name: "FEMA ICS Forms",
        desc: "Downloadable ICS forms 201–215A",
        url: "https://training.fema.gov/emiweb/is/icsresource/icsforms/"
      }
    ]
  },

  {
    category: "Forms & Checklists",
    accent: "128,122,222",
    icon: "clipboard",
    items: [
      {
        name: "Exposure Form",
        desc: "Exposures & critical incident tracking",
        url: "https://forms.office.com/Pages/ResponsePage.aspx?id=jKLimMbeYkavgqyuOCdWegsZ1CGuolhJs1kMw31341ZUMk5UOTJXRUlMQ0lVUU4zUUdEUUxGVE9STi4u",
        pinned: true
      },
      {
        name: "PPE Flow Chart",
        desc: "Inspection & advanced cleaning steps",
        url: "flowchart.html",
        pinned: true
      },
      {
        name: "Station Duties",
        desc: "Tour tasks and the weekly rotation",
        url: "duties.html",
        pinned: true
      },
      {
        name: "Mando Schedule",
        desc: "Your group's mandatory training dates",
        url: "mando.html",
        id: "mando",
        pinned: true
      },
      {
        name: "Engine Advisory Board",
        desc: "Submit EAB feedback",
        url: "https://forms.office.com/g/S91bHTgu4B"
      }
    ]
  },

  {
    category: "Maps",
    accent: "45,168,178",
    icon: "map",
    items: [
      {
        name: "Fire Districts",
        desc: "District boundaries",
        url: "fire-districts.pdf"
      },
      {
        name: "TranStar Closures",
        desc: "Houston-area closures & traffic",
        url: "https://traffic.houstontranstar.org/roadclosures/"
      }
    ]
  },

  {
    category: "HR & Admin",
    accent: "47,127,224",
    icon: "badge",
    items: [
      {
        name: "City Email",
        desc: "Outlook webmail",
        url: "https://outlook.office.com/mail/",
        pinned: true
      },
      {
        name: "HR Suite",
        desc: "Paychecks, accruals",
        url: "https://myhr.pearlandtx.gov/Websites.HR.Portal/Default.aspx",
        offsite: true,
        pinned: true
      },
      {
        name: "Uniform Portal",
        desc: "GYC uniform ordering",
        url: "https://pearlandfd.b2bbuyersecure.com/?redirectURL=https://pearlandfd.gycuniforms.com/"
      },
      {
        name: "Lexipol",
        desc: "Policy manual",
        url: "https://policy.lexipol.com/"
      },
      {
        name: "FR1 Training",
        desc: "FireRescue1 Academy",
        url: "https://olt.firerescue1academy.com/login/#login"
      },
      {
        name: "City Fire Page",
        desc: "Public department page",
        url: "https://www.pearlandtx.gov/departments/fire"
      }
    ]
  },

  {
    category: "Benefits & Retirement",
    accent: "58,168,95",
    icon: "shield",
    items: [
      {
        name: "Health Insurance",
        desc: "Kelsey-Seybold MyChart",
        url: "https://www.mykelseyonline.com/MyChart/Authentication/Login"
      },
      {
        name: "TMRS Pension",
        desc: "Texas Municipal Retirement System",
        url: "https://my.tmrs.com/login"
      },
      {
        name: "457(b) / IRAs",
        desc: "MissionSquare supplemental retirement",
        url: "https://accountaccess.missionsq.org/login.html"
      },
      {
        name: "FSA Portal",
        desc: "WEX Health flexible spending",
        url: "https://benefitslogin.wexhealth.com/Login.aspx"
      },
      {
        name: "NFPA Physicals",
        desc: "Vasana — annual physical portal",
        url: "https://platform.vasana.ai/login"
      }
    ]
  },

  {
    category: "Union & Certification",
    accent: "214,140,45",
    icon: "flag",
    items: [
      {
        name: "PPFA",
        desc: "Pearland Professional Firefighters Assn.",
        url: "https://pearland-professional-firefighters-association.connectplus.app/login"
      },
      {
        name: "IAFF",
        desc: "International Assn. of Fire Fighters",
        url: "https://www.iaff.org/"
      },
      {
        name: "TCFP",
        desc: "TCFP FIdo login",
        url: "https://auth.tcfp.texas.gov/account/login"
      },
      {
        name: "NREMT",
        desc: "National EMS certification",
        url: "https://www.nremt.org/"
      },
      {
        name: "TDSHS",
        desc: "State EMS certification",
        url: "https://vo.ras.dshs.state.tx.us/datamart/login.do"
      }
    ]
  },

  {
    category: "Wellness & Support",
    accent: "214,94,124",
    icon: "heart",
    items: [
      {
        name: "Mindbase",
        desc: "Confidential first responder wellness",
        url: "https://getmindbase.com/",
        ios: "https://apps.apple.com/us/app/mindbase-health-and-wellness/id1640085568",
        android: "https://play.google.com/store/apps/details?id=com.bac354442f26.app",
        app: true
      },
      {
        name: "Center of Excellence",
        desc: "Behavioral health treatment for members",
        url: "https://www.iaff.org/center-of-excellence/"
      },
      {
        name: "988 Lifeline",
        desc: "Suicide & Crisis Lifeline — call or text 988",
        url: "tel:988",
        urgent: true
      }
      // Peer support contacts go here once the internal numbers are gathered.
      // Use "tel:" URLs so they dial straight from the tile, e.g.:
      //   { name: "Peer Support — J. Doe", desc: "Peer support team", url: "tel:2815550100" }
    ]
  }
];
