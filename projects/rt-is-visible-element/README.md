## RT IS VISIBLE ELEMENT


![](/projects/rt-is-visible-element/rt-is-visible-element.gif)

# Install

```bash
npm i rt-is-visible-element
```

```bash
yarn add rt-is-visible-element
```

# Usage
```html

<div class="rt-is-visible-element">
  <div class="user-list">
    <div
      class="user-list__item"
      *ngFor="let user of users; let index=index"
      rtIsElementVisible
      [debounceTime]="100"
      [isContinuous]="true"
      (isIntersecting)="isIntersecting($event, index)"
    >
      {{user.name}}
    </div>
  </div>

  <pre>
    {{consoleDict | json}}
  </pre>
</div>

```

```ts
@Component({
  selector: 'app-rt-is-visible-element',
  templateUrl: './rt-is-visible-element.component.html',
  styleUrls: ['./rt-is-visible-element.component.scss'],
})
export class RtIsVisibleElementComponent {
  consoleDict = {};
  users: user[] = [
    {name: 'user1'},
    {name: 'user2'},
    {name: 'user3'},
    {name: 'user4'},
    {name: 'user5'},
    {name: 'user6'},
    {name: 'user7'},
    {name: 'user8'},
    {name: 'user9'},
    {name: 'user10'},
    {name: 'user11'},
    {name: 'user12'},
    {name: 'user13'},
    {name: 'user14'},
    {name: 'user15'},
    {name: 'user16'},
    {name: 'user17'},
    {name: 'user18'},
    {name: 'user19'},
    {name: 'user20'},
  ];

  isIntersecting($event: boolean, index: number) {
    this.consoleDict[index] = $event;
  }
}
```

https://www.regulus.team/
