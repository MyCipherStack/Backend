import { buffer } from "stream/consumers"



export class MulterDTO {

    originalName: string
    mimetype: string
    buffer: Buffer
    size: number

    constructor(data: {
        originalname: string,
        mimetype: string,
        buffer: Buffer,
        size: number,
    }) {
        this.originalName = data.originalname
        this.mimetype = data.mimetype,
        this.buffer = data.buffer,
        this.size = data.size
    }
}