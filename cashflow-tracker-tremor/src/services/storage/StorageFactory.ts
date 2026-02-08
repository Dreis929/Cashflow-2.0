import { IStorageAdapter } from './IStorageAdapter';
import { LocalStorageAdapter } from './LocalStorageAdapter';

type StorageProvider = 'local' | 'supabase' | 'firebase';

export class StorageFactory {
  private static instance: IStorageAdapter | null = null;
  
  static getAdapter(provider?: StorageProvider): IStorageAdapter {
    if (this.instance) return this.instance;
    
    // Provider aus Environment oder Config
    const selectedProvider = provider || 
      (import.meta.env.VITE_STORAGE_PROVIDER as StorageProvider) || 
      'local';
    
    switch (selectedProvider) {
      case 'supabase':
        // Nur laden wenn Credentials vorhanden
        if (import.meta.env.VITE_SUPABASE_URL) {
          console.log('✅ Using Supabase Storage (TODO: Implementierung folgt)');
          // TODO: this.instance = new SupabaseAdapter();
          console.warn('⚠️ Supabase noch nicht implementiert, falling back to LocalStorage');
          this.instance = new LocalStorageAdapter();
        } else {
          console.warn('⚠️ Supabase credentials missing, falling back to LocalStorage');
          this.instance = new LocalStorageAdapter();
        }
        break;
        
      case 'firebase':
        if (import.meta.env.VITE_FIREBASE_API_KEY) {
          console.log('✅ Using Firebase Storage (TODO: Implementierung folgt)');
          // TODO: this.instance = new FirebaseAdapter();
          console.warn('⚠️ Firebase noch nicht implementiert, falling back to LocalStorage');
          this.instance = new LocalStorageAdapter();
        } else {
          console.warn('⚠️ Firebase credentials missing, falling back to LocalStorage');
          this.instance = new LocalStorageAdapter();
        }
        break;
        
      default:
        this.instance = new LocalStorageAdapter();
        console.log('✅ Using LocalStorage (Offline-Only)');
    }
    
    return this.instance;
  }
  
  // Zum Wechseln des Providers zur Laufzeit
  static switchProvider(provider: StorageProvider): void {
    this.instance = null;
    this.getAdapter(provider);
  }
  
  // Reset für Tests
  static reset(): void {
    this.instance = null;
  }
}
