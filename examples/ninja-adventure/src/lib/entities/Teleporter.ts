import { router } from '$game'
import { Player } from '$lib/Player'
import { CrossFadeTransition, FadeTransition } from 'merlyn/transitions'
import type { ActorArgs } from 'excalibur'

export interface TeleporterArgs extends ActorArgs {
  scene: string
  coordinates: { x: number; y: number }
  facing?: 'left' | 'right' | 'up' | 'down'
}
export class Teleporter extends ex.Actor {
  _scene: string
  coordinates: { x: number; y: number }
  facing?: 'left' | 'right' | 'up' | 'down'
  isNavigating = false

  constructor({ scene, coordinates, facing, ...args }: TeleporterArgs) {
    super({
      width: 16,
      height: 16,
      anchor: new ex.Vector(0, 0),
      ...args,
      // color: ex.Color.Red,
      collisionType: ex.CollisionType.Passive,
    })
    this._scene = scene
    this.coordinates = coordinates
    this.facing = facing
  }

  onInitialize(engine: ex.Engine) {
    super.onInitialize(engine)

    this.on('precollision', (ev) => {
      if (this.isNavigating) {
        return
      }

      if (ev.other.name === 'player') {
        // trigger if player is halfway into the collider
        if (
          Math.abs(ev.intersection.x) > this.width / 2 ||
          Math.abs(ev.intersection.y) > this.height / 2
        ) {
          this.isNavigating = true

          router.goto(this._scene, {
            transition: new FadeTransition({
              persistOnLoading: 200,
            }),
            onActivate: (scene) => {
              this.isNavigating = false

              let player = scene.actors.find(
                (actor) => actor.name === 'player'
              ) as Player

              if (!player) {
                player = new Player({
                  x: this.coordinates.x,
                  y: this.coordinates.y,
                  facing: this.facing,
                })
                scene.engine.add(player)
              } else {
                player.pos = new ex.Vector(
                  this.coordinates.x,
                  this.coordinates.y
                )
                player.updateFacing(this.facing)
              }
            },
          })
        }
      }
    })
  }
}
