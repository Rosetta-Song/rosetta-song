////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  name?: string; // first 
  album?: string; // last
  avatar?: string;
  artist?: string; // twitter
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "album"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions

const famousSingers = [
  "Taylor Swift",
  "Beyoncé",
  "Ed Sheeran",
  "Adele",
  "Justin Bieber",
  "Ariana Grande",
  "Drake",
  "Billie Eilish",
  "The Weeknd",
  "Rihanna",
  "Bruno Mars",
  "Lady Gaga",
  "Katy Perry",
  "Shakira",
  "Elton John",
  "Celine Dion",
  "Michael Jackson",
  "Whitney Houston",
  "Madonna",
  "Elvis Presley",
  "Frank Sinatra",
  "Freddie Mercury",
  "John Lennon",
  "Paul McCartney",
  "Bob Dylan",
  "Eminem",
  "Kanye West",
  "Jay-Z",
  "Dua Lipa",
  "Harry Styles",
  "Sam Smith",
  "Selena Gomez",
  "Shawn Mendes",
  "Camila Cabello",
  "Jennifer Lopez",
  "Christina Aguilera",
  "Mariah Carey",
  "Post Malone",
  "Olivia Rodrigo",
  "Doja Cat",
  "Bad Bunny",
  "Karol G",
  "Maluma",
  "J Balvin",
  "Rosalía",
  "Taylor Swift",
  "Lana Del Rey",
  "Sia",
  "Pitbull",
  "Enrique Iglesias",
  "Andrea Bocelli",
];

function getRandomArtist(): string {
  const randomIndex = Math.floor(Math.random() * famousSingers.length);
  return famousSingers[randomIndex];
}



export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["name", "album"],
    });
  }
  return contacts.sort(sortBy("album", "createdAt"));
}

export async function getSpotifyTracks(query?: string | null) {
  
  if (query) {
    console.log(`Fetching from: http://localhost:8084/simple_search?query=${encodeURIComponent(query)}`);
    const response = await fetch(`http://127.0.0.1:8084/simple_search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Spotify tracks: ${response.statusText}`);
    }
  
    const contacts = await response.json();
    return contacts;
  }else {
    const randomArtist = getRandomArtist()
    const response = await fetch(`http://127.0.0.1:8084/simple_search?query=${encodeURIComponent(randomArtist)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Spotify tracks: ${response.statusText}`);
    }
  
    const contacts = await response.json();
    return contacts;
  }
}

export async function getSimpleTrack(id: string) {
  if (!id) {
    throw new Error("Track ID is required");
  }

  const response = await fetch(`http://127.0.0.1:8084/getSimpleTrack?id=${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch track details: ${response.statusText}`);
  }

  const track = await response.json();
  return track;
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}



[
  {
    "avatar": "https://i.scdn.co/image/ab67616d0000b27399581550ef9746ca582bb3cc",
    "name": "Imagine - Remastered 2010",
    "id": "7pKfPomDEeI4TPT6EOYjn9",
    "album": "Imagine",
    "artist": "John Lennon"
  },
  {
    "avatar": "https://i.scdn.co/image/ab67616d0000b2737c8510f493813b5730a6f7ba",
    "name": "Imagínate",
    "id": "4zbEItKoaRId1vRZkoO0Uh",
    "album": "Imagínate",
    "artist": "Danny Ocean, Kapo"
  },
  {
    "avatar": "https://i.scdn.co/image/ab67616d0000b273fe84759836417d9c41cb9a16",
    "name": "Imagine",
    "id": "1jYx1g0BXEqvr9bpZoDMS7",
    "album": "Imagine - Remembering Lennon 40th Anniversary",
    "artist": "John Lennon Experience"
  },
  {
    "avatar": "https://i.scdn.co/image/ab67616d0000b2737eeb115b73e2e6abc3c66d59",
    "name": "Eyes Closed",
    "id": "7xDd7gl6AGgpiOz5trz4dM",
    "album": "LOOM",
    "artist": "Imagine Dragons"
  },
  {
    "avatar": "https://i.scdn.co/image/ab67616d0000b2735675e83f707f1d7271e5cf8a",
    "name": "Believer",
    "id": "0pqnGHJpmpxLKifKRmU6WP",
    "album": "Evolve",
    "artist": "Imagine Dragons"
  },
  {
    "avatar": "https://i.scdn.co/image/ab67616d0000b273407bd04707c463bbb3410737",
    "name": "Demons",
    "id": "5qaEfEh1AtSdrdrByCP7qR",
    "album": "Night Visions",
    "artist": "Imagine Dragons"
  },
  {
    "avatar": "https://i.scdn.co/image/ab67616d0000b273da6f73a25f4c79d0e6b4a8bd",
    "name": "Natural",
    "id": "2FY7b99s15jUprqC0M5NCT",
    "album": "Origins (Deluxe)",
    "artist": "Imagine Dragons"
  },
  {
    "avatar": "https://i.scdn.co/image/ab67616d0000b273213394bc8b490e9d31feb662",
    "name": "Imagine",
    "id": "6IcsbETuviVu6UTiBTcxY4",
    "album": "Imagine",
    "artist": "Carbonne"
  }
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.id}`,
  });
});
