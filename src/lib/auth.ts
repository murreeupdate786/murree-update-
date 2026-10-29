import { UserProfile } from './types';

const STORAGE_KEY = 'murree_current_user';

const DEFAULT_USER: UserProfile = {
  id: 'usr-default',
  name: 'Muhammad Arslan',
  email: 'arslan.travel@gmail.com',
  phone: '+92 300 1234567',
  role: 'USER'
};

const ADMIN_USER: UserProfile = {
  id: 'usr-admin',
  name: 'Murree Control Officer (Admin)',
  email: 'control@murreeupdate.pk',
  phone: '051-9269200',
  role: 'ADMIN'
};

export function getCurrentUser(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
}

export function setCurrentUser(user: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // storage not available
  }
}

export function switchToAdmin(): void {
  setCurrentUser(ADMIN_USER);
}

export function switchToUser(): void {
  setCurrentUser(DEFAULT_USER);
}

export function isAdmin(): boolean {
  return getCurrentUser().role === 'ADMIN';
}
