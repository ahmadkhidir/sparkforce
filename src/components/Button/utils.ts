export type OnClickType = React.MouseEventHandler<HTMLButtonElement> | undefined

export interface ButtonProps {
    text: string,
    onClick?: OnClickType
}