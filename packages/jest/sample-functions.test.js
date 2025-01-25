const myFunctions = require('./sample-functions.js');

test('Testing divide positive number by zero -- success', () => {
    const target = Infinity;
    const result = myFunctions.div(8, 0);
    expect(target).toBe(result);
});

test('Testing divide negative number by zero -- success', () => {
    const target = -Infinity;
    const result = myFunctions.div(-8, 0);
    expect(target).toBe(result);
});

test('Testing divide zero by zero -- success', () => {
    const target = NaN;
    const result = myFunctions.div(0, 0);
    expect(target).toBe(result);
});

test('Testing divide by negative number -- success', () => {
    const target = -8;
    const result = myFunctions.div(8, -1);
    expect(target).toBe(result);
});

test('Testing divide whole numbers -- success', () => {
    const target = 4;
    const result = myFunctions.div(8, 2);
    expect(target).toBe(result);
});

test('Testing divide infinity -- success', () => {
    const target = Infinity;
    const result = myFunctions.div(Infinity, 5);
    expect(target).toBe(result);
});

test('Testing divide negative infinity -- success', () => {
    const target = -Infinity;
    const result = myFunctions.div(-Infinity, 5);
    expect(target).toBe(result);
});

test('Testing divide by infinity -- success', () => {
    const target = 0;
    const result = myFunctions.div(1, Infinity);
    expect(target).toBe(result);
});

test('Testing divide by negative infinity -- success', () => {
    const target = -0;
    const result = myFunctions.div(1, -Infinity);
    expect(target).toBe(result);
});

test('Testing divide infinity by infinity -- success', () => {
    const target = NaN;
    const result = myFunctions.div(Infinity, Infinity);
    expect(target).toBe(result);
});

test('Testing divide float -- success', () => {
    const target = 2.27775;
    const result = myFunctions.div(4.5555, 2);
    expect(target).toBe(result);
});

test('Testing contains a number at end -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers('abcasdfageegwasdfgawgwe3');
    expect(target).toBe(result);
});

test('Testing contains a zero -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers('a0bc');
    expect(target).toBe(result);
});

test('Testing contains a negative number -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers('a-3bc');
    expect(target).toBe(result);
});

test('Testing contains a number at start -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers('1awefijoaiwehgouhaowej');
    expect(target).toBe(result);
});

test('Testing contains only numbers -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers('7509187340932876');
    expect(target).toBe(result);
});

test('Testing does not contain a number -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers('asdfasdfasdgheoia');
    expect(target).toBe(result);
});

test('Testing contains number with multiple words -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers('asbcasdf te23adsf');
    expect(target).toBe(result);
});

test('Testing does not contain a number with multiple words -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers('asdfasdfasdf asdfasdfsdf');
    expect(target).toBe(result);
});

test('Testing does not contain a number with symbols -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers('_!@#!-=@)#$&!)@%&(*!^&(!&&()^');
    expect(target).toBe(result);
});