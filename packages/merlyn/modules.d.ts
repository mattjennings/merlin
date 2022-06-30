declare module '$game' {
  // import type { Devtool } from '@excaliburjs/dev-tools'
  import type { Engine, Loadable, Scene } from 'excalibur'
  import { Loader } from 'merlyn'

  export const engine: Engine
  export const loader: Loader

  export const isBooting: boolean
  export const isTransitioning: boolean

  export function addResource<T extends Loadable<any>>(
    url: string,
    options?: any
  ): T
  export function addResourceLoaders(
    loaders: Record<string, (url: string) => Loadable<any>>
  )
  export function getResources(): Loadable<any>[]

  export function goToScene<Data = any>(
    key: string,
    options?: {
      data?: Data | Promise<Data>
      transition?: Transition

      /**
       * Called when the target scene is activated
       */
      onActivate?: (scene: Scene) => void
    }
  ): Promise<Scene>
  // export const devtool: Devtool
}

/* -------------------------------------------------------------------------- */
/*                             resource extensions                            */
/* -------------------------------------------------------------------------- */
declare module '$res/*.tmx' {
  import type { TiledMapResource } from '@excaliburjs/plugin-tiled'
  const value: TiledMapResource
  export default value
}

declare module '$res/*.png' {
  const value: ex.ImageSource
  export default value
}
declare module '$res/*.jpeg' {
  const value: ex.ImageSource
  export default value
}
declare module '$res/*.jpg' {
  const value: ex.ImageSource
  export default value
}
declare module '$res/*.gif' {
  const value: ex.ImageSource
  export default value
}
declare module '$res/*.mp3' {
  const value: ex.Sound
  export default value
}
declare module '$res/*.ogg' {
  const value: ex.Sound
  export default value
}
declare module '$res/*.wav' {
  const value: ex.Sound
  export default value
}

// fallback to any for unknown resource
declare module '$res/*'