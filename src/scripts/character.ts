import * as pixi from 'pixi.js'

export class Character {
    private app: pixi.Application
    private actionSheets: any = {}
    private char: pixi.AnimatedSprite

    private tileSize = 16
    private speed: number = 4;

    constructor(app: pixi.Application) {
        this.app = app
        this.initCharacter()
    }

    initCharacter() {
        const ssheet = pixi.BaseTexture.from(this.app.loader.resources['basic'].url)

        let w = this.tileSize
        let h = this.tileSize

        this.actionSheets['standRight'] = [
            new pixi.Texture(ssheet, new pixi.Rectangle(0, 20 * h, 2 * w, 2 * h))
        ]

        this.actionSheets['standLeft'] = [
            new pixi.Texture(ssheet, new pixi.Rectangle(0, 18 * h, 2 * w, 2 * h))
        ]

        this.actionSheets['standUp'] = [
            new pixi.Texture(ssheet, new pixi.Rectangle(0, 22 * h, 2 * w, 2 * h))
        ]

        this.actionSheets['standDown'] = [
            new pixi.Texture(ssheet, new pixi.Rectangle(0, 16 * h, 2 * w, 2 * h))
        ]

        this.actionSheets['walkRight'] = [
            new pixi.Texture(ssheet, new pixi.Rectangle(0, 20 * h, 2 * w, 2 * h)),
            new pixi.Texture(ssheet, new pixi.Rectangle(2 * w, 20 * h, 2 * w, 2 * h)),
            new pixi.Texture(ssheet, new pixi.Rectangle(4 * w, 20 * h, 2 * w, 2 * h)),
        ]

        this.actionSheets['walkLeft'] = [
            new pixi.Texture(ssheet, new pixi.Rectangle(0, 18 * h, 2 * w, 2 * h)),
            new pixi.Texture(ssheet, new pixi.Rectangle(2 * w, 18 * h, 2 * w, 2 * h)),
            new pixi.Texture(ssheet, new pixi.Rectangle(4 * w, 18 * h, 2 * w, 2 * h)),
        ]

        this.actionSheets['walkUp'] = [
            new pixi.Texture(ssheet, new pixi.Rectangle(0, 22 * h, 2 * w, 2 * h)),
            new pixi.Texture(ssheet, new pixi.Rectangle(2 * w, 22 * h, 2 * w, 2 * h)),
            new pixi.Texture(ssheet, new pixi.Rectangle(4 * w, 22 * h, 2 * w, 2 * h)),
        ]

        this.actionSheets['walkDown'] = [
            new pixi.Texture(ssheet, new pixi.Rectangle(0, 16 * h, 2 * w, 2 * h)),
            new pixi.Texture(ssheet, new pixi.Rectangle(2 * w, 16 * h, 2 * w, 2 * h)),
            new pixi.Texture(ssheet, new pixi.Rectangle(4 * w, 16 * h, 2 * w, 2 * h)),
        ]

        const char = new pixi.AnimatedSprite(this.actionSheets.standDown)
        char.x = this.tileSize * 4
        char.y = this.tileSize * 4
        char.width = this.tileSize * 2
        char.height = this.tileSize * 2
        char.loop = false
        char.anchor.set(0.5)
        char.animationSpeed = 0.3

        this.app.stage.addChild(char)
        this.char = char
        char.play()
    }

    isPlaying(): boolean {
        return this.char?.playing
    }

    walkRight(isWalkable: (sprite: pixi.Sprite) => any): [number, number] {
        if (!this.isPlaying()) {
            this.char.textures = this.actionSheets.walkRight
            this.char.play()
        }

        this.char.position.x += this.speed
        if (!isWalkable(this.char)) {
            this.char.position.x -= this.speed
        }

        return [this.char.position.x, this.char.position.y]
    }

    walkLeft(isWalkable: (sprite: pixi.Sprite) => any): [number, number] {
        if (!this.isPlaying()) {
            this.char.textures = this.actionSheets.walkLeft
            this.char.play()
        }

        this.char.position.x -= this.speed
        if (!isWalkable(this.char)) {
            this.char.position.x += this.speed
        }

        return [this.char.position.x, this.char.position.y]
    }

    walkUp(isWalkable: (sprite: pixi.Sprite) => any): [number, number] {
        if (!this.isPlaying()) {
            this.char.textures = this.actionSheets.walkUp
            this.char.play()
        }

        this.char.position.y -= this.speed
        if (!isWalkable(this.char)) {
            this.char.position.y += this.speed
        }

        return [this.char.position.x, this.char.position.y]
    }

    walkDown(isWalkable: (sprite: pixi.Sprite) => any): [number, number] {
        if (!this.isPlaying()) {
            this.char.textures = this.actionSheets.walkDown
            this.char.play()
        }

        this.char.position.y += this.speed
        if (!isWalkable(this.char)) {
            this.char.position.y -= this.speed
        }

        return [this.char.position.x, this.char.position.y]
    }
}
