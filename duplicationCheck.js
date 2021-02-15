const duplicationСheck = (contacts, contact) => {
  let duplicatedId = 0;
  let duplicatedName = 0;
  let duplicatedEmail = 0;
  let duplicatedPhone = 0;

  contacts.forEach((item) => {
    if (item.id === contact.id) {
      console.log("This id is already exist");
    }
    if (item.name === contact.name) {
      duplicatedName += 1;
    }
    if (item.email === contact.email) {
      duplicatedEmail += 1;
    }
    if (item.phone === contact.phone) {
      duplicatedPhone += 1;
    }
  });

  if (duplicatedName) {
    console.log(
      `Contact with name: ${contact.name} is already exist and duplicates ${duplicatedName} times`
    );
  }
  if (duplicatedEmail) {
    console.log(
      `Contact with email: ${contact.email} is already exist and duplicates ${duplicatedEmail} times`
    );
  }
  if (duplicatedPhone) {
    console.log(
      `Contact with phone: ${contact.phone} is already exist and duplicates ${duplicatedPhone} times`
    );
  }
  if (duplicatedId) {
    console.log(
      `Contact with id: ${contact.id} is already exist and duplicates ${duplicatedId} times`
    );
  }
};

export default duplicationСheck;
