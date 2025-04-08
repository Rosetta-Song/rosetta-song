////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Video = {
  kind: "youtube#searchResult";
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
  favorite?: boolean; // Added favorite property
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeVideos: Video[] = 
[
  {
    "kind": "youtube#searchResult",
    "etag": "gfu8FoR8Vgc8AGeu6AxLXaDbPU8",
    "id": {
      "kind": "youtube#video",
      "videoId": "61JHONRXhjs"
    },
    "snippet": {
      "publishedAt": "2024-12-13T02:21:19Z",
      "channelId": "UCK8sQmJBp8GCxrOtXWBpyEA",
      "title": "Google \u2014 Year in Search 2024",
      "description": "This year, we're celebrating the Breakout Searches of 2024. From iconic performances, to history-making breakthroughs, see the ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/61JHONRXhjs/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/61JHONRXhjs/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/61JHONRXhjs/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Google",
      "liveBroadcastContent": "none",
      "publishTime": "2024-12-13T02:21:19Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "nGffh1kEYsP_d6fwhuG92KOqlqI",
    "id": {
      "kind": "youtube#video",
      "videoId": "bMnLf5KFSos"
    },
    "snippet": {
      "publishedAt": "2024-12-24T07:16:10Z",
      "channelId": "UC56D-IHcUvLVFTX_8NpQMXg",
      "title": "Exploring the Scariest Google Maps Locations!",
      "description": "These google maps locations were insanely creepy! HUGE thank you to Wake to Wake in Turks and Caicos for hosting us on their ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/bMnLf5KFSos/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/bMnLf5KFSos/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/bMnLf5KFSos/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Brent Rivera",
      "liveBroadcastContent": "none",
      "publishTime": "2024-12-24T07:16:10Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "aTzWZnPvRKRcv_uBq94v3mp6_68",
    "id": {
      "kind": "youtube#video",
      "videoId": "3KtWfp0UopM"
    },
    "snippet": {
      "publishedAt": "2023-12-11T13:00:31Z",
      "channelId": "UCK8sQmJBp8GCxrOtXWBpyEA",
      "title": "Google \u2014 25 Years in Search: The Most Searched",
      "description": "Google is celebrating the most searched figures and moments in 25 years of Google Search. From BTS to Taylor Swift, see the ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/3KtWfp0UopM/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/3KtWfp0UopM/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/3KtWfp0UopM/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Google",
      "liveBroadcastContent": "none",
      "publishTime": "2023-12-11T13:00:31Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "4Wc2_2PIYBrDdu36IznNUoOCHG4",
    "id": {
      "kind": "youtube#video",
      "videoId": "maYYCw_vHcA"
    },
    "snippet": {
      "publishedAt": "2023-03-06T15:30:11Z",
      "channelId": "UCvz84_Q0BbvZThy75mbd-Dg",
      "title": "Why &quot;GOOGLE&quot; Is Actually Misspelled \ud83e\udd14 (EXPLAINED)",
      "description": "",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/maYYCw_vHcA/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/maYYCw_vHcA/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/maYYCw_vHcA/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Zack D. Films",
      "liveBroadcastContent": "none",
      "publishTime": "2023-03-06T15:30:11Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "aR0reAtIOh1bpqmTxiZD-lZauwA",
    "id": {
      "kind": "youtube#video",
      "videoId": "KaiHdIKfSpk"
    },
    "snippet": {
      "publishedAt": "2025-02-10T20:13:22Z",
      "channelId": "UC56D-IHcUvLVFTX_8NpQMXg",
      "title": "Exploring the Creepiest Google Maps Locations!",
      "description": "We want to even CREEPIER google maps locations and you have to watch till the end!! Inspired by: @EllieMarieTV Stalk me on ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/KaiHdIKfSpk/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/KaiHdIKfSpk/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/KaiHdIKfSpk/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Brent Rivera",
      "liveBroadcastContent": "none",
      "publishTime": "2025-02-10T20:13:22Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "g5qNzxlJyKStoVAakCqJfsdkkhA",
    "id": {
      "kind": "youtube#video",
      "videoId": "0rOmQXCWbNI"
    },
    "snippet": {
      "publishedAt": "2025-01-08T07:30:00Z",
      "channelId": "UCNi1KILyYvBOrlflOWXFtlA",
      "title": "\ud83d\ude36\u200d\ud83c\udf2b\ufe0f\ud83e\uddd0I Found Real Shin Sonic In Google Map\ud83d\uddfa\ufe0f? #shorts #trending #map #scary #datadefender4u",
      "description": "",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/0rOmQXCWbNI/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/0rOmQXCWbNI/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/0rOmQXCWbNI/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Data Defender ",
      "liveBroadcastContent": "none",
      "publishTime": "2025-01-08T07:30:00Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "rWqMPsVZb1ytLo_AeieX02GWyb0",
    "id": {
      "kind": "youtube#video",
      "videoId": "wofdXHUdk6w"
    },
    "snippet": {
      "publishedAt": "2025-03-31T17:23:00Z",
      "channelId": "UC0vhuLUjfxeoKDexbtMOnTQ",
      "title": "Brian Cox Reacts After Google Willow Quantum Chip Detects Signs of a Simulated Universe",
      "description": "Brian Cox Reacts After Google Willow Quantum Chip Detects Signs of a Simulated Universe Discover the mind-bending ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/wofdXHUdk6w/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/wofdXHUdk6w/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/wofdXHUdk6w/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Spacialize",
      "liveBroadcastContent": "none",
      "publishTime": "2025-03-31T17:23:00Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "ysGxAPs9ULs09a6RkEr3bEwnqlo",
    "id": {
      "kind": "youtube#video",
      "videoId": "rokGy0huYEA"
    },
    "snippet": {
      "publishedAt": "2020-12-09T07:59:45Z",
      "channelId": "UCK8sQmJBp8GCxrOtXWBpyEA",
      "title": "Google \u2014 Year in Search 2020",
      "description": "In times of uncertainty, people seek understanding and meaning. This year, the world searched \u201cwhy\u201d more than ever. This film ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/rokGy0huYEA/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/rokGy0huYEA/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/rokGy0huYEA/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Google",
      "liveBroadcastContent": "none",
      "publishTime": "2020-12-09T07:59:45Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "qHUcsivMoNoKhaoIT9hcrXi2Hzo",
    "id": {
      "kind": "youtube#video",
      "videoId": "-7e6g11BJc0"
    },
    "snippet": {
      "publishedAt": "2025-02-06T14:15:46Z",
      "channelId": "UCIG1k8umaCIIrujZPzZPIMA",
      "title": "Dream Job | Google Pixel SB Commercial 2025",
      "description": "With Gemini Live on Google Pixel 9, there's a whole new way to talk with your phone. Just hold down the power button to summon ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/-7e6g11BJc0/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/-7e6g11BJc0/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/-7e6g11BJc0/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Made by Google",
      "liveBroadcastContent": "none",
      "publishTime": "2025-02-06T14:15:46Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "n9r7po-4Aefely3WWKKKfcYpBI0",
    "id": {
      "kind": "youtube#video",
      "videoId": "4SCjXcBeW1E"
    },
    "snippet": {
      "publishedAt": "2024-04-09T13:50:19Z",
      "channelId": "UCBmwzQnSoj9b6HzNmFrg_yw",
      "title": "Introducing Google Vids",
      "description": "Meet your new AI-powered video creation app for work. Google Vids is a new app that helps you easily share ideas and create ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/4SCjXcBeW1E/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/4SCjXcBeW1E/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/4SCjXcBeW1E/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Google Workspace",
      "liveBroadcastContent": "none",
      "publishTime": "2024-04-09T13:50:19Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "4WpiOKBL1tYxx4BVMRVZH-4p1FU",
    "id": {
      "kind": "youtube#video",
      "videoId": "TxGs3mXLyZk"
    },
    "snippet": {
      "publishedAt": "2025-02-28T16:30:09Z",
      "channelId": "UCAwylBbx8RiRD3VsaYdwNTw",
      "title": "Leaked from Google: &quot;We\u2019re Dealing with Alien Intelligence&quot;",
      "description": "Former Google Insider Mo Gadwat speaks about an \"alien intelligence\" already here. Hear his urgent message about the forces ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/TxGs3mXLyZk/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/TxGs3mXLyZk/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/TxGs3mXLyZk/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Video Advice",
      "liveBroadcastContent": "none",
      "publishTime": "2025-02-28T16:30:09Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "cSBLhOaJXTMukAFZUs8QIspKVHo",
    "id": {
      "kind": "youtube#video",
      "videoId": "zVZcCWzZXVs"
    },
    "snippet": {
      "publishedAt": "2024-12-22T05:11:40Z",
      "channelId": "UCu1vz2rQKbR069LXXThTvkQ",
      "title": "Werid Gaint Scary Gingerbread In Google Earth Part-2 #shorts #map #earth #googleearth #trending #yt",
      "description": "Werid Gaint Scary Gingerbread In Google Earth Part-2 #shorts #map #earth #googleearth #trending #yt Data Handling 4U scary ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/zVZcCWzZXVs/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/zVZcCWzZXVs/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/zVZcCWzZXVs/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Data Handling",
      "liveBroadcastContent": "none",
      "publishTime": "2024-12-22T05:11:40Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "Yo-B93_x2YF6RHVxS5X8JsH3L2c",
    "id": {
      "kind": "youtube#video",
      "videoId": "_KkVtCHBzUs"
    },
    "snippet": {
      "publishedAt": "2024-09-17T18:01:00Z",
      "channelId": "UCyeVfsThIHM_mEZq7YXIQSQ",
      "title": "World&#39;s Craziest Things Spotted on Google Maps!",
      "description": "World's Craziest Things Spotted on Google Maps! \u25bb Watch Another Video! - https://youtu.be/YS4CXCFQWNs Hit LIKE and ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/_KkVtCHBzUs/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/_KkVtCHBzUs/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/_KkVtCHBzUs/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "MoreAliA",
      "liveBroadcastContent": "none",
      "publishTime": "2024-09-17T18:01:00Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "vyuMSAAxTH7iwUJug3bfy4HoU68",
    "id": {
      "kind": "youtube#video",
      "videoId": "no_oAmo5hIQ"
    },
    "snippet": {
      "publishedAt": "2025-03-09T21:28:58Z",
      "channelId": "UCiHRg_hyyHQe_IZ-efHR5Vg",
      "title": "Google doesn&#39;t work anymore",
      "description": "Create a free professional website in minutes with Odoo today - https://www.odoo.com/r/J93 my nebula page: ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/no_oAmo5hIQ/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/no_oAmo5hIQ/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/no_oAmo5hIQ/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Pinely",
      "liveBroadcastContent": "none",
      "publishTime": "2025-03-09T21:28:58Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "ply9Eab0skjAXF1fWRhLSfx20-4",
    "id": {
      "kind": "youtube#video",
      "videoId": "m4_jLmWc_Ug"
    },
    "snippet": {
      "publishedAt": "2024-06-30T01:13:51Z",
      "channelId": "UCDYGS-YMLczXBSP_ChRMPAw",
      "title": "\ud83e\udd2b 5 GOOGLE SECRETS Part 6 (Did you know?) #shorts #googlesecrets",
      "description": "Get ready to be amazed! In part 6 of this series, we're revealing 5 MORE secret Google tricks you probably haven't seen before.",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/m4_jLmWc_Ug/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/m4_jLmWc_Ug/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/m4_jLmWc_Ug/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "GreenFact",
      "liveBroadcastContent": "none",
      "publishTime": "2024-06-30T01:13:51Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "9KlK-ZWpV1HdIkFm70LsvYOwv6s",
    "id": {
      "kind": "youtube#video",
      "videoId": "FMyEOIXjimk"
    },
    "snippet": {
      "publishedAt": "2023-07-03T14:07:07Z",
      "channelId": "UCPbZa8Xnef2WvquzNxu44tw",
      "title": "how to block pop up ads on Google chrome",
      "description": "how to block pop up ads on Google chrome #googlechrome #google #popupads #ads #androidv#apps.",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/FMyEOIXjimk/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/FMyEOIXjimk/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/FMyEOIXjimk/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "johnzeus",
      "liveBroadcastContent": "none",
      "publishTime": "2023-07-03T14:07:07Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "sE-lLbTzhsvTGkLJtFtBFhNIgWA",
    "id": {
      "kind": "youtube#video",
      "videoId": "JOeQITRLwik"
    },
    "snippet": {
      "publishedAt": "2024-10-31T17:00:41Z",
      "channelId": "UCZfTWLrTkaoZoSx5fkrAPJA",
      "title": "The Darkest Things Found on Google Maps #2 \ud83e\udd14",
      "description": "The Darkest Things Found on Google Maps #2 Socials: Twitter \u279c https://twitter.com/hxsain Instagram ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/JOeQITRLwik/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/JOeQITRLwik/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/JOeQITRLwik/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "hxsain",
      "liveBroadcastContent": "none",
      "publishTime": "2024-10-31T17:00:41Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "BKAhzkHuEw5kLmgeoB5CxGJalso",
    "id": {
      "kind": "youtube#video",
      "videoId": "yW0gTE9nmWk"
    },
    "snippet": {
      "publishedAt": "2023-10-29T11:05:01Z",
      "channelId": "UCRzpjxETZlKUnQkqSU7uW7Q",
      "title": "Creepy things found again on google map and google earth #map #earth #earthsecret377 #trend",
      "description": "Creepy things found again on google map and google earth #map #earth #earthsecret377 #trend.",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/yW0gTE9nmWk/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/yW0gTE9nmWk/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/yW0gTE9nmWk/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Earth secret 377",
      "liveBroadcastContent": "none",
      "publishTime": "2023-10-29T11:05:01Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "QSrZg8obzKuLGVApvZjZPZfH0hI",
    "id": {
      "kind": "youtube#video",
      "videoId": "aXzNJ704UeE"
    },
    "snippet": {
      "publishedAt": "2025-03-29T15:00:03Z",
      "channelId": "UCHlq0fpOYpOyHbtUqSTigdg",
      "title": "STRANGEST Things Found on Google Maps!",
      "description": "Need new glasses? Check out our partner Zenni Optical: https://zennipartners.pxf.io/PrestonReacts For 10% off your purchase at ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/aXzNJ704UeE/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/aXzNJ704UeE/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/aXzNJ704UeE/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "PrestonReacts",
      "liveBroadcastContent": "none",
      "publishTime": "2025-03-29T15:00:03Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "_pWDdxBYf4RIuZDHZBbhRBCbCyw",
    "id": {
      "kind": "youtube#video",
      "videoId": "Ew_ReoK1zMc"
    },
    "snippet": {
      "publishedAt": "2020-01-12T16:25:06Z",
      "channelId": "UC8aFE06Cti9OnQcKpl6rDvQ",
      "title": "How to Install Google Chrome on Windows 10",
      "description": "In this video I am going to show How to Install Google Chrome Windows 10. I will also show how to pin Google Chrome on your ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/Ew_ReoK1zMc/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/Ew_ReoK1zMc/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/Ew_ReoK1zMc/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "ProgrammingKnowledge2",
      "liveBroadcastContent": "none",
      "publishTime": "2020-01-12T16:25:06Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "CM1CLxb3D4PXbpn37vygCfE_a1c",
    "id": {
      "kind": "youtube#video",
      "videoId": "4LnrB0uCq74"
    },
    "snippet": {
      "publishedAt": "2023-10-06T12:01:46Z",
      "channelId": "UC1pYFrBsRJnoSwQIQ2kbN6A",
      "title": "WEARING A EYEBALL FROM GOOGLE \ud83d\ude33",
      "description": "SUBSCRIBE :) #jarrettstod #shorts.",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/4LnrB0uCq74/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/4LnrB0uCq74/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/4LnrB0uCq74/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Jarrett Stod",
      "liveBroadcastContent": "none",
      "publishTime": "2023-10-06T12:01:46Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "egw8LmQIqKYjg2QCxhV6lq-c0o4",
    "id": {
      "kind": "youtube#video",
      "videoId": "1fUA7nqPd6Y"
    },
    "snippet": {
      "publishedAt": "2025-03-30T16:55:20Z",
      "channelId": "UCrGLm-Drgv0vbbemwwHeXJw",
      "title": "I&#39;m Buying More Google Stock, Here&#39;s Why",
      "description": "In this video, I will talk about the recent updates regarding Alphabet Google stock. A portion of this video is sponsored by The ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/1fUA7nqPd6Y/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/1fUA7nqPd6Y/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/1fUA7nqPd6Y/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Couch Investor",
      "liveBroadcastContent": "none",
      "publishTime": "2025-03-30T16:55:20Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "uC2YjIMmFiUsL44s5Thha_MgZ9k",
    "id": {
      "kind": "youtube#video",
      "videoId": "jb5fVVMpnho"
    },
    "snippet": {
      "publishedAt": "2025-03-20T21:00:37Z",
      "channelId": "UCke6I9N4KfC968-yRcd5YRg",
      "title": "DON&#39;T Google At Night in Among Us",
      "description": "We find out what happens if you google at night in Among Us Friends in the Video \u2b51 @Nicovald \u2b51 @BiffleWiffle \u2b51 @Zud ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/jb5fVVMpnho/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/jb5fVVMpnho/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/jb5fVVMpnho/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "SSundee",
      "liveBroadcastContent": "none",
      "publishTime": "2025-03-20T21:00:37Z"
    }
  }
]

;

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getVideos(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let videos = fakeVideos;
  if (query) {
    videos = matchSorter(videos, query, {
      keys: ["snippet.title", "snippet.description", "snippet.channelTitle"],
    });
  }
  return videos.sort(sortBy("snippet.publishedAt"));
}

export async function getVideo(videoId: string) {
  return fakeVideos.find((video) => video.id.videoId === videoId) || null;
}

export async function updateVideo(videoId: string, updates: Partial<Video>) {
  const video = await getVideo(videoId);
  if (!video) {
    throw new Error(`No video found for ID: ${videoId}`);
  }
  Object.assign(video, updates);
  return video;
}

export async function deleteVideo(videoId: string) {
  const index = fakeVideos.findIndex((video) => video.id.videoId === videoId);
  if (index === -1) {
    throw new Error(`No video found for ID: ${videoId}`);
  }
  fakeVideos.splice(index, 1);
}
