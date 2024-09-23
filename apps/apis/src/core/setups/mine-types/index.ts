import otherTypes from './types/other'
import standardTypes from './types/standard'
import Mime from './mine-types.setup'

export { default as Mime } from './mine-types.setup'
export default new Mime(standardTypes, otherTypes)._freeze()
