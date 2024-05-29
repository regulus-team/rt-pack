import {Injectable, StateKey, TransferState} from '@angular/core';
import {RtPlatformService} from './rt-platform.service';

@Injectable({
  providedIn: 'root',
})
export class RtTransferStateService {
  constructor(private platform: RtPlatformService, private transfer: TransferState) {
  }

  private getKey(name: string): StateKey<string> {
    return `state-${name}` as StateKey<string>;
  }

  private setState(name: string, state: string): void {
    const key = this.getKey(name);
    this.transfer.set<string>(key, state);
  }

  private getState(name: string): string {
    const key = this.getKey(name);
    return this.transfer.get<string>(key, null);
  }
}
