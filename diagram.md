classDiagram
    class User {
        #id: number
        +name: string
        +email: string
        -password: string
        +phone: string
        -age: number
        #notebooks: NoteBook[]
        +getId() number
        +addNotebook(notebook: NoteBook) void
        +getNotebooks() NoteBook[]
        +displayInfo() void
    }

    class Admin {
        +manageNotes(notebook: NoteBook, noteId: number) void
        +displayInfo() void
    }

    class Note {
        +id: number
        +title: string
        +content: string
        +author: User
        +userId: number
        +preview(length: number) string
    }

    class NoteBook {
        +id: number
        +name: string
        -notes: Note[]
        +addNote(id, title, content, author) Note
        +removeNote(noteId: number) void
        +getNotes() Note[]
    }

    class Storage~T~ {
        -items: T[]
        +addItem(item: T) void
        +removeItem(item: T) void
        +getAllItems() T[]
    }

    User <|-- Admin : Inheritance
    NoteBook "1" *-- "0..*" Note : Composition
    User "1" o-- "0..*" NoteBook : Aggregation
    Note "0..*" --> "1" User : Association (author)
    Storage~T~ ..> Note : stores any type T