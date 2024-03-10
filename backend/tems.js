fetch("https://teams.microsoft.com/api/chatsvc/amer/v1/threads/19%3aRSPlqQ0vb_odQYw2OvLekoYJKgmfndj5Zz_0dAR_ZRM1%40thread.tacv2/members?view=msnp24Equivalent&pageSize=50&selectMemberRoles=User%7CGuest&filterExplicitlyAdded=false", {
    "headers": {
        "accept": "json",
        "accept-language": "en-US,en;q=0.9",
        "authentication": "skypetoken=eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE3MDk4NTY2ODYsImV4cCI6MTcwOTg2MDg2NCwic2t5cGVpZCI6Im9yZ2lkOmE0M2VmOWY3LWY2YzUtNDhiMy05MDA3LTY2NzVkOWVjNzE1OCIsInNjcCI6NzgwLCJjc2kiOiIxNzA5ODU2Mzg1IiwidGlkIjoiMWZkNDY3M2YtZGY5Ni00NjIxLTg2MzgtYTFkODhjNGM4NWQ3IiwicmduIjoiYW1lciIsImFhZF91dGkiOiJwUV8yM0FSWFNFU0pTYWhldnZGQUFBIiwiYWFkX2lhdCI6MTcwOTg1NjM4NSwiYWFkX2FwcGlkIjoiNWUzY2U2YzAtMmIxZi00Mjg1LThkNGItNzVlZTc4Nzg3MzQ2In0.hBh3x0fjeVWzvKFVLE5Or6JgOtjkQ4nCql5oomnd5NaLkC7h9-B0AK5XAi8j-aKcsJn6tzVNhbBjZ8K-kBfw-1OCgTkk75SdT2v_gr1qYokry-wHWw11RIaJmstdrlarcNxxqA95QK4myhTPdNcf8ouPSiEKVJWZH88s-E8jyoH4wC6xFOT0Fi135aoFWVKq4j4sbqrkLBvS-KVXvYIpp7_dXUHS6y2fGiiONynXlv1TDrc-va6A99kXrnkKGMgkG8wt1_Q43IkFqJNhl0x2FQNGEKXBv0_A-vKOlMw3RO5BGXbbQSEe6dnrIajLgkIc0zTB7XkB--kFkQRiXNr-Zw",
        "behavioroverride": "redirectAs404",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-ms-client-env": "pds-prod-comm-usce",
        "x-ms-client-type": "web",
        "x-ms-client-version": "1415/1.0.0.2024021504",
        "x-ms-scenario-id": "1108",
        "x-ms-session-id": "93fa68e6-af3d-3dad-3857-c607370936fe",
        "x-ms-user-type": "null",
        "Referer": "https://teams.microsoft.com/_",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "method": "GET"
}).then(x => x.text()).then(y => {
    console.log(y);
});