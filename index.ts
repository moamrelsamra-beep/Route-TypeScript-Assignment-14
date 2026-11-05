class User {
  protected id: number;
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  private _age: number;

  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this._age = this.validateAge(age);
  }

  private validateAge(age: number): number {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60[cite: 1].");
    }
    return age;
  }

  public get age(): number {
    return this._age;
  }

  public set age(age: number) {
    this._age = this.validateAge(age);
  }

  public displayInfo(): void {
    console.log(`User ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this._age}`);
  }
}

class Admin extends User {
  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    super(id, name, email, password, phone, age);
  }

  public manageNotes(note: Note, action: 'create' | 'update' | 'delete'): void {
    console.log(`Admin ${this.name} performed action '${action}' on note titled '${note.title}'.`);
  }
}

class Note {
  public id: number;
  public title: string;
  public content: string;
  public userId: User;

  constructor(id: number, title: string, content: string, userId: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  public preview(): string {
    const maxLength = 50;
    return this.content.length > maxLength 
      ? this.content.substring(0, maxLength) + "..." 
      : this.content;
  }
}

class NoteBook {
  private notes: Note[] = [];

  public addNote(id: number, title: string, content: string, user: User): Note {
    const newNote = new Note(id, title, content, user);
    this.notes.push(newNote);
    return newNote;
  }

  public removeNote(noteId: number): void {
    this.notes = this.notes.filter(note => note.id !== noteId);
  }

  public getNotes(): Note[] {
    return this.notes;
  }
}

class NoteBookOwner extends User {
  public notebooks: NoteBook[] = [];

  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    super(id, name, email, password, phone, age);
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }
}


class StorageBox<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  public getAllItems(): T[] {
    return this.items;
  }
}




    class User {
      #number id
      +string name
      +string email
      -string password
      +string phone
      -number age
      +displayInfo() void
    }

    class Admin {
      +manageNotes(Note note, string action) void
    }

    class Note {
      +number id
      +string title
      +string content
      +User userId
      +preview() string
    }

    class NoteBook {
      -Note[] notes
      +addNote(...) Note
      +removeNote(number noteId) void
      +getNotes() Note[]
    }

    class Storage~T~ {
      -T[] items
      +addItem(T item) void
      +removeItem(T item) void
      +getAllItems() T[]
    }

    