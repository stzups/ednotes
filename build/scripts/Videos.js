export class Videos {
    videos = new Map();
    database;
    element;
    before;
    constructor(database, element, before) {
        this.database = database;
        this.database
            .getVideos()
            .then((videos) => {
            for (let [id, video] of videos.entries()) {
                this._addVideo(id, video);
            }
        });
        this.element = element;
        this.before = before;
    }
    addVideo(video) {
        let id = new Uint8Array(4);
        window.crypto.getRandomValues(id);
        this._addVideo(id, video);
        this.database.putVideo(id, video).then();
    }
    _addVideo(id, video) {
        this.videos.set(id, video);
        this.element.append(video.createThumbnailElement(() => this.openVideo(video), () => this.removeVideo(id), () => this.updateVideo(id, video)));
    }
    openVideo(video) {
        document.body.insertBefore(video.createElement(() => { this.element.style.display = "grid"; }), this.before);
        this.element.style.display = "none";
    }
    async removeVideo(id) {
        this.videos.delete(id);
        await this.database.removeVideo(id);
    }
    async updateVideo(id, video) {
        await this.database.putVideo(id, video);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlkZW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvVmlkZW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sT0FBTyxNQUFNO0lBQ2YsTUFBTSxHQUE0QixJQUFJLEdBQUcsRUFBc0IsQ0FBQztJQUNoRSxRQUFRLENBQVU7SUFDbEIsT0FBTyxDQUFhO0lBQ3BCLE1BQU0sQ0FBUztJQUVmLFlBQVksUUFBa0IsRUFBRSxPQUFvQixFQUFFLE1BQWU7UUFDakUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVE7YUFDUixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsQ0FBQyxNQUErQixFQUFFLEVBQUU7WUFDdEMsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7YUFDNUI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBWTtRQUNqQixJQUFJLEVBQUUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUNELFNBQVMsQ0FBQyxFQUFlLEVBQUUsS0FBWTtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUM1QyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUMzQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUMxQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FDcEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFZO1FBQ2xCLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQWU7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFlLEVBQUUsS0FBWTtRQUMzQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0oifQ==