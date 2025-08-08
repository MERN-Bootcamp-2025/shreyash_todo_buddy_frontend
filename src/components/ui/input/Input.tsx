import classNames from 'classnames'
import React from 'react'

interface InputProps extends React.ComponentProps<'input'> {
    label?: string
}

const Input: React.FC<InputProps> = ({ className, type, label, ...props }) => {

    const finalClasses = classNames(className, ` placeholder:text-muted-foreground selection:bg-primary 
        selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md 
        border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] 
        outline-nonedisabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] focus:outline-green-500",
        )

    return (
        <div className='flex flex-col'>
            {label && <label className="mb-2 text-sm font-bold">{label}</label>}
            <input type={type} className={finalClasses} {...props} />
        </div>
    )
}

export { Input }
