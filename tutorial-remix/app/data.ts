////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";
import { transformWithEsbuild } from "vite";

type ContactMutation = {
  id?: string;
  activity?: string;
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
    avatar:
      "https://cursos.com/wp-content/uploads/2020/09/saltobase-768x576.jpg.webp",
    first: "Bungee",
    last: "Jumping",
    twitter: "@colombiabungee",
  },
  {
    avatar:
      "https://www.skydivemadrid.es/wp-content/uploads/2021/07/beneficios_del_paracaidismo.jpg",
    first: "Salto",
    last: "Paracaidas",
    twitter: "@aireskydive",
  },
  {
    avatar:
      "https://colombiavuela.com/wp-content/uploads/2023/12/galeria-parapente-medellin-7.webp",
    first: "Volar",
    last: "en Parapente",
    twitter: "@dragonflyparapente",
  },
  {
    avatar:
      "https://www.costaricadiveandsurf.com/wp-content/uploads/2021/10/grupo-de-buzos-en-cueva-1.jpeg",
    first: "Buceo",
    last: "en Cuevas",
    twitter: "@reefshepherd",
  },
  {
    avatar:
      "https://escueladesurflasdunas.com/wp-content/uploads/2023/05/teahupoocylinder.jpg",
    first: "Surf",
    last: "de olas gigantes",
    twitter: "@colombiasurfing",
  },
  {
    avatar:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/22/99/ec/sandboarding.jpg",
    first: "Sandboarding",
    last: "surf en la arena",
    twitter: "@viajes_laguajira",
  },
  {
    avatar:
      "https://imagenes.eltiempo.com/files/image_1200_600/uploads/2018/09/12/5b98a4baee23d.jpeg",
    first: "Rafting",
    last: "en aguas bravas",
    twitter: "@colombiarafting",
  },
  {
    avatar:
      "https://i0.wp.com/justnorth.co/wp-content/uploads/2019/01/Climb-Colombia-1.jpg",
    first: "Climbing",
    last: "escalar montañas",
    twitter: "@just_climb_colombia",
  },
  {
    avatar:
      "https://static.roadtrip.travel/media/roadtrips/canyoning-chirajara-descenso-en-rappel-por-7-cascadas-de-aventura-1200-0eed513.jpg",
    first: "Escalada",
    last: "de cascadas",
    twitter: "@brutaltravel.co",
  },
  {
    avatar:
      "https://cdnx.jumpseller.com/rural-adventure1/image/5300147/Copia_de_IMG_2941.jpg?1609811751",
    first: "Canopy",
    last: "o Tirolesa",
    twitter: "@canopycisneros",
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
