import sum from '../components/add'
import {
  reverse
} from "../components/add";


function arr() {
  return [1,2,3]
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


test('string reverse', () => {
	expect(reverse('abc')).toBe('cba');
})

test('test contain', () => {
  expect(arr()).toMatchSnapshot(3);
});
