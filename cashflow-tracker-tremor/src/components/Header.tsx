import { Download, Upload } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onImport?: (data: unknown) => void;
  onExport?: () => void;
}

export default function Header({ onImport, onExport }: HeaderProps) {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            onImport?.(data);
          } catch (error) {
            console.error('Fehler beim JSON-Import:', error);
            alert('Ungültige JSON-Datei!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportClick = () => {
    onExport?.();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <span className="text-xl font-bold text-white">₿</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cashflow Tracker
            </h1>
            <p className="text-xs text-zinc-400">Version 2.0</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportClick}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Import</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportClick}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
