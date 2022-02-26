import {Note, Video} from "./video/Video.js";
import {Database} from "./database.js";

const footer = document.getElementsByTagName("footer")[0];
const nav = document.getElementsByTagName("nav")[0];

export class Videos {
    videos: Map<ArrayBuffer, Video> = new Map<ArrayBuffer, Video>();
    database: Database

    constructor(database: Database) {
        this.database = database;
        this.database
            .getVideos()
            .then((videos: Map<ArrayBuffer, Video>) => {
                for (let [id, video] of videos.entries()) {
                    this._addVideo(id, video)
                }
            });
    }

    addVideo(video: Video) {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        this._addVideo(id, video);
        this.database.putVideo(id, video).then();
    }
    _addVideo(id: ArrayBuffer, video: Video) {
        this.videos.set(id, video);
        nav.append(video.createElement(this, id));
    }

    openVideo(video: Video) {
        let main = document.createElement("main");
        main.classList.add("item")

        main.addEventListener("keypress", (e) => {
            console.log(e.key)
            if (e.key === "Escape") {
                e.stopPropagation();
                main.remove();
                nav.style.display = "grid";
            }
        });
        let listener = (e: KeyboardEvent) => {
            if (e.key !== "Escape") { return; }
            e.stopPropagation();
            main.remove();
            nav.style.display = "grid";
            document.removeEventListener("keyup", listener);
        };
        document.addEventListener("keyup", listener)
        {
            let header = document.createElement("header");
            {
                let button = document.createElement("button");
                button.innerText = "x";
                button.addEventListener("click", () => {
                    main.remove();
                    nav.style.display = "grid";
                })
                header.append(button);
            }
            main.append(header);
        }
        {
            main.append(video.getVideo())
        }
        {
            let section = document.createElement("section");
            video.notes.push(Note.create(0))
            video.notes.push(Note.create(1))
            video.notes.push(Note.create(2))
            video.notes.push(Note.create(3))
            for (let note of video.notes) {
                let element = document.createElement("input")
                element.type = "textarea";
                element.value = note.text;
                element.addEventListener("change", () => {
                    console.log("change")
                    note.text = element.value;
                });
                section.append(element);
            }
            {
                let button = document.createElement("button")
                button.innerText = "+";
                button.addEventListener("click", () => {
                    let time = video.getCurrentTime();
                    let index = 0;
                    for (let i = 0; i < video.notes.length; i++) {
                        if (video.notes[i].time < time) {
                            index = i + 1;
                        }
                    }
                    video.notes.splice(index, 0, Note.create(time))
                })
                section.append(button);
            }
            main.append(section);
        }
        document.body.insertBefore(main, footer);
        nav.style.display = "none";
    }

    async removeVideo(id: ArrayBuffer, confirmation: boolean) {
        if (!confirmation && !window.confirm("Delete video?")) { return; }
        this.videos.delete(id);
        await this.database.removeVideo(id);
    }
}