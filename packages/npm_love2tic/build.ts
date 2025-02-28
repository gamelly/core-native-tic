import engineCode from '@gamely/love-engine'  with { type: "text" }
import build from '../../tools/build.ts'

export default function (gameCode) {
    return build(engineCode, gameCode)
}
