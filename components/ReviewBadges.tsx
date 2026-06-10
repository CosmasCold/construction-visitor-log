// components/ReviewBadges.tsx
"use client";

import { useEffect } from "react";

export default function ReviewBadges() {
  useEffect(() => {
    // SourceForge badge
    const sf = document.createElement("script");
    sf.async = true;
    sf.src = "https://b.sf-syn.com/badge_js?sf_id=4103023&variant_id=sf";
    document.body.appendChild(sf);

    // Slashdot badge
    const sd = document.createElement("script");
    sd.async = true;
    sd.src = "https://b.sf-syn.com/badge_js?sf_id=4103023&variant_id=sd";
    document.body.appendChild(sd);

    // TopBusinessSoftware badge
    const tbs = document.createElement("script");
    tbs.async = true;
    tbs.src = "https://b.sf-syn.com/badge_js?sf_id=4103023&variant_id=tbs";
    document.body.appendChild(tbs);

    return () => {
      document.body.removeChild(sf);
      document.body.removeChild(sd);
      document.body.removeChild(tbs);
    };
  }, []);

  return (
    <>
      <div className="sf-root" data-id="4103023" data-badge="light-default" data-variant-id="sf" style={{ width: "125px" }}>
        <a href="https://sourceforge.net/software/product/SiteSafe/" target="_blank">SiteSafe Reviews</a>
      </div>
      <div className="sf-root" data-id="4103023" data-badge="users-love-us-new-white" data-variant-id="sd" style={{ width: "125px" }}>
        <a href="https://slashdot.org/software/p/SiteSafe/" target="_blank">SiteSafe Reviews</a>
      </div>
      <div className="sf-root" data-id="4103023" data-badge="most-loved" data-variant-id="tbs" style={{ width: "125px" }}>
        <a href="https://topbusinesssoftware.com/products/SiteSafe/reviews/" target="_blank">SiteSafe Reviews</a>
      </div>
    </>
  );
}