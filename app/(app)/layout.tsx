'use client';

import { Sidebar } from '@/components/app-sidebar';
import { MinimalNav } from '@/components/MinimalNav';
import { useRouter } from 'next/navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <Sidebar
        brand={{ name: 'Tesla Learn' }}
        user={{
          name: 'John Doe',
          email: 'john@example.com',
          avatarFallback: 'JD'
        }}
        
        onNavigate={(path) => router.push(path)}
        onNewItem={() => router.push('/search')}
        onSearch={() => router.push('/search')}
        onProfileClick={() => router.push('/profile')}
        onSettingsClick={() => router.push('/settings')}
      />
      <main className="flex-1">
        {/* <MinimalNav /> */}
        {children}
      </main>
    </div>
  );
} 