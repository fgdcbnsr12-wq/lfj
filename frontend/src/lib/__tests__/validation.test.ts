import { describe, expect, it } from 'vitest';
import { validateField, validateForm } from '../validation';

describe('validation helpers', () => {
  it('validates required and email rules for a field', () => {
    const result = validateField('invalid-email', {
      required: true,
      email: true,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Invalid email address');
  });

  it('validates a form payload and returns all collected errors', () => {
    const result = validateForm(
      {
        email: '',
        password: '123',
        name: 'A',
      },
      {
        email: { required: true, email: true },
        password: { required: true, minLength: 8 },
        name: { required: true, minLength: 2 },
      },
    );

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        'email: This field is required',
        'password: Must be at least 8 characters',
        'name: Must be at least 2 characters',
      ]),
    );
  });
});
