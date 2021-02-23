const {
  listContacts,
  getContactById,
  addContact,
  removeContacts,
} = require("./contacts.js");

const { program } = require("commander");
program.version("0.0.1");

program
  .version("0.0.1")
  .requiredOption("-a, --action <type>", "Input folder")
  .option("id, --id [type]", "Id contact")
  .option("n, --name [type]", "Name contact")
  .option("e, --email [type]", "Email contact")
  .option("p, --phone [type]", "Phone contact")
  .option("d, --delete", "Delete contact");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact({ name, email, phone });
      break;

    case "remove":
      removeContacts(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
