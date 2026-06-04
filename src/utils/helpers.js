export const formatDate = dateValue => {
  if (!dateValue) {
    return '';
  }

  try {
    const date =
      typeof dateValue?.toDate === 'function'
        ? dateValue.toDate()
        : new Date(dateValue);

    return date.toLocaleDateString();
  } catch (error) {
    return '';
  }
};

export const formatTime = dateValue => {
  if (!dateValue) {
    return '';
  }

  try {
    const date =
      typeof dateValue?.toDate === 'function'
        ? dateValue.toDate()
        : new Date(dateValue);

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return '';
  }
};

export const formatDateTime = dateValue => {
  if (!dateValue) {
    return '';
  }

  try {
    const date =
      typeof dateValue?.toDate === 'function'
        ? dateValue.toDate()
        : new Date(dateValue);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  } catch (error) {
    return '';
  }
};

export const generateId = () => {
  return `${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

export const truncateText = (
  text,
  maxLength = 100,
) => {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}...`;
};

export const getInitials = name => {
  if (!name || typeof name !== 'string') {
    return 'U';
  }

  const words = name.trim().split(' ');

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[1].charAt(0)
  ).toUpperCase();
};

export const isEmpty = value => {
  return (
    value === null ||
    value === undefined ||
    value === ''
  );
};

export const capitalizeFirstLetter = text => {
  if (!text) {
    return '';
  }

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
};

export const sortPostsByLatest = posts => {
  if (!Array.isArray(posts)) {
    return [];
  }

  return [...posts].sort((a, b) => {
    const dateA = a.createdAt?.seconds || 0;
    const dateB = b.createdAt?.seconds || 0;

    return dateB - dateA;
  });
};