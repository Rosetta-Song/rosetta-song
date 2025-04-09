////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
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
      .sort(sortBy("-createdAt", "last"));
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
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
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
    first: "Imagine",
    last: "John Lennon",
    avatar: "https://i.scdn.co/image/ab67616d0000b27399581550ef9746ca582bb3cc",
    favorite: false,
    id: "7pKfPomDEeI4TPT6EOYjn9",
    twitter: "Imagine - Remastered 2010"
  },
  {
    first: "Imagínate",
    last: "Danny Ocean, Kapo",
    avatar: "https://i.scdn.co/image/ab67616d0000b2737c8510f493813b5730a6f7ba",
    favorite: false,
    id: "4zbEItKoaRId1vRZkoO0Uh",
    twitter: "Imagínate"
  },
  {
    first: "Imagine - Remembering Lennon 40th Anniversary",
    last: "John Lennon Experience",
    avatar: "https://i.scdn.co/image/ab67616d0000b273fe84759836417d9c41cb9a16",
    favorite: false,
    id: "1jYx1g0BXEqvr9bpZoDMS7",
    twitter: "Imagine"
  },
  {
    first: "LOOM",
    last: "Imagine Dragons",
    avatar: "https://i.scdn.co/image/ab67616d0000b2737eeb115b73e2e6abc3c66d59",
    favorite: false,
    id: "7xDd7gl6AGgpiOz5trz4dM",
    twitter: "Eyes Closed"
  },
  {
    first: "Evolve",
    last: "Imagine Dragons",
    avatar: "https://i.scdn.co/image/ab67616d0000b2735675e83f707f1d7271e5cf8a",
    favorite: false,
    id: "0pqnGHJpmpxLKifKRmU6WP",
    twitter: "Believer"
  },
  {
    first: "Night Visions",
    last: "Imagine Dragons",
    avatar: "https://i.scdn.co/image/ab67616d0000b273407bd04707c463bbb3410737",
    favorite: false,
    id: "5qaEfEh1AtSdrdrByCP7qR",
    twitter: "Demons"
  },
  {
    first: "Origins (Deluxe)",
    last: "Imagine Dragons",
    avatar: "https://i.scdn.co/image/ab67616d0000b273da6f73a25f4c79d0e6b4a8bd",
    favorite: false,
    id: "2FY7b99s15jUprqC0M5NCT",
    twitter: "Natural",
  },
  {
    first: "Imagine",
    last: "Carbonne",
    avatar: "https://i.scdn.co/image/ab67616d0000b273213394bc8b490e9d31feb662",
    favorite: false,
    id: "6IcsbETuviVu6UTiBTcxY4",
    twitter: "Imagine",
  }
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
