# PowerShell script to remove 'light:' prefix and fix theme classes
# This script processes all TypeScript/TSX files and removes invalid 'light:' Tailwind prefixes

$files = Get-ChildItem -Path ".\components", ".\app" -Include *.tsx, *.ts -Recurse

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Remove redundant dark: prefixes where we have both default and dark:
    # Pattern: class="...default dark:default..." -> class="...default..."
    
    # Fix common patterns:
    # bg-zinc-950 dark:bg-zinc-950 light:bg-gray-50 -> bg-gray-50 dark:bg-zinc-950
    $content = $content -replace 'bg-zinc-950 dark:bg-zinc-950 light:bg-gray-50', 'bg-gray-50 dark:bg-zinc-950'
    $content = $content -replace 'bg-zinc-900 dark:bg-zinc-900 light:bg-white', 'bg-white dark:bg-zinc-900'
    $content = $content -replace 'bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white/80', 'bg-white/80 dark:bg-zinc-900/80'
    $content = $content -replace 'bg-zinc-900/50 dark:bg-zinc-900/50 light:bg-gray-50', 'bg-gray-50 dark:bg-zinc-900/50'
    $content = $content -replace 'bg-zinc-900/50 dark:bg-zinc-900/50 light:bg-gray-200', 'bg-gray-200 dark:bg-zinc-900/50'
    $content = $content -replace 'bg-zinc-950/50 dark:bg-zinc-950/50 light:bg-gray-100', 'bg-gray-100 dark:bg-zinc-950/50'
    $content = $content -replace 'bg-zinc-950 dark:bg-zinc-950 light:bg-gray-100', 'bg-gray-100 dark:bg-zinc-950'
    $content = $content -replace 'bg-zinc-800 dark:bg-zinc-800 light:bg-gray-100', 'bg-gray-100 dark:bg-zinc-800'
    $content = $content -replace 'bg-zinc-800 dark:bg-zinc-800 light:bg-gray-200', 'bg-gray-200 dark:bg-zinc-800'
    $content = $content -replace 'bg-zinc-800/50 dark:bg-zinc-800/50 light:bg-gray-100', 'bg-gray-100 dark:bg-zinc-800/50'
    
    # Fix text colors
    $content = $content -replace 'text-white dark:text-white light:text-gray-900', 'text-gray-900 dark:text-white'
    $content = $content -replace 'text-zinc-100 dark:text-zinc-100 light:text-gray-900', 'text-gray-900 dark:text-zinc-100'
    $content = $content -replace 'text-zinc-400 dark:text-zinc-400 light:text-gray-600', 'text-gray-600 dark:text-zinc-400'
    $content = $content -replace 'text-zinc-500 dark:text-zinc-500 light:text-gray-400', 'text-gray-400 dark:text-zinc-500'
    $content = $content -replace 'text-zinc-600 dark:text-zinc-600 light:text-gray-500', 'text-gray-500 dark:text-zinc-600'
    $content = $content -replace 'text-zinc-700 dark:text-zinc-700 light:text-gray-400', 'text-gray-400 dark:text-zinc-700'
    $content = $content -replace 'text-zinc-300 dark:text-zinc-300 light:text-gray-700', 'text-gray-700 dark:text-zinc-300'
    $content = $content -replace 'text-zinc-950 dark:text-zinc-950 light:text-white', 'text-white dark:text-zinc-950'
    
    # Fix border colors  
    $content = $content -replace 'border-white/10 dark:border-white/10 light:border-gray-300', 'border-gray-300 dark:border-white/10'
    $content = $content -replace 'border-white/5 dark:border-white/5 light:border-gray-200', 'border-gray-200 dark:border-white/5'
    $content = $content -replace 'border-white/5 dark:border-white/5 light:border-gray-300', 'border-gray-300 dark:border-white/5'
    
    # Fix placeholder colors
    $content = $content -replace 'placeholder-zinc-500 dark:placeholder-zinc-500 light:placeholder-gray-400', 'placeholder-gray-400 dark:placeholder-zinc-500'
    
    # Fix hover colors
    $content = $content -replace 'hover:bg-zinc-700 dark:hover:bg-zinc-700 light:hover:bg-gray-200', 'hover:bg-gray-200 dark:hover:bg-zinc-700'
    $content = $content -replace 'hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-gray-200', 'hover:bg-gray-200 dark:hover:bg-zinc-800'
    $content = $content -replace 'hover:bg-zinc-200 dark:hover:bg-zinc-200 light:hover:bg-indigo-700', 'hover:bg-indigo-700 dark:hover:bg-zinc-200'
    $content = $content -replace 'hover:text-white dark:hover:text-white light:hover:text-gray-900', 'hover:text-gray-900 dark:hover:text-white'
    $content = $content -replace 'hover:border-white/10 dark:hover:border-white/10 light:hover:border-gray-400', 'hover:border-gray-400 dark:hover:border-white/10'
    
    # Fix gradients
    $content = $content -replace 'from-white via-zinc-200 to-zinc-400 dark:from-white dark:via-zinc-200 dark:to-zinc-400 light:from-gray-900 light:via-gray-700 light:to-gray-500', 'from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400'
    
    # Fix button states
    $content = $content -replace "bg-white dark:bg-white light:bg-indigo-600", "bg-indigo-600 dark:bg-white"
    $content = $content -replace "text-zinc-950 dark:text-zinc-950 light:text-white", "text-white dark:text-zinc-950"
    $content = $content -replace "text-zinc-600 dark:text-zinc-600 light:text-gray-400", "text-gray-400 dark:text-zinc-600"
    $content = $content -replace "text-zinc-500 dark:text-zinc-500 light:text-gray-400", "text-gray-400 dark:text-zinc-500"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  Updated!" -ForegroundColor Green
    } else {
        Write-Host "  No changes needed" -ForegroundColor Gray
    }
}

Write-Host "`nDone! All files processed." -ForegroundColor Cyan
