// Minimal demo test using Node's built-in test runner (node:test)
// This file is temporary and will be removed after verification.
import test from 'node:test';
import assert from 'node:assert/strict';

function normalizePhone(raw) {
  // Sample pure function similar to src/lib/formatters but kept JS-only for the demo
  return String(raw).replace(/[^0-9]/g, '');
}

test('normalizePhone removes non-digits', () => {
  assert.equal(normalizePhone('(11) 9 8765-4321'), '11987654321');
});

test('normalizePhone handles null/undefined gracefully', () => {
  assert.equal(normalizePhone(null), 'null'); // String(null) === 'null' by design here
  assert.equal(normalizePhone(undefined), 'undefined');
});
