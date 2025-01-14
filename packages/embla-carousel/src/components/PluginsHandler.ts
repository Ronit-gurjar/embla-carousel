import { EmblaCarouselType } from './EmblaCarousel'
import { OptionsHandlerType } from './OptionsHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'

export type PluginsHandlerType = {
  init: (
    plugins: EmblaPluginType[],
    embla: EmblaCarouselType
  ) => EmblaPluginsType
  destroy: () => void
}

export function PluginsHandler(
  optionsHandler: OptionsHandlerType
): PluginsHandlerType {
  let activePlugins: EmblaPluginType[] = []

  function init(
    plugins: EmblaPluginType[],
    emblaApi: EmblaCarouselType
  ): EmblaPluginsType {
    activePlugins = plugins.filter(
      ({ options }) => optionsHandler.optionsAtMedia(options).active !== false
    )
    activePlugins.forEach((plugin) => plugin.init(emblaApi, optionsHandler))

    return plugins.reduce(
      (map, plugin) => Object.assign(map, { [plugin.name]: plugin }),
      {}
    )
  }

  function destroy(): void {
    activePlugins = activePlugins.filter((plugin) => plugin.destroy())
  }

  const self: PluginsHandlerType = {
    init,
    destroy
  }
  return self
}
