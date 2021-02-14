import {BASE_URL} from "./config.js"

export default class fileUpload {
    constructor(file, type) {
        this.BYTES_PER_CHUNK = 10485760
        this.file = file
        this.SIZE = file.size
        this.NUM_CHUNKS = Math.max(Math.ceil(this.SIZE / this.BYTES_PER_CHUNK), 1)
        this.start = 0
        this.end = this.BYTES_PER_CHUNK
        this.num = 1
        this.type = type
        console.log(`Uploading ${this.type}. File size: ${this.SIZE}, ${this.NUM_CHUNKS} chunks`)
    }
    async chunk(blob) {
        console.log(`Uploading chunk ${this.num} of ${this.NUM_CHUNKS}`)
        var fd = new FormData();
        fd.append(this.type, blob, this.file.name);
        fd.append('num', this.num);
        fd.append('num_chunks', this.NUM_CHUNKS);
        const response = await fetch(BASE_URL + "/users/uploadMedia.php", {
            method: "POST",
            body: fd,
            credentials: "include"
        })
        if (response) {
            const response_json = await response.json()
            return response_json
        }
        else {
            return false
        }
    }
    async loop() {
        let chunkRes;
        while (this.start < this.SIZE) {
            var blob = this.file.slice(this.start, this.end)
            chunkRes = await this.chunk(blob)
            if (chunkRes) {
                this.start = this.end;
                this.end = this.start + this.BYTES_PER_CHUNK;
                this.num++
                if (chunkRes.code === "E") {
                    break;
                }
            }
            else {
                return false
            }
        }
        return chunkRes
    }
}
