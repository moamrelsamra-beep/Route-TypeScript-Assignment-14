export {}; 



// ---------- Base Class ----------
class User {
  protected id: number;
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  private _age!: number;

  // Aggregation
  // outside and can exist without the user.
  protected notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age; 
  }

  // age must be between 18 and 60
  get age(): number {
    return this._age;
  }
  set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = value;
  }

  getId(): number {
    return this.id;
  }

  // ---------- Aggregation ----------
  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  getNotebooks(): NoteBook[] {
    return this.notebooks;
  }

  displayInfo(): void {
    console.log(
      `User Info -> ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, ` +
        `Phone: ${this.phone}, Age: ${this.age}`
    );
  }
}

// ---------- Inheritance----------
class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    super(id, name, email, password, phone, age);
  }

  // Admin can delete any note in any notebook
  manageNotes(notebook: NoteBook, noteId: number): void {
    console.log(`Admin ${this.name} is managing notes...`);
    notebook.removeNote(noteId);
  }

  // Override to show the role
  displayInfo(): void {
    super.displayInfo();
    console.log("Role: Admin");
  }
}

// ----------  Association ----------
class Note {
  public id: number;
  public title: string;
  public content: string;
  public author: User; // the user who created the note

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  get userId(): number {
    return this.author.getId();
  }

  // short preview of the content (first 20 characters)
  preview(length: number = 20): string {
    return this.content.length > length
      ? this.content.substring(0, length) + "..."
      : this.content;
  }
}

// ----------  Composition ----------
class NoteBook {
  public id: number;
  public name: string;
  // Notes are created INSIDE the notebook and die with it (composition)
  private notes: Note[] = [];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  addNote(id: number, title: string, content: string, author: User): Note {
    const note = new Note(id, title, content, author);
    this.notes.push(note);
    return note;
  }

  removeNote(noteId: number): void {
    const before = this.notes.length;
    this.notes = this.notes.filter((n) => n.id !== noteId);
    console.log(
      before === this.notes.length
        ? `Note ${noteId} not found`
        : `Note ${noteId} removed`
    );
  }

  getNotes(): Note[] {
    return this.notes;
  }
}

// ---------- 7. Generics: DataStorage<T> ----------
class DataStorage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

// ============================================================
// Demo
// ============================================================
const user = new User(1, "Ahmed", "ahmed@mail.com", "pass123", "01012345678", 25);
const admin = new Admin(2, "Sara", "sara@mail.com", "admin123", "01098765432", 30);

user.displayInfo();
admin.displayInfo();

const notebook = new NoteBook(1, "Work");
user.addNotebook(notebook); // aggregation

notebook.addNote(1, "Meeting", "Discuss the project deadline with the team", user);
notebook.addNote(2, "Todo", "Buy milk", user);

notebook.getNotes().forEach((n) =>
  console.log(`#${n.id} ${n.title} (by user ${n.userId}): ${n.preview()}`)
);

admin.manageNotes(notebook, 2);

const noteStorage = new DataStorage<Note>();
notebook.getNotes().forEach((n) => noteStorage.addItem(n));
console.log("Stored notes:", noteStorage.getAllItems().length);

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.removeItem(10);
console.log(numberStorage.getAllItems()); // [20]

// Validation test (throws): new User(3, "X", "x@mail.com", "1", "0", 70);