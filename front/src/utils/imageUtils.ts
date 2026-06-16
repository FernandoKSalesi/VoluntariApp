export const getImageUrl = (url?: string | null) => {
  if (url) {
    return url;
  }
  // Generic fallback image if not provided
  return "https://images.unsplash.com/photo-1758599668429-121d54188b9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
};
