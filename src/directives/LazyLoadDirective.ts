export default {
	mounted(el: HTMLElement) {
		function loadImage() {
			const imageElement = Array.from(el.children).find((el) => el.nodeName === 'IMG') as
				| HTMLImageElement
				| undefined;
			if (imageElement) {
				imageElement.addEventListener('load', () => {
					setTimeout(() => el.classList.add('loaded'), 100);
				});
				imageElement.src = imageElement.dataset.url!;
			}
		}

		function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadImage();
					observer.unobserve(el);
				}
			});
		}

		function createObserver() {
			const options: IntersectionObserverInit = {
				root: null,
				threshold: 0,
			};
			const observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(el);
		}

		if (window['IntersectionObserver']) {
			createObserver();
		} else loadImage();
	},
};
