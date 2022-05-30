import { join } from "path";
import { readFile, writeFile, watch, existsSync } from "fs";
import util from 'util';
const readFileASync = util.promisify(readFile);
const writeFileASync = util.promisify(writeFile);

export class DB {

    constructor(path, cb = () => { }) {
        this.path = path;
        this.fileContent = "";
        this.data = {};
        this.setup(cb);
    }

    async setup(cb) {
        if (!this.exists) {
            writeFileASync(this.path, JSON.stringify(defaultDb, null, 2), "utf-8")
        } else await this.read();

        this.watch(cb);
        setInterval(() => {
            if (this.fileContent === JSON.stringify(this.data, null, 2)) return;
            this.write();
        }, 1000)
    }

    get exists() {
        return existsSync(this.path);
    }

    watch(cb) {
        watch(this.path, async (event, filename) => {
            if (event == "change") {
                await this.read();
            }
            cb();
        })
    }


    async read() {
        this.data = JSON.parse(this.fileContent = await readFileASync(this.path, "utf-8"));
    }

    async write() {
        await writeFileASync(this.path, JSON.stringify(this.data, null, 2));
    }

    checkTypes({ score, name, diff, moves }) {
        if (typeof score !== "number"
            || typeof name !== "string"
            || typeof diff !== "number"
            || typeof moves !== "number")
            return false;
        return true
    }

    push({ score, name, diff, moves }) {
        console.log("tries", score, name, diff, moves)
        if (!this.checkTypes({ score, name, diff, moves })) return;

        if (!this.data) this.data = {};
        if (!this.data[diff]) this.data[diff] = {};
        if (!this.data[diff][name]) this.data[diff][name] = [];
        const k = this.data[diff][name];
        console.log("push", score, name, diff, moves)
        // if (k?.find(i => i.score === score)) return;

        this.data[diff][name].push({ score, date: Date.now(), moves });
    }
}