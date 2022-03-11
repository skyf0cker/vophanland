import * as pixi from 'pixi.js'
import { TileMap } from './map'
import { Character } from './character'

function main() {
    let app = new pixi.Application({
        width: 30 * 16,
        height: 20 * 16,
    })
    document.querySelector('#game').appendChild(app.view)
    document.getElementById('hint').style.visibility = 'hidden'

    app.loader.
        add('basic', 'assets/basictiles.png').
        load()

    app.loader.onLoad.add(() => {
        const map: TileMap = new TileMap(app)
        const char: Character = new Character(app)

        window.addEventListener('keydown', (key) => {
            if (key.keyCode == 39 || key.keyCode == 38 || key.keyCode == 40 || key.keyCode == 37) {
                document.getElementById('hint').style.visibility = 'visible'
            }

            let x, y: number

            if (key.keyCode == 76) {
                [x, y] = char.walkRight((s: pixi.Sprite) => {
                    return !map.isCollision(s)
                })
            } else if (key.keyCode == 75) {
                [x, y] = char.walkUp((s: pixi.Sprite) => {
                    return !map.isCollision(s)
                })
            } else if (key.keyCode == 72) {
                [x, y] = char.walkLeft((s: pixi.Sprite) => {
                    return !map.isCollision(s)
                })
            } else if (key.keyCode == 74) {
                [x, y] = char.walkDown((s: pixi.Sprite) => {
                    return !map.isCollision(s)
                })
            }

            const rx = Math.floor(x / 16)
            const ry = Math.floor(y / 16)

            const tileIdx = 30 * (ry - 2) + rx
            if (map.hasBox(tileIdx)) {
                map.openBox(tileIdx)
            }

            if ((rx == 1 || rx == 2) && (ry == 8 || ry == 7)) {
                window.location.href = 'https://github.com/skyf0cker'
            } else if (rx == 21 && ry == 3) {
                window.location.href = 'https://twitter.com/vophanlee'
            } else if (rx == 17 && ry == 15) {
                document.getElementById('info').style.visibility = 'visible'
            } else if (rx == 25 && ry == 18) {
                window.location.href = 'https://github.com/cherry-ym'
            }
        })

        app.ticker.add(function() {

        })
    })
}


main()
