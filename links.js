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
        name: "Pulsara",
        desc: "Patient communication / alerts",
        url: "https://us-app.pulsara.com/user/login",
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
        name: "Policy Manual",
        desc: "Lexipol policy manual",
        url: "https://policy.lexipol.com/"
      },
      {
        name: "FEMA ICS Forms",
        desc: "Downloadable ICS forms 201–215A",
        url: "https://training.fema.gov/emiweb/is/icsresource/icsforms/"
      },
    ]
  },

  {
    category: "Forms & Checklists",
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
        name: "Daily & Weekly Duties",
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
    icon: "map",
    items: [
      {
        name: "Fire Districts",
        desc: "District boundaries — reference for reports",
        url: "fire-districts.pdf"
      },
      {
        name: "TranStar Road Closures",
        desc: "Houston-area closures & traffic",
        url: "https://traffic.houstontranstar.org/roadclosures/"
      }
    ]
  },

  {
    category: "HR & Payroll",
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
        desc: "Timesheets, leave, personnel",
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
        name: "City Fire Page",
        desc: "Public department page",
        url: "https://www.pearlandtx.gov/departments/fire"
      }
    ]
  },

  {
    category: "Benefits & Retirement",
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
        name: "NFPA Physicals",
        desc: "Vasana — annual physical portal",
        url: "https://platform.vasana.ai/login"
      }
    ]
  },

  {
    category: "Union & Certification",
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
        desc: "Texas Commission on Fire Protection",
        url: "https://www.tcfp.texas.gov/"
      },
      {
        name: "TCFP Cert Lookup",
        desc: "Check your certification status",
        url: "https://www.tcfp.texas.gov/services/search-individual-department"
      }
    ]
  },

  {
    category: "Wellness & Support",
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
        name: "IAFF Center of Excellence",
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
