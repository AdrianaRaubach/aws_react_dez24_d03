type LabelStok = {
    inStok: boolean
}
export const StokLabel = ({inStok}:LabelStok) => {
    return (
        <p className="border border-bk-100 py-1.5 px-4 font-medium rounded-2xl text-xs text-bk-900 dark:text-w-100"> {inStok? 'IN STOK': 'NO STOK'}</p>
    )
}