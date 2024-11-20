interface ToggleProps {
    isPublisher: boolean
    onToggle: () => void
  }
  
  export function Toggle({ isPublisher, onToggle }: ToggleProps) {
    return (
      <div className="flex flex-col space-y-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          I am a:
        </label>
        <div className="flex rounded-xl p-1 bg-gray-100 dark:bg-gray-700/50">
          <button
            onClick={onToggle}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium
                       transition-all duration-300 ease-in-out
                       ${!isPublisher 
                         ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                         : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                       }`}
          >
            Content Consumer
          </button>
          <button
            onClick={onToggle}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium
                       transition-all duration-300 ease-in-out
                       ${isPublisher 
                         ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                         : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                       }`}
          >
            Content Publisher
          </button>
        </div>
      </div>
    )
  }