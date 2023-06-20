import {ElementRef, Injectable} from '@angular/core';
import {RtSkeletonPlaceholderDirective} from '../directives/rt-skeleton-placeholder.directive';

@Injectable()
export class RtSkeletonService {
  private placeholdersDirectivesDict: { [uuid: string]: Set<RtSkeletonPlaceholderDirective> } = {};
  private containersTemplatesDict: { [uuid: string]: Set<ElementRef> } = {};

  constructor() {
  }

  addPlaceholderDirectives(uuid: string, placeholder: RtSkeletonPlaceholderDirective): void {
    if (!this.placeholdersDirectivesDict[uuid]) {
      this.placeholdersDirectivesDict[uuid] = new Set();
    }

    this.placeholdersDirectivesDict[uuid].add(placeholder);
  }

  removePlaceholderDirectivesAll(uuid: string): void {
    if (this.placeholdersDirectivesDict[uuid]) {
      this.placeholdersDirectivesDict[uuid].clear();
    }
  }

  getPlaceholderDirectives(uuid: string): RtSkeletonPlaceholderDirective[] {
    return this.placeholdersDirectivesDict[uuid] ? Array.from(this.placeholdersDirectivesDict[uuid]) : [];
  }

  addContainerTemplates(uuid: string, container: ElementRef): void {
    if (!this.containersTemplatesDict[uuid]) {
      this.containersTemplatesDict[uuid] = new Set();
    }

    this.containersTemplatesDict[uuid].add(container);
  }

  removeContainersTemplatesAll(uuid: string): void {
    if (this.containersTemplatesDict[uuid]) {
      this.containersTemplatesDict[uuid].clear();
    }
  }

  getContainersTemplates(uuid: string): ElementRef[] {
    return this.containersTemplatesDict[uuid] ? Array.from(this.containersTemplatesDict[uuid]) : [];
  }
}
