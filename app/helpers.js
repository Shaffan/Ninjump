/**
 * Returns a random number between min (inclusive) and max (exclusive)
 *
 * @param {int} Minimum value that can be returned
 * @param {int} Maximum value that can be returned
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
