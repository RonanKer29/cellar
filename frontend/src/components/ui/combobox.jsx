import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Combobox = React.forwardRef(({ 
  options = [], 
  value, 
  onValueChange, 
  placeholder = "Sélectionner...", 
  searchPlaceholder = "Rechercher...",
  emptyText = "Aucune option trouvée.",
  allowCustom = false,
  className,
  ...props 
}, ref) => {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const [inputValue, setInputValue] = React.useState(value || "")

  React.useEffect(() => {
    setInputValue(value || "")
  }, [value])

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSelect = (selectedValue) => {
    setInputValue(selectedValue)
    onValueChange(selectedValue)
    setOpen(false)
    setSearchValue("")
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setSearchValue(newValue)
    
    if (allowCustom) {
      onValueChange(newValue)
    }
    
    if (!open && newValue) {
      setOpen(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => setOpen(false), 200)
  }

  const handleClear = () => {
    setInputValue("")
    setSearchValue("")
    onValueChange("")
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={cn("pr-16", className)}
          {...props}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOpen(!open)}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <ChevronsUpDown className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
          {filteredOptions.length > 0 ? (
            <div className="p-1">
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-gray-100 flex items-center justify-between",
                    value === option.value && "bg-gray-100"
                  )}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-3 text-sm text-gray-500 text-center">
              {allowCustom && searchValue ? (
                <button
                  type="button"
                  onClick={() => handleSelect(searchValue)}
                  className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-gray-100 text-blue-600"
                >
                  Créer "{searchValue}"
                </button>
              ) : (
                emptyText
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
})

Combobox.displayName = "Combobox"

export { Combobox }