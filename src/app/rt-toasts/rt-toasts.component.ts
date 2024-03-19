import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject }                                               from 'rxjs';
import {
  RtToastService,
}                                                                        from '../../../projects/rt-toasts/src/lib/rt-toast.service';
import {
  RtToastType,
}                                                                        from '../../../projects/rt-toasts/src/lib/symbols';

@Component({
  selector: 'app-rt-toasts',
  templateUrl: './rt-toasts.component.html',
  styleUrls: ['./rt-toasts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtToastsComponent implements OnInit {
  loadingReadme$ = new BehaviorSubject<boolean>(true);
  readme = '';

  constructor(private cd: ChangeDetectorRef, private rtToastService: RtToastService) {
  }

  ngOnInit(): void {
    this.readMarkdownFile();
  }

  readMarkdownFile(): void {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.loadingReadme$.next(false);
      this.readme = fileReader.result as string;
      this.cd.detectChanges();
    };

    const filePath = '/assets/rt-toasts/README.md';

    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        const blob = new Blob([text], {type: 'text/plain'});

        fileReader.readAsText(blob);
      });
  }

  public showSuccessToast(): void {
    this.rtToastService.createToast({
      type: RtToastType.Success,
      label: 'Success',
      message: 'This is a success toast',
    });
  }

  public showInfoToast(): void {
    this.rtToastService.createToast({
      type: RtToastType.Info,
      label: 'Info',
      message: 'This is an info toast',
      timeout: 30000,
    });
  }

  public showWarningToast(): void {
    this.rtToastService.createToast({
      type: RtToastType.Warning,
      label: 'Warning',
      message: 'This is a warning toast',
    });
  }

  public showErrorToast(): void {
    this.rtToastService.createToast({
      type: RtToastType.Error,
      label: 'Error',
      message: 'This is an error toast',
    });
  }
}
