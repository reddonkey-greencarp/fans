export const updateStorage = (name: string) => (data: string | object) =>
    localStorage.setItem(name, typeof data === 'string' ? data : JSON.stringify(data));
