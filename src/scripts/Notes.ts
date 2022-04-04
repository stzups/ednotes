import { Note } from "./note/Note.js";
import { Database } from "./database/Database.js";
import { Browser } from "./Browser.js";
import { Editor } from "./Editor.js";

export class Notes {
    database: Database;
    browser: Browser;
    editor: Editor;
    items: Map<ArrayBuffer, Note> = new Map<ArrayBuffer, Note>();
    
    constructor(database: Database, editor: HTMLElement, browser: HTMLElement) {
        this.database = database;
        this.editor = new Editor(editor);
        this.browser = new Browser(
            browser,
            (note: Note) => this.editor.open(note),
            (id: ArrayBuffer) => this.database.removeNote(id),
            (id: ArrayBuffer, note: Note) => this.database.putNote(id, note));
        this.database
            .getNotes()
            .then((notes: Map<ArrayBuffer, Note>) => {
                for (let [id, note] of notes.entries()) {
                    this.browser.add(id, note)
                }
            })
            .catch(() => {
                alert("failed to load notes from db");
            });
    }
    
    /**
     * Add note to database and browser
     */
    async add(note: Note): Promise<void> {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        await this.database.putNote(id, note);
        this.browser.add(id, note);
        this.editor.open(note); 
    }
}
