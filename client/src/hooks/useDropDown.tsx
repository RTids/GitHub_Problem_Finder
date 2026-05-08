import { useState, useEffect, useRef } from 'react';

export function useDropDown() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);

	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				close();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return { isOpen, toggle, close, ref };
}
