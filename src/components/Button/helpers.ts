import { OnClickType } from "./utils"

export const handleClick = (onClick: OnClickType) => {
    if  (onClick === undefined) return undefined
    if (typeof onClick === "string") {
        return alert(onClick)
    } else {
        return onClick()
    }
}