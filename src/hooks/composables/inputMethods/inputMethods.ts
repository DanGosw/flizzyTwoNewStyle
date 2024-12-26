/**
 * A utility function to enforce numeric-only input in form fields.
 *
 * @param {Ref|Object} existingRef - A reactive reference or a plain object representing the data model bound to the input field.
 * @param {string} [property] - The name of the property within `existingRef` to be updated. This is required only when using `handleInput`.
 *
 * @returns {Object} An object containing two methods:
 *  - `handleInputReactive`: A function to handle input events for reactive references. It updates the reactive reference and the input field with the numeric-only value.
 *  - `handleInput`: A function to handle input events for non-reactive objects. It updates the specified property in `existingRef` and the input field with the numeric-only value.
 *
 * @example
 * // Example 1: Using `handleInputReactive` with a Reactive Reference
 * import { ref } from 'vue';
 * import { useNumericInput } from './useNumericInput';
 *
 * const dni = ref('');
 * const { handleInputReactive } = useNumericInput(dni);
 *
 * // In your template:
 * // <input @input="handleInputReactive" v-model="dni.value" />
 *
 * @example
 * // Example 2: Using `handleInput` with a Non-Reactive Object
 * import { ref } from 'vue';
 * import { useNumericInput } from './useNumericInput';
 *
 * const customerFilters = ref({ dni: '', otherField: '' });
 * const { handleInput } = useNumericInput(customerFilters.value, 'dni');
 *
 * // In your template:
 * // <input @input="handleInput" v-model="customerFilters.value.dni" />
 */
export function useNumericInput(existingRef, property) {
	/**
	 * Handles input events for reactive references, ensuring that only numeric values are allowed.
	 *
	 * @param {Event} event - The input event object.
	 */
	function handleInputReactive(event) {
		const newValue = event.target?.['value'].replace(/\D/g, "");
		existingRef.value = newValue;
		event.target.value = newValue;
	}

	/**
	 * Handles input events for non-reactive objects, ensuring that only numeric values are allowed.
	 *
	 * @param {Event} event - The input event object.
	 */
	function handleInput(event) {
		const newValue = event.target?.['value'].replace(/\D/g, "");
		existingRef[property] = newValue;
		event.target.value = newValue;
	}

	return {handleInputReactive, handleInput};
}
