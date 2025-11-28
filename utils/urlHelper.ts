import { UrlComponent, UrlPartType } from '../types';

export const generateId = (): string => Math.random().toString(36).substring(2, 9);

export const parseUrl = (input: string): { parts: UrlComponent[], error?: string } => {
  try {
    // Attempt to handle partial URLs by checking if protocol is missing
    let urlString = input.trim();
    if (!urlString.match(/^[a-zA-Z]+:\/\//)) {
       // If it looks like a domain, prepend https:// for parsing purposes
       if (urlString.includes('.') && !urlString.startsWith('/')) {
         urlString = 'https://' + urlString;
       }
    }

    const url = new URL(urlString);
    const components: UrlComponent[] = [];

    // Protocol
    if (url.protocol) {
      components.push({
        id: generateId(),
        type: 'protocol',
        value: url.protocol,
        isEnabled: true,
        label: 'Protocol',
        description: 'The scheme (e.g., https:)'
      });
    }

    // Username
    if (url.username) {
      components.push({
        id: generateId(),
        type: 'username',
        value: url.username,
        isEnabled: true,
        label: 'Username',
        description: 'Basic auth username'
      });
    }

    // Password
    if (url.password) {
      components.push({
        id: generateId(),
        type: 'password',
        value: url.password,
        isEnabled: true,
        label: 'Password',
        description: 'Basic auth password'
      });
    }

    // Hostname
    if (url.hostname) {
      components.push({
        id: generateId(),
        type: 'hostname',
        value: url.hostname,
        isEnabled: true,
        label: 'Hostname',
        description: 'The domain name'
      });
    }

    // Port
    if (url.port) {
      components.push({
        id: generateId(),
        type: 'port',
        value: url.port,
        isEnabled: true,
        label: 'Port',
        description: 'Network port'
      });
    }

    // Pathname
    // Split pathname into segments if desired, but for now treat as one block 
    // or maybe split strictly if it's long? Let's keep it simple: one block.
    if (url.pathname && url.pathname !== '/') {
      components.push({
        id: generateId(),
        type: 'pathname',
        value: url.pathname,
        isEnabled: true,
        label: 'Path',
        description: 'Resource path'
      });
    } else if (url.pathname === '/') {
       // Keep root slash as an optional part if it exists explicitly?
       // The URL constructor defaults to / for http, so we include it.
       components.push({
        id: generateId(),
        type: 'pathname',
        value: '/',
        isEnabled: true,
        label: 'Path',
        description: 'Root path'
      });
    }

    // Search Params
    url.searchParams.forEach((value, key) => {
      components.push({
        id: generateId(),
        type: 'search',
        key: key,
        value: value,
        isEnabled: true,
        label: 'Query Param',
        description: key
      });
    });

    // Hash
    if (url.hash) {
      components.push({
        id: generateId(),
        type: 'hash',
        value: url.hash,
        isEnabled: true,
        label: 'Fragment',
        description: 'Anchor/Hash'
      });
    }

    return { parts: components };
  } catch (e) {
    return { parts: [], error: 'Invalid URL format' };
  }
};

export const reconstructUrl = (parts: UrlComponent[]): string => {
  let builtUrl = '';

  const protocol = parts.find(p => p.type === 'protocol' && p.isEnabled);
  const username = parts.find(p => p.type === 'username' && p.isEnabled);
  const password = parts.find(p => p.type === 'password' && p.isEnabled);
  const hostname = parts.find(p => p.type === 'hostname' && p.isEnabled);
  const port = parts.find(p => p.type === 'port' && p.isEnabled);
  const pathname = parts.find(p => p.type === 'pathname' && p.isEnabled);
  const searchParams = parts.filter(p => p.type === 'search' && p.isEnabled);
  const hash = parts.find(p => p.type === 'hash' && p.isEnabled);

  // 1. Protocol
  if (protocol) {
    builtUrl += protocol.value;
    if (protocol.value.endsWith(':')) {
      builtUrl += '//';
    }
  }

  // 2. Auth (Username/Password)
  if (username) {
    builtUrl += username.value;
    if (password) {
      builtUrl += `:${password.value}`;
    }
    builtUrl += '@';
  }

  // 3. Hostname
  if (hostname) {
    builtUrl += hostname.value;
  }

  // 4. Port
  if (port) {
    builtUrl += `:${port.value}`;
  }

  // 5. Pathname
  if (pathname) {
    // Ensure pathname logic is sound relative to host
    // If we have a host but pathname doesn't start with /, add it.
    // However, the browser URL parser usually keeps the leading / in pathname.
    builtUrl += pathname.value;
  }

  // 6. Search Params
  if (searchParams.length > 0) {
    const params = new URLSearchParams();
    searchParams.forEach(p => params.append(p.key!, p.value));
    builtUrl += `?${params.toString()}`;
  }

  // 7. Hash
  if (hash) {
    builtUrl += hash.value;
  }

  return builtUrl;
};