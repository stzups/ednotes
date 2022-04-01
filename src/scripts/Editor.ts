import {Note} from "./note/Note.js";

export class Editor {
    element: HTMLElement;
    note: Note | null = null;
    
    constructor(element: HTMLElement) {
        this.element = element;
    }
    
    open(note: Note) {
        if (this.note !== null) {
            this.close();
        }
        this.note = note;
        console.log("open note " + note);
    }
    
    close() {
        if (this.note === null) {
            console.warn("tried to close when there is no note to close");
        }
        this.note = null;
    }
}
/*
function close() {
    main.remove();
    onclose();
}
let main = document.createElement("main");
main.classList.add("item")

main.addEventListener("keypress", (e) => {
    if (e.key === "Escape") {
        e.stopPropagation();
        main.remove();
        close();
    }
});
let listener = (e: KeyboardEvent) => {
    if (e.key !== "Escape") { return; }
    e.stopPropagation();
    close();
    document.removeEventListener("keyup", listener);
};
document.addEventListener("keyup", listener)
{
    let header = document.createElement("header");
    {
        let button = document.createElement("button");
        button.innerText = "x";
        button.title = "Close (Escape)";
        button.addEventListener("click", () => close());
        header.append(button);
    }
    main.append(header);
}
{
    main.append(this.getVideo())
}
{
    let section = document.createElement("section");
    main.append(section);
    this.notes.push(Note.create(0))
    // this.notes.push(Note.create(1))
    // this.notes.push(Note.create(2))
    // this.notes.push(Note.create(3))
    for (let note of this.notes) {
        let element = document.createElement("textarea")
        section.append(element);
        //element.type = "textarea";
        element.value = note.text;
        element.addEventListener("change", () => {
            console.log("change")
            note.text = element.value;
        });
    }

    
    {
        let button = document.createElement("button")
        section.append(button);
        button.innerText = "+";
        button.addEventListener("click", () => {
            let time = this.getCurrentTime();
            let index = 0;
            for (let i = 0; i < this.notes.length; i++) {
                if (this.notes[i].time < time) {
                    index = i + 1;
                }
            }
            this.notes.splice(index, 0, Note.create(time));
        })

    }
}
*/