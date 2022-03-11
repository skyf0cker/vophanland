export interface mapInfo {
    layers: Array<layerInfo>
    width: number
    height: number
}

export interface layerInfo {
    data: Array<number>
    objects: Array<objectInfo>
    type: string
}

export interface objectInfo {
    gid: number
    width: number
    height: number
    x: number
    y: number
}

export enum Direction {
    Up = 1,
    Left,
    Right,
    Down,
}

export interface boxAttr {
    x: number,
    y: number,
    openSpeed: number,
}

export interface pos {
    x: number,
    y: number
}

