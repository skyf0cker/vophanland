import * as pixi from 'pixi.js'
import { mapInfo, layerInfo, boxAttr, pos } from './types'

export class TileMap {
    private sheet: pixi.BaseTexture
    private tileset: Array<pixi.Texture> = []
    private mapInfo: mapInfo
    private app: pixi.Application
    private boxes: Map<number, pixi.AnimatedSprite>

    private tileWidth = 16
    private tileHeight = 16
    private sheetItems = 32

    private collisions: Array<pixi.Sprite> = []

    constructor(app: pixi.Application) {
        this.app = app
        this.sheet = pixi.BaseTexture.from(app.loader.resources['basic'].url)
        this.mapInfo = require('../../assets/vophan_home.json')
        this.initTileset()
        this.initBackgroud()
        this.initBoxes()
    }

    initTileset() {
        for (let y: number = 0; y < this.sheetItems; y++) {
            for (let x: number = 0; x < this.sheetItems; x++) {
                const t = new pixi.Texture(
                    this.sheet,
                    new pixi.Rectangle(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight)
                )

                this.tileset.push(t)
            }
        }
    }

    initBackgroud() {
        const w: number = this.mapInfo.width
        const h: number = this.mapInfo.height

        for (let l: number = 0; l < this.mapInfo.layers.length; l++) {
            const layer: layerInfo = this.mapInfo.layers[l]

            // collisions
            if (layer.type == 'objectgroup') {
                for (const obj of layer.objects) {
                    const sprite = new pixi.Sprite(this.tileset[obj.gid - 1])
                    sprite.x = parseInt(obj.x.toFixed())
                    sprite.y = parseInt(obj.y.toFixed()) - obj.height
                    this.app.stage.addChild(sprite)
                    this.collisions.push(sprite)
                }
            }

            if (layer.type != 'tilelayer') {
                continue
            }

            for (let y: number = 0; y < h; y++) {
                for (let x: number = 0; x < w; x++) {
                    const idx: number = layer.data[y * w + x]
                    const sprite: pixi.Sprite = new pixi.Sprite(this.tileset[idx - 1])
                    sprite.x = x * this.tileWidth
                    sprite.y = y * this.tileHeight
                    this.app.stage.addChild(sprite)
                }
            }
        }
    }

    initBoxes() {
        const x1 = 2
        const y1 = 6
        const openSpeed = 0.3

        this.boxes = new Map<number, pixi.AnimatedSprite>()
        const b1 = this.createBox({
            x: x1 * this.tileWidth,
            y: y1 * this.tileHeight,
            openSpeed: openSpeed,
        })

        this.boxes.set(30 * y1 + x1, b1)

        const x2 = 21
        const y2 = 1

        const b2 = this.createBox({
            x: x2 * this.tileWidth,
            y: y2 * this.tileHeight,
            openSpeed: openSpeed,
        })

        this.boxes.set(30 * y2 + x2, b2)

        const x3 = 17
        const y3 = 13

        const b3 = this.createBox({
            x: x3 * this.tileWidth,
            y: y3 * this.tileHeight,
            openSpeed: openSpeed,
        })

        this.boxes.set(30 * y3 + x3, b3)

        this.app.stage.addChild(b1, b2, b3)
    }

    hasBox(p: number): boolean {
        return this.boxes.has(p)
    }

    openBox(pos: number) {
        const box = this.boxes.get(pos)
        box.play()
    }

    createBox(attr: boxAttr): pixi.AnimatedSprite {
        const boxTextures = [
            new pixi.Texture(this.sheet, new pixi.Rectangle(8 * this.tileWidth, 4 * this.tileHeight, 2 * this.tileWidth, 2 * this.tileWidth)),
            new pixi.Texture(this.sheet, new pixi.Rectangle(10 * this.tileWidth, 4 * this.tileHeight, 2 * this.tileWidth, 2 * this.tileWidth)),
            new pixi.Texture(this.sheet, new pixi.Rectangle(12 * this.tileWidth, 4 * this.tileHeight, 2 * this.tileWidth, 2 * this.tileWidth)),
            new pixi.Texture(this.sheet, new pixi.Rectangle(14 * this.tileWidth, 4 * this.tileHeight, 2 * this.tileWidth, 2 * this.tileWidth)),
        ]

        const box = new pixi.AnimatedSprite(boxTextures)
        box.x = attr.x
        box.y = attr.y
        box.width = this.tileWidth * 2
        box.height = this.tileHeight * 2
        box.animationSpeed = attr.openSpeed
        box.loop = false
        box.anchor.set(0.5)

        this.collisions.push(box)
        return box
    }

    isCollision(sprite: pixi.Sprite): boolean {
        const b = sprite.getBounds()

        // wall
        if (b.top < 0 || b.left < 0 || b.bottom > this.tileWidth * 20 || b.right > this.tileWidth * 30) {
            return true
        }

        // collisions
        for (const coll of this.collisions) {
            const cb = coll.getBounds()

            if (b.left < cb.right && b.right > cb.left && b.top < cb.bottom && b.bottom > cb.top) {
                return true
            }
        }

        return false
    }
}
