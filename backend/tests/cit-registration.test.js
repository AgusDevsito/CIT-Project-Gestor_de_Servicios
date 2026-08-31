import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCITRegistration } from '../helper/citRegistration.js';

test('rejects CIT registration without a document', () => {
  assert.throws(() => {
    validateCITRegistration({
      role: 'cit',
      documentUrl: '',
      file: null,
    });
  }, /documento/i);
});

test('accepts CIT registration with a document', () => {
  assert.doesNotThrow(() => {
    validateCITRegistration({
      role: 'cit',
      documentUrl: '/uploads/empleado-cit.pdf',
      file: { originalname: 'empleado-cit.pdf' },
    });
  });
});

test('allows non-CIT users without a document', () => {
  assert.doesNotThrow(() => {
    validateCITRegistration({
      role: 'user',
      documentUrl: '',
      file: null,
    });
  });
});
