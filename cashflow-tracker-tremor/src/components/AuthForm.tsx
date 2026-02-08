import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: 'Willkommen zurück!',
          description: `Erfolgreich eingeloggt als ${data.user?.email}`,
        });

        onSuccess?.();
      } else {
        // Registrierung
        if (password !== confirmPassword) {
          toast({
            variant: 'destructive',
            title: 'Fehler',
            description: 'Passwörter stimmen nicht überein!',
          });
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: 'Account erstellt!',
          description: 'Bitte bestätigen Sie Ihre E-Mail-Adresse.',
        });

        // Erstelle User Settings
        if (data.user) {
          await supabase.from('user_settings').insert({
            user_id: data.user.id,
            monthly_income: 0,
            updated_at: new Date().toISOString(),
          });
        }

        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: isLogin ? 'Login fehlgeschlagen' : 'Registrierung fehlgeschlagen',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-zinc-900 border-2 border-zinc-800 rounded-lg">
      <div className="mb-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4">
          <span className="text-3xl font-bold text-white">₿</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          {isLogin ? 'Willkommen zurück' : 'Account erstellen'}
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          {isLogin ? 'Melde dich an, um fortzufahren' : 'Erstelle deinen kostenlosen Account'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-white">E-Mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-white">Passwort</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="mt-1"
          />
        </div>

        {!isLogin && (
          <div>
            <Label htmlFor="confirmPassword" className="text-white">Passwort bestätigen</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="mt-1"
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {loading ? 'Lädt...' : isLogin ? 'Anmelden' : 'Registrieren'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setConfirmPassword('');
          }}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {isLogin ? 'Noch kein Account? Jetzt registrieren' : 'Bereits registriert? Anmelden'}
        </button>
      </div>
    </div>
  );
}
