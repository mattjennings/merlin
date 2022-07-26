import type { Engine } from 'excalibur'
import { Color, Scene, ScreenElement } from 'excalibur'
import { ProgressBar } from './ProgressBar.js'

export class DefaultLoader extends Scene {
  progressBar: ProgressBar
  elapsedTime = 0
  complete = false

  onInitialize(engine: Engine) {
    const fontSize = {
      sm: Math.max(engine.drawHeight, engine.drawWidth) / 28,
      lg: Math.max(engine.drawHeight, engine.drawWidth) / 10,
    }

    engine.add(
      new ScreenElement({
        x: 0,
        y: 0,
        width: engine.drawWidth,
        height: engine.drawHeight,
        color: Color.fromHex('#334155'),
      })
    )

    this.progressBar = new ProgressBar({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2,
      width: engine.drawWidth * 0.5,
      height: Math.round(fontSize.sm),
    })
    engine.add(this.progressBar)
  }

  onActivate() {}

  onLoadStart() {
    this.progressBar.progress = 0
  }

  onLoad(progress: number) {
    this.progressBar.progress = progress
  }

  onPreUpdate(_, delta) {
    this.elapsedTime += delta
  }
}
