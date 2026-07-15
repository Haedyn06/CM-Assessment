import { auth, currentUser } from "@clerk/nextjs/server";
import { promises as fs } from "fs";
import path from "path";

export type ContactSubmission = {
  userID: string;
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  message: string;
  submittedAt: string;
};

const CONTACTS_PATH = path.join(process.cwd(), "data", "contacts.json");

async function readContacts(): Promise<ContactSubmission[]> {
  try {
    const raw = await fs.readFile(CONTACTS_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ContactSubmission[]) : [];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const userID =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress;

  if (!userID) {
    return Response.json(
      { error: "No email on Clerk session" },
      { status: 400 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const firstName = String(payload.firstName ?? "").trim();
  const lastName = String(payload.lastName ?? "").trim();
  const company = String(payload.company ?? "").trim();
  const website = String(payload.website ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!firstName || !lastName) {
    return Response.json(
      { error: "First name and last name are required" },
      { status: 400 },
    );
  }

  const entry: ContactSubmission = {
    userID,
    firstName,
    lastName,
    company,
    website,
    message,
    submittedAt: new Date().toISOString(),
  };

  const contacts = await readContacts();
  contacts.push(entry);

  await fs.mkdir(path.dirname(CONTACTS_PATH), { recursive: true });
  await fs.writeFile(CONTACTS_PATH, `${JSON.stringify(contacts, null, 2)}\n`, "utf8");

  return Response.json({ ok: true, entry }, { status: 201 });
}
