import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPassword } from './validation';

describe('Validation Utils', () => {
    describe('isValidEmail', () => {
        it('should return true for valid emails', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co')).toBe(true);
        });

        it('should return false for invalid emails', () => {
            expect(isValidEmail('invalid-email')).toBe(false);
            expect(isValidEmail('test@')).toBe(false);
            expect(isValidEmail('@domain.com')).toBe(false);
            expect(isValidEmail('test@domain')).toBe(false); // arguably valid in some RFCs but usually rejected by regex
        });
    });

    describe('isValidPassword', () => {
        it('should return true for passwords with 6 or more characters', () => {
            expect(isValidPassword('123456')).toBe(true);
            expect(isValidPassword('password123')).toBe(true);
        });

        it('should return false for passwords with less than 6 characters', () => {
            expect(isValidPassword('12345')).toBe(false);
            expect(isValidPassword('abc')).toBe(false);
        });
    });
});
