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
     cityOnly: true -> shows a "City Network Only" badge — the opposite of offsite:
                       this ONLY resolves on the city network, and won't load over
                       cell data or an outside connection at all.
     app:  true     -> shows an "App" badge (native app, not a website)
     webOnly: true  -> shows a "Web Only" badge — there IS a native app for this,
                       but nothing (confirmed scheme, verified App Link) exists
                       for a web page to open it with, so this always opens the
                       website even if the app is installed. Use this instead of
                       silently doing nothing so people don't wonder why it
                       didn't open their app.
     store: true    -> shows a "Store" badge — this tile lands on the App Store /
                       Play Store listing, not on the app itself. From there you
                       tap "Open" to launch it. No web page can press that Open
                       button for you (the OS blocks cross-app automation), so
                       the badge sets the expectation instead of looking broken.
     ios:  "url"    -> alternate URL used on iPhone/iPad
     android: "url" -> alternate URL used on Android
     scheme: "x://"       -> tries to open an installed app first (both platforms), then falls back to url
     androidScheme: "..." -> same, but Android only (use when the iOS scheme is different or unknown)
     iosScheme: "..."     -> same, but iOS only
     Only add a scheme if you've actually confirmed it opens the app — a wrong
     guess wastes ~1s before falling back, and on iOS can pop an "address is
     invalid" alert. See the Pulsara entry below for how to build a reliable
     Android one from just the app's Play Store package name.

   After editing: save, commit, push. That's it.
   ============================================================ */

const LAST_UPDATED = "2026-08-12";   // bump when you do a review pass

const LINKS = [
  {
    category: "Response & Patient Care",
    accent: "224,54,44",
    icon: "siren",
    items: [
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
        // No auto-open for Pulsara on either platform. This isn't an
        // unfinished attempt — it's a confirmed dead end:
        //   - "pulsara://" (a guess) tested false: fell through to the web
        //     login every time.
        //   - Pulsara's own apple-app-site-association file only covers
        //     /oauth2callback/*, not the login page we link to, so no plain
        //     https link universal-links into the app here on any platform.
        //   - An Android intent: URL launching com.pulsara.stopapps by
        //     package (confirmed via both their iOS app-site-association
        //     file and the Play Store listing) ALSO tested false on a real
        //     device — landed on the web login every time, app never
        //     opened. Root cause: Chrome only launches an app component via
        //     intent: if its intent-filter declares category BROWSABLE,
        //     specifically to stop web pages from launching arbitrary app
        //     screens. A launcher icon's MAIN/LAUNCHER activity is not
        //     BROWSABLE, so Chrome silently refuses — same behavior every
        //     time, not a syntax bug.
        // Bottom line: Pulsara hasn't published anything (scheme, verified
        // App Link covering this path, or a BROWSABLE activity) that a web
        // page can hook into. If that changes, revisit; until then this is
        // a plain link, same as any non-app tile. (For reference: iOS App
        // Store id873184192 — "Pulsara: Medical Communication".)
        name: "Pulsara",
        desc: "Patient communication / alerts",
        url: "https://us-app.pulsara.com/user/login",
        webOnly: true,
        pinned: true
      },
      {
        // Space is deliberate: "Responder360" has no natural break point,
        // which let its tile stretch wider than the rest of the row to fit
        // the unbroken word. The space gives it one, same as any other
        // two-word tile name.
        name: "Responder 360",
        desc: "Pre-plans & building info",
        url: "https://app.responder360.com/",
        pinned: true
      },
      {
        name: "ESO Suite",
        desc: "ePCR & reporting",
        url: "https://www.esosuite.net/login/PEARLANDFD",
        pinned: true
      },
      {
        name: "PSTrax",
        desc: "Apparatus & equipment checkoffs",
        url: "https://app1.pstrax.com/sso-login.php",
        pinned: true
      },
      {
        // Handtevy is the preferred app and already carries protocols, so
        // this trails behind it rather than leading the section. The old
        // links all pointed at acidremap.com's marketing/download page
        // (complete with a "redeem this promo code" wall) instead of the
        // actual app — that's the bug that got reported.
        //
        // Android fix, confirmed real: found the exact package two ways
        // (Play Store search + it matches the site's own bundleID param) —
        // com.acidremap.PPPPearlandFD, a normal public Play Store listing
        // titled "Pearland FD". Linking straight to it now.
        //
        // iOS has no fix available: checked the iTunes lookup API directly
        // for that same bundle id (and the shorter variant) and got zero
        // results both times — there is no public App Store listing for a
        // Pearland-specific app. Acid Remap's iOS distribution goes through
        // Apple's Custom Apps program (private, promo-code redemption),
        // which is exactly what that download page's promo-code messaging
        // was for. So for iOS, that page IS the correct destination, not a
        // wrong link — left it as-is.
        //
        // No scheme attempted on either platform: the download page itself
        // states outright that no custom URL scheme exists, and there's no
        // assetlinks.json for Android App Links either. Nothing to hook a
        // "try the app first" attempt onto — see the Pulsara entry for what
        // guessing one anyway costs.
        name: "EMS Protocols",
        desc: "Pearland FD protocols (AcidRemap)",
        url: "https://play.google.com/store/apps/details?id=com.acidremap.PPPPearlandFD",
        android: "https://play.google.com/store/apps/details?id=com.acidremap.PPPPearlandFD",
        ios: "https://www.acidremap.com/customAppDownload.php?bundleID=PPPPearlandFD&platform=iOS",
        store: true
      },
      {
        // ehcec.net resolves inside the city network only — cityOnly is the
        // honest badge here rather than silently failing off-network. It's
        // also its own login (the URL lands on /#/login), so there's
        // nothing sensitive exposed by the tile existing even off-network.
        name: "WebCAD",
        desc: "Dispatch / CAD viewer — city network only",
        url: "http://webcad.ehcec.net/#/login",
        cityOnly: true
      }
    ]
  },

  {
    category: "Field Reference",
    accent: "168,138,94",
    icon: "book",
    items: [
      {
        name: "Engine Manual",
        desc: "Engine Company Operations Manual, 2nd ed.",
        url: "engine-manual.pdf"
      },
      {
        name: "Truck Manual",
        desc: "Truck Company Operations Manual, 2nd ed.",
        url: "truck-manual.pdf"
      },
      {
        name: "PPE Flow Chart",
        desc: "Inspection & advanced cleaning steps",
        url: "flowchart.html"
      },
      {
        // No web counterpart at all — this is app-only, so there's no
        // "webOnly" fallback badge that makes sense here, just a normal
        // store tile like EMS Protocols/Mindbase. Verified official (not
        // a lookalike): iOS bundle gov.dot.phmsa.erg2, seller "Pipeline
        // and Hazardous Materials Safety Administration", updated Oct
        // 2024. Android package gov.nih.nlm.erg2012 — the NIH-era name
        // stuck through PHMSA's rebrand, but the live Play listing shows
        // developer "PHMSA", 1M+ downloads, updated Aug 2024.
        name: "ERG",
        desc: "Emergency Response Guidebook — hazmat placards/IDs",
        url: "https://play.google.com/store/apps/details?id=gov.nih.nlm.erg2012",
        android: "https://play.google.com/store/apps/details?id=gov.nih.nlm.erg2012",
        ios: "https://apps.apple.com/us/app/erg-for-ios/id1597142669",
        store: true
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
        name: "Training Exposure",
        desc: "Report a training exposure",
        url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=jKLimMbeYkavgqyuOCdWegsZ1CGuolhJs1kMw31341ZUQVU0RjZJRlJGUjlTMk9aNEJQMVZDUUFEQi4u",
        pinned: true
      },
      {
        name: "Live Fire Vitals",
        desc: "Vitals log for live fire evolutions",
        url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=jKLimMbeYkavgqyuOCdWegsZ1CGuolhJs1kMw31341ZUMVdXMlVXVkJBMjJEV041UTFPNERXNkg3Qy4u",
        pinned: true
      },
      {
        name: "Engine Advisory Board",
        desc: "Submit EAB feedback",
        url: "https://forms.office.com/g/S91bHTgu4B"
      },
      {
        name: "FEMA ICS Forms",
        desc: "Downloadable ICS forms 201–215A",
        url: "https://training.fema.gov/emiweb/is/icsresource/icsforms/"
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
      },
      {
        // Location param is base64 JSON: {"view":{"latitude":...,
        // "longitude":...,"zoom":...,"eventId":null}}. CenterPoint's
        // default link centers northwest of Pearland, zoomed out to the
        // whole Houston metro — this recenters on Pearland itself.
        name: "CenterPoint Outages",
        desc: "Power outage tracker, centered on Pearland",
        url: "https://tracker.centerpointenergy.com/map/texas?location=eyJ2aWV3Ijp7ImxhdGl0dWRlIjoyOS41NjM2LCJsb25naXR1ZGUiOi05NS4yODYsInpvb20iOjEyLCJldmVudElkIjpudWxsfX0="
      }
    ]
  },

  {
    category: "HR & Admin",
    accent: "47,127,224",
    icon: "badge",
    items: [
      {
        name: "Mando Schedule",
        desc: "Your group's mandatory training dates",
        url: "mando.html",
        id: "mando",
        pinned: true
      },
      {
        name: "City Email",
        desc: "Outlook webmail",
        url: "https://outlook.office.com/mail/",
        pinned: true
      },
      {
        name: "Esuite",
        desc: "Paychecks, accruals",
        url: "https://myhr.pearlandtx.gov/Websites.HR.Portal/Default.aspx",
        offsite: true,
        pinned: true
      },
      {
        name: "Pay Check",
        desc: "Shift pay calculator",
        url: "https://paycheck.halfedge.dev",
        cover: "icon-paycheck-full.png",
        pinned: true
      },
      {
        name: "IT Helpdesk",
        desc: "Submit a support ticket",
        url: "https://helpdesk.pearlandtx.gov/support/home"
      },
      {
        name: "Facilities Request",
        desc: "Public Works facilities request form",
        url: "https://pearlandtx.sharepoint.com/sites/PublicWorks/SitePages/Facilities-Request-Form.aspx"
      },
      {
        name: "Uniform Portal",
        desc: "GYC uniform ordering",
        url: "https://pearlandfd.b2bbuyersecure.com/?redirectURL=https://pearlandfd.gycuniforms.com/"
      },
      {
        // Same dead end as Pulsara, checked the same way. There IS a native
        // app — "Lexipol KMS Mobile" on Android, package
        // com.lexipol.mobile.prime (confirmed via the official Play Store
        // listing) — but nothing here can hook into it:
        //   - No App Links / Universal Links: policy.lexipol.com serves 404
        //     for both /.well-known/assetlinks.json and
        //     /.well-known/apple-app-site-association.
        //   - No published custom scheme found anywhere (Lexipol's own
        //     docs, help center, third-party sources — nothing).
        //   - An Android intent: URL by package (same technique as
        //     Handtevy/Pulsara) tested false on a real device with the app
        //     installed: fell through to the Play Store listing every time,
        //     never opened the app itself — same BROWSABLE-activity gap
        //     Pulsara hit.
        // Bottom line: nothing to attempt "app first" with. If Lexipol ever
        // publishes one of the above, revisit.
        name: "Lexipol<br>Policy",
        desc: "Policy manual",
        url: "https://policy.lexipol.com/",
        webOnly: true
      },
      {
        name: "FR1 Training",
        desc: "FireRescue1 Academy",
        url: "https://olt.firerescue1academy.com/login/#login"
      },
      {
        // Was a link straight out to pearlandtx.gov's department page —
        // replaced with an in-app contacts page (numbers/addresses pulled
        // from that same site, verified live) since a phone directory is
        // more useful here than a marketing page, and this is exactly the
        // kind of thing worth handing a resident without them needing to
        // save a number to their own phone.
        name: "Contacts<br>Fire & City",
        desc: "Non-emergency, Fire Marshal, PIO, City Hall, stations",
        url: "contacts.html"
      },
      {
        name: "Station Duties",
        desc: "Tour tasks and the weekly rotation",
        url: "duties.html",
        pinned: true
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
        // Same dead end as Pulsara, checked the same way: getmindbase.com
        // 301s to versaterm.com (Versaterm acquired Mindbase), and NEITHER
        // domain serves assetlinks.json or apple-app-site-association —
        // both 404. So no App Links / Universal Links exist, and there's
        // no published scheme. A tap can only reach the store listing.
        //
        // Store listings verified current, not stale: iTunes lookup on
        // id1640085568 returns "Mindbase | Health and Wellness", bundle
        // com.bac354442f26.app (matches the Android package exactly), last
        // updated 2026-07-17 — actively maintained despite the acquisition.
        //
        // url: was getmindbase.com, which now just redirects to Versaterm's
        // corporate homepage — a dead end for someone looking for wellness
        // support. Pointed at the actual Mindbase product page instead.
        name: "Mindbase",
        desc: "Confidential first responder wellness",
        url: "https://www.versaterm.com/solution/mindbase/",
        ios: "https://apps.apple.com/us/app/mindbase-health-and-wellness/id1640085568",
        android: "https://play.google.com/store/apps/details?id=com.bac354442f26.app",
        store: true
      },
      {
        name: "Center of Excellence",
        desc: "Behavioral health treatment for members",
        url: "https://www.iaff.org/center-of-excellence/"
      },
      {
        // Deliberately NOT a tel: link. A one-tap dial is an easy accident
        // in a pocket, and phone isn't the only way in anyway — this page
        // lists call, text, and chat as separate, equally real options.
        name: "988 Lifeline",
        desc: "Call, text, or chat — Suicide & Crisis Lifeline",
        url: "https://988lifeline.org/get-help/",
        urgent: true
      }
      // Deliberately NOT listing individual peer support members' phone
      // numbers here. This site is public — anything added to this file is
      // readable by anyone who finds the URL. Those contacts live behind the
      // Mindbase login, which is the right place for them. Don't add them.
    ]
  }
];
