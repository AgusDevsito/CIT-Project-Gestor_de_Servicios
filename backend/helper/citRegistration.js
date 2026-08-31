export const validateCITRegistration = ({ role, documentUrl, file }) => {
  const normalizedRole = String(role ?? '').trim().toLowerCase();
  const hasDocument = Boolean((documentUrl && String(documentUrl).trim()) || (file && file.originalname));

  if (normalizedRole === 'cit' && !hasDocument) {
    const error = new Error('Los trabajadores de CIT Formosa deben adjuntar un documento para registrarse.');
    error.code = 'DOCUMENT_REQUIRED';
    throw error;
  }

  return true;
};
