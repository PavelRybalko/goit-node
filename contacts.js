import * as fs from "fs/promises";
import path from "path";
import shortId from "shortid";
import handleError from "./handleerror.js";
import duplicationCheck from "./duplicationCheck.js";
import createDirname from "./dirname.js";

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(__dirname, "./db/contacts.json");

export async function listContacts() {
  try {
    const contacts = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data.toString()));

    console.table(contacts);
  } catch (err) {
    handleError(err);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const result = contacts.find((contact) => contact.id === Number(contactId));

    console.table(result);
    console.log("The contact has been found");
  } catch (err) {
    handleError(err);
  }
}

export async function removeContacts(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const result = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(result));

    console.table(result);
    console.log("The contact has been deleted!");
  } catch (err) {
    handleError(err);
  }
}

export async function addContact(contact) {
  try {
    contact.id = shortId();
    const contacts = await fs
      .readFile(contactsPath, "utf8")
      .then((data) => JSON.parse(data));

    duplicationCheck(contacts, contact);
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    console.table(contacts);
    console.log("The contact has been added");
  } catch (error) {
    handleError(error);
  }
}
