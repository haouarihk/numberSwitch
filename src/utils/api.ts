import socketClient from "socket.io-client"
import type { DBType } from "../d/types";

import { turnDiffToNumber } from "."

let data: DBType = {}

let sortingAlg = (a: any, b: any) => a.score - b.score

const socket = socketClient();
socket.connect();

socket.on("connect", () => {
    fetchUp();
    console.log("connected")
});

let fetchedBefore = false;
let isFetching = false;
async function fetchUp() {
    if (isFetching) return;
    isFetching = true;
    const response = await fetch("/db.json", {
        method: "GET",
        headers: {
            'cache-control': 'no-cache'
        }
    });
    data = { ...await response.json() };
    isFetching = false; fetchedBefore = true;
}


socket.on("change", fetchUp)
// socket.emit("ready")

export async function getLeaderBoard(diff: number, showOnlyHigh: boolean = false) {
    try {


        if (!fetchedBefore)
            await fetchUp();



        const myArr = [];
        for (const name in data[diff])
            if (showOnlyHigh) {
                const k = data[diff][name].sort(sortingAlg);
                if (k?.length > 0)
                    myArr.push({ name, ...k?.[0] })
            } else {
                data[diff][name]?.forEach(item => {
                    myArr.push({ name, ...item })
                })
            }


        return myArr?.sort(sortingAlg)
    } catch (err) {
        console.error(err)
        return []
    }
}

export async function getEachLeaderBoardSize(showOnlyHigh: boolean = false) {
    let myArr: { diff: number, length: number }[] = [];
    for (const diff in data) {
        myArr.push({ diff: Number(diff), length: (await getLeaderBoard(Number(diff) || 1, showOnlyHigh)).length })
    }
    return myArr
}


export async function getHighScoreOf(name: string, diff: number) {
    if (!fetchedBefore)
        await fetchUp();
    return data?.[diff]?.[name]?.sort(sortingAlg)[0]?.score;
}

export async function getMySpot(name: string, diff: number) {
    if (!fetchedBefore)
        await fetchUp();
    const index = (await getLeaderBoard(diff)).findIndex(item => item.name === name)
    return index === -1 ? null : index + 1
}


export async function getHighScore(diff: number) {
    if (!fetchedBefore)
        await fetchUp();
    return (await getLeaderBoard(diff, true))?.[0]?.score;
}



export async function submitScore(name: string, score: number, moves: number, diff: number) {
    const highscore = await getHighScoreOf(name, diff);
    if (typeof highscore != 'undefined' && highscore < score) return;
    socket.emit("submitScore", { name, score, diff: turnDiffToNumber(diff), moves })
}

export function onChange(callback: (data: DBType) => void) {
    socket.on("change", callback)
}


