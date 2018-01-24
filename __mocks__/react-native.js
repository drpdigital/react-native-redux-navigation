const noop = () => {}

export const Platform = {}
export const Animated = {
  Value: noop
}
export const StyleSheet = { create: () => ({}) }
export const Easing = { inOut: noop }
export const ViewPropTypes = { style: noop }
export const NativeModules = {}
export const View = () => ''
export const Text = () => ''
Text.propTypes = { style: noop }

export const BackHandler = {
  addEventListener: noop
}
