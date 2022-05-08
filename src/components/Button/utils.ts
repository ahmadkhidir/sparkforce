export type OnClickType = Function | string | undefined

export interface ButtonProps {
    text: string,
    onClick?: OnClickType
}