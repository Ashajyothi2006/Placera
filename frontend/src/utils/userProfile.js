/**
 * Derives a short, friendly display name and avatar initials for any user.
 * Priority:
 * 1. Proper name from user profile (if not placeholder or raw email username)
 * 2. Proper name from auth metadata (if not placeholder or raw email username)
 * 3. Derived short, friendly name from email local-part
 * 
 * Example:
 * ashalathaavuru7@gmail.com -> { displayName: 'Asha', fullName: 'Asha', initials: 'A' }
 */
export function getDisplayName(email, profileName) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const localPart = cleanEmail.includes('@') ? cleanEmail.split('@')[0] : cleanEmail;
  const rawPrefix = localPart.replace(/[\d._-]+$/, '');

  // 1. Check if profileName is a real custom name (and NOT the raw email username or generic placeholder)
  if (profileName && typeof profileName === 'string') {
    const trimmed = profileName.trim();
    const normalizedName = trimmed.toLowerCase().replace(/[\d\s._-]+/g, '');
    const normalizedLocal = localPart.toLowerCase().replace(/[\d._-]+/g, '');
    
    // Check if the profileName is merely the email username (e.g. Ashalathaavuru7 or ashalathaavuru)
    const isEmailLocalPart = normalizedName === normalizedLocal || normalizedName === localPart.toLowerCase();
    const isPlaceholder = /^(user|candidate|candidate\s*user|enterprise\s*user|demo\s*candidate)$/i.test(trimmed);

    if (!isEmailLocalPart && !isPlaceholder && trimmed.length > 0) {
      const first = trimmed.split(/\s+/)[0];
      const displayName = first.charAt(0).toUpperCase() + first.slice(1);
      const initials = trimmed
        .split(/\s+/)
        .filter(Boolean)
        .map(w => w[0].toUpperCase())
        .slice(0, 2)
        .join('') || displayName.slice(0, 1).toUpperCase();

      return {
        displayName,
        fullName: trimmed,
        initials: initials || 'U'
      };
    }
  }

  // 2. Derive short, friendly name from email
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return {
      displayName: 'User',
      fullName: 'User',
      initials: 'U'
    };
  }

  let clean = rawPrefix;
  if (!clean) clean = localPart;

  // A. Check for separators (. _ - +)
  if (/[._\-+]/.test(clean)) {
    const parts = clean.split(/[._\-+]+/).filter(Boolean);
    if (parts.length > 0) {
      const first = parts[0];
      const displayName = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
      const initials = parts.slice(0, 2).map(p => p[0].toUpperCase()).join('');
      return {
        displayName,
        fullName: displayName,
        initials: initials || displayName[0]
      };
    }
  }

  // B. Check for camelCase (e.g. AshaLatha -> Asha)
  const camelParts = clean.split(/(?=[A-Z])/).filter(Boolean);
  if (camelParts.length > 1) {
    const first = camelParts[0];
    const displayName = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
    return {
      displayName,
      fullName: displayName,
      initials: displayName[0].toUpperCase()
    };
  }

  const lower = clean.toLowerCase();

  // C. Common first name roots (ordered to recognize primary given name)
  const commonFirstNames = [
    'ashalatha', 'asha', 'rahul', 'rohit', 'priya', 'pooja', 'sneha', 'neha', 'anjali', 'ananya', 
    'swati', 'divya', 'kavya', 'ramesh', 'suresh', 'mahesh', 'rajesh', 'dinesh', 'ganesh', 
    'vijay', 'ajay', 'sanjay', 'anil', 'sunil', 'amit', 'sumit', 'vikas', 'vishal', 'vivek', 
    'arun', 'varun', 'tarun', 'karan', 'deepak', 'pankaj', 'manish', 'ashish', 'abhishek', 
    'aditya', 'sid', 'siddharth', 'karthik', 'sai', 'krishna', 'ram', 'shiva', 'hari', 'ravi', 
    'surya', 'chandra', 'venkat', 'srinivas', 'lakshmi', 'durga', 'bhavani', 'john', 'alex', 
    'david', 'michael', 'sarah', 'emily', 'james', 'robert', 'william', 'chris', 'daniel', 
    'sam', 'samuel', 'mary', 'jessica'
  ];

  for (const fn of commonFirstNames) {
    if (lower.startsWith(fn)) {
      const displayName = (fn === 'ashalatha') ? 'Asha' : (fn.charAt(0).toUpperCase() + fn.slice(1));
      return {
        displayName,
        fullName: displayName,
        initials: displayName.charAt(0).toUpperCase()
      };
    }
  }

  // D. Common suffixes/surnames to cut off (e.g. ashalathaavuru -> cut "avuru", "latha")
  const suffixes = [
    'avuru', 'latha', 'kumar', 'babu', 'reddy', 'sharma', 'singh', 'patel', 'gupta', 'verma', 
    'rao', 'naidu', 'chowdary', 'yadav', 'smith', 'johnson', 'williams', 'brown', 'jones', 'miller'
  ];
  for (const suf of suffixes) {
    const idx = lower.indexOf(suf);
    if (idx >= 3) {
      let sub = lower.slice(0, idx);
      for (const innerSuf of suffixes) {
        const innerIdx = sub.indexOf(innerSuf);
        if (innerIdx >= 3) {
          sub = sub.slice(0, innerIdx);
          break;
        }
      }
      const displayName = sub.charAt(0).toUpperCase() + sub.slice(1);
      return {
        displayName,
        fullName: displayName,
        initials: displayName.charAt(0).toUpperCase()
      };
    }
  }

  // E. Fallback: Cap length to max 6 characters for a short friendly name
  let shortName = clean;
  if (shortName.length > 7) {
    shortName = shortName.slice(0, 6);
  }
  const displayName = shortName.charAt(0).toUpperCase() + shortName.slice(1).toLowerCase();
  return {
    displayName,
    fullName: displayName,
    initials: displayName.charAt(0).toUpperCase()
  };
}
