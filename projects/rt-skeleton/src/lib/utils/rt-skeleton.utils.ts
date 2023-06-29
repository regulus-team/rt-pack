import {Renderer2} from '@angular/core';

export const addPlaceholderForRtSkeleton = (
  element: HTMLElement, renderer: Renderer2, radiusSegment: string, left: string, margin: string, width: string, height: string,
): void => {
  const div = renderer.createElement('div');
  renderer.setStyle(div, 'position', 'absolute');
  renderer.setStyle(div, 'width', '100%');
  renderer.setStyle(div, 'height', '100%');
  renderer.setStyle(div, 'top', '0');
  renderer.setStyle(div, 'border-radius', radiusSegment);
  renderer.setStyle(div, 'left', left);
  renderer.setStyle(div, 'margin', margin);

  renderer.addClass(div, 'rt-skeleton-segment');


  renderer.setAttribute(div, 'rtSkeletonPlaceholder', '');
  renderer.setAttribute(div, 'rtSkeletonSegment', '');

  renderer.setStyle(element, 'width', width);
  renderer.setStyle(element, 'height', height);

  // Hide all content data
  element.querySelectorAll('*').forEach((el) => {
    renderer.setStyle(el, 'visibility', 'hidden');
  });

  renderer.appendChild(element, div);
};
